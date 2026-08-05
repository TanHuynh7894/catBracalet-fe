import api from './api';


export const getAddressesByUserId = async (userId) => {
    try {
        const response = await api.get(`/user-address/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createAddress = async (userId, addressData) => {
    try {
        const response = await api.post(`/user-address/${userId}`, addressData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateAddress = async (userId, addressId, addressData) => {
    try {
        const response = await api.patch(`/user-address/${userId}/${addressId}`, addressData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteAddress = async (userId, addressId) => {
    try {
        const response = await api.delete(`/user-address/${userId}/${addressId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const setDefaultAddress = async (userId, addressId) => {
    try {
        const response = await api.patch(`/user-address/${userId}/${addressId}/default`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const addressService = {
    getAddressesByUserId,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
};

export default addressService;
