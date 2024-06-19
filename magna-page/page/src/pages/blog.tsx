import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
const Spinner = React.lazy(() => import('../components/spinner'));
import { useEffect, useState} from 'react';
import { Result } from '../types/blog';
import { fetchNextBlogs,fetchBlogSearch } from '../api/blog';
import "../pages/styles/blogs.css"
import BlogLayout from '../layouts/blogLayout';
import BlogList from '../components/blogCards';
import Sidebar from '../components/sidebarBolgs';
import BlogSearch from '../components/search';
import useIntersectionObserver from '../hooks/useLazyload';


const Blog =  () => {
    const [filter, setFilter] = useState("");
    const [filterBlogs, setFilterBlogst] = useState<Result[] | null>(null);
    const { data, isError, isLoading, fetchNextPage,hasNextPage,isFetchingNextPage } = useInfiniteQuery(
        {
          queryKey: ['blogs'],
          queryFn: ({ pageParam = 0 }) => {
            return fetchNextBlogs(pageParam);
          },
          initialPageParam: '1',
          staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,
          getNextPageParam: (lastPage) => {
            if (lastPage?.nextPage) {
              return lastPage.nextPage.split('=')[1];
            }
          },
        }
      );
      useEffect(() => {
        if (!filter) return;
        const fetchData = async () => {
            const response = await fetchBlogSearch(filter);
            if (!response) return;
            setFilterBlogst(response);
        };
        fetchData();
    }, [filter]);

    if (isError) {
        return <div>Error</div>;
    }
    if (isLoading) {
        return <Spinner />;
    }
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
                        <BlogSearch setFilter={setFilter} />
                    </div>
                    <div className="blog-cards ">
                        <div className="row">
                            <div className="col-lg-8 col-12">
                                <BlogList blogs={blogs} search={filterBlogs} />
                            </div>
                            <div className="col-md-4 col-12">
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


export default function LazyBlog () {
    const { isVisible, ref } = useIntersectionObserver('100px');
  
    return (
        <div id="LazyBlog" ref={ref}>
            {isVisible ? <Blog/> : null}
        </div>
    );
  }


    
