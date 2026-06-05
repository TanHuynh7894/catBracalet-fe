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
 * Update Profile/User API
 */
export const updateProfile = async (id, userData) => {
    try {
        // According to user provided info, update user also uses /user/{id} 
        // while profile update might use /user/profile/{id}
        // We'll provide both or consolidate based on user preference
        const response = await api.patch(`/user/${id}`, userData);
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
