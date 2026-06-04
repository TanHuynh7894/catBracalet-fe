import api from './api';

/**
 * Lấy giỏ hàng của user hiện tại
 * @returns {Promise<Object>}
 */
export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể lấy giỏ hàng';
    }
};

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {string} variantId
 * @param {number} quantity
 * @returns {Promise<Object>}
 */
export const addToCart = async (variantId, quantity = 1) => {
    try {
        const response = await api.post('/cart/add', { variantId, quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể thêm vào giỏ hàng';
    }
};

/**
 * Cập nhật số lượng item trong giỏ
 * @param {string} cartItemId
 * @param {number} quantity
 * @returns {Promise<Object>}
 */
export const updateCartItem = async (cartItemId, quantity) => {
    try {
        const response = await api.patch(`/cart/item/${cartItemId}`, { quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể cập nhật số lượng';
    }
};

/**
 * Xóa một item khỏi giỏ hàng
 * @param {string} cartItemId
 * @returns {Promise<Object>}
 */
export const removeCartItem = async (cartItemId) => {
    try {
        const response = await api.delete(`/cart/item/${cartItemId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa sản phẩm';
    }
};

/**
 * Xóa toàn bộ giỏ hàng
 * @returns {Promise<Object>}
 */
export const clearCart = async () => {
    try {
        const response = await api.delete('/cart/clear');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa giỏ hàng';
    }
};
