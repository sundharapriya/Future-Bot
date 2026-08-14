import os

import pytest
from fastapi.testclient import TestClient

from main import app
from services.answer_evaluator import EvaluationResult, evaluate_answer
from services.question_generator import generate_question, _call_openai_chat
from services.speech_to_text import MAX_AUDIO_UPLOAD_SIZE

client = TestClient(app)


def test_question_generator_fallback_no_api_key(monkeypatch):
    monkeypatch.delenv("LLM_API_KEY", raising=False)
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)

    session = {"category": "Python", "difficulty": "Easy", "previous_questions": ["What is a list?"]}
    question = generate_question(session)

    assert question
    assert isinstance(question, str)
    assert "list" in question.lower() or "python" in question.lower()


def test_question_generator_uses_openai_key(monkeypatch):
    monkeypatch.setenv("OPENAI_API_KEY", "test-key")

    def fake_call(prompt: str, api_key: str, model: str = "gpt-4o-mini"):
        assert api_key == "test-key"
        return "Generated interview question"

    monkeypatch.setattr("services.question_generator._call_openai_chat", fake_call)

    question = generate_question({"category": "Python", "difficulty": "Medium", "previous_questions": []})
    assert question == "Generated interview question"


def test_answer_evaluator_fallback_returns_valid_structure():
    result = evaluate_answer("What is a list in Python?", "A list is a mutable sequence of items.")
    assert isinstance(result, EvaluationResult)
    assert 0 <= result.score <= 10
    assert result.overall_feedback
    assert isinstance(result.strengths, list)
    assert isinstance(result.weaknesses, list)
    assert isinstance(result.suggestions, list)


def test_transcribe_speech_requires_api_key(tmp_path, monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    monkeypatch.delenv("LLM_API_KEY", raising=False)

    audio_path = tmp_path / "sample.wav"
    audio_path.write_bytes(b"RIFF" + b"\x00" * 1024)

    with open(audio_path, "rb") as audio_file:
        response = client.post(
            "/api/v1/speech/transcribe",
            files={"file": ("sample.wav", audio_file, "audio/wav")},
        )

    assert response.status_code == 400
    assert response.json().get("message")
    assert "API key" in response.json()["message"] or "Speech-to-text" in response.json()["message"]
