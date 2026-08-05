import api from './api';


export const getAllConsultations = async () => {
    try {
        const response = await api.get('/consultation-registrations');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const getConsultationById = async (id) => {
    try {
        const response = await api.get(`/consultation-registrations/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const createConsultation = async (consultationData) => {
    try {
        const response = await api.post('/consultation-registrations', consultationData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const deleteConsultation = async (id) => {
    try {
        const response = await api.delete(`/consultation-registrations/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
