# SEO + SSG: Static Site Generation para Magna

> Plan general del proyecto de optimización SEO mediante Static Site Generation.
> Versión: Julio 2026

---

## Índice

1. [Problema](#1-problema)
2. [Solución](#2-solución)
3. [Arquitectura final](#3-arquitectura-final)
4. [Fases del proyecto](#4-fases-del-proyecto)
5. [Stack de skills por fase](#5-stack-de-skills-por-fase)
6. [Flujo de trabajo con Git](#6-flujo-de-trabajo-con-git)
7. [Limpieza post-implementación](#7-limpieza-post-implementación)
8. [Métricas objetivo](#8-métricas-objetivo)

---

## 1. Problema

### Diagnóstico actual

| Problema | Causa raíz | Impacto |
|----------|-----------|---------|
| Bots ven HTML vacío | Django sirve `index.page.html` con `<div id="root"></div>` vacío para TODAS las rutas. El contenido solo aparece después de que JS descarga, parsea y ejecuta React. | Googlebot indexa páginas vacías o con contenido mínimo |
| Mismo `<title>` para todas las páginas | Hardcodeado en `index.page.html`. React Helmet lo actualiza, pero solo después de que JS corre. | Todas las URLs aparecen con el mismo title en resultados de búsqueda |
| Misma `<meta name="description">` para todas | Igual que title. El meta description de Helmet reemplaza al hardcodeado, pero demasiado tarde para crawlers que no ejecutan JS. | Google muestra la misma descripción para todas las páginas |
| Sin meta description para subservicios | `SubServicio` no tiene campo `meta_description` en la BD. No hay forma de personalizar el SEO por subservicio desde el admin. | Subservicios no tienen descripción única en buscadores |
| Sin URLs individuales por subservicio | Todo vive en `/servicios` y `/servicios/:id`. No hay página de detalle dedicada. | Cada subservicio no tiene su propia URL para indexar |
| Sitemap no funcional | El sitemap.xml es un componente React que los bots no ven (no ejecutan JS para XML). | Google no descubre todas las páginas del sitio |
| Sin structured data | No hay JSON-LD para breadcrumbs, servicios, organización. | Sin rich snippets en resultados de búsqueda |

### Stack actual (relevante para SEO)

| Componente | Versión | Nota |
|-----------|---------|------|
| Django | 5.2 LTS | Sirve el SPA via `TemplateView` |
| React | 18.3.1 | SPA con `react-router-dom` v6 |
| Vite | 5.4 | Build tool, `base: '/static/'` |
| react-helmet-async | 3.0 | Meta tags client-side |
| TanStack Query | 5.62 | Data fetching |
| Frontend build | `magna-page/unified/` | **Único activo** (legacy: `page/` y `store/`) |

---

## 2. Solución

**SSG (Static Site Generation)** durante el build: un script con Puppeteer renderiza cada ruta del SPA, captura el HTML completo (con Helmet ya aplicado), y Django sirve ese HTML pre-renderizado.

### Principios

1. **Build-time prerendering** — No se necesita un servidor Node.js en runtime. Todo se genera durante `npm run build:ssg`.
2. **Django como servidor de archivos estáticos** — Django solo sirve archivos prerendered + API REST.
3. **Hydration** — React hidrata el HTML prerendered en el cliente para interactividad.
4. **Fallback transparente** — Si no existe prerendered para una ruta, Django sirve el SPA original.
5. **Meta description desde BD** — `SubServicio.meta_description` editable desde admin.

---

## 3. Arquitectura final

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BUILD (npm run build:ssg)                    │
│                                                                     │
│  ┌──────────────────────┐    ┌────────────────────────────────────┐ │
│  │   tsc + vite build   │    │        prerender.mjs               │ │
│  │                      │    │                                      │ │
│  │  dist/               │    │  1. Inicia Django (subproceso)      │ │
│  │  ├── index.page.html │    │  2. Fetch API → rutas dinámicas    │ │
│  │  ├── page-*.js       │    │  3. Puppeteer navega cada ruta     │ │
│  │  ├── vendor-*.js     │    │  4. Espera Helmet + network idle   │ │
│  │  ├── *.css           │    │  5. Captura HTML completo          │ │
│  │  └── *.webp          │    │  6. Guarda en prerendered/{ruta}/  │ │
│  └──────────────────────┘    └────────────────────────────────────┘ │
│                                           │                         │
│                                           ▼                         │
│                               ┌──────────────────────┐             │
│                               │  dist/prerendered/    │             │
│                               │  ├── index.html       │             │
│                               │  ├── servicios/       │             │
│                               │  ├── proyectos/       │             │
│                               │  ├── blog/            │             │
│                               │  └── aboutUs/         │             │
│                               └──────────────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    RUNTIME (Django indexView)                        │
│                                                                     │
│  Request → ¿Existe prerendered/{path}/index.html?                   │
│    ├── Sí → HttpResponse(HTML hidratado)                            │
│    └── No  → HttpResponse(index.page.html) [fallback SPA original]  │
│                                                                     │
│  El HTML prerendered mantiene los <script> del SPA,                 │
│  así que React hidrata y la navegación cliente sigue funcionando.   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Fases del proyecto

| Fase | Descripción | Skills | Rama Git |
|------|------------|--------|----------|
| [**1**](fase-01-backend-modelos-api/README.md) | Modelos: +`slug`, +`meta_description`. API: endpoint subservicio. Migration. Generate slugs command. | `django-expert`, `seo` | `seo-ssg/fase-01-backend` |
| [**2**](fase-02-frontend-subservicio-detail/README.md) | Frontend: página detalle subservicio con Helmet desde BD, ruta `/servicios/:serSlug/:subSlug`, navegación actualizada. | `frontend-design`, `seo` | `seo-ssg/fase-02-frontend` |
| [**3**](fase-03-ssg-prerendering/README.md) | SSG: script prerender.mjs con Puppeteer. Pipeline de build. | `bash-defensive-patterns` | `seo-ssg/fase-03-ssg` |
| [**4**](fase-04-django-sirve-prerendered/README.md) | Django: indexView sirve prerendered si existe, fallback a SPA. Ruta /ssg/ para comparación en dev. | `django-expert` | `seo-ssg/fase-04-django` |
| [**5**](fase-05-tests-medicion/README.md) | Tests + Lighthouse: tests unitarios Django, test integración prerender, scripts Lighthouse comparison. Target ≥ 93. | `python-testing-patterns`, `seo` | `seo-ssg/fase-05-tests` |
| [**6**](fase-06-build-automatizado/README.md) | Build command: build-and-update.bat/.sh. Un solo comando para build + prerender + collectstatic + tests. | `bash-defensive-patterns` | `seo-ssg/fase-06-build` |
| [**7**](fase-07-documentacion-final/README.md) | Documentación final: actualizar AGENTS.md, DESIGN.md. Limpieza de frontends legacy. Merge a main. | — | `seo-ssg/fase-07-docs` |

---

## 5. Stack de skills por fase

Cargar la skill ANTES de empezar cada fase (según `AGENTS.md → Agent Usage Rules`).

| Fase | Skills a cargar |
|------|----------------|
| 1 — Backend | `django-expert`, `seo` |
| 2 — Frontend | `frontend-design`, `seo` |
| 3 — SSG | `bash-defensive-patterns` |
| 4 — Django | `django-expert` |
| 5 — Tests | `python-testing-patterns`, `seo` |
| 6 — Build | `bash-defensive-patterns` |
| 7 — Docs | — |

---

## 6. Flujo de trabajo con Git

Cada fase se desarrolla en una rama independiente y se pushea a GitHub.

### Convención de ramas

```
seo-ssg/fase-01-backend
seo-ssg/fase-02-frontend
seo-ssg/fase-03-ssg
seo-ssg/fase-04-django
seo-ssg/fase-05-tests
seo-ssg/fase-06-build
seo-ssg/fase-07-docs
```

### Proceso por fase

```bash
# 1. Crear rama (desde el branch anterior si acumulamos, o desde main si es fase 1)
git checkout -b seo-ssg/fase-N-nombre

# 2. Implementar cambios
# ... (código, tests, etc.)

# 3. Commit + Push
git add .
git commit -m "seo-ssg: fase N — descripción breve"
git push origin seo-ssg/fase-N-nombre

# 4. (Opcional) Crear PR para revisión
gh pr create --base main --head seo-ssg/fase-N-nombre --title "Fase N: descripción" --body "Ver docs/fase-N-nombre/README.md"
```

### Al finalizar todas las fases

```bash
# Merge fase-07-docs → main
git checkout main
git merge seo-ssg/fase-07-docs
git push origin main

# Limpiar ramas remotas
git push origin --delete seo-ssg/fase-01-backend
git push origin --delete seo-ssg/fase-02-frontend
# ... etc
```

---

## 7. Limpieza post-implementación

Una vez completado el proyecto y verificado que todo funciona:

### 7.1 Eliminar frontends legacy

```bash
# Verificar que el build activo es unified/
git rm -r magna-page/page/
git rm -r magna-page/store/
```

### 7.2 Actualizar STATICFILES_DIRS

En `magna_web/settings/base.py`, si aún apunta a los directorios legacy, limpiar.

### 7.3 Eliminar referencias en AGENTS.md

Remover comandos de build para `page/` y `store/`.

---

## 8. Métricas objetivo

### Lighthouse (target ≥ 93)

| Métrica | SPA actual | SSG target | Mejora esperada |
|---------|-----------|------------|-----------------|
| SEO | ~80 | **≥ 95** | +15-20 puntos |
| Performance | ~65 | **≥ 90** | +25 puntos |
| Accessibility | ~85 | **≥ 93** | +8 puntos |
| Best Practices | ~85 | **≥ 90** | +5 puntos |

### Web Vitals

| Métrica | SPA actual | SSG target |
|---------|-----------|------------|
| FCP | ~2.4s | **< 1.5s** |
| LCP | ~3.8s | **< 2.5s** |
| TTFB | ~0.8s (EE.UU.) | ~0.8s (sin cambio) |

> **Nota de latencia:** El servidor está en AWS Lightsail (Virginia, EE.UU.).
> Desde Colombia, el TTFB tiene ~60-120ms adicionales. Esto afecta a SPA y SSG por igual.
> La ventaja real de SSG está en FCP y LCP, que no dependen de descargar y ejecutar JS.

### Cobertura de tests

| Suite | Tests esperados |
|-------|----------------|
| Django unit tests (magna_web.tests) | 5 |
| Prerender verification (Node) | 6 rutas × 4 checks |
| Lighthouse targets | 4 métricas |

---

## Siguiente paso

➡️ Ir a [Fase 1: Backend — Modelos + API](fase-01-backend-modelos-api/README.md)
