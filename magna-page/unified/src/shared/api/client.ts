import axios from 'axios';

const apiClient = axios.create({
  baseURL: window.location.origin,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || (() => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        return userInfo.access;
      } catch {
        return null;
      }
    })();

    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
