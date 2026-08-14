from datetime import datetime, timedelta
import uuid
from typing import Optional

from passlib.context import CryptContext
from jose import jwt, JWTError

from .config import settings

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=60))
    jti = uuid.uuid4().hex
    to_encode = {"sub": subject, "exp": int(expire.timestamp()), "jti": jti}
    token = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm="HS256")
    return token


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
        return payload
    except JWTError as exc:
        raise ValueError(f"Invalid token: {exc}") from exc
