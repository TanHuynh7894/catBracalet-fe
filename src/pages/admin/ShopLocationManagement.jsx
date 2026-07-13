import React, { useState, useEffect, useCallback } from 'react';
import {
    MapPin, Plus, Edit3, X, Loader2,
    ToggleLeft, ToggleRight, Phone,
    Clock, Search, Store, Globe, AlertCircle
} from 'lucide-react';
import { shopLocationService } from '../../services/shopLocationService';
import { useToast } from '../../context/ToastContext';
import styles from './MaterialManagement.module.css'; // reuse shared admin styles

// ─── Empty form ────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
    shopName: '',
    phoneNumber: '',
    workingHours: '',
    province: '',
    district: '',
    ward: '',
    detailAddress: '',
    isActive: true,
};

// ─────────────────────────────────────────────────────────────────────────────
const ShopLocationManagement = () => {
    const { showToast } = useToast();

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
    const [selected, setSelected] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Confirm dialog (toggle active)
    const [showConfirm, setShowConfirm] = useState(false);

    // Form
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    // Cascading selects
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [cascadeLoading, setCascadeLoading] = useState({ province: false, district: false, ward: false });

    // ─── Fetch list ────────────────────────────────────────────────────────────
    const fetchLocations = useCallback(async (initial = false) => {
        if (initial) setLoading(true);
        try {
            const data = await shopLocationService.getAllShopLocations();
            setLocations(Array.isArray(data) ? data : []);
        } catch {
            showToast('Không thể tải danh sách cửa hàng', 'error');
        } finally {
            if (initial) setLoading(false);
        }
    }, [showToast]);

    useEffect(() => { fetchLocations(true); }, [fetchLocations]);

    // ─── Cascade: provinces once ───────────────────────────────────────────────
    useEffect(() => {
        shopLocationService.getProvinces()
            .then(data => setProvinces(Array.isArray(data) ? data : []))
            .catch(() => { });
    }, []);

    // ─── Cascade: districts when province changes ──────────────────────────────
    useEffect(() => {
        if (!formData.province) { setDistricts([]); setWards([]); return; }
        setCascadeLoading(p => ({ ...p, district: true }));
        shopLocationService.getDistricts(formData.province)
            .then(data => setDistricts(Array.isArray(data) ? data : []))
            .catch(() => setDistricts([]))
            .finally(() => setCascadeLoading(p => ({ ...p, district: false })));
        setFormData(f => ({ ...f, district: '', ward: '' }));
        setWards([]);
    }, [formData.province]);

    // ─── Cascade: wards when district changes ─────────────────────────────────
    useEffect(() => {
        if (!formData.district) { setWards([]); return; }
        setCascadeLoading(p => ({ ...p, ward: true }));
        shopLocationService.getWards(formData.district)
            .then(data => setWards(Array.isArray(data) ? data : []))
            .catch(() => setWards([]))
            .finally(() => setCascadeLoading(p => ({ ...p, ward: false })));
        setFormData(f => ({ ...f, ward: '' }));
    }, [formData.district]);

    // ─── Modal helpers ─────────────────────────────────────────────────────────
    const openAdd = () => {
        setModalMode('add');
        setSelected(null);
        setFormData(EMPTY_FORM);
        setErrors({});
        setDistricts([]);
        setWards([]);
        setShowModal(true);
    };

    const openEdit = (loc) => {
        setModalMode('edit');
        setSelected(loc);
        setFormData({
            shopName: loc.shopName || '',
            phoneNumber: loc.phoneNumber !== 'N/A' ? (loc.phoneNumber || '') : '',
            workingHours: loc.workingHours !== 'N/A' ? (loc.workingHours || '') : '',
            province: loc.province || '',
            district: loc.district || '',
            ward: loc.ward || '',
            detailAddress: loc.detailAddress || '',
            isActive: loc.isActive ?? true,
        });
        setErrors({});
        setShowModal(true);
    };

    const openToggle = (loc) => {
        setSelected(loc);
        setShowConfirm(true);
    };

    // ─── Validation ────────────────────────────────────────────────────────────
    const validate = () => {
        const e = {};
        if (!formData.shopName.trim()) e.shopName = 'Tên cửa hàng không được để trống';
        if (!formData.province) e.province = 'Vui lòng chọn tỉnh/thành';
        if (!formData.district) e.district = 'Vui lòng chọn quận/huyện';
        if (!formData.ward) e.ward = 'Vui lòng chọn phường/xã';
        if (!formData.detailAddress.trim()) e.detailAddress = 'Địa chỉ chi tiết không được để trống';
        return e;
    };

    // ─── Submit ────────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setIsProcessing(true);
        const payload = {
            shopName: formData.shopName.trim(),
            phoneNumber: formData.phoneNumber.trim() || 'N/A',
            workingHours: formData.workingHours.trim() || 'N/A',
            province: formData.province,
            district: formData.district,
            ward: formData.ward,
            detailAddress: formData.detailAddress.trim(),
            isActive: formData.isActive,
        };

        try {
            if (modalMode === 'add') {
                await shopLocationService.createShopLocation(payload);
                showToast('Tạo cửa hàng thành công', 'success');
            } else {
                await shopLocationService.updateShopLocation(selected.id, payload);
                showToast('Cập nhật cửa hàng thành công', 'success');
            }
            setShowModal(false);
            fetchLocations();
        } catch (err) {
            showToast(err?.response?.data?.message || 'Thao tác thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── Confirm action ────────────────────────────────────────────────────────
    const handleConfirm = async () => {
        setIsProcessing(true);
        try {
            if (selected.isActive) {
                // Tắt: dùng DELETE → isActive = false
                await shopLocationService.deleteShopLocation(selected.id);
                showToast('Đã vô hiệu hoá cửa hàng', 'success');
            } else {
                // Bật: dùng PATCH /{id}/active → isActive = true
                await shopLocationService.toggleActive(selected.id);
                showToast('Đã kích hoạt cửa hàng', 'success');
            }
            setShowConfirm(false);
            fetchLocations();
        } catch {
            showToast('Thao tác thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── Derived ───────────────────────────────────────────────────────────────
    const filtered = locations.filter(loc =>
        loc.shopName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.shopAddress?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: locations.length,
        active: locations.filter(l => l.isActive).length,
        inactive: locations.filter(l => !l.isActive).length,
    };

    // ─── Render ────────────────────────────────────────────────────────────────
    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', color: '#ab121c', marginBottom: 16 }} />
            <p style={{ color: '#9ca3af', fontWeight: 500 }}>Đang tải danh sách cửa hàng...</p>
        </div>
    );

    return (
        <div className={styles.dashboard}>

            {/* ── Header ────────────────────────────────────────────────────── */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Quản lý Cửa hàng</h1>
                    <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>
                        Quản lý vị trí và thông tin các cửa hàng hiển thị trên bản đồ
                    </p>
                </div>
                <button onClick={openAdd} className={styles.primaryBtn}>
                    <Plus size={14} /> Thêm cửa hàng
                </button>
            </div>

            {/* ── Stats ─────────────────────────────────────────────────────── */}
            <div className={styles.statsGrid}>
                {[
                    { label: 'Tổng cửa hàng', value: stats.total, icon: <Store size={20} />, color: '#ab121c', bg: '#FDF2F2' },
                    { label: 'Đang hoạt động', value: stats.active, icon: <ToggleRight size={20} />, color: '#057A55', bg: '#DEF7EC' },
                    { label: 'Không hoạt động', value: stats.inactive, icon: <ToggleLeft size={20} />, color: '#6B7280', bg: '#F3F4F6' },
                    { label: 'Hiển thị bản đồ', value: stats.active, icon: <Globe size={20} />, color: '#4F46E5', bg: '#EEF2FF' },
                ].map((s, i) => (
                    <div key={i} className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                        <div className={styles.statInfo}>
                            <span className={styles.statLabel}>{s.label}</span>
                            <span className={styles.statValue}>{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Table card ────────────────────────────────────────────────── */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={16} style={{ color: '#9ca3af' }} />
                        <input
                            className={styles.searchInput}
                            placeholder="Tìm tên cửa hàng, địa chỉ..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 700, marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                        {filtered.length} / {locations.length} cửa hàng
                    </span>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                {['#', 'Cửa hàng', 'Địa chỉ', 'Liên hệ', 'Trạng thái', 'Thao tác'].map(h => (
                                    <th key={h} style={{ padding: '14px 16px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'left' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '64px 0', color: '#9ca3af' }}>
                                        <Store size={40} strokeWidth={1} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                                        <p style={{ fontWeight: 500 }}>Không tìm thấy cửa hàng nào</p>
                                    </td>
                                </tr>
                            ) : filtered.map((loc, idx) => (
                                <tr key={loc.id} style={{ borderBottom: '1px solid #f9fafb', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                                    onMouseLeave={e => e.currentTarget.style.background = ''}
                                >
                                    {/* Index */}
                                    <td style={{ padding: '16px', color: '#9ca3af', fontSize: 12, fontWeight: 700 }}>{idx + 1}</td>

                                    {/* Name */}
                                    <td style={{ padding: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ padding: 10, borderRadius: 10, background: '#FDF2F2', color: '#ab121c', flexShrink: 0 }}>
                                                <MapPin size={16} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, color: '#111827' }}>{loc.shopName}</div>
                                                <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>ID: {loc.id?.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Address */}
                                    <td style={{ padding: 16, maxWidth: 240 }}>
                                        <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
                                            {loc.shopAddress || loc.detailAddress || '—'}
                                        </div>
                                        {loc.shopLatitude && (
                                            <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
                                                {loc.shopLatitude.toFixed(4)}, {loc.shopLongitude.toFixed(4)}
                                            </div>
                                        )}
                                    </td>

                                    {/* Contact */}
                                    <td style={{ padding: 16 }}>
                                        {loc.phoneNumber && loc.phoneNumber !== 'N/A' && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#374151', marginBottom: 4 }}>
                                                <Phone size={12} style={{ color: '#9ca3af' }} /> {loc.phoneNumber}
                                            </div>
                                        )}
                                        {loc.workingHours && loc.workingHours !== 'N/A' && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#374151' }}>
                                                <Clock size={12} style={{ color: '#9ca3af' }} /> {loc.workingHours}
                                            </div>
                                        )}
                                        {(!loc.phoneNumber || loc.phoneNumber === 'N/A') &&
                                            (!loc.workingHours || loc.workingHours === 'N/A') && (
                                                <span style={{ color: '#d1d5db', fontSize: 12 }}>—</span>
                                            )}
                                    </td>

                                    {/* Status */}
                                    <td style={{ padding: 16 }}>
                                        {loc.isActive ? (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: '#DEF7EC', color: '#057A55' }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#057A55', animation: 'pulse 2s infinite' }} />
                                                HOẠT ĐỘNG
                                            </span>
                                        ) : (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: '#F3F4F6', color: '#6B7280' }}>
                                                <X size={10} /> KHÔNG HOẠT ĐỘNG
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td style={{ padding: 16 }}>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <button onClick={() => openEdit(loc)} title="Chỉnh sửa"
                                                style={{ padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent', color: '#d97706', transition: 'background 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#fffbeb'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => openToggle(loc)}
                                                title={loc.isActive ? 'Vô hiệu hoá' : 'Kích hoạt'}
                                                style={{ padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent', color: loc.isActive ? '#22c55e' : '#9ca3af', transition: 'background 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = loc.isActive ? '#f0fdf4' : '#f3f4f6'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                {loc.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                Modal Add / Edit
            ══════════════════════════════════════════════════════════════════ */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} style={{ width: 580 }} onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', borderBottom: '1px solid #f3f4f6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ padding: 10, borderRadius: 10, background: '#FDF2F2' }}>
                                    <Store size={20} style={{ color: '#ab121c' }} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#111827' }}>
                                        {modalMode === 'add' ? 'Thêm cửa hàng mới' : 'Chỉnh sửa cửa hàng'}
                                    </h3>
                                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>
                                        {modalMode === 'add' ? 'Địa chỉ sẽ được geocode tự động' : `Đang sửa: ${selected?.shopName}`}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)}
                                style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8, color: '#9ca3af' }}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18, maxHeight: '70vh', overflowY: 'auto' }}>

                            {/* Shop Name */}
                            <div>
                                <label className={styles.formLabel}>Tên cửa hàng <span style={{ color: '#ef4444' }}>*</span></label>
                                <input className={styles.formInput}
                                    placeholder="VD: Shop Cát Bracelet Quận 1"
                                    value={formData.shopName}
                                    onChange={e => setFormData({ ...formData, shopName: e.target.value })} />
                                {errors.shopName && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{errors.shopName}</p>}
                            </div>

                            {/* Province */}
                            <div>
                                <label className={styles.formLabel}>Tỉnh / Thành phố <span style={{ color: '#ef4444' }}>*</span></label>
                                <select className={styles.formInput}
                                    value={formData.province}
                                    onChange={e => setFormData({ ...formData, province: e.target.value })}
                                    style={{ cursor: 'pointer' }}>
                                    <option value="">-- Chọn tỉnh/thành --</option>
                                    {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                {errors.province && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{errors.province}</p>}
                            </div>

                            {/* District */}
                            <div>
                                <label className={styles.formLabel}>Quận / Huyện <span style={{ color: '#ef4444' }}>*</span></label>
                                <select className={styles.formInput}
                                    value={formData.district}
                                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                                    disabled={!formData.province || cascadeLoading.district}
                                    style={{ cursor: formData.province ? 'pointer' : 'not-allowed', opacity: !formData.province ? 0.5 : 1 }}>
                                    <option value="">
                                        {cascadeLoading.district ? 'Đang tải...' : '-- Chọn quận/huyện --'}
                                    </option>
                                    {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                                {errors.district && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{errors.district}</p>}
                            </div>

                            {/* Ward */}
                            <div>
                                <label className={styles.formLabel}>Phường / Xã <span style={{ color: '#ef4444' }}>*</span></label>
                                <select className={styles.formInput}
                                    value={formData.ward}
                                    onChange={e => setFormData({ ...formData, ward: e.target.value })}
                                    disabled={!formData.district || cascadeLoading.ward}
                                    style={{ cursor: formData.district ? 'pointer' : 'not-allowed', opacity: !formData.district ? 0.5 : 1 }}>
                                    <option value="">
                                        {cascadeLoading.ward ? 'Đang tải...' : '-- Chọn phường/xã --'}
                                    </option>
                                    {wards.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                                </select>
                                {errors.ward && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{errors.ward}</p>}
                            </div>

                            {/* Detail Address */}
                            <div>
                                <label className={styles.formLabel}>Địa chỉ chi tiết <span style={{ color: '#ef4444' }}>*</span></label>
                                <input className={styles.formInput}
                                    placeholder="VD: Số 31 đường 30"
                                    value={formData.detailAddress}
                                    onChange={e => setFormData({ ...formData, detailAddress: e.target.value })} />
                                {errors.detailAddress && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{errors.detailAddress}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className={styles.formLabel}>Số điện thoại</label>
                                <input className={styles.formInput}
                                    placeholder="VD: 0901234567"
                                    value={formData.phoneNumber}
                                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
                            </div>

                            {/* Working Hours */}
                            <div>
                                <label className={styles.formLabel}>Giờ làm việc</label>
                                <input className={styles.formInput}
                                    placeholder="VD: 08:00 - 21:00"
                                    value={formData.workingHours}
                                    onChange={e => setFormData({ ...formData, workingHours: e.target.value })} />
                            </div>

                            {/* Is Active */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                                <button type="button"
                                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: formData.isActive ? '#22c55e' : '#9ca3af', transition: 'color 0.2s' }}>
                                    {formData.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                </button>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Hiển thị công khai</div>
                                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{formData.isActive ? 'Cửa hàng sẽ hiển thị trên bản đồ' : 'Cửa hàng ẩn khỏi bản đồ'}</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
                                <button type="button" onClick={() => setShowModal(false)}
                                    style={{ flex: 1, padding: '12px 0', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 700, color: '#6b7280', cursor: 'pointer' }}>
                                    Hủy bỏ
                                </button>
                                <button type="submit" disabled={isProcessing} className={styles.primaryBtn}
                                    style={{ flex: 1, justifyContent: 'center', padding: '12px 0' }}>
                                    {isProcessing ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                        : modalMode === 'add' ? 'Tạo cửa hàng' : 'Lưu thay đổi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                Confirm Dialog
            ══════════════════════════════════════════════════════════════════ */}
            {showConfirm && (
                <div className={styles.modalOverlay} onClick={() => setShowConfirm(false)}>
                    <div className={styles.modalContent}
                        style={{ width: 440, textAlign: 'center', padding: '48px 40px' }}
                        onClick={e => e.stopPropagation()}>
                        <div style={{
                            marginBottom: 20, padding: 20, display: 'inline-flex', borderRadius: 16,
                            background: '#fffbeb',
                            color: '#d97706'
                        }}>
                            <AlertCircle size={36} strokeWidth={2.5} />
                        </div>

                        <h3 style={{ fontSize: 22, fontWeight: 900, color: '#111827', marginBottom: 12 }}>
                            {selected?.isActive ? 'Vô hiệu hoá?' : 'Kích hoạt?'}
                        </h3>
                        <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
                            {selected?.isActive ? (
                                <>Cửa hàng <strong>{selected?.shopName}</strong> sẽ bị ẩn khỏi bản đồ.</>
                            ) : (
                                <>Kích hoạt cửa hàng <strong>{selected?.shopName}</strong> để hiển thị trên bản đồ.</>
                            )}
                        </p>

                        <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                            <button onClick={() => setShowConfirm(false)}
                                style={{ flex: 1, padding: '14px 0', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, fontWeight: 700, color: '#6b7280', cursor: 'pointer' }}>
                                Hủy bỏ
                            </button>
                            <button onClick={handleConfirm} disabled={isProcessing}
                                style={{
                                    flex: 1, padding: '14px 0', borderRadius: 10, border: 'none', fontSize: 13, fontWeight: 900, color: '#fff', cursor: 'pointer', transition: 'all 0.2s',
                                    background: selected?.isActive ? '#d97706' : '#22c55e',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                                }}>
                                {isProcessing
                                    ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                    : selected?.isActive ? 'VÔ HIỆU HOÁ' : 'KÍCH HOẠT'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopLocationManagement;
