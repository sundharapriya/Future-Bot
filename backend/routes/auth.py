from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials
from core.dependencies import auth_scheme
from core.security import decode_access_token, create_access_token
from datetime import timedelta
from schemas.auth import RegisterRequest, RegisterResponse, LoginRequest, LoginResponse
from schemas.user import UserProfile
from services import auth_service
from services.db import get_user_by_email, get_user_by_id
from services.db import revoke_token
from core.dependencies import get_current_user

router = APIRouter()


@router.post("/auth/register", response_model=RegisterResponse)
async def register(payload: RegisterRequest):
    try:
        user = auth_service.register_user(payload.name, payload.email, payload.password, payload.preferred_role)
        return RegisterResponse(success=True, message="User created")
    except auth_service.AuthError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.post("/auth/login", response_model=LoginResponse)
async def login(payload: LoginRequest):
    res = auth_service.authenticate_user(payload.email, payload.password)
    if not res:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return LoginResponse(success=True, access_token=res["access_token"])


@router.get("/auth/me", response_model=UserProfile)
async def me(user_id: str = Depends(get_current_user)):
    user = get_user_by_id(user_id) if user_id else None
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserProfile(id=user.id, name=user.name, email=user.email, preferred_role=user.preferred_role)



@router.post("/auth/logout")
async def logout(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = credentials.credentials
    try:
        payload = decode_access_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    jti = payload.get("jti")
    if not jti:
        raise HTTPException(status_code=400, detail="Token missing jti")
    revoke_token(jti)
    return {"success": True, "message": "Logged out"}



@router.post("/auth/refresh", response_model=LoginResponse)
async def refresh(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = credentials.credentials
    try:
        payload = decode_access_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    jti = payload.get("jti")
    sub = payload.get("sub")
    if not jti or not sub:
        raise HTTPException(status_code=400, detail="Invalid token payload")
    revoke_token(jti)
    new_token = create_access_token(subject=sub, expires_delta=timedelta(hours=12))
    return LoginResponse(success=True, access_token=new_token)
