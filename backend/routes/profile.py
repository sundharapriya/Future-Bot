from fastapi import APIRouter, HTTPException, Depends
from core.dependencies import get_current_user
from schemas.user import UserProfile, UpdateProfileRequest, ChangePasswordRequest
from services.db import get_user_by_id, update_user_profile, update_user_password
from core.security import verify_password, hash_password

router = APIRouter()


@router.get("/auth/profile", response_model=UserProfile)
def get_profile(user_id: str = Depends(get_current_user)):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserProfile(id=user.id, name=user.name, email=user.email, preferred_role=user.preferred_role, bio=user.bio, avatar_url=user.avatar_url)


@router.put("/auth/profile", response_model=UserProfile)
def put_profile(payload: UpdateProfileRequest, user_id: str = Depends(get_current_user)):
    user = update_user_profile(int(user_id), name=payload.name, preferred_role=payload.preferred_role, bio=getattr(payload, 'bio', None), avatar_url=getattr(payload, 'avatar_url', None))
    return UserProfile(id=user.id, name=user.name, email=user.email, preferred_role=user.preferred_role, bio=user.bio, avatar_url=user.avatar_url)


@router.put("/auth/password")
def change_password(payload: ChangePasswordRequest, user_id: str = Depends(get_current_user)):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_password(payload.current_password, user.password_hash):
        raise HTTPException(status_code=401, detail="Current password incorrect")
    new_hash = hash_password(payload.new_password)
    update_user_password(int(user_id), new_hash)
    return {"success": True, "message": "Password changed"}
