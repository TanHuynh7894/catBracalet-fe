import api from './api';


export const getProductMaterials = async () => {
    try {
        const response = await api.get('/materials');
        return response.data;
    } catch (error) {
        console.error("Error fetching materials:", error);
        return [];
    }
};


export const createMaterial = async (materialData) => {
    const response = await api.post('/materials', materialData);
    return response.data;
};


export const getMaterialByName = async (name) => {
    const response = await api.get(`/materials/by-name/${name}`);
    return response.data;
};


export const getMaterialById = async (id) => {
    const response = await api.get(`/materials/${id}`);
    return response.data;
};


export const updateMaterial = async (id, materialData) => {
    const response = await api.patch(`/materials/${id}`, materialData);
    return response.data;
};


export const softDeleteMaterialPatch = async (id) => {
    const response = await api.patch(`/materials/${id}/soft-delete`);
    return response.data;
};


export const deleteMaterial = async (id) => {
    const response = await api.patch(`/materials/${id}/soft-delete`);
    return response.data;
};


export const forceDeleteMaterial = async (id) => {
    const response = await api.delete(`/materials/${id}/force`);
    return response.data;
};
