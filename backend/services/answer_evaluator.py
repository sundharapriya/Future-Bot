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
    words = answer_text.split()
    word_count = len(words)
    
    # 1. Clarity scoring based on length and structure
    if word_count < 10:
        clarity = 4
        weaknesses.append("The response is very short; elaborate further on your reasoning.")
    elif word_count < 25:
        clarity = 6
        weaknesses.append("The response provides an overview but lacks comprehensive depth.")
    elif word_count < 80:
        clarity = 8
        strengths.append("The response is well-structured, clear, and direct.")
    else:
        clarity = 9
        strengths.append("Comprehensive, in-depth explanation with thorough technical context.")

    # 2. Extract significant keywords from question
    q_words = [w.strip("?,.:;\"'()[]{}") for w in question.lower().split()]
    stopwords = {"what", "is", "the", "difference", "between", "how", "do", "you", "and", "or", "in", "with", "explain", "describe", "why", "when", "would", "which", "a", "an", "for", "to", "of", "on", "at", "by", "from", "terms", "examples", "context", "level", "appropriate", "interview"}
    key_q_words = [w for w in q_words if len(w) > 3 and w not in stopwords]
    
    ans_lower = answer_text.lower()
    matched_keywords = [w for w in key_q_words if w in ans_lower]
    
    # 3. Relevance scoring
    if key_q_words:
        keyword_coverage = len(matched_keywords) / len(key_q_words)
        if keyword_coverage > 0.6:
            rel = 9
            strengths.append("Directly addresses the primary technical themes of the question.")
        elif keyword_coverage > 0.3:
            rel = 7
            strengths.append("Covers relevant concepts related to the question topic.")
        else:
            rel = 6
            weaknesses.append("Make sure to explicitly address all core aspects mentioned in the prompt.")
    else:
        rel = 8

    # 4. Technical depth & accuracy
    technical_indicators = ["because", "internally", "performance", "complexity", "memory", "runtime", "advantage", "trade-off", "tradeoff", "example", "use case", "guarantees", "process", "implementation", "mechanism"]
    tech_matches = [w for w in technical_indicators if w in ans_lower]
    
    if len(tech_matches) >= 3 or word_count >= 45:
        tech = 8
        acc = 8
        strengths.append("Includes strong technical reasoning and practical engineering context.")
    elif len(tech_matches) >= 1 or word_count >= 20:
        tech = 7
        acc = 7
        suggestions.append("Consider discussing internal mechanisms or performance implications.")
    else:
        tech = 5
        acc = 6
        suggestions.append("Add a concrete real-world code or architectural example to illustrate your point.")

    # 5. Completeness & Overall Score
    completeness = min(10, max(4, int(round((acc + tech + rel) / 3))))
    score = int(round((acc + tech + rel + clarity + completeness) / 5))
    
    if score >= 8:
        overall = "Excellent answer with strong technical depth and clear communication."
    elif score >= 6:
        overall = "Solid answer covering the main points. Adding deeper trade-offs and examples will strengthen it."
    else:
        overall = "Basic understanding shown. Provide more detailed explanations, terminology, and practical examples."

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
