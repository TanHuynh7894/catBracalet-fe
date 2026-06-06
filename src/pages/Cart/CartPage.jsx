import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Check, Lock, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';
import { getCart, updateCartItem, removeCartItem, clearCart } from '../../services/cartService';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { getActiveVouchers, getVoucherByCode } from '../../services/voucherService';
import fallbackProductImg from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/all0.jpg';
import { Ticket, Search, X as CloseIcon, ChevronRight, Gift } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const BENEFITS = [
    { id: 'b1', text: 'Đá tự nhiên tuyển chọn' },
    { id: 'b2', text: 'Bảo hành trọn đời' },
    { id: 'b3', text: 'Tư vấn phong thủy miễn phí' },
    { id: 'b4', text: 'Giao hàng toàn quốc' },
];

const SHIPPING_FEE = 30000;

const formatVND = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';

// ─── Component ────────────────────────────────────────────────────────────────
const CartPage = () => {
    const navigate = useNavigate();
    const { refreshCart } = useCart();
    const { showToast, showConfirm } = useToast();

    const [cartData, setCartData] = useState(null);   // full cart object from API
    const [cartItems, setCartItems] = useState([]);   // items array
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null); // cartItemId đang được update
    const [error, setError] = useState('');

    // Voucher state
    const [voucherCode, setVoucherCode] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState(null);
    const [availableVouchers, setAvailableVouchers] = useState([]);
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);

    // ── Fetch cart ──────────────────────────────────────────────────────────
    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getCart();
            setCartData(data);
            setCartItems(data.items || []);
            refreshCart(); // Sync global count
        } catch (err) {
            setError(typeof err === 'string' ? err : 'Không thể tải giỏ hàng. Vui lòng đăng nhập.');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchActiveVouchersData = async () => {
        try {
            const data = await getActiveVouchers();
            setAvailableVouchers(data);
        } catch (err) {
            console.error('Error fetching vouchers:', err);
        }
    };

    useEffect(() => {
        fetchCart();
        fetchActiveVouchersData();
    }, [fetchCart]);

    // ── Update quantity ─────────────────────────────────────────────────────
    const handleIncrease = async (item) => {
        const newQty = item.quantity + 1;
        setUpdatingId(item.cartItemId);
        // Optimistic UI
        setCartItems(prev => prev.map(i => i.cartItemId === item.cartItemId ? { ...i, quantity: newQty, subTotal: i.unitPrice * newQty } : i));
        try {
            await updateCartItem(item.cartItemId, newQty);
            refreshCart();
        } catch {
            // rollback on error
            fetchCart();
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDecrease = async (item) => {
        if (item.quantity <= 1) return;
        const newQty = item.quantity - 1;
        setUpdatingId(item.cartItemId);
        setCartItems(prev => prev.map(i => i.cartItemId === item.cartItemId ? { ...i, quantity: newQty, subTotal: i.unitPrice * newQty } : i));
        try {
            await updateCartItem(item.cartItemId, newQty);
            refreshCart();
        } catch {
            fetchCart();
        } finally {
            setUpdatingId(null);
        }
    };

    // ── Remove item ─────────────────────────────────────────────────────────
    const handleRemove = async (cartItemId) => {
        setUpdatingId(cartItemId);
        setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
        try {
            await removeCartItem(cartItemId);
            refreshCart();
            showToast('Đã xóa sản phẩm khỏi giỏ hàng');
        } catch {
            fetchCart();
        } finally {
            setUpdatingId(null);
        }
    };

    const handleClearCart = () => {
        showConfirm(
            'Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng?',
            async () => {
                try {
                    setLoading(true);
                    await clearCart();
                    setCartItems([]);
                    refreshCart();
                    showToast('Đã làm trống giỏ hàng');
                } catch (error) {
                    showToast('Không thể làm trống giỏ hàng', 'error');
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    // ── Derived totals ──────────────────────────────────────────────────────
    const subtotal = cartItems.reduce((sum, item) => {
        const price = Number(item.variantDetails?.extraPrice ?? item.unitPrice ?? 0);
        return sum + (price * (item.quantity || 1));
    }, 0);

    const discountAmount = useMemo(() => {
        if (!appliedVoucher) return 0;
        const val = parseFloat(appliedVoucher.discountValue);
        if (appliedVoucher.discountType === 'PERCENT') {
            return (subtotal * val) / 100;
        }
        return val; // FIXED
    }, [subtotal, appliedVoucher]);

    const total = Math.max(0, subtotal + SHIPPING_FEE - discountAmount);

    // ── Voucher Logic ───────────────────────────────────────────────────────
    const handleApplyVoucher = async (codeToApply = voucherCode) => {
        if (!codeToApply.trim()) return;

        setIsApplyingVoucher(true);
        try {
            const voucher = await getVoucherByCode(codeToApply.trim());

            // Validate voucher (basic client side, matching what BE might do)
            const now = new Date();
            const start = new Date(voucher.startDate);
            const end = new Date(voucher.endDate);

            if (voucher.status !== 'ACTIVE') {
                showToast('Mã giảm giá này hiện không khả dụng', 'error');
                return;
            }
            if (now < start) {
                showToast('Mã giảm giá chưa đến thời gian sử dụng', 'error');
                return;
            }
            if (now > end) {
                showToast('Mã giảm giá đã hết hạn', 'error');
                return;
            }
            if (voucher.quantity <= 0) {
                showToast('Mã giảm giá đã hết lượt sử dụng', 'error');
                return;
            }

            setAppliedVoucher(voucher);
            setVoucherCode(voucher.code);
            setShowVoucherModal(false);
            showToast(`Đã áp dụng mã ${voucher.code}`, 'success');
        } catch (err) {
            showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn', 'error');
        } finally {
            setIsApplyingVoucher(false);
        }
    };

    const handleRemoveVoucher = () => {
        setAppliedVoucher(null);
        setVoucherCode('');
        showToast('Đã bỏ áp dụng mã giảm giá');
    };

    const handleSelectVoucherFromList = (voucher) => {
        setVoucherCode(voucher.code);
        handleApplyVoucher(voucher.code);
    };

    // ── Product image helper ────────────────────────────────────────────────
    const getProductImage = (item) => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

        // Prioritize variant image, then first site image, then thumbnail
        let thumb = item?.variantDetails?.imageUrl || item?.variantDetails?.image;

        if (!thumb && item?.product?.productImages?.length > 0) {
            thumb = item.product.productImages[0].imageUrl;
        }

        if (!thumb) {
            thumb = item?.product?.thumbnail;
        }

        if (!thumb) return fallbackProductImg;
        if (thumb.startsWith('http')) return thumb;
        return `${baseUrl}${thumb.startsWith('/') ? '' : '/'}${thumb}`;
    };

    // ─── Render: Loading ────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.loadingState}>
                    <Loader2 size={40} className={styles.spinnerIcon} />
                    <p>Đang tải giỏ hàng...</p>
                </div>
            </div>
        );
    }

    // ─── Render: Error ──────────────────────────────────────────────────────
    if (error) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.emptyCart}>
                        <ShoppingBag size={64} strokeWidth={1} className={styles.emptyIcon} />
                        <p className={styles.emptyText}>{error}</p>
                        <button onClick={() => navigate('/login')} className={styles.btnShopNow}>
                            ĐĂNG NHẬP
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                {/* ── Header ───────────────────────────────────────────────── */}
                <header className={styles.header}>
                    <button onClick={() => navigate(-1)} className={styles.backBtn}>
                        <ArrowLeft size={20} strokeWidth={1.5} />
                        <span>QUAY LẠI</span>
                    </button>
                    <h1 className={styles.title}>GIỎ HÀNG CỦA BẠN</h1>
                    <div className={styles.divider}><span className={styles.dividerOrn}>❧</span></div>
                </header>

                <div className={styles.mainContent}>
                    {/* ── LEFT: ITEMS ──────────────────────────────────────── */}
                    <div className={styles.leftCol}>
                        <section className={styles.itemsSection}>
                            {cartItems.length === 0 ? (
                                <div className={styles.emptyCartContainer}>
                                    <div className={styles.emptyCartContent}>
                                        <div className={styles.emptyCartIllustration}>
                                            <ShoppingBag size={80} strokeWidth={0.5} className={styles.emptyIconLarge} />
                                            <div className={styles.iconHole} />
                                        </div>
                                        <h2 className={styles.emptyTitleLarge}>Giỏ hàng của bạn đang trống</h2>
                                        <p className={styles.emptyDescLarge}>
                                            Có vẻ như bạn chưa chọn được món đồ ưng ý. <br />
                                            Hãy khám phá những bộ sưu tập mới nhất của chúng tôi để tìm thấy phụ kiện hoàn hảo cho phong cách của bạn.
                                        </p>
                                        <button
                                            onClick={() => navigate('/collection')}
                                            className={styles.btnExploreNow}
                                        >
                                            KHÁM PHÁ NGAY
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.cartHeaderActions}>
                                        <h2 className={styles.cartCountTitle}>Sản phẩm ({cartItems.length})</h2>
                                        <button onClick={handleClearCart} className={styles.btnClearAll}>
                                            <Trash2 size={16} />
                                            Xóa tất cả
                                        </button>
                                    </div>
                                    {cartItems.map((item, index) => (
                                        <React.Fragment key={item.cartItemId}>
                                            <motion.div
                                                className={`${styles.cartItem} ${updatingId === item.cartItemId ? styles.cartItemUpdating : ''}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.08 }}
                                            >
                                                {/* Image */}
                                                <div className={styles.itemImageWrapper}>
                                                    <img
                                                        src={getProductImage(item)}
                                                        alt={item.product?.productName || 'Sản phẩm'}
                                                        className={styles.itemImage}
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className={styles.itemInfo}>
                                                    <h2 className={styles.itemName}>
                                                        {item.product?.productName || 'Sản phẩm'}
                                                    </h2>
                                                    <div className={styles.itemMeta}>
                                                        {item.variantDetails?.color && (
                                                            <div className={styles.metaRow}>
                                                                <span className={styles.metaLabel}>Màu sắc:</span>
                                                                <span className={styles.metaValue}>{item.variantDetails.color}</span>
                                                            </div>
                                                        )}
                                                        {item.variantDetails?.size && (
                                                            <div className={styles.metaRow}>
                                                                <span className={styles.metaLabel}>Size:</span>
                                                                <span className={styles.metaValue}>{item.variantDetails.size}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className={styles.itemActions}>
                                                    <span className={styles.itemPrice}>{formatVND(item.variantDetails?.extraPrice ?? item.unitPrice)}</span>
                                                    <div className={styles.itemControls}>
                                                        <div className={styles.quantitySelector}>
                                                            <button
                                                                className={styles.qtyBtn}
                                                                onClick={() => handleDecrease(item)}
                                                                disabled={item.quantity <= 1 || updatingId === item.cartItemId}
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className={styles.qtyValue}>
                                                                {updatingId === item.cartItemId
                                                                    ? <Loader2 size={14} className={styles.spinnerIcon} />
                                                                    : item.quantity
                                                                }
                                                            </span>
                                                            <button
                                                                className={styles.qtyBtn}
                                                                onClick={() => handleIncrease(item)}
                                                                disabled={updatingId === item.cartItemId}
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        <button
                                                            className={styles.removeBtn}
                                                            onClick={() => handleRemove(item.cartItemId)}
                                                            disabled={updatingId === item.cartItemId}
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    {/* Subtotal */}
                                                    <span className={styles.itemSubtotal}>
                                                        {formatVND((item.variantDetails?.extraPrice ?? item.unitPrice ?? 0) * (item.quantity || 1))}
                                                    </span>
                                                </div>
                                            </motion.div>
                                            {index < cartItems.length - 1 && <div className={styles.itemDivider} />}
                                        </React.Fragment>
                                    ))}
                                </>
                            )}
                        </section>
                    </div>

                    {/* ── RIGHT: SUMMARY ───────────────────────────────────── */}
                    <div className={styles.rightCol}>
                        <div className={styles.stickySummary}>
                            <section className={styles.summaryCard}>
                                <h3 className={styles.summaryTitle}>TỔNG ĐƠN HÀNG</h3>
                                <div className={styles.summaryRow}><span>Tạm tính ({cartItems.length} loại sản phẩm)</span><span>{formatVND(subtotal)}</span></div>
                                <div className={styles.summaryRow}><span>Phí vận chuyển</span><span>{formatVND(SHIPPING_FEE)}</span></div>
                                {appliedVoucher && (
                                    <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                                        <div className={styles.discountLabel}>
                                            <span>Giảm giá ({appliedVoucher.code})</span>
                                            <button onClick={handleRemoveVoucher} className={styles.removeVoucherTiny}>Xóa</button>
                                        </div>
                                        <span className={styles.discountValueText}>-{formatVND(discountAmount)}</span>
                                    </div>
                                )}
                                <div className={styles.summaryDivider} />
                                <div className={styles.totalRow}>
                                    <span className={styles.totalLabel}>TỔNG CỘNG</span>
                                    <span className={styles.totalValue}>{formatVND(total)}</span>
                                </div>
                            </section>

                            <section className={styles.voucherSection}>
                                <div className={styles.voucherHeader}>
                                    <p className={styles.voucherTitle}>MÃ KHUYẾN MÃI</p>
                                    <button
                                        className={styles.viewAllVouchers}
                                        onClick={() => setShowVoucherModal(true)}
                                    >
                                        Xem mã <ChevronRight size={14} />
                                    </button>
                                </div>
                                <div className={styles.voucherRow}>
                                    <input
                                        type="text"
                                        className={styles.voucherInput}
                                        placeholder="Nhập mã giảm giá"
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                                        onKeyDown={(e) => e.key === 'Enter' && handleApplyVoucher()}
                                    />
                                    <button
                                        className={styles.voucherBtn}
                                        onClick={() => handleApplyVoucher()}
                                        disabled={isApplyingVoucher || !voucherCode.trim()}
                                    >
                                        {isApplyingVoucher ? <Loader2 size={14} className={styles.spinnerIcon} /> : 'ÁP DỤNG'}
                                    </button>
                                </div>
                                {appliedVoucher && (
                                    <div className={styles.appliedBadge}>
                                        <Check size={12} /> Đã áp dụng: <strong>{appliedVoucher.code}</strong>
                                    </div>
                                )}
                            </section>

                            <section className={styles.benefitsSection}>
                                <div className={styles.benefitsGrid}>
                                    {BENEFITS.map((benefit) => (
                                        <div key={benefit.id} className={styles.benefitItem}>
                                            <Check size={14} className={styles.benefitIcon} />
                                            <span>{benefit.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className={styles.actionButtons}>
                                <motion.button
                                    className={styles.btnCheckout}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => navigate('/checkout')}
                                    disabled={cartItems.length === 0}
                                >
                                    <Lock size={16} /> THANH TOÁN NGAY
                                </motion.button>
                                <button onClick={() => navigate('/collection')} className={styles.btnContinue}>
                                    TIẾP TỤC MUA SẮM
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ── Voucher Selection Modal ────────────────────────────────────── */}
            {showVoucherModal && (
                <div className={styles.modalOverlay} onClick={() => setShowVoucherModal(false)}>
                    <motion.div
                        className={styles.voucherModal}
                        onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                    >
                        <div className={styles.modalHeader}>
                            <div className={styles.modalTitleContainer}>
                                <Ticket className={styles.modalTitleIcon} />
                                <h3 className={styles.modalTitle}>Chọn mã giảm giá</h3>
                            </div>
                            <button onClick={() => setShowVoucherModal(false)} className={styles.closeBtn}>
                                <CloseIcon size={20} />
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.modalSearch}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Tìm mã giảm giá..."
                                    className={styles.modalSearchInput}
                                    value={voucherCode}
                                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                                />
                                {voucherCode && (
                                    <button
                                        className={styles.applyInputCode}
                                        onClick={() => handleApplyVoucher()}
                                    >
                                        Áp dụng
                                    </button>
                                )}
                            </div>

                            <div className={styles.voucherList}>
                                {availableVouchers.length === 0 ? (
                                    <div className={styles.noVouchers}>
                                        <Gift size={48} strokeWidth={1} />
                                        <p>Hiện không có mã giảm giá nào khả dụng</p>
                                    </div>
                                ) : (
                                    availableVouchers.map(v => (
                                        <div
                                            key={v.id}
                                            className={`${styles.voucherItem} ${appliedVoucher?.id === v.id ? styles.voucherItemApplied : ''}`}
                                            onClick={() => handleSelectVoucherFromList(v)}
                                        >
                                            <div className={styles.voucherCardLeft}>
                                                <Ticket size={24} />
                                                <div className={styles.voucherTypeBadge}>
                                                    {v.discountType === 'PERCENT' ? `${v.discountValue}%` : 'GIẢM TIỀN'}
                                                </div>
                                            </div>
                                            <div className={styles.voucherCardRight}>
                                                <div className={styles.voucherCodeLabel}>{v.code}</div>
                                                <div className={styles.voucherDesc}>
                                                    Giảm {v.discountType === 'PERCENT' ? `${v.discountValue}%` : formatVND(v.discountValue)}
                                                    cho tổng đơn hàng
                                                </div>
                                                <div className={styles.voucherExpiry}>
                                                    HSD: {new Date(v.endDate).toLocaleDateString('vi-VN')}
                                                </div>
                                                {appliedVoucher?.id === v.id && (
                                                    <div className={styles.appliedIndicator}>
                                                        <Check size={14} /> Đang áp dụng
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
