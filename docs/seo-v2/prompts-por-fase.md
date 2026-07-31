# Prompts por fase — SEO-v2

Cada prompt está diseñado para arrancar una fase completa. Copia y pega en el chat del agente.

---

## Prompt Fase 1 — Eliminar SSG, restaurar SPA

```
Ejecuta la Fase 1 del plan en docs/seo-v2/plan/fase-01-eliminar-ssg-restaurar-spa.md.

Carga las skills: django-expert, frontend-design.

Instrucciones clave:
1. Reescribe magna_web/urls.py: reemplaza el indexView personalizado (con lógica de prerendered) por un TemplateView simple que apunte a 'unified/dist/index.page.html'. Elimina la ruta /ssg/. Simplifica el catch-all.
2. Archiva prerender.mjs y test-prerender.mjs en docs/seo/prerender-scripts/ (crea la carpeta si no existe).
3. En magna-page/unified/package.json, elimina el script "build:ssg" y comandos relacionados con prerender.
4. Haz npm run build y verifica que el SPA funciona con python manage.py runserver.

Al terminar, documenta resultados en docs/seo-v2/resultados/fase-01-eliminar-ssg-restaurar-spa.md.
```

---

## Prompt Fase 2 — Recuperar settings switcher

```
Ejecuta la Fase 2 del plan en docs/seo-v2/plan/fase-02-recuperar-settings-switcher.md.

Carga las skills: django-expert, django-security.

Instrucciones clave:
1. Recupera el sistema de settings desde la rama deploy/julio-2026.
2. Crea magna_web/settings/__init__.py (vacío).
3. Crea magna_web/settings/base.py desde deploy/julio-2026 adaptado a unified/:
   - STATICFILES_DIRS apunta a ('magna-page/unified/dist',)
   - TEMPLATES.DIRS apunta a BASE_DIR.joinpath('magna-page')
   - No incluyas 'about' en INSTALLED_APPS (solo si existe la app)
4. Crea magna_web/settings/dev.py y prod.py desde deploy/julio-2026.
5. Convierte magna_web/settings.py en switcher que lee DJANGO_ENV y carga dev.py o prod.py.
6. Actualiza .env para que funcione con el switcher.
7. Prueba ambos modos: DJANGO_ENV=development y DJANGO_ENV=production.

Al terminar, documenta resultados en docs/seo-v2/resultados/fase-02-recuperar-settings-switcher.md.
```

---

## Prompt Fase 3 — Recuperar deploy

```
Ejecuta la Fase 3 del plan en docs/seo-v2/plan/fase-03-recuperar-deploy.md.

Carga las skills: django-expert, django-security, bash-defensive-patterns.

Instrucciones clave:
1. Recupera Dockerfile desde deploy/julio-2026. Verifica que STATICFILES_DIRS apunte a unified/dist.
2. Reescribe docker-compose.yml con PostgreSQL 16 + web (gunicorn) + nginx (profile production).
3. Recupera entrypoint.sh desde deploy/julio-2026 (debe tener migrate + collectstatic).
4. Crea/actualiza DEPLOY.md con pasos para unified.
5. Build: cd magna-page/unified && npm run build, luego docker build -t magna-test .
6. Prueba docker compose up y verifica http://localhost:8000.

Al terminar, documenta resultados en docs/seo-v2/resultados/fase-03-recuperar-deploy.md.
```

---

## Prompt Fase 4 — SEO híbrido Django + React

```
Ejecuta la Fase 4 del plan en docs/seo-v2/plan/fase-04-seo-hibrido-django-react.md.

Carga las skills: django-expert, django-patterns, seo, frontend-design.

Instrucciones clave:
1. Crea magna_web/templates/seo/meta.html con <title>, meta description, OpenGraph, JSON-LD. TODOS con data-rh="true".
2. Crea magna_web/templates/index.html que incluye seo/meta.html y tiene <div id="root"></div>.
3. Crea magna_web/views.py con SPAView(TemplateView) que construye el contexto 'seo' según la URL consultando DB.
4. Modifica urls.py para usar SPAView como catch-all.
5. Verifica que main.tsx y cada página usen <Helmet> con data-rh="true".
6. Prueba: curl localhost:8000 | grep data-rh="true" debe mostrar title y meta tags.

Al terminar, documenta resultados en docs/seo-v2/resultados/fase-04-seo-hibrido-django-react.md.
```

---

## Prompt Fase 5 — Sitemaps dinámicos

```
Ejecuta la Fase 5 del plan en docs/seo-v2/plan/fase-05-sitemaps-dinamicos.md.

Carga las skills: django-expert, seo.

Instrucciones clave:
1. Crea magna_web/sitemaps.py con StaticViewSitemap, ServicioSitemap, SubServicioSitemap, ProyectoSitemap, BlogSitemap.
2. Agrega 'django.contrib.sitemaps' a INSTALLED_APPS en settings/base.py.
3. Agrega ruta /sitemap.xml en urls.py usando django.contrib.sitemaps.views.sitemap.
4. Elimina src/page/sitemap/sitemap.tsx y su ruta en main.tsx.
5. Prueba: curl localhost:8000/sitemap.xml debe devolver XML con todas las URLs.

Al terminar, documenta resultados en docs/seo-v2/resultados/fase-05-sitemaps-dinamicos.md.
```

---

## Prompt Fase 6 — Limpiar legacy

```
Ejecuta la Fase 6 del plan en docs/seo-v2/plan/fase-06-limpiar-legacy.md.

Carga la skill: django-expert.

Instrucciones clave:
1. Verifica que los backups existen: magna-page/page.legacy/ y magna-page/store.legacy/.
2. Busca referencias a page/dist o store/dist en *.py, *.md, *.yml, *.json.
3. Si no hay referencias, elimina magna-page/page/ y magna-page/store/.
4. Actualiza AGENTS.md si referenciaba page/ o store/ (solo unified/ debe aparecer).
5. Prueba que todo funciona: python manage.py runserver y npm run build.

Al terminar, documenta resultados en docs/seo-v2/resultados/fase-06-limpiar-legacy.md.
```

---

## Prompt Fase 7 — Validación final

```
Ejecuta la Fase 7 del plan en docs/seo-v2/plan/fase-07-validacion-final.md.

Carga las skills: python-testing-patterns, django-expert, frontend-design, seo.

Instrucciones clave:
1. Valida modo dev frontend: npm run dev + python manage.py runserver en paralelo.
2. Valida modo dev Django: npm run build + python manage.py runserver.
3. Valida modo producción: npm run build + docker build + docker compose up.
4. Ejecuta python manage.py test — todos deben pasar.
5. Valida SEO: curl para meta tags, sitemap, robots.txt, data-rh.
6. Mide: tamaño dist/, tiempo build, tiempo carga.

Al terminar, documenta resultados en docs/seo-v2/resultados/fase-07-validacion-final.md con el resumen consolidado del proyecto.
```
