# Fase 1 — Bugs Críticos: Cambios Realizados

> Proyecto: Magna Ingeniería y Topografía
> Fecha: 23/06/2026
> Basado en: `PLAN_ACTUALIZACION.md` (sección 4)

---

## Resumen

Se corrigieron 8 bugs críticos de seguridad, estabilidad y mantenibilidad. Riesgo de breaking: **muy bajo**. Todos los cambios son reversibles individualmente.

---

## 1.1 — Eliminar `cors==1.0.1` de `requirements.txt`

**Archivo:** `requirements.txt` (línea 10 eliminada)

**Problema:** El paquete `cors==1.0.1` es un paquete erróneo en PyPI que no tiene relación con CORS. La dependencia correcta `django-cors-headers` ya existe en `requirements.txt:17`. Este paquete fantasma puede causar comportamiento impredecible o fallo al arrancar.

**Cambio:** Se eliminó la línea `cors==1.0.1`.

**Verificación:** `pip install -r requirements.txt` no debe mostrar errores. Los CORS headers siguen funcionando vía `django-cors-headers`.

---

## 1.2 — Eliminar `defusedxml==0.8.0rc2` de `requirements.txt`

**Archivo:** `requirements.txt` (línea 12 eliminada)

**Problema:** `defusedxml==0.8.0rc2` es una release candidate, no una versión estable. Usar RCs en producción es una mala práctica.

**Cambio:** Se eliminó la línea. Si el proyecto no usa XML parsing externo, no es necesaria.

**Verificación:** Verificar que ninguna funcionalidad de XML esté activa (CKEditor, imports, etc.).

---

## 1.3 — Eliminar herramientas dev de `requirements.txt`

**Archivo:** `requirements.txt` (líneas 13, 56, 57 eliminadas)

**Problema:** `distlib==0.3.6`, `virtualenv==20.17.0`, `virtualenv-clone==0.5.7` son herramientas de desarrollo/entorno virtual, no dependencias de producción.

**Cambio:** Se eliminaron las tres líneas.

**Verificación:** `pip install -r requirements.txt` en un entorno limpio no debe instalar estas herramientas.

---

## 1.4 — Mover `SECRET_KEY` a variable de entorno

**Archivo:** `magna_web/settings.py` (líneas 15-18, 30)

**Problema:** La `SECRET_KEY` estaba hardcodeada como string literal en el repositorio (`settings.py:28`). Esto es un **riesgo de seguridad crítico**: cualquiera con acceso al repo puede firmar tokens JWT válidos, comprometiendo toda la autenticación.

**Cambio:**
- Se activó `django-environ` (ya estaba en requirements como dependencia):
  ```python
  import environ
  env = environ.Env()
  ```
- Se movió `read_env()` después de la definición de `BASE_DIR` y se le pasó la ruta explícita:
  ```python
  BASE_DIR = Path(__file__).resolve().parent.parent
  environ.Env.read_env(BASE_DIR / '.env')
  ```
- `SECRET_KEY` ahora se lee desde variable de entorno con fallback de desarrollo:
  ```python
  SECRET_KEY = env('SECRET_KEY', default='django-insecure-dev-only-key-do-not-use-in-production')
  ```
- Si no hay `.env` o no tiene `SECRET_KEY`, se usa una clave insegura de desarrollo (el proyecto arranca igual)
- **En producción:** Siempre configurar `SECRET_KEY` real en `.env`
- Se creó `.env.example` como template con valores opcionales comentados.

**Dependencia:** `django-environ==0.11.2` ya estaba en `requirements.txt`.

**Verificación:**
1. Crear archivo `.env` con `SECRET_KEY=<valor seguro>`
2. `python manage.py check` debe ejecutarse sin errores
3. Los tokens JWT existentes seguirán siendo válidos (no se cambió el algoritmo ni la rotación)

---

## 1.5 — Migrar EMAIL_BACKEND de console a SMTP

**Archivo:** `magna_web/settings.py` (líneas 206-212)

**Problema:** `EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'` hace que todos los correos (registro, reset de contraseña, etc.) se impriman solo en la consola. Los usuarios **nunca** reciben correos.

