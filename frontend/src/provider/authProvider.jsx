import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
};

export const AuthProvider = ({ children }) => {
  // Initialize token state from cookie
  const [token, setToken_] = useState(() => {
    const savedToken = getCookie("token");
    if (savedToken) {
      axios.defaults.withCredentials = true;
    }
    return savedToken;
  });

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
    // Let the backend handle cookie setting
  };

  // Configure axios
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // Expose a way to check if authenticated
  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};