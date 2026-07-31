# Fase 1 — Bugs Críticos: Pruebas de Verificación

> Proyecto: Magna Ingeniería y Topografía
> Fecha: 23/06/2026

---

## Prerrequisitos

```bash
cd magna/
cp .env.example .env
# Editar .env con valores reales (SECRET_KEY, EMAIL_*)
```

---

## Test 1: Dependencias limpias

```bash
# Instalar dependencias actualizadas
pip install -r requirements.txt

# Verificar que cors, defusedxml, distlib, virtualenv NO están instalados
pip list | Select-String -Pattern "^(cors|defusedxml|distlib|virtualenv)"  # debe dar vacío
```

**Esperado:** No debe aparecer ninguno de esos paquetes.

---

## Test 2: Settings con django-environ

```bash
# Configurar .env
echo "SECRET_KEY=django-insecure-test-key-not-for-production" > .env

# Verificar que settings se cargan sin errores
python manage.py check
```

**Esperado:** `System check identified no issues (0 silenced).`

**Si falla:** Verificar que `.env` existe y contiene `SECRET_KEY`.

---

## Test 3: Email backend funcional

```bash
# Desde el shell de Django
python manage.py shell -c "
from django.core.mail import send_mail
try:
    send_mail(
        'Test Magna',
        'Este es un correo de prueba',
        'noreply@magnaingenieriaytopografia.com',
        ['test@example.com'],
        fail_silently=False,
    )
    print('OK: email backend configurado correctamente')
except Exception as e:
    print(f'ERROR: {e}')
"
```

**Esperado:** Si hay credenciales SMTP reales, el correo se envía. Si no, debe fallar con error de conexión (lo que confirma que SMTP está activo, no console).

---

## Test 4: UserRetrieveAPIView sin duplicados

```bash
# Verificar que el código compila
python -c "
from user.views import UserRetrieveAPIView
print('OK: UserRetrieveAPIView importada correctamente')
print(f'Métodos get_object: {[m for m in dir(UserRetrieveAPIView) if \"get_object\" in m]}')
"
```

**Esperado:** `OK: UserRetrieveAPIView importada correctamente` y no debe haber errores de sintaxis.

**Opcional — test de integración:**
```bash
# Obtener token JWT (requiere servidor corriendo)
# curl -X POST http://localhost:8000/auth/jwt/create/ -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"testpass"}'
# curl http://localhost:8000/auth/users/me/ -H "Authorization: JWT <token>"
```

---

## Test 5: Frontend page — dependencia @tanstack/react-query

```bash
cd magna-page/page/
npm install
```

**Esperado:** `npm install` completa sin errores. Verificar que `@tanstack/react-query` aparece en `node_modules`:

```bash
if (Test-Path "node_modules/@tanstack/react-query") { Write-Output "OK: @tanstack/react-query instalado" }
```

---

## Test 6: Git — dist no trackeado

```bash
# Verificar que git ignora dist/
git check-ignore magna-page/page/dist/
git check-ignore magna-page/store/dist/
```

**Esperado:** Ambos comandos deben retornar el path del archivo (indicando que están ignorados).

```bash
# Verificar que no hay archivos de dist en staged (después del rm --cached)
git diff --cached --name-only | Select-String -Pattern "dist/"  # debe dar vacío
```

---

## Test 7: Build de frontend (opcional)

```bash
cd magna-page/page/
npm run build
```

**Esperado:** Build exitoso. Los archivos `dist/` no deben aparecer en `git status`.

---

## Resumen de resultados

| Test | Descripción | Estado |
|------|-------------|--------|
| 1 | Dependencias limpias | ✅ / ❌ |
| 2 | Settings con django-environ | ✅ / ❌ |
| 3 | Email backend funcional | ✅ / ❌ |
| 4 | UserRetrieveAPIView sin duplicados | ✅ / ❌ |
| 5 | Frontend @tanstack/react-query | ✅ / ❌ |
| 6 | Git — dist no trackeado | ✅ / ❌ |
| 7 | Build frontend (opcional) | ✅ / ❌ |

---

## Rollback

Cada cambio es reversible individualmente:

| Ítem | Rollback |
|------|----------|
| 1.1-1.3 | `git checkout requirements.txt` |
| 1.4-1.5 | `git checkout magna_web/settings.py` |
| 1.6 | `git checkout user/views.py` |
| 1.7 | `git checkout magna-page/page/package.json` |
| 1.8 | `git checkout .gitignore` + `git reset HEAD magna-page/page/dist/ magna-page/store/dist/` |
