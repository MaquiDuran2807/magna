
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Result } from '../types/blog';
import { useFetchBlog } from '../api/blog';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import "../pages/styles/blogs.css"
import BlogLayout from '../layouts/blogLayout';
import Sidebar from '../components/sidebarBolgs';


const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <p>No hay id</p>;
    }
    const [blogDetail, setBlogDetail] = useState<Result | null>(null);
    const { mutateAsync: fechtBlog } = useFetchBlog()
    const { data: blog,isError,isLoading,refetch} = useQuery<Result[]>({
        queryKey: ['blogDetail'],
        staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,
        queryFn: () => fechtBlog({id}),
    });
    useEffect(() => {
        refetch();
    }, [id]);

    useEffect(() => {
        if (blog) {
            setBlogDetail(blog[0]);
        }
    }, [blog]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }
    if (isError) {
        return <p>Error</p>;
    }
    if (!blogDetail) {
        return <p>No hay blog</p>;
    }

    console.log(blog, 'blog detail');
    console.log(blogDetail, 'blogDetail');

    if (blogDetail.author===undefined) {
        return <p>No hay blog</p>;
    }
    return (
        <div className='blog-container '>
            <br />
            <BlogLayout>
                <div className="container content-blog">
                    <div className="row ">
                        <div className="col-9 blog-izq">
                                <div className="col-12 text-white text-center pt-3 pb-5 blog-banner" style={{backgroundImage:`url(${blogDetail.category.image})`,}}>
                                    <h3 >
                                        MagnaBlog
                                    </h3>
                                    <h6>
                                        {
                                            blogDetail.category.name
                                        }
                                    </h6>
                                </div>
                            <div className="row header-post">
                                <h2>{blogDetail.title}</h2>
                                <p className='author'>Author: {blogDetail.author.first_name+" "+blogDetail.author.last_name}</p>
                                <p>Fecha de publicación: {new Date(blogDetail.date_posted).toDateString()}</p>
                                <div className='divider'/>
                            </div>
                            <div className="row ">
                                <div className="col-12">
                                    {
                                        blogDetail.content && (
                                            <div  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogDetail.content) }} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className='row coments'>
                                <h3>Comentarios</h3>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-10">
                                            <div className="card">
                                                <div className="card-body">
                                                    {
                                                        blogDetail.comments.map ((comment) => {
                                                            return (
                                                                <>
                                                                    <h5>
                                                                        {comment.author.first_name+" "+comment.author.last_name}
                                                                    </h5>
                                                                    <p>
                                                                        {comment.text}
                                                                    </p>
                                                                </>
                                                            )
                                                        }
                                                    )}
                                                    <p className="card-text">Este es el comentario 1</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 blog-der">
                            <Sidebar />
                        </div>
                    </div>
                    <div className="row">
                        <p>Fecha de publicación: {new Date(blogDetail.date_posted).toDateString()}</p>
                    </div>
                </div>
                
                {/* <p>Author: {blog.author.first_name+" "+blog.author.last_name}</p> */}
            </BlogLayout>
        </div>
    );
};

export default BlogDetailPage;
