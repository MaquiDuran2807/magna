import React from 'react';
import { Result } from '../types/blog';
import { Link } from 'react-router-dom';


interface BlogListProps {
    blogs: Result[];
    search?: Result[] | null;
}

const BlogList: React.FC<BlogListProps> = ({ blogs,search  }) => {
    return (
        <>
        <div className="row">
            {search && search.length === 0 && <h3>No se encontraron resultados</h3>}
            {search && search.length > 0 && <h3>Resultados de la búsqueda</h3>}
            {search &&
                search?.map((blog) => {
                    return (
                        <div key={blog.id} className="col-lg-4 col-md-4 col-sm-6 ">
                            
                            <Link to={`/blog/${blog.id}`} className='link-blogs'>
                                <div className="card card-blog mt-3 small-card">
                                    <div className="card-img-top">
                                        <img src={blog.image} className="img-fluid small-image" alt={blog.title} />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{blog.title}</h5>
                                        <p className="card-text">{blog.description.slice(0, 200)}...</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        
                    );
                })
            }
            {search && search.length > 0 && 
            <hr className='mt-5'/>}
            

        </div>
        <div className="row">
            {blogs.map((blog) => {
    let sizeClass = '';
    let imageClass = '';
    let cardClass = '';
    if (blog.important === false) {
        sizeClass = 'col-lg-4 col-md-4 col-sm-6'; // Primera tarjeta pequeña
        cardClass = 'small-card';
        imageClass = 'small-image';
    } else if (blog.important === true) {
        sizeClass = 'col-lg-6 col-md-12 col-sm-12 '; // Segunda tarjeta 3 veces más grande
        imageClass = 'big-image';
        cardClass = 'big-card';
    } else {
        sizeClass = 'col-lg-3 col-md-4 col-sm-6'; // Resto de tarjetas pequeñas
        imageClass = 'small-image';
        cardClass = 'small-card';
    }
    return (
        <div key={blog.id} className={sizeClass}>
            <Link to={`/blog/${blog.id}`} className='link-blogs'>
                <div className={`card card-blog mt-3 ${cardClass}`}>
                    <div className="card-img-top">
                        <img src={blog.image} className={` img-fluid ${imageClass}`} alt={blog.title} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.description.slice(0, 200)}...</p>
                    </div>
                </div>
            </Link>
        </div>
    );
})}
        </div>
    </>
    );
};

export default BlogList;