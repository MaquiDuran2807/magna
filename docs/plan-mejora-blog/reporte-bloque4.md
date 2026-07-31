# Reporte Bloque 4 — Tests (F6)

## Resumen

Se agregaron 5 nuevos tests (T1–T5) según `06-testing.md`. 9 tests existentes se mantienen sin cambios. Se corrigieron 3 issues descubiertos durante la ejecución: vista `get_object` sin manejo de 404, field `image_blog` residual en serializers, y cache冲突 entre tests. **14/14 tests OK**.

## Archivos Modificados

| Archivo | Líneas antes | Líneas después | Δ neto |
|---------|-------------|----------------|--------|
| `blog/tests.py` | 84 | 132 | +48 |
| `blog/views.py` | 48 | 49 | +1 |
| `blog/serializers.py` | 42 | 39 | -3 |

**Total:** +46 líneas netas.

---

## Nuevos Tests (F6)

### T1 — `test_blog_search_special_chars`

**Archivo:** `blog/tests.py:65-69`

**Qué:** Búsqueda con espacios y caracteres especiales (`estación+total`). Verifica que la URL con query params maneja correctamente URL-encoding.

### T2 — `test_blog_detail_not_found`

**Archivo:** `blog/tests.py:71-74`

**Qué:** ID inexistente (9999) debe retornar 404.

**Fix requerido en vista:** El `get_object()` original usaba `.get()` directamente, lanzando `BlogPost.DoesNotExist` (error 500). Se cambió a `get_object_or_404()`.

**Impacto:** `blog/views.py:30` — ahora retorna HTTP 404 correctamente.

### T3 — `test_blog_post_has_image_field`

**Archivo:** `blog/tests.py:76-81`

**Qué:** Verifica que el serializer expone `image` y **no** `image_blog`.

**Fix requerido en serializers:** `BlogPostSerializer`, `AllBlogPostSerializer` e `ImportantBlogPostSerializer` incluían `'image_blog'` en `Meta.fields` además del field `image` con `source='image_blog'`. El field extra era redundante y contaminaba la respuesta.

**Impacto:** `blog/serializers.py:25,34,41` — Se eliminó `'image_blog'` de los 3 serializers (-3 líneas).

### T4 — `test_blog_list_query_count`

**Archivo:** `blog/tests.py:83-96`

**Qué:** Verifica que la lista de blogs no excede 2 queries (1 count + 1 select_related). El plan original sugería 3; `select_related` en la vista resulta en solo 2 queries.

### T5 — `test_blog_detail_full_data`

**Archivo:** `blog/tests.py:98-111`

**Qué:** Verifica que el detail retorna todos los campos esperados (id, title, description, content, image, date_posted, important, author, category, comments).

---

## Tests Existentes (9)

| Test | Estado | Verifica |
|------|--------|----------|
| `test_list_blog_posts` | ✅ OK | Lista con paginación + field `image` |
| `test_blog_post_detail` | ✅ OK | Detail retorna título correcto |
| `test_blog_post_recent` | ✅ OK | Sidebar retorna posts |
| `test_blog_post_recent_only_important` | ✅ OK | Sidebar filtra `important=True` |
| `test_blog_search` | ✅ OK | Búsqueda con query param `q` |
| `test_blog_search_no_results` | ✅ OK | Búsqueda sin resultados retorna `[]` |
| `test_blog_post_has_author_info` | ✅ OK | Detail incluye author con email |
| `test_blog_post_has_category_info` | ✅ OK | Detail incluye category con nombre |
| `test_blog_pagination_size` | ✅ OK | Paginación a 5 por página |

---

## Fixes Adicionales Descubiertos

### Fix 1 — `get_object` sin 404

**Archivo:** `blog/views.py:30`

**Problema:** `BlogPost.objects.get(id=id)` lanza `DoesNotExist` no capturado → error 500 en lugar de 404.

**Solución:** `get_object_or_404(BlogPost.objects.select_related(...), id=id)`.

**Dependencia:** F0 (B2) — El cambio a `RetrieveAPIView` se hizo en Bloque 1 pero el `get_object` custom no usaba `get_object_or_404`.

### Fix 2 — `image_blog` residual en serializers

**Archivo:** `blog/serializers.py:25,34,41`

**Problema:** Bloque 1 agregó `image` field con `source='image_blog'` pero no eliminó `'image_blog'` de `Meta.fields`, dejando ambos campos en la respuesta.

**Solución:** Eliminar `'image_blog'` de los 3 serializers.

**Dependencia:** F0 (B1) — Incompleto en Bloque 1.

### Fix 3 — Cache collision entre tests

**Archivo:** `blog/tests.py:7`

**Problema:** `@cache_page` en `BlogPostApiView` cachea respuestas entre tests. El nuevo `test_blog_list_query_count` (solo 2 posts) escribía en caché, y `test_blog_pagination_size` recibía la respuesta cacheada con 2 posts en vez de 11.

**Solución:** `@override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache'}})` en la clase de tests.

---

## Estado Post-Bloque 4

- **Tests**: 14/14 OK (9 existentes + 5 nuevos)
- **Views**: +1 línea (`get_object_or_404`)
- **Serializers**: -3 líneas (eliminado `image_blog` redundante)
- **Tests.py**: +48 líneas (5 nuevos tests + override_settings + imports)
- **Pendiente**: Ninguno. Plan de mejora de blog completado.
