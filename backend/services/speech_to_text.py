import os
import tempfile
import time
from pathlib import Path
from typing import BinaryIO

from fastapi import UploadFile

SUPPORTED_AUDIO_CONTENT_TYPES = {
    "audio/wav": ".wav",
    "audio/x-wav": ".wav",
    "audio/mpeg": ".mp3",
    "audio/mp3": ".mp3",
    "audio/flac": ".flac",
    "audio/x-flac": ".flac",
    "audio/ogg": ".ogg",
    "audio/webm": ".webm",
    "audio/x-m4a": ".m4a",
    "audio/mp4": ".mp4",
}
MAX_AUDIO_UPLOAD_SIZE = 5 * 1024 * 1024  # 5 MB
SUPPORTED_AUDIO_EXTENSIONS = set(SUPPORTED_AUDIO_CONTENT_TYPES.values())

OPENAI_API_KEY_ENV = "OPENAI_API_KEY"
FALLBACK_API_KEY_ENV = "LLM_API_KEY"


class SpeechToTextError(Exception):
    pass


def _validate_audio_file(upload_file: UploadFile) -> str:
    if upload_file.content_type is None:
        raise SpeechToTextError("Missing audio content type")

    if upload_file.content_type not in SUPPORTED_AUDIO_CONTENT_TYPES:
        raise SpeechToTextError(
            f"Unsupported content type: {upload_file.content_type}. Supported types: {', '.join(sorted(SUPPORTED_AUDIO_CONTENT_TYPES.keys()))}"
        )

    filename = upload_file.filename or "audio"
    extension = Path(filename).suffix.lower()
    if extension and extension not in SUPPORTED_AUDIO_EXTENSIONS:
        raise SpeechToTextError(
            f"Unsupported audio file extension: {extension}. Supported extensions: {', '.join(sorted(SUPPORTED_AUDIO_EXTENSIONS))}"
        )

    return extension or SUPPORTED_AUDIO_CONTENT_TYPES[upload_file.content_type]


def _get_api_key() -> str:
    api_key = os.getenv(OPENAI_API_KEY_ENV) or os.getenv(FALLBACK_API_KEY_ENV)
    if not api_key:
        raise SpeechToTextError(
            "Speech-to-text requires an OpenAI API key. Set OPENAI_API_KEY or LLM_API_KEY."
        )
    return api_key


def _write_temp_audio_file(upload_file: UploadFile, suffix: str) -> Path:
    upload_file.file.seek(0)
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        total = 0
        while chunk := upload_file.file.read(4096):
            total += len(chunk)
            if total > MAX_AUDIO_UPLOAD_SIZE:
                raise SpeechToTextError("Audio file is too large. Maximum size is 5 MB.")
            tmp.write(chunk)
        tmp.flush()
        temp_path = Path(tmp.name)

    if temp_path.stat().st_size == 0:
        temp_path.unlink(missing_ok=True)
        raise SpeechToTextError("Uploaded audio file is empty")

    return temp_path


def _transcribe_with_openai(audio_path: Path) -> str:
    try:
        import openai
    except ImportError as exc:
        raise SpeechToTextError(
            "OpenAI package is required for speech transcription. Install openai in the backend environment."
        ) from exc

    api_key = _get_api_key()
    openai.api_key = api_key

    last_exc = None
    for attempt in range(3):
        try:
            with open(audio_path, "rb") as audio_file:
                transcript = openai.Audio.transcribe("gpt-4o-transcribe", file=audio_file)
            break
        except Exception as exc:
            last_exc = exc
            if attempt < 2:
                time.sleep(1 + attempt)
    else:
        raise SpeechToTextError(f"Speech transcription failed after retries: {last_exc}") from last_exc

    if not isinstance(transcript, dict) or "text" not in transcript:
        raise SpeechToTextError("Speech transcription returned an unexpected response")

    text = transcript.get("text")
    if not text or not isinstance(text, str):
        raise SpeechToTextError("Transcription result was empty")

    return text.strip()


def transcribe_audio(upload_file: UploadFile) -> str:
    extension = _validate_audio_file(upload_file)
    temp_path = _write_temp_audio_file(upload_file, extension)
    try:
        return _transcribe_with_openai(temp_path)
    finally:
        try:
            temp_path.unlink(missing_ok=True)
        except Exception:
            pass
