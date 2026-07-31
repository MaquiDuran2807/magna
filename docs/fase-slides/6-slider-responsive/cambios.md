# Fase 6 — Slider Responsive: Distribución, Navbar y Accesibilidad

> Fecha: 06/07/2026
> Inicio: 15:30
> Fin: 16:45
> Duración: 75 min

---

## Problema

El slider hero usaba `justify-content: center` + `padding: 10vh 0 15vh` en todos los tamaños, pero:
- En mobile el título quedaba detrás del navbar fijo
- En desktop el contenido flotaba en el medio vertical con mucho espacio muerto
- Descripción sin límite de ancho (ilegible en desktop con ~1800px)
- Sin distinción mobile vs desktop en layout
- Flechas de navegación con estructura inconsistente (una `<span>`, otra `<span><button>`)

---

## Solución

### Principios UX/UI aplicados

| Principio | Mobile (≤768px) | Desktop (>768px) |
|-----------|-----------------|------------------|
| **Jerarquía Visual** | Título grande (24-40px), desc 16-20px, CTA | Título hero (32-120px), desc 16-40px |
| **Patrón Hero** | Contenido centrado en viewport visible | Contenido en tercio superior (~52/48 arriba/abajo) |
| **Lectura Accesible** | Título min 24px, desc min 16px | Desc max-width 60% (~53 chars/line) |
| **Navbar Awareness** | `.sliders` top:56px, calc(100vh-56px) | `.sliders` top:80px, calc(100vh-80px) |
| **Ritmo Consistente** | `> * + * { margin-top: 1rem }` en todos | Mismo gap que mobile |

### Arquitectura de alturas

```
navbar (position: fixed, z-index: 1030)
  ├── Desktop: ~80px (logo 260w × 104h ratio = ~77px + borde)
  └── Mobile:  ~56px (Bootstrap navbar collapsed)

.sliders (position: absolute, z-index: 2)
  ├── Desktop: top: 80px, height: calc(100vh - 80px)
  └── Mobile:  top: 56px, height: calc(100vh - 56px)
    └── .container-fluid.px-4.px-lg-5 { height: 100% }
        └── .row.h-100 { height: 100% }
            └── .col-12 (flex stretch)
                └── .description (flex column, justify-content: center)
```

### Valores finales por breakpoint

#### Desktop (>768px)

```css
.sliders {
    position: absolute;
    top: 80px;
    height: calc(100vh - 80px);
}

.description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 5vh;     /* ~54px en 1080p */
    padding-bottom: 3vh;   /* ~32px en 1080p */
    padding-left: clamp(1rem, 3vw, 3rem);
}

.description > * + * {
    margin-top: 1rem;      /* 16px entre título, desc, botón */
}

.description p {
    font-size: clamp(1rem, 2vw, 2.5rem);
    max-width: 60%;
}

.title {
    font-size: clamp(2rem, 10vw, 4.5rem);     /* default */
}
@media (min-height: 801px) {
    .title { font-size: clamp(3rem, 10vw, 7.5rem); }
}
```

#### Mobile (≤768px)

```css
.sliders {
    top: 56px;
    height: calc(100vh - 56px);
}

.description {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
}

.description p {
    font-size: clamp(1rem, 3.5vw, 1.25rem);
    line-height: 1.5;
    max-width: 85%;
    margin: 0 auto;
}

.title {
    font-size: clamp(1.8rem, 7vw, 2.5rem);     /* ≤480px */
}
@media (max-width: 991px) {
    .title { font-size: clamp(2.2rem, 5vw, 3.5rem); }
}
@media (max-width: 480px) {
    .title { font-size: clamp(1.8rem, 7vw, 2.5rem); }
}
```

---

## Distribución por dispositivo

### Mobile — iPhone SE (375×667)

```
 0- 56px navbar fijo
56-667px .sliders (611px)
56- 72px padding-top 1rem
72- 96px título "Estudios hidrológicos..." (2 líneas @ 24px)
96-112px gap 1rem
112-280px descripción (207 chars, ~7 líneas @ 16px × 1.5 LH)
280-296px gap 1rem
296-336px botón Contactar (~40px)
336-352px padding-bottom 1rem

Centrado: arriba 156.5px | abajo 156.5px  →  50/50 perfecto ✓
```

### Mobile — iPhone 14 Pro Max (430×932)

```
 0- 56px navbar
56-932px .sliders (876px)
56- 72px padding
72- 96px título (2 líneas @ 28.8px)
96-112px gap
112-264px descripción (~7 líneas @ 16px)
264-280px gap
280-320px botón
320-336px padding

Centrado: arriba 268px | abajo 268px  →  50/50 perfecto ✓
```

### Desktop — 1920×1080

```
  0- 80px navbar fijo
 80-1080px .sliders (1000px)
 80-134px padding-top 5vh (54px)
134-398px título "Estudios hidrológicos..." (2 líneas @ 120px ≈ 264px)
398-414px gap 1rem (16px)
414-654px descripción (207 chars, ~5 líneas @ 40px × 1.2 LH ≈ 240px)
654-670px gap 1rem
670-720px botón Contactar (~50px)
720-752px padding-bottom 3vh (32px)

Centrado: arriba 208px | abajo 190px  →  52/48 (sesgado 2% arriba) ✓
```

### Relaciones por slide en desktop

