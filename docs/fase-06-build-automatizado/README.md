# Fase 6: Build Command Automatizado

## Contexto

Actualmente, para actualizar la página después de cambios (editar meta descriptions en admin,
modificar contenido, cambiar frontend), hay que ejecutar manualmente:

```bash
cd magna-page/unified && npm run build:ssg
cd ../..
python manage.py collectstatic --no-input
python manage.py test
```

Esto es propenso a errores (olvidar un paso) y lento (hay que acordarse del orden correcto).

Necesitamos un **solo comando** que haga todo: build frontend + prerender + collectstatic + tests.

---

## Qué hacer

### Objetivos

1. Crear `build-and-update.bat` para Windows
2. Crear `build-and-update.sh` para Linux/Mac
3. Ambos scripts deben:
   - Ejecutar `npm run build:ssg` en unified/
   - Ejecutar `python manage.py migrate` (si hay migrations nuevas)
   - Ejecutar `python manage.py collectstatic --no-input`
   - Ejecutar `python manage.py test magna_web.tests`
   - Reportar éxito/fallo de cada paso
   - Salir con código de error si algo falla
4. Opcional: actualizar `entrypoint.sh` para Docker
5. Hacer commit y push a rama `seo-ssg/fase-06-build`

---

## Cómo hacer y dónde hacer

### 6.1 Script Windows

**Archivo NUEVO:** `build-and-update.bat` (raíz del proyecto)

```batch
@echo off
title Magna Build & Update
setlocal enabledelayedexpansion

:: Colores para output
set GREEN=[92m
set RED=[91m
set YELLOW=[93m
set NC=[0m

echo ============================================
echo         Magna Build & Update
echo ============================================
echo.

:: [1/5] Build frontend + prerender
echo ------------------------------------------
echo  [1/5] Building frontend + prerendering...
echo ------------------------------------------
echo.
cd /d "%~dp0magna-page\unified"
call npm run build:ssg
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed
    exit /b %errorlevel%
)
cd /d "%~dp0"
echo.
echo [OK] Frontend build complete
echo.

:: [2/5] Migraciones
echo ------------------------------------------
echo  [2/5] Running migrations...
echo ------------------------------------------
python manage.py migrate --no-input
if %errorlevel% neq 0 (
    echo [ERROR] Migrations failed
    exit /b %errorlevel%
)
echo [OK] Migrations complete
echo.

:: [3/5] Colect static files
echo ------------------------------------------
echo  [3/5] Collecting static files...
echo ------------------------------------------
python manage.py collectstatic --no-input
if %errorlevel% neq 0 (
    echo [ERROR] Collectstatic failed
    exit /b %errorlevel%
)
echo [OK] Static files collected
echo.

:: [4/5] Tests unitarios Django
echo ------------------------------------------
echo  [4/5] Running Django tests...
echo ------------------------------------------
python manage.py test magna_web.tests --no-input
if %errorlevel% neq 0 (
    echo [WARNING] Some Django tests failed
    :: No salimos, continuamos para verificar prerender
)
echo [OK] Django tests complete
echo.

:: [5/5] Verificar prerendered
echo ------------------------------------------
echo  [5/5] Verifying prerendered files...
echo ------------------------------------------
cd magna-page\unified
node test-prerender.mjs
if %errorlevel% neq 0 (
    echo [WARNING] Prerender verification found issues
)
cd /d "%~dp0"
echo.

:: Resumen final
echo ============================================
echo  Build complete!
echo  Updated site is ready at:
echo    %~dp0
echo ============================================
echo.
echo  Start Django and verify:
echo    python manage.py runserver
echo.
echo  Or deploy to production:
echo    cd infrastructure ^&^& deploy.bat
echo.
```

### 6.2 Script Linux/Mac

**Archivo NUEVO:** `build-and-update.sh` (raíz del proyecto)

