import os
from pathlib import Path

from sqlalchemy import create_engine, pool, text
from sqlalchemy.orm import declarative_base, sessionmaker

from core.config import settings

BASE_DIR = Path(__file__).resolve().parent
DB_FILE = BASE_DIR.parent / "interview_history.db"

# Prefer explicit env var, otherwise use settings (which has a default).
raw_database_url = os.getenv("DATABASE_URL") or settings.DATABASE_URL or f"sqlite:///{DB_FILE}"

# Normalize SQLite relative paths to absolute paths so the engine can open the file
if raw_database_url.startswith("sqlite:"):
    if raw_database_url in ("sqlite://", "sqlite:///:memory:"):
        DATABASE_URL = raw_database_url
    else:
        # Strip scheme
        if raw_database_url.startswith("sqlite:///"):
            path_part = raw_database_url[len("sqlite:///"):]
        else:
            path_part = raw_database_url.split("sqlite:", 1)[1]
        
        # Check if already absolute (Unix starts with /, Windows has drive letter like C:)
        is_abs = path_part.startswith("/") or (len(path_part) > 1 and path_part[1] == ":") or os.path.isabs(path_part)
        if not is_abs:
            abs_path = (BASE_DIR.parent / path_part).resolve()
            DATABASE_URL = f"sqlite:///{abs_path.as_posix()}"
        else:
            DATABASE_URL = raw_database_url
else:
    DATABASE_URL = raw_database_url

# Configure the engine based on database type
if DATABASE_URL.startswith("postgresql"):
    engine = create_engine(
        DATABASE_URL,
        pool_size=10,
        max_overflow=20,
        pool_pre_ping=True,
        echo=False,
    )
else:
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=pool.StaticPool,
        future=True,
    )

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()


def _column_exists(conn, table_name: str, column_name: str) -> bool:
    if engine.dialect.name == "sqlite":
        result = conn.execute(text(f"PRAGMA table_info({table_name})"))
        return any(row[1] == column_name for row in result)
    else:
        result = conn.execute(text(
            "SELECT column_name FROM information_schema.columns "
            "WHERE table_name = :table_name AND column_name = :column_name"
        ), {"table_name": table_name, "column_name": column_name})
        return result.first() is not None


def _ensure_column(conn, table_name: str, column_name: str, column_type: str) -> None:
    if _column_exists(conn, table_name, column_name):
        return
    if engine.dialect.name == "sqlite":
        conn.execute(text(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_type}"))
    else:
        conn.execute(text(f"ALTER TABLE {table_name} ADD COLUMN IF NOT EXISTS {column_name} {column_type}"))


def init_db() -> None:
    """Initialize the database by creating all tables."""
    Base.metadata.create_all(bind=engine)
    # Ensure new optional profile columns exist for development/test DBs
    try:
        with engine.begin() as conn:
            _ensure_column(conn, "users", "bio", "TEXT")
            _ensure_column(conn, "users", "avatar_url", "VARCHAR(512)")
    except Exception:
        # best-effort: ignore errors from DBs that don't support ALTER TABLE or when columns already exist.
        pass
