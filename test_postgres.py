#!/usr/bin/env python3
"""Test PostgreSQL connection and initialize database tables."""

import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Test database connection
db_url = os.getenv("DATABASE_URL")
print("Testing PostgreSQL Connection...")
print("-" * 60)
print(f"Database URL (masked): postgresql://**:***@**.**.*.neon.tech/neondb?...")

try:
    from sqlalchemy import create_engine, text
    
    # Create engine
    engine = create_engine(
        db_url,
        pool_size=10,
        max_overflow=20,
        pool_pre_ping=True,
    )
    
    # Test connection
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version();"))
        version = result.fetchone()[0]
        print(f"\n✓ Connection Successful!")
        print(f"✓ PostgreSQL Version: {version.split(',')[0]}")
        
    # Initialize database (create tables)
    print("\nInitializing Database Tables...")
    from database import init_db
    init_db()
    print("✓ Database tables created successfully!")
    
    print("\n" + "=" * 60)
    print("✅ PostgreSQL Integration Complete!")
    print("=" * 60)
    
except Exception as e:
    print(f"\n✗ Connection Failed: {str(e)}")
    print("\nTroubleshooting:")
    print("- Verify the connection string is correct")
    print("- Ensure your IP is whitelisted in Neon console")
    print("- Check that sslmode=require is set")
