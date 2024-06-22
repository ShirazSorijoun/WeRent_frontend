import { UserRole } from '@/models';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  roles?: UserRole;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [roles, setRoles] = useState<UserRole | undefined>(undefined); // Initialize roles as undefined

  useEffect(() => {
    if (localStorage.getItem('roles') !== null)
      // If roles are in local storage
      setRoles(localStorage.getItem('roles') as UserRole); // Set roles from local storage

    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  const login = () => {
    if (
      !!localStorage.getItem('accessToken') &&
      !!localStorage.getItem('refreshToken') &&
      !!localStorage.getItem('userId')
    ) {
      setIsLoggedIn(true);
    }

    console.log('User logged in (Navbar)');
  };

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

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
