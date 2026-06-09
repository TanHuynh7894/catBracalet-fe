import api from './api';

/**
 * Get all orders for a specific user (Order History)
 */
export const getOrdersByUserId = async (userId) => {
    try {
        const response = await api.get(`/orders/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Get details for a specific order
 */
export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
/**
 * Create a new order and get checkout URL
 * @param {Object} data - { userId, addressId, voucherCode, cartItemIds }
 */
export const checkout = async (data) => {
    try {
        const response = await api.post('/orders/checkout', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || error.message;
    }
};

const orderService = {
    getOrdersByUserId,
    getOrderById,
    checkout,
};

export default orderService;
