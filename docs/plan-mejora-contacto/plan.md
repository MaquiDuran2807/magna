# Plan de Mejora — Página de Contacto

> Fecha: Julio 2026
> Commit base: `checkpoint previo a mejoras de contacto`

## Cambios a realizar

### 1. Banner "Oficina en Ibagué — Trabajamos en todo Colombia"

**Archivo:** `pages/contact.tsx`
- Agregar nueva sección entre las cards de info y el formulario
- Usar `ProgressiveBackground` (mismo patrón que `Equipos.tsx`) para el fondo
- Imagen de fondo: mapa de Colombia (topografía) — usar assets existentes o una nueva
- Texto central destacado: *"Oficina en Ibagué — Trabajamos en todo Colombia"*
- Ícono de ubicación (`FaMapMarkerAlt` de react-icons)
- Diseño: texto blanco sobre gradiente oscuro semi-transparente, centrado

### 2. LogoCarrusel de Clientes

**Archivo:** `pages/contact.tsx`
- Reutilizar componente `LogoCarrusel` + `SetionHeader` (importar de `components/sections/clients.tsx`)
- Sección entre banner de cobertura y formulario
- Título: "Nuestros Clientes confían en nosotros"

### 3. Simetría en cards de información

**Archivo:** `components/styles/contact.css`
- Ajustar `.contact-card` para garantizar misma altura exacta
- Ajustar `.contact-card-title` con altura fija consistente
- Ajustar `.contact-card-value` con altura mínima para alineación perfecta
- Todas las cards deben tener exactamente el mismo alto, mismo padding, mismas proporciones

### 4. Mejora del formulario (manteniendo diseño superpuesto)

**Archivo:** `components/sections/contact.tsx`
- Usar `SetionHeader` para el título "Contacto" (consistencia con otras secciones)
- Mantener estructura: columna izquierda (formulario) + columna derecha (FAQ con Acordeon)
- Limpiar `<br />` excesivos en columna derecha, usar padding CSS en su lugar
- Ajustar alturas de ambas columnas para que queden visualmente balanceadas

### 5. Sección "Por qué trabajar con nosotros" (futuro — desde admin)

No se implementa ahora. Pendiente para cuando el cliente defina el contenido.

---

## Archivos afectados

| Archivo | Tipo |
|---|---|
| `magna-page/page/src/pages/contact.tsx` | Modificar |
| `magna-page/page/src/components/sections/contact.tsx` | Modificar |
| `magna-page/page/src/components/styles/contact.css` | Modificar |

## Archivos nuevos

Ninguno. Todo se implementa con componentes existentes.

## Estructura final de la página

```
┌─ Banner (hero) ────────────────────────────┐  ← ya existe
├─ Cards info (Dir, Tel, Email, Horario) ────┤  ← ya existe (mejorar simetría)
├─ Banner "Oficina en Ibagué — Colombia" ────┤  ← NUEVO
├─ Clientes (LogoCarrusel) ──────────────────┤  ← NUEVO (reutilizar)
├─ Formulario + FAQ superpuestos ────────────┤  ← ya existe (mejorar)
├─ Mapa ─────────────────────────────────────┤  ← ya existe
```

## Orden de implementación

1. Modificar `contact.css` (simetría cards)
2. Modificar `contact.tsx` (formulario mejorado)
3. Modificar `contact.tsx` (página completa con banner + clientes)
4. Verificar build: `npm run build`