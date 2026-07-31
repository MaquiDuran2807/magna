import axios from 'axios'

export const APIURL = import.meta.env.VITE_API_URL || window.location.origin

const apiClient = axios.create({
  baseURL: APIURL,
  headers: {
    'Content-type': 'application/json',
  },
})


apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`
    }
    return config
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)
export default apiClient