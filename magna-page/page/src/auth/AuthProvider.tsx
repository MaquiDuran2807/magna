import React, { createContext, useContext, useState } from "react";
import { useVerfyToken } from "../api/user";

// interfaz para el contexto
interface AuthContextType {
  isTokenValid: boolean;
//   firstView: number;
//   firstViewCount: () => void;
  validateToken: () => Promise<void>;
  logout: () => Promise<void>;
}

// creación del contexto con la interfaz
const AuthContext = createContext<AuthContextType>({
  isTokenValid: false,
//   firstView: 0,
//   firstViewCount: () => {},
  validateToken: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isTokenValid, setIsTokenValid] = useState(false);
//   const [firstView, setFirstView] = useState(0);

//   const firstViewCount = () => {
//     setFirstView(firstView + 1);
//   };

  const logout = async () => {
    console.log('logout');
    await localStorage.removeItem('token');
    await localStorage.removeItem('refreshToken');
    setIsTokenValid(false);
  };

  const validateToken = async () => {
    const tokens = await localStorage.getItem('token');
    if (!tokens) {
      console.log('no hay token');
      setIsTokenValid(false);
      return;
    }
    const successToken = await useVerfyToken();
    if (successToken) {
      console.log('token valido');
      setIsTokenValid(true);
      return;
    }

  };

  return (
    <AuthContext.Provider value={{ isTokenValid,  validateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//hook useAuth 
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
