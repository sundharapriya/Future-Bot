import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load .env in backend folder if present
load_dotenv()

url = os.environ.get("DATABASE_URL")
if not url:
    print("Set DATABASE_URL environment variable or add it to backend/.env before running this script.")
    raise SystemExit(1)

e = create_engine(url)
with e.connect() as c:
    rows = c.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public'"))
    print([r[0] for r in rows.fetchall()])
