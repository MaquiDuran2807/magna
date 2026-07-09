# Fase 3+4+5 — Unificación de Frontends: Plan Completo

> Proyecto: Magna Ingeniería y Topografía
> Fecha: 30/06/2026
> Basado en: `PLAN_ACTUALIZACION.md` (secciones 10-11), `docs/fase 2/cambios.md`, `docs/fase 2/plan.md`

---

## Índice

1. [Resumen](#1-resumen)
2. [Estado actual vs objetivo](#2-estado-actual-vs-objetivo)
3. [Diagnóstico de diferencias Page vs Store](#3-diagnóstico-de-diferencias-page-vs-store)
4. [Estructura destino](#4-estructura-destino)
5. [Fase 3 — Migración Page a proyecto unificado](#5-fase-3--migración-page-a-proyecto-unificado)
6. [Fase 4 — Migración Store a proyecto unificado](#6-fase-4--migración-store-a-proyecto-unificado)
7. [Fase 5 — Unificación y puesta en marcha](#7-fase-5--unificación-y-puesta-en-marcha)
8. [Riesgos y mitigaciones](#8-riesgos-y-mitigaciones)
9. [Plan de ejecución diario](#9-plan-de-ejecución-diario)
10. [Verificación y rollback](#10-verificación-y-rollback)

---

## 1. Resumen

Unificar los dos proyectos Vite separados (`magna-page/page/` y `magna-page/store/`) en un **solo proyecto Vite con múltiples entry points**. Esto elimina dependencias duplicadas, unifica el sistema de autenticación, comparte componentes comunes y reduce el mantenimiento futuro.

**Tiempo estimado:** 8-16 horas · **Prioridad: ALTA** (después de Fase 2)

### ¿Por qué unificar ahora?

| Antes (2 proyectos) | Después (1 proyecto) |
|---------------------|----------------------|
| Dependencias duplicadas (axios, bootstrap, react, react-router, etc.) | Un `package.json`, un `node_modules` |
| Dos builds separados | Un solo `npm run build` |
| Componentes duplicados (footer, whatsapp, logo) | Componentes compartidos en `shared/` |
| Dos sistemas de auth incompatibles | Auth unificado (escribe en ambos formatos) |
| Dos configuraciones Vite | Una sola configuración con multi-entry |
| Mantenimiento duplicado | Un solo punto de actualización |

---

## 2. Estado actual vs objetivo

### Estado actual (después de Fase 2)

```
magna-page/
├── page/                        → Sitio web (Vite 5 + React 18)
│   ├── src/
│   │   ├── main.tsx             → Entry point
│   │   ├── App.tsx              → Landing sections
│   │   ├── api/                 → apiClient, user api, pagesInfo, blog
│   │   ├── auth/                → AuthProvider (token + refreshToken)
│   │   ├── components/          → NavBar, Footer, Sliders, Sectiones, etc.
│   │   ├── hooks/               → getInfoPage, useLazyload, ScreenSize
│   │   ├── layouts/             → PagesLayout
│   │   ├── pages/               → aboutUs, contact, blog, projects, etc.
│   │   ├── routes/              → PrivateRoute
│   │   ├── types/               → projects, blog, types
│   │   ├── sitemap/             → sitemap.xml
│   │   └── assets/              → img, logos
│   ├── vite.config.ts           → manualChunks + PurgeCSS
│   └── package.json
│
└── store/                       → E-commerce (Vite 5 + React 18)
    ├── src/
    │   ├── main.tsx             → Entry point
    │   ├── App.tsx              → Layout + Navbar + Sidebar + Footer
    │   ├── Store.tsx            → StoreProvider (carrito, auth, modo)
    │   ├── apiClient.ts         → Axios con token desde userInfo
    │   ├── components/          → Footer, CheckoutSteps, ProductItem, etc.
    │   ├── hooks/               → productHooks, userHooks, orderHooks
    │   ├── pages/               → Home, Cart, Checkout, Orders, etc.
    │   ├── types/               → Cart, UserInfo, Product, Order, ApiError
    │   └── assets/              → logos
    ├── vite.config.ts           → Simple (sourcemap:false)
    └── package.json
```

### Estado objetivo

```
magna-page/
├── unified/                     ← ÚNICO proyecto frontend
│   ├── index.html               → Entry point website (page)
│   ├── store.html               → Entry point e-commerce (store)
│   ├── vite.config.ts           → Multi-entry + manualChunks + PurgeCSS
│   ├── tsconfig.json
│   ├── package.json             → Dependencias COMBINADAS
│   │
│   ├── src/
│   │   ├── main.tsx             → Router del website (page)
│   │   ├── store-main.tsx       → Router del e-commerce (store)
│   │   │
│   │   ├── shared/              → CÓDIGO COMPARTIDO (único)
│   │   │   ├── components/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── FloatWhatsapp.tsx
│   │   │   │   ├── Logo.tsx
│   │   │   │   └── LogoOriginal.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useLazyload.ts
│   │   │   └── api/
│   │   │       └── client.ts    → API client UNIFICADO
│   │   │
│   │   ├── auth/
│   │   │   └── AuthProvider.tsx  → Auth UNIFICADO (escribe ambos formatos)
│   │   │
│   │   ├── store/
│   │   │   └── StoreContext.tsx  → Store context (carrito, modo, etc.)
│   │   │
│   │   ├── page/                → TODO lo de page/ (solo cambiar imports)
│   │   │   ├── components/
│   │   │   │   ├── navBar.tsx
│   │   │   │   ├── sections/
│   │   │   │   ├── styles/      → 18 CSS files
│   │   │   │   └── ...otros
│   │   │   ├── pages/
│   │   │   ├── layouts/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   ├── routes/
│   │   │   ├── types/
│   │   │   ├── sitemap/
│   │   │   └── assets/
│   │   │
│   │   └── store-pages/         → TODO lo de store/ (solo cambiar imports)
│   │       ├── components/
│   │       ├── pages/
│   │       ├── hooks/
│   │       └── types/
│   │
│   └── public/                  → assets estáticos
│
├── page/                        ← SE MANTIENE como backup (no se toca)
└── store/                       ← SE MANTIENE como backup (no se toca)
```

---

## 3. Diagnóstico de diferencias Page vs Store

### 3.1 — Autenticación (RIESGO MÁXIMO)

| Aspecto | Page | Store |
|---------|------|-------|
| **Almacenamiento** | `localStorage.token` + `localStorage.refreshToken` | `localStorage.userInfo` (JSON con access+refresh+userData) |
| **Provider** | `AuthProvider` (context simple) | `StoreProvider` (useReducer) |
| **Lectura de token** | `localStorage.getItem('token')` | `JSON.parse(localStorage.getItem('userInfo')!).access` |
| **Header HTTP** | `Authorization: JWT <token>` | `Authorization: JWT <access>` |
| **Login** | Guarda token directo | Guarda userInfo JSON completo |
| **Logout** | `removeItem('token')` + `removeItem('refreshToken')` | `removeItem('userInfo')` + dispatch USER_SIGNOUT |
| **Protección rutas** | `PrivateRoute` usa `useAuth().isTokenValid` | `ProtectedRoute` usa `userInfo` del context |

### 3.2 — Routing

| Aspecto | Page | Store |
|---------|------|-------|
| **Método** | `createBrowserRouter` plano | `createBrowserRouter` + `createRoutesFromElements` |
| **Base path** | `/` | `/store/` (anidado) |
| **Layout** | `PagesLayout` wrapper (NavBar + Footer + FloatWhatsapp) | `App.tsx` ES el layout (navbar, sidebar, cart, checkout nav, footer) |
| **Rutas** | `/`, `/login`, `/aboutUs`, `/servicios/:id?`, `/projects`, `/projects/:projectArg`, `/contact`, `/blog`, `/blog/:id`, `/cotizador` | `/store/`, `/store/product/:slug`, `/store/cart`, `/store/signin`, `/store/signup`, `/store/search/:categoria`, `/store/search/byname/:search`, `/store/shipping`, `/store/payment`, `/store/placeorder`, `/store/order/:id`, `/store/orderhistory`, `/store/profile` |

### 3.3 — API Client

| Page (`page/src/apiClient.tsx`) | Store (`store/src/apiClient.ts`) |
|--------------------------------|----------------------------------|
| BaseURL: `window.location.origin` | BaseURL: hardcodeada `https://magnaingenieriaytopografia.com` |
| Token: `localStorage.getItem('token')` | Token: `JSON.parse(localStorage.getItem('userInfo')!).access` |
| Header: `Authorization: JWT <token>` | Header: `authorization: JWT <access>` |

### 3.4 — Dependencias únicas

| Solo Page | Solo Store |
|-----------|------------|
| framer-motion ^11.15.0 | @paypal/react-paypal-js ^8.5.0 |
| react-pdf ^9.2.0 | react-helmet-async ^2.0.0 |
| @react-pdf/renderer ^3.4.4 | react-router-bootstrap ^0.26.2 |
| lottie-react ^2.4.1 | |
| formik ^2.4.6 | |
| yup ^1.6.1 | |
| dompurify ^3.2.3 | |
| leaflet ^1.9.4 | |
| react-leaflet ^4.2.1 | |
| react-ga4 ^2.1.0 | |
| react-intersection-observer ^9.13.0 | |
| react-lazy-load-image-component ^1.6.0 | |
| vite-plugin-purgecss ^0.2.12 | |
| pdfjs-dist ^4.10.0 | |

### 3.5 — Componentes duplicados (con diferencias)

| Componente | Page | Store | Diferencias |
|------------|------|-------|-------------|
| `footer1.tsx` | Lazy import, Suspense, `contactInfo` object, lazy logo | Import directo, ligeras diferencias layout | Se unifica en shared/ tomando la versión más completa |
| `floawhatsapp.tsx` | `handleSubmit(event)` con 1 parámetro | `handleSubmit(event, value)` con 2 parámetros | Se unifica en shared/ |
| `logo.tsx` | SVG component | SVG component | Igual, se mueve a shared/ |
| `logoOriginal.tsx` | SVG component | SVG component | Igual, se mueve a shared/ |
| `imgfooter.tsx` | SVG lazy component | Icon component directo | Se unifica en shared/ |
| `useLazyload.tsx` | Hook idéntico | Hook idéntico | Se unifica en shared/ |

---

## 4. Estructura destino

```
magna-page/unified/
├── index.html                        → Entry page (website)
├── store.html                        → Entry store (e-commerce)
├── package.json                      → Dependencias combinadas
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts                    → Multi-entry + manualChunks + PurgeCSS
│
└── src/
    ├── main.tsx                      → ROUTER DEL WEBSITE (page)
    │   ├── createBrowserRouter con rutas de page
    │   ├── QueryClientProvider
    │   └── AuthProvider unificado
    │
    ├── store-main.tsx                → ROUTER DEL E-COMMERCE (store)
    │   ├── createBrowserRouter con rutas bajo /store/
    │   ├── StoreProvider
    │   ├── PayPalScriptProvider
    │   ├── HelmetProvider
    │   └── QueryClientProvider
    │
    ├── shared/                       → COMPONENTES COMPARTIDOS
    │   ├── api/
    │   │   └── client.ts             → Axios unificado (lee de ambos formatos)
    │   ├── components/
    │   │   ├── Footer.tsx            → Footer unificado
    │   │   ├── FloatWhatsapp.tsx     → WhatsApp unificado
    │   │   ├── Logo.tsx              → Logo SVG
    │   │   └── LogoOriginal.tsx      → Logo original SVG
    │   └── hooks/
    │       └── useLazyload.ts        → Hook de lazy loading
    │
    ├── auth/
    │   └── AuthProvider.tsx          → AUTH UNIFICADO
    │                                   Guarda en AMBOS formatos:
    │                                   - localStorage.token + refreshToken (page)
    │                                   - localStorage.userInfo JSON (store)
    │
    ├── store/
    │   └── StoreContext.tsx          → Store context (carrito, modo, etc.)
    │
    ├── page/                         → CÓDIGO DE PAGE (solo imports actualizados)
    │   ├── App.tsx                   → Landing page (sectiones lazy)
    │   ├── api/
    │   │   ├── user.tsx
    │   │   ├── pagesInfo.tsx
    │   │   └── blog.tsx
    │   ├── assets/
    │   │   └── img/
    │   │       ├── logo.tsx
    │   │       ├── logoOriginal.tsx
    │   │       └── imgfooter.tsx
    │   ├── components/
    │   │   ├── navBar.tsx
    │   │   ├── navbar2.tsx
    │   │   ├── slider.tsx
    │   │   ├── sliderProjects.tsx
    │   │   ├── sliderServices.tsx
    │   │   ├── sliderProjectDetail.tsx
    │   │   ├── sections/
    │   │   │   ├── Servicios.tsx
    │   │   │   ├── Equipos.tsx
    │   │   │   ├── proyectos.tsx
    │   │   │   ├── proyectoPanel.tsx
    │   │   │   ├── statistics.tsx
    │   │   │   ├── clients.tsx
    │   │   │   └── contact.tsx
    │   │   ├── styles/               → 18 CSS files (intactos)
    │   │   ├── ProgressiveBackground.tsx
    │   │   ├── floawhatsapp.tsx
    │   │   ├── footer1.tsx
    │   │   ├── acordeon.tsx
    │   │   ├── acordeon1.tsx
    │   │   ├── banner.tsx
    │   │   ├── blogCards.tsx
    │   │   ├── BotonesSwiper.tsx
    │   │   ├── brochure.tsx
    │   │   ├── button.tsx
    │   │   ├── cardsProjects.tsx
    │   │   ├── contador.tsx
    │   │   ├── headingDivider.tsx
    │   │   ├── LogoCarrusel.tsx
    │   │   ├── maps.tsx
    │   │   ├── search.tsx
    │   │   ├── setionHeader.tsx
    │   │   ├── sidebarBolgs.tsx
    │   │   ├── splashScreen.tsx
    │   │   ├── spinner.tsx
    │   │   └── tarjetaEquipo.tsx
    │   ├── hooks/
    │   │   ├── getInfoPage.tsx
    │   │   └── ScreenSize.tsx
    │   ├── layouts/
    │   │   └── pagesLayouts.tsx
    │   ├── pages/
    │   │   ├── aboutUs.tsx
    │   │   ├── blog.tsx
    │   │   ├── blogDetail.tsx
    │   │   ├── contact.tsx
    │   │   ├── cotizador.tsx
    │   │   ├── login.tsx
    │   │   ├── projects.tsx
    │   │   ├── projecsDetail.tsx
    │   │   └── servecesDetail.tsx
    │   ├── routes/
    │   │   └── PrivateRoute.tsx
    │   ├── sitemap/
    │   │   └── sitemap.tsx
    │   └── types/
    │       ├── blog.tsx
    │       ├── projects.tsx
    │       └── types.tsx
    │
    └── store-pages/                  → CÓDIGO DE STORE (solo imports actualizados)
        ├── App.tsx                   → Layout store (Navbar, Sidebar, Cart Badge, Footer)
        ├── components/
        │   ├── CheckoutSteps.tsx
        │   ├── LoadingBox.tsx
        │   ├── MessageBox.tsx
        │   ├── ProductItem.tsx
        │   ├── ProtectedRoute.tsx
        │   ├── Rating.tsx
        │   ├── SearchBox.tsx
        │   ├── footer1.tsx
        │   ├── floawhatsapp.tsx
        │   └── styles/
        │       └── footer.css
        ├── hooks/
        │   ├── productHooks.ts
        │   ├── userHooks.ts
        │   ├── orderHooks.ts
        │   └── useLazyload.tsx
        ├── pages/
        │   ├── HomePage.tsx
        │   ├── ProductPage.tsx
        │   ├── CartPage.tsx
        │   ├── SigninPage.tsx
        │   ├── SignupPage.tsx
        │   ├── ShippingAddressPage.tsx
        │   ├── PaymentMethodPage.tsx
        │   ├── PlaceOrderPage.tsx
        │   ├── OrderPage.tsx
        │   ├── OrderHistoryPage.tsx
        │   ├── ProfilePage.tsx
        │   ├── searchPage.tsx
        │   ├── searchPageStr.tsx
        │   └── searchPageStr.tsx
        └── types/
            ├── ApiError.ts
            ├── Cart.ts
            ├── Order.ts
            ├── Product.ts
            ├── User.ts
            └── UserInfo.ts

```

---

## 5. Fase 3 — Migración Page a proyecto unificado

**Objetivo:** Mover todo el código de `page/` dentro de `unified/src/page/` actualizando imports apuntando a `shared/`.

**Tiempo:** 4-6 horas · **Riesgo: BAJO** (solo mover archivos y cambiar imports)

### Subfase 3.1 — Crear estructura base

```bash
# Crear directorio unificado
mkdir -p magna-page/unified/src/{shared/{components,hooks,api},auth,store,page/{components/{styles,sections},pages,layouts,hooks,api,routes,types,sitemap,assets/img},store-pages/{components/{styles},pages,hooks,types,assets}}

# Copiar configs base desde page (el más completo)
copy magna-page/page/package.json magna-page/unified/
copy magna-page/page/tsconfig.json magna-page/unified/
copy magna-page/page/vite.config.ts magna-page/unified/
copy magna-page/page/index.html magna-page/unified/
copy magna-page/page/.gitignore magna-page/unified/
```

### Subfase 3.2 — Copiar todo page/ a unified/src/page/

```bash
# Copiar todo el código de page a unified/src/page/
Copy-Item -Recurse magna-page/page/src/* magna-page/unified/src/page/
```

### Subfase 3.3 — Extraer componentes compartidos a shared/

Mover estos archivos de `unified/src/page/` a `unified/src/shared/` y actualizar imports:

| Archivo | Origen (page) | Destino (shared) |
|---------|---------------|-------------------|
| `apiClient.tsx` | `page/src/apiClient.tsx` | `shared/api/client.ts` |
| `footer1.tsx` | `page/src/components/footer1.tsx` | `shared/components/Footer.tsx` |
| `floawhatsapp.tsx` | `page/src/components/floawhatsapp.tsx` | `shared/components/FloatWhatsapp.tsx` |
| `logo.tsx` | `page/src/assets/img/logo.tsx` | `shared/components/Logo.tsx` |
| `logoOriginal.tsx` | `page/src/assets/img/logoOriginal.tsx` | `shared/components/LogoOriginal.tsx` |
| `imgfooter.tsx` | `page/src/assets/img/imgfooter.tsx` | `shared/components/LogoFooter.tsx` |
| `useLazyload.tsx` | `page/src/hooks/useLazyload.tsx` | `shared/hooks/useLazyload.ts` |

**Importante:** NO eliminar los archivos originales aún. Los componentes de page seguirán importando desde sus rutas originales durante la Fase 3. Se crean los archivos en shared/ y luego se actualizan los imports progresivamente.

### Subfase 3.4 — Actualizar imports de page hacia shared/

Buscar y reemplazar imports en todos los archivos de `unified/src/page/`:

```typescript
// ANTES (import local):
import apiClient from '../apiClient';
import Footer from '../components/footer1';
import { FloatWhatsapp } from '../components/floawhatsapp';

// DESPUÉS (import a shared):
import apiClient from '../../shared/api/client';
import Footer from '../../shared/components/Footer';
import { FloatWhatsapp } from '../../shared/components/FloatWhatsapp';
```

### Subfase 3.5 — Configurar entry point page (`unified/src/main.tsx`)

Crear `unified/src/main.tsx` que es **idéntico** al `page/src/main.tsx` original, pero con imports actualizados a shared/:

```typescript
// unified/src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth/AuthProvider';
// ... resto igual que page/src/main.tsx
// Los imports lazy siguen siendo 'page/...'
```

### Subfase 3.6 — Crear AuthProvider unificado

```typescript
// unified/src/auth/AuthProvider.tsx
// UNIFICADO: escribe en AMBOS formatos de localStorage

const signin = (access: string, refresh: string, userData?: any) => {
  // Formato page (token directo)
  localStorage.setItem('token', access);
  localStorage.setItem('refreshToken', refresh);
  
  // Formato store (userInfo JSON)
  const existingInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const userInfo = { ...existingInfo, ...userData, access, refresh };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const getToken = (): string | null => {
  return localStorage.getItem('token') 
    ?? JSON.parse(localStorage.getItem('userInfo') || '{}').access 
    ?? null;
};
```

### Subfase 3.7 — Verificar build de page

```bash
cd magna-page/unified/
npm install
# Deshabilitar temporalmente el store entry point
npx vite build --mode page-only
# Verificar que el sitio web carga correctamente
```

---

## 6. Fase 4 — Migración Store a proyecto unificado

**Objetivo:** Agregar todo el código de `store/` dentro de `unified/src/store-pages/` y crear el segundo entry point.

**Tiempo:** 4-6 horas · **Riesgo: MEDIO** (especialmente auth y API client)

### Subfase 4.1 — Copiar todo store/ a unified/src/store-pages/

```bash
Copy-Item -Recurse magna-page/store/src/* magna-page/unified/src/store-pages/
```

### Subfase 4.2 — Reconciliar componentes duplicados

Los siguientes archivos existen TANTO en page como en store con ligeras diferencias:

| Archivo | page/ | store/ | Acción |
|---------|-------|--------|--------|
| `footer1.tsx` | Lazy + Suspense + lazy logo | Import directo | Usar versión page (más completa) en shared/ |
| `floawhatsapp.tsx` | `handleSubmit(event)` | `handleSubmit(event, value)` | Usar versión store (2 params) en shared/ |
| `useLazyload.tsx` | Mismo hook | Mismo hook | Ya está en shared/ de Fase 3 |

**Procedimiento:**
1. Los componentes ya movidos a `shared/` en Fase 3 se actualizan si la versión store tiene mejoras
2. Los archivos duplicados en `store-pages/components/` se ELIMINAN y se reemplazan por imports a `shared/`

### Subfase 4.3 — Actualizar imports de store-pages hacia shared/

```typescript
// ANTES (import local de store):
import apiClient from '../apiClient';
import Footer from '../components/footer1';
import { FloatWhatsapp } from '../components/floawhatsapp';
import useIntersectionObserver from '../hooks/useLazyload';

// DESPUÉS (import a shared):
import apiClient from '../../shared/api/client';
import Footer from '../../shared/components/Footer';
import { FloatWhatsapp } from '../../shared/components/FloatWhatsapp';
import useIntersectionObserver from '../../shared/hooks/useLazyload';
```

### Subfase 4.4 — Migrar StoreContext

El `StoreContext` (`store-pages/Store.tsx`) se mueve a `unified/src/store/StoreContext.tsx` sin cambios:

```typescript
// unified/src/store/StoreContext.tsx
// IDÉNTICO al original store/src/Store.tsx
// Solo se actualiza la ruta del import si es necesario
```

### Subfase 4.5 — Crear entry point store (`unified/src/store-main.tsx`)

```typescript
// unified/src/store-main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from './store/StoreContext';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/store/" element={<App />}>
      {/* ... mismas rutas que store original */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <PayPalScriptProvider options={{ 'client-id': 'sb' }} deferLoading={true}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </PayPalScriptProvider>
  </StoreProvider>
);
```

### Subfase 4.6 — Actualizar store-pages/App.tsx

El `App.tsx` del store (que ES el layout con Navbar, sidebar, cart) se mantiene igual, solo se actualizan los imports a shared/:

```typescript
// unified/src/store-pages/App.tsx
// Layout del store: navbar, sidebar categorías, cart badge, footer
// Importa Footer, FloatWhatsapp desde shared/
// Importa StoreContext desde ../store/StoreContext
```

### Subfase 4.7 — Crear store.html

```html
<!-- unified/store.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Magnatienda</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/store-main.tsx"></script>
</body>
</html>
```

### Subfase 4.8 — Verificar build de store

```bash
npx vite build --mode store-only
# Verificar que store.html se genera correctamente
# Probar flujo: listado productos → carrito → checkout → PayPal
```

---

## 7. Fase 5 — Unificación y puesta en marcha

**Objetivo:** Configurar el build multi-entry, unificar dependencias, PurgeCSS, y verificar que ambos frontends funcionan correctamente.

**Tiempo:** 4-6 horas · **Riesgo: MEDIO-ALTO** (configuración de build multi-entry)

### Subfase 5.1 — Unificar package.json

Combinar dependencias de page + store en un solo `package.json`:

```json
{
  "name": "magna-unified",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "dev:page": "vite --open /",
    "dev:store": "vite --open /store/",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@paypal/react-paypal-js": "^8.5.0",
    "@react-pdf/renderer": "^3.4.4",
    "@tanstack/react-query": "^5.62.0",
    "@tanstack/react-query-devtools": "^5.62.0",
    "axios": "^1.7.9",
    "bootstrap": "^5.3.3",
    "dompurify": "^3.2.3",
    "formik": "^2.4.6",
    "framer-motion": "^11.15.0",
    "leaflet": "^1.9.4",
    "lottie-react": "^2.4.1",
    "pdfjs-dist": "^4.10.0",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.7",
    "react-dom": "^18.3.1",
    "react-floating-whatsapp": "^5.0.8",
    "react-ga4": "^2.1.0",
    "react-helmet-async": "^2.0.0",
    "react-icons": "^5.4.0",
    "react-intersection-observer": "^9.13.0",
    "react-lazy-load-image-component": "^1.6.0",
    "react-leaflet": "^4.2.1",
    "react-pdf": "^9.2.0",
    "react-router-bootstrap": "^0.26.2",
    "react-router-dom": "^6.28.0",
    "react-toastify": "^11.0.0",
    "swiper": "^11.2.0",
    "yup": "^1.6.1"
  },
  "devDependencies": {
    "@types/dompurify": "^3.0.5",
    "@types/leaflet": "^1.9.8",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/react-lazy-load-image-component": "^1.6.4",
    "@types/react-router-bootstrap": "^0.26.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vite-plugin-purgecss": "^0.2.12"
  }
}
```

### Subfase 5.2 — Configurar Vite multi-entry

```typescript
// unified/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import purgecss from 'vite-plugin-purgecss'

export default defineConfig({
  plugins: [react(),
    purgecss({
      content: [
        './index.html',
        './store.html',
        './src/**/*.{tsx,ts,jsx,js}',
      ],
      safelist: {
        standard: [
          // Page (existente):
          /^swiper/, /^leaflet/, /^toast/, /^floating/,
          /^offcanvas/, /^modal/, /^fade/, /^show/, /^slide/,
          /^navbar/, /^nav-/, /^collapse/, /^collapsing/,
          /^fixed-/, /^sticky/, /^navbar-toggler/, /^container/,
          // Store (nuevo):
          /^checkout-/, /^side-/, /^cart-/, /^product-/,
          /^rating/, /^dark-mode/, /^light-mode/,
          /^small-container/, /^dropdown-menu/, /^header-link/,
          /^sub-header/, /^card-img/, /^mask/, /^logo-footer/,
          /^mySwiper/, /^active-nav/,
        ],
      },
    }),
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        page: 'index.html',
        store: 'store.html',
      },
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
            if (id.includes('react-router') || id.includes('@remix-run')) return 'vendor-router'
            if (id.includes('bootstrap') || id.includes('react-bootstrap')) return 'vendor-bootstrap'
            if (id.includes('framer-motion') || id.includes('motion')) return 'vendor-animation'
            if (id.includes('swiper') || id.includes('leaflet')) return 'vendor-ui'
            if (id.includes('@tanstack')) return 'vendor-query'
            if (id.includes('formik') || id.includes('yup')) return 'vendor-forms'
            if (id.includes('axios') || id.includes('dompurify') || id.includes('react-ga4')) return 'vendor-utils'
            if (id.includes('react-icons')) return 'vendor-icons'
            if (id.includes('react-toastify')) return 'vendor-toast'
            if (id.includes('react-pdf') || id.includes('pdfjs')) return 'vendor-pdf'
            if (id.includes('lottie')) return 'vendor-lottie'
            if (id.includes('react-floating-whatsapp') || id.includes('react-lazy-load-image')) return 'vendor-widgets'
            if (id.includes('react-intersection-observer')) return 'vendor-intersection'
            if (id.includes('@paypal')) return 'vendor-paypal'
            if (id.includes('react-helmet')) return 'vendor-helmet'
            if (id.includes('scheduler')) return 'vendor-react'
            return 'vendor-other'
          }
        },
      },
    },
  },
  base: '/static/',
})
```

### Subfase 5.3 — Unificar CSS (manejo de estilos)

**Problema:** Page tiene 18 CSS locales + index.css. Store tiene 1 CSS local + index.css diferente.

**Solución:**
1. Los CSS de page (`page/src/components/styles/`) se quedan donde están, importados por cada componente
2. El CSS de store (`store-pages/components/styles/footer.css`) se queda donde está
3. Los `index.css` de page y store se **fusionan** en un solo `src/index.css`:
   - Page aporta: variables CSS (--color-fondo, --color-texto), splash-screen, boton-1, tarjeta, col-card
   - Store aporta: .product-image, .rating, .checkout-steps, .navbar store, .side-navbar, .cart-badge, .dark-mode
   - Se ordenan por sección con comentarios
   - NO HAY CONFLICTOS porque las clases son específicas de cada dominio

```css
/* unified/src/index.css — FUSIONADO */
/* ===== PAGE STYLES (website) ===== */
:root {
  --color-fondo: #163E73;
  --color-texto: #fcfbfb;
  /* ... */
}

/* ===== STORE STYLES (e-commerce) ===== */
.checkout-steps > div {
  border-bottom: 0.2rem solid #d1d1d1;
}
/* ... */
```

### Subfase 5.4 — Unificar API Client

```typescript
// unified/src/shared/api/client.ts
// API Client UNIFICADO — compatible con ambos formatos de auth

import axios from 'axios'

export const APIURL = window.location.origin

const apiClient = axios.create({
  baseURL: APIURL,
  headers: {
    'Content-type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    // Intentar leer token del formato PAGE (token directo)
    let token = localStorage.getItem('token')
    
    // Si no existe, intentar formato STORE (userInfo JSON)
    if (!token) {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        token = JSON.parse(userInfo).access
      }
    }
    
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
```

### Subfase 5.5 — Build completo y verificación

```bash
cd magna-page/unified/

# 1. Instalar dependencias
npm install

# 2. TypeScript check
npx tsc --noEmit

# 3. Build completo (page + store)
npm run build

# 4. Verificar estructura del build
Get-ChildItem -Recurse dist/
# Debe contener:
#   dist/index.html         → Website
#   dist/store.html         → E-commerce
#   dist/vendor-react-*.js  → Chunks compartidos

# 5. Probar en desarrollo
npm run dev
# Abrir http://localhost:5173 → debe cargar page
# Abrir http://localhost:5173/store/ → debe cargar store

# 6. Pruebas manuales de page:
#   - Homepage carga con todas las secciones
#   - Navegación entre páginas
#   - Sliders/Swiper funcionan
#   - Formulario de contacto
#   - Blog con paginación
#   - Login/Cotizador

# 7. Pruebas manuales de store:
#   - Listado de productos en homepage
#   - Búsqueda por categoría
#   - Detalle de producto
#   - Agregar/quitar del carrito
#   - Flujo checkout completo
#   - PayPal integration
```

### Subfase 5.6 — Actualizar nginx (si aplica)

Si se usa nginx para servir los builds, actualizar `nginx.conf` para servir desde `unified/dist/` en lugar de `page/dist/` y `store/dist/`:

```nginx
# ANTES:
# location /static/ {
#     root /app/magna-page/page/dist;
# }
# location /store/ {
#     alias /app/magna-page/store/dist;
# }

# DESPUÉS:
location /static/ {
    root /app/magna-page/unified/dist;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Subfase 5.7 — Limpieza (solo después de verificación exitosa)

```bash
# SOLO después de confirmar que unified/ funciona en producción:

# 1. Marcar page/ y store/ como obsoletos
Rename-Item magna-page/page magna-page/page.legacy
Rename-Item magna-page/store magna-page/store.legacy

# 2. Actualizar scripts de build/deploy
# 3. Actualizar documentación
# 4. Mantener backups por 1 semana
```

---

## 8. Riesgos y mitigaciones

### Tabla de riesgos

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| R1 | **Auth roto**: page usa token, store usa userInfo.access. Si se unifica mal, un frontend deja de autenticar | **Alta** | **Crítico** | AuthProvider escribe en AMBOS formatos simultáneamente. API client intenta leer de ambos. |
| R2 | **PurgeCSS elimina clases de store** que se añaden dinámicamente (side-navbar, checkout-steps, dark-mode) | **Alta** | **Alto** | Safelist exhaustivo con patrones de store (ver 5.2). Probar visualmente cada página de store post-build. |
| R3 | **Componente duplicado con lógica diferente**: footer1.tsx tiene implementación distinta en page vs store | **Media** | **Medio** | Analizar diferencias antes de unificar. Mantener la versión más completa en shared/. |
| R4 | **Ruta /store/ no funciona**: el router del store no reconoce las rutas anidadas | **Media** | **Alto** | Usar `basename="/store"` o rutas absolutas. Verificar con navegación manual. |
| R5 | **CSS de page afecta store o viceversa**: clases genéricas como `.card`, `.navbar`, `.container` pueden colisionar | **Media** | **Medio** | Namespacing implícito: page usa `PagesLayout`, store usa su propio layout. Clases store son específicas: `.side-navbar`, `.checkout-steps`, `.cart-badge`. |
| R6 | **Build más grande por unificar dependencias**: bundle puede crecer al combinar deps de ambos frontends | **Baja** | **Bajo** | Tree-shaking de Vite elimina código no usado. Lazy loading por ruta ya implementado en page. manualChunks separa vendors. |
| R7 | **Lazy imports duplicados**: page y store importan React, Bootstrap, etc. | **Baja** | **Bajo** | manualChunks agrupa vendors compartidos. El navegador los cachea una sola vez. |
| R8 | **react-floating-whatsapp con firma diferente**: page `handleSubmit(event)`, store `handleSubmit(event, value)` | **Media** | **Medio** | Usar la firma de store (2 params) que es compatible hacia atrás. |

### Plan de contingencia

| Escenario | Acción |
|-----------|--------|
| R1 — Auth roto en producción | Rollback inmediato a builds separados de page/ y store/. Investigar y corregir offline. |
| R2 — PurgeCSS rompe store visualmente | Reconstruir sin PurgeCSS (`build: purgecss: false`), luego ajustar safelist. |
| R3 — Footer roto | Usar git para ver diferencias entre versiones y restaurar la correcta. |
| R4 — Rutas store no funcionan | Verificar `basename` en createBrowserRouter. Debuggear con console.log de rutas. |
| Complejidad de unificación muy alta | **Posponer Fase 5**. Dejar page/ y store/ separados con Fases 3+4 completadas. |

---

## 9. Plan de ejecución diario

### Día 1 — Fase 3: Migrar Page (4h)

| Hora | Actividad | Archivos |
|------|-----------|----------|
| 1h | Crear estructura unified/ + copiar page/ | `unified/`, `unified/src/page/` |
| 1h | Extraer shared/ components desde page | `shared/api/client.ts`, `shared/components/Footer.tsx`, `shared/components/FloatWhatsapp.tsx`, `shared/components/Logo.tsx`, `shared/components/LogoOriginal.tsx`, `shared/hooks/useLazyload.ts` |
| 1h | Actualizar imports de page hacia shared/ | ~30 archivos en `page/` |
| 0.5h | Crear AuthProvider unificado | `auth/AuthProvider.tsx` |
| 0.5h | `npm install` + `npm run build` (solo page) | Verificar build exitoso |

**Entregable:** `npm run dev` desde unified/ muestra el website funcionando.

### Día 2 — Fase 4: Migrar Store (4h)

| Hora | Actividad | Archivos |
|------|-----------|----------|
| 1h | Copiar store/ a unified/ + reconciliar duplicados | `unified/src/store-pages/`, shared/ components |
| 1h | Actualizar imports de store-pages hacia shared/ | ~15 archivos en `store-pages/` |
| 0.5h | Mover StoreContext a unified/ | `store/StoreContext.tsx` |
| 0.5h | Crear store-main.tsx + store.html | `src/store-main.tsx`, `store.html` |
| 0.5h | Fusionar index.css | `src/index.css` |
| 0.5h | `npm run build` (solo store) | Verificar build exitoso |

**Entregable:** `npm run dev` desde unified/ muestra store funcionando en /store/.

### Día 3 — Fase 5: Unificación + Build (4h)

| Hora | Actividad | Archivos |
|------|-----------|----------|
| 1h | Unificar package.json + instalar deps | `package.json` |
| 1h | Configurar Vite multi-entry + PurgeCSS safelist | `vite.config.ts` |
| 0.5h | Ajustes finales de imports conflictivos | Varios |
| 1h | Build completo + TypeScript check | `npm run build`, `tsc --noEmit` |
| 0.5h | Pruebas manuales de page | Navegación completa |
| 0.5h | Pruebas manuales de store | Flujo e-commerce completo |

**Entregable:** Build unificado genera page + store correctamente.

### Día 4 — Deploy + Verificación (2h)

| Hora | Actividad |
|------|-----------|
| 0.5h | Reemplazar build en servidor (o entorno staging) |
| 0.5h | Verificar page: todas las rutas, sliders, formularios |
| 0.5h | Verificar store: listado, carrito, checkout, PayPal |
| 0.5h | Monitorear logs. Si todo OK, marcar page/ y store/ como legacy |

**Entregable:** Producción serving desde unified build.

---

## 10. Verificación y rollback

### Checklist de verificación pre-deploy

```bash
# === BUILD ===
npm run build                          # Build exitoso sin errores
npx tsc --noEmit                       # Sin errores de TypeScript

# === PAGE (website) ===
# Abrir http://localhost:5173/
# [ ] Homepage carga con slider + secciones
# [ ] Navegación a Quiénes Somos
# [ ] Servicios con subservicios
# [ ] Proyectos con paginación
# [ ] Blog con lista y detalle
# [ ] Contacto con formulario
# [ ] Login funciona
# [ ] Cotizador (ruta protegida)
# [ ] Footer con redes sociales

# === STORE (e-commerce) ===
# Abrir http://localhost:5173/store/
# [ ] Homepage carga productos
# [ ] Navegación por categorías (sidebar)
# [ ] Búsqueda por nombre
# [ ] Detalle de producto
# [ ] Agregar al carrito
# [ ] Carrito muestra items actualizados
# [ ] Checkout: shipping → payment → placeorder
# [ ] PayPal integration
# [ ] Historial de órdenes
# [ ] Login/Signup
# [ ] Perfil de usuario
# [ ] Footer con datos de contacto

# === AUTH (unificado) ===
# [ ] Login desde page guarda token en ambos formatos
# [ ] Login desde store guarda userInfo en ambos formatos
# [ ] API client funciona con ambos formatos
# [ ] Logout limpia ambos formatos
# [ ] ProtectedRoute/PrivateRoute funcionan

# === RENDIMIENTO ===
# [ ] Build genera chunks separados (vendors)
# [ ] Sourcemaps desactivados
# [ ] PurgeCSS no eliminó clases necesarias
# [ ] Lazy loading funciona en page (secciones)
# [ ] manualChunks agrupa correctamente
```

### Rollback

```bash
# === ROLLBACK COMPLETO ===
# Si unified/ falla en producción:

# 1. Descartar unified y restaurar builds anteriores
Remove-Item -Recurse magna-page/unified/dist
# 2. Los builds originales de page/ y store/ siguen intactos
# 3. Revertir nginx.conf a la configuración anterior
# 4. Recargar nginx

# === ROLLBACK PARCIAL ===
# Si solo falla page o store, no el otro:
# 1. nginx: servir page desde page/dist/ y store desde unified/dist/
#    (o viceversa)
# 2. Debuggear el entry point fallido

# === ROLLBACK POR ARCHIVO ===
git checkout -- magna-page/unified/src/auth/AuthProvider.tsx
git checkout -- magna-page/unified/vite.config.ts
# etc.
```

---

## Apéndice A: Mapa de imports actualizados

### Page → shared/

| Archivo original (page) | Import antiguo | Import nuevo |
|------------------------|----------------|--------------|
| `apiClient.tsx` | `'../apiClient'` | `'../../shared/api/client'` |
| `components/footer1.tsx` | `'../assets/img/imgfooter'` | `'../../shared/components/LogoFooter'` |
| `components/floawhatsapp.tsx` | `'../assets/img/logo6.webp'` | (sigue siendo relativo a assets) |
| `hooks/useLazyload.tsx` | `'../hooks/useLazyload'` | `'../../shared/hooks/useLazyload'` |
| `components/navBar.tsx` | `'../assets/img/logoOriginal'` | `'../../shared/components/LogoOriginal'` |

### Store-pages → shared/

| Archivo original (store) | Import antiguo | Import nuevo |
|-------------------------|----------------|--------------|
| `apiClient.ts` | `'../apiClient'` | `'../../shared/api/client'` |
| `components/footer1.tsx` | `'../assets/imgfooter'` | `'../../shared/components/LogoFooter'` |
| `components/floawhatsapp.tsx` | `'../assets/logo6.png'` | (sigue siendo relativo a assets) |
| `hooks/useLazyload.tsx` | `'../hooks/useLazyload'` | `'../../shared/hooks/useLazyload'` |

---

## Apéndice B: Archivos involucrados

### Archivos a crear

| Archivo | Fase |
|---------|------|
| `magna-page/unified/package.json` | 3 |
| `magna-page/unified/tsconfig.json` | 3 |
| `magna-page/unified/vite.config.ts` | 5 |
| `magna-page/unified/index.html` | 3 |
| `magna-page/unified/store.html` | 4 |
| `magna-page/unified/src/main.tsx` | 3 |
| `magna-page/unified/src/store-main.tsx` | 4 |
| `magna-page/unified/src/shared/api/client.ts` | 3 |
| `magna-page/unified/src/shared/components/Footer.tsx` | 3 |
| `magna-page/unified/src/shared/components/FloatWhatsapp.tsx` | 3 |
| `magna-page/unified/src/shared/components/Logo.tsx` | 3 |
| `magna-page/unified/src/shared/components/LogoOriginal.tsx` | 3 |
| `magna-page/unified/src/shared/components/LogoFooter.tsx` | 3 |
| `magna-page/unified/src/shared/hooks/useLazyload.ts` | 3 |
| `magna-page/unified/src/auth/AuthProvider.tsx` | 3 |
| `magna-page/unified/src/store/StoreContext.tsx` | 4 |
| `magna-page/unified/src/index.css` | 4 |

### Archivos a modificar (actualizar imports)

Todos los archivos `.tsx`/`.ts` dentro de `unified/src/page/` y `unified/src/store-pages/` que importen desde las rutas que ahora están en shared/. Aproximadamente **45 archivos**.

### Archivos existentes que NO se modifican

- `magna-page/page/*` — se mantiene intacto como backup
- `magna-page/store/*` — se mantiene intacto como backup
- Los 18 archivos CSS de page (`components/styles/*.css`) — se copian tal cual
- Los tipos TypeScript de store (`types/*.ts`) — se copian tal cual
- Los hooks de store (`hooks/productHooks.ts`, `userHooks.ts`, `orderHooks.ts`) — se copian tal cual

---

> **Nota final:** La Fase 5 es opcional según el plan original, pero altamente recomendada para mejorar la mantenibilidad. Si durante la ejecución la complejidad resulta demasiado alta, se puede posponer y mantener page/ y store/ como proyectos separados con las dependencias ya actualizadas en Fase 2.
