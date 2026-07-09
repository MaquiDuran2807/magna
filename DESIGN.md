# DESIGN.md — Magna Ingeniería y Topografía

> Documento de diseño integral del sistema. Versión: Julio 2026

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Stack Tecnológico](#3-stack-tecnológico)
4. [Base de Datos](#4-base-de-datos)
5. [API Design](#5-api-design)
6. [Frontend Architecture](#6-frontend-architecture)
7. [UI/UX Design System](#7-uiux-design-system)
8. [Seguridad](#8-seguridad)
9. [Deploy & Infrastructure](#9-deploy--infrastructure)
10. [Patrones de Diseño](#10-patrones-de-diseño)
11. [Decisiones Técnicas](#11-decisiones-técnicas)
12. [Guías de Código](#12-guías-de-código)
13. [Checklist de Calidad](#13-checklist-de-calidad)

---

## 1. Resumen Ejecutivo

**Magna** es una plataforma web para una empresa de Ingeniería y Topografía que combina:

- **Sitio corporativo** (page): Portafolio de servicios, proyectos, blog, equipo, contacto
- **Tienda en línea** (store): E-commerce con carrito, checkout y pagos PayPal

### Stack General

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Django + DRF + SimpleJWT | 5.2 LTS |
| Frontend | React + TypeScript + Vite | 18 / 5.5 / 5.4 |
| Base de datos | SQLite (dev) / PostgreSQL (prod) | 16 |
| Contenedores | Docker + docker-compose | — |
| Proxy | nginx | — |
| Auth | JWT (Djoser + SimpleJWT) | — |
| Pago | PayPal | — |
| Deploy | AWS Lightsail + Terraform + Ansible | — |

### Principios de Diseño

1. **Separación de responsabilidades**: Backend sirve datos, frontend renderiza UI
2. **API-first**: Todo el contenido se consume vía REST API
3. **Progressive Enhancement**: Lazy loading, code splitting, optimización por defecto
4. **Mobile-first**: Imágenes con variantes (desktop/tablet/movil), responsive design
5. **Seguridad por defecto**: JWT, CORS configurado, variables de entorno

---

## 2. Arquitectura del Sistema

### 2.1 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTE                                         │
│  ┌──────────────────────┐          ┌──────────────────────┐                │
│  │   Page SPA (:5173)   │          │  Store SPA (:5174)   │                │
│  │   React + Vite       │          │  React + Vite        │                │
│  │   Bootstrap + Framer │          │  Bootstrap + PayPal  │                │
│  └──────────┬───────────┘          └──────────┬───────────┘                │
│             │                                 │                            │
│             └──────────────┬──────────────────┘                            │
│                            │ fetch() / axios                               │
└────────────────────────────┼────────────────────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────────────────┐
│                       nginx (:80/:443)                                       │
│  ┌─────────────────────────┴────────────────────────────────────┐           │
│  │  /static/  → WhiteNoise (archivos estáticos Django)          │           │
│  │  /media/   → Volume (imágenes subidas)                       │           │
│  │  /api/     → Proxy → gunicorn (:8000)                       │           │
│  │  /admin/   → Proxy → gunicorn (:8000)                       │           │
│  │  /auth/    → Proxy → gunicorn (:8000)                       │           │
│  │  /*        → SPA catch-all (page o store)                    │           │
│  └──────────────────────────────────────────────────────────────┘           │
└────────────────────────────┬────────────────────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────────────────┐
│                    gunicorn (:8000)                                          │
│  ┌─────────────────────────┴────────────────────────────────────┐           │
│  │                   Django 5.2 + DRF                           │           │
│  │                                                               │           │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │           │
│  │  │servicios │ │  blog    │ │proyectos │ │ products │       │           │
│  │  │  API     │ │  API     │ │  API     │ │  API     │       │           │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │           │
│  │       │            │            │            │               │           │
│  │  ┌────┴────────────┴────────────┴────────────┴────┐         │           │
│  │  │              Django ORM (Models)                │         │           │
│  │  └────────────────────┬───────────────────────────┘         │           │
│  └───────────────────────┼─────────────────────────────────────┘           │
│                          │                                                 │
│  ┌───────────────────────┴─────────────────────────────────────┐           │
│  │                    SQLite / PostgreSQL                       │           │
│  └─────────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Flujo de Datos

```
1. Usuario visita magnaingenieriaytopografia.com
   → DNS resuelve a IP Lightsail (13.223.147.116)
   → nginx recibe petición en puerto 443 (SSL/TLS)

2. nginx sirve archivos estáticos directamente (JS, CSS, imágenes)
   → Cache-Control: 1 año para assets con hash
   → Gzip/Brotli habilitado

3. Para rutas de API (/servicios/, /blog/, etc.)
   → nginx proxy a gunicorn:8000
   → Django procesa la petición
   → DRF serializa datos (JSON)
   → Respuesta HTTP 200 + JSON

4. Para rutas de SPA (/*)
   → nginx sirve index.html (catch-all)
   → React Router maneja la ruta client-side
   → Componente carga datos vía react-query + axios
```

### 2.3 Separación de Concerns

| Componente | Responsabilidad | NO hace |
|------------|----------------|---------|
| **nginx** | SSL termination, static files, proxy, caching | Procesar lógica de negocio |
| **gunicorn** | Application server, WSGI | Servir archivos estáticos |
| **Django** | ORM, business logic, auth, API | Renderizar HTML |
| **DRF** | Serialización, validación, paginación | Manejar estado UI |
| **React** | UI rendering, state management, routing | Acceder a DB |
| **SQLite/PG** | Persistencia de datos | Lógica de negocio |

---

## 3. Stack Tecnológico

### 3.1 Backend

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| Django | 5.2 LTS | Web framework |
| djangorestframework | 3.17 | REST API toolkit |
| djangorestframework-simplejwt | 5.5 | JWT authentication |
| djoser | 2.3 | User management (register, login, password reset) |
| django-cors-headers | 4.6 | CORS handling |
| django-environ | 0.12 | Environment variables |
| django-ckeditor-5 | — | Rich text editor for blog |
| Pillow | 11.1 | Image processing (resize, WebP conversion) |
| psycopg2-binary | 2.9 | PostgreSQL adapter |
| gunicorn | 23.0 | WSGI HTTP server |
| whitenoise | 6.9 | Static file serving |
| cryptography | 44.0 | Cryptographic operations |
| PyJWT | 2.10 | JSON Web Tokens |
| social-auth-app-django | 5.4 | Social OAuth authentication |

### 3.2 Frontend (Page - Sitio Corporativo)

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| react | 18.3 | UI framework |
| react-dom | 18.3 | DOM rendering |
| react-router-dom | 6.28 | Client-side routing |
| @tanstack/react-query | 5.62 | Server state management |
| axios | 1.7 | HTTP client |
| react-bootstrap | 2.10 | UI components |
| bootstrap | 5.3 | CSS framework |
| framer-motion | 11.15 | Animations |
| swiper | 11.2 | Carousels/sliders |
| react-icons | 5.4 | Icon library |
| lottie-react | 3.0 | JSON animations |
| leaflet + react-leaflet | 1.9 / 4.2 | Interactive maps |
| react-pdf | 9.2 | PDF viewer |
| @react-pdf/renderer | 3.4 | PDF generation |
| formik | 2.4 | Form management |
| yup | 1.6 | Schema validation |
| react-helmet-async | 3.0 | SEO (meta tags) |
| react-ga4 | 2.1 | Google Analytics |
| dompurify | 3.2 | XSS protection |
| react-toastify | 11.0 | Notifications |

### 3.3 Frontend (Store - E-commerce)

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| react | 18.3 | UI framework |
| react-router-dom | 6.28 | Client-side routing |
| @tanstack/react-query | 5.62 | Server state management |
| @paypal/react-paypal-js | 8.5 | PayPal integration |
| axios | 1.7 | HTTP client |
| react-bootstrap | 2.10 | UI components |
| bootstrap | 5.3 | CSS framework |
| swiper | 11.2 | Product carousels |
| react-icons | 5.4 | Icons |
| react-helmet-async | 2.0 | SEO |
| react-toastify | 11.0 | Notifications |

### 3.4 DevOps

| Herramienta | Propósito |
|-------------|-----------|
| Docker | Containerization |
| docker-compose | Multi-container orchestration |
| Terraform | Infrastructure as Code (AWS Lightsail) |
| Ansible | Server provisioning |
| nginx | Reverse proxy + static serving |
| certbot | SSL/TLS certificates (Let's Encrypt) |
| AWS Lightsail | Cloud hosting ($7/mes) |

---

## 4. Base de Datos

### 4.1 Diagrama Entidad-Relación

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        MAGNA DATABASE SCHEMA                             │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   USUARIO    │       │  SERVICIO    │       │  CARACTERÍSTICA│
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ email        │       │ titulo       │       │ servicio_id  │──→ Servicio
│ first_name   │       │ descripcion  │       │ titulo       │
│ last_name    │       │ imagen       │       │ descripcion  │
│ is_editor    │       │ imagen_tablet│       └──────────────┘
│ is_staff     │       │ imagen_celular│
│ is_active    │       │ activo       │       ┌──────────────┐
│ date_joined  │       │ created_at   │       │ SUBSERVICIO  │
└──────┬───────┘       └──────┬───────┘       ├──────────────┤
       │                      │               │ id (PK)      │
       │                      │               │ servicio_id  │──→ Servicio
       │                      │               │ titulo       │
       │                      │               │ descripcion  │
       │                      │               │ imagen       │
       │                      │               │ imagen_tablet│
       │                      │               │ imagen_celular│
       │                      │               └──────────────┘
       │                      │
       │                      │       ┌──────────────┐
       │                      │       │    SLIDE     │
       │                      │       ├──────────────┤
       │                      │       │ id (PK)      │
       │                      │       │ titulo       │
       │                      │       │ descripcion  │
       │                      │       │ imagen       │
       │                      │       │ activo       │
       │                      │       │ orden        │
       │                      │       └──────────────┘
       │                      │
       │                      │       ┌──────────────┐
       │                      │       │  BROCHURE    │
       │                      │       ├──────────────┤
       │                      │       │ id (PK)      │
       │                      │       │ nombre       │
       │                      │       │ archivo      │
       │                      │       └──────────────┘
       │                      │
       │       ┌──────────────┴──────────────────────────────┐
       │       │              BLOG                            │
       │       ├──────────────┬──────────────┬───────────────┤
       │       │  CATEGORÍA   │  BLOG_POST   │   COMENTARIO  │
       │       ├──────────────┼──────────────┼───────────────┤
       │       │ id (PK)      │ id (PK)      │ id (PK)       │
       │       │ nombre       │ titulo       │ post_id  ───→│
       │       └──────────────│ contenido    │ autor_id ───→ │ User
       │                      │ autor_id  ──→│ contenido     │
       │                      │ categoria_id→│ created_at    │
       │                      │ imagen       └───────────────┘
       │                      │ important
       │                      │ created_at
       │                      └──────────────┘
       │
       │       ┌──────────────┐
       │       │   CONTACTO   │
       │       ├──────────────┤
       │       │ id (PK)      │
       │       │ nombre       │
       │       │ email        │
       │       │ mensaje      │
       │       │ contestado   │
       │       │ fecha_respuesta│
       │       └──────────────┘
       │
       │       ┌──────────────┐
       │       │   EQUIPO     │       ┌──────────────┐
       │       ├──────────────┤       │ TECNOLOGÍA   │
       │       │ id (PK)      │       ├──────────────┤
       │       │ nombre       │       │ id (PK)      │
       │       │ cargo        │       │ equipo_id ──→│ Equipo
       │       │ imagen       │       │ nombre       │
       │       │ descripcion  │       │ imagen       │
       │       │ imagen_tablet│       └──────────────┘
       │       │ imagen_celular│
       │       └──────────────┘
       │
       │       ┌──────────────┐
       │       │   PREGUNTA   │
       │       ├──────────────┤
       │       │ id (PK)      │
       │       │ pregunta     │
       │       │ respuesta    │
       │       └──────────────┘
       │
       │       ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
       │       │  CLIENTE     │  │ TYPE_PROJECT │  │    PAÍS      │
       │       ├──────────────┤  ├──────────────┤  ├──────────────┤
       │       │ id (PK)      │  │ id (PK)      │  │ id (PK)      │
       │       │ nombre       │  │ nombre       │  │ nombre       │
       │       └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │              │                  │                  │
       │              │                  │           ┌──────┴───────┐
       │              │                  │           │ DEPARTAMENTO │
       │              │                  │           ├──────────────┤
       │              │                  │           │ id (PK)      │
       │              │                  │           │ nombre       │
       │              │                  │           │ pais_id  ──→ │ País
       │              │                  │           └──────┬───────┘
       │              │                  │                  │
       │              │                  │           ┌──────┴───────┐
       │              │                  │           │    CIUDAD    │
       │              │                  │           ├──────────────┤
       │              │                  │           │ id (PK)      │
       │              │                  │           │ nombre       │
       │              │                  │           │ depto_id  ─→ │ Departamento
       │              │                  │           └──────────────┘
       │              │                  │
       │              │         ┌────────┴─────────────────────────┐
       │              │         │           PROYECTO               │
       │              │         ├─────────────────────────────────┤
       │              │         │ id (PK)                          │
       └──────────────┼────────→│ cliente_id  ──→ Cliente         │
                      │         │ tipo_id  ──→ TypeProject        │
                      │         │ ciudad_id  ──→ Ciudad           │
                      │         │ equipo_lider_id  ──→ Equipo     │
                      │         │ titulo                           │
                      │         │ descripcion                      │
                      │         │ imagen                           │
                      │         │ estado (choices)                 │
                      │         │ created_at                       │
                      │         └────────────────┬────────────────┘
                      │                          │
                      │         ┌─────────────────┼────────────────┐
                      │         │                 │                │
                      │  ┌──────┴───────┐  ┌──────┴───────┐  ┌───┴────────┐
                      │  │PROYECTO_EQUIPO│ │PROYECTO_SERVICIO│ │PROYECTO_SUBSERVICIO│
                      │  │(M2M)         │ │(M2M)            │ │(M2M)               │
                      │  ├──────────────┤ ├─────────────────┤ ├────────────────────┤
                      │  │ proyecto_id  │ │ proyecto_id     │ │ proyecto_id        │
                      │  │ equipo_id    │ │ servicio_id     │ │ subservicio_id     │
                      │  └──────────────┘ └─────────────────┘ └────────────────────┘
                      │
                      │         ┌──────────────────┐
                      │         │  PRODUCTO (Store) │
                      │         ├──────────────────┤
                      │         │ id (PK)          │
                      │         │ nombre           │
                      │         │ slug             │
                      │         │ precio           │
                      │         │ stock            │
                      │         │ rating           │
                      │         │ imagen           │
                      │         │ categoria_id ──→ │ Category
                      │         └──────────────────┘
                      │
                      │         ┌──────────────────┐
                      │         │   PROMOCIONES    │
                      │         ├──────────────────┤
                      │         │ id (PK)          │
                      │         │ descuento (%)    │
                      │         │ activo           │
                      │         │ productos (M2M)──→ Product
                      │         └──────────────────┘
```

### 4.2 Modelos Principales

#### `user.User` — Modelo de autenticación personalizado

```python
class User(AbstractUser):
    username = None  # Email-based auth
    email = models.EmailField(unique=True)
    is_editor = models.BooleanField(default=False)  # Permisos de edición blog

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
```

**Justificación**: Se elimina `username` para usar email como identificador único. Más intuitivo para el usuario final.

#### `servicios.Servicio` — Núcleo del sitio

```python
class Servicio(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='servicios/')
    imagen_tablet = models.ImageField(upload_to='servicios/tablet/', blank=True)
    imagen_celular = models.ImageField(upload_to='servicios/celular/', blank=True)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

**Variantes de imagen**: Se generan automáticamente via `management command` para responsive design. Cada imagen tiene 3 versiones: desktop, tablet, móvil.

#### `proyectos.Proyecto` — Portfolio de proyectos

```python
class Proyecto(models.Model):
    ESTADO_CHOICES = [
        ('en_curso', 'En Curso'),
        ('completado', 'Completado'),
        ('pausado', 'Pausado'),
    ]

    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    cliente = models.ForeignKey('Client')
    tipo = models.ForeignKey('TypeProject')
    ciudad = models.ForeignKey('Ciudad')
    equipo_lider = models.ForeignKey('Equipo')
    servicios = models.ManyToManyField('servicios.Servicio')
    subservicios = models.ManyToManyField('servicios.SubServicio')
    equipo = models.ManyToManyField('Equipo')
    estado = models.CharField(choices=ESTADO_CHOICES)
```

**Relaciones M2M**: Un proyecto puede involucrar múltiples servicios, subservicios y miembros del equipo.

#### `products.Product` — E-commerce

```python
class Product(models.Model):
    nombre = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    categoria = models.ForeignKey('Category')
```

### 4.3 Índices y Optimización

| Tabla | Índice | Propósito |
|-------|--------|-----------|
| `blog_BlogPost` | `idx_post_titulo` (titulo) | Búsqueda por título |
| `blog_BlogPost` | `idx_post_created` (-created_at) | Posts recientes |
| `products_Product` | `idx_product_slug` (slug) | Lookup por slug |
| `products_Product` | `idx_product_categoria` (categoria_id) | Filtrado por categoría |
| `proyectos_Proyecto` | `idx_proyecto_estado` (estado) | Filtrado por estado |
| `servicios_Servicio` | `idx_servicio_activo` (activo) | Solo servicios activos |

### 4.4 Migraciones

```bash
# Crear migración después de cambiar modelos
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Verificar estado
python manage.py showmigrations
```

---

## 5. API Design

### 5.1 Convenciones

- **Base URL**: `/api/` (proxy desde nginx)
- **Formato**: JSON (application/json)
- **Autenticación**: JWT en header `Authorization: JWT <token>`
- **Paginación**: DRF PageNumberPagination (5-8 items/página)
- **CORS**: Configurado para dominios de desarrollo y producción

### 5.2 Endpoints Completos

#### Servicios (`/servicios/`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/servicios/servicio/` | Listar todos los servicios | No |
| `GET` | `/servicios/servicio/<pk>/` | Detalle de servicio + subservicios | No |
| `GET` | `/servicios/servicios-id/` | IDs y nombres (ligero) | No |
| `GET` | `/servicios/servicios-and-subservicios/` | Servicios con subservicios prefetch | No |
| `GET` | `/servicios/slides/` | Slides + servicios combinados (hero slider) | No |
| `GET` | `/servicios/brochure/` | Brochures descargables | No |

**Serializers**:
- `ServicioSerializer` → Nested `subservicios[]` + `caracteristicas[]`
- `SlideSerializer` → `tipo='slide'`, ordenado por `orden`
- `ServicioSlideSerializer` → `tipo='servicio'`, `orden=obj.id`

#### Blog (`/blog/`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/blog/` | Lista paginada (5/página) | No |
| `GET` | `/blog/<id>/` | Detalle + comentarios | No |
| `GET` | `/blog/recent/` | 10 posts importantes (sidebar) | No |
| `GET` | `/blog/search/<search>/` | Búsqueda por título (icontains) | No |

**Serializers**:
- `BlogPostSerializer` → Nested `comments[]`, `category`, `author`
- `AllBlogPostSerializer` → Lista sin comentarios
- `ImportantBlogPostSerializer` → Sidebar (ligero)

#### Contacto (`/contact/`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/contact/` | Enviar mensaje + email notificación | No |

#### Equipos (`/equipos/`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/equipos/` | `{equipos: [], tecnologias: []}` | No |

#### Preguntas Frecuentes (`/frequentQuestions/`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/frequentQuestions/` | Lista de FAQs | No |

#### Productos (`/products/`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/products/` | Listar productos | No |
| `GET` | `/products/<pk>/` | Detalle producto | No |
| `GET` | `/products/slug/<slug>/` | Lookup por slug | No |
| `GET` | `/products/category/` | Categorías | No |
| `GET` | `/products/category/<pk>/` | Productos por categoría | No |
| `GET` | `/products/promos/` | Promociones activas | No |
| `GET` | `/products/search/<name>/` | Búsqueda por nombre | No |

#### Proyectos (`/proyectos/`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/proyectos/` | Lista paginada (8/página) | No |
| `GET` | `/proyectos/images/` | Todas las imágenes de proyectos | No |

#### Autenticación (`/auth/`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/jwt/create/` | Login (email + password) → JWT | No |
| `POST` | `/auth/jwt/refresh/` | Renovar access token | No |
| `POST` | `/auth/jwt/logout/` | Logout (blacklist token) | Sí |
| `POST` | `/auth/users/` | Registro de usuario | No |
| `POST` | `/auth/users/reset_password/` | Solicitar reset password | No |
| `POST` | `/auth/users/reset_password_confirm/` | Confirmar reset | No |
| `GET` | `/user/` | Usuario actual | Sí |

### 5.3 Respuestas Estándar

#### Éxito (200)

```json
{
  "id": 1,
  "titulo": "Topografía",
  "descripcion": "Servicio de topografía...",
  "subservicios": [
    { "id": 1, "titulo": "Levantamiento Topográfico" }
  ]
}
```

#### Lista paginada (200)

```json
{
  "count": 25,
  "next": "http://api/blog/?page=2",
  "previous": null,
  "results": [
    { "id": 1, "titulo": "Post 1" },
    { "id": 2, "titulo": "Post 2" }
  ]
}
```

#### Error (400/401/404/500)

```json
{
  "detail": "No se encontró el recurso solicitado."
}
```

### 5.4 Estrategia de Caché

| Endpoint | TTL | Estrategia |
|----------|-----|------------|
| `/servicios/servicio/` | 1 hora | `@cache_page(3600)` |
| `/servicios/slides/` | 30 min | `@cache_page(1800)` |
| `/blog/` | 5 min | `@cache_page(300)` |
| `/blog/recent/` | 15 min | `@cache_page(900)` |
| `/products/` | 10 min | `@cache_page(600)` |
| `/proyectos/` | 15 min | `@cache_page(900)` |
| `/frequentQuestions/` | 1 hora | `@cache_page(3600)` |

---

## 6. Frontend Architecture

### 6.1 Estructura de Directorios

```
magna-page/
├── page/                          # Sitio corporativo
│   ├── src/
│   │   ├── App.tsx                # Homepage (single-page layout)
│   │   ├── main.tsx               # Entry point + router
│   │   ├── apiClient.tsx          # Axios instance configurada
│   │   ├── api/                   # API functions
│   │   ├── animations/            # Lottie animations (JSON)
│   │   ├── assets/                # Imágenes estáticas
│   │   ├── auth/                  # Auth context + hooks
│   │   ├── components/
│   │   │   ├── sections/          # Secciones del homepage
│   │   │   │   ├── Servicios.tsx
│   │   │   │   ├── proyectos.tsx
│   │   │   │   ├── clients.tsx
│   │   │   │   ├── contact.tsx
│   │   │   │   ├── statistics.tsx
│   │   │   │   └── Equipos.tsx
│   │   │   ├── navBar.tsx
│   │   │   ├── footer1.tsx
│   │   │   ├── slider.tsx
│   │   │   └── ... (26 componentes)
│   │   ├── hooks/
│   │   │   ├── getInfoPage.tsx     # useGetServices, useGetSlides
│   │   │   ├── ScreenSize.tsx
│   │   │   └── useLazyload.tsx
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── aboutUs.tsx
│   │   │   ├── blog.tsx
│   │   │   ├── blogDetail.tsx
│   │   │   ├── contact.tsx
│   │   │   ├── cotizador.tsx
│   │   │   ├── login.tsx
│   │   │   ├── projects.tsx
│   │   │   ├── projecsDetail.tsx
│   │   │   └── servecesDetail.tsx
│   │   ├── routes/
│   │   ├── sitemap/
│   │   ├── types/
│   │   └── fonts/
│   ├── public/
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── store/                         # E-commerce
    ├── src/
    │   ├── App.tsx                # Layout principal
    │   ├── main.tsx               # Entry point + router
    │   ├── apiClient.tsx
    │   ├── api/
    │   ├── components/
    │   │   ├── CheckoutSteps.tsx
    │   │   ├── ProductItem.tsx
    │   │   ├── Rating.tsx
    │   │   ├── SearchBox.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   └── ... (12 componentes)
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── ProductPage.tsx
    │   │   ├── CartPage.tsx
    │   │   ├── SigninPage.tsx
    │   │   ├── SignupPage.tsx
    │   │   ├── ShippingAddressPage.tsx
    │   │   ├── PaymentMethodPage.tsx
    │   │   ├── PlaceOrderPage.tsx
    │   │   ├── OrderPage.tsx
    │   │   ├── OrderHistoryPage.tsx
    │   │   ├── ProfilePage.tsx
    │   │   └── searchPage.tsx
    │   ├── StoreProvider.tsx      # Store context (carrito, auth)
    │   ├── hooks/
    │   ├── types/
    │   └── utils/
    ├── vite.config.ts
    ├── tsconfig.json
    └── package.json
```

### 6.2 Patrón de Componentes

#### Componentes de Presentación (Page)

```tsx
// components/sections/Servicios.tsx
// Componente puro — recibe datos, renderiza UI
interface ServicioProps {
  servicios: Servicio[];
}

export const Servicios: React.FC<ServicioProps> = ({ servicios }) => {
  return (
    <section className="servicios-section">
      {servicios.map(servicio => (
        <ServicioCard key={servicio.id} servicio={servicio} />
      ))}
    </section>
  );
};
```

#### Componentes de Contenedor (Page)

```tsx
// hooks/getInfoPage.tsx
// Hook que maneja data fetching + loading states
export const useGetServices = () => {
  return useQuery({
    queryKey: ['servicios'],
    queryFn: () => axios.get('/servicios/servicio/').then(r => r.data),
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};
```

#### Componentes de Página (Page)

```tsx
// pages/projects.tsx
// Página completa — combina hooks + componentes
const Projects = () => {
  const { data: proyectos, isLoading } = useGetProjects();

  if (isLoading) return <Spinner />;

  return (
    <Layout>
      <HeroSection />
      <ProjectsGrid proyectos={proyectos} />
      <ContactSection />
    </Layout>
  );
};
```

### 6.3 Gestión de Estado

#### Page (Sitio Corporativo)

```
┌─────────────────────────────────────────────────────────┐
│                    ESTADO GLOBAL                         │
├─────────────────────────────────────────────────────────┤
│  react-query (Server State)                             │
│  ├── servicios cache (1h TTL)                          │
│  ├── blog cache (5min TTL)                             │
│  ├── proyectos cache (15min TTL)                       │
│  └── slides cache (30min TTL)                          │
│                                                         │
│  AuthContext (Client State)                             │
│  ├── user: { id, email, isEditor }                     │
│  ├── token: JWT string                                 │
│  └── isAuthenticated: boolean                          │
│                                                         │
│  UI State (Local)                                      │
│  ├── Navbar open/close                                 │
│  ├── Active section (scroll spy)                       │
│  └── Modal states                                      │
└─────────────────────────────────────────────────────────┘
```

#### Store (E-commerce)

```
┌─────────────────────────────────────────────────────────┐
│                    ESTADO GLOBAL                         │
├─────────────────────────────────────────────────────────┤
│  react-query (Server State)                             │
│  ├── products cache                                    │
│  ├── categories cache                                  │
│  ├── orders cache (user-specific)                      │
│  └── promos cache                                      │
│                                                         │
│  StoreProvider (Client State)                           │
│  ├── cart: CartItem[]                                  │
│  ├── user: { id, email, name }                         │
│  ├── shippingAddress: Address                          │
│  ├── paymentMethod: 'PayPal' | 'MercadoPago'          │
│  └── darkMode: boolean                                 │
│                                                         │
│  PayPalScriptProvider                                  │
│  └── PayPal SDK loaded state                           │
└─────────────────────────────────────────────────────────┘
```

### 6.4 Routing

#### Page Routes

```tsx
const router = createBrowserRouter([
  { path: '/',                    element: <App /> },
  { path: '/login',               element: <LazyLogin /> },
  { path: '/aboutUs',             element: <LazyAboutUs /> },
  { path: '/servicios',           element: <LazyServecesDetail /> },
  { path: '/servicios/:id',       element: <LazyServecesDetail /> },
  { path: '/projects',            element: <LazyProjects /> },
  { path: '/projects/:projectArg',element: <LazyProjectDetail /> },
  { path: '/contact',             element: <LazyContactPage /> },
  { path: '/blog',                element: <LazyBlog /> },
  { path: '/blog/:id',            element: <LazyBlogDetail /> },
  { path: '/cotizador',           element: <ProtectedRoute><LazyCotizador /></ProtectedRoute> },
]);
```

**Lazy Loading**: Todas las rutas excepto `/` usan `React.lazy()` para code splitting.

#### Store Routes

```tsx
<Route path="/store/" element={<App />}>
  <Route index element={<HomePage />} />
  <Route path="product/:slug" element={<ProductPage />} />
  <Route path="cart" element={<CartPage />} />
  <Route path="signin" element={<SigninPage />} />
  <Route path="signup" element={<SignupPage />} />
  <Route path="search/:categoria" element={<SearchPage />} />
  <Route element={<ProtectedRoute />}>
    <Route path="shipping" element={<ShippingAddressPage />} />
    <Route path="payment" element={<PaymentMethodPage />} />
    <Route path="placeorder" element={<PlaceOrderPage />} />
    <Route path="order/:id" element={<OrderPage />} />
    <Route path="orderhistory" element={<OrderHistoryPage />} />
    <Route path="profile" element={<ProfilePage />} />
  </Route>
</Route>
```

### 6.5 Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      DATA FLOW (Page)                                    │
│                                                                          │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐  │
│  │ Component │───→│  useQuery()  │───→│   axios      │───→│  Django  │  │
│  │ (React)   │    │ (react-query)│    │  (HTTP)      │    │  (API)   │  │
│  └─────┬─────┘    └──────────────┘    └──────────────┘    └────┬─────┘  │
│        │                                                        │        │
│        │              ┌──────────────┐                          │        │
│        └─────────────→│   render     │←─────────────────────────┘        │
│                       │   (JSON)     │                                   │
│                       └──────────────┘                                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      DATA FLOW (Store)                                   │
│                                                                          │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐  │
│  │ Component │───→│  useQuery()  │───→│   axios      │───→│  Django  │  │
│  │ (React)   │    │ (react-query)│    │  (HTTP)      │    │  (API)   │  │
│  └─────┬─────┘    └──────────────┘    └──────────────┘    └────┬─────┘  │
│        │                                                        │        │
│        │  ┌──────────────┐         ┌──────────────┐            │        │
│        └─→│ StoreProvider│────────→│   localStorage│           │        │
│           │ (cart, auth) │         │  (persist)    │           │        │
│           └──────────────┘         └──────────────┘            │        │
│                                                                │        │
│        ┌──────────────┐                                        │        │
│        │   PayPal     │←───────────────────────────────────────┘        │
│        │   SDK        │                                                 │
│        └──────────────┘                                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. UI/UX Design System

### 7.1 Paleta de Colores

```css
:root {
  /* Primary — Azul corporativo (Ingeniería) */
  --color-primary:        #1a365d;  /* Azul oscuro — header, footer */
  --color-primary-light:  #2c5282;  /* Azul medio — hover states */
  --color-primary-dark:   #0f2440;  /* Azul más oscuro — fondos */

  /* Secondary — Dorado/Dorado (confianza, profesionalismo) */
  --color-secondary:      #d69e2e;  /* Dorado — acentos, CTA */
  --color-secondary-light:#ecc94b;  /* Dorado claro — hover */
  --color-secondary-dark: #b7791f;  /* Dorado oscuro — active */

  /* Neutral */
  --color-white:          #ffffff;
  --color-gray-50:        #f7fafc;
  --color-gray-100:       #edf2f7;
  --color-gray-200:       #e2e8f0;
  --color-gray-300:       #cbd5e0;
  --color-gray-400:       #a0aec0;
  --color-gray-500:       #718096;
  --color-gray-600:       #4a5568;
  --color-gray-700:       #2d3748;
  --color-gray-800:       #1a202c;
  --color-gray-900:       #171923;

  /* Semantic */
  --color-success:        #38a169;
  --color-warning:        #d69e2e;
  --color-error:          #e53e3e;
  --color-info:           #3182ce;
}
```

### 7.2 Tipografía

```css
:root {
  /* Fuentes */
  --font-primary:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-heading:    'Poppins', var(--font-primary);
  --font-mono:       'JetBrains Mono', 'Fira Code', monospace;

  /* Escala */
  --text-xs:    0.75rem;   /* 12px */
  --text-sm:    0.875rem;  /* 14px */
  --text-base:  1rem;      /* 16px */
  --text-lg:    1.125rem;  /* 18px */
  --text-xl:    1.25rem;   /* 20px */
  --text-2xl:   1.5rem;    /* 24px */
  --text-3xl:   1.875rem;  /* 30px */
  --text-4xl:   2.25rem;   /* 36px */
  --text-5xl:   3rem;      /* 48px */

  /* Pesos */
  --font-light:     300;
  --font-regular:   400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
}
```

### 7.3 Espaciado

```css
:root {
  --space-1:   0.25rem;  /* 4px */
  --space-2:   0.5rem;   /* 8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-10:  2.5rem;   /* 40px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
}
```

### 7.4 Breakpoints

```css
:root {
  --breakpoint-sm:  576px;   /* Mobile landscape */
  --breakpoint-md:  768px;   /* Tablet */
  --breakpoint-lg:  992px;   /* Desktop */
  --breakpoint-xl:  1200px;  /* Large desktop */
  --breakpoint-xxl: 1400px;  /* Extra large */
}
```

### 7.5 Sombras

```css
:root {
  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md:  0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.15);
}
```

### 7.6 Bordes

```css
:root {
  --radius-sm:   0.25rem;  /* 4px */
  --radius-md:   0.375rem; /* 6px */
  --radius-lg:   0.5rem;   /* 8px */
  --radius-xl:   0.75rem;  /* 12px */
  --radius-full: 9999px;   /* Circle */
}
```

### 7.7 Componentes UI

#### Botones

```css
.btn-primary {
  background-color: var(--color-secondary);
  color: var(--color-white);
  font-weight: var(--font-semibold);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--color-secondary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

#### Cards

```css
.card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

#### Navbar

```css
.navbar {
  background-color: var(--color-primary);
  padding: var(--space-4) var(--space-8);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-brand {
  font-family: var(--font-heading);
  font-weight: var(--font-bold);
  color: var(--color-white);
}
```

### 7.8 Iconografía

**Librería**: react-icons v5

**Patrón de importación optimizado** (tree-shaking):

```tsx
// ❌ MAL — carga toda la familia FontAwesome (~3MB)
import { FaHome } from 'react-icons/fa';

// ✅ BIEN — carga solo el icono específico (~1KB)
import { FaHome } from 'react-icons/fa/FaHome';
```

**Paleta de iconos**:
- `react-icons/fi` — Feather Icons (outline, minimalista)
- `react-icons/fa` — FontAwesome (relleno, profesional)
- `react-icons/md` — Material Design (variado)

### 7.9 Animaciones

**Librería**: framer-motion v11

```tsx
// Patrón básico de animación
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {children}
</motion.div>

// Animación al hacer scroll (Intersection Observer)
const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<motion.div
  ref={ref}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
>
  {children}
</motion.div>
```

### 7.10 Responsive Design

**Estrategia**: Mobile-first con breakpoints progresivos

```css
/* Mobile first */
.section {
  padding: var(--space-8) var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .section {
    padding: var(--space-12) var(--space-8);
  }
}

/* Desktop */
@media (min-width: 992px) {
  .section {
    padding: var(--space-16) var(--space-12);
  }
}
```

**Imágenes responsive**: Cada imagen tiene 3 variantes generadas automáticamente:
- Desktop: imagen original
- Tablet: `imagen_tablet` (768px max-width)
- Móvil: `imagen_celular` (576px max-width)

---

## 8. Seguridad

### 8.1 Autenticación

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     FLUJO JWT (Djoser + SimpleJWT)                      │
│                                                                          │
│  1. Registro:                                                           │
│     POST /auth/users/                                                   │
│     { email, password, first_name, last_name }                          │
│     → 201 Created                                                       │
│                                                                          │
│  2. Login:                                                              │
│     POST /auth/jwt/create/                                              │
│     { email, password }                                                 │
│     → 200 OK                                                            │
│     { access: "eyJ...", refresh: "eyJ..." }                            │
│                                                                          │
│  3. Request autenticado:                                                │
│     GET /user/                                                          │
│     Header: Authorization: JWT eyJ...                                   │
│     → 200 OK { id, email, first_name, last_name, is_editor }          │
│                                                                          │
│  4. Refresh token:                                                      │
│     POST /auth/jwt/refresh/                                             │
│     { refresh: "eyJ..." }                                               │
│     → 200 OK { access: "eyJ..." }                                      │
│                                                                          │
│  5. Logout:                                                             │
│     POST /auth/jwt/logout/                                              │
│     Header: Authorization: JWT eyJ...                                   │
│     → 204 No Content (token blacklist)                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Configuración JWT**:

```python
SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(days=20),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}
```

### 8.2 Variables de Entorno

```bash
# .env.example (commiteado)
DJANGO_ENV=production
SECRET_KEY=<generar con python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())">
DB_NAME=magna
DB_USER=magna
DB_PASSWORD=<password seguro>
DB_HOST=localhost
DB_PORT=5432
DOMAIN=magnaingenieriaytopografia.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=tu@email.com
EMAIL_HOST_PASSWORD=<app password>
```

### 8.3 Medidas de Seguridad

| Medida | Implementación | Archivo |
|--------|---------------|---------|
| **HTTPS** | nginx SSL termination + HSTS | `nginx/nginx.conf` |
| **CORS** | django-cors-headers whitelist | `settings/base.py` |
| **CSRF** | Django middleware (habilitado) | `settings/base.py` |
| **XSS** | DOMPurify en frontend | `page/src/utils/` |
| **SQL Injection** | Django ORM (parameterized queries) | Automático |
| **Secret Key** | Variable de entorno (no hardcodeada) | `settings/base.py` |
| **Password Hashing** | PBKDF2 (Django default) | Automático |
| **Rate Limiting** | nginx `limit_req_zone` | `nginx/nginx.conf` |

### 8.4 Permisos

```python
# Permisos por defecto (DRF)
DEFAULT_PERMISSION_CLASSES = [
    'rest_framework.permissions.AllowAny',  # Lectura pública
]

# Permisos específicos
class BlogPostCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated, IsEditor]  # Solo editores

class ContactoApiView(CreateAPIView):
    permission_classes = [AllowAny]  # Formulario público
```

### 8.5 Validación de Entrada

```python
# Serializers — validación automática
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'nombre', 'precio', 'stock']

    def validate_precio(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("El stock no puede ser negativo")
        return value
```

---

## 9. Deploy & Infrastructure

### 9.1 Arquitectura de Deploy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AWS LIGHTSAIL ($7/mes)                                 │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    INSTANCIA (Ubuntu 22.04)                       │   │
│  │                                                                   │   │
│  │  ┌──────────────────────────────────────────────────────────┐    │   │
│  │  │                    Docker Compose                         │    │   │
│  │  │                                                           │    │   │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │    │   │
│  │  │  │  nginx   │  │  web     │  │   db     │              │    │   │
│  │  │  │  :80/:443│  │  :8000   │  │  :5432   │              │    │   │
│  │  │  └────┬─────┘  └────┬─────┘  └────┬─────┘              │    │   │
│  │  │       │              │              │                     │    │   │
│  │  │       │         gunicorn        PostgreSQL                │    │   │
│  │  │       │         3 workers       16-alpine                 │    │   │
│  │  │       │              │              │                     │    │   │
│  │  │       └──────────────┴──────────────┘                     │    │   │
│  │  │                                                           │    │   │
│  │  │  Volumes:                                                │    │   │
│  │  │  ├── postgres_data (persistente)                         │    │   │
│  │  │  ├── static_volume (collectstatic)                       │    │   │
│  │  │  ├── media_volume (imágenes subidas)                     │    │   │
│  │  │  └── ssl (certificados Let's Encrypt)                    │    │   │
│  │  └──────────────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    SERVICIOS AWS                                  │   │
│  │  ├── Lightsail Instance (2 vCPU, 2GB RAM)                       │   │
│  │  ├── IP estática (13.223.147.116)                                │   │
│  │  ├── Firewall (22, 80, 443)                                     │   │
│  │  ├── Snapshots (backup automático)                              │   │
│  │  └── DNS (magnaingenieriaytopografia.com)                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Docker Compose

```yaml
# docker-compose.yml (desarrollo local)
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    env_file: .env
    restart: unless-stopped

  web:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    env_file: .env
    depends_on:
      - db
    restart: unless-stopped

  nginx:
    build:
      context: ./nginx
    volumes:
      - static_volume:/static
      - media_volume:/media
      - ./nginx/ssl:/etc/letsencrypt
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - web
    restart: unless-stopped

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

### 9.3 Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Código fuente
COPY . .

# Archivos estáticos
RUN python manage.py collectstatic --no-input

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "magna_web.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
```

### 9.4 nginx Configuration

```nginx
upstream web {
    server web:8000;
}

server {
    listen 80;
    server_name magnaingenieriaytopografia.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name magnaingenieriaytopografia.com;

    ssl_certificate /etc/letsencrypt/live/magnaingenieriaytopografia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/magnaingenieriaytopografia.com/privkey.pem;

    # Seguridad
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;

    # Gzip
    gzip on;
    gzip_types text/plain application/json application/javascript text/css;

    # Static files (WhiteNoise)
    location /static/ {
        alias /app/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Media files
    location /media/ {
        alias /app/media/;
        expires 30d;
        add_header Cache-Control "public";
    }

    # API proxy
    location /api/ {
        proxy_pass http://web;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin
    location /admin/ {
        proxy_pass http://web;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Auth
    location /auth/ {
        proxy_pass http://web;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # SPA catch-all
    location / {
        root /app/magna-page/page/dist;
        try_files $uri $uri/ /index.html;
    }

    # Store
    location /store/ {
        alias /app/magna-page/store/dist/;
        try_files $uri $uri/ /store/index.html;
    }
}
```

### 9.5 Flujo de Deploy

```
1. Push a GitHub
   git push origin main

2. SSH al servidor
   ssh -i ~/.ssh/magna.pem ubuntu@13.223.147.116

3. Pull y rebuild
   cd /opt/magna
   git pull
   docker compose build
   docker compose up -d

4. Verificar
   docker compose logs -f
   curl -I https://magnaingenieriaytopografia.com
```

### 9.6 Backup Strategy

```bash
# Backup PostgreSQL (cron diario 3 AM)
docker exec magna-db-1 pg_dump -U magna magna > /backups/magna_$(date +%Y%m%d).sql

# Backup imágenes (rsync semanal)
rsync -avz /opt/magna/media/ /backups/media/

# Rotación: eliminar backups de más de 30 días
find /backups -name "*.sql" -mtime +30 -delete
```

---

## 10. Patrones de Diseño

### 10.1 Backend Patterns

#### Repository Pattern (via DRF Serializers)

```python
# Serializers actúan como capa de transformación
class ServicioSerializer(serializers.ModelSerializer):
    subservicios = SubServicioSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta:
        model = Servicio
        fields = ['id', 'titulo', 'descripcion', 'subservicios', 'caracteristicas']
```

#### Service Layer (via Views)

```python
# Views manejan lógica de negocio
class ServicioApiView(RetrieveAPIView):
    queryset = Servicio.objects.filter(activo=True)
    serializer_class = ServicioSerializer

    def get_queryset(self):
        return super().get_queryset().prefetch_related(
            'subservicios', 'caracteristicas'
        )
```

#### Serializer Pattern (Nested Data)

```python
# Datos anidados para respuesta rica
class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    author = UserInforSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'titulo', 'contenido', 'imagen', 'comments', 'category', 'author']
```

### 10.2 Frontend Patterns

#### Custom Hooks Pattern

```tsx
// hooks/useGetServices.tsx
export const useGetServices = () => {
  return useQuery({
    queryKey: ['servicios'],
    queryFn: async () => {
      const { data } = await apiClient.get('/servicios/servicio/');
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
};
```

#### Protected Route Pattern

```tsx
// components/ProtectedRoute.tsx
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
```

#### Lazy Loading Pattern

```tsx
// main.tsx
const LazyBlog = React.lazy(() => import('./pages/blog'));
const LazyProjects = React.lazy(() => import('./pages/projects'));

// En el router
<Suspense fallback={<Spinner />}>
  <LazyBlog />
</Suspense>
```

#### API Client Pattern

```tsx
// apiClient.tsx
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

// Interceptor para manejar errores 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Intentar refresh token
      const refreshed = await refreshToken();
      if (refreshed) {
        return apiClient.request(error.config);
      }
      // Redirigir a login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 10.3 State Management Patterns

#### Server State (react-query)

```tsx
// Patrón: datos del servidor siempre vía useQuery
const { data, isLoading, error } = useQuery({
  queryKey: ['products', categoryId],
  queryFn: () => fetchProducts(categoryId),
  enabled: !!categoryId,  // Solo ejecutar si hay categoryId
});
```

#### Client State (Context + useReducer)

```tsx
// StoreProvider.tsx — Estado del carrito
const StoreContext = createContext<StoreState | null>(null);

const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
};
```

---

## 11. Decisiones Técnicas

### 11.1 ¿Por qué Django + DRF?

| Criterio | Django + DRF | Alternativas |
|----------|-------------|--------------|
| **Rapidez de desarrollo** | Alto (baterías incluidas) | Flask (más flexible pero más lento) |
| **ORM** | Excelente (migraciones, queries) | SQLAlchemy (más potente pero más complejo) |
| **Admin** | Incluido gratis | Ninguna alternativa equivalente |
| **Serializers** | DRF (validación automática) | Marshmallow (similar) |
| **Comunidad** | Muy grande | — |
| **Learning curve** | Baja-Media | — |

### 11.2 ¿Por qué React + Vite?

| Criterio | React + Vite | Alternativas |
|----------|-------------|--------------|
| **Performance** | Vite: HMR instantáneo | CRA (deprecado) |
| **Ecosistema** | El más grande | Vue (similar, menor ecosistema) |
| **TypeScript** | Soporte nativo | — |
| **Build** | Vite: 10x más rápido que Webpack | — |
| **Code splitting** | React.lazy() nativo | — |

### 11.3 ¿Por qué react-query?

| Criterio | react-query | Alternativas |
|----------|------------|--------------|
| **Caché** | Automático con staleTime | SWR (similar pero menos features) |
| **Loading states** | `isLoading`, `isError` | useState + useEffect (manual) |
| **Revalidación** | Automática al refocus | — |
| **DevTools** | Excelente | — |

### 11.4 ¿Por qué SQLite en dev + PostgreSQL en prod?

| Aspecto | SQLite | PostgreSQL |
|---------|--------|------------|
| **Setup** | Zero config | Requiere instalación |
| **Portability** | Archivo único | Servicio separado |
| **Concurrencia** | Limitada | Completa |
| **Funciones** | Básicas | Avanzadas (JSON, arrays, FTS) |
| **Producción** | No recomendado | Estándar |

### 11.5 ¿Por qué dos SPAs separados?

**Decisión**: Mantener page y store como proyectos separados.

**Justificación**:
- **Independencia**: El store puede actualizarse sin afectar al sitio principal
- **Riesgo**: El e-commerce tiene más riesgo de breaking (PayPal, carrito)
- **Build**: Builds separados = más rápidos y más pequeños
- **Deployment**: Deploy independiente si es necesario

**Trade-off**: Dependencias duplicadas (~50KB más en node_modules, irrelevante en producción).

### 11.6 ¿Por qué Docker?

| Aspecto | Sin Docker | Con Docker |
|---------|-----------|-----------|
| **Reproducibilidad** | "Works on my machine" | Mismo entorno siempre |
| **Onboarding** | Setup manual de DB, nginx, etc. | `docker compose up` |
| **Deploy** | Manual, error-prone | `docker compose up -d` |
| **Rollback** | Difícil | `docker compose down && up -d` con imagen anterior |
| **Escalabilidad** | Limitada | Fácil agregar workers |

---

## 12. Guías de Código

### 12.1 Python (Django)

```python
# ✅ BIEN — Nombres descriptivos, español consistente
class Servicio(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.titulo

# ❌ MAL — Nombres genéricos, inglés inconsistente
class Model1(models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField()
```

### 12.2 TypeScript (React)

```tsx
// ✅ BIEN — Componentes con tipos explícitos
interface ServicioCardProps {
  servicio: Servicio;
  onSelect?: (id: number) => void;
}

export const ServicioCard: React.FC<ServicioCardProps> = ({ servicio, onSelect }) => {
  return (
    <Card onClick={() => onSelect?.(servicio.id)}>
      <Card.Img src={servicio.imagen} alt={servicio.titulo} />
      <Card.Body>
        <Card.Title>{servicio.titulo}</Card.Title>
      </Card.Body>
    </Card>
  );
};

// ❌ MAL — Sin tipos, props genéricas
export const Card = (props) => {
  return <div>{props.data.title}</div>;
};
```

### 12.3 CSS

```css
/* ✅ BIEN — Variables CSS, naming BEM */
.servicio-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
}

.servicio-card__title {
  font-family: var(--font-heading);
  font-weight: var(--font-semibold);
}

.servicio-card:hover {
  transform: translateY(-4px);
}

/* ❌ MAL — Valores hardcodeados, sin naming */
.card {
  background: white;
  border-radius: 8px;
}

.card:hover {
  transform: translateY(-4px);
}
```

### 12.4 Git Conventions

```
# Commits
feat: add new slider component
fix: resolve CORS issue in production
refactor: extract ServicioCard component
docs: update DESIGN.md
chore: update dependencies

# Branches
main                    # Producción
develop                 # Desarrollo
feature/slider-v2       # Features
fix/cors-headers        # Fixes
```

---

## 13. Checklist de Calidad

### 13.1 Antes de cada Deploy

- [ ] `python manage.py test` pasa
- [ ] `python manage.py check --deploy` sin warnings
- [ ] `npm run build` en ambos frontends sin errores
- [ ] `npm run lint` sin errores
- [ ] No hay `print()` o `console.log()` en código de producción
- [ ] Variables de entorno actualizadas en `.env`
- [ ] Migraciones aplicadas (`python manage.py migrate`)
- [ ] `collectstatic` ejecutado
- [ ] Imágenes optimizadas (WebP, variantes generadas)

### 13.2 Security Checklist

- [ ] SECRET_KEY en variable de entorno
- [ ] DEBUG=False en producción
- [ ] HTTPS habilitado
- [ ] CORS whitelist configurado
- [ ] No hay secrets en el repo
- [ ] Dependencias actualizadas (sin CVEs conocidos)
- [ ] Rate limiting habilitado en nginx

### 13.3 Performance Checklist

- [ ] Lighthouse score > 80
- [ ] LCP < 2.5s
- [ ] FCP < 1.8s
- [ ] CLS < 0.1
- [ ] CSS < 50KB (con PurgeCSS)
- [ ] JS bundle < 200KB (gzipped)
- [ ] Imágenes en WebP
- [ ] Caché habilitada en nginx
- [ ] Gzip habilitado

### 13.4 Code Quality

- [ ] TypeScript sin errores (`tsc --noEmit`)
- [ ] ESLint sin warnings
- [ ] No hay `any` types en TypeScript
- [ ] No hay imports circulares
- [ ] Componentes < 300 líneas
- [ ] Funciones < 50 líneas
- [ ] Tests para lógica crítica

---

## Apéndice A: Glosario

| Término | Definición |
|---------|-----------|
| **SPA** | Single Page Application — aplicación que renderiza todo en el cliente |
| **JWT** | JSON Web Token — token de autenticación |
| **DRF** | Django REST Framework — toolkit para APIs REST |
| **CORS** | Cross-Origin Resource Sharing — permisos de peticiones cross-origin |
| **HSTS** | HTTP Strict Transport Security — forzar HTTPS |
| **WebP** | Formato de imagen optimizado (30% más pequeño que JPEG) |
| **Tree-shaking** | Eliminar código no usado del bundle |
| **Code splitting** | Dividir JS en chunks por ruta |
| **Lazy loading** | Cargar componentes bajo demanda |
| **Stale time** | Tiempo antes de que react-query revalid datos |

## Apéndice B: Referencias

- [Django 5.2 Documentation](https://docs.djangoproject.com/en/5.2/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [react-query Documentation](https://tanstack.com/query/latest)
- [Docker Documentation](https://docs.docker.com/)
- [nginx Documentation](https://nginx.org/en/docs/)

---

> **Última actualización**: Julio 2026
> **Autor**: Sistema de diseño Magna
> **Versión**: 1.0
