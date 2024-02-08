import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
      });
    
    useEffect(() => {
        localStorage.setItem("isLoggedIn", String(isLoggedIn));
      }, [isLoggedIn]);

  const login = () => {
    if (
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("refreshToken") !== null &&
      localStorage.getItem("userId") !== null
    ){
        setIsLoggedIn(true);
    }
    
    console.log("User logged in (Navbar)");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    console.log("User logged out");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
