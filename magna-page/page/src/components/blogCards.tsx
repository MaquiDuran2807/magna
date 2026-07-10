import React from 'react';
import { Result } from '../types/blog';
import { Link } from 'react-router-dom';

interface BlogListProps {
    blogs: Result[];
    search?: Result[] | null;
    isSearching?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, search, isSearching }) => {
    return (
        <>
        <div className="row">
            {isSearching && (
                <div className="col-12 text-center py-4">
                    <div className="blog-search-loading">
                        <div className="blog-search-spinner" />
                        <p style={{color: 'var(--color-gray-500)', marginTop: '0.75rem', fontSize: 'var(--text-sm)'}}>
                            Buscando...
                        </p>
                    </div>
                </div>
            )}
            {search && search.length === 0 && !isSearching && (
                <div className="col-12">
                    <div className="blog-empty-state">
                        <p className="blog-empty-title">No se encontraron resultados</p>
                        <p className="blog-empty-sub">Intenta con otros términos de búsqueda.</p>
                    </div>
                </div>
            )}
            {search && search.length > 0 && !isSearching && (
                <>
                    <div className="col-12">
                        <h3 className="blog-results-title">
                            Resultados de la búsqueda <span className="blog-results-count">({search.length})</span>
                        </h3>
                    </div>
                    {search.map((blog) => {
                        const sizeClass = blog.important
                            ? 'col-lg-8 col-md-12 mb-4'
                            : 'col-lg-4 col-md-6 col-sm-6 mb-4';
                        const cardClass = blog.important ? 'big-card' : 'small-card';
                        return (
                            <article key={blog.id} className={sizeClass}>
                                <Link to={`/blog/${blog.id}`} className="blog-card-link">
                                    <div className={`blog-card ${cardClass}`}>
                                        <div className="blog-card__image-wrap">
                                            <img src={blog.image} alt={blog.title} className="blog-card__img" />
                                            <span className="blog-card__category">{blog.category.name}</span>
                                        </div>
                                        <div className="blog-card__body">
                                            <h3 className="blog-card__title">{blog.title}</h3>
                                            <p className="blog-card__excerpt">{blog.description?.slice(0, 150) ?? ''}...</p>
                                            <div className="blog-card__footer">
                                                <div className="blog-card__author">
                                                    <span className="blog-card__avatar">
                                                        {blog.author.first_name?.[0]}{blog.author.last_name?.[0]}
                                                    </span>
                                                    <span>{blog.author.first_name} {blog.author.last_name}</span>
                                                </div>
                                                <span className="blog-card__date">
                                                    {new Date(blog.date_posted).toLocaleDateString('es-CO')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                    <hr className="blog-divider" />
                </>
            )}
        </div>
        <div className="row">
            {!search && blogs.length === 0 && !isSearching && (
                <div className="col-12">
                    <div className="blog-empty-state">
                        <p className="blog-empty-title">No hay artículos publicados</p>
                        <p className="blog-empty-sub">Próximamente nuevo contenido.</p>
                    </div>
                </div>
            )}
            {blogs.map((blog) => {
                let sizeClass = '';
                let cardClass = '';
                if (blog.important === false) {
                    sizeClass = 'col-lg-4 col-md-6 col-sm-6 mb-4';
                    cardClass = 'small-card';
                } else if (blog.important === true) {
                    sizeClass = 'col-lg-8 col-md-12 mb-4';
                    cardClass = 'big-card';
                } else {
                    sizeClass = 'col-lg-4 col-md-6 col-sm-6 mb-4';
                    cardClass = 'small-card';
                }
                return (
                    <article key={blog.id} className={sizeClass}>
                        <Link to={`/blog/${blog.id}`} className="blog-card-link">
                            <div className={`blog-card ${cardClass}`}>
                                <div className="blog-card__image-wrap">
                                    <img src={blog.image} alt={blog.title} className="blog-card__img" />
                                    <span className="blog-card__category">{blog.category.name}</span>
                                </div>
                                <div className="blog-card__body">
                                    <h3 className="blog-card__title">{blog.title}</h3>
                                    <p className="blog-card__excerpt">{blog.description?.slice(0, 150) ?? ''}...</p>
                                    <div className="blog-card__footer">
                                        <div className="blog-card__author">
                                            <span className="blog-card__avatar">
                                                {blog.author.first_name?.[0]}{blog.author.last_name?.[0]}
                                            </span>
                                            <span>{blog.author.first_name} {blog.author.last_name}</span>
                                        </div>
                                        <span className="blog-card__date">
                                            {new Date(blog.date_posted).toLocaleDateString('es-CO')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                );
            })}
        </div>
    </>
    );
};

export default BlogList;
