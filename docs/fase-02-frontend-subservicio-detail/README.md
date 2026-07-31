# Fase 2: Frontend — Página de detalle de subservicio

## Contexto

Actualmente todos los subservicios se muestran en una sola página:

- `/servicios` → muestra TODOS los servicios con su carrusel de subservicios
- `/servicios/:id` → filtra por servicio, muestra sus subservicios en carrusel + panel lateral

No existe una URL única por subservicio. No hay forma de que Google indexe cada subservicio individualmente.

La Fase 1 ya agregó `slug` y `meta_description` a los modelos y creó el endpoint `GET /servicios/subservicio/<slug:slug>/`.

**Frontend activo:** `magna-page/unified/` (NO `magna-page/page/` ni `magna-page/store/` — esos son legacy).

---

## Qué hacer

### Objetivos

1. Actualizar tipos TypeScript con los nuevos campos de la API
2. Crear API call y hook para obtener detalle de subservicio
3. Crear componente de página `SubServicioDetail` con:
   - Helmet con `meta_description` desde la BD
   - JSON-LD BreadcrumbList
   - Canonical URL
   - Breadcrumbs visibles para usuario
   - Contenido completo (imagen responsive, descripción)
   - Enlaces a proyectos relacionados
4. Agregar ruta `/servicios/:serviceSlug/:subServiceSlug` al router
5. Actualizar navegación desde slider y sidebar para apuntar a detalle
6. Escribir tests
7. Hacer commit y push a rama `seo-ssg/fase-02-frontend`

---

## Cómo hacer y dónde hacer

### 2.1 Actualizar tipos TypeScript

**Archivo:** `magna-page/unified/src/page/types/types.ts`

Agregar/actualizar interfaces:

```typescript
// Actualizar Subservicio
export interface Subservicio {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    imagen_tablet: string;
    imagen_celular: string;
    servicio: number;
    slug?: string;
    meta_description?: string;
}

// Actualizar Servicio2
export interface Servicio2 {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    icon: string;
    imagen_tablet: string;
    imagen_celular: string;
    subservicios: Subservicio[];
    caracteristicas: Caracteristica[];
    slug?: string;
}

// Nuevo: respuesta del endpoint de detalle
export interface SubServicioDetailResponse {
    id: number;
    nombre: string;
    descripcion: string;
    meta_description: string;
    slug: string;
    imagen: string;
    imagen_tablet: string;
    imagen_celular: string;
    servicio: number;
    servicio_padre: {
        id: number;
        nombre: string;
        slug: string;
    };
}
```

### 2.2 Crear API call

**Archivo:** `magna-page/unified/src/page/api/pagesInfo.tsx`

```typescript
export const fetchSubServicioDetail = async (slug: string): Promise<SubServicioDetailResponse> => {
    const response = await apiClient.get(`/servicios/subservicio/${slug}/`);
    return response.data;
};
```

### 2.3 Crear hook

**Archivo:** `magna-page/unified/src/page/hooks/getInfoPage.tsx`

```typescript
export const useGetSubServicioDetail = (slug: string) => {
    return useQuery({
        queryKey: ['subservicio', slug],
        queryFn: () => fetchSubServicioDetail(slug),
        enabled: !!slug,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
    });
};
```

Agregar el import de `fetchSubServicioDetail` al inicio del archivo.

### 2.4 Crear página SubServicioDetail

**Archivo NUEVO:** `magna-page/unified/src/page/pages/subServicioDetail.tsx`

```tsx
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetSubServicioDetail } from '../hooks/getInfoPage';
import { useGetProjects } from '../hooks/getInfoPage';
import PagesLayout from '../layouts/pagesLayouts';
import Spinner from '../components/spinner';
import './styles/servicesDetail.css';

const SubServicioDetail: React.FC = () => {
    const { serviceSlug, subServiceSlug } = useParams<{ serviceSlug: string; subServiceSlug: string }>();
    const navigate = useNavigate();
    const { data: subServicio, isLoading } = useGetSubServicioDetail(subServiceSlug!);
    const { projects } = useGetProjects();

    useEffect(() => {
        if (!isLoading && !subServicio) {
            navigate('/servicios', { replace: true });
        }
    }, [isLoading, subServicio, navigate]);

    if (isLoading) return <Spinner />;
    if (!subServicio) return null;

    // Filtrar proyectos relacionados que usen este subservicio
    const proyectosRelacionados = projects?.results?.filter((p: any) =>
        p.subservicios?.some((s: any) => s.id === subServicio.id)
    ) || [];

    const canonicalUrl = `https://magnaingenieriaytopografia.com/servicios/${subServicio.servicio_padre.slug}/${subServicio.slug}`;

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Servicios",
                "item": "https://magnaingenieriaytopografia.com/servicios"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": subServicio.servicio_padre.nombre,
                "item": `https://magnaingenieriaytopografia.com/servicios/${subServicio.servicio_padre.slug}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": subServicio.nombre
            }
        ]
    };

    return (
        <>
            <Helmet>
                <title>{subServicio.nombre} | Magna Ingeniería y Topografía</title>
                <meta name="description" content={
                    subServicio.meta_description || subServicio.descripcion.substring(0, 160)
                } />
                <meta name="keywords" content={
                    `Magna, ${subServicio.nombre}, ${subServicio.servicio_padre.nombre}, ingeniería, topografía, Ibagué, Tolima, Colombia`
                } />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={`${subServicio.nombre} | Magna Ingeniería y Topografía`} />
                <meta property="og:description" content={subServicio.meta_description || subServicio.descripcion.substring(0, 160)} />
                <meta property="og:url" content={canonicalUrl} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
            </Helmet>

            <PagesLayout>
                <div className="container py-4">
                    {/* Breadcrumbs */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/servicios">Servicios</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={`/servicios/${subServicio.servicio_padre.slug}`}>
                                    {subServicio.servicio_padre.nombre}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {subServicio.nombre}
                            </li>
                        </ol>
                    </nav>

                    {/* Contenido principal */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <img
                                src={subServicio.imagen_tablet || subServicio.imagen}
                                srcSet={`
                                    ${subServicio.imagen_celular || subServicio.imagen} 450w,
                                    ${subServicio.imagen_tablet || subServicio.imagen} 1024w
                                `}
                                sizes="(max-width: 768px) 100vw, 800px"
                                alt={subServicio.nombre}
                                className="img-fluid rounded shadow"
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <h1>{subServicio.nombre}</h1>
                            <p>{subServicio.descripcion}</p>
                            <Link to={`/servicios/${subServicio.servicio_padre.slug}`}>
                                <button className="boton-1">
                                    Ver todos los servicios de {subServicio.servicio_padre.nombre}
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Proyectos relacionados */}
                    {proyectosRelacionados.length > 0 && (
                        <div className="row mt-5">
                            <div className="col-12">
                                <h3>Proyectos relacionados</h3>
                                <div className="row">
                                    {proyectosRelacionados.slice(0, 4).map((p: any) => (
                                        <div key={p.id} className="col-12 col-md-3 mb-3">
                                            <Link to={`/projects/${p.id}`}>
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{p.nombre}</h5>
                                                        <p className="card-text">{p.descripcion?.substring(0, 100)}...</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </PagesLayout>
        </>
    );
};

export default SubServicioDetail;
```

