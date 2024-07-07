import { api } from '@/api';
import { ACCESS_TOKEN } from '@/api/api';
import { AuthContext } from '@/common/context/authContext';
import { UserRole } from '@/models';
import { handleLocalStorageLogout } from '@/utils/auth';
import { useState, useCallback, useEffect } from 'react';
import { redirect } from 'react-router';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [roles, setRoles] = useState<UserRole | undefined>(undefined); // Initialize roles as undefined

  const logout = useCallback(() => {
    handleLocalStorageLogout();

    console.log('User logged out');
    setIsLoggedIn(false);
    redirect('/login');
  }, [setIsLoggedIn]);

  const login = useCallback(async () => {
    if (
      !!localStorage.getItem('accessToken') &&
      !!localStorage.getItem('refreshToken') &&
      !!localStorage.getItem('userId')
    ) {
      if (localStorage.getItem('roles') === null) {
        redirect('/changePassword');
      } else {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const isTokenValid = accessToken
          ? await api.auth.checkToken(accessToken)
          : false;
        if (isTokenValid) {
          setIsLoggedIn(true);

          console.log('User logged in (Navbar)');
        } else {
          logout();
        }
      }
    }
  }, [setIsLoggedIn, logout]);

  useEffect(() => {
    if (localStorage.getItem('roles') !== null)
      // If roles are in local storage
      setRoles(localStorage.getItem('roles') as UserRole); // Set roles from local storage

    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    const startEffect = async () => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        if (localStorage.getItem('roles') === null) {
          setIsLoggedIn(false);
          redirect('/changePassword');
        } else {
          await login();
        }
      } else {
        redirect('/login');
      }
    };

    startEffect();
  }, [login]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, roles }}>
      {children}
    </AuthContext.Provider>
  );
};
