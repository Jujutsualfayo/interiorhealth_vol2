#!/bin/bash

# Wait for the PostgreSQL server to be ready
echo "⏳ Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT..."
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 1
done

echo "✅ Postgres is up. Applying migrations..."
python manage.py migrate

echo "🚀 Starting Django development server..."
exec python manage.py runserver 0.0.0.0:8000
