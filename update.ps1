# Requires PowerShell 5+ (recommended: PowerShell 7)
# Run this script as Administrator

$ErrorActionPreference = "Stop"   # stop on first error

# --- CONFIG ---
$BACKEND_SERVICE = "homeportal-backend"   # Windows Service name
$DB_PATH = "database\homeportal.db"
$MIGRATIONS_DIR = "database\migrations"

Write-Host ">>> Pulling latest changes from git..."
git pull

# --- FRONTEND ---
Write-Host ">>> Updating frontend..."
Set-Location frontend

# Ensure npm dependencies are installed
if (!(Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies..."
    npm install --silent
} else {
    Write-Host "Checking for missing dependencies..."
    npm install --silent
}

# Ensure TypeScript is installed locally
try {
    npx tsc --version > $null 2>&1
} catch {
    Write-Host "TypeScript not found. Installing..."
    npm install typescript --save-dev
}

# Build the frontend
npm run build
Set-Location ..

# --- BACKEND ---
Write-Host ">>> Updating backend..."
Set-Location backend

# Activate Python virtual environment
if (Test-Path "venv\Scripts\Activate.ps1") {
    .\venv\Scripts\Activate.ps1
} else {
    Write-Host "Python virtual environment not found. Please create one first."
    exit 1
}

pip install -r requirements.txt --quiet
Set-Location ..

# --- DATABASE MIGRATIONS ---
Write-Host ">>> Applying database migrations (if any)..."
if (Test-Path $MIGRATIONS_DIR) {
    Get-ChildItem "$MIGRATIONS_DIR\*.sql" | ForEach-Object {
        $file = $_.FullName
        Write-Host "Applying migration: $file"
        sqlite3 $DB_PATH ".read $file"
        Rename-Item $file "$file.applied"
    }
} else {
    Write-Host "No migrations folder found, skipping..."
}

Write-Host ">>> Update complete!"
