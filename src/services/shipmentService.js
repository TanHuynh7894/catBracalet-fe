import api from './api';

/**
 * Lấy danh sách Tỉnh/Thành phố
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
 * Lấy danh sách Quận/Huyện theo Tỉnh/Thành phố
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
 * Lấy danh sách Phường/Xã theo Quận/Huyện
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
 * Tính phí vận chuyển dựa trên địa chỉ và cửa hàng
 * @param {string} addressId - ID địa chỉ giao hàng
 * @param {string} shopLocationId - ID cửa hàng (tùy chọn)
 * @returns {Promise<Object>}
 */
export const calculateShippingFee = async (addressId, shopLocationId = null) => {
    try {
        const payload = { addressId };
        if (shopLocationId) {
            payload.shopLocationId = shopLocationId;
        }
        console.log('--- Calculating Shipping Fee ---');
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
 * Lấy danh sách báo giá vận chuyển cho một đơn hàng (Goship)
 * @param {string} orderId 
 * @param {Object} packageInfo { weight, width, height, length, cod }
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
 * Tạo vận đơn trên Goship
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
 * Theo dõi hành trình vận đơn
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

// No default export to avoid Vite resolution issues
export const shipmentService = {
    getProvinces,
    getDistricts,
    getWards,
    calculateShippingFee,
    getShippingRates,
    createShipment,
    trackShipment
};
