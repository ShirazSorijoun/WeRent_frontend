import axios, { AxiosRequestConfig } from 'axios';
import {
  authAPI,
  userAPI,
  apartmentAPI,
  reviewAPI,
  fileAPI,
  matchAPI,
  leaseAgreementAPI,
  tenantFormAPI,
} from './modelsServices';
import { serverURL } from './apiUtils';
import { handleLocalStorageLogout } from '@/utils/auth';
import swal from 'sweetalert';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const REFETCH_INTERVAL = 3000;

export const axiosInstance = axios.create({
  baseURL: serverURL,
  timeout: 15000,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
  },
});

export const api = {
  apartment: apartmentAPI,
  review: reviewAPI,
  auth: authAPI,
  user: userAPI,
  file: fileAPI,
  tenantForm: tenantFormAPI,
  leaseAgreement: leaseAgreementAPI,
  match: matchAPI,
};

const refreshAccessToken = async (
  config?: AxiosRequestConfig<any>,
): Promise<string> => {
  try {
    const newTokens = await api.auth.refreshToken(config);
    localStorage.setItem(ACCESS_TOKEN, newTokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN, newTokens.refreshToken);

    return newTokens.accessToken;
  } catch (error: any) {
    if (error?.response?.status === 403) {
      return '';
    } else throw error;
  }
};

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

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = await refreshAccessToken(originalRequest);

        if (!accessToken) {
          await swal(
            'your identification has expired so you need to login again',
          );

          handleLocalStorageLogout();

          location.replace(location.origin + '/login');
          return;
        }
        // Update the authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error on refreshing token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
