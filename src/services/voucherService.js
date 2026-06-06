import api from './api';

export const getAllVouchers = async () => {
    try {
        const response = await api.get('/vouchers');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getVoucherByCode = async (code) => {
    try {
        const response = await api.get(`/vouchers/code/${encodeURIComponent(code)}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getVoucherById = async (id) => {
    try {
        const response = await api.get(`/vouchers/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getActiveVouchers = async () => {
    try {
        const response = await api.get('/vouchers/filter/status/ACTIVE');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createVoucher = async (voucherData) => {
    try {
        const response = await api.post('/vouchers', voucherData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateVoucher = async (id, voucherData) => {
    try {
        const response = await api.patch(`/vouchers/${id}`, voucherData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteVoucher = async (id) => {
    try {
        const response = await api.delete(`/vouchers/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
