import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { fetchinfoImportantBlogs } from '../api/blog';

const Sidebar: React.FC = () => {
    const { data: blogs } = useQuery({
        queryKey: ['importantBlogs'],
        queryFn: fetchinfoImportantBlogs,
        staleTime: 1000*60*30,refetchOnWindowFocus: false,
    });
    if (!blogs) {
        return <p className="text-white text-center">Cargando...</p>;
    }
    if (blogs.length === 0) {
        return (
            <div className="blog-sidebar">
                <h3 className="sidebar__title">Artículos destacados</h3>
                <p className="text-white text-center opacity-75">No hay artículos destacados aún.</p>
            </div>
        );
    }

    return (
        <div className="blog-sidebar">
            <h3 className="sidebar__title">Artículos destacados</h3>
            <div className="sidebar__list">
                {blogs.map((blog) => (
                    <Link to={`/blog/${blog.id}`} key={blog.id} className="sidebar__item">
                        <div className="sidebar__item-img-wrap">
                            <img src={blog.image} alt={blog.title} className="sidebar__item-img" />
                        </div>
                        <div className="sidebar__item-body">
                            <h4 className="sidebar__item-title">{blog.title}</h4>
                            <span className="sidebar__item-date">
                                {new Date(blog.date_posted).toLocaleDateString('es-CO')}
                            </span>
                        </div>
                        <AiOutlineDoubleRight className="sidebar__item-icon" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
