#!/bin/bash

set -ex  # Print commands and fail on error

echo "📁 PWD: $(pwd)"
echo "📄 Listing files in current directory:"
ls -la

echo "🌐 Environment variables:"
env

# 🚨 Check PORT is set (Railway sets this, but let's be safe)
if [ -z "$PORT" ]; then
  echo "❌ Error: \$PORT is not set."
  exit 1
fi

echo "🔌 PORT variable is: $PORT"

# ⏳ Simple wait for DB to be ready (no POSTGRES_HOST/PORT check needed)
echo "⏳ Giving the database a few seconds to be ready..."
sleep 5

echo "✅ Applying Django migrations..."
if ! python interiorhealth-backend/manage.py migrate --noinput; then
  echo "❌ Migration failed"
  sleep 600
  exit 1
fi

# Optional: Collect static files
# echo "📦 Collecting static files..."
# python interiorhealth-backend/manage.py collectstatic --noinput

echo "🚀 Starting Gunicorn server on port $PORT"
exec gunicorn config.wsgi:application \
  --chdir interiorhealth-backend \
  --bind 0.0.0.0:$PORT
