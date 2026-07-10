# Fase 6 — Tests

Archivo objetivo: `blog/tests.py`

Requiere F0 y F1 completados (los tests validan fixes).

---

## T1 — Search con caracteres especiales

Agregar después de `test_blog_search_no_results`:

```python
def test_blog_search_special_chars(self):
    """Búsqueda con espacios y caracteres especiales debe funcionar"""
    response = self.client.get('/blog/search/?q=estación+total')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertGreaterEqual(len(response.data), 1)
```

---

## T2 — Detail con ID inexistente (404)

```python
def test_blog_detail_not_found(self):
    """ID inexistente debe retornar 404"""
    response = self.client.get('/blog/9999/')
    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
```

**Nota:** Este test solo pasa después del fix B2 (cambio a `RetrieveAPIView`
que naturalmente retorna 404 si no existe).

---

## T3 — Verificar field name `image`

```python
def test_blog_post_has_image_field(self):
    """El serializer debe exponer el campo como 'image', no 'image_blog'"""
    response = self.client.get(f'/blog/{self.post.id}/')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertIn('image', response.data)
    # También verificar que 'image_blog' no está presente
    self.assertNotIn('image_blog', response.data)
```

**Nota:** Este test solo pasa después del fix B1.

---

## T4 — Verificar N+1 no ocurre

```python
def test_blog_list_query_count(self):
    """Lista de blogs debe hacer queries óptimas (select_related)"""
    # Crear datos adicionales
    cat2 = Category.objects.create(name='Geodesia')
    BlogPost.objects.create(
        title='Post con categoría',
        description='Test',
        content='<p>Content</p>',
        author=self.author,
        important=False,
        category=cat2,
    )
    # 1 query para count + 1 query para datos con select_related
    with self.assertNumQueries(3):
        response = self.client.get('/blog/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
```

**Nota:** El número exacto de queries puede variar según configuración de
Django. Ajustar si es necesario.

---

## T5 — Blog detail con datos completos

```python
def test_blog_detail_full_data(self):
    """Detail debe incluir todos los campos esperados"""
    response = self.client.get(f'/blog/{self.post.id}/')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertIn('id', response.data)
    self.assertIn('title', response.data)
    self.assertIn('description', response.data)
    self.assertIn('content', response.data)
    self.assertIn('image', response.data)
    self.assertIn('date_posted', response.data)
    self.assertIn('important', response.data)
    self.assertIn('author', response.data)
    self.assertIn('category', response.data)
    self.assertIn('comments', response.data)
```

---

## T6 — Sidebar solo retorna importantes

```python
def test_sidebar_only_important(self):
    """Sidebar debe filtrar solo posts marcados como important=True"""
    # Ya existe test_blog_post_recent_only_important que cubre esto
    pass  # OK, cubierto
```

---

## Resumen de tests existentes + nuevos

| Test | Estado | Fase dep |
|------|--------|----------|
| `test_list_blog_posts` | Existente | — |
| `test_blog_post_detail` | Existente (modificar para B2) | F0 |
| `test_blog_post_recent` | Existente | — |
| `test_blog_post_recent_only_important` | Existente | — |
| `test_blog_search` | Existente (modificar para B3) | F0 |
| `test_blog_search_no_results` | Existente | — |
| `test_blog_post_has_author_info` | Existente | — |
| `test_blog_post_has_category_info` | Existente | — |
| `test_blog_pagination_size` | Existente | — |
| `test_blog_search_special_chars` | **Nuevo** | F0 |
| `test_blog_detail_not_found` | **Nuevo** | F0 (B2) |
| `test_blog_post_has_image_field` | **Nuevo** | F0 (B1) |
| `test_blog_list_query_count` | **Nuevo** | F1 (BE3) |
| `test_blog_detail_full_data` | **Nuevo** | F0 (B2) |

```bash
# Ejecutar todos los tests del blog
python manage.py test blog
```
