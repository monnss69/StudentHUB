import axios from 'axios';

const API_URL = "http://localhost:3333";

export const api = {
    getCategoryPosts: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/post/${category}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUsersID: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/users/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}