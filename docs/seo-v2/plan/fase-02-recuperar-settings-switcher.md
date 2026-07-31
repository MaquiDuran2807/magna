# Fase 2: Recuperar sistema de settings con switcher DJANGO_ENV

## Objetivo
Restaurar el sistema de settings multi-ambiente que existía en `deploy/julio-2026`: un `settings.py` que actúa como switcher leyendo `DJANGO_ENV` y delegando a `settings/dev.py` o `settings/prod.py`. Esto permite alternar entre desarrollo (localhost) y producción (dominio real) con una variable de entorno.

## Archivos a modificar/crear

| Archivo | Acción |
|---|---|
| `magna_web/settings/__init__.py` | Crear (vacío) |
| `magna_web/settings/base.py` | Crear desde `deploy/julio-2026`, adaptado a `unified/` |
| `magna_web/settings/dev.py` | Crear desde `deploy/julio-2026` |
| `magna_web/settings/prod.py` | Crear desde `deploy/julio-2026` |
| `magna_web/settings.py` | Convertir en switcher (reemplazar contenido plano) |
| `.env` | Actualizar para que `DJANGO_ENV` funcione correctamente |

## Skills requeridas (cargar antes de empezar)

1. **`django-expert`** — Antes de modificar settings
2. **`django-security`** — Para la config de producción (SSL, HSTS, cookies seguras)

## Referencias

- **AGENTS.md**: §Key Gotchas — "Settings switch: `DJANGO_ENV` controls which settings file loads"
- Rama de referencia: `deploy/julio-2026` — archivos `magna_web/settings.py`, `magna_web/settings/base.py`, `dev.py`, `prod.py`
- **DESIGN.md**: No existe. Los tokens visuales están en AGENTS.md §Visual Uniformity Rules.

## Instrucciones detalladas

### 1. Restaurar `magna_web/settings.py` como switcher

El contenido debe ser:

```python
import os
from pathlib import Path
import environ

env = environ.Env()
env_file = Path(__file__).resolve().parent / '.env'
if env_file.exists():
    environ.Env.read_env(env_file)

DJANGO_ENV = env('DJANGO_ENV', default='development')

if DJANGO_ENV == 'production':
    from magna_web.settings.prod import *
else:
    from magna_web.settings.dev import *
```

### 2. Crear `magna_web/settings/base.py`

Tomar de `deploy/julio-2026:magna_web/settings/base.py` con estas adaptaciones:

- `STATICFILES_DIRS`: cambiar de `('magna-page/page/dist', 'magna-page/store/dist')` a `('magna-page/unified/dist',)`
- `TEMPLATES.DIRS`: mantener `BASE_DIR.joinpath('magna-page')` (sirve para `unified/dist/index.page.html`)
- No incluir `'about'` en `INSTALLED_APPS` a menos que exista la app `about/` (verificar)
- Usar `STORAGES` de Django 5.x (como ya está en el deploy)
- Asegurar que `DATABASES` use `DB_ENGINE` con fallback a SQLite
- Mantener `AUTH_USER_MODEL = 'user.User'`
- Mantener config de Djoser, SimpleJWT, REST Framework

### 3. Crear `magna_web/settings/dev.py`

```python
from .base import *
DEBUG = True
# Hosts permitidos en desarrollo
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "magnaingenieriaytopografia.com", "www.magnaingenieriaytopografia.com"]
CORS_ORIGIN_WHITELIST = ["http://localhost:8000", "http://localhost:5173", "http://localhost:5174", ...]
CSRF_TRUSTED_ORIGINS = [...]
```

### 4. Crear `magna_web/settings/prod.py`

```python
from .base import *
DEBUG = False
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=["magnaingenieriaytopografia.com", "www.magnaingenieriaytopografia.com"])
CORS_ORIGIN_WHITELIST = env.list(...)  # Solo https://
CSRF_TRUSTED_ORIGINS = env.list(...)
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

### 5. Verificar `.env`

Asegurar que `.env` tiene:
```
DJANGO_ENV=development  # o production según el modo
DJANGO_DEBUG=True       # o False
DOMAIN=localhost:5173    # o magnaingenieriaytopografia.com
```

### 6. Probar ambos modos

```bash
# Modo desarrollo
$env:DJANGO_ENV="development"; python manage.py runserver
# Debe mostrar DEBUG=True, SQLite, etc.

# Modo producción
$env:DJANGO_ENV="production"; python manage.py runserver
# Debe mostrar DEBUG=False
```

## Criterios de éxito

- [ ] `python manage.py runserver` funciona con `DJANGO_ENV=development`
- [ ] `python manage.py runserver` funciona con `DJANGO_ENV=production`
- [ ] En dev, DEBUG=True, SQLite, CORS abierto
- [ ] En prod, DEBUG=False, SSL configurado
- [ ] `STATICFILES_DIRS` apunta a `magna-page/unified/dist`
- [ ] Templates encuentran `unified/dist/index.page.html`
- [ ] `collectstatic` funciona y recolecta archivos de `unified/dist`

## Documentación de resultados

Al finalizar, crear `docs/seo-v2/resultados/fase-02-recuperar-settings-switcher.md` con:
- Resumen de lo que se hizo
- Archivos creados/modificados (contar líneas con `git diff --stat`)
- Tests de humo (dev y prod)
- Tiempo total
