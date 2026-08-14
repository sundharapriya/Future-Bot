import os
import json
import urllib.request
from typing import List, Dict, Any


LLM_API_KEY_ENV = "LLM_API_KEY"
OPENAI_API_KEY_ENV = "OPENAI_API_KEY"


class LLMError(Exception):
    pass


def _build_prompt(category: str, difficulty: str, previous_questions: List[str]) -> str:
    prev = "\n".join(f"- {q}" for q in previous_questions) if previous_questions else "(none)"
    return (
        f"You are an interview question generator. Produce one clear and concise interview question "
        f"for the category '{category}' at '{difficulty}' difficulty. Avoid repeating any previous questions. "
        f"Return only the question text without numbering or commentary.\n\n"
        f"Previous questions:\n{prev}\n\nQuestion:"
    )


def _call_openai_chat(prompt: str, api_key: str, model: str = "gpt-4o-mini") -> str:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }
    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant who writes interview questions."},
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 200,
        "temperature": 0.7,
    }
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            res_text = resp.read().decode("utf-8")
            j = json.loads(res_text)
            return j["choices"][0]["message"]["content"].strip()
    except Exception as e:
        raise LLMError(f"LLM request failed: {e}") from e


def _get_api_key() -> str | None:
    return os.getenv(LLM_API_KEY_ENV) or os.getenv(OPENAI_API_KEY_ENV)


def generate_question(session: Dict[str, Any]) -> str:
    """Generate a question for the session using an LLM if available, otherwise a deterministic fallback."""
    category = session.get("category") or "General"
    difficulty = session.get("difficulty") or "Medium"
    previous = session.get("previous_questions", []) or []
    prompt = _build_prompt(category, difficulty, previous)

    api_key = _get_api_key()
    if api_key:
        try:
            response = _call_openai_chat(prompt, api_key)
            if response:
                return response
        except LLMError:
            pass

    # Fallback deterministic generator
    base = {
        "Python": "What is the difference between a list and a tuple in Python?",
        "SQL": "Explain the difference between INNER JOIN and LEFT JOIN.",
        "Machine Learning": "What is overfitting and how can you prevent it?",
        "Artificial Intelligence": "Describe the difference between symbolic AI and machine learning approaches.",
        "Data Analytics": "How do you handle missing data when analyzing a dataset?",
        "Data Structures": "Explain how a binary search tree works and its time complexities.",
        "HR": "How would you assess cultural fit during an interview?",
    }
    suffix = {
        "Easy": " Keep it brief and beginner-friendly.",
        "Medium": " Include moderate depth appropriate for an interview.",
        "Hard": " Make it challenging and suitable for evaluating deep understanding.",
    }
    q = base.get(category, f"Write an interview question about {category}.")
    candidate = q + suffix.get(difficulty, "")
    if any(candidate.strip().lower() == prev_q.strip().lower() for prev_q in previous):
        candidate = candidate + " Provide a practical example in your answer."
    return candidate
