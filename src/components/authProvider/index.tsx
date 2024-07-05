import { api } from '@/api';
import { ACCESS_TOKEN } from '@/api/api';
import { AuthContext } from '@/common/context/authContext';
import { UserRole } from '@/models';
import { useState, useCallback, useEffect } from 'react';
import { redirect } from 'react-router';
import { toast } from 'react-toastify';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [roles, setRoles] = useState<UserRole | undefined>(undefined); // Initialize roles as undefined

  const login = useCallback(async () => {
    if (
      !!localStorage.getItem('accessToken') &&
      !!localStorage.getItem('refreshToken') &&
      !!localStorage.getItem('userId')
    ) {
      if (localStorage.getItem('roles') === null) {
        redirect('/changePassword');
      } else {
        const isTokenValid = await api.auth.checkToken(
          localStorage.getItem(ACCESS_TOKEN),
        );
        if (isTokenValid) {
          setIsLoggedIn(true);
          console.log('User logged in (Navbar)');
        } else {
          toast.error('you need to login again, saved login time has expired');
          redirect('/login');
        }
      }
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem('roles') !== null)
      // If roles are in local storage
      setRoles(localStorage.getItem('roles') as UserRole); // Set roles from local storage

    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      if (localStorage.getItem('roles') === null) {
        setIsLoggedIn(false);
        redirect('/changePassword');
      } else {
        login();
      }
    }
  }, [login]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    console.log('User logged out');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, roles }}>
      {children}
    </AuthContext.Provider>
  );
};
