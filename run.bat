@echo off
title MakeCode for micro:bit (Local Server)
echo =======================================================
echo Starting Local Microsoft MakeCode for micro:bit Server...
echo =======================================================
echo.
cd /d "%~dp0"
npx pxt serve
pause
