import axios from 'axios'

const apiClient = axios.create({
  baseURL: window.location.origin,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const { access } = JSON.parse(userInfo)
      config.headers.Authorization = `JWT ${access}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
