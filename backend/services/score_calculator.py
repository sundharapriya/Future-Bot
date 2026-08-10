from typing import Dict, Any, List


def _avg(values: List[float]) -> float:
    return round(sum(values) / len(values), 2) if values else 0.0


def calculate_scores(evaluations: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Given a list of evaluation dicts (each should contain numeric fields),
    compute per-question scores and aggregates.
    """
    if not evaluations:
        return {
            "total_questions": 0,
            "average_score": 0.0,
            "accuracy": 0.0,
            "technical_knowledge": 0.0,
            "clarity": 0.0,
            "completeness": 0.0,
            "question_scores": [],
        }

    question_scores = []
    accuracy_scores = []
    technical_scores = []
    clarity_scores = []
    completeness_scores = []

    for ev in evaluations:
        # Expect fields: score, accuracy, technical_knowledge, relevance, clarity, completeness
        score = float(ev.get("score", 0))
        accuracy = float(ev.get("accuracy", 0))
        technical = float(ev.get("technical_knowledge", 0))
        clarity = float(ev.get("clarity", 0))
        completeness = float(ev.get("completeness", 0))

        question_scores.append({"question_number": ev.get("question_number"), "score": score})
        accuracy_scores.append(accuracy)
        technical_scores.append(technical)
        clarity_scores.append(clarity)
        completeness_scores.append(completeness)

    average_score = _avg([q["score"] for q in question_scores])
    return {
        "total_questions": len(question_scores),
        "average_score": average_score,
        "accuracy": _avg(accuracy_scores),
        "technical_knowledge": _avg(technical_scores),
        "clarity": _avg(clarity_scores),
        "completeness": _avg(completeness_scores),
        "question_scores": question_scores,
    }
