# Fase 01 — Foundation y Config (Store en Unified)

## Objetivo

Establecer la base del store dentro del proyecto unificado: arreglar `index.store.html` con SEO real, favicon, Google Analytics, y configurar `apiClient.ts` con variable de entorno (no hardcodeado a producción).

---

## Archivos a Modificar

| Ruta en Unified | Acción |
|-----------------|--------|
| `magna-page/unified/index.store.html` | Reescribir completo |
| `magna-page/unified/src/store-pages/apiClient.ts` | Modificar (usar env var) |
| `magna-page/unified/src/store-pages/main.tsx` | Verificar Google Analytics |
| `magna-page/unified/public/icono-magna.svg` | Verificar que existe (copiar de page si no) |

---

## Skills Necesarias

- **`frontend-design`** — estructura HTML, preconnect
- **`seo`** — meta tags, OG tags, Twitter Cards

---

## Evaluación de AGENTS.md

- [ ] **Vite `base: '/static/'`** — ya configurado
- [ ] **Vite `envDir: '../../'`** — ya configurado
- [ ] **Frontend builds** — recordar rebuild después de cambios

---

## Evaluación de DESIGN.md

- [ ] **§7.1** — nombre de marca en meta tags
- [ ] **§9.5** — nginx sirve `/static/` con caché

---

## Instrucciones Detalladas

### 1. `index.store.html` — Reescribir

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="description" content="Magna Store — Equipos y productos de ingeniería y topografía en Ibagué, Colombia." />
  <meta name="keywords" content="Magna, Magna Store, topografía, equipos topográficos, drones, estación total, GPS" />
  <meta name="author" content="Magna Ingeniería y Topografía" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="icon" type="image/svg+xml" href="/static/icono-magna.svg" />
  <link rel="apple-touch-icon" href="/static/icono-magna.svg" />

  <meta property="og:title" content="Magna Store — Equipos de Ingeniería y Topografía" />
  <meta property="og:description" content="Compra equipos topográficos, drones y accesorios. Envíos a todo Colombia." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://magnaingenieriaytopografia.com/store/" />
  <meta property="og:image" content="https://magnaingenieriaytopografia.com/static/og-store.jpg" />
  <meta property="og:locale" content="es_CO" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Magna Store — Equipos de Ingeniería y Topografía" />
  <meta name="twitter:description" content="Compra equipos topográficos, drones y accesorios." />

  <link rel="preconnect" href="https://www.googletagmanager.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

  <title>Magna Store — Equipos de Ingeniería y Topografía</title>

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8DBBBFYVF4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8DBBBFYVF4');
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./src/store-pages/main.tsx"></script>
</body>
</html>
```

**Cambios clave respecto al actual:**
- `lang="es"` (actualmente no tiene lang)
- Title descriptivo (actual: "Magnatienda")
- Meta description + keywords
- Open Graph + Twitter Card
- Favicon = `icono-magna.svg` (mismo que page)
- Google Analytics (mismo ID `G-8DBBBFYVF4`)

### 2. `apiClient.ts` — Usar variable de entorno

```ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || window.location.origin,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const { token } = JSON.parse(userInfo)
    config.headers.Authorization = `JWT ${token}`
  }
  return config
})

export default apiClient
```

### 3. Verificar `shared/api/client.ts`

El `shared/api/client.ts` ya tiene la misma lógica. Evaluar si unificar.

---

## Tests

- [ ] `index.store.html` tiene `lang="es"`
- [ ] Title: "Magna Store — Equipos de Ingeniería y Topografía"
- [ ] OG tags presentes
- [ ] Favicon visible en pestaña
- [ ] Google Analytics inline presente
- [ ] `apiClient.ts` usa `import.meta.env.VITE_API_URL`
- [ ] Build exitoso
- [ ] Store carga sin errores

---

## Documentación de Resultados

| Métrica | Valor |
|---------|-------|
| **Fecha** | 2026-07-14 |
| **Tokens** | |
| **Líneas creadas** | 64 |
| **Líneas eliminadas** | 118 |
| **Estado** | ✅ Completado |
| **Cambios adicionales** | Eliminados precios del frontend store |
