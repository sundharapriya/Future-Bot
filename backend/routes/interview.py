from fastapi import APIRouter, HTTPException
from schemas.interview import (
    InterviewHistoryResponse,
    InterviewReportResponse,
    InterviewStartRequest,
    InterviewStartResponse,
    InterviewQuestionResponse,
    AnswerSubmissionRequest,
    AnswerSubmissionResponse,
    EvaluationRequest,
    EvaluationResponse,
    ScoreResponse,
    Category,
    Difficulty,
)
from services.db import DatabaseError, get_history_by_session
from services.report import generate_final_report
from services.session_manager import manager as session_manager
from services import question_generator
from services import answer_evaluator
from services import score_calculator

router = APIRouter()


@router.post("/interview/start", response_model=InterviewStartResponse)
def start_interview(payload: InterviewStartRequest):
    # Validation is handled by Pydantic + Enums. Extra check just in case.
    if payload.category not in Category:
        raise HTTPException(status_code=400, detail="Unsupported category")
    if payload.difficulty not in Difficulty:
        raise HTTPException(status_code=400, detail="Unsupported difficulty")
    if payload.number_of_questions not in {5, 10, 15}:
        raise HTTPException(status_code=400, detail="Unsupported number_of_questions")

    try:
        session = session_manager.create_session(
            category=payload.category.value,
            difficulty=payload.difficulty.value,
            number_of_questions=payload.number_of_questions,
        )
    except DatabaseError:
        raise HTTPException(status_code=500, detail="Unable to create interview session")

    return InterviewStartResponse(**session)


@router.get("/interview/question/{session_id}", response_model=InterviewQuestionResponse)
def get_next_question(session_id: str):
    session = session_manager.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    current = session.get("current_question", 0)
    total = session.get("number_of_questions", 0)
    if current >= total:
        raise HTTPException(status_code=400, detail="All questions already generated for this session")

    # Generate question via service
    try:
        question_text = question_generator.generate_question(session)
    except question_generator.LLMError as e:
        raise HTTPException(status_code=502, detail=str(e))

    # Save question to session
    try:
        updated = session_manager.add_question(session_id, question_text)
    except DatabaseError:
        raise HTTPException(status_code=500, detail="Unable to save generated question")

    if updated is None:
        raise HTTPException(status_code=500, detail="Unable to save generated question")

    question_number = updated.get("current_question")

    return InterviewQuestionResponse(
        session_id=session_id,
        question_number=question_number,
        total_questions=total,
        question=question_text,
    )


@router.post("/interview/answer", response_model=AnswerSubmissionResponse)
def submit_answer(payload: AnswerSubmissionRequest):
    session = session_manager.get_session(payload.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    total = session.get("number_of_questions", 0)
    if not (1 <= payload.question_number <= total):
        raise HTTPException(status_code=400, detail="Invalid question number")

    if not payload.answer or not payload.answer.strip():
        raise HTTPException(status_code=400, detail="Answer must not be empty")

    existing_answers = session.get("answers", [])
    for existing in existing_answers:
        if existing.get("question_number") == payload.question_number:
            if existing.get("answer") == payload.answer:
                raise HTTPException(
                    status_code=409,
                    detail="This answer has already been submitted for the question.",
                )
            break

    try:
        updated = session_manager.store_answer(
            payload.session_id, payload.question_number, payload.question, payload.answer
        )
    except DatabaseError:
        raise HTTPException(status_code=500, detail="Failed to store answer")

    if updated is None:
        raise HTTPException(status_code=500, detail="Failed to store answer")

    return AnswerSubmissionResponse(
        status="success",
        message="Answer submitted successfully",
        session_id=payload.session_id,
        question_number=payload.question_number,
    )


@router.post("/interview/evaluate", response_model=EvaluationResponse)
def evaluate_answer(payload: EvaluationRequest):
    session = session_manager.get_session(payload.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    total = session.get("number_of_questions", 0)
    if not (1 <= payload.question_number <= total):
        raise HTTPException(status_code=400, detail="Invalid question number")

    if not payload.answer or not payload.answer.strip():
        raise HTTPException(status_code=400, detail="Answer must not be empty")

    try:
        result = answer_evaluator.evaluate_answer(payload.question, payload.answer)
    except answer_evaluator.LLMError as e:
        raise HTTPException(status_code=502, detail=str(e))

    # store evaluation in session for scoring
    try:
        session_manager.store_evaluation(payload.session_id, payload.question_number, result.model_dump())
    except DatabaseError:
        pass

    return result


@router.get("/interview/score/{session_id}", response_model=ScoreResponse)
def get_score(session_id: str):
    session = session_manager.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    evaluations = session_manager.get_evaluations(session_id) or []
    scores = score_calculator.calculate_scores(evaluations)
    return ScoreResponse(session_id=session_id, **scores)


@router.get("/interview/history/{session_id}", response_model=InterviewHistoryResponse)
def get_interview_history(session_id: str):
    try:
        history = get_history_by_session(session_id)
    except DatabaseError:
        raise HTTPException(status_code=500, detail="Failed to load session history")

    if history is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return history


@router.get("/interview/report/{session_id}", response_model=InterviewReportResponse)
def get_interview_report(session_id: str):
    try:
        report = generate_final_report(session_id)
    except DatabaseError:
        raise HTTPException(status_code=500, detail="Failed to generate final report")

    if report is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return report