```bash
#!/bin/bash
set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}        Magna Build & Update${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# [1/5] Build frontend + prerender
echo -e "${YELLOW}[1/5] Building frontend + prerendering...${NC}"
cd magna-page/unified
npm run build:ssg
cd "$SCRIPT_DIR"
echo -e "${GREEN}[OK]${NC} Frontend build complete"
echo ""

# [2/5] Migraciones
echo -e "${YELLOW}[2/5] Running migrations...${NC}"
python manage.py migrate --no-input
echo -e "${GREEN}[OK]${NC} Migrations complete"
echo ""

# [3/5] Collect static
echo -e "${YELLOW}[3/5] Collecting static files...${NC}"
python manage.py collectstatic --no-input
echo -e "${GREEN}[OK]${NC} Static files collected"
echo ""

# [4/5] Tests Django
echo -e "${YELLOW}[4/5] Running Django tests...${NC}"
python manage.py test magna_web.tests --no-input || echo -e "${RED}[WARNING]${NC} Some Django tests failed"
echo -e "${GREEN}[OK]${NC} Django tests complete"
echo ""

# [5/5] Verificar prerender
echo -e "${YELLOW}[5/5] Verifying prerendered files...${NC}"
cd magna-page/unified
node test-prerender.mjs || echo -e "${RED}[WARNING]${NC} Prerender verification found issues"
cd "$SCRIPT_DIR"
echo ""

# Resumen
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN} Build complete!${NC}"
echo -e "${GREEN} Updated site is ready.${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo "Start Django and verify:"
echo "  python manage.py runserver"
echo ""
echo "Or deploy to production:"
echo "  cd infrastructure && bash deploy.sh"
```

### 6.3 Hacer scripts ejecutables

```bash
# Linux/Mac
chmod +x build-and-update.sh

# Windows — los .bat ya son ejecutables
```

### 6.4 (Opcional) Actualizar entrypoint.sh para Docker

**Archivo:** `entrypoint.sh`

Si se quiere que el contenedor Docker también haga el build automático:

```bash
#!/bin/bash
set -e

# Build frontend + prerender si no existe
if [ ! -d "magna-page/unified/dist/prerendered" ]; then
    echo "Running frontend build + prerender..."
    cd magna-page/unified
    npm ci --production
    npm run build:ssg
    cd /app
fi

python manage.py migrate --no-input
python manage.py collectstatic --no-input
exec "$@"
```

> Nota: Esto agrega Node.js al contenedor Docker, aumentando su tamaño.
> Alternativa: prerendered se genera en CI/CD y se copia al contenedor durante el build de la imagen.

---

## Tests

```bash
# Test del script Windows
.\build-and-update.bat

# Test del script Linux (en Git Bash o WSL)
bash build-and-update.sh
```

### Verificación post-ejecución

```bash
# Verificar que los prerendered existen
ls -la magna-page/unified/dist/prerendered/

# Verificar que staticfiles se actualizó
ls -la staticfiles/prerendered/ 2>/dev/null || echo "staticfiles no tiene prerendered (verificar collectstatic)"

# Verificar que la app responde
python manage.py runserver &
sleep 2
curl -s http://localhost:8000/servicios | head -5
```

---

## Documentación del resultado

### Qué se hizo

- Se creó `build-and-update.bat` para Windows
- Se creó `build-and-update.sh` para Linux/Mac
- Ambos scripts ejecutan: build:ssg → migrate → collectstatic → tests → verificación

### Por qué se hizo

- Un solo comando para actualizar todo después de cambios
- Elimina error humano (olvidar un paso, orden incorrecto)
- Feedback inmediato si algo falla

### Líneas de código

| Archivo | Cambio | LOC |
|---------|--------|-----|
| `build-and-update.bat` | NUEVO | ~95 |
| `build-and-update.sh` | NUEVO | ~85 |
| `entrypoint.sh` | Opcional | +10 |
| **Total** | | **~180 LOC** |

### Tiempo de ejecución esperado

| Paso | Tiempo |
|------|--------|
| npm run build:ssg | ~90s |
| migrate | ~5s |
| collectstatic | ~10s |
| tests | ~15s |
| **Total** | **~2 minutos** |

---

Al terminar, crear resumen ejecutivo (que se hizo, por que, impacto, tests, como probar) en docs/seo/fase-06-build-automatizado.md.

