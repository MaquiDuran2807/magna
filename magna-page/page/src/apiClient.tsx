import axios from 'axios'
// export const APIURL = 'http://127.0.0.1:8000/'
// export const APIURL ="http://54.211.37.134:8000/"
export const APIURL = 'https://rn1nb289-8000.use2.devtunnels.ms/'

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