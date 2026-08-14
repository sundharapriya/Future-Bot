Deployment notes

- Set `DATABASE_URL` in production to your Postgres (Neon) URL.
- Set `JWT_SECRET_KEY` environment variable to a secure random value.
- Use Alembic to run migrations in production: `alembic upgrade head` from `backend/`.
- CI uses sqlite to run tests; for staging/production run full migrations against Postgres.

Example systemd service (Linux):

```
[Unit]
Description=AI Interview Assistant
After=network.target

[Service]
User=www-data
WorkingDirectory=/srv/future-bot/backend
Environment=DATABASE_URL=${DATABASE_URL}
Environment=JWT_SECRET_KEY=${JWT_SECRET_KEY}
ExecStart=/usr/bin/env uvicorn main:app --host 0.0.0.0 --port 8000
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
