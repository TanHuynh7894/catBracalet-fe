import React, { useState, useEffect, useMemo } from 'react';
import {
    Search, Filter, Download, Upload, Plus,
    ChevronDown, ChevronLeft, ChevronRight, Eye, Edit3, Trash2,
    Shield, ShieldCheck, ShieldAlert, UserCheck, UserX, Mail, Phone,
    Calendar, MapPin, X, Check, AlertTriangle, Loader2, Camera, User, ToggleLeft, ToggleRight, AlertCircle
} from 'lucide-react';
import styles from './UserManagement.module.css';
import {
    getAllUsers,
    updateUserAdmin,
    softDeleteUser,
    addRole,
    deleteRole
} from '../../services/userService';
import { getAllRoles } from '../../services/roleService';
import { useToast } from '../../context/ToastContext';

const UserManagement = () => {
    const { showToast } = useToast();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'add'
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Form state for Edit/Add
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        status: 'ACTIVE'
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);


    const fetchUsers = async (isInitial = false) => {
        if (isInitial) setLoading(true);
        try {
            const [usersData, rolesData] = await Promise.all([
                getAllUsers(),
                getAllRoles()
            ]);
            setUsers(usersData);
            setRoles(rolesData);
        } catch (error) {
            console.error('Fetch error:', error);
            showToast('Không thể tải dữ liệu', 'error');
        } finally {
            if (isInitial) setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(true);
    }, []);


    const filteredUsers = useMemo(() => {
        if (!Array.isArray(users)) return [];
        return users.filter(user => {
            const matchTab = activeTab === 'all' ||
                (activeTab === 'active' && user.status === 'ACTIVE') ||
                (activeTab === 'blocked' && (user.status === 'BLOCKED' || user.status === 'INACTIVE'));

            const matchSearch = (user.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (user.phone && user.phone.includes(searchTerm)) ||
                (user.id?.toLowerCase() || '').includes(searchTerm.toLowerCase());

            return matchTab && matchSearch;
        });
    }, [users, activeTab, searchTerm]);

    const stats = useMemo(() => [
        { label: 'Tổng người dùng', value: users.length, color: '#0088ff', bg: '#eff6ff' },
        { label: 'Đang hoạt động', value: users.filter(u => u.status === 'ACTIVE').length, color: '#10b981', bg: '#ecfdf5' },
        { label: 'Admin', value: users.filter(u => u.roles?.some(r => r.name === 'Admin' || r.name === 'ADMIN')).length, color: '#8b5cf6', bg: '#f5f3ff' },
        { label: 'Vô hiệu hóa', value: users.filter(u => u.status === 'INACTIVE' || u.status === 'BLOCKED').length, color: '#ef4444', bg: '#fef2f2' },
    ], [users]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const data = new FormData();
            data.append('fullName', formData.fullName);
            data.append('email', formData.email);
            data.append('phone', formData.phone);

            if (avatarFile) {
                data.append('avatar', avatarFile);
            }

            await updateUserAdmin(selectedUser.id, data);
            showToast('Cập nhật thông tin thành công', 'success');
            setShowModal(false);
            setAvatarFile(null);
            setAvatarPreview(null);
            fetchUsers();
        } catch (error) {
            showToast(error.message || 'Cập nhật thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteUser = async () => {
        setIsProcessing(true);
        try {
            await softDeleteUser(selectedUser.id);
            const isActivating = selectedUser.status === 'INACTIVE' || selectedUser.status === 'BLOCKED';
            showToast(isActivating ? 'Đã kích hoạt lại tài khoản người dùng' : 'Đã vô hiệu hóa tài khoản người dùng', 'success');
            setShowDeleteConfirm(false);
            fetchUsers();
        } catch (error) {
            showToast(error.message || 'Xóa thất bại', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleRole = async (userId, roleId, hasRole) => {
        try {
            if (hasRole) {
                await deleteRole(userId, roleId);
                showToast('Đã gỡ vai trò', 'info');
            } else {
                await addRole(userId, roleId);
                showToast('Đã thêm vai trò', 'success');
            }
            fetchUsers();
        } catch (error) {
            showToast(error.message || 'Thao tác thất bại', 'error');
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            ACTIVE: { label: 'ĐANG HOẠT ĐỘNG', bg: '#DEF7EC', color: '#03543F', dot: '#057A55', pulse: true },
            BLOCKED: { label: 'BỊ KHÓA', bg: '#F3F4F6', color: '#dd1919ff', dot: '#dd1919ff', pulse: false },
        };
        const s = map[status] || map.BLOCKED;
        return (
            <span style={{
                background: s.bg, color: s.color,
                padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 800,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                letterSpacing: '0.02em', border: `1px solid ${s.bg}`
            }}>
                <span className={s.pulse ? "animate-pulse" : ""} style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
                {s.label}
            </span>
        );
    };

    const getRoleBadge = (roles = []) => {
        if (!roles.length) return <span className="text-gray-300 italic text-[11px] font-medium">Chưa có vai trò</span>;

        return (
            <div className="flex flex-wrap gap-1.5">
                {roles.map(role => {
                    const name = role.name.toLowerCase();
                    let style = { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB', icon: <Shield size={10} /> };

                    if (name.includes('admin')) style = { bg: '#FDF2F2', color: '#9B1C1C', border: '#FBD5D5', icon: <ShieldCheck size={10} /> };
                    else if (name.includes('staff')) style = { bg: '#E1EFFE', color: '#1E429F', border: '#C3DDFD', icon: <Shield size={10} /> };
                    else if (name.includes('customer')) style = { bg: '#DEF7EC', color: '#03543F', border: '#BCF0DA', icon: <UserCheck size={10} /> };

                    return (
                        <span key={role.id} style={{
                            background: style.bg, color: style.color, border: `1px solid ${style.border}`,
                            padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800,
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            textTransform: 'uppercase', letterSpacing: '0.01em'
                        }}>
                            {style.icon} {role.description}
                        </span>
                    );
                })}
            </div>
        );
    };

    const openUserModal = (user, mode) => {
        setSelectedUser(user);
        setModalMode(mode);
        if (mode === 'edit') {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                status: user.status || 'ACTIVE'
            });
            setAvatarPreview(user.avatar || null);
            setAvatarFile(null);
        }
        setShowModal(true);
    };


    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 size={40} className="animate-spin text-primary mb-4" />
            <p className="text-gray-500 font-medium">Đang tải danh sách người dùng...</p>
        </div>
    );

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Quản lý người dùng</h1>
                <div className={styles.filterGroup}>
                    <button className={styles.primaryBtn}><Plus size={14} /> Thêm người dùng</button>
                </div>
            </div>

            <div className={styles.statsGrid}>
                {stats.map((stat, idx) => (
                    <div key={idx} className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: stat.bg, color: stat.color }}>
                            {idx === 0 && <UserCheck size={22} />}
                            {idx === 1 && <Check size={22} />}
                            {idx === 2 && <ShieldCheck size={22} />}
                            {idx === 3 && <UserX size={22} />}
                        </div>
                        <div className={styles.statInfo}>
                            <div className={styles.statLabel}>{stat.label}</div>
                            <div className={styles.statValue}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div className={styles.tabsContainer}>
                    {[
                        { id: 'all', label: 'Tất cả' },
                        { id: 'active', label: 'Hoạt động' },
                        { id: 'blocked', label: 'Bị khóa' }
                    ].map(tab => (
                        <button key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={16} style={{ color: '#9ca3af' }} />
                        <input
                            type="text" placeholder="Tìm theo tên, email, SDT..."
                            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Người dùng</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Liên hệ</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Vai trò</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Trạng thái</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'right' }}>Chi tiêu</th>
                                <th style={{ padding: '14px 20px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-all border-b border-gray-50 group">
                                    <td style={{ padding: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 14, background: '#ab121c',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#fff', fontWeight: 900, border: '3px solid #fff',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden',
                                                transition: 'transform 0.2s'
                                            }} className="group-hover:scale-110">
                                                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="" /> : user.fullName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ color: '#111827', fontWeight: 800, fontSize: 14 }}>{user.fullName}</div>
                                                <div style={{ color: '#9ca3af', fontSize: 10, fontWeight: 600 }}>ID: {user.id.slice(0, 8)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: 16 }}>
                                        <div style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>{user.email}</div>
                                        <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>{user.phone || 'N/A'}</div>
                                    </td>
                                    <td style={{ padding: 16 }}>{getRoleBadge(user.roles)}</td>
                                    <td style={{ padding: 16 }}>{getStatusBadge(user.status)}</td>
                                    <td style={{ padding: 16, textAlign: 'right' }}>
                                        <span style={{ fontWeight: 800, color: '#1f2937', fontSize: 13 }}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(user.totalSpending || 0)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                        <div className="flex justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openUserModal(user, 'view')} className="p-2 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors" title="Xem chi tiết"><Eye size={16} /></button>
                                            <button onClick={() => openUserModal(user, 'edit')} className="p-2 hover:bg-amber-50 text-amber-500 rounded-lg transition-colors" title="Sửa"><Edit3 size={16} /></button>
                                            <button
                                                onClick={() => { setSelectedUser(user); setShowDeleteConfirm(true); }}
                                                className={`p-2 rounded-lg transition-colors ${user.status === 'ACTIVE'
                                                    ? 'text-green-500 hover:bg-green-50'
                                                    : 'text-gray-300 hover:bg-gray-100'
                                                    }`}
                                                title={user.status === 'ACTIVE' ? 'Đang hoạt động - Click để khóa' : 'Đang bị khóa - Click để mở'}
                                            >
                                                {user.status === 'ACTIVE' ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserDetailModal
                show={showModal}
                user={selectedUser}
                mode={modalMode}
                formData={formData}
                avatarPreview={avatarPreview}
                handleFileChange={handleFileChange}
                isProcessing={isProcessing}
                onClose={() => setShowModal(false)}
                setFormData={setFormData}
                handleUpdateUser={handleUpdateUser}
                toggleRole={toggleRole}
                getStatusBadge={getStatusBadge}
                availableRoles={roles}
            />

            {showDeleteConfirm && (
                <div className={styles.modalOverlay} onClick={() => setShowDeleteConfirm(false)}>
                    <div className={styles.modalContent} style={{ width: 480, textAlign: 'center', padding: '56px 48px' }} onClick={e => e.stopPropagation()}>
                        <div className={`mb-6 p-5 rounded-2xl inline-flex shadow-sm ${selectedUser?.status === 'ACTIVE' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            <AlertCircle size={36} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-black mb-5 text-gray-900 tracking-tight">
                            {selectedUser?.status === 'ACTIVE' ? 'Vô hiệu hóa tài khoản?' : 'Kích hoạt lại tài khoản?'}
                        </h3>
                        <p className="text-gray-500 text-[15px] mb-12 leading-relaxed">
                            {selectedUser?.status === 'ACTIVE'
                                ? <>Tài khoản <b>{selectedUser?.fullName}</b> sẽ <span className="text-rose-600 font-bold">không thể đăng nhập</span> vào hệ thống cho đến khi được quản trị viên kích hoạt lại.</>
                                : <>Bạn có chắc chắn muốn <span className="text-emerald-600 font-extrabold">KÍCH HOẠT LẠI</span> tài khoản cho <b>{selectedUser?.fullName}</b>?</>
                            }
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all active:scale-95 border border-gray-100"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                disabled={isProcessing}
                                className="flex-1 px-6 py-3.5 rounded-xl text-[13px] tracking-wide font-black text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" size={18} /> : 'XÁC NHẬN KHÓA'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Sub components moved outside to prevent focus loss during re-renders ---

const UserDetailModal = ({
    show, user, mode, formData, avatarPreview, handleFileChange, isProcessing,
    onClose, setFormData, handleUpdateUser, toggleRole, getStatusBadge, availableRoles
}) => {
    if (!show || !user) return null;
    const u = user;

    // Filter out roles user already has
    const unassignedRoles = availableRoles.filter(
        ar => !u.roles?.some(ur => ur.id === ar.id)
    );

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={{
                    padding: '24px 28px', borderBottom: '1px solid #f3f4f6',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1f2937', margin: 0 }}>
                        {mode === 'view' ? 'Chi tiết người dùng' : 'Chỉnh sửa người dùng'}
                    </h3>
                    <button onClick={onClose} style={{
                        border: 'none', background: '#f3f4f6', borderRadius: 8,
                        width: 32, height: 32, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer', color: '#6b7280'
                    }}>
                        <X size={16} />
                    </button>
                </div>

                <div style={{ padding: '24px 28px', maxHeight: '70vh', overflowY: 'auto' }}>
                    {mode === 'view' ? (
                        <>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24,
                                padding: 20, background: '#f9fafb', borderRadius: 12
                            }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: 16,
                                    background: '#ab121c',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontWeight: 800, fontSize: 20, flexShrink: 0
                                }}>
                                    {u.avatar ? (
                                        <img src={u.avatar} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                                    ) : (
                                        u.fullName.charAt(0)
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 800, fontSize: 18, color: '#1f2937' }}>{u.fullName}</div>
                                    <div style={{ color: '#6b7280', fontSize: 13, marginTop: 2 }}>{u.id}</div>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                        {getStatusBadge(u.status)}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <InfoRow icon={<Mail size={14} />} label="Email" value={u.email} />
                                <InfoRow icon={<Phone size={14} />} label="Số điện thoại" value={u.phone || 'Chưa cập nhật'} />
                                <InfoRow icon={<Calendar size={14} />} label="Ngày tham gia" value={new Date(u.createdAt).toLocaleDateString('vi-VN')} />
                                <InfoRow icon={<MapPin size={14} />} label="Tổng chi tiêu" value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(u.totalSpending || 0)} />
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="mb-4">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Quản lý Vai trò</label>
                                    <div className="flex gap-2">
                                        <select
                                            className={styles.formInput}
                                            style={{ padding: '6px 12px', fontSize: 13 }}
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    toggleRole(u.id, e.target.value, false);
                                                    e.target.value = '';
                                                }
                                            }}
                                        >
                                            <option value="">+ Thêm vai trò mới...</option>
                                            {unassignedRoles.map(role => (
                                                <option key={role.id} value={role.id}>{role.description} ({role.name})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {u.roles?.map(role => (
                                        <div key={role.id} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-sm group">
                                            <span className="font-medium text-gray-700">{role.description}</span>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`Gỡ vai trò ${role.description}?`))
                                                        toggleRole(u.id, role.id, true);
                                                }}
                                                className="p-1 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded transition-colors"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    {(!u.roles || u.roles.length === 0) && (
                                        <span className="text-gray-400 italic text-xs">Người dùng chưa có vai trò nào</span>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            {/* Avatar Upload */}
                            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <div className="relative group">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={32} className="text-gray-400" />
                                        )}
                                    </div>
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                                        <Camera size={16} />
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700">Ảnh đại diện</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">Nhấp vào ảnh để thay đổi (PNG, JPG, JPEG)</p>
                                </div>
                            </div>

                            <div>
                                <label className={styles.formLabel}>Họ và Tên</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={styles.formLabel}>Email</label>
                                    <input
                                        type="email"
                                        className={styles.formInput}
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styles.formLabel}>Số điện thoại</label>
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className={styles.primaryBtn}
                                    disabled={isProcessing}
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : 'Lưu thay đổi'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div style={{
        display: 'flex', flexDirection: 'column', gap: 4,
        padding: 12, background: '#f9fafb', borderRadius: 8
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>
            {icon} {label}
        </div>
        <div style={{ fontWeight: 600, color: '#374151', fontSize: 13 }}>{value}</div>
    </div>
);

export default UserManagement;
