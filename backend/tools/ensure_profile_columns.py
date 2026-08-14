import sys
from pathlib import Path

# Ensure imports resolve when run from repo root
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from database import engine
from sqlalchemy import text

with engine.connect() as conn:
    try:
        conn.execute(text('ALTER TABLE users ADD COLUMN bio TEXT'))
    except Exception:
        pass
    try:
        conn.execute(text('ALTER TABLE users ADD COLUMN avatar_url VARCHAR(512)'))
    except Exception:
        pass

print('Ensured profile columns exist (if supported by DB)')
