#!/bin/bash
set -e

# =============================================
# PROVISION - Magna en Lightsail
# Ejecutar en la instancia Ubuntu via SSH
# =============================================

DOMAIN="${DOMAIN:-magnaingenieriaytopografia.com}"
DOCKERHUB_USER="${DOCKERHUB_USER:-maquidev2807}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
DB_PASSWORD="${DB_PASSWORD:-magna_secret}"
APP_DIR="/opt/magna"

echo "[PASO 1/7] Instalando Docker..."
apt-get update -qq
apt-get install -y -qq ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -qq
apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin certbot

echo "[PASO 2/7] Creando directorios..."
mkdir -p "$APP_DIR"/{nginx/ssl,media,staticfiles}

echo "[PASO 3/7] Configurando docker-compose.yml y nginx..."
cd "$APP_DIR"

cat > docker-compose.yml << 'COMPOSE'
services:
  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=magna
      - POSTGRES_USER=magna
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    restart: unless-stopped

  web:
    image: ${DOCKERHUB_USER}/magna-web:${IMAGE_TAG}
    env_file:
      - .env
    environment:
      - DJANGO_SETTINGS_MODULE=magna_web.settings.prod
      - DJANGO_ENV=production
      - DB_ENGINE=django.db.backends.postgresql
      - DB_NAME=magna
      - DB_USER=magna
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_HOST=db
      - DB_PORT=5432
      - DJANGO_DEBUG=False
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    depends_on:
      db:
        condition: service_started
    restart: unless-stopped

  nginx:
    image: nginx:1.25-alpine
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - static_volume:/static:ro
      - media_volume:/media:ro
      - ./nginx/ssl:/etc/letsencrypt:ro
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - web
    restart: unless-stopped

volumes:
  postgres_data:
  static_volume:
  media_volume:
COMPOSE

echo "[PASO 4/7] Creando .env..."
cat > .env << ENVEOF
SECRET_KEY=${SECRET_KEY}
DJANGO_DEBUG=False
DJANGO_SETTINGS_MODULE=magna_web.settings.prod
DOMAIN=${DOMAIN}
ALLOWED_HOSTS=${DOMAIN},www.${DOMAIN}
CORS_ORIGIN_WHITELIST=https://${DOMAIN},https://www.${DOMAIN}
CSRF_TRUSTED_ORIGINS=https://${DOMAIN},https://www.${DOMAIN}
ENVEOF

echo "[PASO 5/7] Descargando imagen Docker..."
docker login -u "$DOCKERHUB_USER" --password-stdin <<< "$DOCKERHUB_TOKEN" 2>/dev/null || true
DOCKERHUB_USER="$DOCKERHUB_USER" IMAGE_TAG="$IMAGE_TAG" DB_PASSWORD="$DB_PASSWORD" \
  docker compose pull web 2>/dev/null || true

echo "[PASO 6/7] Iniciando servicios..."
DOCKERHUB_USER="$DOCKERHUB_USER" IMAGE_TAG="$IMAGE_TAG" DB_PASSWORD="$DB_PASSWORD" \
  docker compose up -d

echo "[PASO 7/7] Obteniendo certificado SSL (si el DNS ya apunta)..."
if certbot certonly --standalone --non-interactive --agree-tos \
  --email "admin@${DOMAIN}" \
  --domains "${DOMAIN}" --domains "www.${DOMAIN}" 2>/dev/null; then
    cp "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" "$APP_DIR/nginx/ssl/"
    cp "/etc/letsencrypt/live/${DOMAIN}/privkey.pem" "$APP_DIR/nginx/ssl/"
    sed -i "s|/etc/letsencrypt/live/${DOMAIN}/|/etc/letsencrypt/|g" "$APP_DIR/nginx/nginx.conf"
    docker compose restart nginx

    # Auto-renovacion
    (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'docker restart magna-nginx-1'") | crontab -
    echo "[OK] SSL configurado con renovacion automatica"
else
    echo "[WARN] SSL no configurado - el DNS aun no apunta o certbot fallo."
    echo "       Cuando el DNS apunte a esta IP, ejecuta:"
    echo "       sudo certbot certonly --standalone -d ${DOMAIN} -d www.${DOMAIN}"
fi

echo ""
echo "============================================"
echo "  Provision completado!"
echo "============================================"
echo "  Sitio: https://${DOMAIN}"
echo "  Nota: Espera a que el DNS propague"
echo "============================================"
