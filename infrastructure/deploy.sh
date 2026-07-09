#!/bin/bash
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

PROJECT_NAME="magna-web"
KEY_NAME="magna-ssh-key"
PEM_PATH="$HOME/.ssh/magna.pem"

echo "============================================"
echo " Magna - Despliegue en AWS Lightsail"
echo "============================================"
echo ""

# --- 1. Verificar herramientas ---
for cmd in aws terraform ansible-playbook docker; do
    if ! command -v "$cmd" &>/dev/null; then
        echo "[ERROR] $cmd no encontrado. Instalalo primero."
        exit 1
    fi
done
echo "[OK] Herramientas verificadas"

# --- 2. Cargar .env ---
echo "[INFO] Cargando variables desde .env..."
set -a
source "$DIR/../.env" 2>/dev/null || true
set +a

# --- 3. Key pair en Lightsail ---
echo "[INFO] Verificando key pair '$KEY_NAME' en Lightsail..."
if ! aws lightsail get-key-pair --key-pair-name "$KEY_NAME" &>/dev/null; then
    echo "[INFO] Creando key pair..."
    mkdir -p "$HOME/.ssh"
    aws lightsail create-key-pair --key-pair-name "$KEY_NAME" --query 'privateKeyBase64' --output text > "$PEM_PATH"
    chmod 600 "$PEM_PATH"
    echo "[OK] PEM guardado en $PEM_PATH"
else
    echo "[OK] Key pair existe."
    if [ ! -f "$PEM_PATH" ]; then
        echo "[WARN] PEM local no encontrado. Recreando..."
        aws lightsail delete-key-pair --key-pair-name "$KEY_NAME"
        aws lightsail create-key-pair --key-pair-name "$KEY_NAME" --query 'privateKeyBase64' --output text > "$PEM_PATH"
        chmod 600 "$PEM_PATH"
        echo "[OK] PEM guardado en $PEM_PATH"
    fi
fi

# --- 4. Terraform ---
cd "$DIR/terraform"
echo ""
echo "[PASO 1/5] Terraform init..."
terraform init -upgrade

echo "[PASO 2/5] Terraform apply..."
terraform apply -auto-approve
TF_EXIT=$?

# Recovery del bug de Lightsail
if [ $TF_EXIT -ne 0 ]; then
    echo ""
    echo "[WARN] Bug de Lightsail detectado. Verificando si la instancia se creo..."
    INSTANCE_EXISTS=$(aws lightsail get-instances --query "instances[?name=='$PROJECT_NAME'].[name]" --output text 2>/dev/null)

    if [ -n "$INSTANCE_EXISTS" ]; then
        echo "[OK] Instancia existe. Importando al state..."
        terraform import aws_lightsail_static_ip.app "$PROJECT_NAME-ip" 2>/dev/null || true
        terraform import aws_lightsail_instance.app "$PROJECT_NAME"
        echo "[INFO] Re-ejecutando terraform apply..."
        terraform apply -auto-approve
        TF_EXIT=$?
    else
        echo "[ERROR] La instancia no se creo."
        exit 1
    fi
fi

if [ $TF_EXIT -ne 0 ]; then
    echo "[ERROR] Terraform fallo definitivamente."
    exit 1
fi

# --- 5. Obtener IP ---
INSTANCE_IP=$(terraform output -raw instance_ip)
echo "[OK] Lightsail listo! IP: $INSTANCE_IP"

# --- 6. Docker Hub: build + push (opcional) ---
cd "$DIR/.."
echo ""
echo "[PASO 3/5] Docker Hub..."

if [ -n "$DOCKERHUB_USER" ] && [ -n "$DOCKERHUB_TOKEN" ]; then
    echo "[INFO] Construyendo imagen Docker..."
    if docker build -t "$DOCKERHUB_USER/magna-web:${IMAGE_TAG:-latest}" .; then
        echo "[INFO] Subiendo a Docker Hub..."
        echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USER" --password-stdin
        docker push "$DOCKERHUB_USER/magna-web:${IMAGE_TAG:-latest}"
        echo "[OK] Imagen subida a Docker Hub"
    else
        echo "[WARN] Build fallo. Se usara build en la instancia."
    fi
else
    echo "[INFO] DOCKERHUB_USER no configurado. Se usara build en la instancia."
    echo "       Para usar Docker Hub, agrega al .env:"
    echo "       DOCKERHUB_USER=tu-usuario"
    echo "       DOCKERHUB_TOKEN=tu-token"
    echo "       IMAGE_TAG=latest"
fi

# --- 7. Ansible ---
cd "$DIR/ansible"

echo "[PASO 4/5] Preparando Ansible..."

# Inventory con IP real
sed -i "s/ansible_host:.*/ansible_host: $INSTANCE_IP/" inventory.yml

# Recargar .env
set -a
source "$DIR/../.env" 2>/dev/null || true
set +a

echo ""
echo "[PASO 5/5] Ejecutando Ansible..."
echo "============================================"
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i inventory.yml playbook.yml

echo ""
echo "============================================"
echo " Despliegue completado!"
echo "============================================"
echo "IP:    $INSTANCE_IP"
echo "SSH:   ssh -i $PEM_PATH ubuntu@$INSTANCE_IP"
echo "Sitio: https://magnaingenieriaytopografia.com"
echo ""
echo "NOTA: El certificado SSL (Let's Encrypt) se"
echo "configuro automaticamente. La propagacion"
echo "del DNS puede tardar unos minutos."
echo "============================================"
