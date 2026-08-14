import threading
import uuid
from typing import Dict, Any

from services.db import (
    DatabaseError,
    create_interview_record,
    create_question_record,
    get_history_by_session,
    get_interview_record,
    mark_interview_completed,
    update_answer_record,
)


class SessionManager:
    """Lightweight session manager with DB-backed recovery."""

    def __init__(self):
        self._lock = threading.Lock()
        self._sessions: Dict[str, Dict[str, Any]] = {}

    def create_session(self, category: str, difficulty: str, number_of_questions: int) -> Dict[str, Any]:
        session_id = str(uuid.uuid4())
        session = {
            "session_id": session_id,
            "category": category,
            "difficulty": difficulty,
            "number_of_questions": number_of_questions,
            "status": "started",
            "previous_questions": [],
            "current_question": 0,
            "evaluations": [],
        }
        with self._lock:
            self._sessions[session_id] = session

        try:
            create_interview_record(
                session_id=session_id,
                category=category,
                difficulty=difficulty,
                number_of_questions=number_of_questions,
            )
        except DatabaseError as exc:
            raise DatabaseError("Failed to create interview session") from exc
        return session

    def get_session(self, session_id: str) -> Dict[str, Any] | None:
        session = self._sessions.get(session_id)
        if session:
            return session
        session = self._load_session_from_db(session_id)
        if session:
            with self._lock:
                self._sessions[session_id] = session
        return session

    def _load_session_from_db(self, session_id: str) -> Dict[str, Any] | None:
        history = get_history_by_session(session_id)
        if history is None:
            return None

        evaluations: list[Dict[str, Any]] = []
        answers: list[Dict[str, Any]] = []

        for question in history.get("questions", []):
            question_number = question.get("question_number")
            question_text = question.get("question_text")
            for answer in question.get("answers", []):
                answers.append(
                    {
                        "question_number": question_number,
                        "question": question_text,
                        "answer": answer.get("answer_text"),
                    }
                )
                if answer.get("score") is not None:
                    evaluations.append(
                        {
                            "question_number": question_number,
                            "score": answer.get("score", 0),
                            "accuracy": answer.get("accuracy", 0),
                            "technical_knowledge": answer.get("technical_knowledge", 0),
                            "clarity": answer.get("clarity", 0),
                            "completeness": answer.get("completeness", 0),
                        }
                    )

        session = {
            "session_id": history["session_id"],
            "category": history["category"],
            "difficulty": history["difficulty"],
            "number_of_questions": history["number_of_questions"],
            "status": "completed" if history.get("completed_at") else "started",
            "previous_questions": [q.get("question_text") for q in history.get("questions", [])],
            "current_question": len(history.get("questions", [])),
            "answers": answers,
            "evaluations": evaluations,
        }
        return session

    def add_question(self, session_id: str, question: str) -> Dict[str, Any] | None:
        with self._lock:
            session = self._sessions.get(session_id)
            if not session:
                return None
            session.setdefault("previous_questions", []).append(question)
            session["current_question"] = len(session["previous_questions"])
            question_number = session["current_question"]

        try:
            create_question_record(session_id=session_id, question_number=question_number, question_text=question)
        except DatabaseError as exc:
            raise DatabaseError("Failed to persist generated question") from exc
        return session

    def store_answer(self, session_id: str, question_number: int, question: str, answer: str) -> Dict[str, Any] | None:
        with self._lock:
            session = self._sessions.get(session_id)
            if not session:
                return None
            answers = session.setdefault("answers", [])
            # store as dict; overwrite if same question_number exists
            for a in answers:
                if a.get("question_number") == question_number:
                    a.update({"question": question, "answer": answer})
                    break
            else:
                answers.append({"question_number": question_number, "question": question, "answer": answer})

        try:
            update_answer_record(
                session_id=session_id,
                question_number=question_number,
                question_text=question,
                answer_text=answer,
            )
        except DatabaseError as exc:
            raise DatabaseError("Failed to persist answer") from exc

        if question_number == session.get("number_of_questions"):
            try:
                mark_interview_completed(session_id=session_id)
            except DatabaseError:
                pass

        return session

    def store_evaluation(self, session_id: str, question_number: int, evaluation: Dict[str, Any]) -> Dict[str, Any] | None:
        with self._lock:
            session = self._sessions.get(session_id)
            if not session:
                return None
            evals = session.setdefault("evaluations", [])
            # Replace existing evaluation for question_number
            for i, e in enumerate(evals):
                if e.get("question_number") == question_number:
                    evals[i] = {"question_number": question_number, **evaluation}
                    break
            else:
                evals.append({"question_number": question_number, **evaluation})

        try:
            update_answer_record(
                session_id=session_id,
                question_number=question_number,
                evaluation=evaluation,
            )
        except DatabaseError as exc:
            raise DatabaseError("Failed to persist evaluation") from exc

        if question_number == session.get("number_of_questions"):
            try:
                mark_interview_completed(session_id=session_id)
            except DatabaseError:
                pass

        return session

    def get_evaluations(self, session_id: str) -> list | None:
        session = self.get_session(session_id)
        if not session:
            return None
        return session.get("evaluations", [])

    def next_question_number(self, session_id: str) -> int | None:
        session = self.get_session(session_id)
        if not session:
            return None
        return len(session.get("previous_questions", [])) + 1


# module-level singleton
manager = SessionManager()
