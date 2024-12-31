import axios from 'axios';
import { CreateUserInput, CreatePostInput, LogIn } from './types';

// Create an axios instance with default config
const api = axios.create({
    baseURL: "http://localhost:3333",
    withCredentials: true, // This is crucial for sending cookies
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to ensure auth header is set before each request
api.interceptors.request.use((config) => {
    // Get token from cookie
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

// Export our API methods
export const apiService = {
    getCategoryPosts: async (category: string) => {
        try {
            const response = await api.get(`/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    uploadPost: async (post: CreatePostInput) => {
        try {
            const response = await api.post('/post', post);
            return response.data;
        } catch (error) {
            console.error('Error uploading post:', error);
            throw error;
        }
    },

    getUsersID: async (id: string) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    createUser: async (user: CreateUserInput) => {
        try {
            const response = await api.post('/users', user);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    getCategory: async () => {
        try {
            const response = await api.get('/category');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    userLogin: async (user: LogIn) => {
        try {
            const response = await api.post('/auth', user);
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },
    logout: async () => {
        try {
            // Clear the cookie on the server side
            const userConfirm = window.confirm('Are you sure you want to logout?');
            if (userConfirm) {
                await api.post('/auth/logout');
                return true;
            }
        } catch (error) {
            console.error('Error during logout:', error);
            // Even if the server call fails, we still want to clear local state
            return true;
        }
    },
};