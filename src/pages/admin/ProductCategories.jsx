import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Plus, Edit3, Trash2, X, Loader2,
    Layers, Tag, FileText, ToggleLeft, ToggleRight,
    AlertTriangle, AlertCircle
} from 'lucide-react';
import {
    getProductCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    forceDeleteCategory,
} from '../../services/categoryService';
import { useToast } from '../../context/ToastContext';
import styles from './ProductCategories.module.css';

const EMPTY_FORM = { categoryName: '', description: '' };


const ProductCategories = () => {
    const { showToast } = useToast();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');


    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState('soft'); 


    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});


    const fetchCategories = async (isInitial = false) => {
        if (isInitial) setLoading(true);
        try {
            const data = await getProductCategories();
            setCategories(Array.isArray(data) ? data : []);
        } catch {
            showToast('Không thể tải danh sách danh mục', 'error');
        } finally {
            if (isInitial) setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(true); }, []);


    const filtered = useMemo(() => {
        return categories.filter(c => {
            const matchSearch = c.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
                || c.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchStatus = filterStatus === 'ALL' || c.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [categories, searchTerm, filterStatus]);

    const stats = useMemo(() => ({
        total: categories.length,
        active: categories.filter(c => c.status === 'ACTIVE').length,
        inactive: categories.filter(c => c.status === 'INACTIVE').length,
    }), [categories]);


    const openAdd = () => {
        setModalMode('add');
        setSelectedCategory(null);
        setFormData(EMPTY_FORM);
        setErrors({});
        setShowModal(true);
    };

    const openEdit = (c) => {
        setModalMode('edit');
        setSelectedCategory(c);
        setFormData({ categoryName: c.categoryName, description: c.description || '' });
        setErrors({});
        setShowModal(true);
    };

    const openDelete = (c, type = 'soft') => {
        setSelectedCategory(c);
        setDeleteType(type);
        setShowDeleteConfirm(true);
    };


    const validate = () => {
        const e = {};
        if (!formData.categoryName.trim()) e.categoryName = 'Tên danh mục không được để trống';
        return e;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setIsProcessing(true);
        const payload = {
            categoryName: formData.categoryName.trim(),
            description: formData.description.trim(),
        };

        try {
            if (modalMode === 'add') {
                await createCategory(payload);
                showToast('Tạo danh mục thành công', 'success');
            } else {
                await updateCategory(selectedCategory.id, payload);
                showToast('Cập nhật danh mục thành công', 'success');
            }
            setShowModal(false);
            fetchCategories();
        } catch (err) {
            showToast(err?.response?.data?.message || err?.message || 'Thao tác thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };


    const handleDelete = async () => {
        setIsProcessing(true);
        try {
            if (deleteType === 'force') {
                await forceDeleteCategory(selectedCategory.id);
                showToast('Đã xóa vĩnh viễn danh mục', 'success');
            } else {
                await deleteCategory(selectedCategory.id);
                const isActivating = selectedCategory.status === 'INACTIVE';
                showToast(isActivating ? 'Đã kích hoạt danh mục' : 'Đã vô hiệu hoá danh mục', 'success');
            }
            setShowDeleteConfirm(false);
            fetchCategories();
        } catch {
            showToast('Không thể xóa danh mục', 'error');
        } finally {
            setIsProcessing(false);
        }
    };


    const StatusBadge = ({ status }) => {
        if (status === 'ACTIVE') {
            return (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-green-700 flex items-center gap-1.5 w-fit">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    HOẠT ĐỘNG
                </span>
            );
        }
        return (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-500 flex items-center gap-1.5 w-fit">
                <X size={10} /> KHÔNG HOẠT ĐỘNG
            </span>
        );
    };


    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 size={40} className="animate-spin text-rose-800 mb-4" />
            <p className="text-gray-500 font-medium">Đang tải danh mục...</p>
        </div>
    );

    return (
        <div className={styles.dashboard}>

            {}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Quản lý Danh mục</h1>
                    <p className="text-sm text-gray-400 mt-1">Tạo và quản lý danh mục sản phẩm trong cửa hàng</p>
                </div>
                <button onClick={openAdd} className={styles.primaryBtn}>
                    <Plus size={14} /> Thêm danh mục
                </button>
            </div>

            {}
            <div className={styles.statsGrid}>
                {[
                    { label: 'Tổng danh mục', value: stats.total, icon: <Layers size={20} />, color: '#ab121c', bg: '#FDF2F2' },
                    { label: 'Đang hoạt động', value: stats.active, icon: <ToggleRight size={20} />, color: '#057A55', bg: '#DEF7EC' },
                    { label: 'Không hoạt động', value: stats.inactive, icon: <ToggleLeft size={20} />, color: '#6B7280', bg: '#F3F4F6' },
                ].map((s, i) => (
                    <div key={i} className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: s.bg, color: s.color }}>
                            {s.icon}
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>{s.label}</span>
                            <span className={styles.statValue}>{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                {}
                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={16} style={{ color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Tìm tên hoặc mô tả danh mục..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className={styles.filterBtn}
                        style={{ cursor: 'pointer' }}
                    >
                        <option value="ALL">Tất cả trạng thái</option>
                        <option value="ACTIVE">Hoạt động</option>
                        <option value="INACTIVE">Không hoạt động</option>
                    </select>
                    <span className="text-xs text-gray-400 font-bold ml-auto whitespace-nowrap">
                        {filtered.length} / {categories.length} danh mục
                    </span>
                </div>

                {}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                {['#', 'Tên danh mục', 'Mô tả', 'Trạng thái', 'Thao tác'].map(h => (
                                    <th key={h} style={{ padding: '14px 16px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-gray-400">
                                        <Layers size={40} strokeWidth={1} className="mx-auto mb-3 opacity-30" />
                                        <p className="font-medium">Không tìm thấy danh mục nào</p>
                                    </td>
                                </tr>
                            ) : filtered.map((c, idx) => (
                                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                                    {}
                                    <td style={{ padding: '16px', color: '#9ca3af', fontSize: 12, fontWeight: 700 }}>
                                        {idx + 1}
                                    </td>
                                    {}
                                    <td style={{ padding: '16px' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: '#FDF2F2', color: '#ab121c' }}>
                                                <Tag size={16} />
                                            </div>
                                            <div>
                                                <div className="font-extrabold text-gray-900">{c.categoryName}</div>
                                                <div className="text-[10px] text-gray-400 mt-0.5">ID: {c.id?.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    {}
                                    <td style={{ padding: '16px', maxWidth: 280 }}>
                                        <span className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                                            {c.description || <span className="italic text-gray-300">—</span>}
                                        </span>
                                    </td>
                                    {}
                                    <td style={{ padding: '16px' }}>
                                        <StatusBadge status={c.status} />
                                    </td>
                                    {}
                                    <td style={{ padding: '16px' }}>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openEdit(c)}
                                                className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() => openDelete(c, 'soft')}
                                                className={`p-2 rounded-lg transition-colors ${c.status === 'ACTIVE'
                                                    ? 'text-green-500 hover:bg-green-50'
                                                    : 'text-gray-300 hover:bg-gray-100'
                                                    }`}
                                                title={c.status === 'ACTIVE' ? 'Đang hoạt động - Click để vô hiệu hoá' : 'Đang tắt - Click để kích hoạt'}
                                            >
                                                {c.status === 'ACTIVE' ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                            </button>
                                            <button
                                                onClick={() => openDelete(c, 'force')}
                                                className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                                title="Xóa vĩnh viễn"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} style={{ width: 520 }} onClick={e => e.stopPropagation()}>
                        {}
                        <div className="flex justify-between items-center px-7 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-rose-50">
                                    <Layers size={20} className="text-rose-800" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900">
                                        {modalMode === 'add' ? 'Thêm danh mục mới' : 'Chỉnh sửa danh mục'}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {modalMode === 'add'
                                            ? 'Điền thông tin để tạo danh mục sản phẩm mới'
                                            : `Đang chỉnh sửa: ${selectedCategory?.categoryName}`}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        {}
                        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
                            {}
                            <div>
                                <label className={styles.formLabel}>
                                    Tên danh mục <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        style={{ paddingLeft: 36 }}
                                        placeholder="VD: Vòng tay, Dây chuyền..."
                                        value={formData.categoryName}
                                        onChange={e => setFormData({ ...formData, categoryName: e.target.value })}
                                    />
                                </div>
                                {errors.categoryName && <p className="text-xs text-red-500 mt-1">{errors.categoryName}</p>}
                            </div>

                            {}
                            <div>
                                <label className={styles.formLabel}>
                                    Mô tả
                                </label>
                                <div className="relative">
                                    <FileText size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                                    <textarea
                                        rows={3}
                                        className={styles.formInput}
                                        style={{ paddingLeft: 36, resize: 'none' }}
                                        placeholder="Mô tả ngắn về danh mục sản phẩm..."
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            {}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`${styles.primaryBtn} flex-1 justify-center py-3`}
                                >
                                    {isProcessing
                                        ? <Loader2 size={16} className="animate-spin" />
                                        : modalMode === 'add' ? 'Tạo danh mục' : 'Lưu thay đổi'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {}
            {showDeleteConfirm && (
                <div className={styles.modalOverlay} onClick={() => setShowDeleteConfirm(false)}>
                    <div
                        className={styles.modalContent}
                        style={{ width: 460, textAlign: 'center', padding: '52px 44px' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className={`mb-6 p-5 rounded-2xl inline-flex shadow-sm ${deleteType === 'force' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                            {deleteType === 'force' ? <Trash2 size={36} strokeWidth={2.5} /> : <AlertCircle size={36} strokeWidth={2.5} />}
                        </div>
                        <h3 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">
                            {deleteType === 'force' ? 'XÓA VĨNH VIỄN?' : (selectedCategory?.status === 'ACTIVE' ? 'VÔ HIỆU HOÁ?' : 'KÍCH HOẠT?')}
                        </h3>
                        <p className="text-gray-500 text-[15px] mb-2 leading-relaxed px-4">
                            {deleteType === 'force'
                                ? <>Danh mục <span className="font-extrabold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{selectedCategory?.categoryName}</span> sẽ bị xóa hoàn toàn và không thể khôi phục.</>
                                : (selectedCategory?.status === 'ACTIVE'
                                    ? <>Danh mục <span className="font-extrabold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{selectedCategory?.categoryName}</span> sẽ bị vô hiệu hoá (INACTIVE).</>
                                    : <>Kích hoạt lại danh mục <span className="font-extrabold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{selectedCategory?.categoryName}</span> để sử dụng (ACTIVE).</>)
                            }
                        </p>
                        {deleteType === 'force' && (
                            <p className="text-orange-500 text-xs font-bold mb-8 flex items-center justify-center gap-1.5">
                                <AlertTriangle size={12} /> Hành động này không thể hoàn tác!
                            </p>
                        )}
                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all border border-gray-100"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isProcessing}
                                className={`flex-1 px-6 py-3.5 rounded-xl text-[13px] font-black text-white transition-all flex items-center justify-center gap-2 ${deleteType === 'force'
                                    ? 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-100'
                                    : 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100'
                                    }`}
                            >
                                {isProcessing
                                    ? <Loader2 className="animate-spin" size={18} />
                                    : deleteType === 'force' ? 'XÓA VĨNH VIỄN' : (selectedCategory?.status === 'ACTIVE' ? 'VÔ HIỆU HOÁ' : 'KÍCH HOẠT')
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCategories;
