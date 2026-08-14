import os
import sys
import logging
from typing import List

# Ensure backend package imports (e.g. `services.*`) resolve when running
# `backend.main` from the repository root (so `uvicorn backend.main:app` works).
sys.path.insert(0, os.path.dirname(__file__))

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from services.db import DatabaseError
from services.speech_to_text import SpeechToTextError
from database import init_db

# Load environment variables from the backend folder's .env if present
backend_dir = os.path.dirname(__file__)
load_dotenv(dotenv_path=os.path.join(backend_dir, ".env"))

# Basic config
APP_NAME = "AI Interview Assistant"
API_PREFIX = "/api/v1"

logger = logging.getLogger("uvicorn.error")

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

# Create app
app = FastAPI(title=APP_NAME, lifespan=lifespan)

# CORS configuration
_allowed_origins = os.getenv("ALLOWED_ORIGINS", "*")
if _allowed_origins.strip() == "*":
    origins: List[str] = ["*"]
else:
    origins = [o.strip() for o in _allowed_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

# Include routes
from routes import health as health_route  # local import
from routes import interview as interview_route  # local import
from routes import speech as speech_route  # local import
from routes import auth as auth_route  # local import
from routes import profile as profile_route  # local import

app.include_router(health_route.router, prefix=API_PREFIX)
app.include_router(interview_route.router, prefix=API_PREFIX)
app.include_router(speech_route.router, prefix=API_PREFIX)
app.include_router(auth_route.router, prefix=API_PREFIX)
app.include_router(profile_route.router, prefix=API_PREFIX)


# Exception handlers
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"status": "error", "message": "Internal server error"},
    )


@app.exception_handler(DatabaseError)
async def database_exception_handler(request: Request, exc: DatabaseError):
    logger.error("Database error: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"status": "error", "message": "Database failure"},
    )


@app.exception_handler(SpeechToTextError)
async def speech_exception_handler(request: Request, exc: SpeechToTextError):
    logger.warning("Speech to text error: %s", exc)
    return JSONResponse(
        status_code=400,
        content={"status": "error", "message": str(exc)},
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"status": "error", "message": exc.detail if isinstance(exc.detail, str) else "Invalid request"},
    )


# Root
@app.get("/")
async def root():
    return {"status": "success", "message": "AI Interview Assistant backend (root)"}


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
