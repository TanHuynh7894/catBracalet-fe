import api from './api';

/**
 * @returns {Promise<Array>}
 */
export const getProvinces = async () => {
    try {
        const response = await api.get('/shipments/provinces');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || 'Không thể lấy danh sách Tỉnh/Thành phố';
    }
};


/**
 * @param {string} provinceId 
 * @returns {Promise<Array>}
 */
export const getDistricts = async (provinceId) => {
    try {
        const response = await api.get(`/shipments/districts/${provinceId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || 'Không thể lấy danh sách Quận/Huyện';
    }
};


/**
 * @param {string} districtId 
 * @returns {Promise<Array>}
 */
export const getWards = async (districtId) => {
    try {
        const response = await api.get(`/shipments/wards/${districtId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || 'Không thể lấy danh sách Phường/Xã';
    }
};

/**
 * @param {string} addressId 
 * @param {string} userId 
 * @param {Array} cartItemIds 
 * @returns {Promise<Object>}
 */
export const calculateShippingFee = async (addressId, userId = null, cartItemIds = []) => {
    try {
        const payload = {
            addressId,
            userId,
            cartItemIds
        };

        console.log('--- Calculating Shipping Fee (v2) ---');

        console.log('Payload:', JSON.stringify(payload, null, 2));

        const response = await api.post('/shipments/calculate-client', payload);
        console.log('Response:', response.data);
        console.log('--------------------------------');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || 'Không thể tính phí vận chuyển';
    }
};


/**
 * @param {string} orderId 
 * @param {Object} packageInfo 
 */
export const getShippingRates = async (orderId, packageInfo) => {
    try {
        const response = await api.post(`/shipments/orders/${orderId}/rates`, packageInfo);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || 'Không thể lấy báo giá vận chuyển';
    }
};

/**
 * @param {Object} shipmentData 
 */
export const createShipment = async (shipmentData) => {
    try {
        const response = await api.post('/shipments/create', shipmentData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || 'Không thể tạo vận đơn';
    }
};

/**
 * @param {string} orderId 
 */
export const trackShipment = async (orderId) => {
    try {
        const response = await api.get(`/shipments/track/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || 'Không thể theo dõi vận đơn';
    }
};


export const shipmentService = {
    getProvinces,
    getDistricts,
    getWards,
    calculateShippingFee,
    getShippingRates,
    createShipment,
    trackShipment
};
