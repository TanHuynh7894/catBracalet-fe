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
 * Tính phí vận chuyển dựa trên địa chỉ
 * @param {string} addressId 
 * @returns {Promise<Object>}
 */
export const calculateShippingFee = async (addressId) => {
    try {
        const response = await api.post('/shipments/calculate-client', { addressId });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || 'Không thể tính phí vận chuyển';
    }
};
