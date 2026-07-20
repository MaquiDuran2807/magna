import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { UserInfo } from '../types/UserInfo'

const fetchUser = () => {
  return apiClient.get<UserInfo>(`/auth/users/me/`)
}

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>{
        const response=await apiClient.post<UserInfo>(`auth/jwt/create`, {
          email,
          password,
        })
        localStorage.setItem('userInfo', JSON.stringify(response.data))
        const userData =await fetchUser()
        // guardae en localstorage en user info la informacion de usuario y los token
        const userInfo = {
          ...response.data,
          ...userData.data,
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        return userInfo
    }
      
  })

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
        })
      ).data,
  })

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          name,
          email,
          password,
        })
      ).data,
  })
