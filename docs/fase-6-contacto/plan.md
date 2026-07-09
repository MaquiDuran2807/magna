# Fase 6 — Contacto, Notificaciones por Correo, UX/UI y SEO

> **Proyecto:** Magna Ingeniería y Topografía  
> **Fecha de inicio:** 06/07/2026  
> **Estado:** Completado  

---

## Resumen

Rediseño completo de la sección de contacto: actualización de datos (dirección, teléfonos), eliminación del teléfono fijo, notificación por correo al recibir formularios, coordenadas del mapa configurables desde `.env`, mejoras UX/UI con tarjetas de información, SEO con `react-helmet-async`, y plantilla HTML para correos de notificación.

---

## Subfase 6.1 — Actualizar datos de contacto en frontend

**Archivos modificados:**
- `magna-page/page/src/components/footer1.tsx`
- `magna-page/store/src/components/footer1.tsx`

**Cambios:**

| Dato | Anterior | Nuevo |
|------|----------|-------|
| Dirección (page footer) | `Cl. 18 #7-27 Ibagué, Tolima. Colombia` | `Calle 98# 13B sur-150, T5- apto 101 Ibagué Tolima` |
| Dirección (store footer) | `Cl. 18 #7-27 / Ibagué, Tolima. Colombia` | `Calle 98# 13B sur-150 / T5- apto 101, Ibagué, Tolima` |
| Teléfono fijo | `2706488` | Eliminado |
| Celulares (page footer) | `3015490115` | `3015490115 / 3113394860` |
| Celulares (store footer) | `3015490115` | `3015490115 / 3113394860` |
| Email (store footer) | `magnaingenieriaytopografia@magna.co` | `info@magnaingenieriaytopografia.com` |

**Verificación:**
- `npm run build` sin errores
- Inspección visual de los footers en ambas aplicaciones

---

## Subfase 6.2 — Coordenadas del mapa desde `.env`

**Archivos modificados:**
- `magna-page/page/src/components/maps.tsx`
- `.env`
- `.env.example`

**Cambios:**
- Las coordenadas del mapa (`[4.444319033924122, -75.23365217644438]`) ahora se leen de `import.meta.env.VITE_MAP_LAT` y `VITE_MAP_LNG` con fallback a los valores actuales
- El zoom se lee de `VITE_MAP_ZOOM` (fallback: 17)
- Nuevas variables en `.env` y `.env.example`

**Verificación:**
- El mapa se renderiza correctamente con valores por defecto si no hay `.env`
- Con valores personalizados en `.env`, el mapa centra en las nuevas coordenadas

---

## Subfase 6.3 — Rediseño UX/UI de la sección de información de contacto

**Archivos modificados:**
- `magna-page/page/src/pages/contact.tsx`
- `magna-page/page/src/components/styles/contact.css`

**Cambios visuales:**

El diseño anterior era texto plano en filas de Bootstrap sin estructura visual diferenciada. Se reemplazó con un **sistema de 4 tarjetas**:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    📍       │  │    📞       │  │    ✉️       │  │    🕐       │
│  Dirección  │  │  Celular    │  │   Correo    │  │   Horario   │
│  Calle 98…  │  │ 3015… / 3… │  │ info@magn…  │  │ Lun-Vie     │
│  Ibagué     │  │             │  │             │  │ 8am-5pm     │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

**Características del diseño:**
- Tarjetas con fondo blanco, `border-radius: 16px`, sombra suave (`0 4px 16px rgba(0,0,0,0.06)`)
- Icono dentro de círculo con gradiente `#163E73 → #1f5a9e`
- Efecto hover: elevación (`translateY(-6px)`), sombra más notoria, icono escala
- Título en uppercase (`0.8rem`, color `#888888`)
- Valor en `#163E73` (navy) con `font-weight: 600`
- Grid responsive: 4 columnas en desktop, 2×2 en tablet, 1 columna en mobile
- Sección con fondo `#f8f9fc` para contraste

**Datos actualizados:**
- Dirección: `Calle 98# 13B sur-150, T5- apto 101, Ibagué, Tolima`
- Celular: `3015490115 / 3113394860`
- Teléfono fijo: eliminado
- Correo: `info@magnaingenieriaytopografia.com`
- Horario: Lunes a Viernes 8:00 am - 5:00 pm

**Verificación:**
- `npx tsc --noEmit` sin errores
- `npm run build` exitoso
- Diseño responsive probado en 3 breakpoints

---

## Subfase 6.4 — Notificación por correo al recibir formulario de contacto

**Archivos modificados:**
- `contact/views.py`
- `contact/templates/contact/email_notification.html` **(nuevo)**
- `magna_web/settings/base.py`

