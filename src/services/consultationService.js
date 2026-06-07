import api from './api';

/**
 * Get all consultation registrations
 */
export const getAllConsultations = async () => {
    try {
        const response = await api.get('/consultation-registrations');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Get consultation registration by ID
 */
export const getConsultationById = async (id) => {
    try {
        const response = await api.get(`/consultation-registrations/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Create new consultation registration
 */
export const createConsultation = async (consultationData) => {
    try {
        const response = await api.post('/consultation-registrations', consultationData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Delete consultation registration
 */
export const deleteConsultation = async (id) => {
    try {
        const response = await api.delete(`/consultation-registrations/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
