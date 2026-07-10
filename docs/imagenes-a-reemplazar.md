# Imágenes de SubServicios — Diagnóstico y Reemplazo

El carrusel de servicios renderiza las imágenes de cada SubServicio en un
contenedor de ~**1548x1083px** en desktop (70vw). Para verse nítidas, las
imágenes deben tener al menos **2000px de ancho** (ideal 2400px) en orientación
**horizontal** (ratio 1.5:1 a 2:1, es decir, más ancho que alto).

---

## Grupo 1 — Sin imagen FULL (12 subservicios)

El archivo físico fue eliminado del disco. Solo existen las variantes
tablet/celular, que son demasiado pequeñas. **Crear imagen nueva ≥ 2000x1500px.**

| Servicio | SubServicio | Archivo faltante |
|----------|-------------|-----------------|
| topografía | Replanteo y control de obras civiles | `replanteo.jpg` |
| topografía | Deslinde y amojonamiento de predios | `107752288.png` |
| ingeniería y Consultoría | Estudios Geológicos y Geotécnicos | `geo.png` |
| ingeniería y Consultoría | Construcción de obras civiles | `obras-civiles-scaled.jpg` |
| ingeniería y Consultoría | Presupuestos de obra | `Elaborando_el_Presupuesto_de_Obra.jpg` |
| Medio Ambiente | Planes, programas y proyectos de manejo ambiental | `Imagen_de_WhatsApp_2024-05-24_a_las_13.19.42_d9a4209a.jpg` |
| Medio Ambiente | Caracterización y monitoreo de aguas y residuos sólidos | `OIP_2.jpeg` |
| Medio Ambiente | Monitoreo de Fauna y Flora | `banner-planes-de-manejo-ambiental-001_owU2zCV.jpg` |
| Medio Ambiente | Auditoria e interventoría | `R_1.jpeg` |
| Medio Ambiente | Monitoreo de calidad de aire y ruido | `OIP_4.jpeg` |
| Medio Ambiente | Asesoría en sistemas de gestión NTC- ISO 14001, ISO 9001 y 45001 | `CO-22-10-LANDING-FOTO-01.jpg` |
| topografía | Levantamientos Lidar | `OldGrowthForest_LiDAR.jpg` |

---

## Grupo 2 — Imagen existe pero muy pequeña (3 subservicios)

La imagen full existe pero es demasiado angosta o de baja resolución.
Se ve pixelada al escalarla al tamaño del carrusel.
**Reemplazar con imagen ≥ 2000x1500px.**

| Servicio | SubServicio | Actual | Problema |
|----------|-------------|--------|----------|
| topografía | Georreferenciación de puntos geodésicos | **506×900px** (ratio 0.56) | Ancho insuficiente (necesita 3× zoom). Además es retrato (vertical), se corta mal. |
| topografía | Levantamientos topográficos según normativa IGAC | **599×900px** (ratio 0.67) | Ancho insuficiente (necesita 2× zoom). También es casi retrato. |
| topografía | Topobatimetría | **675×900px** (ratio 0.75) | Ancho insuficiente (necesita 2× zoom). Ligeramente retrato. |

---

## Grupo 3 — Imagen existe con dimensiones aceptables pero podrían mejorar (8 subservicios)

La imagen full existe pero el alto (900px) es menor que el contenedor
(~1083px). Se ven correctas con `object-fit: contain`, pero para que
aprovechen todo el espacio sin fondos negros laterales convendría
reemplazarlas por versiones más anchas.

| Servicio | SubServicio | Actual | Recomendado |
|----------|-------------|--------|-------------|
| ingeniería y Consultoría | diseño geométrico de vías | 1474×900px | ≥ 2000×1300px |
| Medio Ambiente | Trámites y permisos ambientales | 1221×900px | ≥ 2000×1300px |
| ingeniería y Consultoría | Control de obras | 1947×900px | ≥ 2000×1300px |
| Medio Ambiente | Estudios de impacto ambiental | 1350×900px | ≥ 2000×1300px |
| topografía | Cálculos de movimiento de tierra | 1663×900px | ≥ 2000×1300px |
| ingeniería y Consultoría | Estudios hidrológicos e hidráulicos | 1440×900px | ≥ 2000×1300px |
| topografía | Nivelaciones de precisión | 1600×900px | ≥ 2000×1300px |
| topografía | fotogrametría | 1350×900px | ≥ 2000×1300px |

---

## Especificaciones para imágenes nuevas

| Propiedad | Valor |
|-----------|-------|
| **Ancho mínimo** | 2000px (ideal 2400px) |
| **Alto mínimo** | 1300px (ideal 1500px) |
| **Relación de aspecto** | 1.5:1 a 2:1 (horizontal, más ancho que alto) |
| **Formato** | JPG o PNG (el backend convierte a WebP automáticamente) |
| **Calidad** | Sin compresión excesiva (archivo ≥ 200KB idealmente) |
| **Contenido** | Representativo del subservicio (topografía, ingeniería, medio ambiente) |

## Cómo reemplazar

1. Crear o buscar imagen con las especificaciones de arriba
2. Ir al admin de Django: `/admin/servicios/subservicio/`
3. Buscar el SubServicio por nombre
4. En el campo **Imagen**, seleccionar el archivo nuevo y guardar
5. El backend automaticamente:
   - Redimensiona a 1600px de alto (WebP, calidad 90)
   - Genera variante tablet (70%) y celular (50%)
   - Elimina la imagen anterior
