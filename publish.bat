@echo off
setlocal

cd /d "%~dp0"

echo.
echo Publishing CGC Quote Calculator...
echo Project folder: %CD%
echo.

git --version >nul 2>&1
if errorlevel 1 (
  echo Git was not found. Please install Git or open this folder in GitHub Desktop.
  echo.
  pause
  exit /b 1
)

echo Adding app files...
git add outputs .github server.py start-lan-server.ps1 LAN-ACCESS-INSTRUCTIONS.txt .gitignore publish.bat
if errorlevel 1 (
  echo.
  echo Could not add files. Check the Git error above.
  echo.
  pause
  exit /b 1
)

git diff --cached --quiet
if not errorlevel 1 (
  echo.
  echo No changes to publish.
  echo.
  pause
  exit /b 0
)

set "COMMIT_MESSAGE=Update quote calculator %date% %time%"

echo.
echo Committing changes...
git commit -m "%COMMIT_MESSAGE%"
if errorlevel 1 (
  echo.
  echo Commit failed. Check the Git error above.
  echo.
  pause
  exit /b 1
)

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 (
  echo.
  echo Push failed. Check the Git error above.
  echo.
  pause
  exit /b 1
)

echo.
echo Done. GitHub Pages should update shortly.
echo.
pause
