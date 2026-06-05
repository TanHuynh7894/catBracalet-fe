import api from './api';

/**
 * Get all roles
 */
export const getAllRoles = async () => {
    try {
        const response = await api.get('/role');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Get role by ID
 */
export const getRoleById = async (roleId) => {
    try {
        const response = await api.get(`/role/${roleId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Create new role
 */
export const createRole = async (roleData) => {
    try {
        const response = await api.post('/role', roleData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Update role
 */
export const updateRole = async (roleId, roleData) => {
    try {
        const response = await api.patch(`/role/${roleId}`, roleData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Delete role (soft delete)
 * @param {string} roleId 
 * @param {string} status - New status after soft delete (e.g. 'INACTIVE')
 */
export const deleteRoleSoft = async (roleId, status = 'INACTIVE') => {
    try {
        const response = await api.delete(`/role/${roleId}`, {
            params: { status }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Hard Delete Role (Permanently remove from DB)
 */
export const hardDeleteRole = async (roleId) => {
    try {
        const response = await api.delete(`/role/${roleId}/hard`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
