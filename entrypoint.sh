#!/bin/bash

set -e

echo "⏳ Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT..."
while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 1
done

echo "✅ Postgres is up. Applying migrations..."
python manage.py migrate --noinput

# Optional: Collect static files
# echo "📦 Collecting static files..."
# python manage.py collectstatic --noinput

echo "🚀 Starting Django server..."
exec python manage.py runserver 0.0.0.0:${PORT:-8000}