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
    Users
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

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleLogout = () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            navigate('/');
        }
    };

    const menuItems = [
        {
            id: 'dashboard',
            title: 'Tổng quan',
            icon: <LayoutDashboard size={18} />,
            path: '/admin'
        },
        {
            id: 'orders',
            title: 'Đơn hàng',
            icon: <ClipboardList size={18} />,
            subItems: [
                { title: 'Danh sách đơn hàng', path: '/admin/orders' },
                { title: 'Trả hàng', path: '/admin/orders/returns' },
                { title: 'Đơn hàng chưa hoàn tất', path: '/admin/orders/incomplete' }
            ]
        },
        {
            id: 'processing',
            title: 'Xử lý đơn hàng',
            icon: <CircleDot size={18} />,
            subItems: [
                { title: 'Chờ xác nhận', path: '/admin/processing/pending' },
                { title: 'Chờ xử lý', path: '/admin/processing/handling' },
                { title: 'In & Đóng gói', path: '/admin/processing/packing' },
                { title: 'Bàn giao kiện hàng', path: '/admin/processing/handover' },
                { title: 'Tất cả kiện hàng', path: '/admin/processing/all' }
            ]
        },
        {
            id: 'shipping',
            title: 'Vận chuyển',
            icon: <Truck size={18} />,
            subItems: [
                { title: 'Tổng quan vận chuyển', path: '/admin/shipping/overview' },
                { title: 'Vận đơn', path: '/admin/shipping/waybills' }
            ]
        },
        {
            id: 'products',
            title: 'Sản phẩm',
            icon: <Package size={18} />,
            subItems: [
                { title: 'Danh sách sản phẩm', path: '/admin/products' },
                { title: 'Danh mục sản phẩm', path: '/admin/products/categories' },
                { title: 'Bảng giá', path: '/admin/products/prices' }
            ]
        },
        {
            id: 'inventory',
            title: 'Quản lý kho',
            icon: <Warehouse size={18} />,
            subItems: [
                { title: 'Tồn kho', path: '/admin/inventory/stock' }
            ]
        },
        {
            id: 'reports',
            title: 'Báo cáo',
            icon: <BarChart3 size={18} />,
            path: '/admin/reports'
        },
        {
            id: 'users',
            title: 'Quản lý người dùng',
            icon: <Users size={18} />,
            path: '/admin/users'
        }
    ];

    return (
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
    );
};

export default AdminSidebar;
