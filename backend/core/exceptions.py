class AppError(Exception):
    """Base application exception."""


class AuthError(AppError):
    """Authentication / authorization related errors."""
