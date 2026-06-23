import api from './api';

export const shopLocationService = {
    // Lấy thông tin cửa hàng chính (primary active)
    getShopLocation: async () => {
        const response = await api.get('/shop-location');
        return response.data;
    },

    // Lấy tất cả cửa hàng
    getAllShopLocations: async () => {
        const response = await api.get('/shop-location/all');
        return response.data;
    },

    // Lấy cửa hàng theo ID
    getShopLocationById: async (id) => {
        const response = await api.get(`/shop-location/${id}`);
        return response.data;
    },

    // Tạo cửa hàng mới
    createShopLocation: async (payload) => {
        const response = await api.post('/shop-location', payload);
        return response.data;
    },

    // Cập nhật cửa hàng (PATCH /{id})
    updateShopLocation: async (id, payload) => {
        const response = await api.patch(`/shop-location/${id}`, payload);
        return response.data;
    },

    // Xóa cửa hàng (soft delete / deactivate)
    deleteShopLocation: async (id) => {
        const response = await api.delete(`/shop-location/${id}`);
        return response.data;
    },

    // Toggle active / inactive
    toggleActive: async (id) => {
        const response = await api.patch(`/shop-location/${id}/active`);
        return response.data;
    },

    // Danh sách tỉnh/thành
    getProvinces: async () => {
        const response = await api.get('/shop-location/provinces');
        return response.data;
    },

    // Danh sách quận/huyện theo tỉnh
    getDistricts: async (provinceId) => {
        const response = await api.get(`/shop-location/districts/${provinceId}`);
        return response.data;
    },

    // Danh sách phường/xã theo quận
    getWards: async (districtId) => {
        const response = await api.get(`/shop-location/wards/${districtId}`);
        return response.data;
    },
};
