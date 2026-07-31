# Fase 2 — Frontend (Lógica y Estado)

Requiere Fase 0 bugs corregidos en backend. Contexto: archivos `.tsx` y `.ts`
dentro de `magna-page/page/src/`.

---

## F1 — Observer wrapper innecesario

**Archivos:** `pages/blog.tsx:100-108`, `pages/blogDetail.tsx:140-148`

**Problema:** `LazyBlog` y `LazyBlogDetailPage` envuelven el componente en
`useIntersectionObserver`. Como son páginas navegadas por router, el
`React.lazy()` ya hace code splitting. El observer posterga el render
innecesariamente.

**Solución:** Exportar el componente directamente (como hacen otras páginas
del proyecto). Remover todo el wrapper `LazyBlog` / `LazyBlogDetailPage`:

```tsx
// Antes:
export default function LazyBlog() {
    const { isVisible, ref } = useIntersectionObserver('100px');
    return (
        <div id="LazyBlog" ref={ref}>
            {isVisible ? <Blog/> : null}
        </div>
    );
}

// Después:
export default Blog;
```

**Archivo `main.tsx`:** No requiere cambios porque ya importa con
`React.lazy()`.

---

## F2 — Typo `setFilterBlogst`

**Archivo:** `pages/blog.tsx:18,39`

**Solución:** Renombrar a `setFilterBlogs`:

```diff
- const [filterBlogs, setFilterBlogst] = useState<Result[] | null>(null);
+ const [filterBlogs, setFilterBlogs] = useState<Result[] | null>(null);
```

---

## F3 — `return` sin valor

**Archivo:** `pages/blog.tsx:51-52`

**Problema:** `return` sin expresión retorna `undefined`, React no renderiza.

**Solución:**

```diff
  if (!data) {
-     return
+     return null;
  }
```

---

## F4 — `staleTime` y `refetchInterval` redundantes

**Archivo:** `pages/blog.tsx:26`, `pages/blogDetail.tsx:21`

**Problema:** Ambos con 30 min. `refetchInterval` forza polling innecesario.

**Solución:** Dejar solo `staleTime`:

```diff
- staleTime: 1000*60*30, refetchOnWindowFocus: false, refetchInterval: 1000*60*30,
+ staleTime: 1000*60*30, refetchOnWindowFocus: false,
```

---

## F5 — `refetch()` duplicado en blogDetail

**Archivo:** `pages/blogDetail.tsx:25-27`

**Problema:** `useEffect` con `refetch()` en cada cambio de `id` — pero
`useQuery` ya refetch automático al cambiar `queryKey`.

**Solución:** Eliminar el `useEffect` completo:

```diff
- useEffect(() => {
-     refetch();
- }, [id]);
```

---

## F6 — Fecha duplicada en blogDetail

**Archivo:** `pages/blogDetail.tsx:127`

**Problema:** `{new Date(blogDetail.date_posted).toDateString()}` se muestra
línea 82 y línea 127.

**Solución:** Eliminar el bloque duplicado (líneas 126-128).

---

## F7 — Comentarios sobrantes

**Archivo:** `pages/blogDetail.tsx:55,131`

**Solución:** Eliminar líneas comentadas.

---

## F8 — `description.slice()` crash si null

**Archivo:** `components/blogCards.tsx:29,70`

**Problema:** `blog.description.slice(0, 200)` lanza error si `description`
es `null` (nullable en modelo).

**Solución:**

```diff
- <p className="card-text">{blog.description.slice(0, 200)}...</p>
+ <p className="card-text">{blog.description?.slice(0, 200) ?? ''}...</p>
```

---

## F9 — Helmet duplicado en layout

**Archivo:** `layouts/blogLayout.tsx:25-28`

**Problema:** `<Helmet>` en layout pisa meta tags de pages hijas (react-helmet-async
usa el último Helmet renderizado, y el layout envuelve a las pages).

**Solución:** Eliminar el bloque `<Helmet>` del layout. Dejar title/description
solo en `pages/blog.tsx` y `pages/blogDetail.tsx`.

---

## F10 — Inline styles en sidebar

**Archivo:** `components/sidebarBolgs.tsx:30`

**Solución:** Mover a CSS:

```css
.sidebar-thumb {
    width: 120px;
    border-radius: 10px;
}
```

```diff
- <img src={blog.image} alt={blog.title} style={{width:"120px",borderRadius:"10px"}} />
+ <img src={blog.image} alt={blog.title} className="sidebar-thumb" />
```

---

## F11 — `blog.author.last_name` inseguro

**Archivo:** `components/sidebarBolgs.tsx:34`

**Problema:** Si `author` o `last_name` son null/undefined, crashea.

**Solución:**

```diff
- <p className='text-white'>Autor: {blog.author.last_name}</p>
+ <p className='text-white'>Autor: {blog.author?.last_name ?? ''}</p>
```

---

## F12 — Errores silenciados en API layer

**Archivo:** `api/blog.tsx:37-39,48-50,61-63`

**Problema:** Los `catch` retornan `undefined` silenciosamente. El frontend
no puede distinguir "sin datos" de "error de red".

**Solución:** Propagar el error para que `react-query` lo capture:

```typescript
export const fetchNextBlogs = async (pageParam: any) => {
    const response = await apiClient.get<BlogMagna>(`/blog/?page=${pageParam}`);
    const nextPage = response.data.next;
    const blogs = response.data.results;
    return { nextPage, blogs };
};
```

Si se quiere manejo de error local, retornar estructura predecible:

```typescript
export const fetchBlogSearch = async (search: string): Promise<Result[]> => {
    const response = await apiClient.get<Result[]>('/blog/search/', { params: { q: search } });
    return response.data;
};
```

(Quitar try/catch que traga errores, dejar que react-query maneje el error
state.)
