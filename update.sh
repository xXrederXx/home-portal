#!/bin/bash
set -e  # stop on first error

# --- CONFIG ---
BACKEND_SERVICE="homeportal-backend"   # systemd service name
DB_PATH="database/homeportal.db"
MIGRATIONS_DIR="database/migrations"

echo ">>> Pulling latest changes from git..."
git pull

# --- FRONTEND ---
echo ">>> Updating frontend..."
cd frontend

# Ensure npm dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install --silent
else
    echo "Checking for missing dependencies..."
    npm install --silent
fi

# Ensure TypeScript is installed locally
if ! npx tsc --version > /dev/null 2>&1; then
    echo "TypeScript not found. Installing..."
    npm install typescript --save-dev
fi

# Build the frontend
npm run build
cd ..

# --- BACKEND ---
echo ">>> Updating backend..."
cd backend
source venv/bin/activate
pip install -r requirements.txt --quiet
cd ..

# --- DATABASE MIGRATIONS ---
echo ">>> Applying database migrations (if any)..."
if [ -d "$MIGRATIONS_DIR" ]; then
    for file in $MIGRATIONS_DIR/*.sql; do
        if [ -f "$file" ]; then
            echo "Applying migration: $file"
            sqlite3 "$DB_PATH" < "$file"
            mv "$file" "$file.applied"
        fi
    done
else
    echo "No migrations folder found, skipping..."
fi

# --- RESTART BACKEND ---
echo ">>> Restarting backend service..."
sudo systemctl restart $BACKEND_SERVICE

# --- RELOAD NGINX ---
echo ">>> Reloading nginx (in case config changed)..."
sudo nginx -t && sudo systemctl reload nginx

echo ">>> Update complete!"

