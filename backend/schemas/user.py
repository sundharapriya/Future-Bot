from pydantic import BaseModel, EmailStr
from typing import Optional


class UserProfile(BaseModel):
    id: int
    name: Optional[str]
    email: EmailStr
    preferred_role: Optional[str]
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    preferred_role: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
