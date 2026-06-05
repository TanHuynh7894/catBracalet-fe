import api from './api';

/**
 * Get all users
 */
export const getAllUsers = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Get User Profile/Detail API
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
 * Update Profile (User themselves)
 */
export const updateProfile = async (id, userData) => {
    try {
        const isFormData = userData instanceof FormData;
        const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
        const response = await api.patch(`/user/profile/${id}`, userData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Update User (Admin version)
 */
export const updateUserAdmin = async (id, userData) => {
    try {
        const isFormData = userData instanceof FormData;
        const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
        const response = await api.patch(`/user/${id}`, userData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Add Role to User
 */
export const addRole = async (id, roleId) => {
    try {
        const response = await api.post(`/user/${id}/roles`, { roleId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Delete Role from User
 */
export const deleteRole = async (id, roleId) => {
    try {
        const response = await api.delete(`/user/${id}/roles`, { data: { roleId } });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Soft Delete User
 */
export const softDeleteUser = async (id) => {
    try {
        const response = await api.delete(`/user/${id}/soft-delete`);
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
