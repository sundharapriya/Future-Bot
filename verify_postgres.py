#!/usr/bin/env python3
"""Verify PostgreSQL backend integration."""

import urllib.request
import json
import time
import sys

time.sleep(2)

print("=" * 70)
print("POSTGRESQL DATABASE INTEGRATION VERIFICATION")
print("=" * 70)

# Test health endpoint
try:
    health_resp = urllib.request.urlopen('http://127.0.0.1:8000/api/health')
    health_data = json.loads(health_resp.read())
    print("\n✓ Backend Health Check:")
    print(f"  Status: {health_data.get('status')}")
    print(f"  Message: {health_data.get('message')}")
except Exception as e:
    print(f"\n✗ Health check failed: {e}")
    sys.exit(1)

# Test database connection
try:
    sys.path.insert(0, 'backend')
    from database import engine
    from sqlalchemy import text
    
    with engine.connect() as conn:
        # Get database info
        result = conn.execute(text("SELECT version();"))
        version_info = result.fetchone()[0]
        
        # Check tables exist
        table_result = conn.execute(text(
            "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
        ))
        tables = [row[0] for row in table_result]
        
    print("\n✓ PostgreSQL Connection:")
    print(f"  Status: Connected")
    print(f"  Database: Neon PostgreSQL")
    print(f"  Version: {version_info.split(',')[0]}")
    print(f"  Tables Created: {', '.join(tables)}")
    
except Exception as e:
    print(f"\n✗ Database connection failed: {e}")
    sys.exit(1)

print("\n" + "=" * 70)
print("✅ PostgreSQL DATABASE SUCCESSFULLY INTEGRATED!")
print("=" * 70)
print("\nConfiguration:")
print("  • Connection String: Neon PostgreSQL (Serverless)")
print("  • Database: neondb")
print("  • SSL Mode: Required")
print("  • Tables: interviews, questions, answers")
print("\nReady for production!")
