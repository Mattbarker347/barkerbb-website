# ──────────────────────────────────────────────────────────────
# Barker Brothers Benefits One-Click Deploy Script
# Double-click this file OR right-click → "Run with PowerShell"
# ──────────────────────────────────────────────────────────────

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host " Barker Brothers Benefits, Deploy to GitHub Pages" -ForegroundColor Cyan
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

# 4. Stage the site files, by name
#
# This used to be "git add ." That is dangerous here: this repo is PUBLIC and it
# deploys straight to the live site, so a blanket add ships whatever happens to be
# sitting in the folder (scratch scripts, .bak files, exports, notes). We stage the
# things that make up the website and nothing else, then report anything skipped.
Write-Host "[..] Staging site files..." -ForegroundColor Yellow

# Tracked files that changed or were deleted. Never picks up anything new.
git add -u

# New site files, by explicit path. Add to this list if the site gains a real folder.
$sitePaths = @('*.html', 'css', 'js', 'images', 'sitemap.xml', 'robots.txt', 'llms.txt', 'CNAME', '*.md', '.gitignore', 'deploy.ps1', 'push.cmd')
foreach ($p in $sitePaths) {
    if (Test-Path $p) { git add -- $p }
}

# Anything still untracked was deliberately left out. Show it so it is never a surprise.
$skipped = git ls-files --others --exclude-standard
if ($skipped) {
    Write-Host ""
    Write-Host "[!] NOT staged (not part of the site). Nothing below will go live:" -ForegroundColor Yellow
    foreach ($s in $skipped) { Write-Host "      $s" -ForegroundColor DarkYellow }
    Write-Host "    If one of these belongs on the site, add its path to `$sitePaths in deploy.ps1." -ForegroundColor DarkGray
    Write-Host ""
}

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
    Write-Host " SUCCESS, site pushed to GitHub" -ForegroundColor Green
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
