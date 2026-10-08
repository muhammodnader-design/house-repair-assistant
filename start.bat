@echo off
REM start.bat - one double-click starts the whole project.
REM For now the site is static, so we just open it in the browser.
REM When the backend is added (Stage 5), this script will also start the server, e.g.:
REM   start "backend" cmd /k "node server.js"
REM   timeout /t 2 >nul
REM   start "" "http://localhost:3000"

start "" "%~dp0index.html"
