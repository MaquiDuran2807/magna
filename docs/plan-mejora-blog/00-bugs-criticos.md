# Fase 0 — Bugs Críticos

## B1 — Field name mismatch: `image_blog` vs `image`

**Problema:** El serializer de Django usa `image_blog` como field name, pero
el frontend espera `image` en el TypeScript `Result`. Las imágenes nunca se
renderizan.

**Archivos:**
- `blog/serializers.py`
- `magna-page/page/src/types/blog.tsx`

**Solución:** Agregar `image = serializers.ImageField(source='image_blog', read_only=True)`
en los 3 serializers (`BlogPostSerializer`, `AllBlogPostSerializer`,
`ImportantBlogPostSerializer`) y mantener `image_blog` en `Meta.fields`.

Alternativa: renombrar el field del modelo a `image` mediante migración.

**Verificación:** Test existente `test_list_blog_posts` debe seguir pasando.
Agregar assertion que `'image' in response.data['results'][0]`.

---

## B2 — `BlogPostDetailApiView` usa `ListAPIView` en vez de `RetrieveAPIView`

**Problema:** Retorna `[{...}]` (array con 1 elemento) en vez de `{...}`.
El frontend accede con `blog[0]` como workaround.

**Archivos:**
- `blog/views.py` — `BlogPostDetailApiView`
- `magna-page/page/src/pages/blogDetail.tsx` — línea 31 accede `blog[0]`

**Solución:**
1. Cambiar a `RetrieveAPIView` con `get_object()` por `id`
2. Actualizar frontend: `blog` es objeto directo, no `blog[0]`
3. Actualizar tipo React: `useQuery<Result>` en vez de `useQuery<Result[]>`

**Verificación:** `test_blog_post_detail` en `blog/tests.py`.

---

## B3 — Ruta de búsqueda frágil y serializer ineficiente

**Problema:** `/blog/search/<str:search>/` se rompe con espacios, slashes.
Además usa `BlogPostSerializer` que incluye `comments` y `content` (pesado).

**Archivos:**
- `blog/urls.py` — línea 8
- `blog/views.py` — `BlogSearchApiView`
- `magna-page/page/src/api/blog.tsx` — `fetchBlogSearch`

**Solución:**
1. Cambiar URL a `path('search/', views.BlogSearchApiView.as_view())`
2. View usa `self.request.query_params.get('q', '')`
3. Usar `AllBlogPostSerializer` (sin comments ni content)
4. Frontend: `apiClient.get('/blog/search/', { params: { q: search } })`

**Verificación:** `test_blog_search` y `test_blog_search_no_results`.

---

## B4 — `useMutation` usado para GET (anti-patrón)

**Problema:** `api/blog.tsx` usa `useMutation` para consultar detalle de blog.
`useMutation` es para POST/PUT/DELETE.

**Archivos:**
- `magna-page/page/src/api/blog.tsx` — `useFetchBlog`
- `magna-page/page/src/pages/blogDetail.tsx` — consume `useFetchBlog`

**Solución:**
1. Reemplazar `useMutation` con función `fetchBlogDetail(id)` que retorna `Promise<Result>`
2. `blogDetail.tsx` usa `useQuery` normal:

```tsx
const { data: blog, isError, isLoading } = useQuery<Result>({
    queryKey: ['blogDetail', id],
    queryFn: () => fetchBlogDetail(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
});
```

**Verificación:** Blog detail debe cargar correctamente. Tests existentes
deben seguir pasando.

---

## B5 — Sin debounce en búsqueda

**Problema:** Cada keystroke en el search input dispara una llamada API.

**Archivos:**
- `magna-page/page/src/pages/blog.tsx` — `useEffect` del search (línea 34-42)
- `magna-page/page/src/components/search.tsx`

**Solución:**
1. Implementar debounce de 350ms antes de llamar a `setFilter`
2. Crear hook `useDebounce` simple:

```tsx
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}
```

3. `blog.tsx` usa `const debouncedFilter = useDebounce(filter, 350)` para el `useEffect`

**Verificación:** Red de desarrollador debe mostrar menos llamadas.
