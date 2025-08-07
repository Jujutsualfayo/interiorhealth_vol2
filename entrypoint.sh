#!/bin/bash

set -e

echo "PWD: $(pwd)"
echo "Listing files in current directory:"
ls -la

echo "Environment variables:"
env

echo "PORT variable is: ${PORT}"

echo "⏳ Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT..."
while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 1
done

echo "✅ Postgres is up. Applying migrations..."
python interiorhealth-backend/manage.py migrate --noinput || { echo "❌ Migration failed"; sleep 600; exit 1; }

# Optional: Collect static files
# python interiorhealth-backend/manage.py collectstatic --noinput

echo "🚀 Starting Gunicorn server..."
exec gunicorn config.wsgi:application \
  --chdir interiorhealth-backend \
  --bind 0.0.0.0:${PORT:-8000} || { echo "❌ Gunicorn failed"; sleep 600; exit 1; }