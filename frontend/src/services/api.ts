import axios from 'axios';
import { CreateUserInput, CreatePostInput, LogInInput } from './types';

const API_URL = "http://localhost:3333";

export const api = {
    getCategoryPosts: async (category: string) => {
        try {
            const response = await axios.get(`${API_URL}/${category}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    uploadPost: async (post: CreatePostInput) => {
        try {
            const response = await axios.post(`${API_URL}/post`, post);
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
    createUser: async (user: CreateUserInput) => {
        try {
            const response = await axios.post(`${API_URL}/users`, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getCategory: async () => {
        try {
            const response = await axios.get(`${API_URL}/category`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userLogIn: async (user: LogInInput) => {
        try {
            const response = await axios.post(`${API_URL}/login`, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}