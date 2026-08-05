import api from './api';



/**
 * @param {Object} data 
 */
export const checkout = async (data) => {
    try {
        const response = await api.post('/orders/checkout', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.response?.data?.error || error.message;
    }
};


export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
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



export const cancelOrder = async (orderId) => {
    try {
        const response = await api.patch(`/orders/${orderId}/cancel`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};

/**
 * @param {string} orderId
 */
export const retryPayment = async (orderId) => {
    try {
        const response = await api.post('api/payment/retry', { orderId });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || error.message;
    }
};




export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const getOrdersByStatus = async (status) => {
    try {
        const response = await api.get(`/orders/status/${status}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * @param {string} orderId 
 * @param {string} status 
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
 * @param {string} start 
 * @param {string} end
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
