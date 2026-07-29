@echo off
setlocal enabledelayedexpansion

set ROUTE=%1
if "%ROUTE%"=="" set ROUTE=/servicios
set REPORT_DIR=reports\lighthouse

if not exist %REPORT_DIR% mkdir %REPORT_DIR%

set SPA_FILE=%REPORT_DIR%\spa-%ROUTE:/=-%.json
set SSG_FILE=%REPORT_DIR%\ssg-%ROUTE:/=-%.json

echo ============================================
echo  Lighthouse Comparison: %ROUTE%
echo ============================================
echo.

echo [1/2] Midiendo SPA original...
npx lighthouse http://localhost:8000%ROUTE% --output=json --output-path="%SPA_FILE%" --chrome-flags="--headless --no-sandbox" --quiet

echo [2/2] Midiendo SSG...
npx lighthouse http://localhost:8000/ssg%ROUTE% --output=json --output-path="%SSG_FILE%" --chrome-flags="--headless --no-sandbox" --quiet

node scripts\compare-lighthouse.js "%SPA_FILE%" "%SSG_FILE%"
