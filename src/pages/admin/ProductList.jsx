import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Download, Upload, Plus, ChevronDown, Trash2, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';
import { getProducts, searchProductsByName, createProduct, softDeleteProduct, forceDeleteProduct } from '../../services/productService';
import { getProductCategories } from '../../services/categoryService';
import { getProductMaterials } from '../../services/materialService';
import { useToast } from '../../context/ToastContext';

const ProductList = () => {
    const navigate = useNavigate();
    const { showToast, showConfirm } = useToast();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form state for creating product
    const [formData, setFormData] = useState({
        productName: '',
        basePrice: '',
        categoryId: '',
        description: '',
        materialIds: [],
        type: 'P' // Required for Multer classification
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
        fetchMetadata();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            showToast(error.toString());
        } finally {
            setLoading(false);
        }
    };

    const fetchMetadata = async () => {
        try {
            const [cats, mats] = await Promise.all([
                getProductCategories(),
                getProductMaterials()
            ]);
            setCategories(cats);
            setMaterials(mats);
        } catch (error) {
            console.error("Error fetching metadata:", error);
        }
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            fetchData();
        } else {
            try {
                const results = await searchProductsByName(query);
                // The API might return an array of arrays or just an array based on the example
                setProducts(Array.isArray(results) ? (Array.isArray(results[0]) ? results[0] : results) : []);
            } catch (error) {
                console.error("Search error:", error);
            }
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
                ? prev.materialIds.filter(id => id !== materialId)
                : [...prev.materialIds, materialId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            if (formData.description) data.append('description', formData.description);

            // Append multiple materialIds
            formData.materialIds.forEach(id => {
                data.append('materialIds[]', id);
            });

            if (thumbnailFile) {
                data.append('thumbnail', thumbnailFile);
            }

            await createProduct(data);
            showToast("Tạo sản phẩm thành công!");
            setIsCreateModalOpen(false);
            resetForm();
            fetchData();
        } catch (error) {
            showToast(error.toString());
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            productName: '',
            basePrice: '',
            categoryId: '',
            description: '',
            materialIds: [],
            type: 'P'
        });
        setThumbnailFile(null);
        setPreviewUrl(null);
    };

    const handleToggleStatus = async (product, e) => {
        e.stopPropagation();
        const isTurningOn = product.status !== 'ACTIVE';
        const newStatus = isTurningOn ? 'ACTIVE' : 'INACTIVE';
        const actionText = isTurningOn ? 'kích hoạt' : 'ngưng hoạt động';

        showConfirm(
            `Bạn có chắc chắn muốn ${actionText} sản phẩm "${product.productName}"?`,
            async () => {
                const originalStatus = product.status;
                const nextStatus = originalStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

                // Optimistic Update: Cập nhật UI ngay lập tức
                setProducts(prev => prev.map(p =>
                    p.id == product.id ? { ...p, status: nextStatus } : p
                ));

                try {
                    await softDeleteProduct(product.id);
                    showToast(`Đã ${actionText} sản phẩm thành công`, 'success');
                } catch (error) {
                    // Hoàn tác nếu lỗi
                    setProducts(prev => prev.map(p =>
                        p.id == product.id ? { ...p, status: originalStatus } : p
                    ));
                    showToast(error.toString(), 'error');
                }
            }
        );
    };

    const handlePermanentDelete = async (product, e) => {
        e.stopPropagation();
        showConfirm(
            `CẢNH BÁO: Bạn có chắc chắn muốn xóa VĨNH VIỄN sản phẩm "${product.productName}"? Hành động này không thể hoàn tác.`,
            async () => {
                try {
                    await forceDeleteProduct(product.id);
                    showToast("Đã xóa vĩnh viễn sản phẩm", 'success');
                    fetchData();
                } catch (error) {
                    showToast(error.toString(), 'error');
                }
            }
        );
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Danh sách sản phẩm</h1>
                <div className={styles.filterGroup}>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 bg-[#ab121c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#850e15] shadow-md transition-all"
                    >
                        <Plus size={16} /> Thêm sản phẩm
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Search & Filters */}
                <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
                    <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 gap-3 transition-all focus-within:border-[#ab121c] focus-within:bg-white focus-within:shadow-sm">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm theo tên..."
                            className="bg-transparent outline-none text-sm w-full font-body"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50">
                            <tr className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                                <th className="pl-6 py-4">Sản phẩm</th>
                                <th className="py-4 text-right">Giá cơ bản</th>
                                <th className="py-4 text-center">Trạng thái</th>
                                <th className="py-4 text-center">Chất liệu</th>
                                <th className="pr-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="animate-spin text-[#ab121c]" size={32} />
                                            <span className="text-sm text-gray-400">Đang tải dữ liệu...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400">
                                        Không tìm thấy sản phẩm nào
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/80 transition-colors cursor-pointer" onClick={() => navigate(`/admin/products/${product.id}`)}>
                                        <td className="pl-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg border border-gray-100 overflow-hidden bg-gray-50 flex-shrink-0">
                                                    {product.thumbnail ? (
                                                        <img src={product.thumbnail} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-800 font-bold hover:text-[#ab121c] transition-colors">{product.productName}</span>
                                                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter truncate max-w-[200px]">ID: {product.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            <span className="font-bold text-gray-700">{Number(product.basePrice).toLocaleString()}đ</span>
                                        </td>
                                        <td className="py-4 text-center">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${product.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex flex-wrap justify-center gap-1">
                                                {product.product_materials?.slice(0, 2).map((pm, idx) => (
                                                    <span key={idx} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[9px] font-medium">
                                                        {pm.material?.materialName}
                                                    </span>
                                                ))}
                                                {product.product_materials?.length > 2 && (
                                                    <span className="text-[9px] text-gray-400">+{product.product_materials.length - 2}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="pr-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center justify-end gap-3">
                                                <div className="flex items-center pr-3 border-r border-gray-100">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={product.status === 'ACTIVE'}
                                                            onChange={(e) => handleToggleStatus(product, e)}
                                                        />
                                                        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                                    </label>
                                                </div>

                                                <button
                                                    onClick={(e) => handlePermanentDelete(product, e)}
                                                    className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Xóa vĩnh viễn"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Product Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-headline text-gray-800">Thêm sản phẩm mới</h3>
                                <p className="text-xs text-gray-400 mt-1">Điền thông tin để tạo sản phẩm vào hệ thống</p>
                            </div>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Tên sản phẩm *</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#ab121c] outline-none text-sm transition-all shadow-sm"
                                            placeholder="Nhập tên sản phẩm"
                                            value={formData.productName}
                                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Giá cơ bản *</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:border-[#ab121c] outline-none text-sm transition-all shadow-sm"
                                                placeholder="0"
                                                value={formData.basePrice}
                                                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                                                required
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">VNĐ</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Danh mục</label>
                                        <select
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-[#ab121c] outline-none text-sm appearance-none bg-white transition-all shadow-sm"
                                            value={formData.categoryId}
                                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Ảnh Thumbnail</label>
                                        <div
                                            className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-[#ab121c] hover:text-[#ab121c] transition-all cursor-pointer bg-gray-50 overflow-hidden relative group"
                                            onClick={() => document.getElementById('thumbnailInput').click()}
                                        >
                                            {previewUrl ? (
                                                <>
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <ImageIcon className="text-white" size={24} />
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
                                            id="thumbnailInput"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Mô tả</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#ab121c] outline-none text-sm min-h-[100px] transition-all shadow-sm"
                                    placeholder="Nhập mô tả sản phẩm..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">Chất liệu</label>
                                <div className="flex flex-wrap gap-2">
                                    {materials.map(mat => (
                                        <button
                                            key={mat.id}
                                            type="button"
                                            onClick={() => handleMaterialToggle(mat.id)}
                                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${formData.materialIds.includes(mat.id)
                                                ? 'bg-[#ab121c] text-white border-[#ab121c] shadow-md'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-[#ab121c] hover:text-[#ab121c]'
                                                }`}
                                        >
                                            {mat.materialName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="px-6 py-2.5 text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-[#ab121c] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#850e15] transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                                Tạo sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
