# Fase 10 — Backend (Products API)

Archivos:

| Archivo | Ruta |
|---------|------|
| Serializers | `products/serializers.py` |
| Views | `products/views.py` |
| URLs | `products/urls.py` |
| Tests | `products/tests.py` |

Skills: `django-expert`, `django-security`

### Cambios

1. **Serializers**: fields explícitos (no `__all__`), ProductListSerializer ligero para grids
2. **Views**: paginación (12/page), ordering filter, search filter, `select_related('category')`
3. **Seguridad**: POST/PUT/DELETE solo con auth
4. **Eliminar código muerto**: CategoryCreate, ProductCreate, etc. (views sin URL)
5. **Tests**: agregar paginación, ordering, search, permisos

### Código clave

```python
class ProductList(generics.ListAPIView):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductListSerializer
    pagination_class = PageNumberPagination
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['name', 'price', 'rating']
    search_fields = ['name', 'brand', 'description']
```

### Tests

- [ ] `python manage.py test products` pasa (11+ tests)
- [ ] `GET /products/?page=1&page_size=5` funciona
- [ ] `GET /products/?ordering=-price` ordena
- [ ] `GET /products/?search=topo` busca
- [ ] Ningún serializer usa `__all__`
- [ ] POST sin auth retorna 401
