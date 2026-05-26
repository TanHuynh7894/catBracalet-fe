import React from 'react';
import { ShoppingBag, Users, DollarSign, Package, TrendingUp, TrendingDown, Clock, ChevronRight, MoreHorizontal } from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const stats = [
        { label: 'Doanh thu', value: '12,450,000đ', trend: '+12.5%', icon: <DollarSign size={20} />, up: true },
        { label: 'Đơn hàng', value: '48', trend: '+8.2%', icon: <ShoppingBag size={20} />, up: true },
        { label: 'Khách hàng mới', value: '124', trend: '-2.4%', icon: <Users size={20} />, up: false },
        { label: 'Sản phẩm đã bán', value: '156', trend: '+14.1%', icon: <Package size={20} />, up: true },
    ];

    const recentOrders = [
        { id: '#2989', customer: 'Quốc Minh', total: '450,000đ', status: 'Success', date: '5 phút trước' },
        { id: '#2988', customer: 'Ngọc Trang', total: '1,200,000đ', status: 'Pending', date: '12 phút trước' },
        { id: '#2987', customer: 'Hoàng Lam', total: '350,000đ', status: 'Success', date: '45 phút trước' },
        { id: '#2986', customer: 'Diễm Quỳnh', total: '780,000đ', status: 'Pending', date: '1 giờ trước' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Tổng quan kết quả kinh doanh</h1>
                <div className={styles.filterGroup}>
                    <select className={styles.select}>
                        <option>7 ngày qua</option>
                        <option>Tháng này</option>
                        <option>Hôm nay</option>
                    </select>
                    <button className={styles.primaryBtn}>Xuất báo cáo</button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                {stats.map((stat, idx) => (
                    <div key={idx} className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={`${styles.trend} ${stat.up ? styles.plus : styles.minus}`}>
                                {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className={styles.statLabel}>{stat.label}</div>
                        <div className={styles.statValue}>{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className={styles.mainGrid}>
                {/* Recent Orders Section */}
                <div className={styles.contentBox}>
                    <div className={styles.boxHeader}>
                        <h2 className={styles.boxTitle}>Đơn hàng gần đây</h2>
                        <button className={styles.textBtn}>Xem tất cả</button>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Khách hàng</th>
                                    <th>Giá trị</th>
                                    <th>Trạng thái</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, idx) => (
                                    <tr key={idx}>
                                        <td className="font-medium text-[#0088ff]">{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td className="font-bold">{order.total}</td>
                                        <td>
                                            <span className={`${styles.badge} ${order.status === 'Success' ? styles.badgeSuccess : styles.badgePending}`}>
                                                {order.status === 'Success' ? 'Hoàn tất' : 'Chờ xử lý'}
                                            </span>
                                        </td>
                                        <td className="text-gray-400 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} /> {order.date}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Status Summary Section */}
                <div className={styles.statusBox}>
                    <div className={styles.boxHeader}>
                        <h2 className={styles.boxTitle}>Tình trạng vận hành</h2>
                        <MoreHorizontal size={18} className="text-gray-400" />
                    </div>
                    <div className={styles.statusGrid}>
                        <div className={styles.statusItem}>
                            <div className="flex-1">
                                <div className={styles.statusLabel}>Đơn hàng chờ xác nhận</div>
                                <div className={styles.statusValue}>11</div>
                            </div>
                            <ChevronRight size={18} className="text-gray-300" />
                        </div>
                        <div className={styles.statusItem}>
                            <div className="flex-1">
                                <div className={styles.statusLabel}>Đơn hàng chờ xử lý</div>
                                <div className={styles.statusValue}>22</div>
                            </div>
                            <ChevronRight size={18} className="text-gray-300" />
                        </div>
                        <div className={styles.statusItem}>
                            <div className="flex-1">
                                <div className={styles.statusLabel}>Yêu cầu hoàn trả</div>
                                <div className={styles.statusValue}>0</div>
                            </div>
                            <ChevronRight size={18} className="text-gray-300" />
                        </div>
                        <div className={styles.inventoryAlert}>
                            <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                                <div className="text-red-600 font-bold text-xs mb-1 uppercase tracking-wider">Cảnh báo tồn kho</div>
                                <div className="text-red-500 text-sm">Có 3 sản phẩm sắp hết hàng</div>
                                <button className="mt-3 text-red-600 font-black text-xs hover:underline flex items-center gap-1">
                                    Xử lý ngay <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
