import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect } from "react";

export default function ProtectedRoute() {
  console.log('ProtectedRoute');
  
  const auth = useAuth();
  useEffect(() => {
    auth.validateToken();
  }, []);
  return auth.isTokenValid? <Outlet /> : <Navigate to="/login" />;
}
