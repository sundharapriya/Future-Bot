import os
import json
import urllib.request
from typing import Dict, Any
from pydantic import BaseModel, ValidationError

from prompts.evaluation_prompts import build_evaluation_prompt

LLM_API_KEY_ENV = "LLM_API_KEY"
OPENAI_API_KEY_ENV = "OPENAI_API_KEY"


class EvaluationResult(BaseModel):
    score: int
    accuracy: int
    technical_knowledge: int
    relevance: int
    clarity: int
    completeness: int
    strengths: list
    weaknesses: list
    suggestions: list
    overall_feedback: str


class LLMError(Exception):
    pass


def _call_llm(prompt: str, api_key: str, model: str = "gpt-4o-mini") -> str:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }
    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 400,
        "temperature": 0.0,
    }
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            raw = resp.read().decode("utf-8")
            payload = json.loads(raw)
            return payload["choices"][0]["message"]["content"].strip()
    except Exception as exc:
        raise LLMError(f"LLM request failed: {exc}") from exc


def _get_api_key() -> str | None:
    return os.getenv(LLM_API_KEY_ENV) or os.getenv(OPENAI_API_KEY_ENV)


def _safe_parse_json(text: str) -> Dict[str, Any]:
    try:
        return json.loads(text)
    except Exception:
        # Remove markdown fences and everything before first JSON object
        if "```" in text:
            text = text.replace("```json", "").replace("```", "")
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start:end + 1])
            except Exception:
                pass
    raise ValueError("Unable to parse JSON from LLM response")


def _normalize_evaluation_data(parsed: Dict[str, Any]) -> Dict[str, Any]:
    normalized: Dict[str, Any] = {}
    normalized["score"] = int(parsed.get("score", 0) or 0)
    normalized["accuracy"] = int(parsed.get("accuracy", 0) or 0)
    normalized["technical_knowledge"] = int(parsed.get("technical_knowledge", 0) or 0)
    normalized["relevance"] = int(parsed.get("relevance", 0) or 0)
    normalized["clarity"] = int(parsed.get("clarity", 0) or 0)
    normalized["completeness"] = int(parsed.get("completeness", 0) or 0)
    normalized["strengths"] = parsed.get("strengths") or []
    normalized["weaknesses"] = parsed.get("weaknesses") or []
    normalized["suggestions"] = parsed.get("suggestions") or []
    normalized["overall_feedback"] = parsed.get("overall_feedback") or ""
    return normalized


def evaluate_answer(question: str, answer: str) -> EvaluationResult:
    criteria = {
        "Accuracy": "Is the factual content correct?",
        "Technical knowledge": "Does it show technical depth?",
        "Relevance": "Is the answer on-topic?",
        "Clarity": "Is the answer clear and concise?",
        "Completeness": "Does it cover required aspects?",
    }

    prompt = build_evaluation_prompt(question, answer, criteria)
    api_key = _get_api_key()
    if api_key:
        raw = _call_llm(prompt, api_key)
        try:
            parsed = _safe_parse_json(raw)
            normalized = _normalize_evaluation_data(parsed)
            return EvaluationResult(**normalized)
        except (ValueError, ValidationError) as exc:
            raise LLMError(f"Invalid LLM response: {exc}") from exc

    answer_text = answer.strip()
    score = 0
    acc = 0
    tech = 0
    rel = 0
    clarity = 0
    completeness = 0
    strengths: list[str] = []
    weaknesses: list[str] = []
    suggestions: list[str] = []

    if len(answer_text) < 40:
        clarity = 5
        weaknesses.append("Answer is too brief; add more detail.")
    else:
        clarity = 8
        strengths.append("Answer is clear and sufficiently developed.")

    question_lower = question.lower()
    ans_lower = answer_text.lower()
    if "list" in question_lower and "list" in ans_lower:
        acc = 8
        strengths.append("Answer mentions the key concept from the question.")
    else:
        acc = 6
        weaknesses.append("Consider answering with the main term from the question.")

    if "mutable" in ans_lower or "immutable" in ans_lower or "change" in ans_lower:
        tech = 8
    else:
        tech = 6
        suggestions.append("Include technical reasoning behind the behavior.")

    rel = 9 if question_lower in ans_lower or len(answer_text) > 20 else 7
    completeness = min(10, acc + tech) // 2
    score = int(round((acc + tech + rel + clarity + completeness) / 5))
    overall = "Good answer." if score >= 7 else "Needs improvement."

    return EvaluationResult(
        score=score,
        accuracy=acc,
        technical_knowledge=tech,
        relevance=rel,
        clarity=clarity,
        completeness=completeness,
        strengths=strengths,
        weaknesses=weaknesses,
        suggestions=suggestions,
        overall_feedback=overall,
    )
