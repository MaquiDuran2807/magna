# Magna — Ingeniería y Topografía

## Despliegue en AWS Lightsail ($7/mes)

```bash
cd infrastructure
deploy.bat          # Windows
# o
bash deploy.sh      # Linux/Mac
```

## Flujo completo del deploy

```
deploy.bat / deploy.sh
│
├── 1. Verifica herramientas (aws, terraform, ansible, docker)
├── 2. Carga .env como variables de entorno
├── 3. Crea/verifica key pair 'magna-ssh-key' en Lightsail
├── 4. Terraform init → apply
│   └── ⚠️ Si falla por timeout bug → importa al state y re-ejecuta
├── 5. Obtiene IP estática
├── 6. Docker Hub build + push (si DOCKERHUB_USER está configurado)
└── 7. Ansible en la instancia:
    ├── Instala Docker + docker-compose-plugin
    ├── Crea /opt/magna con docker-compose.yml, nginx.conf, .env
    ├── Login a Docker Hub (si credenciales)
    ├── docker compose up (usando docker-compose.prod.yml con image:)
    ├── certbot standalone → SSL para el dominio
    ├── Copia certificados al volumen de nginx
    └── Cron para renovación automática cada 3 AM
```

## Estructura del proyecto

```
magna/
├── infrastructure/
│   ├── deploy.bat                   # Deploy para Windows
│   ├── deploy.sh                    # Deploy para Linux/Mac
│   ├── docker-compose.prod.yml      # Composición producción (usa image:)
│   ├── terraform/
│   │   ├── main.tf                  # Lightsail + IP + firewall + key pair
│   │   ├── variables.tf             # Región, bundle, SSH key
│   │   └── outputs.tf              # IP, nombre instancia
│   └── ansible/
│       ├── playbook.yml             # Provisioning completo
│       └── inventory.yml            # Template (IP se reemplaza en deploy)
├── magna_web/
│   ├── settings.py                  # Redirige según DJANGO_ENV
│   └── settings/
│       ├── base.py                  # Settings comunes
│       ├── dev.py                   # Desarrollo (DEBUG=True)
│       └── prod.py                  # Producción (HSTS, SSL, sin debug)
├── docker-compose.yml               # Local dev (usa build:)
├── Dockerfile
├── .env / .env.example
└── entrypoint.sh
```

## Requisitos locales

- Python 3.11+
- AWS CLI configurado: `aws configure`
- Terraform >= 1.5
- Ansible: `pip install ansible`
- Docker Desktop (solo si usas Docker Hub)

## Configurar .env para producción

```env
DJANGO_ENV=production
SECRET_KEY=<genera una clave segura>
DB_PASSWORD=<password para PostgreSQL>
DOMAIN=magnaingenieriaytopografia.com

# Opcional — acelera el deploy usando Docker Hub
DOCKERHUB_USER=tu-usuario
DOCKERHUB_TOKEN=tu-token
IMAGE_TAG=latest
```

## Conectar dominio desde Wix

Cuando el deploy termine, verás la IP. En Wix:

1. Ve a **Dominios → DNS avanzado**
2. Agrega:
   - Registro **A**: `@` → `(la IP que muestra el deploy)`
   - Registro **CNAME**: `www` → `magnaingenieriaytopografia.com`
3. Espera propagación (5-30 min)

## Destruir todo

```bash
cd infrastructure/terraform
terraform destroy -auto-approve
```

---

## Decisiones técnicas

### ¿Por qué separar docker-compose.yml y docker-compose.prod.yml?

- **`docker-compose.yml`** — usa `build:` para desarrollo local, monta dist/ como volúmenes para hot-reload
- **`docker-compose.prod.yml`** — usa `image:` desde Docker Hub, sin monturas de desarrollo, con volúmenes持久entes para datos y SSL

No se pueden mezclar `build:` e `image:` en el mismo servicio, por eso van en archivos separados.

### ¿Por qué certbot standalone en vez de --nginx?

Nginx corre dentro de Docker. `certbot --nginx` intenta modificar la configuración de nginx del host, pero nginx no está en el host. `certbot certonly --standalone` levanta su propio servidor temporal en puerto 80, obtiene el certificado, y luego copiamos los archivos al volumen de Docker. Más simple y predecible.

### ¿Por qué key pair via AWS CLI en vez de Terraform?

El `aws_lightsail_key_pair` de Terraform no soporta `taint` ni `destroy` correctamente (la clave queda huérfana en Lightsail). Crearla via CLI antes de Terraform evita estos problemas y da control explícito sobre el PEM local.

### Bug de Lightsail y recovery

El provider `hashicorp/aws` para Lightsail tiene un bug conocido: `CreateInstance` a veces hace timeout esperando que la instancia esté `running` aunque la instancia ya se creó en AWS. El script:

1. Detecta el error de Terraform
2. Verifica con `aws lightsail get-instances` si existe
3. Si existe → `terraform import` + re-ejecuta
4. Si no existe → `terraform destroy` y aborta

### Settings: base.py, dev.py, prod.py

- **base.py**: TODO lo común (apps, middleware, REST, JWT, CORS, email)
- **dev.py**: `DEBUG=True`, más orígenes CORS, sin HSTS
- **prod.py**: `DEBUG=False`, `SECURE_SSL_REDIRECT`, HSTS, cookies seguras

`DJANGO_ENV=production` en el `.env` activa automáticamente la configuración de producción.
