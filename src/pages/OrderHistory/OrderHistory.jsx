import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, CreditCard, CheckCircle2, Clock, AlertCircle, ShoppingBag, Truck, Package, CreditCard as PaymentIcon, Loader2 } from 'lucide-react';
import { getOrdersByUserId, retryPayment } from '../../services/orderService';
import { useToast } from '../../context/ToastContext';
import styles from './OrderHistory.module.css';

const OrderHistory = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const [retryingId, setRetryingId] = useState(null);

    const handleRetry = async (orderId) => {
        try {
            setRetryingId(orderId);
            const data = await retryPayment(orderId);
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                showToast('Không tìm thấy liên kết thanh toán', 'error');
            }
        } catch (err) {
            console.error('Retry error:', err);
            showToast(err, 'error');
        } finally {
            setRetryingId(null);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userDataStr = localStorage.getItem('user');
                if (!userDataStr) {
                    navigate('/login');
                    return;
                }
                const userData = JSON.parse(userDataStr);
                const data = await getOrdersByUserId(userData.id);
                // Handle nested array structure [ [orders] ] or [orders]
                let finalOrders = [];
                if (Array.isArray(data)) {
                    if (Array.isArray(data[0])) {
                        finalOrders = data[0];
                    } else {
                        finalOrders = data;
                    }
                }
                setOrders(finalOrders);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Không thể tải lịch sử đơn hàng. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'ALL') return true;
        return order.status === filter;
    });

    const getStatusInfo = (status) => {
        switch (status) {
            case 'PENDING':
                return { label: 'Chờ xử lý', color: 'slate', icon: Clock };
            case 'CONFIRMED':
                return { label: 'Đã xác nhận', color: 'emerald', icon: CheckCircle2 };
            case 'SHIPPING':
                return { label: 'Đang giao hàng', color: 'amber', icon: Truck };
            case 'DELIVERED':
                return { label: 'Đã giao hàng', color: 'green', icon: CheckCircle2 };
            case 'CANCELLED':
                return { label: 'Đã hủy', color: 'red', icon: AlertCircle };
            default:
                return { label: status, color: 'slate', icon: Clock };
        }
    };

    const getPaymentStatusInfo = (status) => {
        switch (status) {
            case 'PAID':
                return { label: 'Đã thanh toán', color: 'emerald' };
            case 'PENDING':
                return { label: 'Chờ thanh toán', color: 'amber' };
            case 'UNPAID':
                return { label: 'Chưa thanh toán', color: 'slate' };
            case 'CANCELLED':
                return { label: 'Đã hủy thanh toán', color: 'red' };
            default:
                return { label: 'Chưa thanh toán', color: 'slate' };
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-outline font-body text-sm">Đang tải lịch sử đơn hàng...</p>
        </div>
    );

    return (
        <section className="space-y-10 animate-fade-in">
            <div className="flex flex-col gap-2 border-b border-outline-variant pb-6">
                <h1 className="font-headline text-headline-lg text-primary">Lịch sử đơn hàng</h1>
                <p className="text-on-surface-variant font-body text-body-md">Theo dõi hành trình của những món trang sức ý nghĩa bạn đã chọn.</p>
            </div>

            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setFilter('ALL')}
                    className={`px-6 py-2 rounded-full font-body text-label-sm shadow-sm transition-all font-semibold tracking-widest ${filter === 'ALL' ? 'bg-secondary text-white' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                >
                    TẤT CẢ
                </button>
                <button
                    onClick={() => setFilter('PENDING')}
                    className={`px-6 py-2 rounded-full font-body text-label-sm shadow-sm transition-all font-semibold tracking-widest ${filter === 'PENDING' ? 'bg-secondary text-white' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                >
                    ĐANG XỬ LÝ
                </button>
                <button
                    onClick={() => setFilter('CONFIRMED')}
                    className={`px-6 py-2 rounded-full font-body text-label-sm shadow-sm transition-all font-semibold tracking-widest ${filter === 'CONFIRMED' ? 'bg-secondary text-white' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                >
                    ĐÃ XÁC NHẬN
                </button>
                <button
                    onClick={() => setFilter('CANCELLED')}
                    className={`px-6 py-2 rounded-full font-body text-label-sm shadow-sm transition-all font-semibold tracking-widest ${filter === 'CANCELLED' ? 'bg-secondary text-white' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                >
                    ĐÃ HỦY
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                    <AlertCircle size={20} className="text-red-500" />
                    <p className="text-sm font-bold">{error}</p>
                </div>
            )}

            <div className="space-y-6">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                        const statusInfo = getStatusInfo(order.status);
                        const payStatusInfo = getPaymentStatusInfo(order.paymentStatus);
                        const StatusIcon = statusInfo.icon;

                        return (
                            <div key={order.id} className={`bg-white rounded-xl shadow-sm border-l-4 border-${statusInfo.color}-500 overflow-hidden transition-all hover:shadow-md`}>
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                        <div className="space-y-1">
                                            <span className="font-body text-[10px] text-primary uppercase tracking-[0.2em] font-bold">Mã đơn hàng</span>
                                            <h3 className="font-headline text-2xl text-on-surface uppercase overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]">
                                                #{order.paymentOrderCode || order.id.split('-')[0]}
                                            </h3>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-2">
                                            <div className="flex flex-wrap gap-2 justify-end">
                                                <span className={`px-4 py-1 rounded-full bg-${statusInfo.color}-50 text-${statusInfo.color}-700 font-body text-[11px] uppercase tracking-widest flex items-center gap-2 border border-${statusInfo.color}-100 font-bold`}>
                                                    <StatusIcon size={14} />
                                                    {statusInfo.label}
                                                </span>
                                                <span className={`px-4 py-1 rounded-full bg-${payStatusInfo.color}-50 text-${payStatusInfo.color}-700 font-body text-[11px] uppercase tracking-widest border border-${payStatusInfo.color}-100 font-bold`}>
                                                    {payStatusInfo.label}
                                                </span>
                                            </div>
                                            <p className="text-xs text-on-surface-variant font-body italic">Cập nhật: {formatDate(order.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-outline-variant/30">
                                        <div className="space-y-1">
                                            <p className="font-body text-[10px] text-on-surface-variant uppercase font-bold">Ngày đặt</p>
                                            <div className="flex items-center gap-2 text-on-surface">
                                                <Calendar size={18} />
                                                <span className="font-body text-body-md">{formatDate(order.createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-body text-[10px] text-on-surface-variant uppercase font-bold">Tổng thanh toán</p>
                                            <div className="flex items-center gap-2 text-on-surface">
                                                <CreditCard size={18} />
                                                <span className="font-body text-body-md font-bold text-lg">{formatPrice(order.totalAmount)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center md:justify-end gap-3 flex-wrap">
                                            {order.paymentStatus !== 'PAID' && order.status !== 'CANCELLED' && (
                                                <button
                                                    onClick={() => handleRetry(order.id)}
                                                    disabled={retryingId === order.id}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#D8B27D] text-white rounded-lg hover:bg-[#c4a16d] transition-all group font-body text-xs uppercase tracking-widest font-bold disabled:opacity-50 shadow-sm"
                                                >
                                                    {retryingId === order.id ? (
                                                        <Loader2 size={18} className="animate-spin" />
                                                    ) : (
                                                        <CreditCard size={18} />
                                                    )}
                                                    <span>Thanh toán ngay</span>
                                                </button>
                                            )}
                                            <NavLink
                                                to={`/order-detail/${order.id}`}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-[#c51924] transition-all group font-body text-xs uppercase tracking-widest font-bold shadow-sm"
                                            >
                                                <span>Chi tiết đơn</span>
                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="pt-4 flex items-center gap-2 text-outline text-[11px]">
                                        <ShoppingBag size={14} />
                                        <span>{order.items?.length || 0} sản phẩm trong đơn hàng</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-outline-variant/30 flex flex-col items-center gap-6">
                        <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center text-outline">
                            <ShoppingBag size={40} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-headline text-xl text-on-surface">Bạn chưa có đơn hàng nào</h3>
                            <p className="text-outline font-body text-sm">Hãy khám phá bộ sưu tập trang sức mới nhất của chúng tôi!</p>
                        </div>
                        <NavLink to="/collection" className="mt-4 px-10 py-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#c51924] transition-all">
                            Tiếp tục mua sắm
                        </NavLink>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OrderHistory;
