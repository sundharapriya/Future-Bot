import os
import sys
from pathlib import Path

ROOT = Path.cwd()
BACKEND = ROOT / "backend"
sys.path.insert(0, str(BACKEND))

import core.config as config
from database import engine
from models import User
from services.db import init_db, create_user

print('cwd', ROOT)
print('backend path', BACKEND)
print('env DATABASE_URL', os.getenv('DATABASE_URL'))
print('settings DATABASE_URL', config.settings.DATABASE_URL)
print('engine url', engine.url)
print('engine dialect', engine.dialect.name)
print('user table columns', User.__table__.columns.keys())
with engine.connect() as conn:
    print('has table users', engine.dialect.has_table(conn, 'users'))
    try:
        result = conn.execute(
            "SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position"
        )
        print('users columns in db', [row[0] for row in result])
    except Exception as exc:
        print('column query exception', type(exc).__name__, exc)

init_db()
print('db init done')
try:
    email = f"test+{os.urandom(4).hex()}@example.com"
    user = create_user(name='Direct', email=email, password_hash='x', preferred_role='developer')
    print('created user', user.id, user.email)
except Exception as exc:
    print('create_user exception', type(exc).__name__, exc)
