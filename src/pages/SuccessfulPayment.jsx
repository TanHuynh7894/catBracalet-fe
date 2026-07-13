import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle2, ShoppingBag, ArrowRight, Package,
    Loader2, XCircle, MapPin, Phone, User, Tag, Truck
} from 'lucide-react';
import { getOrderById } from '../services/orderService';
import styles from './SuccessfulPayment.module.css';

const formatVND = (amount) =>
    new Intl.NumberFormat('vi-VN').format(Number(amount || 0)) + 'đ';

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};

const STATUS_LABELS = {
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    PROCESSING: 'Đang xử lý',
    SHIPPED: 'Đang giao hàng',
    DELIVERED: 'Đã giao',
    PAID: 'Đã thanh toán',
    CANCELLED: 'Đã hủy',
};

const SuccessfulPayment = () => {
    const [searchParams] = useSearchParams();
    const urlOrderId = searchParams.get('orderId') || searchParams.get('id');
    const urlOrderCode = searchParams.get('orderCode');

    // Read cached checkout response from before PayOS redirect
    const [cached] = useState(() => {
        try {
            return JSON.parse(sessionStorage.getItem('lastCheckout') || '{}');
        } catch { return {}; }
    });

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    // Resolve data: prefer live API data, fall back to cached
    const finalOrderId = urlOrderId || cached?.payment?.orderId || cached?.order?.id;
    const finalOrderCode = urlOrderCode || cached?.payment?.orderCode;
    const pricing = cached?.pricing || cached?.order || null;

    useEffect(() => {
        const fetchOrder = async () => {
            if (!finalOrderId) {
                if (cached?.order) {
                    setOrder(cached.order);
                } else {
                    // If we have orderCode but no ID, we can't fetch but might still have cached data
                    if (!cached?.order) setFetchError('Không tìm thấy thông tin đơn hàng.');
                }
                setLoading(false);
                return;
            }

            try {
                const data = await getOrderById(finalOrderId);
                const orderData = data?.order || data;
                setOrder(orderData);
            } catch (err) {
                console.error('Error fetching order:', err);
                if (cached?.order) {
                    setOrder(cached.order);
                } else {
                    setFetchError('Không thể tải thông tin đơn hàng từ máy chủ.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [finalOrderId, cached]);

    const displayOrder = order || cached?.order;

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {/* ── Header ─────────────────────────────────────────────── */}
                <div className={styles.header}>
                    <motion.div
                        className={styles.iconWrapper}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
                    >
                        <CheckCircle2 size={72} className={styles.successIcon} />
                    </motion.div>
                    <h1 className={styles.title}>Thanh Toán Thành Công!</h1>
                    <p className={styles.subtitle}>
                        Cảm ơn bạn đã tin tưởng Cát Bracelet. Đơn hàng đã được xác nhận
                        và đang trong quá trình chuẩn bị.
                    </p>
                </div>

                {loading ? (
                    <div className={styles.loadingState}>
                        <Loader2 size={28} className={styles.spinner} />
                        <span>Đang tải thông tin đơn hàng...</span>
                    </div>
                ) : fetchError && !displayOrder ? (
                    <div className={styles.errorState}>
                        <XCircle size={20} /> <span>{fetchError}</span>
                    </div>
                ) : (
                    <>
                        {/* ── Invoice Block ───────────────────────────────── */}
                        <div className={styles.orderSummary}>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Mã đơn hàng</span>
                                    <span className={styles.value}>
                                        #{finalOrderCode || displayOrder?.id?.substring(0, 8).toUpperCase()}
                                    </span>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Thời gian đặt</span>
                                    <span className={styles.value}>{formatDate(displayOrder?.createdAt)}</span>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Trạng thái</span>
                                    <span className={styles.statusBadge}>
                                        {STATUS_LABELS[displayOrder?.status] || (displayOrder?.status === 'PAID' ? 'Đã thanh toán' : 'Đã xác nhận')}
                                    </span>
                                </div>

                                {/* Address */}
                                {displayOrder?.address && (
                                    <div className={styles.addressBox}>
                                        <span className={styles.addressTitle}>
                                            <MapPin size={12} /> Địa chỉ giao hàng
                                        </span>
                                        <div className={styles.addressDetail}>
                                            <span className={styles.userName}>
                                                {displayOrder.address.receiverName}
                                            </span>
                                            <div className={styles.addrLine}>
                                                <Phone size={12} />
                                                <span>{displayOrder.address.phone}</span>
                                            </div>
                                            <div className={styles.addrLine}>
                                                <MapPin size={12} />
                                                <span>
                                                    {displayOrder.address.detailAddress}, {displayOrder.address.ward}, {displayOrder.address.district}, {displayOrder.address.province}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Product Items ───────────────────────────────── */}
                        {(displayOrder?.items?.length > 0 || displayOrder?.orderItems?.length > 0) && (
                            <div className={styles.itemsSection}>
                                <p className={styles.itemsTitle}>Chi tiết sản phẩm</p>
                                {(displayOrder?.items || displayOrder?.orderItems || []).map(item => {
                                    const variant = item.variant || item.productVariant;
                                    const product = variant?.productVariantMappings?.[0]?.product;
                                    return (
                                        <div key={item.id} className={styles.itemRow}>
                                            <div className={styles.itemInfo}>
                                                <span className={styles.itemName}>
                                                    {product?.productName || 'Sản phẩm'}
                                                </span>
                                                <span className={styles.itemMeta}>
                                                    {variant?.color && `${variant.color}`}
                                                    {variant?.size && ` • ${variant.size}`}
                                                    {` • SL: ${item.quantity}`}
                                                </span>
                                            </div>
                                            <span className={styles.itemPrice}>
                                                {formatVND(item.totalPrice || item.unitPrice || item.price)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* ── Pricing Breakdown ────────────────────────────── */}
                        <div className={styles.pricingSection}>
                            <div className={styles.pricingRow}>
                                <span>Tạm tính</span>
                                <span>{formatVND(pricing?.subtotal || displayOrder?.subtotal)}</span>
                            </div>
                            <div className={styles.pricingRow}>
                                <span>Phí vận chuyển</span>
                                <span>{formatVND(pricing?.shippingFee || displayOrder?.shippingFee || displayOrder?.shipment?.total_shipping_fee)}</span>
                            </div>
                            {(pricing?.discountAmount > 0 || displayOrder?.discountAmount > 0) && (
                                <div className={styles.pricingRow}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#10B981', fontWeight: 600 }}>
                                        -{formatVND(pricing?.discountAmount || displayOrder?.discountAmount)}
                                    </span>
                                </div>
                            )}
                            <div className={styles.pricingRowTotal}>
                                <span>Tổng thanh toán</span>
                                <span>{formatVND(pricing?.totalAmount || displayOrder?.totalAmount)}</span>
                            </div>
                        </div>

                        {/* ── Voucher used ────────────────────────────────── */}
                        {displayOrder?.voucher && (
                            <div className={styles.infoBox} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                                <Tag size={18} style={{ color: '#16a34a', flexShrink: 0 }} />
                                <p style={{ color: '#15803d', margin: 0, fontSize: '0.875rem' }}>
                                    Đã áp dụng mã giảm giá <strong>{displayOrder.voucher.code}</strong>
                                </p>
                            </div>
                        )}
                    </>
                )}


                {/* ── Actions ──────────────────────────────────────────────── */}
                <div className={styles.actions}>
                    {finalOrderId && (
                        <Link to={`/order-detail/${finalOrderId}`} className={styles.primaryBtn} style={{ background: '#ab121c' }}>
                            <Package size={20} />
                            <span>Xem chi tiết đơn hàng</span>
                        </Link>
                    )}
                    <Link to="/collection" className={styles.primaryBtn}>
                        <ShoppingBag size={20} />
                        <span>Tiếp tục mua sắm</span>
                    </Link>
                    <Link to="/" className={styles.secondaryBtn}>
                        <span>Quay về trang chủ</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className={styles.footer}>
                    <p>Cần hỗ trợ? <Link to="/">Liên hệ chúng tôi</Link></p>
                </div>
            </motion.div>
        </div>
    );
};

export default SuccessfulPayment;
