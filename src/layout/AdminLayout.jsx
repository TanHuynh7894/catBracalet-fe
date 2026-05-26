import React, { useState, useRef, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayout.module.css';
import { Search, Bell, HelpCircle, User, Settings, LogOut, ChevronDown, Shield, Store } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.layout}>
            <AdminSidebar />

            <div className={styles.mainContent}>
                {/* Admin Header */}
                <header className={styles.header}>
                    <div className={styles.searchBar}>
                        <Search size={18} className="text-gray-400" />
                        <input type="text" placeholder="Tìm kiếm" className={styles.searchInput} />
                    </div>

                    <div className={styles.headerActions}>
                        <button className={styles.actionBtn}>
                            <HelpCircle size={20} />
                            <span className="text-sm font-medium">Trợ giúp</span>
                        </button>
                        <button className={`${styles.actionBtn} relative`}>
                            <Bell size={20} />
                            <span className={styles.notificationBadge}>99+</span>
                        </button>

                        {/* User Profile with Dropdown */}
                        <div ref={profileRef} style={{ position: 'relative' }}>
                            <div
                                className={styles.userProfile}
                                onClick={() => setShowProfile(!showProfile)}
                                style={{ cursor: 'pointer', userSelect: 'none' }}
                            >
                                <div className={styles.avatar}>T</div>
                                <span className="text-sm font-medium text-gray-700">Trần Minh Tiến</span>
                                <ChevronDown size={14} style={{ color: '#9ca3af', transform: showProfile ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                            </div>

                            {/* Profile Dropdown */}
                            {showProfile && (
                                <div style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    right: 0,
                                    width: 320,
                                    background: '#fff',
                                    borderRadius: 12,
                                    border: '1px solid #e5e7eb',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                                    zIndex: 100,
                                    overflow: 'hidden',
                                    animation: 'fadeIn 0.2s ease'
                                }}>
                                    {/* Profile Header */}
                                    <div style={{ padding: 20, borderBottom: '1px solid #f3f4f6', background: 'linear-gradient(135deg, #f0f7ff 0%, #fff 100%)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{
                                                width: 48, height: 48, borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #e0bfbb, #d4a59a)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 800, color: '#fff', fontSize: 18,
                                                boxShadow: '0 2px 8px rgba(212,165,154,0.4)'
                                            }}>T</div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: 14, color: '#1f2937' }}>Trần Minh Tiến</div>
                                                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>tranminhtien@catbracelet.vn</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                                    <Shield size={10} style={{ color: '#0088ff' }} />
                                                    <span style={{ fontSize: 10, color: '#0088ff', fontWeight: 700 }}>Quản trị viên</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Store Info */}
                                    <div style={{ padding: '12px 20px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <Store size={14} style={{ color: '#6b7280' }} />
                                            <div>
                                                <div style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>Cat Bracelet Store</div>
                                                <div style={{ fontSize: 10, color: '#9ca3af' }}>Gói Digital • Hết hạn: 25/12/2026</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div style={{ padding: '8px 0' }}>
                                        {[
                                            { icon: <User size={16} />, label: 'Thông tin tài khoản', desc: 'Cập nhật hồ sơ cá nhân' },
                                            { icon: <Settings size={16} />, label: 'Cài đặt cửa hàng', desc: 'Quản lý cấu hình hệ thống' },
                                        ].map((item, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex', alignItems: 'center', gap: 12,
                                                padding: '10px 20px', cursor: 'pointer',
                                                transition: 'background 0.15s'
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#f0f7ff'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{ color: '#6b7280' }}>{item.icon}</div>
                                                <div>
                                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{item.label}</div>
                                                    <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 1 }}>{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Logout */}
                                    <div style={{ borderTop: '1px solid #f3f4f6' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: 12,
                                            padding: '12px 20px', cursor: 'pointer',
                                            transition: 'background 0.15s'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <LogOut size={16} style={{ color: '#ef4444' }} />
                                            <span style={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}>Đăng xuất</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className={styles.pageBody}>
                    {children}
                </main>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
};

export default AdminLayout;
