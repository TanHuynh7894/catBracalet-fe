import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ClipboardList,
    CircleDot,
    Truck,
    Package,
    Warehouse,
    BarChart3,
    ChevronDown,
    ChevronRight,
    LogOut,
    Settings,
    Users,
    Ticket,
    MessageSquare,
    Headphones,
    MapPin
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const [openMenus, setOpenMenus] = useState({
        orders: true,
        processing: false,
        shipping: false,
        products: false,
        inventory: false
    });
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        navigate('/');
    };

    const menuItems = [
        // {
        //     id: 'dashboard',
        //     title: 'Tổng quan',
        //     icon: <LayoutDashboard size={18} />,
        //     path: '/admin'
        // },
        {
            id: 'orders',
            title: 'Đơn hàng',
            icon: <ClipboardList size={18} />,
            path: '/admin/orders'
        },
        {
            id: 'processing',
            title: 'Xử lý đơn hàng',
            icon: <CircleDot size={18} />,
            subItems: [
                { title: 'Chờ xác nhận', path: '/admin/orders?status=PENDING' },
                { title: 'Đã xác nhận', path: '/admin/orders?status=CONFIRMED' },
                { title: 'Chọn vận chuyển', path: '/admin/orders?status=SHIP_FLOW' },
                { title: 'Hoàn thành', path: '/admin/orders?status=DELIVERED' },
                { title: 'Đơn đã hủy', path: '/admin/orders?status=CANCELLED' }
            ]
        },
        {
            id: 'products',
            title: 'Quản lý sản phẩm',
            icon: <Package size={18} />,
            subItems: [
                { title: 'Tất cả sản phẩm', path: '/admin/products' },
                { title: 'Danh mục', path: '/admin/products/categories' },
                { title: 'Chất liệu', path: '/admin/products/materials' },
            ]
        },


        {
            id: 'users',
            title: 'Tài khoản & Phân quyền',
            icon: <Users size={18} />,
            subItems: [
                { title: 'Quản lý người dùng', path: '/admin/users' },
                { title: 'Quản lý vai trò', path: '/admin/roles' }
            ]
        },
        {
            id: 'vouchers',
            title: 'Khuyến mãi',
            icon: <Ticket size={18} />,
            path: '/admin/vouchers'
        },
        {
            id: 'consultations',
            title: 'Đăng ký tư vấn',
            icon: <MessageSquare size={18} />,
            path: '/admin/consultations'
        },
        {
            id: 'support',
            title: 'Hỗ trợ khách hàng',
            icon: <Headphones size={18} />,
            path: '/admin/support'
        },
        {
            id: 'shopLocations',
            title: 'Cửa hàng',
            icon: <MapPin size={18} />,
            path: '/admin/shop-locations'
        }
    ];

    return (
        <>
            <aside className={styles.sidebar}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoCircle}>C</div>
                    <span className={styles.logoText}>Cát Admin</span>
                </div>

                <nav className={styles.nav}>
                    {menuItems.map((item) => (
                        <div key={item.id} className={styles.menuWrapper}>
                            {item.subItems ? (
                                <>
                                    <button
                                        className={`${styles.menuHeader} ${openMenus[item.id] ? styles.active : ''}`}
                                        onClick={() => toggleMenu(item.id)}
                                    >
                                        <span className={styles.icon}>{item.icon}</span>
                                        <span className={styles.title}>{item.title}</span>
                                        <span className={styles.chevron}>
                                            {openMenus[item.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                        </span>
                                    </button>
                                    {openMenus[item.id] && (
                                        <div className={styles.subMenu}>
                                            {item.subItems.map((sub, idx) => (
                                                <NavLink
                                                    key={idx}
                                                    to={sub.path}
                                                    className={({ isActive }) => `${styles.subItem} ${isActive ? styles.subActive : ''}`}
                                                >
                                                    {sub.title}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    end
                                    className={({ isActive }) => `${styles.menuHeader} ${isActive ? styles.active : ''}`}
                                >
                                    <span className={styles.icon}>{item.icon}</span>
                                    <span className={styles.title}>{item.title}</span>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </nav>

                <div className={styles.footerNav}>
                    <button className={`${styles.footerItem} ${styles.logoutBtn}`} onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Custom Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className={styles.modalOverlay} onClick={() => setShowLogoutModal(false)}>
                    <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalIcon}>
                            <LogOut size={28} />
                        </div>
                        <h3 className={styles.modalTitle}>Đăng xuất</h3>
                        <p className={styles.modalDesc}>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</p>
                        <div className={styles.modalActions}>
                            <button className={styles.modalCancel} onClick={() => setShowLogoutModal(false)}>
                                Hủy
                            </button>
                            <button className={styles.modalConfirm} onClick={confirmLogout}>
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminSidebar;
