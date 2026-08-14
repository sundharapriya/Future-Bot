from database import engine
from sqlalchemy import text

with engine.connect() as conn:
    # Add bio column if missing
    try:
        conn.execute(text("ALTER TABLE users ADD COLUMN bio TEXT"))
    except Exception:
        pass
    try:
        conn.execute(text("ALTER TABLE users ADD COLUMN avatar_url VARCHAR(512)"))
    except Exception:
        pass
    print("Ensured profile columns exist (if DB supports ALTER TABLE)")
