import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Package, X, AlertCircle } from 'lucide-react';
import { getOrderById } from '../../services/orderService';
import styles from './OrderDetail.module.css';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                if (!id) return;
                const data = await getOrderById(id);
                setOrder(data);
            } catch (err) {
                console.error('Error fetching order detail:', err);
                setError('Không thể tải chi tiết đơn hàng.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'Đã xác nhận';
            case 'PENDING': return 'Đang xử lý';
            case 'SHIPPING': return 'Đang giao';
            case 'CANCELLED': return 'Đã hủy';
            default: return status;
        }
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'PENDING': return 1;
            case 'CONFIRMED': return 2;
            case 'SHIPPING': return 3;
            case 'DELIVERED': return 4;
            default: return 0;
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error || !order) return (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-outline-variant/20">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="font-headline text-2xl text-on-surface mb-2">{error || 'Không tìm thấy đơn hàng'}</h2>
            <NavLink to="/order-history" className="text-primary font-bold hover:underline">Quay về lịch sử đơn hàng</NavLink>
        </div>
    );

    const currentStep = getStatusStep(order.status);

    return (
        <section className="animate-fade-in">
            {/* Breadcrumb / Back Button */}
            <NavLink to="/order-history" className="inline-flex items-center text-primary mb-6 hover:opacity-70 transition-opacity group">
                <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" size={20} />
                <span className="font-body text-label-sm uppercase tracking-widest font-bold">Trở về lịch sử</span>
            </NavLink>

            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h1 className="font-headline text-headline-lg text-on-surface">Đơn hàng #{order.id.split('-')[0].toUpperCase()}</h1>
                    <p className="font-body text-body-md text-on-surface-variant">Ngày đặt: {formatDate(order.createdAt)}</p>
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-bold tracking-wide border border-secondary/20 shadow-sm uppercase">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></span>
                    {getStatusLabel(order.status)}
                </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Shipping Info */}
                <div className="p-8 bg-white border border-outline-variant/20 rounded-2xl shadow-sm">
                    <div className="flex items-center mb-6 space-x-2">
                        <MapPin className="text-primary" size={24} />
                        <h3 className="font-headline text-primary text-2xl">Địa chỉ nhận hàng</h3>
                    </div>
                    {order.address ? (
                        <div className="space-y-2">
                            <p className="font-body text-lg font-bold text-on-surface">{order.address.receiverName}</p>
                            <p className="font-body text-body-md text-on-surface-variant font-medium">{order.address.phone}</p>
                            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                                {order.address.detailAddress}, {order.address.ward},<br />
                                {order.address.district}, {order.address.province}
                            </p>
                        </div>
                    ) : (
                        <p className="text-outline italic">Không có thông tin địa chỉ.</p>
                    )}
                </div>

                {/* Voucher & Customer Info */}
                <div className="p-8 bg-white border border-outline-variant/20 rounded-2xl shadow-sm">
                    <div className="flex items-center mb-6 space-x-2">
                        <CreditCard className="text-primary" size={24} />
                        <h3 className="font-headline text-primary text-2xl">Ưu đãi & Khách hàng</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-1">Khách hàng</p>
                            <p className="font-body text-body-md font-bold text-on-surface">{order.user?.fullName || 'N/A'}</p>
                            <p className="font-body text-xs text-on-surface-variant">{order.user?.email || 'N/A'}</p>
                        </div>
                        {order.voucher && (
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                <p className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest mb-1">Mã giảm giá đã dùng</p>
                                <p className="font-body text-body-md font-bold text-emerald-800">{order.voucher.code}</p>
                                <p className="text-xs text-emerald-600">Giảm {order.voucher.discountValue}{order.voucher.discountType === 'PERCENT' ? '%' : 'đ'}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Items Section */}
            <div className="mb-8">
                <h3 className="font-headline text-on-surface mb-6 flex items-center text-xl">
                    <Package className="mr-3 text-primary" size={24} />
                    Danh sách sản phẩm
                </h3>
                <div className="bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
                    {order.items && order.items.length > 0 ? (
                        order.items.map((item, idx) => {
                            const product = item.variant?.productVariantMappings?.[0]?.product;
                            return (
                                <div key={idx} className="p-6 border-b border-outline-variant/10 flex flex-col md:flex-row items-center gap-6 hover:bg-surface-container-low/30 transition-colors last:border-0">
                                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-variant border border-outline-variant/10 flex items-center justify-center">
                                        {product?.thumbnail ? (
                                            <img src={product.thumbnail} alt={product.productName} className="w-full h-full object-cover" />
                                        ) : (
                                            <Package size={32} className="text-outline" />
                                        )}
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h4 className="font-body text-lg font-bold text-on-surface">{product?.productName || 'Sản phẩm tùy chỉnh'}</h4>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 mt-2">
                                            <span className="text-xs bg-surface-container px-2 py-1 rounded text-on-surface-variant font-medium">SKU: {item.variant?.sku}</span>
                                            <span className="text-xs bg-surface-container px-2 py-1 rounded text-on-surface-variant font-medium">Size: {item.variant?.size}</span>
                                            <span className="text-xs bg-surface-container px-2 py-1 rounded text-on-surface-variant font-medium">Màu: {item.variant?.color}</span>
                                        </div>
                                    </div>
                                    <div className="text-right flex md:flex-col gap-6 md:gap-1 items-center md:items-end">
                                        <div className="text-center md:text-right">
                                            <p className="text-[10px] text-outline uppercase font-bold tracking-widest">Đơn giá</p>
                                            <p className="font-body text-body-md font-medium">{formatPrice(item.unitPrice)}</p>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <p className="text-[10px] text-outline uppercase font-bold tracking-widest">Số lượng</p>
                                            <p className="font-body text-body-md font-bold">x{item.quantity}</p>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Tổng</p>
                                            <p className="font-body text-lg font-bold text-primary">{formatPrice(item.totalPrice)}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-10 text-center text-outline">Không có thông tin sản phẩm.</div>
                    )}
                </div>
            </div>

            {/* Order Summary */}
            <div className="flex justify-end pt-8">
                <div className="w-full md:w-96 space-y-4 bg-white p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
                    <div className="flex justify-between items-center text-on-surface-variant">
                        <span className="font-body text-body-md">Tạm tính</span>
                        <span className="font-body text-body-md tabular-nums font-bold">
                            {formatPrice(order.items?.reduce((acc, item) => acc + Number(item.totalPrice), 0) || 0)}
                        </span>
                    </div>
                    {order.voucher && (
                        <div className="flex justify-between items-center text-emerald-600">
                            <span className="font-body text-body-md">Giảm giá (Voucher)</span>
                            <span className="font-body text-body-md tabular-nums font-bold">
                                -{order.voucher.discountType === 'PERCENT'
                                    ? `${order.voucher.discountValue}%`
                                    : formatPrice(order.voucher.discountValue)}
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="font-body text-body-md text-on-surface-variant">Phí vận chuyển</span>
                        <span className="font-body text-secondary font-bold uppercase tracking-wider text-xs">Theo khu vực</span>
                    </div>
                    <div className="pt-6 border-t-2 border-primary/10 flex justify-between items-baseline">
                        <span className="font-headline text-on-surface text-xl">Tổng thanh toán</span>
                        <div className="text-right">
                            <p className="font-headline text-primary text-3xl font-bold">{formatPrice(order.totalAmount)}</p>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 font-body">Cập nhật lúc {new Date(order.createdAt).toLocaleTimeString()}</p>
                        </div>
                    </div>

                    {order.status === 'PENDING' && (
                        <button className="w-full mt-8 py-4 px-6 border-2 border-primary text-primary font-body text-label-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group uppercase tracking-widest">
                            <X size={18} className="group-hover:rotate-90 transition-transform" />
                            Yêu cầu hủy đơn
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OrderDetail;
