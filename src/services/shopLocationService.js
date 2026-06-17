import api from './api';

export const shopLocationService = {
    // Lấy thông tin cửa hàng chính (primary)
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
};
