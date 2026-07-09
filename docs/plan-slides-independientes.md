# Plan: Slides Independientes + Optimización de Imágenes

> Proyecto: Magna Ingeniería y Topografía
> Fecha inicio: 06/07/2026
> Autor: Sistema de documentación automatizada

---

## Reglas de Documentación

### 1. Cada cambio debe documentar:
- **Qué se cambió** (archivo, línea, función)
- **Por qué se cambió** (problema raíz, no síntoma)
- **Cómo se verificó** (test, build, revisión manual)
- **Impacto** (líneas +/-, rendimiento, seguridad, mantenibilidad)

### 2. Reglas de código:
- Todo código nuevo debe tener type hints (Python) o TypeScript (Frontend)
- No comentarios superfluos — el código debe ser auto-documentado
- Nombres de variables/funciones en español (consistente con el proyecto)
- Cada función debe tener una sola responsabilidad
- Los modelos nuevos deben tener `__str__` y `Meta.ordering`
- Los serializers nuevos deben especificar `fields` explícitamente (nunca `__all__` en producción)

### 3. Medición de tiempo:
- Cada subfase registra `inicio` y `fin` con timestamp
- Al final del documento se acumula el tiempo total
- Se mide el tiempo real de desarrollo, no el tiempo de reflexión

### 4. Medición de impacto:
- `git diff --stat` antes/después de cada subfase
- Líneas agregadas (`+`) y eliminadas (`-`) por archivo
- Impacto en eficiencia (DB queries, bundle size, carga de red)
- Impacto en profesionalismo (tests, tipos, documentación)

---

## Problema

### Contexto

El modelo `Servicio` sirve como fuente de datos para **dos propósitos distintos**:

1. **Hero Slider** (`slider.tsx`) — cada Servicio = 1 slide con imagen de fondo, título y descripción
2. **Sección Servicios** (`Servicios.tsx`) — cada Servicio = 1 tarjeta de servicio con icono, nombre y descripción

Esto significa que **no se puede agregar un slide sin crear también un servicio**, lo cual es incorrecto cuando se quiere promocionar un sub-servicio (como "Hidrología") que ya existe dentro de otro servicio.

### Estado actual de la BD

```
Servicios (tabla: servicios_servicio)
├── id=1  | topografía          | imagen_tablet: ✅ | imagen_celular: ✅
├── id=2  | Medio Ambiente      | imagen_tablet: ❌ | imagen_celular: ❌
└── id=3  | ingeniería y Consultoría | imagen_tablet: ❌ | imagen_celular: ❌

SubServicios: 23 registros, ~50% sin imagen_tablet/imagen_celular
```

### Imágenes responsivas

Existen los campos `imagen_tablet` e `imagen_celular` en `Servicio` y `SubServicio`, pero:
- Solo el Servicio "topografía" tiene variantes generadas
- Los demás están vacíos porque el `save()` solo corre al subir una imagen nueva
- No hay manera de regenerar variantes para registros existentes

---

## Solución: Arquitectura

### Modelo nuevo: `Slide`

```
Slide (modelo independiente)
├── nombre         → Título del slide
├── descripcion    → Texto del slide
├── imagen         → Imagen desktop (original)
├── imagen_tablet  → Variante tablet (75%)
├── imagen_celular → Variante móvil (50%)
├── activo         → Booleano: mostrar/ocultar
├── orden          → Posición en el carrusel
├── created_at     → Timestamp creación
└── updated_at     → Timestamp actualización
```

### Endpoint combinado

`GET /servicios/slides/` → Devuelve array unificado:
```json
[
  { "tipo": "servicio", "id": 1, "nombre": "topografía", ... },
  { "tipo": "servicio", "id": 2, "nombre": "Medio Ambiente", ... },
  { "tipo": "servicio", "id": 3, "nombre": "ingeniería y Consultoría", ... },
  { "tipo": "slide", "id": 1, "nombre": "Hidrología", ... }
]
```

El frontend recibe una estructura homogénea y no necesita saber si viene de `Servicio` o `Slide`.

### Frontend slider

- No requiere cambios estructurales
- Solo apunta al nuevo endpoint combinado
- El tipo `Servicio2` se actualiza para incluir `tipo` opcional

---

## Fases de Implementación

### [Fase 1](/docs/fase-slides/1-generate-variants/) — Script de variantes de imagen
### [Fase 2](/docs/fase-slides/2-modelo-slide/) — Modelo Slide + migración + admin
### [Fase 3](/docs/fase-slides/3-endpoint-combinado/) — Endpoint /slides/ + serializers
### [Fase 4](/docs/fase-slides/4-frontend-unificado/) — Frontend: tipos + API + slider unificado
### [Fase 5](/docs/fase-slides/5-refactor-save/) — Refactor save() a utility reutilizable
### [Fase 6](/docs/fase-slides/6-orden-slide/) — Orden explícito en Servicio + Slide

---

## Principios de Diseño

| Principio | Aplicación |
|-----------|-----------|
| **Independencia** | Slide no hereda de Servicio ni depende de él |
| **Atomicidad** | Cada fase produce un cambio que no rompe el sistema |
| **Backward compatibility** | El endpoint antiguo `/servicios-and-subservicios/` sigue funcionando |
| **Progressive enhancement** | El slider muestra slides aunque no haya `Slide` en la BD (solo Servicios) |
| **Mantenibilidad** | Lógica de procesamiento de imágenes extraída a utility compartido |

---

## Línea base (antes de empezar)

```
Backend tests: python manage.py test
Frontend build: npm run build (magna-page/page/)
Base de datos: SQLite (db.sqlite3) con 3 Servicios + 23 SubServicios
```
