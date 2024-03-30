import { createContext, useContext, useEffect } from "react";
import {  useVerfyToken} from "../api/user";
import { useState } from "react";

// Crear el contexto del AuthProvider
const AuthContext = createContext({
   isTokenValid: false,
   firstView: 0,
   firstViewCount: () => {},
   validateToken: () => {},
   logout: () => {},
});

// Crear el AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [firstView, setFirstView] = useState(0);

    const firstViewCount = () => {
        setFirstView(firstView + 1);
    }

    const logout = async () => {
        setIsTokenValid(false);
    }

   const validateToken = async () => {
    const tokens = await localStorage.getItem('token');
    if(!tokens){
        console.log('no hay token');
        setIsTokenValid(false);
        setIsLoading(false);
        return;
    }
    const successToken = await useVerfyToken();
    if(successToken){
        setIsTokenValid(true);
        setIsLoading(false);
        return;
        }
        setIsLoading(false);
    }
    useEffect(() => {
        validateToken();
    }, []);

    return (
        <AuthContext.Provider value={{  isTokenValid, firstView, validateToken, logout,firstViewCount}}>
            {isLoading ? <div>loading...</div> :children}
        </AuthContext.Provider>
    );
}
// Hook personalizado para acceder al contexto del AuthProvider
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
