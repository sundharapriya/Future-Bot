import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'backend'))
from database import engine
from sqlalchemy import inspect, text

print('engine url:', engine.url)
print('dialect:', engine.dialect.name)
print('has users table:', inspect(engine).has_table('users'))
with engine.connect() as conn:
    try:
        result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position"))
        columns = [row[0] for row in result]
        print('users columns:', columns)
    except Exception as exc:
        print('schema query failed:', type(exc).__name__, exc)
    try:
        conn.execute(text('ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT'))
        conn.execute(text('ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(512)'))
        print('alter columns attempted')
    except Exception as exc:
        print('alter failed:', type(exc).__name__, exc)
    try:
        result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position"))
        columns = [row[0] for row in result]
        print('users columns after alter:', columns)
    except Exception as exc:
        print('schema query failed after alter:', type(exc).__name__, exc)
