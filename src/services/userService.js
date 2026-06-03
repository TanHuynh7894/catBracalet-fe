import api from './api';

/**
 * Get User Profile API
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
