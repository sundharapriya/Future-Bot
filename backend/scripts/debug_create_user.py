import os, sys, traceback
os.environ['DATABASE_URL']='sqlite:///./backend/interview_history.db'
sys.path.insert(0, r'c:/Users/Sundh/Desktop/Own_Projects/Interview-Buddy/interview-buddy-f85e0e33-main/backend')
from database import DATABASE_URL, DB_FILE, engine
print('DATABASE_URL env:', os.environ.get('DATABASE_URL'))
print('database.DATABASE_URL:', DATABASE_URL)
print('database.DB_FILE:', DB_FILE)
print('engine.url:', getattr(engine, 'url', None))
from services.db import create_user
try:
    u = create_user('T','unique2@example.com','hash','dev')
    print('created', u.id)
except Exception:
    traceback.print_exc()
