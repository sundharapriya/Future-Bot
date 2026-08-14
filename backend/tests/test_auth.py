import os
import uuid
from dotenv import load_dotenv
from fastapi.testclient import TestClient

load_dotenv()

from main import app


def test_register_login_and_me():
    client = TestClient(app)

    unique = uuid.uuid4().hex[:8]
    email = f"test+{unique}@example.com"
    password = "TestPass123!"

    # Register
    r = client.post("/api/v1/auth/register", json={"name": "Test User", "email": email, "password": password, "preferred_role": "developer"})
    assert r.status_code == 200, r.text
    assert r.json().get("success") is True

    # Login
    r = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert r.status_code == 200, r.text
    data = r.json()
    token = data.get("access_token")
    assert token

    # Me
    headers = {"Authorization": f"Bearer {token}"}
    r = client.get("/api/v1/auth/me", headers=headers)
    assert r.status_code == 200, r.text
    profile = r.json()
    assert profile.get("email") == email

    # Refresh token
    r = client.post("/api/v1/auth/refresh", headers=headers)
    assert r.status_code == 200, r.text
    new_token = r.json().get("access_token")
    assert new_token and new_token != token

    # Logout (revoke)
    headers_new = {"Authorization": f"Bearer {new_token}"}
    r = client.post("/api/v1/auth/logout", headers=headers_new)
    assert r.status_code == 200, r.text

    # Old token should be invalid after revoke (logout revoked new_token)
    r = client.get("/api/v1/auth/me", headers=headers_new)
    assert r.status_code == 401
