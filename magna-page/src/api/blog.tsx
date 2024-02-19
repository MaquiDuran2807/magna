import apiClient from "../apiClient";
import { BlogMagna, BlogimportantMagna, Result, } from "../types/blog";


import { useMutation } from '@tanstack/react-query';



export const useFetchBlog = () => {
  
  
    return useMutation<Result[], Error, { id: string }>({
        mutationKey: ['blog'],
        mutationFn: async ({
          id
        }) =>{
        const response = await apiClient.get<Result[]>(`/blog/${id}/`);
        console.log('useFetchBlog', response.data, 'response.data', id);
        return response.data;
      } 
    });

  };

export const fetchNextBlogs = async ( pageParam:any ) => {
    try {
      const response = await apiClient.get<BlogMagna>(`/blog/?page=${pageParam}`);
      console.log(response.data);
      const nextPage = response.data.next;
      const blogs = response.data.results;
      
      return {
        nextPage: nextPage,
        blogs: blogs
      }
    } catch (error) {
      console.log(error);
      return
    }
  }

export const fetchinfoImportantBlogs = async () => {
  try {
    const response = await apiClient.get<BlogimportantMagna[]>('/blog/recent/');
    console.log(response.data);
    const blogs = response.data;
    return blogs;
  } catch (error) {
    console.log(error);
    return
  }
}