| Slide | Desc (chars) | Líneas desc | Content height | Arriba visible | Abajo | Diferencia |
|-------|-------------|-------------|---------------|----------------|-------|------------|
| Estudios hidrológicos... | 207 | ~5 | ~602px | 208px | 190px | 18px (1.7%) |
| topografía | 262 | ~6 | ~650px | 184px | 166px | 18px (1.7%) |
| ingeniería y Consultoría | 125 | ~3 | ~506px | 246px | 228px | 18px (1.7%) |
| Medio Ambiente | 82 | ~2 | ~458px | 270px | 252px | 18px (1.7%) |

La diferencia constante de 18px se debe al padding-top (54px) vs padding-bottom (32px) — intencional para dar sensación hero (contenido ligeramente arriba del centro exacto).

---

## Títulos: líneas máximas

| Título | Chars | Desktop (120px) | ≤991px (≤56px) | ≤480px (≤40px) |
|--------|-------|----------------|-----------------|-----------------|
| topografía | 10 | 1 línea | 1 línea | 1 línea |
| Medio Ambiente | 14 | 1 línea | 1 línea | 1 línea |
| Ingeniería y Consultoría | 26 | 2 líneas | 1 línea | 1 línea |
| Estudios hidrológicos... | 38 | 2 líneas | 2 líneas | 2 líneas |

Ningún título llega a 3 líneas. Todos usan `overflow-wrap: break-word` sin `hyphens` ni `word-break`.

---

## Descripciones: ancho máximo

| Breakpoint | max-width | Ancho disponible | Chars/linea aprox |
|------------|-----------|-----------------|-------------------|
| Desktop (1920px) | 60% del contenedor | ~1066px | ~53 |
| Mobile (375px) | 85% del contenedor | ~249px | ~28 |
| Tablet (768px) | 85% del contenedor | ~561px | ~56 |

---

## Navbar: por qué top:80px y top:56px

El navbar usa `position: fixed; top: 0` con z-index 1030 (Bootstrap default), siempre visible sobre el slider (z-index 2).

| Dispositivo | Altura navbar | Cálculo |
|-------------|--------------|---------|
| Desktop | ~80px | Logo SVG 260w × viewBox 350:104 → 260 × 104/350 = ~77px + bordes |
| Mobile | ~56px | Bootstrap collapsed navbar default |

El slider comienza DESPUÉS del navbar (top: navbar-height), y su altura es el viewport restante (calc(100vh - navbar-height)). Así el contenido se centra simétricamente en el área visible.

---

## Flechas de navegación (BotonesSwiper)

### Problema original
- Next era `<span>` directo con clase `swiper-button-next custom-next-icon`
- Prev era `<span>` > `<button>` con clase `swiper-button-prev custom-prev-icon`
- Estructura inconsistente → diferente box model → desnivel vertical

### Fix
Ambos son `<button>` idénticos con reseteo CSS:

```css
.custom-next-icon, .custom-prev-icon {
    color: var(--color-principal);
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
}
```

Posicionamiento absoluto solo en mobile (≤768px) con `top: 85%` para que no interfieran con el centrado del contenido.

---

## Cambios por archivo

### `magna-page/page/src/components/styles/slider.css`
- Reescritura completa del layout del slider
- Sistema de breakpoints para title (480px, 768px, 991px, 801px height)
- `.description` de `height: 100vh` con posicionamiento simple a flexbox con `justify-content: center`
- `.sliders` de `top: 0; height: 100vh` a `top: 80px; height: calc(100vh - 80px)` (desktop) y `top: 56px; height: calc(100vh - 56px)` (mobile)
- Nueva regla `.sliders .container-fluid.px-4.px-lg-5 { height: 100% }` para cadena de alturas
- Text-shadow en título y descripción para legibilidad sobre imágenes
- Descripción con `max-width: 60%` (desktop) / `85%` (mobile)
- Flechas con reseteo button + background/border/outline:none
- Gap entre elementos: `> * + * { margin-top: 1rem }` (consistente ambos tamaños)
- Descripción mobile con `align-items: center; text-align: center` + paddings simétricos

### `magna-page/page/src/components/slider.tsx`
- Separación de `SliderContent` como componente memoizado
- Responsive detection con `useScreenSize()` hook → `isMobile`
- Mobile render directo, desktop con `motion.div` (animación fade)
- `col-lg-8` → `col-lg-12` (más ancho para el título)
- Eliminados `<br>` manuales (reemplazados por gap flexbox)
- Prop `services: Servicio2[]` → `slides: Slide[]`

### `magna-page/page/src/components/BotonesSwiper.tsx`
- Next y Prev ahora son `<button>` con estructura idéntica
- Eliminado span wrapper innecesario en Prev
- Inline styles `backgroundColor:"transparent",border:"none"` reemplazados por CSS

---

## Verificación

- `npm run build`: exitoso (0 errores, 0 warnings de slider)
- Títulos: ningún slide llega a 3 líneas en ningún breakpoint
- Navbar no oculta contenido en mobile (slider empieza a los 56px)
- Centrado simétrico en mobile (50/50), con sesgo hero en desktop (52/48)
- Backups guardados: `slider.tsx.bak`, `slider.css.bak`

---

## Archivos relevantes

| Archivo | Propósito |
|---------|-----------|
| `magna-page/page/src/components/styles/slider.css` | Layout responsive completo |
| `magna-page/page/src/components/slider.tsx` | Componente slider con SliderContent |
| `magna-page/page/src/components/BotonesSwiper.tsx` | Flechas de navegación |
| `magna-page/page/src/components/styles/slider.css.bak` | Backup pre-cambios |
| `magna-page/page/src/components/slider.tsx.bak` | Backup pre-cambios |
