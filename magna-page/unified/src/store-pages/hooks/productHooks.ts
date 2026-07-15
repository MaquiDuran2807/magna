import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Productos,Category,Promos } from '../types/Product'

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Productos[]>(`products/`)).data,
    
    
  })

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: async () =>
      (await apiClient.get<Productos[]>(`products/slug/${slug}/`)).data[0],
  })

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      (await apiClient.get<Category[]>(`products/category/`)).data,
  })

export const useGetProductsByCategoryQuery = (category: string) =>
  useQuery({
    queryKey: ['products', category],
    queryFn: async () =>
      (await apiClient.get<Productos[]>(`products/category/${category}/`)).data,
  })

  export const useGetPromos= () => useQuery({
    queryKey: ['promos'],
    queryFn: async () => {
      const response = await apiClient.get<Promos[]>('products/promos/');
      return response.data;
    },
  });

// ruta para busquedas de productos

export const useSearchProductsQuery = (search: string) =>
  useQuery({
    queryKey: ['products', search],
    queryFn: async () =>
      (await apiClient.get<Productos[]>(`products/search/${search}/`)).data,
  })
