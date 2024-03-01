import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { fetchinfoImportantBlogs } from '../api/blog';



const Sidebar: React.FC = () => {
    const { data: blogs } = useQuery({
        queryKey: ['importantBlogs'],
        queryFn: fetchinfoImportantBlogs,
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,
    });
    if (!blogs) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="blog-sidebar">
            <h3>Artículos más importantes </h3>
            <ul>
                {
                blogs.map((blog) => {
                    return (
                            <li key={blog.id}><span className="col-1 icon-row"><AiOutlineDoubleRight /> </span>
                                <Link to={`/blog/${blog.id}`} className='link-blogs'>{blog.title}</Link>
                            </li>
                    );
                })
                }
            </ul>
        </div>
    );
};

export default Sidebar;