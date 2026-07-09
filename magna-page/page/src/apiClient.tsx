import axios from 'axios'

export const APIURL = window.location.origin

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
export default apiClient