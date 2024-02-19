import React from 'react';
import { Result } from '../types/blog';
import { Link } from 'react-router-dom';


interface BlogListProps {
    blogs: Result[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
    return (
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
                    <img src={blog.image} className={`card-img-top img-fluid ${imageClass}`} alt={blog.title} />
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
})}

        </div>
    );
};

export default BlogList;