import api from './api';


export const getProductCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};


export const createCategory = async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
};


export const getCategoryByName = async (name) => {
    const response = await api.get(`/categories/by-name/${name}`);
    return response.data;
};


export const getCategoryById = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
};


export const updateCategory = async (id, categoryData) => {
    const response = await api.patch(`/categories/${id}`, categoryData);
    return response.data;
};


export const deleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};


export const forceDeleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}/force`);
    return response.data;
};
