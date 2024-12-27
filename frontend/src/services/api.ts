import axios from 'axios';

interface User {
    Username: string;
    Email: string;
    PasswordHash: string;
}

const API_URL = "http://localhost:3333";

export const api = {
    getCategoryPosts: async (category: string) => {
        try {
            const response = await axios.get(`${API_URL}/post/${category}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUsersID: async (id: string) => {
        try {
            const response = await axios.get(`${API_URL}/users/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createUser: async (user: User) => {
        try {
            const response = await axios.post(`${API_URL}/users`, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}