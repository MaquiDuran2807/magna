import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { AuthResponse,User,refreshResponse } from '../types/types'




export const fetchUser = async () => {
  console.log('tokenAutorizaion aqui estoy en fetchUser',apiClient.getUri());
    
    try {
      // console.log(token, 'token aqui estoy en fetchUser');
        const response = await apiClient.get<User>('/auth/users/me/')
          return response.data
    } catch (error) {
        console.log(error);
        return
    }
  
}
export const useSigninMutation = () =>
  useMutation({
    mutationKey: ['signin'],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (
        await apiClient.post<AuthResponse>(`auth/jwt/create/`, {
          email,
          password,
        })
      ).data,
      onSuccess:async (data) => {        
        await localStorage.setItem('token', data.access)
        await localStorage.setItem('refreshToken', data.refresh)
      },
      
  })


export const useRefreshToken = async () =>{
  let successrefresh = false;
  await apiClient.post<refreshResponse>(`auth/jwt/refresh/`, {
    refresh: localStorage.getItem('refreshToken'),
  }).then(async (response) => {
    console.log("refresh token antes de guardar", localStorage.getItem('refreshToken'));
    await localStorage.setItem('token', response.data.access);
    await console.log("refresh token despues de guardar", localStorage.getItem('refreshToken'));
    successrefresh = true;
  }
  ).catch((error) => {
    console.log(error, 'error aqui estoy en useRefreshTokenMutation');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    successrefresh = false;
  });
  return  successrefresh;
}

export const useVerfyToken  = async () =>{
  let successVerfyToken = false;
  await apiClient.post(`auth/jwt/verify/`, {
    token: localStorage.getItem('token'),
  }).then(() => {
    successVerfyToken = true;
  }
  ).catch(async (error) => {
    console.log(error, 'error aqui estoy en useVerfyTokenMutation');
    const successrefresh = await useRefreshToken();
    console.log(successrefresh, 'successrefresh aqui estoy en useVerfyTokenMutation');
    if(successrefresh){
      successVerfyToken = true;
    }
  });
  return successVerfyToken;
}

export const useLogoutMutation = () =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await localStorage.removeItem('token')
      await localStorage.removeItem('refreshToken')
      console.log('logoutMutation');
    },
  })
