import apiClient from "../apiClient";
import { BlogMagna, BlogimportantMagna, Result } from "../types/blog";


export const fetchBlogDetail = async (id: string): Promise<Result> => {
    const response = await apiClient.get<Result>(`/blog/${id}/`);
    return response.data;
};

export const fetchNextBlogs = async (pageParam: any) => {
    const response = await apiClient.get<BlogMagna>(`/blog/?page=${pageParam}`);
    const nextPage = response.data.next;
    const blogs = response.data.results;
    return { nextPage, blogs };
}

export const fetchinfoImportantBlogs = async () => {
    const response = await apiClient.get<BlogimportantMagna[]>('/blog/recent/');
    return response.data;
}

export const fetchBlogSearch = async (search: string): Promise<Result[]> => {
    const response = await apiClient.get<Result[]>(`/blog/search/`, {
        params: { q: search }
    });
    return response.data;
}