import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData: any) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const login = async (userData: any) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};
