import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import { LogOut } from 'lucide-react'; // Using Lucide icons for consistency
import { apiService } from '@/services/api';

const Logout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogout = () => {
    // Clear the authentication token
    setToken(null);

    // Clear any other user-related data from localStorage if you have any
    localStorage.clear();
    apiService.logout();

    // Navigate to the home page
    navigate('/', { replace: true });
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