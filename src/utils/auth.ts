import { ILoginResponse } from '@/models/login';

export const handleLocalStorageLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.setItem('isLoggedIn', String(false));
};

export const handleLocalStorageLogin = (loginRes: ILoginResponse) => {
  console.log('User logged in');

  const { token, userId } = loginRes;
  localStorage.setItem('accessToken', token.accessToken);
  localStorage.setItem('refreshToken', token.refreshToken);
  localStorage.setItem('userId', userId);
  localStorage.setItem('isLoggedIn', String(true));
};
