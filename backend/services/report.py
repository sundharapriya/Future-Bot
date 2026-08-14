from typing import Any

from services.db import get_history_by_session
from services.score_calculator import calculate_scores


def _normalize_list(items: list[str]) -> list[str]:
    return list(dict.fromkeys([item for item in items if item]))


def _build_recommendations(scores: dict[str, Any], questions_answered: int, total_questions: int, category: str) -> list[str]:
    recommendations: list[str] = []

    if questions_answered < total_questions:
        recommendations.append("Complete all interview questions to get a full assessment.")

    if scores.get("accuracy", 0) < 7.0:
        recommendations.append("Review factual accuracy and focus on precise answers.")

    if scores.get("technical_knowledge", 0) < 7.0:
        recommendations.append(f"Strengthen technical knowledge in {category} topics.")

    if scores.get("clarity", 0) < 7.0:
        recommendations.append("Practice structuring answers more clearly and concisely.")

    if scores.get("completeness", 0) < 7.0:
        recommendations.append("Include more complete coverage of the question requirements.")

    if not recommendations:
        recommendations.append("Keep practicing with similar questions to maintain strong performance.")

    return recommendations


def _build_overall_feedback(average_score: float) -> str:
    if average_score >= 8.5:
        return "Excellent interview performance with strong command of the material."
    if average_score >= 7.0:
        return "Good interview performance with room for targeted improvement."
    if average_score >= 5.0:
        return "Fair interview performance; focus on improving weaker areas."
    return "Interview performance needs improvement; review fundamentals and practice more." 


def generate_final_report(session_id: str) -> dict | None:
    history = get_history_by_session(session_id)
    if history is None:
        return None

    total_questions = history.get("number_of_questions", 0)
    categories = history.get("category", "")

    answered_questions = 0
    evaluations: list[dict[str, Any]] = []

    for question in history.get("questions", []):
        question_answered = False
        for answer in question.get("answers", []):
            if answer.get("answer_text"):
                question_answered = True
            if answer.get("score") is not None:
                evaluations.append(
                    {
                        "question_number": question.get("question_number"),
                        "score": answer.get("score", 0),
                        "accuracy": answer.get("accuracy", 0),
                        "technical_knowledge": answer.get("technical_knowledge", 0),
                        "clarity": answer.get("clarity", 0),
                        "completeness": answer.get("completeness", 0),
                    }
                )
        if question_answered:
            answered_questions += 1

    scores = calculate_scores(evaluations)

    strong_areas: list[str] = []
    weak_areas: list[str] = []

    if categories:
        if scores.get("average_score", 0) >= 7.5:
            strong_areas.append(categories)
        else:
            weak_areas.append(categories)

    thresholds = [
        ("accuracy", "Accuracy"),
        ("technical_knowledge", "Technical knowledge"),
        ("clarity", "Clarity"),
        ("completeness", "Completeness"),
    ]

    for key, label in thresholds:
        value = scores.get(key, 0)
        if value >= 8.0:
            strong_areas.append(label)
        elif value <= 5.5:
            weak_areas.append(label)

    strong_areas = _normalize_list(strong_areas)
    weak_areas = _normalize_list(weak_areas)

    recommendations = _build_recommendations(scores, answered_questions, total_questions, categories)
    overall_feedback = _build_overall_feedback(scores.get("average_score", 0))

    breakdown = [
        {"label": "Accuracy", "score": scores.get("accuracy", 0.0)},
        {"label": "Technical knowledge", "score": scores.get("technical_knowledge", 0.0)},
        {"label": "Clarity", "score": scores.get("clarity", 0.0)},
        {"label": "Completeness", "score": scores.get("completeness", 0.0)},
    ]

    return {
        "session_id": session_id,
        "total_questions": total_questions,
        "questions_answered": answered_questions,
        "average_score": scores.get("average_score", 0.0),
        "accuracy": scores.get("accuracy", 0.0),
        "technical_knowledge": scores.get("technical_knowledge", 0.0),
        "clarity": scores.get("clarity", 0.0),
        "completeness": scores.get("completeness", 0.0),
        "breakdown": breakdown,
        "strong_areas": strong_areas,
        "weak_areas": weak_areas,
        "recommendations": recommendations,
        "overall_feedback": overall_feedback,
    }
