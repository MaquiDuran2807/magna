# Fase 4 — SEO

Contexto: `pages/blog.tsx`, `pages/blogDetail.tsx`, archivos de sitemap.

---

## S1 — Open Graph Tags

### Blog Listing (`pages/blog.tsx`)

Agregar dentro de `<Helmet>`:

```tsx
<meta property="og:title" content="Blog | Magna Ingeniería y Topografía" />
<meta property="og:description" content="Blog de Magna Ingeniería y Topografía — Artículos, noticias y novedades del sector." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://magnaingenieria.com/blog" />
<meta property="og:image" content="https://magnaingenieria.com/static/assets/img/app/fondoblog2.webp" />
```

### Blog Detail (`pages/blogDetail.tsx`)

Agregar dentro de `<Helmet>`:

```tsx
<meta property="og:title" content={`${blogDetail.title} | Magna Ingeniería y Topografía`} />
<meta property="og:description" content={blogDetail.description ?? ''} />
<meta property="og:image" content={blogDetail.image} />
<meta property="og:type" content="article" />
<meta property="og:url" content={`https://magnaingenieria.com/blog/${blogDetail.id}`} />
<meta property="article:published_time" content={blogDetail.date_posted} />
<meta property="article:author" content={`${blogDetail.author.first_name} ${blogDetail.author.last_name}`} />
<meta property="article:section" content={blogDetail.category.name} />
```

---

## S2 — Twitter Cards

### Blog Listing:

```tsx
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Blog | Magna Ingeniería y Topografía" />
<meta name="twitter:description" content="Artículos, noticias y novedades del sector." />
```

### Blog Detail:

```tsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={`${blogDetail.title} | Magna`} />
<meta name="twitter:description" content={blogDetail.description ?? ''} />
<meta name="twitter:image" content={blogDetail.image} />
```

---

## S3 — JSON-LD Structured Data (Blog Detail)

Agregar dentro del return de `BlogDetailPage`:

```tsx
<script type="application/ld+json">
    {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogDetail.title,
        "description": blogDetail.description,
        "image": blogDetail.image,
        "datePublished": blogDetail.date_posted,
        "author": {
            "@type": "Person",
            "name": `${blogDetail.author.first_name} ${blogDetail.author.last_name}`
        },
        "publisher": {
            "@type": "Organization",
            "name": "Magna Ingeniería y Topografía"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://magnaingenieria.com/blog/${blogDetail.id}`
        }
    })}
</script>
```

---

## S4 — Canonical URL

### Blog Listing:

```tsx
<link rel="canonical" href="https://magnaingenieria.com/blog" />
```

### Blog Detail:

```tsx
<link rel="canonical" href={`https://magnaingenieria.com/blog/${blogDetail.id}`} />
```

---

## S5 — Sitemap

**Archivo:** `magna-page/page/src/sitemap/` (revisar estructura)

Verificar que el sitemap XML incluya todas las URLs del blog:

```xml
<url>
    <loc>https://magnaingenieria.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>
<url>
    <loc>https://magnaingenieria.com/blog/1</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
</url>
```

Si el sitemap es generado dinámicamente, agregar fetch a la API `/blog/`
para obtener todos los IDs de posts.
