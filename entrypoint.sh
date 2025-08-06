#!/bin/bash

set -e

echo "⏳ Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT..."
while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 1
done

echo "✅ Postgres is up. Applying migrations..."
python interiorhealth-backend/manage.py migrate --noinput

# Optional: Collect static files
# python interiorhealth-backend/manage.py collectstatic --noinput

echo "🚀 Starting Gunicorn server..."
exec gunicorn config.wsgi:application \
  --chdir interiorhealth-backend \
  --bind 0.0.0.0:${PORT:-8000}