# AGENTS.md — Magna (Ingeniería y Topografía)

## Project Structure

Django 5.2 backend + two React/TypeScript Vite SPAs, deployed to AWS Lightsail.

| Directory | Purpose |
|---|---|
| `magna_web/` | Django project config (settings, urls, wsgi) |
| `magna-page/unified/` | **ÚNICO** frontend React/Vite (multi-entry: page + store) |
| `magna-page/page.legacy/` | Backup del page original (ya no se usa) |
| `magna-page/store.legacy/` | Backup del store original (ya no se usa) |
| `blog/`, `contact/`, `equipos/`, `frequentQuestions/`, `products/`, `proyectos/`, `servicios/` | Django REST apps |
| `user/` | Custom User model (AUTH_USER_MODEL) |
| `infrastructure/` | Terraform + Ansible for AWS Lightsail deploy |
| `nginx/` | nginx config for production |

## Dev Commands

```bash
# Backend (port 8000)
python manage.py runserver

# Frontend — unified (page en /, store en /store/)
cd magna-page/unified && npm run dev

# Tests
python manage.py test

# Frontend lint
cd magna-page/unified && npm run lint

# Build frontend (required before collectstatic)
cd magna-page/unified && npm run build

# Build + prerender completo
cd magna-page/unified && npm run build:ssg

# Prerender ruta especifica (sin rebuild)
cd magna-page/unified && node prerender.mjs --route /servicios/topografia

# Prerender lote (servicios, projects, blog)
cd magna-page/unified && node prerender.mjs --batch servicios

# Prerender automatico al guardar (admin)
python manage.py rerender_page /ruta

# Auto-prerender via signals (post_save en modelos)
set PRERENDER_AUTO=1  # activado por defecto
set PRERENDER_AUTO=0  # desactivar

# Verificar prerendered
cd magna-page/unified && node test-prerender.mjs
```

## Environment Variables (Frontend)

| Variable | Cargado desde | Dev (`npm run dev`) | Build (`npm run build`) |
|----------|---------------|---------------------|-------------------------|
| `VITE_API_URL` | `.env.development` | `http://localhost:8000` | `undefined` (usa `window.location.origin`) |
| `VITE_MAP_LAT/LNG/ZOOM` | `.env` (raíz) | 4.4199425 / -75.1739947 / 17 | mismos valores |

**Tres modos de trabajo:**

| Modo | Frontend | Backend | API apunta a |
|------|----------|---------|--------------|
| `npm run dev` (React dev) | `localhost:5174` | `localhost:8000` | `http://localhost:8000` vía `VITE_API_URL` |
| `python manage.py runserver` + build | Django en `127.0.0.1:8000` sirve `dist/` | mismo proceso | `window.location.origin` (mismo origen) |
| Producción | nginx + Django | gunicorn | `window.location.origin` (mismo origen) |

> **Nota:** `.env.development` solo se carga en `npm run dev`. En `npm run build`, `VITE_API_URL` no está definida, por lo que `apiClient.tsx` usa `window.location.origin` (correcto tanto para Django dev como producción).

## Key Gotchas

- **Settings switch:** `DJANGO_ENV` controls which settings file loads. `development` → `dev.py`, `production` → `prod.py`. Default in `manage.py` is `dev`.
- **SQLite in dev, Postgres in Docker.** `base.py` defaults to SQLite when no `DB_*` env vars are set.
- **Frontend builds must exist** before `collectstatic` works. `STATICFILES_DIRS` points to `magna-page/unified/dist`.
- **Vite `base` dinámico:** `command === 'build' ? '/static/' : '/'` — en dev usa `/`, en build usa `/static/` para que Django sirva los assets.
- **Vite `envDir: '../../'`** — frontend `.env` se carga desde la raíz del proyecto, no desde el directorio de Vite.
- **nginx only in prod profile.** Root `docker-compose.yml` has nginx behind `profiles: - production`, so it won't start with plain `docker compose up`.
- **`gunicorn.conf` is actually nginx config** (SSL/reverse proxy), not gunicorn configuration.
- **Production compose** lives at `infrastructure/docker-compose.prod.yml` (uses `image:`), not the root file (uses `build:`).

## Auth Stack

Djoser + SimpleJWT. Custom `user.User` model. Auth endpoints at `/auth/`. JWT header type is `JWT` (not `Bearer`). Access token lifetime: 20 days.

## Deploy

```bash
cd infrastructure
deploy.bat          # Windows
# or
bash deploy.sh      # Linux/Mac
```

Requires: AWS CLI configured, Terraform >= 1.5, Ansible (`pip install ansible`). Deploy script handles Lightsail provisioning, Docker Hub push (optional), Ansible provisioning, and Let's Encrypt SSL.

To destroy: `cd infrastructure/terraform && terraform destroy -auto-approve`

### SSH to Production Server

