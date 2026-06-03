import api from './api';

/**
 * Lấy danh sách tất cả sản phẩm
 * @returns {Promise<Array>}
 */
export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể lấy danh sách sản phẩm';
    }
};

/**
 * Lấy chi tiết một sản phẩm theo ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể lấy thông tin sản phẩm';
    }
};

export const getProductVariantById = async (variantId) => {
    try {
        const response = await api.get(`/product-variants/${variantId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể lấy thông tin biến thể sản phẩm';
    }
};

/**
 * Lấy tất cả biến thể sản phẩm
 */
export const getAllProductVariants = async () => {
    try {
        const response = await api.get('/product-variants');
        return response.data;
    } catch (error) {
        console.error("Error fetching all variants:", error);
        return [];
    }
};

// ─── PRODUCT VARIANT MAPPINGS ────────────────────────────────────────────────

/** Tạo mapping mới giữa product và variant */
export const createProductVariantMapping = async (mappingData) => {
    const response = await api.post('/product-variant-mappings', mappingData);
    return response.data;
};

/** Lấy tất cả mappings */
export const getAllProductVariantMappings = async () => {
    const response = await api.get('/product-variant-mappings');
    return response.data;
};

/** Lấy chi tiết mapping theo productId và variantId */
export const getProductVariantMappingDetail = async (productId, variantId) => {
    const response = await api.get(`/product-variant-mappings/${productId}/${variantId}`);
    return response.data;
};

/** Xóa mềm mapping (Patch) */
export const softDeleteProductVariantMapping = async (productId, variantId) => {
    const response = await api.patch(`/product-variant-mappings/${productId}/${variantId}/soft-delete`);
    return response.data;
};

/** Xóa vĩnh viễn mapping (Delete) */
export const forceDeleteProductVariantMapping = async (productId, variantId) => {
    const response = await api.delete(`/product-variant-mappings/${productId}/${variantId}/force`);
    return response.data;
};

// ─── FILTER & SEARCH ─────────────────────────────────────────────────────────

/**
 * Filter product variants với nhiều tiêu chí
 * @param {Object} params { keyword, categoryId, minPrice, maxPrice, color, size, rating, sortBy }
 */
export const filterProductVariants = async (params) => {
    try {
        const response = await api.get('/product-variants/filter', { params });
        return response.data;
    } catch (error) {
        console.error("Error filtering variants:", error);
        return [];
    }
};

/**
 * Tìm kiếm variant theo tên
 */
export const searchProductVariantsByName = async (name) => {
    try {
        const response = await api.get(`/product-variants/by-name/${name}`);
        return response.data;
    } catch (error) {
        console.error("Error searching variants by name:", error);
        return [];
    }
};

/**
 * Tìm kiếm sản phẩm theo tên
 */
export const searchProductsByName = async (name) => {
    try {
        const response = await api.get(`/products/by-name/${name}`);
        return response.data;
    } catch (error) {
        console.error("Error searching products by name:", error);
        return [];
    }
};

