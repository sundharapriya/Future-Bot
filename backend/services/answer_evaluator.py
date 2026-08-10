import os
import json
import urllib.request
from typing import Dict, Any
from pydantic import BaseModel, ValidationError

from prompts.evaluation_prompts import build_evaluation_prompt

LLM_API_KEY_ENV = "LLM_API_KEY"


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
        "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": prompt}],
        "max_tokens": 400,
        "temperature": 0.0,
    }
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            res_text = resp.read().decode("utf-8")
            j = json.loads(res_text)
            return j["choices"][0]["message"]["content"].strip()
    except Exception as e:
        raise LLMError(f"LLM request failed: {e}") from e


def _safe_parse_json(text: str) -> Dict[str, Any]:
    # Try direct parse
    try:
        return json.loads(text)
    except Exception:
        # Try to extract a JSON object substring
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start:end+1])
            except Exception:
                pass
    raise ValueError("Unable to parse JSON from LLM response")


def evaluate_answer(question: str, answer: str) -> EvaluationResult:
    criteria = {
        "Accuracy": "Is the factual content correct?",
        "Technical knowledge": "Does it show technical depth?",
        "Relevance": "Is the answer on-topic?",
        "Clarity": "Is the answer clear and concise?",
        "Completeness": "Does it cover required aspects?",
    }

    prompt = build_evaluation_prompt(question, answer, criteria)

    api_key = os.getenv(LLM_API_KEY_ENV)
    if api_key:
        raw = _call_llm(prompt, api_key)
        try:
            parsed = _safe_parse_json(raw)
            # Validate and coerce via Pydantic
            result = EvaluationResult(**parsed)
            return result
        except (ValueError, ValidationError) as e:
            raise LLMError(f"Invalid LLM response: {e}") from e

    # Fallback simple evaluator
    # Score based on keyword presence and length
    score = 0
    acc = 0
    tech = 0
    rel = 0
    clarity = 0
    completeness = 0
    strengths = []
    weaknesses = []
    suggestions = []

    ans_lower = answer.lower()
    if len(ans_lower) < 20:
        clarity = 5
        weaknesses.append("Very short answer; expand for clarity")
    else:
        clarity = 8

    # simple checks
    if "list" in question.lower() and "list" in ans_lower:
        acc = 8
        strengths.append("References the core concept")
    else:
        acc = 5
        weaknesses.append("Missing key term from the question")

    if "mutable" in ans_lower or "change" in ans_lower:
        tech = 8
    else:
        tech = 6
        suggestions.append("Mention mutability and element modification")

    rel = 9

    completeness = min(10, acc + tech) // 2

    score = int(round((acc + tech + rel + clarity + completeness) / 5))

    overall = "Good answer." if score >= 7 else "Needs improvement."

    res = {
        "score": score,
        "accuracy": acc,
        "technical_knowledge": tech,
        "relevance": rel,
        "clarity": clarity,
        "completeness": completeness,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions,
        "overall_feedback": overall,
    }
    return EvaluationResult(**res)
