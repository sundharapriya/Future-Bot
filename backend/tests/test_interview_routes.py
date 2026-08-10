import os
import tempfile

import pytest
from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_health_check():
    resp = client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json().get("status") == "success"


def test_start_and_question_cycle(tmp_path):
    # start
    payload = {"category": "Python", "difficulty": "Easy", "number_of_questions": 5}
    resp = client.post("/api/interview/start", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("session_id")
    session_id = data["session_id"]

    # get question
    q1 = client.get(f"/api/interview/question/{session_id}")
    assert q1.status_code == 200
    qdata = q1.json()
    assert qdata.get("question_number") == 1
    assert qdata.get("question")

    # submit answer
    ans_payload = {
        "session_id": session_id,
        "question_number": 1,
        "question": qdata["question"],
        "answer": "My answer",
    }
    s = client.post("/api/interview/answer", json=ans_payload)
    assert s.status_code == 200
    assert s.json().get("status") == "success"


def test_evaluate_score_and_report_flow():
    payload = {"category": "Python", "difficulty": "Easy", "number_of_questions": 5}
    resp = client.post("/api/interview/start", json=payload)
    assert resp.status_code == 200
    session_id = resp.json()["session_id"]

    q = client.get(f"/api/interview/question/{session_id}")
    assert q.status_code == 200
    qdata = q.json()

    # submit answer
    ans_payload = {
        "session_id": session_id,
        "question_number": qdata["question_number"],
        "question": qdata["question"],
        "answer": "This is a test answer that mentions list and mutable to trigger simple evaluator",
    }
    s = client.post("/api/interview/answer", json=ans_payload)
    assert s.status_code == 200

    # evaluate
    eval_payload = {
        "session_id": session_id,
        "question_number": qdata["question_number"],
        "question": qdata["question"],
        "answer": ans_payload["answer"],
    }
    e = client.post("/api/interview/evaluate", json=eval_payload)
    assert e.status_code == 200
    eval_result = e.json()
    assert "score" in eval_result

    # score
    sc = client.get(f"/api/interview/score/{session_id}")
    assert sc.status_code == 200
    score_json = sc.json()
    assert score_json.get("session_id") == session_id

    # report (will be None until all questions answered, but should return 200 or 404 handled)
    r = client.get(f"/api/interview/report/{session_id}")
    # report may return 404 if not enough data; assert proper status codes
    assert r.status_code in (200, 404)


def test_invalid_session_and_bad_requests():
    # missing session
    missing = client.get("/api/interview/question/not-a-session")
    assert missing.status_code == 404

    # submit empty answer
    payload = {"session_id": "", "question_number": 1, "question": "q", "answer": ""}
    r = client.post("/api/interview/answer", json=payload)
    assert r.status_code == 422 or r.status_code == 400
