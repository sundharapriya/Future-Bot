import os
import sys
sys.path.insert(0, os.path.join(os.getcwd(), 'backend'))
from database import engine
from sqlalchemy import text

print('engine url:', engine.url)
print('dialect:', engine.dialect.name)
with engine.connect() as conn:
    print('current_schema:')
    result = conn.execute(text('select current_schema()'))
    print(result.fetchone())
    print('table schemas and columns:')
    result = conn.execute(text("SELECT table_schema, column_name FROM information_schema.columns WHERE table_name='users' ORDER BY table_schema, ordinal_position"))
    for row in result:
        print(row)
    print('select user rows sample:')
    try:
        result = conn.execute(text("SELECT id, name, email, password_hash, preferred_role, created_at, updated_at, bio, avatar_url FROM users LIMIT 1"))
        print(result.fetchall())
    except Exception as exc:
        print('select failed:', type(exc).__name__, exc)
