import React, { useState } from 'react';
import {
    Search, Filter, Download, Upload, Plus, MoreHorizontal,
    ChevronDown, ChevronLeft, ChevronRight, Eye, Edit3, Trash2,
    Shield, ShieldCheck, ShieldAlert, UserCheck, UserX, Mail, Phone,
    Calendar, MapPin, X, Check, AlertTriangle
} from 'lucide-react';
import styles from './UserManagement.module.css';

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'add'
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const userData = [
        {
            id: 'USR001', name: 'Nguyễn Văn An', email: 'an.nguyen@email.com', phone: '0901 234 567',
            role: 'Admin', status: 'active', avatar: 'NA', avatarColor: '#680006',
            joinDate: '12/01/2025', lastLogin: '27/05/2026 09:15', orders: 45,
            totalSpent: '15,200,000đ', address: 'Quận 1, TP.HCM'
        },
        {
            id: 'USR002', name: 'Trần Thị Bích', email: 'bich.tran@email.com', phone: '0912 345 678',
            role: 'Khách hàng', status: 'active', avatar: 'TB', avatarColor: '#0088ff',
            joinDate: '20/03/2025', lastLogin: '26/05/2026 14:30', orders: 12,
            totalSpent: '4,800,000đ', address: 'Quận 7, TP.HCM'
        },
        {
            id: 'USR003', name: 'Lê Hoàng Minh', email: 'minh.le@email.com', phone: '0923 456 789',
            role: 'Nhân viên', status: 'active', avatar: 'LM', avatarColor: '#10b981',
            joinDate: '05/06/2025', lastLogin: '27/05/2026 08:00', orders: 0,
            totalSpent: '0đ', address: 'Quận 3, TP.HCM'
        },
        {
            id: 'USR004', name: 'Phạm Ngọc Trang', email: 'trang.pham@email.com', phone: '0934 567 890',
            role: 'Khách hàng', status: 'inactive', avatar: 'PT', avatarColor: '#f59e0b',
            joinDate: '15/08/2025', lastLogin: '10/04/2026 22:45', orders: 3,
            totalSpent: '1,250,000đ', address: 'Quận Bình Thạnh, TP.HCM'
        },
        {
            id: 'USR005', name: 'Đỗ Quốc Minh', email: 'minh.do@email.com', phone: '0945 678 901',
            role: 'Khách hàng', status: 'active', avatar: 'DM', avatarColor: '#8b5cf6',
            joinDate: '01/11/2025', lastLogin: '25/05/2026 16:20', orders: 28,
            totalSpent: '9,600,000đ', address: 'Quận 2, TP.HCM'
        },
        {
            id: 'USR006', name: 'Võ Diễm Quỳnh', email: 'quynh.vo@email.com', phone: '0956 789 012',
            role: 'Khách hàng', status: 'blocked', avatar: 'VQ', avatarColor: '#ef4444',
            joinDate: '22/02/2025', lastLogin: '05/03/2026 11:00', orders: 1,
            totalSpent: '350,000đ', address: 'Quận Tân Bình, TP.HCM'
        },
        {
            id: 'USR007', name: 'Ngô Thanh Lam', email: 'lam.ngo@email.com', phone: '0967 890 123',
            role: 'Nhân viên', status: 'active', avatar: 'NL', avatarColor: '#06b6d4',
            joinDate: '10/09/2025', lastLogin: '27/05/2026 07:50', orders: 0,
            totalSpent: '0đ', address: 'Quận 5, TP.HCM'
        },
        {
            id: 'USR008', name: 'Huỳnh Kim Ngân', email: 'ngan.huynh@email.com', phone: '0978 901 234',
            role: 'Khách hàng', status: 'active', avatar: 'HN', avatarColor: '#ec4899',
            joinDate: '30/12/2025', lastLogin: '26/05/2026 20:10', orders: 8,
            totalSpent: '3,400,000đ', address: 'Quận Phú Nhuận, TP.HCM'
        },
    ];

    const tabs = [
        { id: 'all', label: 'Tất cả', count: userData.length },
        { id: 'active', label: 'Hoạt động', count: userData.filter(u => u.status === 'active').length },
        { id: 'inactive', label: 'Không hoạt động', count: userData.filter(u => u.status === 'inactive').length },
        { id: 'blocked', label: 'Bị khóa', count: userData.filter(u => u.status === 'blocked').length },
    ];

    const filteredUsers = userData.filter(user => {
        const matchTab = activeTab === 'all' || user.status === activeTab;
        const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm) ||
            user.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchTab && matchSearch;
    });

    const stats = [
        { label: 'Tổng người dùng', value: userData.length, color: '#0088ff', bg: '#eff6ff' },
        { label: 'Đang hoạt động', value: userData.filter(u => u.status === 'active').length, color: '#10b981', bg: '#ecfdf5' },
        { label: 'Admin & Nhân viên', value: userData.filter(u => u.role === 'Admin' || u.role === 'Nhân viên').length, color: '#8b5cf6', bg: '#f5f3ff' },
        { label: 'Bị khóa', value: userData.filter(u => u.status === 'blocked').length, color: '#ef4444', bg: '#fef2f2' },
    ];

    const toggleSelect = (id) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(u => u.id));
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            active: { label: 'Hoạt động', bg: '#ecfdf5', color: '#059669', border: '#a7f3d0' },
            inactive: { label: 'Không hoạt động', bg: '#fff7ed', color: '#d97706', border: '#fed7aa' },
            blocked: { label: 'Bị khóa', bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
        };
        const s = map[status];
        return (
            <span style={{
                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 4
            }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
                {s.label}
            </span>
        );
    };

    const getRoleBadge = (role) => {
        const map = {
            'Admin': { bg: '#fef2f2', color: '#991b1b', icon: <ShieldAlert size={12} /> },
            'Nhân viên': { bg: '#f5f3ff', color: '#6d28d9', icon: <ShieldCheck size={12} /> },
            'Khách hàng': { bg: '#eff6ff', color: '#1d4ed8', icon: <Shield size={12} /> },
        };
        const r = map[role];
        return (
            <span style={{
                background: r.bg, color: r.color,
                padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 4
            }}>
                {r.icon} {role}
            </span>
        );
    };

    const openUserModal = (user, mode) => {
        setSelectedUser(user);
        setModalMode(mode);
        setShowModal(true);
    };

    const UserDetailModal = () => {
        if (!showModal || !selectedUser) return null;
        const u = selectedUser;
        return (
            <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                    {/* Modal Header */}
                    <div style={{
                        padding: '24px 28px', borderBottom: '1px solid #f3f4f6',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1f2937', margin: 0 }}>
                            {modalMode === 'view' ? 'Chi tiết người dùng' : modalMode === 'edit' ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}
                        </h3>
                        <button onClick={() => setShowModal(false)} style={{
                            border: 'none', background: '#f3f4f6', borderRadius: 8,
                            width: 32, height: 32, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', color: '#6b7280'
                        }}>
                            <X size={16} />
                        </button>
                    </div>

                    {/* User Profile Card */}
                    <div style={{ padding: '24px 28px' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24,
                            padding: 20, background: '#f9fafb', borderRadius: 12
                        }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: 16,
                                background: `linear-gradient(135deg, ${u.avatarColor}, ${u.avatarColor}cc)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontWeight: 800, fontSize: 20, flexShrink: 0,
                                boxShadow: `0 4px 14px ${u.avatarColor}40`
                            }}>
                                {u.avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: 18, color: '#1f2937' }}>{u.name}</div>
                                <div style={{ color: '#6b7280', fontSize: 13, marginTop: 2 }}>{u.id}</div>
                                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                    {getStatusBadge(u.status)}
                                    {getRoleBadge(u.role)}
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <InfoRow icon={<Mail size={14} />} label="Email" value={u.email} />
                            <InfoRow icon={<Phone size={14} />} label="Số điện thoại" value={u.phone} />
                            <InfoRow icon={<Calendar size={14} />} label="Ngày tham gia" value={u.joinDate} />
                            <InfoRow icon={<Calendar size={14} />} label="Đăng nhập gần nhất" value={u.lastLogin} />
                            <InfoRow icon={<MapPin size={14} />} label="Địa chỉ" value={u.address} />
                            <InfoRow icon={<Shield size={14} />} label="Vai trò" value={u.role} />
                        </div>

                        {/* Stats Cards in modal */}
                        {u.role === 'Khách hàng' && (
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                                marginTop: 24, paddingTop: 24, borderTop: '1px solid #f3f4f6'
                            }}>
                                <div style={{
                                    background: '#eff6ff', borderRadius: 12, padding: 16, textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: 24, fontWeight: 800, color: '#1d4ed8' }}>{u.orders}</div>
                                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Đơn hàng</div>
                                </div>
                                <div style={{
                                    background: '#ecfdf5', borderRadius: 12, padding: 16, textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: 24, fontWeight: 800, color: '#059669' }}>{u.totalSpent}</div>
                                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Tổng chi tiêu</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Modal Footer */}
                    <div style={{
                        padding: '16px 28px', borderTop: '1px solid #f3f4f6',
                        display: 'flex', justifyContent: 'flex-end', gap: 10
                    }}>
                        <button onClick={() => setShowModal(false)} style={{
                            padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: 8,
                            fontSize: 13, fontWeight: 600, color: '#4b5563', background: '#fff',
                            cursor: 'pointer'
                        }}>Đóng</button>
                        {modalMode === 'view' && (
                            <button onClick={() => setModalMode('edit')} style={{
                                padding: '10px 20px', border: 'none', borderRadius: 8,
                                fontSize: 13, fontWeight: 600, color: '#fff', background: '#0088ff',
                                cursor: 'pointer'
                            }}>Chỉnh sửa</button>
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

    const DeleteConfirmModal = () => {
        if (!showDeleteConfirm) return null;
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
            }} onClick={() => setShowDeleteConfirm(false)}>
                <div style={{
                    background: '#fff', borderRadius: 16, width: 400, padding: 28,
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)', textAlign: 'center'
                }} onClick={e => e.stopPropagation()}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16, background: '#fef2f2',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px'
                    }}>
                        <AlertTriangle size={28} style={{ color: '#ef4444' }} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1f2937', margin: '0 0 8px' }}>
                        Xác nhận xóa
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 24px', lineHeight: 1.5 }}>
                        Bạn có chắc chắn muốn xóa {selectedUsers.length > 0 ? `${selectedUsers.length} người dùng` : 'người dùng này'}? Hành động này không thể hoàn tác.
                    </p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <button onClick={() => setShowDeleteConfirm(false)} style={{
                            padding: '10px 24px', border: '1px solid #e5e7eb', borderRadius: 8,
                            fontSize: 13, fontWeight: 600, color: '#4b5563', background: '#fff', cursor: 'pointer'
                        }}>Hủy</button>
                        <button onClick={() => { setShowDeleteConfirm(false); setSelectedUsers([]); }} style={{
                            padding: '10px 24px', border: 'none', borderRadius: 8,
                            fontSize: 13, fontWeight: 600, color: '#fff', background: '#ef4444', cursor: 'pointer'
                        }}>Xóa</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.dashboard}>

            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Quản lý người dùng</h1>
                <div className={styles.filterGroup}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: '#fff', border: '1px solid #e5e7eb', padding: '8px 14px',
                        borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#4b5563', cursor: 'pointer'
                    }}>
                        <Download size={14} /> Xuất file
                    </button>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: '#fff', border: '1px solid #e5e7eb', padding: '8px 14px',
                        borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#4b5563', cursor: 'pointer'
                    }}>
                        <Upload size={14} /> Nhập file
                    </button>
                    <button className={styles.primaryBtn} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Plus size={14} /> Thêm người dùng
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
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

            {/* Main Table */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                {/* Tabs */}
                <div className={styles.tabsContainer}>
                    {tabs.map(tab => (
                        <button key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSelectedUsers([]); }}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}>
                            {tab.label}
                            <span className={`${styles.tabCount} ${activeTab === tab.id ? styles.tabCountActive : styles.tabCountInactive}`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search & Filters */}
                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={16} style={{ color: '#9ca3af' }} />
                        <input
                            type="text" placeholder="Tìm kiếm theo tên, email, số điện thoại, mã người dùng..."
                            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    <button className={styles.filterBtn}>Vai trò <ChevronDown size={14} /></button>
                    <button className={styles.filterBtn}>Ngày tạo <ChevronDown size={14} /></button>
                    <button className={styles.filterBtn}><Filter size={14} /> Bộ lọc khác</button>
                </div>

                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                    <div className={styles.bulkActions}>
                        <span style={{ fontWeight: 700, color: '#1d4ed8' }}>
                            Đã chọn {selectedUsers.length} người dùng
                        </span>
                        <button style={{
                            border: 'none', background: '#fff', padding: '5px 12px', borderRadius: 6,
                            fontSize: 12, fontWeight: 600, color: '#059669', cursor: 'pointer',
                            border: '1px solid #a7f3d0'
                        }}>
                            <Check size={12} style={{ marginRight: 4 }} /> Kích hoạt
                        </button>
                        <button style={{
                            border: 'none', background: '#fff', padding: '5px 12px', borderRadius: 6,
                            fontSize: 12, fontWeight: 600, color: '#d97706', cursor: 'pointer',
                            border: '1px solid #fed7aa'
                        }}>
                            <UserX size={12} style={{ marginRight: 4 }} /> Vô hiệu hóa
                        </button>
                        <button onClick={() => setShowDeleteConfirm(true)} style={{
                            border: 'none', background: '#fff', padding: '5px 12px', borderRadius: 6,
                            fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer',
                            border: '1px solid #fecaca'
                        }}>
                            <Trash2 size={12} style={{ marginRight: 4 }} /> Xóa
                        </button>
                        <button onClick={() => setSelectedUsers([])} style={{
                            border: 'none', background: 'none', fontSize: 12, color: '#6b7280',
                            cursor: 'pointer', marginLeft: 'auto', fontWeight: 600
                        }}>Bỏ chọn tất cả</button>
                    </div>
                )}

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                <th style={{ padding: '14px 14px 14px 20px', width: 40, textAlign: 'center' }}>
                                    <input type="checkbox"
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={toggleSelectAll}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Người dùng</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Liên hệ</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Vai trò</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Trạng thái</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Đơn hàng</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'right' }}>Tổng chi tiêu</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Đăng nhập cuối</th>
                                <th style={{ padding: '14px 20px 14px 14px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}
                                    style={{
                                        borderBottom: '1px solid #f9fafb',
                                        background: selectedUsers.includes(user.id) ? '#f0f9ff' : 'transparent',
                                        transition: 'background 0.15s'
                                    }}
                                    onMouseEnter={e => { if (!selectedUsers.includes(user.id)) e.currentTarget.style.background = '#fafafa'; }}
                                    onMouseLeave={e => { if (!selectedUsers.includes(user.id)) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    <td style={{ padding: '14px 14px 14px 20px', textAlign: 'center' }}>
                                        <input type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelect(user.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </td>
                                    <td style={{ padding: 14 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 10,
                                                background: `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}cc)`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0,
                                                boxShadow: `0 2px 8px ${user.avatarColor}30`
                                            }}>
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <div style={{ color: '#1f2937', fontWeight: 700, cursor: 'pointer' }}
                                                    onClick={() => openUserModal(user, 'view')}>
                                                    {user.name}
                                                </div>
                                                <div style={{ color: '#9ca3af', fontSize: 11, marginTop: 2, fontFamily: 'monospace' }}>{user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: 14 }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#374151', fontSize: 12 }}>
                                                <Mail size={12} style={{ color: '#9ca3af' }} /> {user.email}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280', fontSize: 12 }}>
                                                <Phone size={12} style={{ color: '#9ca3af' }} /> {user.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: 14 }}>{getRoleBadge(user.role)}</td>
                                    <td style={{ padding: 14 }}>{getStatusBadge(user.status)}</td>
                                    <td style={{ padding: 14, fontWeight: 700, color: '#374151', textAlign: 'center' }}>{user.orders}</td>
                                    <td style={{ padding: 14, fontWeight: 700, color: '#059669', textAlign: 'right' }}>{user.totalSpent}</td>
                                    <td style={{ padding: 14, color: '#6b7280', fontSize: 12 }}>{user.lastLogin}</td>
                                    <td style={{ padding: '14px 20px 14px 14px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                                            <button onClick={() => openUserModal(user, 'view')} title="Xem chi tiết" style={{
                                                border: 'none', background: '#f3f4f6', borderRadius: 6,
                                                width: 30, height: 30, display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', cursor: 'pointer', color: '#6b7280',
                                                transition: 'all 0.15s'
                                            }}
                                                onMouseEnter={e => { e.currentTarget.style.background = '#0088ff'; e.currentTarget.style.color = '#fff'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#6b7280'; }}
                                            >
                                                <Eye size={14} />
                                            </button>
                                            <button onClick={() => openUserModal(user, 'edit')} title="Chỉnh sửa" style={{
                                                border: 'none', background: '#f3f4f6', borderRadius: 6,
                                                width: 30, height: 30, display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', cursor: 'pointer', color: '#6b7280',
                                                transition: 'all 0.15s'
                                            }}
                                                onMouseEnter={e => { e.currentTarget.style.background = '#f59e0b'; e.currentTarget.style.color = '#fff'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#6b7280'; }}
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button onClick={() => { setSelectedUser(user); setShowDeleteConfirm(true); }} title="Xóa" style={{
                                                border: 'none', background: '#f3f4f6', borderRadius: 6,
                                                width: 30, height: 30, display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', cursor: 'pointer', color: '#6b7280',
                                                transition: 'all 0.15s'
                                            }}
                                                onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#6b7280'; }}
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

                {/* Pagination */}
                <div style={{
                    padding: '14px 20px', borderTop: '1px solid #f3f4f6',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div style={{ color: '#9ca3af', fontSize: 13 }}>
                        Hiển thị <span style={{ fontWeight: 700, color: '#374151' }}>{filteredUsers.length}</span> / {userData.length} người dùng
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, color: '#6b7280', marginRight: 8 }}>Trang 1 / 1</span>
                        <button style={{
                            border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6,
                            width: 32, height: 32, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', color: '#9ca3af'
                        }}>
                            <ChevronLeft size={14} />
                        </button>
                        <button style={{
                            border: '1px solid #0088ff', background: '#0088ff', borderRadius: 6,
                            width: 32, height: 32, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', color: '#fff', fontWeight: 700, fontSize: 12
                        }}>1</button>
                        <button style={{
                            border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6,
                            width: 32, height: 32, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', color: '#9ca3af'
                        }}>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            <UserDetailModal />
            <DeleteConfirmModal />
        </div>
    );
};

export default UserManagement;
