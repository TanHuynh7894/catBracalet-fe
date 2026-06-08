import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronDown,
    Plus,
    X,
    Trash2,
    Save,
    Loader2,
    Image as ImageIcon,
    AlertCircle,
    Eye,
    EyeOff,
    Package
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import {
    getProductById,
    updateProduct,
    forceDeleteProduct,
    softDeleteProduct,
    addProductImage,
    deleteProductImage,
    softDeleteProductImage,
    getProductImagesByProductId,
    createProductVariant,
    updateProductVariant,
    softDeleteProductVariant,
    forceDeleteProductVariant,
    softDeleteProductVariantMapping,
    getAllProductVariants
} from '../../services/productService';
import { getProductCategories } from '../../services/categoryService';
import { getProductMaterials } from '../../services/materialService';
import { useToast } from '../../context/ToastContext';

const AdminProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast, showConfirm } = useToast();

    const [product, setProduct] = useState(null);
    const [productGallery, setProductGallery] = useState([]);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        productName: '',
        basePrice: '',
        categoryId: '',
        description: '',
        materialIds: [],
        type: 'P'
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Variant State
    const [productVariants, setProductVariants] = useState([]);
    const [showVariantModal, setShowVariantModal] = useState(false);
    const [editingVariant, setEditingVariant] = useState(null);
    const [variantFormData, setVariantFormData] = useState({
        sku: '',
        size: '',
        color: '',
        stockQuantity: '',
        extraPrice: ''
    });

    useEffect(() => {
        fetchInitialData();
    }, [id]);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [prodData, cats, mats, images] = await Promise.all([
                getProductById(id),
                getProductCategories(),
                getProductMaterials(),
                getProductImagesByProductId(id)
            ]);

            setProduct(prodData);
            setProductGallery(images);

            // Lấy tất cả variants và lọc theo sản phẩm này
            const allVariants = await getAllProductVariants();
            const filteredVariants = Array.isArray(allVariants) ? allVariants.filter(v =>
                (v.productVariantMappings || v.product_variant_mappings)?.some(m => m.productId === id || m.product_id === id)
            ) : [];

            setProductVariants(filteredVariants);
            setCategories(cats);
            setMaterials(mats);

            // Initialize form
            setFormData({
                productName: prodData.productName || '',
                basePrice: prodData.basePrice || '',
                categoryId: prodData.categoryId || '',
                description: prodData.description || '',
                materialIds: prodData.product_materials?.map(pm => pm.material_id) || [],
                type: 'P'
            });
            setPreviewUrl(prodData.thumbnail);
        } catch (error) {
            showToast("Không thể lấy thông tin sản phẩm");
            navigate('/admin/products');
        } finally {
            setLoading(false);
        }
    };

    const fetchGalleryOnly = async () => {
        try {
            const images = await getProductImagesByProductId(id);
            setProductGallery(images);
        } catch (error) {
            console.error("Error refreshing gallery:", error);
        }
    };

    const fetchVariantsOnly = async () => {
        try {
            const allVariants = await getAllProductVariants();
            const filteredVariants = Array.isArray(allVariants) ? allVariants.filter(v =>
                (v.productVariantMappings || v.product_variant_mappings)?.some(m => m.productId === id || m.product_id === id)
            ) : [];
            setProductVariants(filteredVariants);
        } catch (error) {
            console.error("Error refreshing variants:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleMaterialToggle = (materialId) => {
        setFormData(prev => ({
            ...prev,
            materialIds: prev.materialIds.includes(materialId)
                ? prev.materialIds.filter(mid => mid !== materialId)
                : [...prev.materialIds, materialId]
        }));
    };

    const handleUpdate = async () => {
        if (!formData.productName || !formData.basePrice) {
            showToast("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('type', formData.type);
            data.append('productName', formData.productName);
            data.append('basePrice', formData.basePrice);
            if (formData.categoryId) data.append('categoryId', formData.categoryId);
            data.append('description', formData.description || '');

            // Append multiple materialIds
            formData.materialIds.forEach(mid => {
                data.append('materialIds[]', mid);
            });

            if (thumbnailFile) {
                data.append('thumbnail', thumbnailFile);
            }

            await updateProduct(id, data);
            showToast("Cập nhật sản phẩm thành công!", 'success');
            fetchInitialData(); // Refresh data
        } catch (error) {
            showToast(error.toString(), 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        showConfirm(
            "Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm này? Hành động này không thể hoàn tác.",
            async () => {
                try {
                    await forceDeleteProduct(id);
                    showToast("Đã xóa sản phẩm vĩnh viễn", 'success');
                    navigate('/admin/products');
                } catch (error) {
                    showToast(error.toString(), 'error');
                }
            }
        );
    };

    const handleSoftDelete = async () => {
        const isTurningOn = product.status !== 'ACTIVE';
        const actionText = isTurningOn ? 'kích hoạt' : 'ngưng hoạt động';

        showConfirm(
            `Bạn có chắc chắn muốn ${actionText} sản phẩm này?`,
            async () => {
                const originalStatus = product.status;
                const nextStatus = originalStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

                // Optimistic Update: Cập nhật UI ngay lập tức
                setProduct(prev => ({ ...prev, status: nextStatus }));

                try {
                    await softDeleteProduct(id);
                    showToast(`Đã ${actionText} sản phẩm thành công`, 'success');
                } catch (error) {
                    // Hoàn tác nếu lỗi
                    setProduct(prev => ({ ...prev, status: originalStatus }));
                    showToast(error.toString(), 'error');
                }
            }
        );
    };

    const handleAddDetailImage = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsSubmitting(true);
        try {
            for (const file of files) {
                await addProductImage(id, file);
            }
            showToast(`Đã thêm ${files.length} ảnh mới`, 'success');
            fetchGalleryOnly();
        } catch (error) {
            showToast(error.toString(), 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSoftDeleteDetailImage = async (imageId, currentStatus) => {
        const actionText = currentStatus === 'ACTIVE' ? 'ẩn' : 'hiển thị';
        try {
            await softDeleteProductImage(imageId);
            showToast(`Đã ${actionText} ảnh`, 'success');
            fetchGalleryOnly();
        } catch (error) {
            showToast(error.toString(), 'error');
        }
    };

    const handleForceDeleteDetailImage = async (imageId) => {
        showConfirm(
            "Bạn có chắc chắn muốn XÓA VĨNH VIỄN ảnh này? Hành động này không thể hoàn tác.",
            async () => {
                try {
                    await deleteProductImage(imageId);
                    showToast("Đã xóa vĩnh viễn ảnh", 'success');
                    fetchGalleryOnly();
                } catch (error) {
                    showToast(error.toString(), 'error');
                }
            }
        );
    };

    // --- VARIANT HANDLERS ---
    const handleOpenVariantModal = (v = null) => {
        if (v) {
            setEditingVariant(v);
            setVariantFormData({
                sku: v.sku || '',
                size: v.size || '',
                color: v.color || '',
                stockQuantity: v.stockQuantity || '',
                extraPrice: v.extraPrice || ''
            });
        } else {
            setEditingVariant(null);
            setVariantFormData({
                sku: '',
                size: '',
                color: '',
                stockQuantity: '',
                extraPrice: ''
            });
        }
        setShowVariantModal(true);
    };

    const handleSaveVariant = async () => {
        if (!variantFormData.sku) {
            showToast("Vui lòng nhập SKU", "error");
            return;
        }
        setIsSubmitting(true);
        try {
            if (editingVariant) {
                await updateProductVariant(editingVariant.id, variantFormData);
                showToast("Cập nhật biến thể thành công", "success");
            } else {
                await createProductVariant({
                    ...variantFormData,
                    productId: id
                });
                showToast("Thêm biến thể thành công", "success");
            }
            setShowVariantModal(false);
            fetchVariantsOnly();
        } catch (error) {
            showToast(error.toString(), "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSoftDeleteVariant = async (variantId, currentStatus) => {
        const actionText = currentStatus === 'ACTIVE' ? 'ẩn' : 'kích hoạt';
        try {
            await softDeleteProductVariant(variantId);
            showToast(`Đã ${actionText} biến thể`, 'success');
            fetchVariantsOnly();
        } catch (error) {
            showToast(error.toString(), 'error');
        }
    };

    const handleForceDeleteVariant = async (variantId) => {
        showConfirm(
            "Bạn có chắc chắn muốn XÓA VĨNH VIỄN biến thể này? Hành động này không thể hoàn tác.",
            async () => {
                try {
                    await forceDeleteProductVariant(variantId);
                    showToast("Đã xóa vĩnh viễn biến thể", 'success');
                    fetchVariantsOnly();
                } catch (error) {
                    showToast(error.toString(), 'error');
                }
            }
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-[#680006]" size={48} />
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/products')} className="p-2 hover:bg-gray-100 rounded-xl border border-gray-200 bg-white transition-all shadow-sm">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${product.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {product.status}
                            </span>
                            <h1 className="text-2xl font-headline text-gray-800">{product.productName}</h1>
                        </div>
                        <p className="text-xs text-gray-400 font-mono mt-1">ID: {product.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trạng thái</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={product.status === 'ACTIVE'}
                                onChange={handleSoftDelete}
                            />
                            <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 border border-red-200 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 transition-all flex items-center gap-2"
                    >
                        <Trash2 size={16} />
                        Xóa vĩnh viễn
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 pb-32">
                {/* Main Content */}
                <div className="col-span-8 space-y-8">
                    {/* General Info */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">Thông tin cơ bản</h2>

                        <div className="grid gap-6">
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase mb-2 block">Tên sản phẩm *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#680006] outline-none text-sm transition-all shadow-sm"
                                    value={formData.productName}
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[11px] font-bold text-gray-500 uppercase mb-2 block">Giá cơ bản (VNĐ) *</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#680006] outline-none text-sm transition-all shadow-sm"
                                        value={formData.basePrice}
                                        onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-gray-500 uppercase mb-2 block">Danh mục</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#680006] outline-none text-sm appearance-none bg-white transition-all shadow-sm"
                                            value={formData.categoryId}
                                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase mb-2 block">Mô tả sản phẩm</label>
                                <textarea
                                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-[#680006] outline-none text-sm min-h-[200px] transition-all shadow-sm leading-relaxed"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Nhập mô tả chi tiết sản phẩm..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Gallery */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Ảnh chi tiết (Gallery)</h2>
                            <label className="cursor-pointer px-4 py-2 bg-[#680006] text-white rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-[#500005] transition-all shadow-lg shadow-red-900/10">
                                <span>Thêm ảnh</span>
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAddDetailImage}
                                />
                            </label>
                        </div>

                        {(productGallery && productGallery.length > 0) ? (
                            <div className="grid grid-cols-4 gap-4">
                                {productGallery.map(img => (
                                    <div key={img.id} className={`relative aspect-square group rounded-xl overflow-hidden border border-gray-100 ${img.status === 'INACTIVE' ? 'opacity-70 bg-gray-100' : ''}`}>
                                        <img
                                            src={img.imageUrl || img.url}
                                            alt="Product item"
                                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${img.status === 'INACTIVE' ? 'grayscale brightness-75' : ''}`}
                                        />

                                        {img.status === 'INACTIVE' && (
                                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[9px] font-bold rounded-md backdrop-blur-sm">
                                                ĐÃ ẨN
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleSoftDeleteDetailImage(img.id, img.status)}
                                                className={`p-2 rounded-full transition-all backdrop-blur-md ${img.status === 'ACTIVE' ? 'bg-white/20 hover:bg-yellow-500 text-white' : 'bg-[#680006] text-white hover:bg-[#500005]'}`}
                                                title={img.status === 'ACTIVE' ? "Ẩn ảnh" : "Hiện ảnh"}
                                            >
                                                {img.status === 'ACTIVE' ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                            <button
                                                onClick={() => handleForceDeleteDetailImage(img.id)}
                                                className="p-2 bg-white/20 hover:bg-red-500 text-white rounded-full transition-all backdrop-blur-md"
                                                title="Xóa vĩnh viễn"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400">
                                <Plus size={32} strokeWidth={1} className="mb-2 opacity-20" />
                                <p className="text-xs">Chưa có ảnh chi tiết nào.</p>
                            </div>
                        )}
                    </div>

                    {/* Materials */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4 mb-6">Chất liệu sử dụng</h2>
                        <div className="flex flex-wrap gap-3">
                            {materials.map(mat => (
                                <button
                                    key={mat.id}
                                    type="button"
                                    onClick={() => handleMaterialToggle(mat.id)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${formData.materialIds.includes(mat.id)
                                        ? 'bg-[#680006] text-white border-[#680006] shadow-md'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#680006] hover:text-[#680006]'
                                        }`}
                                >
                                    {mat.materialName}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Variant Management */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Phân loại sản phẩm (Variants)</h2>
                            <button
                                onClick={() => handleOpenVariantModal()}
                                className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/10 flex items-center gap-2"
                            >
                                <Plus size={14} />
                                Thêm phiên bản
                            </button>
                        </div>

                        {productVariants.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                            <th className="py-4 font-bold">SKU</th>
                                            <th className="py-4 font-bold">Size</th>
                                            <th className="py-4 font-bold">Màu sắc</th>
                                            <th className="py-4 font-bold">Kho</th>
                                            <th className="py-4 font-bold">Giá thêm</th>
                                            <th className="py-4 font-bold text-right">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {productVariants.map(v => (
                                            <tr key={v.id} className={`group hover:bg-gray-50 transition-colors ${v.status === 'INACTIVE' ? 'opacity-50' : ''}`}>
                                                <td className="py-4">
                                                    <span className="font-mono font-bold text-gray-700">{v.sku}</span>
                                                    {v.status === 'INACTIVE' && <span className="ml-2 text-[9px] bg-gray-200 px-1 rounded text-gray-500">HIDDEN</span>}
                                                </td>
                                                <td className="py-4 text-gray-600">{v.size || '-'}</td>
                                                <td className="py-4 text-gray-600">{v.color || '-'}</td>
                                                <td className="py-4">
                                                    <span className={`font-bold ${v.stockQuantity < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                                                        {v.stockQuantity}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-emerald-600 font-bold">+{Number(v.extraPrice).toLocaleString()}đ</td>
                                                <td className="py-4 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleOpenVariantModal(v)}
                                                            className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                                                            title="Sửa"
                                                        >
                                                            <Save size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleSoftDeleteVariant(v.id, v.status)}
                                                            className={`p-1.5 rounded-lg transition-colors ${v.status === 'ACTIVE' ? 'hover:bg-yellow-50 text-yellow-500' : 'hover:bg-green-50 text-green-500'}`}
                                                            title={v.status === 'ACTIVE' ? "Ẩn" : "Hiện"}
                                                        >
                                                            {v.status === 'ACTIVE' ? <EyeOff size={14} /> : <Eye size={14} />}
                                                        </button>
                                                        <button
                                                            onClick={() => handleForceDeleteVariant(v.id)}
                                                            className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                                            title="Xóa vĩnh viễn"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400">
                                <Package size={32} strokeWidth={1} className="mb-2 opacity-20" />
                                <p className="text-xs">Chưa có phiên bản nào cho sản phẩm này.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-8">
                    {/* Image / Media */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">Ảnh đại diện</h2>
                        <div
                            className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-[#680006] hover:text-[#680006] transition-all cursor-pointer bg-gray-50 overflow-hidden relative group"
                            onClick={() => document.getElementById('thumbnailInputUpdate').click()}
                        >
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <p className="text-white text-xs font-bold uppercase tracking-widest">Thay đổi ảnh</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Plus size={32} strokeWidth={1.5} />
                                    <span className="text-[10px] font-bold mt-2">Tải ảnh lên</span>
                                </>
                            )}
                        </div>
                        <input
                            id="thumbnailInputUpdate"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <p className="text-[10px] text-gray-400 text-center italic">Định dạng hỗ trợ: JPG, PNG, WEBP. Dung lượng tối đa: 5MB.</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-[#680006] p-8 rounded-2xl shadow-xl text-white">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mb-6">Thống kê nhanh</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                                <span className="opacity-70">Chất liệu:</span>
                                <span className="font-bold">{formData.materialIds.length} loại</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                                <span className="opacity-70">Danh mục:</span>
                                <span className="font-bold truncate max-w-[150px]">
                                    {categories.find(c => c.id === formData.categoryId)?.categoryName || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Actions */}
            <div className="fixed bottom-0 left-64 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-6 flex justify-end gap-4 px-12 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-[40]">
                <button
                    onClick={() => navigate('/admin/products')}
                    className="px-8 py-3 text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors"
                >
                    Hủy bỏ
                </button>
                <button
                    onClick={handleUpdate}
                    disabled={isSubmitting}
                    className="px-12 py-3 bg-[#680006] text-white rounded-xl font-bold text-sm shadow-[0_10px_20px_-5px_rgba(104,0,6,0.3)] hover:bg-[#4d0004] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Lưu thay đổi
                </button>
            </div>
            {/* Variant Modal */}
            {showVariantModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="bg-[#680006] p-6 text-white flex justify-between items-center">
                            <h3 className="text-lg font-headline">
                                {editingVariant ? 'Cập nhật phiên bản' : 'Thêm phiên bản mới'}
                            </h3>
                            <button onClick={() => setShowVariantModal(false)} className="hover:rotate-90 transition-transform">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-8 space-y-5">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Mã SKU *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#680006] outline-none text-sm transition-all"
                                    placeholder="Vd: BRAC-RED-S"
                                    value={variantFormData.sku}
                                    onChange={(e) => setVariantFormData({ ...variantFormData, sku: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Kích thước (Size)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#680006] outline-none text-sm transition-all"
                                        placeholder="Vd: 15cm"
                                        value={variantFormData.size}
                                        onChange={(e) => setVariantFormData({ ...variantFormData, size: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Màu sắc</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#680006] outline-none text-sm transition-all"
                                        placeholder="Vd: Đỏ đô"
                                        value={variantFormData.color}
                                        onChange={(e) => setVariantFormData({ ...variantFormData, color: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Số lượng kho</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#680006] outline-none text-sm transition-all"
                                        value={variantFormData.stockQuantity}
                                        onChange={(e) => setVariantFormData({ ...variantFormData, stockQuantity: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Giá chênh lệch (+)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#680006] outline-none text-sm transition-all"
                                        placeholder="0"
                                        value={variantFormData.extraPrice}
                                        onChange={(e) => setVariantFormData({ ...variantFormData, extraPrice: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={() => setShowVariantModal(false)}
                                className="px-6 py-2.5 text-gray-500 font-bold text-xs"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleSaveVariant}
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-[#680006] text-white rounded-xl font-bold text-xs shadow-lg shadow-red-900/20 flex items-center gap-2"
                            >
                                {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                                {editingVariant ? 'Cập nhật' : 'Thêm ngay'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductDetail;
