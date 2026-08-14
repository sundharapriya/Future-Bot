try:
    # pydantic v2.13+ moved BaseSettings to the pydantic-settings package
    from pydantic_settings import BaseSettings, SettingsConfigDict  # type: ignore
except Exception:
    try:
        from pydantic import BaseSettings  # type: ignore
        from pydantic_settings import SettingsConfigDict  # type: ignore
    except Exception as exc:
        raise ImportError(
            "pydantic BaseSettings is unavailable. Install 'pydantic-settings' or pin pydantic<2.13"
        ) from exc
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).resolve().parent.parent
DEFAULT_DB_FILE = BASE_DIR / "interview_history.db"
DEFAULT_DATABASE_URL = f"sqlite:///{DEFAULT_DB_FILE.as_posix()}"

# Load environment variables from backend/.env (highest priority) then root/.env
load_dotenv(dotenv_path=BASE_DIR / ".env", override=False)
load_dotenv(dotenv_path=BASE_DIR / "backend" / ".env", override=True)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    DATABASE_URL: str = DEFAULT_DATABASE_URL
    JWT_SECRET_KEY: str = "change-me-in-production"
    LLM_API_KEY: Optional[str] = None
    LLM_MODEL: str = "gpt-4o-mini"
    FRONTEND_URL: Optional[str] = None
    ALLOWED_ORIGINS: str = "*"
    PORT: int = 8000


settings = Settings()
