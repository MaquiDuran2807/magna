# Reporte Bloque 1 — Backend (F0 + F1)

## Resumen

Se ejecutaron 8 cambios en backend (F0: 3 bugs críticos, F1: 5 mejoras) +
actualización de tests y migración. Todos los tests existentes se actualizaron
para reflejar los breaking changes intencionales (RetrieveAPIView, nueva URL de
search, field `image`) y pasan correctamente (9/9).

## Archivos Modificados

| Archivo | Líneas antes | Líneas después | Δ neto |
|---------|-------------|----------------|--------|
| `blog/serializers.py` | 39 | 42 | +3 |
| `blog/views.py` | 45 | 48 | +3 |
| `blog/models.py` | 41 | 41 | 0 |
| `blog/urls.py` | 10 | 10 | 0 |
| `blog/tests.py` | 83 | 84 | +1 |
| `blog/migrations/0003_alter_blogpost_image_blog.py` | (nuevo) | — | — |

**Total:** ~7 líneas netas agregadas (sin contar migración generada por Django).

---

## F0 — Bugs Críticos

### B1 — Field name mismatch `image_blog` vs `image`

**Qué:** Los 3 serializers ahora exponen un field `image` (read-only, source=`image_blog`).

**Por qué:** El frontend TypeScript espera `image` en su tipo `Result`. Las
imágenes no se renderizaban porque el serializer devolvía `image_blog`.

**Impacto:** +6 líneas (3x `image = serializers.ImageField(...)`) + 3x `'image'` en `Meta.fields`.

### B2 — `BlogPostDetailApiView` cambió de `ListAPIView` a `RetrieveAPIView`

**Qué:** Hereda de `RetrieveAPIView`, usa `get_object()` con `get(id=id)`.

**Por qué:** Retornaba `[{...}]` (array con 1 elemento); ahora retorna objeto directo.

**Breaking change intencional:** Actualiza frontend (`blogDetail.tsx`) en Bloque 2.

### B3 — Ruta de búsqueda cambia a query param

**Qué:** URL pasa de `search/<str:search>/` a `search/?q=...`. Usa `AllBlogPostSerializer`.

**Por qué:** La ruta anterior se rompía con espacios/slashes. Además usaba `BlogPostSerializer` que incluía `comments` y `content` (pesado).

**Breaking change intencional:** Actualiza frontend en Bloque 2.

---

## F1 — Mejoras Backend

### BE1 — `CategorySerializer` fields explícitos

**Qué:** Cambia `fields = '__all__'` → `fields = ['id', 'name', 'image']`.

**Por qué:** DESIGN.md §12 requiere fields explícitos.

### BE2 — Upload path semántico

**Qué:** `upload_to='blog_images/'` (era `'comment_images'`).

**Por qué:** El path anterior no era semántico para imágenes de blog.

**Migración:** `0003_alter_blogpost_image_blog.py` aplicada.

### BE3 — `select_related` en todos los querysets

**Qué:** Agregado `.select_related('author', 'category')` en los 4 endpoints (lista, detalle, recientes, búsqueda).

**Por qué:** Elimina N+1 queries al precargar author y category.

### BE4 — Caché con `@cache_page`

**Qué:** `cache_page(60*5)` en lista y detalle; `cache_page(60*15)` en recientes. Search queda sin caché.

**Por qué:** Design.md §5.4 especifica TTL de caché. Search no se cachea porque depende del query param.

### BE5 — `Comment.__str__` truncado

**Qué:** `return self.text[:50]` (era `return self.text`).

**Por qué:** Textos largos desbordaban admin panel y logs.

---

## Tests

- 9 tests existentes (blog/tests.py): **9/9 OK**
- Tests actualizados:
  - Detail tests: `response.data` es objeto directo (no `response.data[0]`)
  - Search tests: URL cambia a `/blog/search/?q=...`
  - List test: agrega `assertIn('image', ...)` para verificar B1