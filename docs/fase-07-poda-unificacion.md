# Fase 7 — Poda de Frontends Legacy

> **Fecha:** 19/07/2026
> **Rama:** `feature/unified-frontend`
> **Commits:** `1ccb183` (poda), antecesor `d240947` (unificación)

---

## 1. Objetivo

Eliminar los directorios `page/` y `store/` originales del proyecto, dejando solo el proyecto unificado `unified/` como única fuente de frontend. Los viejos directorios se renombran a `.legacy` como backup inmediato.

---

## 2. Verificaciones pre-poda

| Verificación | Resultado |
|---|---|
| `unified/` importa algo de `page/` o `store/`? | **No** — 0 referencias externas |
| Django `STATICFILES_DIRS` apunta a `unified/dist` | ✓ (`base.py:127`) |
| Django `TEMPLATES[0]['DIRS']` | ✓ apunta a `magna-page/` |
| `urls.py` usa `unified/dist/index.{page,store}.html` | ✓ |
| Tests Django (61) | ✅ Todos OK |
| Build unified (page + store) | ✅ 7.58s, 1238 módulos |

---

## 3. Lo que se hizo

### 3.1 Renombrar directorios legacy

```
magna-page/page/     →  magna-page/page.legacy/
magna-page/store/    →  magna-page/store.legacy/
```

Ambos directorios se conservan intactos como backup. No se eliminó ningún archivo.

### 3.2 Corrección de test

`frequentQuestions/tests.py` esperaba 2 preguntas pero la data migration `0002_add_faq_entries.py` agrega 2 más. Se actualizó el assertion a 4.

### 3.3 Scripts agregados

Se incorporaron scripts de automatización en `scripts/` (no requieren configuración adicional):

| Script | Propósito |
|---|---|
| `scripts/generar_informe_cliente.py` | Orquestador: genera informe completo para cliente (screenshots → gráficos → Word → PowerPoint) |
| `scripts/tomar_screenshots.py` | Captura screenshots del sitio en producción con Playwright |
| `scripts/generar_graficos.py` | Genera gráficos comparativos de Pagespeed/rendimiento |
| `scripts/generar_docx.py` | Genera documento Word con resultados |
| `scripts/generar_pptx.py` | Genera presentación PowerPoint |

---

## 4. Estado actual de `magna-page/`

```
magna-page/
├── page.legacy/        ← Backup del proyecto page original
├── store.legacy/       ← Backup del proyecto store original
├── unified/            ← ÚNICO proyecto activo (Vite multi-entry)
│   ├── index.page.html → Entry point website
│   ├── index.store.html → Entry point e-commerce
│   ├── src/
│   │   ├── page/           → Código del website
│   │   ├── store-pages/    → Código del e-commerce
│   │   ├── shared/         → Componentes compartidos
│   │   ├── auth/           → Auth unificado
│   │   └── store/          → Store context
│   ├── vite.config.ts
│   └── package.json
├── package-lock.json
```

---

## 5. Cómo trabajar con el frontend ahora

```bash
# Desarrollo (desde la raíz del proyecto)
cd magna-page/unified

# Iniciar servidor de desarrollo (page en /, store en /store/)
npm run dev

# Build de producción (genera ambos entry points)
npm run build

# Lint
npm run lint
```

Django ya está configurado para servir desde `unified/dist/`:

```python
# magna_web/settings/base.py
STATICFILES_DIRS = (BASE_DIR / 'magna-page/unified/dist',)
```

```python
# magna_web/urls.py
class indexView(TemplateView):
    template_name = 'unified/dist/index.page.html'

class storeView(TemplateView):
    template_name = 'unified/dist/index.store.html'
```

---

## 6. Pendientes / Próximos pasos

- [ ] **Actualizar scripts de deploy** (`deploy.bat`, `deploy.sh`, `infrastructure/ansible`) para que construyan desde `unified/` en lugar de `page/` y `store/`
- [ ] **Pruebas visuales manuales** de todas las rutas (page + store) en local y producción
- [ ] **Eliminar `page.legacy/` y `store.legacy/`** tras verificación en producción (esperar 1 semana)
- [ ] Si se usa `scripts/generar_informe_cliente.py`, asegurar que Playwright esté instalado (`pip install playwright && playwright install chromium`)

---

## 7. Commits relevantes

| Commit | Descripción |
|---|---|
| `d240947` | Unificación inicial: page + store → unified/ |
| `1ccb183` | Poda: marcar page/ y store/ como legacy |
