@echo off
title Magna Deploy - AWS Lightsail
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ============================================
echo  Magna - Despliegue en AWS Lightsail
echo ============================================
echo.

:: --- Config ---
set PROJECT_NAME=magna-web
set KEY_NAME=magna-ssh-key
set PEM_PATH=%USERPROFILE%\.ssh\magna.pem
set SCRIPT_DIR=%~dp0

:: --- 1. Verificar herramientas ---
where aws >nul 2>&1
if %errorlevel% neq 0 ( echo [ERROR] AWS CLI no encontrado. & exit /b 1 )

where terraform >nul 2>&1
if %errorlevel% neq 0 ( echo [ERROR] Terraform no encontrado. & exit /b 1 )

where ansible-playbook >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Ansible no encontrado. Instalandolo...
    pip install ansible
)

:: --- 2. Verificar credenciales AWS ---
aws sts get-caller-identity >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] AWS no configurado. Ejecuta: aws configure
    pause & exit /b 1
)
echo [OK] AWS CLI verificado

:: --- 3. Cargar .env ---
echo [INFO] Cargando variables desde .env...
for /F "usebackq tokens=1* delims==" %%a in ("%SCRIPT_DIR%..\.env") do (
    set "%%a=%%b"
)

:: --- 4. Key pair en Lightsail ---
echo [INFO] Verificando key pair '%KEY_NAME%' en Lightsail...

aws lightsail get-key-pair --key-pair-name %KEY_NAME% >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Creando key pair...
    mkdir "%USERPROFILE%\.ssh" 2>nul
    for /f "tokens=*" %%a in ('aws lightsail create-key-pair --key-pair-name %KEY_NAME% --query "privateKeyBase64" --output text') do set PEM_B64=%%a
    echo !PEM_B64! > "%PEM_PATH%"
    if exist "%PEM_PATH%" ( echo [OK] PEM guardado en %PEM_PATH% ) else ( echo [ERROR] No se pudo crear el PEM. & pause & exit /b 1 )
) else (
    echo [OK] Key pair existe.
    if not exist "%PEM_PATH%" (
        echo [WARN] PEM local no encontrado. Recreando...
        aws lightsail delete-key-pair --key-pair-name %KEY_NAME%
        for /f "tokens=*" %%a in ('aws lightsail create-key-pair --key-pair-name %KEY_NAME% --query "privateKeyBase64" --output text') do set PEM_B64=%%a
        echo !PEM_B64! > "%PEM_PATH%"
    )
)

:: --- 5. Terraform ---
cd /d "%SCRIPT_DIR%terraform"
echo.
echo [PASO 1/5] Terraform init...
terraform init -upgrade
if %errorlevel% neq 0 ( echo [ERROR] terraform init fallo. & exit /b 1 )

echo [PASO 2/5] Terraform apply...
terraform apply -auto-approve
set TF_EXIT=%errorlevel%

:: Recovery del bug de Lightsail
if %TF_EXIT% neq 0 (
    echo.
    echo [WARN] Bug de Lightsail detectado. Verificando si la instancia se creo...
    for /f %%i in ('aws lightsail get-instances --query "instances[?name=='%PROJECT_NAME%'].[name]" --output text 2^>nul') do set INST=%%i
    if not "!INST!"=="" (
        echo [OK] Instancia existe. Importando al state...
        terraform import aws_lightsail_static_ip.app %PROJECT_NAME%-ip 2>nul
        terraform import aws_lightsail_instance.app %PROJECT_NAME%
        terraform apply -auto-approve
        set TF_EXIT=!errorlevel!
    ) else (
        echo [ERROR] La instancia no se creo.
        terraform destroy -auto-approve
        pause & exit /b 1
    )
)

if %TF_EXIT% neq 0 ( echo [ERROR] Terraform fallo definitivamente. & pause & exit /b 1 )

:: --- 6. Obtener IP ---
for /f %%i in ('terraform output -raw instance_ip') do set INSTANCE_IP=%%i
echo [OK] Lightsail listo! IP: !INSTANCE_IP!

:: --- 7. Docker Hub: build + push (opcional) ---
cd /d "%SCRIPT_DIR%.."
echo.
echo [PASO 3/5] Docker Hub...

if not "!DOCKERHUB_USER!"=="" if not "!DOCKERHUB_TOKEN!"=="" (
    echo [INFO] Construyendo imagen Docker...
    docker build -t !DOCKERHUB_USER!/magna-web:!IMAGE_TAG! .
    if !errorlevel! equ 0 (
        echo [INFO] Subiendo a Docker Hub...
        echo !DOCKERHUB_TOKEN! | docker login -u !DOCKERHUB_USER! --password-stdin
        docker push !DOCKERHUB_USER!/magna-web:!IMAGE_TAG!
        echo [OK] Imagen subida a Docker Hub
    ) else (
        echo [WARN] Build fallo. Se usara build en la instancia.
    )
) else (
    echo [INFO] DOCKERHUB_USER no configurado. Se usara build en la instancia.
    echo        Para usar Docker Hub, agrega al .env:
    echo        DOCKERHUB_USER=tu-usuario
    echo        DOCKERHUB_TOKEN=tu-token
    echo        IMAGE_TAG=latest
)

:: --- 8. Ansible ---
cd /d "%SCRIPT_DIR%ansible"

echo [PASO 4/5] Preparando Ansible...

:: Inventory con IP real
powershell -Command "$c = Get-Content 'inventory.yml' -Raw; $c = $c -replace 'ansible_host:.*', 'ansible_host: %INSTANCE_IP%'; $c | Set-Content 'inventory.yml' -Encoding UTF8"

:: Cargar .env como entorno
for /F "usebackq tokens=1* delims==" %%a in ("%SCRIPT_DIR%..\.env") do (
    set "%%a=%%b"
)

echo.
echo [PASO 5/5] Ejecutando Ansible...
echo ============================================
set ANSIBLE_HOST_KEY_CHECKING=False
ansible-playbook -i inventory.yml playbook.yml
set ANS_EXIT=%errorlevel%

if %ANS_EXIT% equ 0 (
    echo ============================================
    echo  Despliegue completado exitosamente!
    echo ============================================
    echo  IP:    %INSTANCE_IP%
    echo  SSH:   ssh -i %PEM_PATH% ubuntu@%INSTANCE_IP%
    echo  Sitio: https://magnaingenieriaytopografia.com
    echo.
    echo  NOTA: El certificado SSL (Let's Encrypt) se
    echo  configuro automaticamente. La propagacion
    echo  del DNS puede tardar unos minutos.
    echo ============================================
) else (
    echo [ERROR] Ansible fallo. Revisa los errores arriba.
)

endlocal
pause
