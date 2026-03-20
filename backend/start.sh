#!/bin/bash
#!/bin/bash
set -e

echo "→ Running database migrations..."
alembic upgrade head

echo "→ Starting SpendWise API..."
exec uvicorn app.main:app \
  --host 0.0.0.0 \
  --port "${PORT:-8000}" \
  --workers 2 \
  --no-access-log \
  --no-server-header