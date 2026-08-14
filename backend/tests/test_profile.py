from fastapi.testclient import TestClient
from main import app
import uuid


client = TestClient(app)


def test_profile_update_and_password_change():
    # register with unique email
    unique = uuid.uuid4().hex[:8]
    email = f"ptest+{unique}@example.com"
    resp = client.post("/api/v1/auth/register", json={"name": "P Test", "email": email, "password": "oldpass", "preferred_role": "dev"})
    assert resp.status_code == 200

    # login
    resp = client.post("/api/v1/auth/login", json={"email": email, "password": "oldpass"})
    assert resp.status_code == 200
    token = resp.json().get("access_token")
    assert token

    headers = {"Authorization": f"Bearer {token}"}

    # update profile
    resp = client.put("/api/v1/auth/profile", json={"name": "P Tester", "bio": "I test things."}, headers=headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("name") == "P Tester"
    assert data.get("bio") == "I test things."

    # change password
    resp = client.put("/api/v1/auth/password", json={"current_password": "oldpass", "new_password": "newpass"}, headers=headers)
    assert resp.status_code == 200

    # login with new password
    resp = client.post("/api/v1/auth/login", json={"email": email, "password": "newpass"})
    assert resp.status_code == 200
