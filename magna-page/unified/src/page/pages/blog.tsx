import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useInfiniteQuery } from '@tanstack/react-query';
const Spinner = React.lazy(() => import('../components/spinner'));
import { useEffect, useState } from 'react';
import { Result } from '../types/blog';
import { fetchNextBlogs, fetchBlogSearch } from '../api/blog';
import "../pages/styles/blogs.css"
import BlogLayout from '../layouts/blogLayout';
import BlogList from '../components/blogCards';
import Sidebar from '../components/sidebarBolgs';
import BlogSearch from '../components/search';
import { FiFilter } from 'react-icons/fi';

const Blog = () => {
    const [filter, setFilter] = useState("");
    const [filterBlogs, setFilterBlogs] = useState<Result[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showFilters, setShowFilters] = useState(false);

    const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['blogs'],
        queryFn: ({ pageParam = 0 }) => fetchNextBlogs(pageParam),
        initialPageParam: '1',
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => {
            if (lastPage?.nextPage) {
                return lastPage.nextPage.split('=')[1];
            }
        },
    });

    useEffect(() => {
        if (!filter) {
            setFilterBlogs(null);
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        const fetchData = async () => {
            try {
                const response = await fetchBlogSearch(filter);
                setFilterBlogs(response || []);
            } catch {
                setFilterBlogs([]);
            } finally {
                setIsSearching(false);
            }
        };
        const debounceTimer = setTimeout(fetchData, 350);
        return () => clearTimeout(debounceTimer);
    }, [filter]);

    if (isError) {
        return <div className="text-center py-5"><p>Error al cargar los blogs.</p></div>;
    }
    if (isLoading) {
        return <Spinner />;
    }
    if (!data) {
        return null;
    }

    const allBlogs: Result[] = data.pages.flatMap((page) => page?.blogs ?? []);

    const categories = Array.from(
        new Map(
            allBlogs
                .map((b) => b.category)
                .filter((c) => c != null)
                .map((c) => [c.id, c])
        ).values()
    ).sort((a, b) => a.name.localeCompare(b.name));

    const displayBlogs = selectedCategory
        ? allBlogs.filter((b) => b.category?.id === parseInt(selectedCategory))
        : allBlogs;

    return (
        <>
        <Helmet>
          <title>Blog | Magna Ingeniería y Topografía</title>
          <meta name="description" content="Blog de Magna Ingeniería y Topografía — Artículos, noticias y novedades del sector." />
          <meta property="og:title" content="Blog | Magna Ingeniería y Topografía" />
          <meta property="og:description" content="Blog de Magna Ingeniería y Topografía — Artículos, noticias y novedades del sector." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://magnaingenieria.com/blog" />
          <meta property="og:image" content="https://magnaingenieria.com/static/assets/img/app/fondoblog2.webp" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Blog | Magna Ingeniería y Topografía" />
          <meta name="twitter:description" content="Artículos, noticias y novedades del sector." />
          <link rel="canonical" href="https://magnaingenieria.com/blog" />
        </Helmet>
        <main>
            <BlogLayout>
                <div className="blog-hero">
                    <div className="blog-header text-center">
                        <h1>MagnaBlog</h1>
                        <p style={{color:'rgba(255,255,255,0.7)',fontSize:'var(--text-sm)',marginTop:'0.5rem'}}>
                            Ingeniería, topografía y tecnología
                        </p>
                    </div>
                    <div className="text-center d-flex flex-column align-items-center gap-3">
                        <BlogSearch setFilter={setFilter} isSearching={isSearching} />
                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-sm d-flex align-items-center gap-2"
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'rgba(255,255,255,0.8)',
                                borderRadius: '50px',
                                padding: '6px 16px',
                                fontSize: 'var(--text-xs)',
                            }}
                        >
                            <FiFilter />
                            {showFilters ? 'Ocultar filtros' : 'Filtrar por categoría'}
                        </button>
                        {showFilters && (
                            <div className="blog-category-filter">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory('')}
                                    className={`blog-filter-btn ${!selectedCategory ? 'active' : ''}`}
                                >
                                    Todos
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(String(cat.id))}
                                        className={`blog-filter-btn ${selectedCategory === String(cat.id) ? 'active' : ''}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="blog-section">
                    <div className="blog-cards">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-8 col-12">
                                    <BlogList
                                        blogs={displayBlogs}
                                        search={filterBlogs}
                                        isSearching={isSearching}
                                    />
                                </div>
                                <div className="col-md-4 col-12">
                                    <Sidebar />
                                </div>
                            </div>
                        </div>
                        <div className="text-center" style={{marginTop:'2rem'}}>
                            <button
                        onClick={() => fetchNextPage()}
                        className="btn btn-primary fw-semibold px-4 py-2"
                        type="button"
                        disabled={!hasNextPage || isFetchingNextPage || !!selectedCategory}
                        style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-secondary)', borderRadius: 'var(--radius-md)', boxShadow: '0 2px 6px rgba(214,158,46,0.3)' }}
                        aria-label={
                            isFetchingNextPage
                                ? 'Cargando más artículos'
                                : hasNextPage
                                ? 'Cargar más artículos del blog'
                                : 'No hay más artículos disponibles'
                        }
                    >
                        {isFetchingNextPage
                            ? 'Cargando...'
                            : hasNextPage
                            ? 'Cargar más blogs'
                            : 'No hay más blogs'}
                    </button>
                        </div>
                    </div>
                </div>
            </BlogLayout>
        </main>
        </>
    );
};

export default Blog;
