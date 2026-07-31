# Fase 1 — Backend

Requiere Fase 0 completa (los archivos se solapan).

## BE1 — `CategorySerializer` usa `fields = '__all__'`

**Archivo:** `blog/serializers.py:9`

**Problema:** DESIGN.md §12 dice "Serializers especifican `fields` explícitamente
(nunca `__all__` en producción)".

**Solución:** Cambiar a:

```python
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'image']
```

---

## BE2 — Upload path incorrecto

**Archivo:** `blog/models.py:21`

**Problema:** `upload_to='comment_images'` para imágenes de blog no es semántico.

**Solución:** Cambiar a `upload_to='blog_images/'`.

**Nota:** Esto aplica solo para nuevos uploads. Las imágenes existentes
en `media/comment_images/` mantienen su ruta actual. No requiere migración
de datos, solo de modelo.

---

## BE3 — Sin `select_related` → N+1 queries

**Archivo:** `blog/views.py:15,27,35,45`

**Problema:** Cada `BlogPost` en lista o sidebar hace queries adicionales
para `author` y `category`.

**Solución:** Agregar `.select_related('author', 'category')` en todos los
querysets:

```python
class BlogPostApiView(ListAPIView):
    queryset = BlogPost.objects.select_related('author', 'category').all()
    # ...

class BlogPostDetailApiView(RetrieveAPIView):
    queryset = BlogPost.objects.select_related('author', 'category').all()
    # ...

class BlogPostRecentApiView(ListAPIView):
    def get_queryset(self):
        return BlogPost.objects.select_related('author', 'category').filter(important=True).order_by('-date_posted')[:10]

class BlogSearchApiView(ListAPIView):
    def get_queryset(self):
        search = self.request.query_params.get('q', '')
        return BlogPost.objects.select_related('author', 'category').filter(title__icontains=search)
```

---

## BE4 — Sin caché

**Archivo:** `blog/views.py`

**Problema:** DESIGN.md §5.4 especifica TTL de caché para endpoints de blog
pero no está implementado.

**Solución:** Agregar `@method_decorators` con `@cache_page`:

```python
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

@method_decorator(cache_page(60 * 5), name='dispatch')
class BlogPostApiView(ListAPIView):
    # ...

@method_decorator(cache_page(60 * 5), name='dispatch')
class BlogPostDetailApiView(RetrieveAPIView):
    # ...

@method_decorator(cache_page(60 * 15), name='dispatch')
class BlogPostRecentApiView(ListAPIView):
    # ...
```

**Nota:** Search no debe cachearse (o con TTL muy bajo) porque depende del query.

---

## BE5 — `Comment.__str__` sin truncar

**Archivo:** `blog/models.py:41`

**Problema:** Si el texto es largo, admin panel y logs se desbordan.

**Solución:**

```python
def __str__(self):
    return self.text[:50]
```

---

## Migraciones

Después de BE1, BE2 y BE5 ejecutar:

```bash
python manage.py makemigrations blog
python manage.py migrate blog
```
