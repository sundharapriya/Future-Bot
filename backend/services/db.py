from __future__ import annotations

from datetime import datetime
from typing import Any
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session


class DatabaseError(Exception):
    pass

from database import SessionLocal, init_db
from models import Answer, Interview, Question


def get_db_session() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_interview_record(session_id: str, category: str, difficulty: str, number_of_questions: int) -> Interview:
    init_db()
    with SessionLocal() as db:
        try:
            interview = Interview(
                session_id=session_id,
                category=category,
                difficulty=difficulty,
                number_of_questions=number_of_questions,
            )
            db.add(interview)
            db.commit()
            db.refresh(interview)
            return interview
        except SQLAlchemyError as exc:
            db.rollback()
            raise DatabaseError("Failed to save interview record") from exc


def create_question_record(session_id: str, question_number: int, question_text: str) -> Question:
    with SessionLocal() as db:
        try:
            interview = db.execute(select(Interview).where(Interview.session_id == session_id)).scalar_one_or_none()
            if interview is None:
                raise DatabaseError("Interview record not found for question creation")
            question = Question(
                session_id=session_id,
                interview_id=interview.id,
                question_number=question_number,
                question_text=question_text,
            )
            db.add(question)
            db.commit()
            db.refresh(question)
            return question
        except SQLAlchemyError as exc:
            db.rollback()
            raise DatabaseError("Failed to save question record") from exc


def update_answer_record(session_id: str, question_number: int, question_text: str | None = None, answer_text: str | None = None, evaluation: dict | None = None) -> Answer:
    with SessionLocal() as db:
        try:
            question = (
                db.execute(
                    select(Question)
                    .where(Question.session_id == session_id)
                    .where(Question.question_number == question_number)
                )
                .scalar_one_or_none()
            )
            if question is None:
                raise DatabaseError("Question record not found")
            answer = (
                db.execute(
                    select(Answer)
                    .where(Answer.session_id == session_id)
                    .where(Answer.question_id == question.id)
                )
                .scalar_one_or_none()
            )
            if answer is None:
                answer = Answer(session_id=session_id, question_id=question.id)
                db.add(answer)
            if question_text is not None:
                question.question_text = question_text
            if answer_text is not None:
                answer.answer_text = answer_text
            if evaluation is not None:
                answer.score = evaluation.get("score")
                answer.accuracy = evaluation.get("accuracy")
                answer.technical_knowledge = evaluation.get("technical_knowledge")
                answer.clarity = evaluation.get("clarity")
                answer.completeness = evaluation.get("completeness")
                feedback_items = []
                if evaluation.get("overall_feedback"):
                    feedback_items.append(evaluation["overall_feedback"])
                if evaluation.get("suggestions"):
                    feedback_items.append(" ".join(str(x) for x in evaluation["suggestions"]))
                answer.feedback = " ".join(feedback_items).strip() or None
            db.commit()
            db.refresh(answer)
            return answer
        except SQLAlchemyError as exc:
            db.rollback()
            raise DatabaseError("Failed to save answer record") from exc


def mark_interview_completed(session_id: str) -> Interview:
    with SessionLocal() as db:
        try:
            interview = db.execute(select(Interview).where(Interview.session_id == session_id)).scalar_one_or_none()
            if interview is None:
                raise DatabaseError("Interview record not found")
            interview.completed_at = interview.completed_at or datetime.utcnow()
            db.commit()
            db.refresh(interview)
            return interview
        except SQLAlchemyError as exc:
            db.rollback()
            raise DatabaseError("Failed to mark interview completed") from exc


def get_interview_record(session_id: str) -> Interview | None:
    with SessionLocal() as db:
        return db.execute(select(Interview).where(Interview.session_id == session_id)).scalar_one_or_none()


def get_history_by_session(session_id: str) -> dict | None:
    with SessionLocal() as db:
        try:
            interview = (
                db.execute(select(Interview).where(Interview.session_id == session_id))
                .scalar_one_or_none()
            )
            if interview is None:
                return None

            questions = (
                db.execute(
                    select(Question)
                    .where(Question.interview_id == interview.id)
                    .order_by(Question.question_number)
                )
                .scalars()
                .all()
            )

            question_history = []
            for question in questions:
                answers = (
                    db.execute(
                        select(Answer)
                        .where(Answer.question_id == question.id)
                        .order_by(Answer.created_at)
                    )
                    .scalars()
                    .all()
                )
                question_history.append(
                    {
                        "question_id": question.id,
                        "question_number": question.question_number,
                        "question_text": question.question_text,
                        "answers": [
                            {
                                "answer_id": answer.id,
                                "answer_text": answer.answer_text,
                                "score": answer.score,
                                "accuracy": answer.accuracy,
                                "technical_knowledge": answer.technical_knowledge,
                                "clarity": answer.clarity,
                                "completeness": answer.completeness,
                                "feedback": answer.feedback,
                                "created_at": answer.created_at.isoformat() if answer.created_at else None,
                            }
                            for answer in answers
                        ],
                    }
                )

            return {
                "session_id": interview.session_id,
                "category": interview.category,
                "difficulty": interview.difficulty,
                "number_of_questions": interview.number_of_questions,
                "created_at": interview.created_at.isoformat() if interview.created_at else None,
                "completed_at": interview.completed_at.isoformat() if interview.completed_at else None,
                "questions": question_history,
            }
        except SQLAlchemyError as exc:
            raise DatabaseError("Failed to retrieve interview history") from exc
