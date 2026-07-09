# Fase 6 — Contacto: Pruebas de Verificación

> **Proyecto:** Magna Ingeniería y Topografía  
> **Fecha:** 06/07/2026

---

## Prerrequisitos

```bash
cd magna/
# Activar venv
.venv\Scripts\activate
# Variables de entorno
copy .env.example .env  # y editar según sea necesario
```

---

## Test 1: Backend — Sintaxis y configuración

```bash
# Verificar sintaxis de archivos modificados
python -m py_compile contact/views.py
python -m py_compile magna_web/settings/base.py

# Django system check
python manage.py check
```

**Esperado:** `System check identified no issues (0 silenced).`  
*Nota: El warning de CKEditor es pre-existente y no está relacionado con estos cambios.*

---

## Test 2: Backend — Tests de contacto existentes

```bash
python manage.py test contact --verbosity=2
```

**Esperado:** Los 5 tests existentes deben pasar:

| Test | Descripción |
|------|-------------|
| `test_create_contacto` | POST exitoso con datos válidos |
| `test_create_contacto_empty_payload` | POST con payload vacío → 400 |
| `test_create_contacto_missing_field` | POST con campo faltante → 400 |
| `test_create_contacto_saves_to_db` | Verificar que se guarda en BD |
| `test_contacto_default_contestado_false` | `contestado` default False |

```bash
# Output esperado:
# Ran 5 tests in 1.002s
# OK
```

---

## Test 3: Backend — Envío de correo (modo console)

Sin `EMAIL_HOST` configurado, el backend debe usar console:

```bash
python manage.py shell -c "
from django.core.mail import send_mail
send_mail('Test', 'Cuerpo', 'test@test.com', ['info@magnaingenieriaytopografia.com'])
print('OK: Email backend configurado correctamente')
"
```

**Esperado:** El mensaje se imprime en consola (no hay error de conexión SMTP).

---

## Test 4: Backend — Envío de correo (modo SMTP)

Con credenciales SMTP reales en `.env`:

```bash
python manage.py shell -c "
from django.core.mail import send_mail
send_mail(
    'Test Magna - Fase 6',
    'Correo de prueba para verificar configuración SMTP',
    settings.EMAIL_HOST_USER,
    [settings.CONTACT_NOTIFICATION_EMAIL],
    fail_silently=False,
)
print('OK: Correo enviado correctamente')
"
```

**Esperado:** El correo llega a la bandeja de `CONTACT_NOTIFICATION_EMAIL`.

---

## Test 5: Backend — Endpoint de contacto

```bash
# Iniciar servidor de desarrollo
python manage.py runserver &

# POST al formulario de contacto
curl -s -X POST http://localhost:8000/contact/ ^
  -H "Content-Type: application/json" ^
  -d "{\"nombre\":\"Test\",\"telefono\":\"3113394860\",\"email\":\"test@test.com\",\"mensaje\":\"Mensaje de prueba\"}"
```

**Esperado:** HTTP 201 Created con los datos en la respuesta.

---

## Test 6: Frontend — TypeScript check

```bash
cd magna-page/page/
npx tsc --noEmit
```

**Esperado:** Sin errores (salida vacía).

---

## Test 7: Frontend — Build de producción

```bash
cd magna-page/page/
npm run build
```

**Esperado:** Build exitoso sin errores. Verificar que `contact-Brfz8HqJ.js` (o hash similar) se genera.

---

## Test 8: Frontend — Datos de contacto correctos en footer (page)

Verificar que el footer de `magna-page/page/` muestra:
- ✅ Cel: 3015490115 / 3113394860
- ❌ No debe mostrar "Tel:" ni "2706488"
- ✅ Dirección: Calle 98# 13B sur-150, T5- apto 101 Ibagué Tolima

---

## Test 9: Frontend — Datos de contacto correctos en footer (store)

Verificar que el footer de `magna-page/store/` muestra:
- ✅ Cel: 3015490115 / 3113394860
- ❌ No debe mostrar "Tel:" ni "2706488"
- ✅ Dirección actualizada
- ✅ Email: info@magnaingenieriaytopografia.com

---

## Test 10: Frontend — Página de contacto con diseño nuevo

Verificar visualmente:
- ✅ 4 tarjetas de información (Dirección, Celular, Correo, Horario)
- ✅ Dirección actualizada
- ✅ Ambos celulares visibles
- ✅ Sin teléfono fijo
- ✅ Iconos en círculos azules
- ✅ Hover eleva las tarjetas
- ✅ Diseño responsive (4→2→1 columnas)

---

## Test 11: Frontend — SEO (Helmet)

```bash
# Dev server
cd magna-page/page/
npm run dev
```

Abrir `http://localhost:5173/contact` e inspeccionar el `<head>`:
- ✅ `<title>Contacto | Magna Ingeniería y Topografía</title>`
- ✅ `<meta name="description">` con contenido correcto
- ✅ `<meta property="og:title">` y `og:description`
- ✅ `<meta name="twitter:card">`

---

## Test 12: Frontend — Mapa con coordenadas desde .env

```bash
# Con valores por defecto (sin .env o sin VITE_MAP_LAT/LNG):
# El mapa debe cargar en [4.444319033924122, -75.23365217644438]

# Para probar coordenadas personalizadas, agregar al .env del frontend:
# VITE_MAP_LAT=4.500000
# VITE_MAP_LNG=-75.200000
# VITE_MAP_ZOOM=15
# Luego recargar la página de contacto
```

---

## Resumen de resultados

| Test | Descripción | Estado |
|------|-------------|--------|
| 1 | Backend sintaxis + check | ✅ / ❌ |
| 2 | Tests de contacto existentes | ✅ / ❌ |
| 3 | Email modo console | ✅ / ❌ |
| 4 | Email modo SMTP | ✅ / ❌ |
| 5 | Endpoint POST contacto | ✅ / ❌ |
| 6 | TypeScript check | ✅ / ❌ |
| 7 | Build producción | ✅ / ❌ |
| 8 | Footer page datos | ✅ / ❌ |
| 9 | Footer store datos | ✅ / ❌ |
| 10 | Página contacto diseño | ✅ / ❌ |
| 11 | SEO Helmet | ✅ / ❌ |
| 12 | Mapa .env | ✅ / ❌ |

---

## Rollback

| Subfase | Rollback |
|---------|----------|
| 6.1 — Footer datos | `git checkout magna-page/page/src/components/footer1.tsx magna-page/store/src/components/footer1.tsx` |
| 6.2 — Mapa .env | `git checkout magna-page/page/src/components/maps.tsx` |
| 6.3 — Diseño tarjetas | `git checkout magna-page/page/src/pages/contact.tsx magna-page/page/src/components/styles/contact.css` |
| 6.4 — Email notificación | `git checkout contact/views.py magna_web/settings/base.py` + eliminar `contact/templates/contact/` |
| 6.5 — Helmet | `git checkout magna-page/page/src/main.tsx magna-page/page/package.json` + `npm install` |
| 6.6 — .env | `git checkout .env .env.example` |
