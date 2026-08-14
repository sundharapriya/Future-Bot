# Backend — Interview Buddy

Quick guide to run the backend locally and manage DB migrations.

Prereqs

- Python 3.11+
- Virtualenv (recommended)

Setup

1. Create and activate virtualenv

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies

```powershell
python -m pip install -r requirements.txt
```

3. Configure environment (create `backend/.env` or set env vars)

- `DATABASE_URL` — your Postgres URL
- `JWT_SECRET_KEY` — set a strong secret
- Optional: `LLM_API_KEY`, `ALLOWED_ORIGINS`, `PORT`

Run migrations

```powershell
# from repo root
Set-Location backend
python -m alembic upgrade head
```

Start server

```powershell
Set-Location backend
$env:JWT_SECRET_KEY = 'your-jwt-secret'
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Run tests

```powershell
# from backend folder
python -m pytest -q tests
```

Notes

- Do NOT commit secrets to source control.
- Alembic revisions live under `backend/alembic/versions`.
  Backend - Future-Bot (Phase 1)
  \=================================

Phase 1: Project foundation.

What was added in Phase 1:

- `backend/core/config.py` - pydantic settings for environment variables.
- `backend/core/security.py` - password hashing and JWT helpers (stubs for later phases).
- `backend/core/dependencies.py` - FastAPI dependency stub to extract current user.
- `backend/core/exceptions.py` - base exceptions.
- `.env.example` - example environment variables.
- `requirements.txt` updated to include `passlib` and `python-jose`.

Next steps (Phase 2):

- Switch database to PostgreSQL via `DATABASE_URL` and add Alembic migrations.
- Implement full authentication endpoints and user model.
