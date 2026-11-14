@echo off
REM Paystack Integration - Windows Server Upload Script
REM This script helps you upload files to your web server via FTP

setlocal enabledelayedexpansion

echo.
echo ======================================================
echo   Paystack Integration - Server Upload Helper
echo ======================================================
echo.

REM Check if curl is available
where curl >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: curl not found. Install it from: https://curl.se/download.html
    exit /b 1
)

echo Choose your upload method:
echo.
echo 1. FTP Upload (manual)
echo 2. Create FTP script
echo 3. Copy files only (local)
echo.

set /p CHOICE="Enter your choice (1-3): "

if "%CHOICE%"=="1" (
    call :FTP_MANUAL
) else if "%CHOICE%"=="2" (
    call :FTP_SCRIPT
) else if "%CHOICE%"=="3" (
    call :COPY_FILES
) else (
    echo Invalid choice!
    exit /b 1
)

goto :EOF

:FTP_MANUAL
echo.
echo FTP UPLOAD INSTRUCTIONS
echo ======================
echo.
echo Files to upload:
echo  - payment-verify.php         (backend)
echo  - paystack-config.js         (frontend)
echo  - paystack-handler.js        (frontend)
echo  - checkout-paystack.html     (frontend)
echo  - payment-success.html       (frontend)
echo  - payment-failure.html       (frontend)
echo.
echo Steps:
echo  1. Download FileZilla: https://filezilla-project.org/
echo  2. Enter your FTP credentials:
echo     Host: your-ftp-host
echo     User: your-ftp-user
echo     Pass: your-ftp-password
echo  3. Navigate to public_html folder
echo  4. Upload payment-verify.php first
echo  5. Right-click payment-verify.php ^> Permissions ^> 644
echo  6. Upload remaining files
echo.
echo After upload, test at:
echo  https://yourwebsite.com/payment-verify.php
echo.
pause
goto :EOF

:FTP_SCRIPT
echo.
echo.
set /p FTP_HOST="Enter FTP Host: "
set /p FTP_USER="Enter FTP Username: "
set /p FTP_PASS="Enter FTP Password: "

echo.
echo Creating FTP script...
echo.

(
    echo open %FTP_HOST%
    echo %FTP_USER%
    echo %FTP_PASS%
    echo cd public_html
    echo binary
    echo put payment-verify.php
    echo put paystack-config.js
    echo put paystack-handler.js
    echo put checkout-paystack.html
    echo put payment-success.html
    echo put payment-failure.html
    echo bye
) > ftp-upload.txt

echo Created ftp-upload.txt
echo.
echo Run this command in Command Prompt:
echo   ftp -s:ftp-upload.txt
echo.

pause
goto :EOF

:COPY_FILES
echo.
echo Files to copy:
echo.
echo %CD%\payment-verify.php
echo %CD%\paystack-config.js
echo %CD%\paystack-handler.js
echo %CD%\checkout-paystack.html
echo %CD%\payment-success.html
echo %CD%\payment-failure.html
echo.
echo Copy these files to your web server's public_html folder
echo.
pause
goto :EOF
