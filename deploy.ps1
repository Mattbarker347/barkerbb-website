# ──────────────────────────────────────────────────────────────
# Barker Brothers Benefits — One-Click Deploy Script
# Double-click this file OR right-click → "Run with PowerShell"
# ──────────────────────────────────────────────────────────────

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host " Barker Brothers Benefits — Deploy to GitHub Pages" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verify Git is installed
try {
    $gitVersion = git --version
    Write-Host "[OK] $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[X] Git is not installed." -ForegroundColor Red
    Write-Host "    Run this first:  winget install --id Git.Git -e" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# 2. Initialize repo if needed
if (-not (Test-Path ".git")) {
    Write-Host "[..] Initializing new git repository..." -ForegroundColor Yellow
    git init -b main | Out-Null
    git config user.email "matt@barkerbb.com"
    git config user.name  "Matt Barker"
    Write-Host "[OK] Repository initialized." -ForegroundColor Green
} else {
    Write-Host "[OK] Git repository already initialized." -ForegroundColor Green
}

# 3. Add remote if missing
$remoteUrl = "https://github.com/mattbarker347/barkerbb-website.git"
$existingRemote = git remote 2>$null
if ($existingRemote -notcontains "origin") {
    Write-Host "[..] Adding GitHub remote: $remoteUrl" -ForegroundColor Yellow
    git remote add origin $remoteUrl
    Write-Host "[OK] Remote added." -ForegroundColor Green
} else {
    Write-Host "[OK] Remote 'origin' already configured." -ForegroundColor Green
}

# 4. Stage all files
Write-Host "[..] Staging files..." -ForegroundColor Yellow
git add .

# 5. Commit if there are changes
$status = git status --porcelain
if ($status) {
    $msg = Read-Host "Enter a short commit message (or press Enter for 'Update site')"
    if ([string]::IsNullOrWhiteSpace($msg)) { $msg = "Update site" }
    git commit -m $msg | Out-Null
    Write-Host "[OK] Committed: $msg" -ForegroundColor Green
} else {
    Write-Host "[OK] Nothing new to commit." -ForegroundColor Green
}

# 6. Push to GitHub
Write-Host ""
Write-Host "[..] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "     (A browser window may open for login the first time.)" -ForegroundColor DarkGray
try {
    git push -u origin main
    Write-Host ""
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host " SUCCESS — site pushed to GitHub" -ForegroundColor Green
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host " Repo:  https://github.com/mattbarker347/barkerbb-website" -ForegroundColor Cyan
    Write-Host " Site:  https://mattbarker347.github.io/barkerbb-website/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host " First-time setup reminders:" -ForegroundColor Yellow
    Write-Host "  1. Settings -> Pages -> Source: main / (root)" -ForegroundColor White
    Write-Host "  2. Settings -> Pages -> Custom domain: barkerbb.com" -ForegroundColor White
    Write-Host "  3. Point Squarespace DNS at GitHub (see README.md)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "[X] Push failed. Common fixes:" -ForegroundColor Red
    Write-Host "    - Make sure the repo 'barkerbb-website' exists on your GitHub account" -ForegroundColor Yellow
    Write-Host "    - If this is your first push, a browser login popup should appear" -ForegroundColor Yellow
    Write-Host "    - Error message was:" -ForegroundColor Yellow
    Write-Host "      $_" -ForegroundColor DarkYellow
}

Read-Host "Press Enter to exit"
