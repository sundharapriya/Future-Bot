from datetime import timedelta
from typing import Optional

from core.security import hash_password, verify_password, create_access_token
from services.db import create_user, get_user_by_email, DatabaseError


class AuthError(Exception):
    pass


def register_user(name: Optional[str], email: str, password: str, preferred_role: Optional[str] = None):
    pwd = hash_password(password)
    try:
        user = create_user(name=name, email=email, password_hash=pwd, preferred_role=preferred_role)
        return user
    except DatabaseError as exc:
        raise AuthError(str(exc)) from exc


def authenticate_user(email: str, password: str):
    try:
        user = get_user_by_email(email)
    except DatabaseError as exc:
        raise AuthError("Database error") from exc
    if user is None:
        return None
    if not verify_password(password, user.password_hash):
        return None
    access_token = create_access_token(subject=str(user.id), expires_delta=timedelta(hours=12))
    return {"access_token": access_token, "user": user}
