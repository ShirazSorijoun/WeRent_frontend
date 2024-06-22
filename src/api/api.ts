import axios from 'axios';
import { authAPI, userAPI, apartmentAPI, reviewAPI } from './modelsServices';
import { refreshAccessToken } from './tokenHelper';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const REFETCH_INTERVAL = 3000;

export const serverURL =
  import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
export const imageURL = serverURL + '/api';

export const axiosInstance = axios.create({
  baseURL: serverURL,
  timeout: 15000,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = await refreshAccessToken();

        // Update the authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error on refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const api = {
  apartment: apartmentAPI,
  review: reviewAPI,
  auth: authAPI,
  user: userAPI,
};
