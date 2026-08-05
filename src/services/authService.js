import api from './api';

/**
 * Login API
 * @param {Object} credentials 
 * @returns {Promise}
 */
export const login = async (credentials) => {
    try {
        const response = await api.post('/user/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const register = async (userData) => {
    try {
        const response = await api.post('/user/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const verifyOtp = async (otpData) => {
    try {
        const response = await api.post('/user/verify-otp', otpData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const refreshToken = async (token) => {
    try {
        const response = await api.post('/user/refresh-token', { refreshToken: token });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const requestPasswordReset = async (email) => {
    try {
        const response = await api.post('/user/request-password-reset', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const resetPassword = async (resetData) => {
    try {
        const response = await api.post('/user/reset-password', resetData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const logout = async () => {
    try {
        const rToken = localStorage.getItem('refreshToken');
        if (rToken) {
            await api.post('/user/logout', { refreshToken: rToken });
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
};
