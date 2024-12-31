import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  
  // If there's no token, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Return child routes if authenticated
  return <Outlet />;
};