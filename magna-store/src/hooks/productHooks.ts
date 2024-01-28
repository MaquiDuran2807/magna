import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Product,Categories } from '../types/Product'

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>(`products/`)).data,
    
    
  })

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: async () =>
      (await apiClient.get<Product[]>(`products/slug/${slug}/`)).data[0],
  })

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      (await apiClient.get<Categories[]>(`products/category/`)).data,
  })
