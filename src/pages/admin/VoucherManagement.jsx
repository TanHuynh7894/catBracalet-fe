import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Plus, Edit3, Trash2, Ticket, X, Loader2,
    AlertTriangle, Check, Tag, Calendar, Hash, Percent,
    DollarSign, ToggleLeft, ToggleRight, Filter
} from 'lucide-react';
import {
    getAllVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
} from '../../services/voucherService';
import { useToast } from '../../context/ToastContext';
import styles from './RoleManagement.module.css';

const formatVND = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';
const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : '—';
const toInputDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toISOString().slice(0, 16);
};

const EMPTY_FORM = {
    code: '',
    discountValue: '',
    discountType: 'PERCENT',
    quantity: '',
    startDate: '',
    endDate: '',
    status: 'ACTIVE',
};

// ─────────────────────────────────────────────────────────────────────────────
const VoucherManagement = () => {
    const { showToast } = useToast();

    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Form
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    // ─── Fetch ────────────────────────────────────────────────────────────────
    const fetchVouchers = async (isInitial = false) => {
        if (isInitial) setLoading(true);
        try {
            const data = await getAllVouchers();
            setVouchers(Array.isArray(data) ? data : []);
        } catch {
            showToast('Không thể tải danh sách voucher', 'error');
        } finally {
            if (isInitial) setLoading(false);
        }
    };

    useEffect(() => { fetchVouchers(true); }, []);

    // ─── Derived ──────────────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        return vouchers.filter(v => {
            const matchSearch =
                v.code?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchStatus =
                filterStatus === 'ALL' || v.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [vouchers, searchTerm, filterStatus]);

    const stats = useMemo(() => ({
        total: vouchers.length,
        active: vouchers.filter(v => v.status === 'ACTIVE').length,
        inactive: vouchers.filter(v => v.status === 'INACTIVE').length,
        percent: vouchers.filter(v => v.discountType === 'PERCENT').length,
    }), [vouchers]);

    // ─── Modal helpers ────────────────────────────────────────────────────────
    const openAdd = () => {
        setModalMode('add');
        setSelectedVoucher(null);
        setFormData(EMPTY_FORM);
        setErrors({});
        setShowModal(true);
    };

    const openEdit = (v) => {
        setModalMode('edit');
        setSelectedVoucher(v);
        setFormData({
            code: v.code,
            discountValue: String(v.discountValue),
            discountType: v.discountType,
            quantity: String(v.quantity),
            startDate: toInputDate(v.startDate),
            endDate: toInputDate(v.endDate),
            status: v.status,
        });
        setErrors({});
        setShowModal(true);
    };

    // ─── Validation ───────────────────────────────────────────────────────────
    const validate = () => {
        const e = {};
        if (!formData.code.trim()) e.code = 'Bắt buộc';
        if (!formData.discountValue || isNaN(Number(formData.discountValue)))
            e.discountValue = 'Giá trị không hợp lệ';
        if (formData.discountType === 'PERCENT') {
            const val = Number(formData.discountValue);
            if (val <= 0 || val > 100) e.discountValue = 'Phải từ 1–100%';
        }
        if (!formData.quantity || isNaN(Number(formData.quantity)) || Number(formData.quantity) < 1)
            e.quantity = 'Số lượng phải ≥ 1';
        if (!formData.startDate) e.startDate = 'Bắt buộc';
        if (!formData.endDate) e.endDate = 'Bắt buộc';
        if (formData.startDate && formData.endDate &&
            new Date(formData.endDate) <= new Date(formData.startDate))
            e.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
        return e;
    };

    // ─── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setIsProcessing(true);
        const payload = {
            code: formData.code.trim().toUpperCase(),
            discountValue: parseFloat(formData.discountValue),
            discountType: formData.discountType,
            quantity: parseInt(formData.quantity, 10),
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
            status: formData.status,
        };

        try {
            if (modalMode === 'add') {
                await createVoucher(payload);
                showToast('Tạo voucher thành công', 'success');
            } else {
                await updateVoucher(selectedVoucher.id, payload);
                showToast('Cập nhật voucher thành công', 'success');
            }
            setShowModal(false);
            fetchVouchers();
        } catch (err) {
            showToast(err?.message || 'Thao tác thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── Delete ───────────────────────────────────────────────────────────────
    const handleDelete = async () => {
        setIsProcessing(true);
        try {
            await deleteVoucher(selectedVoucher.id);
            showToast('Đã xóa voucher thành công', 'success');
            setShowDeleteConfirm(false);
            fetchVouchers();
        } catch {
            showToast('Không thể xóa voucher', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── Helpers ──────────────────────────────────────────────────────────────
    const isExpired = (endDate) => new Date(endDate) < new Date();

    const getStatusBadge = (v) => {
        if (isExpired(v.endDate)) {
            return (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-50 text-orange-600 flex items-center gap-1.5 w-fit">
                    <Calendar size={10} /> HẾT HẠN
                </span>
            );
        }
        if (v.status === 'ACTIVE') {
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

    const getDiscountDisplay = (v) => {
        if (v.discountType === 'PERCENT') {
            return (
                <span className="inline-flex items-center gap-1 font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full text-sm">
                    <Percent size={12} />
                    {parseFloat(v.discountValue)}%
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-sm">
                <DollarSign size={12} />
                {formatVND(parseFloat(v.discountValue))}
            </span>
        );
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 size={40} className="animate-spin text-rose-800 mb-4" />
            <p className="text-gray-500 font-medium">Đang tải danh sách voucher...</p>
        </div>
    );

    return (
        <div className={styles.dashboard}>

            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Quản lý Voucher</h1>
                    <p className="text-sm text-gray-400 mt-1">Tạo và quản lý mã giảm giá cho cửa hàng</p>
                </div>
                <button onClick={openAdd} className={styles.primaryBtn}>
                    <Plus size={14} /> Tạo voucher mới
                </button>
            </div>

            {/* ── Stats Grid ──────────────────────────────────────────────── */}
            <div className={styles.statsGrid}>
                {[
                    { label: 'Tổng voucher', value: stats.total, icon: <Ticket size={20} />, color: '#ab121c', bg: '#FDF2F2' },
                    { label: 'Đang hoạt động', value: stats.active, icon: <Check size={20} />, color: '#057A55', bg: '#DEF7EC' },
                    { label: 'Không hoạt động', value: stats.inactive, icon: <X size={20} />, color: '#6B7280', bg: '#F3F4F6' },
                    { label: 'Loại phần trăm', value: stats.percent, icon: <Percent size={20} />, color: '#4F46E5', bg: '#EEF2FF' },
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
                            placeholder="Tìm mã voucher..."
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
                        {filtered.length} / {vouchers.length} voucher
                    </span>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                {['Mã Voucher', 'Giá trị giảm', 'Số lượng', 'Thời gian hiệu lực', 'Trạng thái', 'Thao tác'].map(h => (
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
                                        <Ticket size={40} strokeWidth={1} className="mx-auto mb-3 opacity-30" />
                                        <p className="font-medium">Không tìm thấy voucher nào</p>
                                    </td>
                                </tr>
                            ) : filtered.map(v => (
                                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                                    {/* Code */}
                                    <td style={{ padding: '16px' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: '#FDF2F2', color: '#ab121c' }}>
                                                <Tag size={16} />
                                            </div>
                                            <div>
                                                <div className="font-extrabold text-gray-900 tracking-wider font-mono">{v.code}</div>
                                                <div className="text-[10px] text-gray-400 mt-0.5">ID: {v.id?.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Discount */}
                                    <td style={{ padding: '16px' }}>{getDiscountDisplay(v)}</td>
                                    {/* Quantity */}
                                    <td style={{ padding: '16px' }}>
                                        <div className="flex items-center gap-1.5">
                                            <Hash size={13} className="text-gray-300" />
                                            <span className="font-bold text-gray-700">{v.quantity}</span>
                                            <span className="text-gray-400 text-xs">lượt</span>
                                        </div>
                                    </td>
                                    {/* Dates */}
                                    <td style={{ padding: '16px' }}>
                                        <div className="text-xs space-y-0.5">
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <Calendar size={11} className="text-green-400" />
                                                <span>Từ: <b className="text-gray-700">{formatDate(v.startDate)}</b></span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <Calendar size={11} className="text-red-400" />
                                                <span>Đến: <b className={isExpired(v.endDate) ? 'text-orange-500' : 'text-gray-700'}>{formatDate(v.endDate)}</b></span>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Status */}
                                    <td style={{ padding: '16px' }}>{getStatusBadge(v)}</td>
                                    {/* Actions */}
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <div className="flex justify-center gap-1">
                                            <button
                                                onClick={() => openEdit(v)}
                                                className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() => { setSelectedVoucher(v); setShowDeleteConfirm(true); }}
                                                className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                                title="Xóa"
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
                Modal: Add / Edit Voucher
            ══════════════════════════════════════════════════════════════════ */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} style={{ width: 580 }} onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="flex justify-between items-center px-7 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-rose-50">
                                    <Ticket size={20} className="text-rose-800" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900">
                                        {modalMode === 'add' ? 'Tạo voucher mới' : 'Chỉnh sửa voucher'}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {modalMode === 'add' ? 'Điền thông tin để tạo mã giảm giá mới' : `Cập nhật voucher #${selectedVoucher?.code}`}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
                            {/* Code */}
                            <div>
                                <label className={styles.formLabel}>
                                    Mã Voucher <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        style={{ paddingLeft: 36, fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                        placeholder="VD: SUMMER2026, SALE10..."
                                        value={formData.code}
                                        onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code}</p>}
                            </div>

                            {/* Discount Type + Value */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={styles.formLabel}>Loại giảm giá <span className="text-red-500">*</span></label>
                                    <select
                                        className={styles.formInput}
                                        value={formData.discountType}
                                        onChange={e => setFormData({ ...formData, discountType: e.target.value })}
                                    >
                                        <option value="PERCENT">Phần trăm (%)</option>
                                        <option value="FIXED">Số tiền cố định (đ)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={styles.formLabel}>
                                        Giá trị giảm <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        {formData.discountType === 'PERCENT'
                                            ? <Percent size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            : <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        }
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.5"
                                            className={styles.formInput}
                                            style={{ paddingLeft: 36 }}
                                            placeholder={formData.discountType === 'PERCENT' ? '0–100' : '10000'}
                                            value={formData.discountValue}
                                            onChange={e => setFormData({ ...formData, discountValue: e.target.value })}
                                        />
                                    </div>
                                    {errors.discountValue && <p className="text-xs text-red-500 mt-1">{errors.discountValue}</p>}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className={styles.formLabel}>
                                    Số lượng sử dụng <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="number"
                                        min="1"
                                        className={styles.formInput}
                                        style={{ paddingLeft: 36 }}
                                        placeholder="VD: 100"
                                        value={formData.quantity}
                                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                    />
                                </div>
                                {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={styles.formLabel}>Ngày bắt đầu <span className="text-red-500">*</span></label>
                                    <input
                                        type="datetime-local"
                                        className={styles.formInput}
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                    {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
                                </div>
                                <div>
                                    <label className={styles.formLabel}>Ngày kết thúc <span className="text-red-500">*</span></label>
                                    <input
                                        type="datetime-local"
                                        className={styles.formInput}
                                        value={formData.endDate}
                                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                    {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className={styles.formLabel}>Trạng thái</label>
                                <div className="flex items-center gap-4 mt-2">
                                    {['ACTIVE', 'INACTIVE'].map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, status: s })}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${formData.status === s
                                                ? s === 'ACTIVE'
                                                    ? 'border-green-500 bg-green-50 text-green-700'
                                                    : 'border-gray-300 bg-gray-50 text-gray-600'
                                                : 'border-gray-100 text-gray-400 hover:border-gray-200'
                                                }`}
                                        >
                                            {s === 'ACTIVE'
                                                ? <><ToggleRight size={18} /> Hoạt động</>
                                                : <><ToggleLeft size={18} /> Không hoạt động</>
                                            }
                                        </button>
                                    ))}
                                </div>
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
                                        : modalMode === 'add' ? 'Tạo Voucher' : 'Lưu thay đổi'
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
                        <div className="mb-6 p-5 rounded-2xl inline-flex shadow-sm bg-red-50 text-red-600">
                            <Trash2 size={36} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">XÓA VOUCHER?</h3>
                        <p className="text-gray-500 text-[15px] mb-10 leading-relaxed px-4">
                            Bạn có chắc muốn xóa voucher{' '}
                            <span className="font-extrabold text-gray-900 font-mono tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                                {selectedVoucher?.code}
                            </span>
                            
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all border border-gray-100"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isProcessing}
                                className="flex-1 px-6 py-3.5 rounded-xl text-[13px] font-black text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100 transition-all flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" size={18} /> : 'XÓA NGAY'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoucherManagement;
