import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Check, Lock, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';
import { getCart, updateCartItem, removeCartItem, clearCart } from '../../services/cartService';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import fallbackProductImg from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/all0.jpg';

// ─── Constants ────────────────────────────────────────────────────────────────
const BENEFITS = [
    { id: 'b1', text: 'Đá tự nhiên tuyển chọn' },
    { id: 'b2', text: 'Bảo hành trọn đời' },
    { id: 'b3', text: 'Tư vấn phong thủy miễn phí' },
    { id: 'b4', text: 'Giao hàng toàn quốc' },
];


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

    const [selectedIds, setSelectedIds] = useState([]);

    // ── Fetch cart ──────────────────────────────────────────────────────────
    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getCart();
            setCartData(data);
            const items = data.items || [];
            setCartItems(items);
            // Default all selected
            setSelectedIds(items.map(i => i.cartItemId));
            refreshCart();
        } catch (err) {
            setError(typeof err === 'string' ? err : 'Không thể tải giỏ hàng. Vui lòng đăng nhập.');
        } finally {
            setLoading(false);
        }
    }, [refreshCart]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // ── Selection Logic ─────────────────────────────────────────────────────
    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === cartItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(cartItems.map(i => i.cartItemId));
        }
    };

    // ── Update quantity ─────────────────────────────────────────────────────
    const handleIncrease = async (item) => {
        const newQty = item.quantity + 1;
        setUpdatingId(item.cartItemId);
        setCartItems(prev => prev.map(i => i.cartItemId === item.cartItemId ? { ...i, quantity: newQty } : i));
        try {
            await updateCartItem(item.cartItemId, newQty);
            refreshCart();
        } catch {
            fetchCart();
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDecrease = async (item) => {
        if (item.quantity <= 1) return;
        const newQty = item.quantity - 1;
        setUpdatingId(item.cartItemId);
        setCartItems(prev => prev.map(i => i.cartItemId === item.cartItemId ? { ...i, quantity: newQty } : i));
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
        setSelectedIds(prev => prev.filter(i => i !== cartItemId));
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
                    setSelectedIds([]);
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
        if (!selectedIds.includes(item.cartItemId)) return sum;
        const price = Number(item.variantDetails?.extraPrice ?? item.unitPrice ?? 0);
        return sum + (price * (item.quantity || 1));
    }, 0);

    const total = subtotal;

    // ── Image Helper ────────────────────────────────────────────────────────
    const getProductImage = (item) => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        let thumb = item?.variantDetails?.imageUrl || item?.variantDetails?.image;
        if (!thumb && item?.product?.productImages?.length > 0) thumb = item.product.productImages[0].imageUrl;
        if (!thumb) thumb = item?.product?.thumbnail;
        if (!thumb) return fallbackProductImg;
        if (thumb.startsWith('http')) return thumb;
        return `${baseUrl}${thumb.startsWith('/') ? '' : '/'}${thumb}`;
    };

    const handleCheckout = () => {
        if (selectedIds.length === 0) {
            showToast('Vui lòng chọn ít nhất một sản phẩm để thanh toán', 'warning');
            return;
        }
        navigate('/checkout', { state: { selectedCartItemIds: selectedIds } });
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
                        <button onClick={() => navigate('/login')} className={styles.btnShopNow}>ĐĂNG NHẬP</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <button onClick={() => navigate(-1)} className={styles.backBtn}>
                        <ArrowLeft size={20} /> <span>QUAY LẠI</span>
                    </button>
                    <h1 className={styles.title}>GIỎ HÀNG CỦA BẠN</h1>
                    <div className={styles.divider}><span className={styles.dividerOrn}>❧</span></div>
                </header>

                <div className={styles.mainContent}>
                    <div className={styles.leftCol}>
                        <section className={styles.itemsSection}>
                            {cartItems.length === 0 ? (
                                <div className={styles.emptyCartContainer}>
                                    <div className={styles.emptyCartContent}>
                                        <ShoppingBag size={80} strokeWidth={0.5} className={styles.emptyIconLarge} />
                                        <h2 className={styles.emptyTitleLarge}>Giỏ hàng của bạn đang trống</h2>
                                        <button onClick={() => navigate('/collection')} className={styles.btnExploreNow}>KHÁM PHÁ NGAY</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.cartHeaderActions}>
                                        <div className={styles.selectAllBox}>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.length === cartItems.length && cartItems.length > 0}
                                                onChange={toggleSelectAll}
                                                id="selectAll"
                                            />
                                            <label htmlFor="selectAll">Chọn tất cả ({cartItems.length})</label>
                                        </div>
                                        <button onClick={handleClearCart} className={styles.btnClearAll}>
                                            <Trash2 size={16} /> Xóa tất cả
                                        </button>
                                    </div>
                                    {cartItems.map((item, index) => (
                                        <React.Fragment key={item.cartItemId}>
                                            <motion.div
                                                className={`${styles.cartItem} ${updatingId === item.cartItemId ? styles.cartItemUpdating : ''}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <div className={styles.itemCheckbox}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(item.cartItemId)}
                                                        onChange={() => toggleSelect(item.cartItemId)}
                                                    />
                                                </div>
                                                <div className={styles.itemImageWrapper}>
                                                    <img src={getProductImage(item)} alt={item.product?.productName} className={styles.itemImage} />
                                                </div>
                                                <div className={styles.itemInfo}>
                                                    <h2 className={styles.itemName}>{item.product?.productName}</h2>
                                                    <div className={styles.itemMeta}>
                                                        {item.variantDetails?.color && <span>Màu: {item.variantDetails.color}</span>}
                                                        {item.variantDetails?.size && <span>Size: {item.variantDetails.size}</span>}
                                                    </div>
                                                </div>
                                                <div className={styles.itemActions}>
                                                    <span className={styles.itemPrice}>{formatVND(item.variantDetails?.extraPrice ?? item.unitPrice)}</span>
                                                    <div className={styles.itemControls}>
                                                        <div className={styles.quantitySelector}>
                                                            <button onClick={() => handleDecrease(item)} disabled={item.quantity <= 1}><Minus size={14} /></button>
                                                            <span>{item.quantity}</span>
                                                            <button onClick={() => handleIncrease(item)}><Plus size={14} /></button>
                                                        </div>
                                                        <button onClick={() => handleRemove(item.cartItemId)} className={styles.removeBtn}><Trash2 size={18} /></button>
                                                    </div>
                                                    <span className={styles.itemSubtotal}>{formatVND((item.variantDetails?.extraPrice ?? item.unitPrice) * item.quantity)}</span>
                                                </div>
                                            </motion.div>
                                            {index < cartItems.length - 1 && <div className={styles.itemDivider} />}
                                        </React.Fragment>
                                    ))}
                                </>
                            )}
                        </section>
                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.stickySummary}>
                            <section className={styles.summaryCard}>
                                <h3 className={styles.summaryTitle}>TỔNG ĐƠN HÀNG</h3>
                                <div className={styles.summaryRow}>
                                    <span>Tạm tính ({selectedIds.length} sản phẩm)</span>
                                    <span>{formatVND(subtotal)}</span>
                                </div>
                                <div className={styles.summaryDivider} />
                                <div className={styles.totalRow}>
                                    <span className={styles.totalLabel}>TỔNG CỘNG</span>
                                    <span className={styles.totalValue}>{formatVND(total)}</span>
                                </div>
                            </section>

                            <div className={styles.actionButtons}>
                                <motion.button
                                    className={styles.btnCheckout}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={handleCheckout}
                                    disabled={selectedIds.length === 0}
                                >
                                    <Lock size={16} /> ĐẶT HÀNG ({selectedIds.length})
                                </motion.button>
                                <button onClick={() => navigate('/collection')} className={styles.btnContinue}>TIẾP TỤC MUA SẮM</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
