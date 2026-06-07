import api from './api';

/** Lấy tất cả chất liệu */
export const getProductMaterials = async () => {
    try {
        const response = await api.get('/materials');
        return response.data;
    } catch (error) {
        console.error("Error fetching materials:", error);
        return [];
    }
};

/** Tạo chất liệu mới */
export const createMaterial = async (materialData) => {
    const response = await api.post('/materials', materialData);
    return response.data;
};

/** Tìm chất liệu theo tên */
export const getMaterialByName = async (name) => {
    const response = await api.get(`/materials/by-name/${name}`);
    return response.data;
};

/** Lấy chi tiết chất liệu theo ID */
export const getMaterialById = async (id) => {
    const response = await api.get(`/materials/${id}`);
    return response.data;
};

/** Cập nhật chất liệu */
export const updateMaterial = async (id, materialData) => {
    const response = await api.patch(`/materials/${id}`, materialData);
    return response.data;
};

/** Xóa mềm chất liệu (Patch) */
export const softDeleteMaterialPatch = async (id) => {
    const response = await api.patch(`/materials/${id}/soft-delete`);
    return response.data;
};

/** Xóa mềm chất liệu (Delete) */
export const deleteMaterial = async (id) => {
    const response = await api.patch(`/materials/${id}/soft-delete`);
    return response.data;
};

/** Xóa vĩnh viễn chất liệu */
export const forceDeleteMaterial = async (id) => {
    const response = await api.delete(`/materials/${id}/force`);
    return response.data;
};
