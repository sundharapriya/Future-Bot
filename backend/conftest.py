"""
conftest.py — ensures the backend package root is on sys.path so that
`from main import app` (and all other backend-relative imports) resolve
correctly when pytest is invoked from the repo root *or* from backend/.
"""
import sys
import os

# Insert the directory that contains main.py so that `import main` works.
sys.path.insert(0, os.path.dirname(__file__))
