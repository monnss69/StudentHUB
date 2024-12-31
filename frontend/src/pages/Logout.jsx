import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { LogOut } from "lucide-react"; // Using Lucide icons for consistency
import { apiService } from "@/services/api";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogout = async () => {
    try {
      // Call backend logout
      await apiService.logout();

      // Clear frontend state
      setToken(null);

      // Clear axios state
      delete axios.defaults.headers.common["Authorization"];
      axios.defaults.withCredentials = true; // Reset this to default

      // Clear all cookies
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Clear localStorage if you're using it
      localStorage.clear();

      // Force a page reload to clear any remaining state
      window.location.href = "/";
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 
                 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
    >
      <LogOut className="h-4 w-4 mr-2" />
      <span>Logout</span>
    </button>
  );
};

export default Logout;
