import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Phone, Edit2, Trash2, MapPin, X, Plus, Check, ChevronDown } from 'lucide-react';
import { getAddressesByUserId, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '../../services/addressService';
import { getProvinces, getDistricts, getWards } from '../../services/shipmentService';
import { useToast } from '../../context/ToastContext';
import styles from './ShippingAddresses.module.css';


const ShippingAddresses = () => {
    const { showToast, showConfirm } = useToast();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        receiverName: '',
        phone: '',
        province: '',
        provinceId: '',
        district: '',
        districtId: '',
        ward: '',
        wardId: '',
        detailAddress: '',
        isDefault: false
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);


    useEffect(() => {
        fetchAddresses();
        loadProvinces();
    }, []);

    const loadProvinces = async () => {
        try {
            const data = await getProvinces();
            console.log('Provinces data:', data);
            setProvinces(Array.isArray(data) ? data : (data?.data || []));
        } catch (err) {
            console.error('Error loading provinces:', err);
        }
    };



    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const userDataStr = localStorage.getItem('user');
            if (!userDataStr) return;
            const userData = JSON.parse(userDataStr);
            const data = await getAddressesByUserId(userData.id);
            setAddresses(Array.isArray(data) ? data.filter(a => a.status === 'ACTIVE') : []);
            setError(null);
        } catch (err) {
            console.error('Error fetching addresses:', err);
            setError(typeof err === 'string' ? err : (err?.message || 'Không thể tải danh sách địa chỉ. Vui lòng thử lại sau.'));
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = async (address = null) => {
        if (address) {
            setEditingAddress(address);
            setFormData({
                receiverName: address.receiverName || '',
                phone: address.phone || '',
                province: address.province || '',
                provinceId: address.provinceId || '',
                district: address.district || '',
                districtId: address.districtId || '',
                ward: address.ward || '',
                wardId: address.wardId || '',
                detailAddress: address.detailAddress || '',
                isDefault: address.isDefault || false
            });

           
            if (address.provinceId) {
                try {
                    const d = await getDistricts(address.provinceId);
                    setDistricts(Array.isArray(d) ? d : (d?.data || []));
                    if (address.districtId) {
                        const w = await getWards(address.districtId);
                        setWards(Array.isArray(w) ? w : (w?.data || []));
                    }
                } catch (err) {
                    console.error('Error loading sub-locations:', err);
                }
            }

        } else {
            setEditingAddress(null);
            setDistricts([]);
            setWards([]);
            setFormData({
                receiverName: '',
                phone: '',
                province: '',
                provinceId: '',
                district: '',
                districtId: '',
                ward: '',
                wardId: '',
                detailAddress: '',
                isDefault: false
            });
        }
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAddress(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleProvinceChange = async (e) => {
        const provinceId = e.target.value;
        const provinceName = provinces.find(p => p.id === provinceId)?.name || '';

        setFormData(prev => ({
            ...prev,
            province: provinceName,
            provinceId: provinceId,
            district: '',
            districtId: '',
            ward: '',
            wardId: ''
        }));
        setDistricts([]);
        setWards([]);

        if (provinceId) {
            try {
                const data = await getDistricts(provinceId);
                setDistricts(Array.isArray(data) ? data : (data?.data || []));
            } catch (err) {
                showToast('Không thể tải danh sách Quận/Huyện', 'error');
            }
        }

    };

    const handleDistrictChange = async (e) => {
        const districtId = e.target.value;
        const districtName = districts.find(d => d.id === districtId)?.name || '';

        setFormData(prev => ({
            ...prev,
            district: districtName,
            districtId: districtId,
            ward: '',
            wardId: ''
        }));
        setWards([]);

        if (districtId) {
            try {
                const data = await getWards(districtId);
                setWards(Array.isArray(data) ? data : (data?.data || []));
            } catch (err) {
                showToast('Không thể tải danh sách Phường/Xã', 'error');
            }
        }

    };

    const handleWardChange = (e) => {
        const wardId = e.target.value;
        const wardName = wards.find(w => w.id === wardId)?.name || '';

        setFormData(prev => ({
            ...prev,
            ward: wardName,
            wardId: wardId
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const userDataStr = localStorage.getItem('user');
            const userData = JSON.parse(userDataStr);

         
            const { provinceId, districtId, wardId, ...finalData } = formData;

            if (editingAddress) {
                await updateAddress(userData.id, editingAddress.id, {
                    ...finalData,
                    status: 'ACTIVE'
                });
            } else {
                await createAddress(userData.id, {
                    ...finalData,
                    status: 'ACTIVE'
                });
            }

            showToast(editingAddress ? 'Cập nhật địa chỉ thành công' : 'Thêm địa chỉ mới thành công');
            await fetchAddresses();
            handleCloseModal();
        } catch (err) {
            showToast(typeof err === 'string' ? err : (err?.message || 'Đã xảy ra lỗi khi lưu địa chỉ.'), 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = (addressId) => {
        showConfirm(
            'Bạn có chắc chắn muốn xóa địa chỉ này?',
            async () => {
                try {
                    const userDataStr = localStorage.getItem('user');
                    const userData = JSON.parse(userDataStr);
                    await deleteAddress(userData.id, addressId);
                    await fetchAddresses();
                    showToast('Đã xóa địa chỉ');
                } catch (err) {
                    showToast(typeof err === 'string' ? err : (err?.message || 'Không thể xóa địa chỉ.'), 'error');
                }

            }
        );
    };

    const handleSetDefault = async (addressId) => {
        try {
            const userDataStr = localStorage.getItem('user');
            const userData = JSON.parse(userDataStr);
            await setDefaultAddress(userData.id, addressId);
            await fetchAddresses();
            showToast('Đã thiết lập địa chỉ mặc định');
        } catch (err) {
            showToast(typeof err === 'string' ? err : (err?.message || 'Không thể đặt mặc định.'), 'error');
        }

    };

    const renderModal = () => {
        if (!isModalOpen) return null;

        return ReactDOM.createPortal(
            <div className={styles.modalOverlay} onClick={handleCloseModal}>
                <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>
                            {editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
                        </h2>
                        <button className={styles.closeButton} onClick={handleCloseModal}>
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.formGrid}>
                        <div className={styles.field}>
                            <label className={styles.label}>Họ và tên</label>
                            <input
                                type="text"
                                name="receiverName"
                                value={formData.receiverName}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Vd: Nguyễn Văn A"
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="0xxxxxxxxx"
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Tỉnh / Thành phố</label>
                            <div className="relative">
                                <select
                                    name="provinceId"
                                    value={formData.provinceId}
                                    onChange={handleProvinceChange}
                                    className={styles.select}
                                    required
                                >
                                    <option value="">Chọn Tỉnh/TP</option>
                                    {Array.isArray(provinces) && provinces.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Quận / Huyện</label>
                            <div className="relative">
                                <select
                                    name="districtId"
                                    value={formData.districtId}
                                    onChange={handleDistrictChange}
                                    className={styles.select}
                                    disabled={!formData.provinceId}
                                    required
                                >
                                    <option value="">Chọn Quận/Huyện</option>
                                    {Array.isArray(districts) && districts.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}

                                </select>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Phường / Xã</label>
                            <div className="relative">
                                <select
                                    name="wardId"
                                    value={formData.wardId}
                                    onChange={handleWardChange}
                                    className={styles.select}
                                    disabled={!formData.districtId}
                                    required
                                >
                                    <option value="">Chọn Phường/Xã</option>
                                    {Array.isArray(wards) && wards.map(w => (
                                        <option key={w.id} value={w.id}>{w.name}</option>
                                    ))}

                                </select>
                            </div>
                        </div>

                        <div className={`${styles.field} ${styles.fieldFull}`}>
                            <label className={styles.label}>Địa chỉ chi tiết</label>
                            <input
                                type="text"
                                name="detailAddress"
                                value={formData.detailAddress}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Vd: 123 Đường ABC..."
                                required
                            />
                        </div>
                        <div className={styles.checkboxField}>
                            <input
                                type="checkbox"
                                name="isDefault"
                                id="isDefault"
                                checked={formData.isDefault}
                                onChange={handleInputChange}
                                className={styles.checkbox}
                            />
                            <label htmlFor="isDefault" className="font-body text-body-md text-on-surface cursor-pointer">
                                Đặt làm địa chỉ mặc định
                            </label>
                        </div>

                        <div className={styles.formActions}>
                            <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}> Hủy </button>
                            <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                {submitting ? 'Đang lưu...' : (editingAddress ? 'Cập nhật' : 'Thêm mới')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>,
            document.body
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <section className={`${styles['animate-fade-in']} space-y-8`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6">
                <div>
                    <h1 className="font-headline text-headline-lg text-on-surface uppercase tracking-widest text-shadow-sm">Địa chỉ giao hàng</h1>
                    <p className="text-on-surface-variant font-body text-body-md mt-2">Quản lý các điểm đến cho những món đồ trang sức thủ công của bạn.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-body font-bold text-label-sm uppercase tracking-widest transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                    <Plus size={20} />
                    Thêm địa chỉ mới
                </button>
            </div>

            {error && (
                <div className="p-4 bg-error-container text-on-error-container rounded-xl font-body text-center">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Array.isArray(addresses) && addresses.length > 0 ? (
                    [...addresses].sort((a, b) => (b.isDefault ? 1 : -1)).map((address) => (
                        <div
                            key={address.id}
                            className={`relative group p-8 border rounded-2xl shadow-sm transition-all duration-300 ${address.isDefault
                                ? 'bg-primary-container border-primary/20 hover:border-primary shadow-primary/10'
                                : 'bg-white border-outline-variant/30 hover:border-primary-container'
                                }`}
                        >
                            {address.isDefault && (
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className="bg-white text-primary px-4 py-1 rounded-full font-body text-[10px] uppercase tracking-widest font-bold shadow-sm flex items-center gap-1">
                                        <Check size={12} />
                                        Mặc định
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h3 className={`font-headline text-2xl mb-2 ${address.isDefault ? 'text-white' : 'text-on-surface'}`}>
                                        {address.receiverName}
                                    </h3>
                                    <p className={`font-body text-body-md flex items-center gap-2 mb-4 ${address.isDefault ? 'text-white/80' : 'text-on-surface-variant'}`}>
                                        <Phone size={18} />
                                        {address.phone}
                                    </p>
                                    <div className="space-y-1">
                                        <p className={`font-body text-body-md ${address.isDefault ? 'text-white' : 'text-on-surface'}`}>
                                            {address.detailAddress}
                                        </p>
                                        <p className={`font-body text-body-md ${address.isDefault ? 'text-white/90' : 'text-on-surface-variant'}`}>
                                            {address.ward}, {address.district}
                                        </p>
                                        <p className={`font-body text-body-md ${address.isDefault ? 'text-white/90' : 'text-on-surface-variant'}`}>
                                            {address.province}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-10 flex flex-wrap gap-4 items-center">
                                    <button
                                        onClick={() => handleOpenModal(address)}
                                        className={`font-body text-[10px] flex items-center gap-1 uppercase tracking-widest font-bold px-3 py-2 rounded-lg transition-colors ${address.isDefault
                                            ? 'text-white bg-white/10 hover:bg-white/20'
                                            : 'text-primary bg-primary/5 hover:bg-primary/10'
                                            }`}
                                    >
                                        <Edit2 size={14} />
                                        Sửa
                                    </button>
                                    {!address.isDefault && (
                                        <>
                                            <button
                                                onClick={() => handleDelete(address.id)}
                                                className="font-body text-[10px] flex items-center gap-1 text-on-surface-variant hover:text-error uppercase tracking-widest font-bold px-3 py-2 rounded-lg hover:bg-error/5 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                                Xóa
                                            </button>
                                            <button
                                                onClick={() => handleSetDefault(address.id)}
                                                className="ml-auto text-secondary font-body font-bold text-[10px] tracking-widest hover:underline uppercase"
                                            >
                                                Đặt làm mặc định
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="lg:col-span-2 text-center py-20 bg-surface-container-lowest rounded-3xl border-2 border-dashed border-outline-variant/30">
                        <MapPin size={48} className="mx-auto text-outline-variant mb-4" />
                        <p className="font-headline text-headline-sm text-on-surface-variant">Bạn chưa có địa chỉ nào</p>
                        <button
                            onClick={() => handleOpenModal()}
                            className="mt-6 text-primary font-body font-bold uppercase tracking-widest hover:underline"
                        >
                            Thêm địa chỉ đầu tiên của bạn
                        </button>
                    </div>
                )}
            </div>

            {renderModal()}
        </section>
    );
};

export default ShippingAddresses;
