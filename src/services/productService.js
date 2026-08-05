import api from './api';

/**
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
 * @param {Object} params 
 */
export const filterProducts = async (params) => {
    try {
        const response = await api.get('/products/filter', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể lọc danh sách sản phẩm';
    }
};

/**
 * @param {string} name 
 */
export const searchProductsByName = async (name) => {
    try {
        const response = await api.get(`/products/by-name/${name}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể tìm kiếm sản phẩm';
    }
};

/**
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

/**
 * @param {FormData} formData 
 */
export const createProduct = async (formData) => {
    try {
        const response = await api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể tạo sản phẩm mới';
    }
};



/**
 * @param {string} id 
 * @param {FormData} formData 
 */
export const updateProduct = async (id, formData) => {
    try {
        const response = await api.patch(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể cập nhật sản phẩm';
    }
};

/**
 * @param {string} id 
 */
export const softDeleteProduct = async (id) => {
    try {
        const response = await api.patch(`/products/${id}/soft-delete`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa (mềm) sản phẩm';
    }
};

/**
 * @param {string} id 
 */
export const forceDeleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}/force`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa vĩnh viễn sản phẩm';
    }
};



/**
 * @param {Object} params 
 */
export const filterProductVariants = async (params) => {
    try {
        const response = await api.get('/product-variants/filter', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể lọc biến thể';
    }
};

/**
 * @param {string} variantId
 */
export const getProductVariantById = async (variantId) => {
    try {
        const response = await api.get(`/product-variants/${variantId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể lấy chi tiết biến thể';
    }
};


export const getAllProductVariants = async () => {
    try {
        const response = await api.get('/product-variants');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể lấy danh sách biến thể';
    }
};

/**
 * @param {Object} data 
 */
export const createProductVariant = async (data) => {
    try {
        const response = await api.post('/product-variants', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể tạo biến thể';
    }
};

/**
 * @param {string} id 
 * @param {Object} data 
 */
export const updateProductVariant = async (id, data) => {
    try {
        const response = await api.patch(`/product-variants/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể cập nhật biến thể';
    }
};

/**
 * @param {string} id 
 */
export const softDeleteProductVariant = async (id) => {
    try {
        const response = await api.patch(`/product-variants/${id}/soft-delete`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa (mềm) biến thể';
    }
};

/**
 * @param {string} id 
 */
export const forceDeleteProductVariant = async (id) => {
    try {
        const response = await api.delete(`/product-variants/${id}/force`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa vĩnh viễn biến thể';
    }
};



/**
 * @param {Object} data 
 */
export const createProductVariantMapping = async (data) => {
    try {
        const response = await api.post('/product-variant-mappings', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể tạo mapping biến thể';
    }
};


export const softDeleteProductVariantMapping = async (productId, variantId) => {
    try {
        const response = await api.patch(`/product-variant-mappings/${productId}/${variantId}/soft-delete`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa mềm mapping';
    }
};



export const forceDeleteProductVariantMapping = async (productId, variantId) => {
    try {
        const response = await api.delete(`/product-variant-mappings/${productId}/${variantId}/force`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa vĩnh viễn mapping';
    }
};



/**
 * @param {string} productId 
 * @param {File} file 
 */
export const addProductImage = async (productId, file) => {
    try {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('type', 'P');
        formData.append('file', file);

        const response = await api.post('/product-images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể thêm ảnh sản phẩm';
    }
};

/**
 * @param {string} imageId 
 */
export const softDeleteProductImage = async (imageId) => {
    try {
        const response = await api.patch(`/product-images/${imageId}/soft-delete`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa mềm ảnh sản phẩm';
    }
};

/**
 * @param {string} imageId 
 */
export const deleteProductImage = async (imageId) => {
    try {
        const response = await api.delete(`/product-images/${imageId}/force`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Không thể xóa vĩnh viễn ảnh sản phẩm';
    }
};
/**

 * @param {string} productId 
 */
export const getProductImagesByProductId = async (productId) => {
    try {
        const response = await api.get('/product-images');
        const allImages = response.data;
        return Array.isArray(allImages) ? allImages.filter(img => (img.productId == productId || img.product_id == productId)) : [];
    } catch (error) {
        return [];
    }
};
