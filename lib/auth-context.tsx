"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

const ADMIN_PASSWORD = "admin123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const savedAdmin = localStorage.getItem("isAdmin");
    if (savedAdmin) {
      setIsAdmin(savedAdmin === "true");
    }
  }, []);

  const login = (password: string): boolean => {
    const isValid = password === ADMIN_PASSWORD;
    if (isValid) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
    }
    return isValid;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.setItem("isAdmin", "false");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}