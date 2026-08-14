import urllib.request
import urllib.error
import json
import uuid

base = "http://127.0.0.1:8000"
email = f"test+{uuid.uuid4().hex[:8]}@example.com"
print("register", email)
req = urllib.request.Request(
    base + "/api/v1/auth/register",
    data=json.dumps(
        {
            "name": "Test User",
            "email": email,
            "password": "TestPass123!",
            "preferred_role": "developer",
        }
    ).encode(),
    headers={"Content-Type": "application/json"},
)
try:
    resp = urllib.request.urlopen(req)
    print("register", resp.status, resp.read().decode())
except urllib.error.HTTPError as e:
    print("register error", e.code)
    print(e.read().decode())
    raise
req = urllib.request.Request(
    base + "/api/v1/auth/login",
    data=json.dumps({"email": email, "password": "TestPass123!"}).encode(),
    headers={"Content-Type": "application/json"},
)
resp = urllib.request.urlopen(req)
login = json.loads(resp.read().decode())
print("login", login)
auth = "Bearer " + login["access_token"]
req = urllib.request.Request(base + "/api/v1/auth/me", headers={"Authorization": auth})
resp = urllib.request.urlopen(req)
print("profile", resp.status, resp.read().decode())
req = urllib.request.Request(
    base + "/api/v1/interview/start",
    data=json.dumps({"category": "Python", "difficulty": "Easy", "number_of_questions": 5}).encode(),
    headers={"Content-Type": "application/json"},
)
resp = urllib.request.urlopen(req)
start = json.loads(resp.read().decode())
print("start", start)
session_id = start["session_id"]
q = urllib.request.urlopen(base + f"/api/v1/interview/question/{session_id}")
question = json.loads(q.read().decode())
print("question", question)
ans_payload = {
    "session_id": session_id,
    "question_number": question["question_number"],
    "question": question["question"],
    "answer": "This is a test answer for the interview.",
}
req = urllib.request.Request(
    base + "/api/v1/interview/answer",
    data=json.dumps(ans_payload).encode(),
    headers={"Content-Type": "application/json"},
)
resp = urllib.request.urlopen(req)
print("answer", resp.status, resp.read().decode())
req = urllib.request.Request(
    base + "/api/v1/interview/evaluate",
    data=json.dumps(ans_payload).encode(),
    headers={"Content-Type": "application/json"},
)
resp = urllib.request.urlopen(req)
evalr = json.loads(resp.read().decode())
print("evaluate", evalr)
score = json.loads(
    urllib.request.urlopen(base + f"/api/v1/interview/score/{session_id}").read().decode()
)
print("score", score)
try:
    report = json.loads(
        urllib.request.urlopen(base + f"/api/v1/interview/report/{session_id}").read().decode()
    )
    print("report", report)
except urllib.error.HTTPError as e:
    print("report error", e.code, e.read().decode())
