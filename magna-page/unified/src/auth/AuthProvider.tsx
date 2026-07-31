import React, { createContext, useContext, useState } from "react";
import { verfyToken } from "../page/api/user";

interface AuthContextType {
  isTokenValid: boolean;
  validateToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isTokenValid: false,
  validateToken: async () => { return; },
  logout: async () => { return; },
});

export function signin(access: string, refresh: string, userData?: any) {
  localStorage.setItem('token', access);
  localStorage.setItem('refreshToken', refresh);
  const existingInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const userInfo = { ...existingInfo, ...userData, access, refresh };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function getToken(): string | null {
  return localStorage.getItem('token')
    ?? JSON.parse(localStorage.getItem('userInfo') || '{}').access
    ?? null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isTokenValid, setIsTokenValid] = useState(false);

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    setIsTokenValid(false);
  };

  const validateToken = async () => {
    const tokens = localStorage.getItem('token') || JSON.parse(localStorage.getItem('userInfo') || '{}').access;
    if (!tokens) {
      setIsTokenValid(false);
      return;
    }
    const successToken = await verfyToken();
    if (successToken) {
      setIsTokenValid(true);
      return;
    }
  };

  return (
    <AuthContext.Provider value={{ isTokenValid, validateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
