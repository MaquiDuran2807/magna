import axios from 'axios'

const apiClient = axios.create({
  baseURL:'http://127.0.0.1:8000/' ,
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