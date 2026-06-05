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

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRoles = user.roles || [];
    const isAdmin = userRoles.some(r => r.name === 'Admin' || r.name === 'ADMIN');

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

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
                                <div className={styles.avatar}>
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectCover: 'cover' }} />
                                    ) : (
                                        (user.fullName || 'T').charAt(0)
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{user.fullName || 'Người dùng'}</span>
                                <ChevronDown size={14} style={{ color: '#9ca3af', transform: showProfile ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                            </div>

                            {/* Profile Dropdown */}
                            {showProfile && (
                                <div style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    right: 0,
                                    width: 160,
                                    background: '#fff',
                                    borderRadius: 12,
                                    border: '1px solid #e5e7eb',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                                    zIndex: 100,
                                    overflow: 'hidden',
                                    animation: 'fadeIn 0.2s ease'
                                }}>

                                    {/* Logout */}
                                    <div style={{ borderTop: '1px solid #f3f4f6' }}>
                                        <div
                                            onClick={handleLogout}
                                            style={{
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
