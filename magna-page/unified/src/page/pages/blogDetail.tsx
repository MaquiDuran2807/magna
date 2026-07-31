import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { fetchBlogDetail } from '../api/blog';
import DOMPurify from 'dompurify';
import "../pages/styles/blogs.css"
import "../pages/styles/blogDetail.css"
import BlogLayout from '../layouts/blogLayout';
import Sidebar from '../components/sidebarBolgs';
import { FiArrowLeft, FiCopy, FiCheck } from 'react-icons/fi';
import { FaFacebookF, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { useState } from 'react';

function estimateReadingTime(html: string): number {
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 250));
}

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [copied, setCopied] = useState(false);

    const { data: blog, isError, isLoading } = useQuery({
        queryKey: ['blogDetail', id],
        queryFn: () => fetchBlogDetail(id as string),
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!id) {
        return (
            <BlogLayout>
                <div className="detail-error">
                    <p className="detail-error__title">Artículo no encontrado</p>
                    <Link to="/blog" className="detail-error__link">
                        <FiArrowLeft /> Volver al blog
                    </Link>
                </div>
            </BlogLayout>
        );
    }

    if (isLoading) {
        return (
            <BlogLayout>
                <div className="detail-skeleton">
                    <div className="detail-skeleton__spinner" />
                    <p className="detail-skeleton__text">Cargando artículo...</p>
                </div>
            </BlogLayout>
        );
    }

    if (isError || !blog) {
        return (
            <BlogLayout>
                <div className="detail-error">
                    <p className="detail-error__title">Error al cargar el artículo</p>
                    <p className="detail-error__text">Intenta de nuevo más tarde.</p>
                    <Link to="/blog" className="detail-error__link">
                        <FiArrowLeft /> Volver al blog
                    </Link>
                </div>
            </BlogLayout>
        );
    }

    const readingTime = estimateReadingTime(blog.content ?? '');
    const contentBlog = DOMPurify.sanitize(blog.content ?? '');
    const contentFinal = contentBlog.replace(
        /(<img [^>]*?)style="([^"]*?)(?:\bheight\s*:\s*[^;]*;?)([^"]*?)"([^>]*?>)/g,
        '$1style="$2$3"$4'
    );

    const shareUrl = encodeURIComponent(`https://magnaingenieria.com/blog/${blog.id}`);
    const shareText = encodeURIComponent(`${blog.title} | Magna Ingeniería y Topografía`);

    return (
        <>
        <Helmet>
          <title>{blog.title} | Magna Ingeniería y Topografía</title>
          <meta name="description" content={blog.description ?? 'Artículo del blog de Magna Ingeniería y Topografía.'} />
          <meta property="og:title" content={`${blog.title} | Magna Ingeniería y Topografía`} />
          <meta property="og:description" content={blog.description ?? ''} />
          <meta property="og:image" content={blog.image} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://magnaingenieria.com/blog/${blog.id}`} />
          <meta property="article:published_time" content={blog.date_posted ? new Date(blog.date_posted).toISOString() : ''} />
          <meta property="article:author" content={`${blog.author.first_name} ${blog.author.last_name}`} />
          <meta property="article:section" content={blog.category?.name ?? ''} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${blog.title} | Magna`} />
          <meta name="twitter:description" content={blog.description ?? ''} />
          <meta name="twitter:image" content={blog.image} />
          <link rel="canonical" href={`https://magnaingenieria.com/blog/${blog.id}`} />
        </Helmet>
        <script type="application/ld+json">
            {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": blog.title,
                "description": blog.description,
                "image": blog.image,
                "datePublished": blog.date_posted ? new Date(blog.date_posted).toISOString() : '',
                "author": {
                    "@type": "Person",
                    "name": `${blog.author.first_name} ${blog.author.last_name}`
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Magna Ingeniería y Topografía"
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://magnaingenieria.com/blog/${blog.id}`
                }
            })}
        </script>
        <BlogLayout>
            <div
                className="detail-hero"
                style={{ backgroundImage: `url(${blog.image})` }}
            >
                <div className="container detail-hero__content">
                    <Link to="/blog" className="detail-hero__back">
                        <FiArrowLeft /> Volver al blog
                    </Link>
                    {blog.category && (
                        <span className="detail-hero__category">
                            {blog.category.name}
                        </span>
                    )}
                    <h1 className="detail-hero__title">{blog.title}</h1>
                    {blog.description && (
                        <p className="detail-hero__excerpt">{blog.description}</p>
                    )}
                    <div className="detail-hero__meta">
                        <div className="detail-hero__author">
                            <span className="detail-hero__avatar">
                                {blog.author.first_name?.[0]}{blog.author.last_name?.[0]}
                            </span>
                            <span className="detail-hero__author-name">
                                {blog.author.first_name} {blog.author.last_name}
                            </span>
                        </div>
                        <span className="detail-hero__separator" />
                        <span className="detail-hero__date">
                            {new Date(blog.date_posted).toLocaleDateString('es-CO', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="detail-hero__separator" />
                        <span className="detail-hero__reading-time">
                            {readingTime} min de lectura
                        </span>
                    </div>
                </div>
            </div>

            <div className="detail-section">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-8 col-12">
                            <div className="detail-main">
                                <div className="detail-content">
                                    <div dangerouslySetInnerHTML={{ __html: contentFinal }} />
                                </div>

                                <div className="detail-share">
                                    <p className="detail-share__title">Compartir este artículo</p>
                                    <div className="detail-share__buttons">
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="detail-share__btn detail-share__btn--facebook"
                                        >
                                            <FaFacebookF /> Facebook
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="detail-share__btn detail-share__btn--twitter"
                                        >
                                            <FaXTwitter /> X
                                        </a>
                                        <a
                                            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="detail-share__btn detail-share__btn--whatsapp"
                                        >
                                            <FaWhatsapp /> WhatsApp
                                        </a>
                                        <button
                                            type="button"
                                            onClick={handleCopyLink}
                                            className="detail-share__btn detail-share__btn--copy"
                                        >
                                            {copied ? <FiCheck /> : <FiCopy />}
                                            {copied ? 'Copiado' : 'Copiar enlace'}
                                        </button>
                                    </div>
                                </div>

                                <div className="detail-comments">
                                    <h3 className="detail-comments__title">
                                        Comentarios ({blog.comments?.length ?? 0})
                                    </h3>
                                    {blog.comments && blog.comments.length > 0 ? (
                                        blog.comments.map((comment) => (
                                            <div key={comment.id} className="detail-comment">
                                                <span className="detail-comment__avatar">
                                                    {comment.author.first_name?.[0]}{comment.author.last_name?.[0]}
                                                </span>
                                                <div className="detail-comment__body">
                                                    <span className="detail-comment__author">
                                                        {comment.author.first_name} {comment.author.last_name}
                                                    </span>
                                                    <span className="detail-comment__date">
                                                        {new Date(comment.created_date).toLocaleDateString('es-CO', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                    <p className="detail-comment__text">{comment.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="detail-comments__empty">
                                            No hay comentarios aún. ¡Sé el primero en comentar!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
        </BlogLayout>
        </>
    );
};

export default BlogDetailPage;
