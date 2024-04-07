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
        <div className="blog-sidebar ">
            <h3 className='ml-5'>Artículos más importantes </h3>
            <ul>
                {
                blogs.map((blog) => {
                    return (
                            <li key={blog.id}>
                                <div className="row">
                                <Link to={`/blog/${blog.id}`}>
                                    <div className="col-3">
                                        <img src={blog.image} alt={blog.title} style={{width:"120px",borderRadius:"10px"}} />
                                    </div>
                                    <div className="col-8 fs-4">
                                        {blog.title} <AiOutlineDoubleRight />
                                        <p className='text-white '> Autor :  {blog.author.last_name}</p>
                                    </div>
                                    <hr />
                                    </Link>
                                </div>
                            </li>
                    );
                })
                }
            </ul>
        </div>
    );
};

export default Sidebar;