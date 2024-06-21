import apiClient from '@/services/api-client';
import axios from 'axios';

const refreshAccessToken = async (token: string) => {
  const abortController = new AbortController();

  try {
    const response = await apiClient.get('/auth/refresh', {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  } finally {
    abortController.abort();
  }
};

const handleRequestWithToken = async () => {
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!token || !refreshToken) return false;

  try {
    await axios.post(`http://localhost:3000/auth/checkToken`, {
      token: token,
    });
    return true;
  } catch (error) {
    try {
      await refreshAccessToken(refreshToken);
      return true;
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError);
      await axios.get(`http://localhost:3000/auth/logout`);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('roles');
      console.log('User logged out');
      return false;
    }
  }
};

export const getToken = async (): Promise<string | null> => {
  const tokenRefreshed = await handleRequestWithToken();

  if (!tokenRefreshed) {
    console.log('Token refresh failed');
    return null;
  }

  return localStorage.getItem('accessToken');
};
