import React, { useState } from 'react';
import { User, Lock, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Login = ({ setLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await api.userLogIn(formData);
      if (result.authenticated === true) { 
        setLogin(true);
      } else {
        window.alert('Invalid credentials');
      }
    } catch (err) {
      console.error('Failed to login:', err);
      window.alert('Failed to login. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-md w-full mx-4 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg -mt-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <User className="h-5 w-5 text-teal-500" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Lock className="h-5 w-5 text-teal-500" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign in
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center text-sm">
          <a href="#" className="text-teal-600 hover:text-teal-700 transition-colors">
            <Link to="/register">New to StudentHub? Create an account</Link>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;