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

# 3b. Stamp the stylesheet link with its own content hash
#
# GitHub Pages serves css with max-age=14400 (four hours) and html with max-age=600
# (ten minutes). Without a stamp, anyone who visited in the last four hours gets the
# NEW html against their OLD cached stylesheet, and the page renders half styled.
# That is not theoretical, it happened on the 2026-09-14 deploy: the nav wrapped into
# two broken lines on the live site while the served css was already correct.
# A content hash makes a changed file a different url, so a stale copy is never used.
# This runs on every deploy so it cannot drift out of date the way a note would.
Write-Host "[..] Stamping stylesheet cache version..." -ForegroundColor Yellow

$cssHash = Get-FileHash -Path "css\style.css" -Algorithm MD5 | Select-Object -ExpandProperty Hash
$cssHash = $cssHash.Substring(0, 8).ToLower()
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$stamped = 0

foreach ($page in Get-ChildItem -Path . -Filter *.html -Name) {
    $full = Join-Path $PSScriptRoot $page
    $html = [System.IO.File]::ReadAllText($full)
    $updated = [regex]::Replace($html, 'href="css/style\.css(\?v=[0-9a-f]+)?"', "href=`"css/style.css?v=$cssHash`"")
    if ($updated -ne $html) {
        [System.IO.File]::WriteAllText($full, $updated, $utf8NoBom)
        $stamped++
    }
}

if ($stamped -gt 0) {
    Write-Host "[OK] Stylesheet version $cssHash, restamped $stamped page(s)." -ForegroundColor Green
} else {
    Write-Host "[OK] Stylesheet version $cssHash, already current on every page." -ForegroundColor Green
}

# 3c. Check the site before any of it ships
#
# Runs AFTER the stamping above on purpose: one of the things it checks is that
# every page carries the same stylesheet version, which is only true once 3b has
# run.
#
# This exists because on 2026-09-17 the site had 38 urls renamed, 5 pages added,
# 325 questions written and the nav rebuilt, and every batch was verified by a
# one-off script typed into a terminal and then thrown away. Those scripts caught
# real defects: dead internal links, a page declaring FAQ schema with no visible
# questions, an em dash in live copy, British spellings in American copy. A check
# that lives in a terminal history is not a check.
#
# It REFUSES the deploy rather than warning, for the same reason step 3b stamps
# rather than leaving a note: this repo ships through exactly one path, so the
# guard belongs in that path.
Write-Host "[..] Checking the site..." -ForegroundColor Yellow

node scripts\site-check.mjs
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[STOP] site-check failed. Nothing has been staged, committed or pushed." -ForegroundColor Red
    Write-Host "       Fix what it listed, then run this again." -ForegroundColor Red
    exit 1
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
$sitePaths = @('*.html', 'css', 'js', 'images', 'scripts', 'sitemap.xml', 'robots.txt', 'llms.txt', 'CNAME', '*.md', '.gitignore', 'deploy.ps1', 'push.cmd')
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
