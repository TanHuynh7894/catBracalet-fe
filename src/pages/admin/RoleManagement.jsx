import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Plus, Edit3, Trash2, Shield, ShieldCheck, UserCheck,
    Check, X, Loader2, AlertTriangle, Download, ToggleLeft, ToggleRight, AlertCircle
} from 'lucide-react';
import { getAllRoles, createRole, updateRole, deleteRoleSoft, hardDeleteRole } from '../../services/roleService';
import { useToast } from '../../context/ToastContext';
import styles from './RoleManagement.module.css';

const RoleManagement = () => {
    const { showToast } = useToast();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedRole, setSelectedRole] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState('soft'); 


    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'ACTIVE'
    });

    const fetchRoles = async (isInitial = false) => {
        if (isInitial) setLoading(true);
        try {
            const data = await getAllRoles();
            setRoles(data);
        } catch (error) {
            showToast('Không thể tải danh sách vai trò', 'error');
        } finally {
            if (isInitial) setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles(true);
    }, []);

    const filteredRoles = useMemo(() => {
        if (!Array.isArray(roles)) return [];
        return roles.filter(role =>
            (role.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (role.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );
    }, [roles, searchTerm]);

    const openModal = (mode, role = null) => {
        setModalMode(mode);
        setSelectedRole(role);
        if (mode === 'edit' && role) {
            setFormData({
                name: role.name,
                description: role.description,
                status: role.status
            });
        } else {
            setFormData({
                name: '',
                description: '',
                status: 'ACTIVE'
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            if (modalMode === 'add') {
                await createRole(formData);
                showToast('Thêm vai trò thành công', 'success');
            } else {
                await updateRole(selectedRole.id, formData);
                showToast('Cập nhật vai trò thành công', 'success');
            }
            setShowModal(false);
            fetchRoles();
        } catch (error) {
            showToast(error.message || 'Thao tác thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async () => {
        setIsProcessing(true);
        try {
            if (deleteType === 'soft') {
                const newStatus = selectedRole.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                await deleteRoleSoft(selectedRole.id, newStatus);
                const isActivating = newStatus === 'ACTIVE';
                showToast(isActivating ? 'Đã khôi phục hoạt động cho vai trò' : 'Đã vô hiệu hoá vai trò thành công', 'success');
            } else {
                await hardDeleteRole(selectedRole.id);
                showToast('Đã xóa vĩnh viễn vai trò khỏi hệ thống', 'success');
            }
            setShowDeleteConfirm(false);
            fetchRoles();
        } catch (error) {
            showToast(error.message || 'Thao tác thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    const getRoleIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('admin')) return { icon: <ShieldCheck size={18} />, color: '#ab121c', bg: '#FDF2F2' };
        if (lowerName.includes('staff')) return { icon: <Shield size={18} />, color: '#1E429F', bg: '#E1EFFE' };
        if (lowerName.includes('customer')) return { icon: <UserCheck size={18} />, color: '#057A55', bg: '#DEF7EC' };
        return { icon: <Shield size={18} />, color: '#6B7280', bg: '#F3F4F6' };
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ACTIVE':
                return (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700 flex items-center gap-1.5 w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        HOẠT ĐỘNG
                    </span>
                );
            case 'INACTIVE':
            case 'BLOCKED':
            default:
                return (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-500 flex items-center gap-1.5 w-fit">
                        <X size={10} />
                        KHÔNG HOẠT ĐỘNG
                    </span>
                );
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 size={40} className="animate-spin text-primary mb-4" />
            <p className="text-gray-500 font-medium">Đang tải danh sách vai trò...</p>
        </div>
    );

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Quản lý Vai trò</h1>
                <div className={styles.filterGroup}>
                    <button onClick={() => openModal('add')} className={styles.primaryBtn}><Plus size={14} /> Thêm vai trò</button>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={16} style={{ color: '#9ca3af' }} />
                        <input
                            type="text" placeholder="Tìm theo tên, mô tả..."
                            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Tên vai trò</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Mô tả</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Trạng thái</th>
                                <th style={{ padding: '14px 20px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoles.map((role) => {
                                const roleStyle = getRoleIcon(role.name);
                                return (
                                    <tr key={role.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                                        <td style={{ padding: '16px 14px' }}>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    style={{
                                                        background: roleStyle.bg,
                                                        color: roleStyle.color
                                                    }}
                                                    className="p-2.5 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
                                                >
                                                    {roleStyle.icon}
                                                </div>
                                                <div>
                                                    <div className="font-extrabold text-gray-900 tracking-tight">{role.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Role ID: {role.id.substring(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 14px' }}>
                                            <div className="text-gray-600 leading-relaxed max-w-[300px] truncate" title={role.description}>
                                                {role.description}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 14px' }}>{getStatusBadge(role.status)}</td>
                                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                            <div className="flex justify-center gap-1">
                                                <button
                                                    onClick={() => openModal('edit', role)}
                                                    className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                                                    title="Chỉnh sửa"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedRole(role); setDeleteType('soft'); setShowDeleteConfirm(true); }}
                                                    className={`p-2 rounded-lg transition-colors ${role.status === 'ACTIVE'
                                                        ? 'text-green-500 hover:bg-green-50'
                                                        : 'text-gray-300 hover:bg-gray-100'
                                                        }`}
                                                    title={role.status === 'ACTIVE' ? 'Đang hoạt động - Click để vô hiệu hoá' : 'Đang tắt - Click để kích hoạt'}
                                                >
                                                    {role.status === 'ACTIVE' ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedRole(role); setDeleteType('hard'); setShowDeleteConfirm(true); }}
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                    title="Xóa vĩnh viễn"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">
                                {modalMode === 'add' ? 'Thêm vai trò mới' : 'Chỉnh sửa vai trò'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className={styles.formLabel}>Tên vai trò</label>
                                <input
                                    type="text" className={styles.formInput} required
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="ví dụ: Admin, Staff, Customer..."
                                />
                            </div>
                            <div>
                                <label className={styles.formLabel}>Mô tả</label>
                                <textarea
                                    className={styles.formInput} rows={3}
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Mô tả chức năng của vai trò này"
                                />
                            </div>
                            <div>
                                <label className={styles.formLabel}>Trạng thái</label>
                                <select
                                    className={styles.formInput}
                                    value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="ACTIVE">Hoạt động</option>
                                    <option value="INACTIVE">Không hoạt động</option>
                                </select>
                            </div>
                            <div className="pt-4">
                                <button type="submit" disabled={isProcessing} className={styles.primaryBtn} style={{ width: '100%', justifyContent: 'center' }}>
                                    {isProcessing ? <Loader2 className="animate-spin" /> : (modalMode === 'add' ? 'Tạo vai trò' : 'Lưu thay đổi')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {}
            {showDeleteConfirm && (
                <div className={styles.modalOverlay} onClick={() => setShowDeleteConfirm(false)}>
                    <div className={styles.modalContent} style={{ width: 480, textAlign: 'center', padding: '56px 48px' }} onClick={e => e.stopPropagation()}>
                        <div className={`mb-6 p-5 rounded-2xl inline-flex shadow-sm ${deleteType === 'hard' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                            {deleteType === 'hard' ? <Trash2 size={36} strokeWidth={2.5} /> : <AlertCircle size={36} strokeWidth={2.5} />}
                        </div>
                        <h3 className="text-2xl font-black mb-5 text-gray-900 tracking-tight">
                            {deleteType === 'hard' ? 'XÓA VĨNH VIỄN?' :
                                selectedRole?.status === 'ACTIVE' ? 'Ngừng hoạt động?' : 'Khôi phục vai trò?'}
                        </h3>
                        <p className="text-gray-500 text-[15px] mb-12 leading-relaxed px-4">
                            {deleteType === 'hard'
                                ? <>Hành động này <span className="text-red-600 font-bold underline decoration-red-200 underline-offset-4">không thể hoàn tác</span>. Vai trò <b>{selectedRole?.name}</b> sẽ bị xóa sạch khỏi hệ thống.</>
                                : selectedRole?.status === 'ACTIVE'
                                    ? <>Bạn có chắc muốn chuyển vai trò <b>{selectedRole?.name}</b> sang trạng thái <span className="font-bold text-gray-700">KHÔNG HOẠT ĐỘNG</span>?</>
                                    : <>Bạn có chắc chắn muốn <span className="text-emerald-600 font-extrabold uppercase tracking-tight">Khôi phục</span> hoạt động cho vai trò <b>{selectedRole?.name}</b>?</>
                            }
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all active:scale-95 border border-gray-100"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isProcessing}
                                className={`flex-1 px-6 py-3.5 rounded-xl text-[13px] tracking-wide font-black text-white transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg
                                    ${deleteType === 'hard' ? 'bg-red-600 hover:bg-red-700 shadow-red-100' :
                                        selectedRole?.status === 'ACTIVE' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-100' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'}`}
                            >
                                {isProcessing ? <Loader2 className="animate-spin" size={18} /> :
                                    (deleteType === 'hard' ? 'XÓA NGAY' :
                                        selectedRole?.status === 'ACTIVE' ? 'XÁC NHẬN KHÓA' : 'KHÔI PHỤC NGAY')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleManagement;
