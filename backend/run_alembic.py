import os
import sys
import subprocess

# Set these here or rely on backend/.env
DATABASE_URL = os.environ.get("DATABASE_URL")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-jwt-secret-replace-me")

if not DATABASE_URL:
    print("DATABASE_URL not set in environment; read backend/.env or set DATABASE_URL and retry.")
    sys.exit(1)

env = os.environ.copy()
env["DATABASE_URL"] = DATABASE_URL
env["JWT_SECRET_KEY"] = JWT_SECRET_KEY

print("Running alembic upgrade head in backend/ with provided DATABASE_URL")
res = subprocess.run([sys.executable, "-m", "alembic", "upgrade", "head"], cwd=".", env=env)
sys.exit(res.returncode)
