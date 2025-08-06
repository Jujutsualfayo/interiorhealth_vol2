#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Wait for the PostgreSQL server to be ready
echo "⏳ Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT..."
while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 1
done

echo "✅ Postgres is up. Applying migrations..."

# Apply database migrations
python manage.py migrate --noinput

# Collect static files (optional, if you plan to serve them)
# echo "�� Collecting static files..."
# python manage.py collectstatic --noinput

# Start the Django development server
echo "🚀 Starting Django development server..."
exec python manage.py runserver 0.0.0.0:8000

