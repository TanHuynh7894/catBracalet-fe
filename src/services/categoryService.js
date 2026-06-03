import api from './api';

/** Lấy tất cả danh mục */
export const getProductCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

/** Tạo danh mục mới */
export const createCategory = async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
};

/** Tìm danh mục theo tên */
export const getCategoryByName = async (name) => {
    const response = await api.get(`/categories/by-name/${name}`);
    return response.data;
};

/** Lấy chi tiết danh mục theo ID */
export const getCategoryById = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
};

/** Cập nhật danh mục */
export const updateCategory = async (id, categoryData) => {
    const response = await api.patch(`/categories/${id}`, categoryData);
    return response.data;
};

/** Xóa mềm danh mục */
export const deleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};

/** Xóa vĩnh viễn danh mục */
export const forceDeleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}/force`);
    return response.data;
};
