import api from './api';


export const getAllRoles = async () => {
    try {
        const response = await api.get('/role');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const getRoleById = async (roleId) => {
    try {
        const response = await api.get(`/role/${roleId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const createRole = async (roleData) => {
    try {
        const response = await api.post('/role', roleData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const updateRole = async (roleId, roleData) => {
    try {
        const response = await api.patch(`/role/${roleId}`, roleData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * @param {string} roleId 
 * @param {string} status 
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


export const hardDeleteRole = async (roleId) => {
    try {
        const response = await api.delete(`/role/${roleId}/hard`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
