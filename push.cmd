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
echo Staging all changes...
git add .
if errorlevel 1 goto :err

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
