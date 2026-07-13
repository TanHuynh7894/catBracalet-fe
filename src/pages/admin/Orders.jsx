import React, { useState, useEffect } from 'react';
import {
    Search, Calendar, Download, Eye, CircleCheck,
    ShoppingBag, Clock, CheckCheck,
    TrendingUp, Loader2
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Orders.module.css';
import { orderService } from '../../services/orderService';
import { useToast } from '../../context/ToastContext';

const Orders = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState(searchParams.get('status') || 'ALL');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter dates
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            let data;
            if (startDate && endDate) {
                data = await orderService.getOrdersByTime(startDate, endDate);
            } else if (activeTab === 'ALL') {
                data = await orderService.getAllOrders();
            } else if (activeTab === 'SHIP_FLOW') {
                const [confirmed, shipping] = await Promise.all([
                    orderService.getOrdersByStatus('CONFIRMED'),
                    orderService.getOrdersByStatus('SHIPPING')
                ]);
                data = [...confirmed, ...shipping];
            } else {
                data = await orderService.getOrdersByStatus(activeTab);
            }
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            showToast('Lỗi khi tải dữ liệu đơn hàng', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [activeTab, startDate, endDate]);

    useEffect(() => {
        const status = searchParams.get('status');
        setActiveTab(status || 'ALL');
    }, [searchParams]);

    const handleConfirm = async (orderId) => {
        try {
            await orderService.updateOrderStatus(orderId, 'CONFIRMED');
            showToast('Đã xác nhận đơn hàng!', 'success');
            fetchOrders();
        } catch (error) {
            showToast('Không thể xác nhận đơn hàng', 'error');
        }
    };

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stats calculation
    const stats = [
        { label: 'Tổng đơn hàng', value: orders.length, icon: ShoppingBag, color: '#ab121c', bg: '#fee2e2' },
        { label: 'Đang xử lý', value: orders.filter(o => o.status === 'PENDING').length, icon: Clock, color: '#a16207', bg: '#fef9c3' },
        { label: 'Đã xác nhận', value: orders.filter(o => o.status === 'CONFIRMED').length, icon: CheckCheck, color: '#1e40af', bg: '#dbeafe' },
        { label: 'Doanh thu', value: new Intl.NumberFormat('vi-VN').format(orders.reduce((acc, o) => acc + (o.status !== 'CANCELLED' ? Number(o.totalAmount) : 0), 0)) + 'đ', icon: TrendingUp, color: '#166534', bg: '#dcfce7' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Quản lý đơn hàng</h1>
                <div className={styles.filterGroup}>
                </div>
            </div>

            {/* 1. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stats.map((s, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 transition-all hover:shadow-lg hover:-translate-y-1">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: s.bg, color: s.color }}
                        >
                            <s.icon size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{s.label}</p>
                            <p className="text-xl font-bold text-gray-800">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.mainCard}>
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">
                        Danh sách đơn hàng
                        <span className="ml-2 text-sm font-medium text-gray-500">
                            ({activeTab === 'ALL' ? 'Tất cả' :
                                activeTab === 'PENDING' ? 'Chờ xác nhận' :
                                    activeTab === 'CONFIRMED' ? 'Đã xác nhận' :
                                        activeTab === 'SHIP_FLOW' ? 'Chọn vận chuyển' :
                                            activeTab === 'DELIVERED' ? 'Hoàn thành' :
                                                activeTab === 'CANCELLED' ? 'Đã hủy' : activeTab})
                        </span>
                    </h2>
                </div>
                {/* Filters Row */}

                <div className="p-4 bg-white border-b border-gray-100 flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[300px] relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#ab121c] focus:ring-4 focus:ring-[#ab121c]/5 outline-none transition-all"
                            placeholder="Tìm kiếm mã đơn, tên khách hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1 rounded-xl">
                        <Calendar size={16} className="text-gray-400" />
                        <input type="date" className="bg-transparent border-none outline-none text-sm text-gray-600 h-9" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        <span className="text-gray-300 mx-1">|</span>
                        <input type="date" className="bg-transparent border-none outline-none text-sm text-gray-600 h-9" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>
                </div>

                {/* 3. Orders Table */}
                <div className={styles.tableWrapper}>
                    {isLoading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 size={32} className="animate-spin text-[#ab121c]" />
                            <p className="text-gray-400 font-medium italic">Đang đồng bộ dữ liệu...</p>
                        </div>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Ngày đặt</th>
                                    <th>Khách hàng</th>
                                    <th>Giá trị</th>
                                    <th>Thanh toán</th>
                                    <th>Trạng thái</th>
                                    <th className="text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className={styles.orderId} onClick={() => navigate(`/admin/orders/${order.id}`)}>
                                            #{order.id.slice(0, 8).toUpperCase()}
                                        </td>
                                        <td className="text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td>
                                            <div className={styles.customerInfo}>
                                                <span className={styles.customerName}>{order.user?.fullName}</span>
                                                <span className={styles.customerPhone}>{order.user?.phone}</span>
                                            </div>
                                        </td>
                                        <td className="font-bold text-gray-800">
                                            {new Intl.NumberFormat('vi-VN').format(order.totalAmount)}đ
                                        </td>
                                        <td>
                                            <span className={`${styles.badge} ${order.paymentStatus === 'PAID' ? styles.paymentPaid : styles.paymentUnpaid}`}>
                                                {order.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chờ trả tiền'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${styles.badge} ${order.status === 'PENDING' ? styles.statusPending :
                                                order.status === 'CONFIRMED' ? styles.statusConfirmed :
                                                    order.status === 'SHIPPING' ? styles.statusShipping :
                                                        order.status === 'DELIVERED' ? styles.statusCompleted :
                                                            styles.statusCancelled
                                                }`}>
                                                {order.status === 'PENDING' ? 'Chờ xác nhận' :
                                                    order.status === 'CONFIRMED' ? 'Đã xác nhận' :
                                                        order.status === 'SHIPPING' ? 'Đang giao' :
                                                            order.status === 'DELIVERED' ? 'Hoàn tất' : 'Đã hủy'}
                                            </span>
                                        </td>
                                        <td className="text-right px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                {order.status === 'PENDING' && (
                                                    <button
                                                        className="h-8 px-4 bg-[#ab121c] text-white rounded-lg text-xs font-bold hover:bg-[#850e15] transition-all flex items-center shadow-sm"
                                                        onClick={() => handleConfirm(order.id)}
                                                    >
                                                        <CircleCheck size={14} className="mr-1.5" /> Xác nhận
                                                    </button>
                                                )}
                                                <button
                                                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#ab121c] hover:border-[#ab121c] transition-all bg-white"
                                                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                                                    title="Chi tiết đơn hàng"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="p-20 text-center text-gray-400 italic">
                                            Không có đơn hàng nào khớp với bộ lọc.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
