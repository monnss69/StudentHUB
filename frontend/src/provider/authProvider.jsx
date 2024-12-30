import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
};

const setCookie = (name, value, days = 1) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Strict`;
};

export const AuthProvider = ({ children }) => {
  // State to hold the authentication token - only used for UI purposes
  const [token, setToken_] = useState(getCookie("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    if (newToken) {
      setCookie("token", newToken);
    } else {
      // Remove cookie when logging out
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    setToken_(newToken);
  };

  // Configure axios to include credentials in requests
  axios.defaults.withCredentials = true;

  // Memoized value of the authentication context
  const contextValue = {
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// To use token, setToken in other comps
export const useAuth = () => {
  return useContext(AuthContext);
};