import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN, api } from './api';

export const refreshAccessToken = async () => {
  try {
    const newTokens = await api.auth.refreshToken();
    localStorage.setItem(ACCESS_TOKEN, newTokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN, newTokens.refreshToken);

    return newTokens;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
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
      await refreshAccessToken();
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
