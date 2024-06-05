import axios from 'axios'

// export const APIURL = 'http://127.0.0.1:8000/'
export const APIURL ="https://magnaingenieriaytopografia.com/"


const apiClient = axios.create({
  baseURL:APIURL ,
  headers: {
    'Content-type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    console.log(localStorage.getItem('userInfo'), 'localStorage.getItem(userInfo)');
    
    if (localStorage.getItem('userInfo'))
      config.headers.authorization = `JWT ${
        JSON.parse(localStorage.getItem('userInfo')!).access
      }`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default apiClient
