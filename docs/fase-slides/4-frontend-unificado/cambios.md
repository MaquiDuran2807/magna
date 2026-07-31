# Fase 4 — Frontend: Tipos + API + Slider Unificado

> Fecha: 06/07/2026
> Inicio: 15:02
> Fin: 15:10
> Duración: 8 min

---

## Cambios

### `types/types.ts` — Nuevo tipo `Slide`

```typescript
export interface Slide {
    id: number;
    tipo: string;         // "servicio" | "slide"
    nombre: string;
    descripcion: string;
    imagen: string;
    icon?: string;
    imagen_tablet: string;
    imagen_celular: string;
    orden: number;
    subservicios?: Subservicio[];
    caracteristicas?: Caracteristica[];
}
```

Todos los campos que el slider necesita (`nombre`, `descripcion`, `imagen`, `imagen_tablet`, `imagen_celular`) son obligatorios. Los campos específicos de Servicio (`icon`, `subservicios`, `caracteristicas`) son opcionales.

### `api/pagesInfo.tsx` — Nuevo fetchSlides()

```typescript
export const fetchSlides = async () => {
    const response = await apiClient.get<Slide[]>('servicios/slides/')
    return response.data
}
```

### `hooks/getInfoPage.tsx` — Nuevo hook useGetSlides()

Hook independiente de `useGetServices`. Usa cache de 30 minutos (misma política).

### `components/slider.tsx` — Ahora acepta `Slide[]`

- Prop `services: Servicio2[]` → `slides: Slide[]`
- Variables internas renombradas para claridad (`servicio` → `slide`)
- La estructura de datos es la misma (nombre, descripcion, imagen, imagen_tablet, imagen_celular)

### `App.tsx` — Usa slides del nuevo endpoint

```tsx
const { slides } = useGetSlides();
// Fallback a services si slides está vacío
<LazySections.Slider slides={slides.length ? slides : services} />
```

**Comportamiento:**
1. Si hay slides (nuevo modelo `Slide`), se usan esos (en el orden definido en admin)
2. Si no hay slides, se usa el array de servicios como fallback (compatibilidad hacia atrás)
3. La sección Servicios (`Servicios.tsx`) sigue usando su propio endpoint e ignora los slides

### Verificación

```bash
cd magna-page/page
npx tsc --noEmit    # 0 errors
npm run build       # Build exitoso
```

### Archivos modificados

| Archivo | Cambio | Líneas +/- |
|---------|--------|-----------|
| `types/types.ts` | + Slide interface | +13 |
| `api/pagesInfo.tsx` | + fetchSlides import/function | +13 |
| `hooks/getInfoPage.tsx` | + useGetSlides hook, + imports | +15 |
| `components/slider.tsx` | Servicio2 → Slide, prop rename | ~10 |
| `App.tsx` | + useGetSlides, fallback logic, + Slide import | +4 |

**Impacto:** Bajo — el slider usa el nuevo endpoint pero mantiene fallback. Si el endpoint no existe (rollback backend), `slides` estará vacío y se usará `services`.