**Backend (`contact/views.py`):**
- Se agregó el método `_enviar_notificacion()` que envía un correo HTML con los datos del formulario
- Se envía a `settings.CONTACT_NOTIFICATION_EMAIL` (configurable via `.env`)
- El envío es post-save, no bloquea la respuesta al usuario
- Si falla el correo, se registra el error en logs pero no interrumpe el flujo

**Plantilla HTML (`email_notification.html`):**
- Diseño profesional con header azul navy (`#163E73`), cuerpo blanco, footer dark (`#021328`)
- Logo SVG inline de Magna
- Datos formateados: nombre, teléfono, email, mensaje
- Timestamp de recepción
- Datos de la empresa en el footer (dirección actualizada, teléfonos, email)
- Estilos inline para compatibilidad con clientes de correo
- Responsive para mobile

**Settings (`base.py`):**
```python
CONTACT_NOTIFICATION_EMAIL = env('CONTACT_NOTIFICATION_EMAIL', default='info@magnaingenieriaytopografia.com')
```

**Verificación:**
- `python manage.py check` sin errores
- `python manage.py test contact` — 5 tests pasan
- Con `EMAIL_HOST` configurado: el correo se envía correctamente
- Sin `EMAIL_HOST`: el backend usa console (no crashea)

---

## Subfase 6.5 — SEO con `react-helmet-async`

**Archivos modificados:**
- `magna-page/page/src/main.tsx` — agregado `HelmetProvider` wrapper
- `magna-page/page/src/pages/contact.tsx` — agregado `<Helmet>` con meta tags

**Dependencia instalada:**
```bash
npm install react-helmet-async
```

**Meta tags agregados a la página de contacto:**
```html
<title>Contacto | Magna Ingeniería y Topografía</title>
<meta name="description" content="Contáctanos. Estamos ubicados en Ibagué, Tolima...">
<meta name="keywords" content="Magna, Ingeniería, Topografía, Contacto, Ibagué...">
<meta property="og:title" content="Contacto | Magna Ingeniería y Topografía">
<meta property="og:description" content="Comunícate con nosotros para proyectos...">
<meta property="og:url" content="https://magnaingenieriaytopografia.com/contact">
<meta name="twitter:card" content="summary">
```

**Nota:** El store ya tenía `react-helmet-async` implementado en todas sus páginas. Se agregó al frontend principal que carecía de él.

**Verificación:**
- `npm run build` exitoso
- Los meta tags aparecen en el HTML renderizado (inspección de navegador)

---

## Subfase 6.6 — Variables de entorno

**Archivos modificados:**
- `.env`
- `.env.example`
- `magna_web/settings/base.py`

**Nuevas variables:**

| Variable | Default | Descripción |
|----------|---------|-------------|
| `CONTACT_NOTIFICATION_EMAIL` | `info@magnaingenieriaytopografia.com` | Destinatario de notificaciones del formulario |
| `VITE_MAP_LAT` | `4.444319033924122` | Latitud del mapa de contacto |
| `VITE_MAP_LNG` | `-75.23365217644438` | Longitud del mapa de contacto |
| `VITE_MAP_ZOOM` | `17` | Nivel de zoom del mapa |

---

## Resumen de archivos modificados/creados

| Archivo | Acción | Subfase |
|---------|--------|---------|
| `magna-page/page/src/pages/contact.tsx` | ✏️ Rediseño completo + datos + Helmet | 6.3, 6.5 |
| `magna-page/page/src/components/styles/contact.css` | ✏️ Nuevos estilos tarjetas | 6.3 |
| `magna-page/page/src/components/footer1.tsx` | ✏️ Datos actualizados | 6.1 |
| `magna-page/store/src/components/footer1.tsx` | ✏️ Datos + email actualizados | 6.1 |
| `magna-page/page/src/components/maps.tsx` | ✏️ Coordenadas desde .env | 6.2 |
| `magna-page/page/src/main.tsx` | ✏️ HelmetProvider agregado | 6.5 |
| `contact/views.py` | ✏️ Envío de correo notificación | 6.4 |
| `contact/templates/contact/email_notification.html` | ➕ Plantilla HTML | 6.4 |
| `magna_web/settings/base.py` | ✏️ CONTACT_NOTIFICATION_EMAIL | 6.4, 6.6 |
| `.env` | ✏️ Nuevas variables | 6.2, 6.6 |
| `.env.example` | ✏️ Documentación vars nuevas | 6.2, 6.6 |
| `magna-page/page/package.json` | ✏️ react-helmet-async | 6.5 |
