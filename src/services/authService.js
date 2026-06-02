import api from './api';

/**
 * Login API
 * @param {Object} credentials - { email, password }
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

/**
 * Register API
 */
export const register = async (userData) => {
    try {
        const response = await api.post('/user/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Verify OTP API
 */
export const verifyOtp = async (otpData) => {
    try {
        const response = await api.post('/user/verify-otp', otpData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Refresh Token API
 */
export const refreshToken = async (token) => {
    try {
        const response = await api.post('/user/refresh-token', { refreshToken: token });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Get Profile API
 */
export const getProfile = async (id) => {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Request Password Reset API
 */
export const requestPasswordReset = async (email) => {
    try {
        const response = await api.post('/user/request-password-reset', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Reset Password API
 */
export const resetPassword = async (resetData) => {
    try {
        const response = await api.post('/user/reset-password', resetData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Logout utility
 */
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

/**
 * Update Profile API
 */
export const updateProfile = async (id, userData) => {
    try {
        const response = await api.patch(`/user/profile/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Change Password API
 */
export const changePassword = async (id, passwordData) => {
    try {
        const response = await api.post(`/user/change-password/${id}`, passwordData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
