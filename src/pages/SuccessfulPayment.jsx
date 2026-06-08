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
    const urlOrderId = searchParams.get('orderId');
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
    const orderId = urlOrderId || cached?.payment?.orderId || cached?.order?.id;
    const orderCode = urlOrderCode || cached?.payment?.orderCode;
    const pricing = cached?.pricing || null;

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) {
                setOrder(cached?.order || null);
                setLoading(false);
                return;
            }
            try {
                const data = await getOrderById(orderId);
                setOrder(data?.order || data);
            } catch (err) {
                // Fallback to cached order data
                setOrder(cached?.order || null);
                if (!cached?.order) setFetchError('Không thể tải thông tin đơn hàng.');
            } finally {
                setLoading(false);
                // Clean up after reading
                sessionStorage.removeItem('lastCheckout');
            }
        };
        fetchOrder();
    }, [orderId]);

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
                                        #{orderCode || displayOrder?.id?.substring(0, 8).toUpperCase()}
                                    </span>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Thời gian đặt</span>
                                    <span className={styles.value}>{formatDate(displayOrder?.createdAt)}</span>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Trạng thái</span>
                                    <span className={styles.statusBadge}>
                                        {STATUS_LABELS[displayOrder?.status] || 'Đã xác nhận'}
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
                                            <p style={{ margin: '0 0 4px', fontSize: '0.85rem', color: '#6b7280' }}>
                                                <Phone size={12} style={{ display: 'inline', marginRight: 4 }} />
                                                {displayOrder.address.phone}
                                            </p>
                                            <p style={{ margin: 0 }}>
                                                {displayOrder.address.detailAddress}, {displayOrder.address.ward}, {displayOrder.address.district}, {displayOrder.address.province}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Product Items ───────────────────────────────── */}
                        {displayOrder?.items?.length > 0 && (
                            <div className={styles.itemsSection}>
                                <p className={styles.itemsTitle}>Chi tiết sản phẩm</p>
                                {displayOrder.items.map(item => {
                                    const product = item.variant?.productVariantMappings?.[0]?.product;
                                    return (
                                        <div key={item.id} className={styles.itemRow}>
                                            <div className={styles.itemInfo}>
                                                <span className={styles.itemName}>
                                                    {product?.productName || 'Sản phẩm'}
                                                </span>
                                                <span className={styles.itemMeta}>
                                                    {item.variant?.color && `${item.variant.color}`}
                                                    {item.variant?.size && ` • ${item.variant.size}`}
                                                    {` • Số lượng: ${item.quantity}`}
                                                </span>
                                            </div>
                                            <span className={styles.itemPrice}>
                                                {formatVND(item.totalPrice || item.unitPrice)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* ── Pricing Breakdown ────────────────────────────── */}
                        <div className={styles.pricingSection}>
                            {pricing ? (
                                <>
                                    <div className={styles.pricingRow}>
                                        <span>Tạm tính</span>
                                        <span>{formatVND(pricing.subtotal)}</span>
                                    </div>
                                    <div className={styles.pricingRow}>
                                        <span>Phí vận chuyển</span>
                                        <span>{formatVND(pricing.shippingFee)}</span>
                                    </div>
                                    {pricing.discountAmount > 0 && (
                                        <div className={styles.pricingRow}>
                                            <span>Giảm giá</span>
                                            <span style={{ color: '#10B981', fontWeight: 600 }}>-{formatVND(pricing.discountAmount)}</span>
                                        </div>
                                    )}
                                    <div className={styles.pricingRowTotal}>
                                        <span>Tổng thanh toán</span>
                                        <span>{formatVND(pricing.totalAmount)}</span>
                                    </div>
                                </>
                            ) : (
                                displayOrder?.totalAmount && (
                                    <div className={styles.pricingRowTotal}>
                                        <span>Tổng thanh toán</span>
                                        <span>{formatVND(displayOrder.totalAmount)}</span>
                                    </div>
                                )
                            )}
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
                    {orderId && (
                        <Link to={`/order-detail/${orderId}`} className={styles.primaryBtn} style={{ background: '#7A1E1E' }}>
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
