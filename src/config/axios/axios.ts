import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { refreshAccessToken } from 'src/services/AuthorizationService';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest = error.config as AxiosRequestConfigWithRetry;
  if (error.response && error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    try {
      await axios(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

axios.interceptors.request.use(onRequest, onRequestError);

export default axios;
