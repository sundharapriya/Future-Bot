from pydantic import BaseModel, EmailStr
from typing import Optional


class RegisterRequest(BaseModel):
    name: Optional[str]
    email: EmailStr
    password: str
    preferred_role: Optional[str] = None


class RegisterResponse(BaseModel):
    success: bool
    message: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    success: bool
    access_token: str
    token_type: str = "bearer"
