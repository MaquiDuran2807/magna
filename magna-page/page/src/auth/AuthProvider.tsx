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
let contador = 0;
// Crear el AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [firstView, setFirstView] = useState(0);

    const firstViewCount = () => {
        setFirstView(firstView + 1);
    }

    const logout = async () => {
        console.log('logout'+contador++);
        await localStorage.removeItem('token')
        await localStorage.removeItem('refreshToken')
        
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
    console.log(successToken, 'successToken=====================================');
    
    if(successToken){
        console.log('token valido');
        
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
// export default AuthProvider;
// Hook personalizado para acceder al contexto del AuthProvider
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
