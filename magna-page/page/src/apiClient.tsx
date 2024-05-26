import axios from 'axios'
// export const APIURL = 'http://127.0.0.1:8000/'
export const APIURL ="http://54.234.168.96:8000/"


const apiClient = axios.create({
  baseURL:APIURL ,
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