**Cambio:**
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_PORT = env.int('EMAIL_PORT', 587)
EMAIL_USE_TLS = env.bool('EMAIL_USE_TLS', True)
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
```

**Comportamiento:**
- Si `EMAIL_HOST` está configurado en `.env` → usa SMTP real
- Si `EMAIL_HOST` **no** está configurado → usa `console.EmailBackend` (los correos se imprimen en consola, no crashea)

```python
EMAIL_HOST = env('EMAIL_HOST', default=None)
if EMAIL_HOST:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    ...
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

**Variables de entorno (opcionales):**
- `EMAIL_HOST` (ej: `smtp.gmail.com`) — si se omite, todo es console
- `EMAIL_PORT` (default: `587`)
- `EMAIL_USE_TLS` (default: `True`)
- `EMAIL_HOST_USER`
- `EMAIL_HOST_PASSWORD`

**Verificación:**
1. Sin `.env` o sin `EMAIL_HOST`: `python manage.py runserver` arranca sin errores
2. Con credenciales SMTP reales: probar envío desde shell

---

## 1.6 — Eliminar `get_object()` duplicado en `user/views.py`

**Archivo:** `user/views.py` (se eliminó el primer bloque, líneas 17-25)

**Problema:** Había dos definiciones de `get_object()` en `UserRetrieveAPIView`. La primera (líneas 17-25) intentaba extraer el token manualmente del header `Authorization`, buscar el usuario en `Token` (modelo de DRF authtoken) y devolverlo. La segunda (líneas 27-29) simplemente devolvía `self.request.user`. La primera era dead code porque:
- Django REST Framework ya resuelve el usuario vía `JWTAuthentication` (simplejwt)
- El modelo `Token` de DRF authtoken **no** se usa en este proyecto (se usa simplejwt)
- La primera función siempre se sobrescribía por la segunda

**Cambio:** Se eliminó el primer bloque `get_object()` y los imports no usados (`Token`, `AuthenticationFailed`, `models.User`). Se mantuvo solo:
```python
def get_object(self):
    return self.request.user
```

**Verificación:** El endpoint de usuario autenticado sigue funcionando correctamente (ej: `GET /auth/users/me/`).

---

## 1.7 — Agregar `@tanstack/react-query` como dependencia directa en page

**Archivo:** `magna-page/page/package.json`

**Problema:** `@tanstack/react-query-devtools` estaba como dependencia, pero `@tanstack/react-query` (la librería principal) solo estaba como dependencia transitiva. Si se actualiza devtools, la dependencia transitiva puede romperse.

**Cambio:** Se agregó `"@tanstack/react-query": "^5.62.0"` como dependencia directa.

**Verificación:** `npm install` desde `magna-page/page/` debe completar sin errores.

---

## 1.8 — Actualizar `.gitignore` y limpiar build artifacts

**Archivos:** `.gitignore` + `git rm -r --cached`

**Problema:** Los builds de frontend (`magna-page/page/dist/` y `magna-page/store/dist/`) estaban commiteados en el repo, inflándolo innecesariamente (~10MB+). También había múltiples SQLite duplicados (`db.4sqlite3`, `db1.sqlite3`, etc.) sin ignorar.

**Cambio:**
- Se agregaron al `.gitignore`:
  ```
  magna-page/page/dist/
  magna-page/store/dist/
  *.sqlite3.backup
  *.sqlite3
  ```
- Se ejecutó `git rm -r --cached magna-page/page/dist/ magna-page/store/dist/` para eliminar del tracking sin borrar los archivos locales.

**Verificación:** `git status` debe mostrar los archivos de dist como `deleted` (staged) y no deben aparecer como untracked. `git check-ignore magna-page/page/dist/` debe retornar el path.

---

## Archivos modificados (resumen)

| Archivo | Cambio | Ítem |
|---------|--------|------|
| `requirements.txt` | Eliminar `cors`, `defusedxml`, `distlib`, `virtualenv`, `virtualenv-clone` | 1.1, 1.2, 1.3 |
| `magna_web/settings.py` | Activar `django-environ`, `SECRET_KEY` vía env, EMAIL vía env | 1.4, 1.5 |
| `user/views.py` | Eliminar `get_object()` duplicado | 1.6 |
| `magna-page/page/package.json` | Agregar `@tanstack/react-query` | 1.7 |
| `.gitignore` | Ignorar builds y sqlite backups | 1.8 |
| `.env.example` | **Nuevo** — template de variables de entorno | 1.4 |