- **Host:** `13.223.147.116`
- **User:** `ubuntu`
- **PEM key:** `~/.ssh/magna.pem`
- **Connect:** `ssh -i ~/.ssh/magna.pem ubuntu@13.223.147.116`

## Testing

Tests use Django's `TestCase` + DRF's `APIClient`. Run with `python manage.py test`. 56 tests across 8 apps (user, servicios, equipos, proyectos, contact, frequentQuestions, products, blog).

## Current State (as of July 2026)

Completed phases from `PLAN_ACTUALIZACION.md`:

| Phase | Status |
|---|---|
| Fase 1 — Bugs críticos | ✅ COMPLETADO |
| Fase 2 — Modernización (Docker, PostgreSQL, Django 5.2, frontends, performance) | ✅ COMPLETADO |
| Fase 3+4+5 — Unificación frontends | Plan documentado, pendiente |
| Fase-slides — Slides independientes + imagen variants | En progreso |

Key improvements applied in Fase 2:
- Docker + docker-compose for local dev and production
- PostgreSQL support (dual-mode with SQLite fallback via `DB_ENGINE`)
- Django 5.2 LTS + all deps updated (DRF 3.17, simplejwt 5.5, djoser 2.3, etc.)
- Frontend Vite 5 + TypeScript 5.5 for both page and store
- react-query v4→v5 migration in store
- PurgeCSS configured (56% CSS reduction) with safelist for react-bootstrap dynamic classes
- `manualChunks` splitting vendors into 15+ cacheable chunks
- ProgressiveBackground component for lazy loading large images with blur-up placeholder
- HTTP/2 enabled in nginx
- Cache headers for `/static/` (1y) and `/media/` (30d) in nginx
- react-icons v5 with tree-shaking (automatic via `sideEffects: false`)

## Style Conventions

- Variables/funciones en español (consistente con el proyecto)
- No comentarios superfluos — código auto-documentado
- Modelos con `__str__` y `Meta.ordering`
- Serializers especifican `fields` explícitamente (nunca `__all__` en producción)
- Management commands disponibles: `python manage.py generate_image_variants [--dry-run]`

## Key Models

- `servicios.Servicio` — con `imagen_tablet`/`imagen_celular` (auto-generated variants)
- `servicios.Slide` — modelo independiente para hero slider (separado de Servicio)
- `servicios.Brochure` — archivos descargables
- `user.User` — modelo custom (AUTH_USER_MODEL)
- `products.Product` — e-commerce con PayPal integration
- `blog.Post` — blog con CKEditor

## Installed Skills (Exclusive Technology)

The project has 30 specialized skills in `.agents/skills/`. **Always use the relevant skill** before starting work on a specific task type.

### Core Development Skills

| Skill | When to Use |
|---|---|
| `django-expert` | Creating models, views, serializers, APIs; debugging ORM queries; optimizing database performance; implementing authentication; writing tests |
| `django-patterns` | Django architecture patterns, REST API design with DRF, ORM best practices, caching, signals, middleware |
| `django-security` | Authentication, authorization, CSRF protection, SQL injection/XSS prevention, secure deployment |
| `python-patterns` | Pythonic idioms, PEP 8, type hints, best practices for robust Python code |
| `python-testing-patterns` | pytest, fixtures, mocking, TDD, test suites, integration tests |
| `frontend-design` | Creating distinctive React components, pages, UI/UX design, styling, avoiding generic AI aesthetics |

### Quality & Optimization Skills

| Skill | When to Use |
|---|---|
| `seo` | Meta tags, structured data, sitemap optimization, search engine visibility |
| `accessibility` | WCAG 2.2 compliance, screen reader support, keyboard navigation, a11y audits |
| `bash-defensive-patterns` | Writing robust shell scripts, CI/CD pipelines, fault tolerance |

### Agent Usage Rules

1. **Before any Django work** → Load `django-expert` skill
2. **Before any React/frontend work** → Load `frontend-design` skill
3. **Before writing tests** → Load `python-testing-patterns` skill
4. **Before security changes** → Load `django-security` skill
5. **Before SEO/meta changes** → Load `seo` skill
6. **Before accessibility work** → Load `accessibility` skill

## Design Guidelines

The project follows consistent design principles. Before creating or modifying UI components, refer to:

- **`DESIGN.md`** — Architecture base and style guidelines for visual uniformity (comprehensive UI/UX system)
- **`frontend-design` skill** — For creating distinctive, production-grade interfaces
- **Style Conventions section** below — For code-level consistency

### Visual Uniformity Rules

1. **Colors**: Use CSS variables defined in `DESIGN.md` Section 7.1 (`--color-primary: #1a365d`, `--color-secondary: #d69e2e`)
2. **Typography**: Use `--font-heading: 'Poppins'` for headings, `--font-primary: 'Inter'` for body text
3. **Spacing**: Follow the spacing scale in `DESIGN.md` Section 7.3 (`--space-1` through `--space-24`)
4. **Components**: Reuse existing React components before creating new ones
5. **Responsive**: All changes must work on mobile, tablet, and desktop (breakpoints in Section 7.4)
6. **Shadows & Borders**: Use design tokens from Sections 7.5-7.6
7. **Icons**: Use react-icons v5 with tree-shaking pattern (Section 7.8)

