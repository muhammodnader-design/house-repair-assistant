@echo off
REM start.bat - one double-click starts the whole project.
REM 1) starts the Node server in a new window
REM 2) waits 2 seconds so the server is ready
REM 3) opens the app in your browser

start "House Repair Server" cmd /k "cd /d %~dp0 && node server.js"
timeout /t 2 >nul
start "" "http://localhost:3000"
