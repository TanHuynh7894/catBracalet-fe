import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Plus, Edit3, Trash2, X, Loader2,
    Gem, Palette, Layers, FileText, ToggleLeft,
    ToggleRight, AlertTriangle, Pipette, AlertCircle
} from 'lucide-react';
import {
    getProductMaterials,
    createMaterial,
    updateMaterial,
    softDeleteMaterialPatch,
    deleteMaterial,
    forceDeleteMaterial,
} from '../../services/materialService';
import { useToast } from '../../context/ToastContext';
import styles from './MaterialManagement.module.css';

const EMPTY_FORM = { materialName: '', materialType: '', color: '' };

// Preset colour swatches for quick picking
const COLOR_PRESETS = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Brown', hex: '#92400e' },
    { name: 'White', hex: '#f3f4f6' },
    { name: 'Black', hex: '#1f2937' },
    { name: 'Silver', hex: '#9ca3af' },
    { name: 'Gold', hex: '#d97706' },
];

const MATERIAL_TYPES = [
    'Gemstone', 'Metal', 'Natural', 'Synthetic', 'Wood', 'Ceramic', 'Glass', 'Other'
];

// ─────────────────────────────────────────────────────────────────────────────
const MaterialManagement = () => {
    const { showToast } = useToast();

    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterType, setFilterType] = useState('ALL');

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Delete confirm
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState('soft'); // 'soft' | 'force'

    // Form
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    // ─── Fetch ────────────────────────────────────────────────────────────────
    const fetchMaterials = async (isInitial = false) => {
        if (isInitial) setLoading(true);
        try {
            const data = await getProductMaterials();
            setMaterials(Array.isArray(data) ? data : []);
        } catch {
            showToast('Không thể tải danh sách chất liệu', 'error');
        } finally {
            if (isInitial) setLoading(false);
        }
    };

    useEffect(() => { fetchMaterials(true); }, []);

    // ─── Derived ──────────────────────────────────────────────────────────────
    const allTypes = useMemo(() => {
        const types = [...new Set(materials.map(m => m.materialType).filter(Boolean))];
        return types;
    }, [materials]);

    const filtered = useMemo(() => {
        return materials.filter(m => {
            const matchSearch =
                m.materialName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.materialType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.color?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchStatus = filterStatus === 'ALL' || m.status === filterStatus;
            const matchType = filterType === 'ALL' || m.materialType === filterType;
            return matchSearch && matchStatus && matchType;
        });
    }, [materials, searchTerm, filterStatus, filterType]);

    const stats = useMemo(() => ({
        total: materials.length,
        active: materials.filter(m => m.status === 'ACTIVE').length,
        inactive: materials.filter(m => m.status === 'INACTIVE').length,
        types: new Set(materials.map(m => m.materialType).filter(Boolean)).size,
    }), [materials]);

    // ─── Modal helpers ────────────────────────────────────────────────────────
    const openAdd = () => {
        setModalMode('add');
        setSelectedMaterial(null);
        setFormData(EMPTY_FORM);
        setErrors({});
        setShowModal(true);
    };

    const openEdit = (m) => {
        setModalMode('edit');
        setSelectedMaterial(m);
        setFormData({
            materialName: m.materialName || '',
            materialType: m.materialType || '',
            color: m.color || '',
        });
        setErrors({});
        setShowModal(true);
    };

    const openDelete = (m, type = 'soft') => {
        setSelectedMaterial(m);
        setDeleteType(type);
        setShowDeleteConfirm(true);
    };

    // ─── Validation ───────────────────────────────────────────────────────────
    const validate = () => {
        const e = {};
        if (!formData.materialName.trim()) e.materialName = 'Tên chất liệu không được để trống';
        if (!formData.materialType.trim()) e.materialType = 'Loại chất liệu không được để trống';
        if (!formData.color.trim()) e.color = 'Màu sắc không được để trống';
        return e;
    };

    // ─── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setIsProcessing(true);
        const payload = {
            materialName: formData.materialName.trim(),
            materialType: formData.materialType.trim(),
            color: formData.color.trim(),
        };

        try {
            if (modalMode === 'add') {
                await createMaterial(payload);
                showToast('Tạo chất liệu thành công', 'success');
            } else {
                await updateMaterial(selectedMaterial.id, payload);
                showToast('Cập nhật chất liệu thành công', 'success');
            }
            setShowModal(false);
            fetchMaterials();
        } catch (err) {
            showToast(err?.response?.data?.message || err?.message || 'Thao tác thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── Delete ───────────────────────────────────────────────────────────────
    const handleDelete = async () => {
        setIsProcessing(true);
        try {
            if (deleteType === 'force') {
                await forceDeleteMaterial(selectedMaterial.id);
                showToast('Đã xóa vĩnh viễn chất liệu', 'success');
            } else {
                await deleteMaterial(selectedMaterial.id);
                const isActivating = selectedMaterial.status === 'INACTIVE';
                showToast(isActivating ? 'Đã kích hoạt chất liệu' : 'Đã vô hiệu hoá chất liệu', 'success');
            }
            setShowDeleteConfirm(false);
            fetchMaterials();
        } catch {
            showToast('Không thể xóa chất liệu', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── Helpers ──────────────────────────────────────────────────────────────
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

    const TypeBadge = ({ type }) => {
        const colorMap = {
            Gemstone: { bg: '#fdf4ff', text: '#a21caf' },
            Metal: { bg: '#eff6ff', text: '#1d4ed8' },
            Natural: { bg: '#f0fdf4', text: '#15803d' },
            Synthetic: { bg: '#fff7ed', text: '#c2410c' },
            Wood: { bg: '#fefce8', text: '#a16207' },
            Ceramic: { bg: '#f0f9ff', text: '#0369a1' },
            Glass: { bg: '#fafafa', text: '#374151' },
        };
        const c = colorMap[type] || { bg: '#f3f4f6', text: '#6b7280' };
        return (
            <span
                className="px-2.5 py-1 rounded-full text-[11px] font-bold w-fit"
                style={{ background: c.bg, color: c.text }}
            >
                {type || '—'}
            </span>
        );
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 size={40} className="animate-spin text-rose-800 mb-4" />
            <p className="text-gray-500 font-medium">Đang tải danh sách chất liệu...</p>
        </div>
    );

    return (
        <div className={styles.dashboard}>

            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Quản lý Chất liệu</h1>
                    <p className="text-sm text-gray-400 mt-1">Tạo và quản lý chất liệu dùng trong sản phẩm</p>
                </div>
                <button onClick={openAdd} className={styles.primaryBtn}>
                    <Plus size={14} /> Thêm chất liệu
                </button>
            </div>

            {/* ── Stats Grid ──────────────────────────────────────────────── */}
            <div className={styles.statsGrid}>
                {[
                    { label: 'Tổng chất liệu', value: stats.total, icon: <Gem size={20} />, color: '#7A1E1E', bg: '#FDF2F2' },
                    { label: 'Đang hoạt động', value: stats.active, icon: <ToggleRight size={20} />, color: '#057A55', bg: '#DEF7EC' },
                    { label: 'Không hoạt động', value: stats.inactive, icon: <ToggleLeft size={20} />, color: '#6B7280', bg: '#F3F4F6' },
                    { label: 'Loại chất liệu', value: stats.types, icon: <Layers size={20} />, color: '#4F46E5', bg: '#EEF2FF' },
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

            {/* ── Table ───────────────────────────────────────────────────── */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={16} style={{ color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Tìm tên, loại, màu sắc..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                        className={styles.filterBtn}
                        style={{ cursor: 'pointer' }}
                    >
                        <option value="ALL">Tất cả loại</option>
                        {allTypes.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
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
                        {filtered.length} / {materials.length} chất liệu
                    </span>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                {['#', 'Tên chất liệu', 'Loại', 'Màu sắc', 'Trạng thái', 'Thao tác'].map(h => (
                                    <th key={h} style={{ padding: '14px 16px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-gray-400">
                                        <Gem size={40} strokeWidth={1} className="mx-auto mb-3 opacity-30" />
                                        <p className="font-medium">Không tìm thấy chất liệu nào</p>
                                    </td>
                                </tr>
                            ) : filtered.map((m, idx) => (
                                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                                    {/* Index */}
                                    <td style={{ padding: '16px', color: '#9ca3af', fontSize: 12, fontWeight: 700 }}>
                                        {idx + 1}
                                    </td>
                                    {/* Name */}
                                    <td style={{ padding: '16px' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: '#FDF2F2', color: '#7A1E1E' }}>
                                                <Gem size={16} />
                                            </div>
                                            <div>
                                                <div className="font-extrabold text-gray-900">{m.materialName}</div>
                                                <div className="text-[10px] text-gray-400 mt-0.5">ID: {m.id?.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Type */}
                                    <td style={{ padding: '16px' }}>
                                        <TypeBadge type={m.materialType} />
                                    </td>
                                    {/* Color */}
                                    <td style={{ padding: '16px' }}>
                                        <div className="flex items-center gap-2">
                                            {/* Color dot — try to map common color names */}
                                            <ColorDot colorName={m.color} />
                                            <span className="text-sm text-gray-700 font-medium">{m.color || '—'}</span>
                                        </div>
                                    </td>
                                    {/* Status */}
                                    <td style={{ padding: '16px' }}>
                                        <StatusBadge status={m.status} />
                                    </td>
                                    {/* Actions */}
                                    <td style={{ padding: '16px' }}>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openEdit(m)}
                                                className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() => openDelete(m, 'soft')}
                                                className={`p-2 rounded-lg transition-colors ${m.status === 'ACTIVE'
                                                    ? 'text-green-500 hover:bg-green-50'
                                                    : 'text-gray-300 hover:bg-gray-100'
                                                    }`}
                                                title={m.status === 'ACTIVE' ? 'Đang hoạt động - Click để vô hiệu hoá' : 'Đang tắt - Click để kích hoạt'}
                                            >
                                                {m.status === 'ACTIVE' ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                            </button>
                                            <button
                                                onClick={() => openDelete(m, 'force')}
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

            {/* ═══════════════════════════════════════════════════════════════
                Modal: Add / Edit Material
            ══════════════════════════════════════════════════════════════════ */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} style={{ width: 540 }} onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="flex justify-between items-center px-7 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-rose-50">
                                    <Gem size={20} className="text-rose-800" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900">
                                        {modalMode === 'add' ? 'Thêm chất liệu mới' : 'Chỉnh sửa chất liệu'}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {modalMode === 'add'
                                            ? 'Điền thông tin để tạo chất liệu mới'
                                            : `Đang chỉnh sửa: ${selectedMaterial?.materialName}`}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
                            {/* Material Name */}
                            <div>
                                <label className={styles.formLabel}>
                                    Tên chất liệu <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Gem size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        style={{ paddingLeft: 36 }}
                                        placeholder="VD: Ruby, Silver, Leather..."
                                        value={formData.materialName}
                                        onChange={e => setFormData({ ...formData, materialName: e.target.value })}
                                    />
                                </div>
                                {errors.materialName && <p className="text-xs text-red-500 mt-1">{errors.materialName}</p>}
                            </div>

                            {/* Material Type */}
                            <div>
                                <label className={styles.formLabel}>
                                    Loại chất liệu <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Layers size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        list="material-type-list"
                                        className={styles.formInput}
                                        style={{ paddingLeft: 36 }}
                                        placeholder="VD: Gemstone, Metal, Natural..."
                                        value={formData.materialType}
                                        onChange={e => setFormData({ ...formData, materialType: e.target.value })}
                                    />
                                    <datalist id="material-type-list">
                                        {MATERIAL_TYPES.map(t => <option key={t} value={t} />)}
                                    </datalist>
                                </div>
                                {errors.materialType && <p className="text-xs text-red-500 mt-1">{errors.materialType}</p>}
                            </div>

                            {/* Color */}
                            <div>
                                <label className={styles.formLabel}>
                                    Màu sắc <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Pipette size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        style={{ paddingLeft: 36 }}
                                        placeholder="VD: Red, Brown, Silver..."
                                        value={formData.color}
                                        onChange={e => setFormData({ ...formData, color: e.target.value })}
                                    />
                                </div>
                                {errors.color && <p className="text-xs text-red-500 mt-1">{errors.color}</p>}
                                {/* Color presets */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {COLOR_PRESETS.map(cp => (
                                        <button
                                            key={cp.name}
                                            type="button"
                                            title={cp.name}
                                            onClick={() => setFormData({ ...formData, color: cp.name })}
                                            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${formData.color === cp.name ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                                            style={{ background: cp.hex }}
                                        />
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1.5">Click vào ô màu để chọn nhanh</p>
                            </div>

                            {/* Footer Buttons */}
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
                                        : modalMode === 'add' ? 'Tạo chất liệu' : 'Lưu thay đổi'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                Modal: Delete Confirm
            ══════════════════════════════════════════════════════════════════ */}
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
                            {deleteType === 'force' ? 'XÓA VĨNH VIỄN?' : (selectedMaterial?.status === 'ACTIVE' ? 'VÔ HIỆU HOÁ?' : 'KÍCH HOẠT?')}
                        </h3>
                        <p className="text-gray-500 text-[15px] mb-2 leading-relaxed px-4">
                            {deleteType === 'force' ? (
                                <>Chất liệu <span className="font-extrabold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{selectedMaterial?.materialName}</span> sẽ bị xóa hoàn toàn khỏi hệ thống.</>
                            ) : (
                                selectedMaterial?.status === 'ACTIVE'
                                    ? <>Chất liệu <span className="font-extrabold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{selectedMaterial?.materialName}</span> sẽ bị vô hiệu hoá (INACTIVE).</>
                                    : <>Kích hoạt lại chất liệu <span className="font-extrabold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{selectedMaterial?.materialName}</span> để sử dụng (ACTIVE).</>
                            )}
                        </p>
                        {deleteType === 'force' && (
                            <p className="text-orange-500 text-xs font-bold mb-4 flex items-center justify-center gap-1.5">
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
                                    : deleteType === 'force' ? 'XÓA VĨNH VIỄN' : (selectedMaterial?.status === 'ACTIVE' ? 'VÔ HIỆU HOÁ' : 'KÍCH HOẠT')
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Tiny colour dot helper ───────────────────────────────────────────────────
const COLOR_MAP = {
    red: '#ef4444', orange: '#f97316', yellow: '#eab308',
    green: '#22c55e', blue: '#3b82f6', purple: '#a855f7',
    pink: '#ec4899', brown: '#92400e', white: '#e5e7eb',
    black: '#1f2937', silver: '#9ca3af', gold: '#d97706',
    grey: '#9ca3af', gray: '#9ca3af',
};

const ColorDot = ({ colorName }) => {
    const hex = COLOR_MAP[colorName?.toLowerCase()] || '#d1d5db';
    return (
        <span
            className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-200 inline-block"
            style={{ background: hex }}
        />
    );
};

export default MaterialManagement;