## Agent Memory Database

An SQLite database at `.opencode/agent_memory.db` serves as external long-term memory to optimize token consumption. It contains three tables:

### Tables

| Table | Purpose |
|---|---|
| `files_map` | Track Django views/models and React components (file_path, file_type, description) |
| `api_endpoints` | Store API routes (endpoint, method, app_name, description) |
| `agent_tasks` | Track task statuses (task_name, status, description, timestamps) |

### Query Commands

```bash
# Check Django models/views
python -c "import sqlite3; c=sqlite3.connect('.opencode/agent_memory.db'); r=c.execute('SELECT * FROM files_map WHERE file_type=\"model\"'); [print(row) for row in r]"

# Check API endpoints
python -c "import sqlite3; c=sqlite3.connect('.opencode/agent_memory.db'); r=c.execute('SELECT * FROM api_endpoints'); [print(row) for row in r]"

# Check React components
python -c "import sqlite3; c=sqlite3.connect('.opencode/agent_memory.db'); r=c.execute('SELECT * FROM files_map WHERE file_type=\"component\"'); [print(row) for row in r]"

# Check task history
python -c "import sqlite3; c=sqlite3.connect('.opencode/agent_memory.db'); r=c.execute('SELECT * FROM agent_tasks ORDER BY created_at DESC'); [print(row) for row in r]"

# Search for specific file
python -c "import sqlite3; c=sqlite3.connect('.opencode/agent_memory.db'); r=c.execute('SELECT * FROM files_map WHERE file_path LIKE \"%servicio%\"'); [print(row) for row in r]"
```

### Instructions for Agent

1. **Before reading large source files**, query `files_map` to check if the file is already indexed
2. **Before asking for API structure**, query `api_endpoints` to get existing routes
3. **Before starting a task**, query `agent_tasks` to check if similar work was done
4. **After completing work**, update `files_map` and `agent_tasks` accordingly
5. **Use `python -c` commands** to quickly query the database without loading full files

### Pre-Task Checklist

Before starting any work, ALWAYS:

1. **Query the memory database** — Check `files_map`, `api_endpoints`, or `agent_tasks` to avoid re-reading files
2. **Load the relevant skill** — Match task type to the appropriate skill from "Installed Skills" section
3. **Check design guidelines** — Refer to `DESIGN.md` or existing components for visual consistency
4. **Follow style conventions** — Maintain Spanish naming, explicit fields, no superfluous comments

⚠️ **REGLAS CRÍTICAS — NO VIOLAR BAJO NINGÚN MOTIVO:**

1. **NUNCA hacer `git checkout` de commits viejos sobre archivos existentes sin preguntar.** Preguntar siempre qué archivos restaurar y de qué commit, mostrar lista de opciones.
2. **NUNCA borrar archivos ni directorios sin aprobación explícita.**
3. **NUNCA sobrescribir archivos del usuario sin mostrar el diff y preguntar.**
4. **Cualquier operación destructiva (checkout, reset, restore, delete, overwrite) debe presentar opciones al usuario y esperar confirmación.**
5. **Ante la duda: PREGUNTAR. No ejecutar comandos que puedan perder trabajo del usuario sin confirmación.**

## Credenciales Docker Hub

- **Usuario:** `mquiroga2807`
- **Token:** almacenado en `C:\Users\Janus\Documents\magna\docker hub token.txt`
- **Login:** `Get-Content 'C:\Users\Janus\Documents\magna\docker hub token.txt' | Select-Object -Skip 1 | docker login -u mquiroga2807 --password-stdin`
- **Repositorio:** `mquiroga2807/magna-web`

## Deployment rápido (solo actualizar web)

```powershell
# 1. Build frontend page
cd magna-page/page && npm run build
# 2. Build + push Docker
docker build -t mquiroga2807/magna-web:latest .
Get-Content 'C:\Users\Janus\Documents\magna\docker hub token.txt' | Select-Object -Skip 1 | docker login -u mquiroga2807 --password-stdin
docker push mquiroga2807/magna-web:latest
# 3. Actualizar servidor
ssh -i ~/.ssh/magna.pem ubuntu@13.223.147.116 "sudo docker compose -f /opt/magna/docker-compose.yml pull web && sudo docker compose -f /opt/magna/docker-compose.yml up -d --no-deps web && sudo docker compose -f /opt/magna/docker-compose.yml exec -T web python manage.py migrate --no-input"
```

Skills provide specialized instructions and workflows for specific tasks.
Use the skill tool to load a skill when a task matches its description.
