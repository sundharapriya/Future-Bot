"""
conftest.py — ensures the backend package root is on sys.path so that
`from main import app` (and all other backend-relative imports) resolve
correctly when pytest is invoked from the repo root *or* from backend/.
"""
import sys
import os

# Insert the directory that contains main.py so that `import main` works.
sys.path.insert(0, os.path.dirname(__file__))
# Ensure tests use the local sqlite DB to avoid touching production DBs
os.environ["DATABASE_URL"] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'interview_history.db')}"
# Ensure sqlite DB file exists and is writable for tests
db_path = os.path.join(os.path.dirname(__file__), "interview_history.db")
try:
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    open(db_path, "a").close()
except Exception:
    # If we cannot create the file, tests may still run against in-memory DBs
    pass
