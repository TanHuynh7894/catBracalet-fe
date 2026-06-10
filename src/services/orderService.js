import api from './api';

// ─── USER & ADMIN SHARED ──────────────────────────────────────

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
 * Get all orders by a specific user ID
 * @param {string} userId
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
 * Cancel an order (User can cancel PENDING orders)
 */
export const cancelOrder = async (orderId) => {
    try {
        const response = await api.patch(`/orders/${orderId}/cancel`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};

/**
 * Retry payment for an existing unpaid order
 */
export const retryPayment = async (orderId) => {
    try {
        // Assuming your retry endpoint is standard
        const response = await api.post('/payment/retry', { orderId });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};

// ─── ADMIN / STAFF ONLY ──────────────────────────────────────

/**
 * Get all orders in the system (Admin/Staff)
 */
export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Filter orders by status
 */
export const getOrdersByStatus = async (status) => {
    try {
        const response = await api.get(`/orders/status/${status}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Update order status (Confirm, Ship, etc.)
 * @param {string} orderId 
 * @param {string} status - e.g., "CONFIRMED", "DELIVERED"
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.patch(`/orders/${orderId}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};

/**
 * Get orders by time range
 * @param {string} start - Date string
 * @param {string} end - Date string
 */
export const getOrdersByTime = async (start, end) => {
    try {
        const response = await api.get('/orders/filter/time', { params: { start, end } });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Confirm order (after payment)
 * @param {string} orderId 
 */
export const confirmOrder = async (orderId) => {
    try {
        const response = await api.patch(`/orders/${orderId}/confirm`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};

// Use named export for consistency
export const orderService = {
    checkout,
    getOrderById,
    cancelOrder,
    retryPayment,
    getAllOrders,
    getOrdersByStatus,
    updateOrderStatus,
    getOrdersByTime,
    confirmOrder
};