### 2.5 Agregar ruta al router

**Archivo:** `magna-page/unified/src/page/main.tsx`

Agregar import:
```typescript
const LazySubServicioDetail = React.lazy(() => import('./pages/subServicioDetail'));
```

Agregar ruta (después de la ruta `/servicios/:id`):
```typescript
{ path: '/servicios/:serviceSlug/:subServiceSlug', element: <React.Suspense fallback={<Spinner />}><LazySubServicioDetail /></React.Suspense> },
```

### 2.6 Actualizar navegación

**Archivo:** `magna-page/unified/src/page/components/sliderServices.tsx`

Cuando el usuario hace clic en un subservicio, navegar a la página de detalle:

```typescript
import { useNavigate } from 'react-router-dom';

// Dentro del componente:
const navigate = useNavigate();

// En el onClick del slide:
const handleClick = (sub: Subservicio, servicioSlug?: string) => {
    if (sub.slug && servicioSlug) {
        navigate(`/servicios/${servicioSlug}/${sub.slug}`);
    } else {
        onSubServicioClick?.(sub);
    }
};
```

**Archivo:** `magna-page/unified/src/page/pages/servecesDetail.tsx`

En el sidebar, cambiar los botones de subservicio para navegar a detalle:

```typescript
// Reemplazar handleSubServicioClick en los buttons del sidebar:
<button
    key={sub.id}
    className="subservicio-item"
    onClick={() => navigate(`/servicios/${servicio.slug}/${sub.slug}`)}
>
```

---

## Tests

### Test del endpoint (backend)

Ya se cubrió en Fase 1. Verificar que funciona el flujo completo:

```bash
python manage.py test servicios.tests.SEOTests.test_subservicio_detail_endpoint
```

### Test manual del frontend

```bash
# Iniciar Django
python manage.py runserver

# Iniciar frontend (dev)
cd magna-page/unified && npm run dev

# Navegar a:
# http://localhost:5173/servicios/topografia/levantamiento-planimetrico
```

Verificar:
- [ ] La página carga sin errores
- [ ] El `<title>` es correcto (no el default)
- [ ] La meta descripción coincide con la BD
- [ ] Los breadcrumbs se ven correctamente
- [ ] El canonical URL apunta a la página correcta
- [ ] La navegación desde `/servicios` funciona

---

## Documentación del resultado

### Qué se hizo

- Se creó la página `SubServicioDetail` con Helmet dinámico desde BD
- Se agregó ruta `/servicios/:serviceSlug/:subServiceSlug`
- Se agregó JSON-LD BreadcrumbList, canonical URL, OG tags
- Se actualizó la navegación desde slider y sidebar
- Se actualizaron tipos TypeScript y hooks

### Por qué se hizo

- Cada subservicio ahora tiene su propia URL indexable por Google
- La meta description es editable desde admin (no hardcodeada)
- Los breadcrumbs ayudan a Google a entender la jerarquía del sitio
- Los proyectos relacionados mejoran el internal linking y la relevancia temática

### Líneas de código

| Archivo | Cambio | LOC |
|---------|--------|-----|
| `unified/src/page/types/types.ts` | +SubServicioDetailResponse, +slug/meta | +25 |
| `unified/src/page/api/pagesInfo.tsx` | +fetchSubServicioDetail | +5 |
| `unified/src/page/hooks/getInfoPage.tsx` | +useGetSubServicioDetail | +10 |
| `unified/src/page/pages/subServicioDetail.tsx` | NUEVO | +130 |
| `unified/src/page/main.tsx` | +ruta lazy | +2 |
| `unified/src/page/components/sliderServices.tsx` | navegación a detalle | +10 |
| `unified/src/page/pages/servecesDetail.tsx` | sidebar navega a detalle | +5 |
| **Total** | | **~187 LOC** |

### Rendimiento

- La página es lazy-loaded (solo se descarga cuando se visita)
- Una consulta API adicional (`GET /subservicio/<slug>/`) por visita
- Sin impacto en páginas existentes

---

Al terminar, crear resumen ejecutivo (que se hizo, por que, impacto, tests, como probar) en docs/seo/fase-02-frontend-subservicio-detail.md.

