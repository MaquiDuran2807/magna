import { useInfiniteQuery } from '@tanstack/react-query';
import { FiSearch } from 'react-icons/fi';
import { Spinner } from '../components/spinner';
import { useEffect} from 'react';
import { Result } from '../types/blog';
import { fetchNextBlogs } from '../api/blog';
import "../pages/styles/blogs.css"
import BlogLayout from '../layouts/blogLayout';
import BlogList from '../components/blogCards';
import Sidebar from '../components/sidebarBolgs';

const Blog =  () => {
    // const [filter, setFilter] = useState('');
    // const [count, setCount] = useState(0);
    const { data, isError, isLoading, fetchNextPage,hasNextPage,isFetchingNextPage } = useInfiniteQuery(
        {
          queryKey: ['blogs'],
          queryFn: ({ pageParam = 0 }) => {
            return fetchNextBlogs(pageParam);
          },
          initialPageParam: '1',
          staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,
          getNextPageParam: (lastPage) => {
            console.log(lastPage, 'lastPage');
            if (lastPage?.nextPage) {
                console.log(lastPage.nextPage, 'lastPage.nextPage');
                
              return lastPage.nextPage.split('=')[1];
            }
          },
        }
      );
      
    useEffect(() => {
        if (!data) return;
        if (data.pages[0] ) {
            console.log(data.pages[0].blogs, 'data.pages[0].blogs');
            
            // setCount(data.pages[0].blogs);
        }
    }, []);
    if (isError) {
        return <div>Error</div>;
    }
    if (isLoading) {
        return <Spinner />;
    }
    console.log(data, 'data');
    if (!data) {
        return
        
    }
    const blogs: Result[] = data.pages.flatMap((page) => page?.blogs ?? []);
    return (
        <div className='blog-container pt-3'>
            <BlogLayout> 
                <div className="container-fluid">
                    <div className="blog-header  text-center">
                        <h1>MagnaBlog</h1>
                    </div>
                    <div className=" text-center">
                        <input type="text" placeholder="Buscar" className='blog-search'/>
                        <FiSearch className="ms-2" />
                    </div>
                    <div className="blog-cards ">
                        <div className="row">
                            <div className="col-lg-9 col-12">
                                <BlogList blogs={blogs} />
                            </div>
                            <div className="col-md-3">
                                <Sidebar />
                            </div>
                        </div>
                        <button
                    onClick={() => fetchNextPage()}
                    className="btn btn-primary"
                    type="button"
                    disabled={!hasNextPage || isFetchingNextPage}
                    style={{ marginTop: '2rem' }}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                        ? 'Cargar más blogs'
                        : 'No hay más blogs'}
                </button>
                    </div>
                </div>
            </BlogLayout>
        </div>
    );
};

export default Blog;


    
