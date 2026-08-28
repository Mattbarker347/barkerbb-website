@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ============================================================
echo    Barker Brothers Benefits - Deploy Website to GitHub
echo ============================================================
echo.
echo Checking for changes...
echo.

git status --short
if errorlevel 1 (
    echo.
    echo ERROR: Git is not installed or this folder is not a git repo.
    echo.
    pause
    exit /b 1
)

echo.
set "msg="
set /p "msg=Describe what changed (press Enter for 'Update site'): "
if "!msg!"=="" set "msg=Update site"

echo.
echo ------------------------------------------------------------
echo Staging site files...
rem This used to be "git add ." That is dangerous: the repo is PUBLIC and deploys
rem straight to the live site, so a blanket add ships whatever is loose in the
rem folder. Stage tracked changes, then the site files by name.
git add -u
if errorlevel 1 goto :err
git add -- *.html css js images sitemap.xml robots.txt llms.txt CNAME *.md .gitignore deploy.ps1 push.cmd
if errorlevel 1 goto :err

echo.
echo Not staged (not part of the site, will NOT go live):
git ls-files --others --exclude-standard

echo.
echo Committing with message: "!msg!"
git commit -m "!msg!"
if errorlevel 1 (
    echo.
    echo Nothing to commit, or commit failed. Attempting push anyway...
)

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 goto :err

echo.
echo ============================================================
echo    SUCCESS! Your site will update live in 30-60 seconds.
echo.
echo    Live site: https://barkerbb.com
echo    Repo:      https://github.com/Mattbarker347/barkerbb-website
echo ============================================================
echo.
pause
exit /b 0

:err
echo.
echo ============================================================
echo    Something went wrong. Check the message above.
echo ============================================================
echo.
pause
exit /b 1
