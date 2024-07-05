import { UserRole } from '@/models';
import { createContext } from 'react';

export interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  roles?: UserRole;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);
