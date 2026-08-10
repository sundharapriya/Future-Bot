import os
import json
import urllib.request
from typing import List, Dict, Any


LLM_API_KEY_ENV = "LLM_API_KEY"


class LLMError(Exception):
    pass


def _build_prompt(category: str, difficulty: str, previous_questions: List[str]) -> str:
    prev = "\n".join(f"- {q}" for q in previous_questions) if previous_questions else "(none)"
    prompt = (
        f"You are an interview question generator. Produce a single, clear, concise interview question "
        f"that matches the category '{category}' and difficulty '{difficulty}'. Do NOT repeat any of the "
        f"previous questions listed below. Make the question suitable for an interview. Return only the "
        f"question text without numbering or additional commentary.\n\n"
        f"Previous questions:\n{prev}\n\nQuestion:"
    )
    return prompt


def _call_openai_chat(prompt: str, api_key: str, model: str = "gpt-4o-mini") -> str:
    # Minimal OpenAI-compatible POST using stdlib
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }
    body = {
        "model": model,
        "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": prompt}],
        "max_tokens": 200,
        "temperature": 0.7,
    }
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            res_text = resp.read().decode("utf-8")
            j = json.loads(res_text)
            # Navigate typical OpenAI chat response shape
            return j["choices"][0]["message"]["content"].strip()
    except Exception as e:
        raise LLMError(f"LLM request failed: {e}") from e


def generate_question(session: Dict[str, Any]) -> str:
    """Generate a single question for the session.

    If an LLM API key is configured (`LLM_API_KEY`), call the remote API. Otherwise
    fall back to a deterministic local generator (safe for testing).
    """
    category = session.get("category")
    difficulty = session.get("difficulty")
    previous = session.get("previous_questions", []) or []

    prompt = _build_prompt(category, difficulty, previous)

    api_key = os.getenv(LLM_API_KEY_ENV)
    if api_key:
        return _call_openai_chat(prompt, api_key)

    # Fallback deterministic generator (no external calls)
    # Simple template-based questions per category/difficulty for local testing.
    base = {
        "Python": "What is the difference between a list and a tuple in Python?",
        "SQL": "Explain the difference between INNER JOIN and LEFT JOIN.",
        "Machine Learning": "What is overfitting and how can you prevent it?",
        "Artificial Intelligence": "Describe the difference between symbolic AI and machine learning approaches.",
        "Data Analytics": "How do you handle missing data when analyzing a dataset?",
        "Data Structures": "Explain how a binary search tree works and its time complexities.",
        "HR": "How would you assess cultural fit during an interview?",
    }

    # Variation by difficulty
    suffix = {
        "Easy": " Keep it short and clear.",
        "Medium": " Include moderate depth appropriate for an interview.",
        "Hard": " Make it challenging and suitable for evaluating deep understanding.",
    }

    q = base.get(category, "Write an interview question related to " + category)
    candidate = q + suffix.get(difficulty, "")

    # Avoid repeating previous questions: if candidate already present, append a small variant.
    if candidate in previous or q in previous:
        candidate = candidate + " Provide a variant focusing on practical examples."

    return candidate
