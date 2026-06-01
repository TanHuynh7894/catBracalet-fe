import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Check, Lock, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';

// ─── Mock product data ────────────────────────────────────────────────────────
const INITIAL_CART_ITEMS = [
    {
        id: 1,
        name: 'CÁT AN NHIÊN',
        stone: 'Thạch anh hồng',
        charm: 'đồng xu Cát',
        beadSize: '8mm',
        wristSize: '15cm',
        price: 680000,
        image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&q=80',
        quantity: 1,
    },
    {
        id: 2,
        name: 'CÁT BẢO HỘ',
        stone: 'Obsidian đen',
        charm: 'mặt thần',
        beadSize: '10mm',
        wristSize: '16cm',
        price: 590000,
        image: 'https://images.unsplash.com/photo-1615209853186-e4bd66602508?w=400&h=400&fit=crop&q=80',
        quantity: 1,
    },
    {
        id: 3,
        name: 'CÁT THỊNH VƯỢNG',
        stone: 'Citrine vàng',
        charm: 'tỳ hưu',
        beadSize: '8mm',
        wristSize: '15cm',
        price: 720000,
        image: 'https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=400&h=400&fit=crop&q=80',
        quantity: 2,
    },
];

const GIFT_ITEMS = [
    { id: 'g1', name: 'Hộp nhung cao cấp', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&q=80' },
    { id: 'g2', name: 'Thiệp chúc mừng', image: 'https://images.unsplash.com/photo-1606293459339-2a10f3f0fe1e?w=400&h=400&fit=crop&q=80' },
    { id: 'g3', name: 'Túi giấy thương hiệu', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop&q=80' },
];

const BENEFITS = [
    { id: 'b1', text: 'Đá tự nhiên tuyển chọn' },
    { id: 'b2', text: 'Bảo hành trọn đời' },
    { id: 'b3', text: 'Tư vấn phong thủy miễn phí' },
    { id: 'b4', text: 'Giao hàng toàn quốc' },
];

const SHIPPING_FEE = 30000;
const GIFT_FEE = 49000;
const DISCOUNT_AMOUNT = 79000;

const formatVND = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';

const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
    const [isGiftBox, setIsGiftBox] = useState(false);

    const handleIncrease = (id) => setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    const handleDecrease = (id) => setCartItems(prev => prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    const handleRemove = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const giftFee = isGiftBox ? GIFT_FEE : 0;
    const total = subtotal + SHIPPING_FEE + giftFee - DISCOUNT_AMOUNT;

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                {/* ── Header Section ────────────────────────────────────────── */}
                <header className={styles.header}>
                    <button onClick={() => navigate(-1)} className={styles.backBtn}>
                        <ArrowLeft size={20} strokeWidth={1.5} />
                        <span>QUAY LẠI</span>
                    </button>
                    <h1 className={styles.title}>GIỎ HÀNG CỦA BẠN</h1>
                    <div className={styles.divider}><span className={styles.dividerOrn}>❧</span></div>
                </header>

                <div className={styles.mainContent}>
                    {/* ── LEFT COLUMN: ITEMS ────────────────────────────────────── */}
                    <div className={styles.leftCol}>
                        <section className={styles.itemsSection}>
                            {cartItems.length === 0 ? (
                                <div className={styles.emptyCart}>
                                    <ShoppingBag size={64} strokeWidth={1} className={styles.emptyIcon} />
                                    <p className={styles.emptyText}>Giỏ hàng của bạn đang trống</p>
                                    <button onClick={() => navigate('/collection')} className={styles.btnShopNow}>
                                        TIẾP TỤC MUA SẮM
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <motion.div
                                            className={styles.cartItem}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className={styles.itemImageWrapper}>
                                                <img src={item.image} alt={item.name} className={styles.itemImage} />
                                            </div>
                                            <div className={styles.itemInfo}>
                                                <h2 className={styles.itemName}>{item.name}</h2>
                                                <div className={styles.itemMeta}>
                                                    <div className={styles.metaRow}><span className={styles.metaLabel}>Loại đá:</span> <span className={styles.metaValue}>{item.stone}</span></div>
                                                    <div className={styles.metaRow}><span className={styles.metaLabel}>Charm:</span> <span className={styles.metaValue}>{item.charm}</span></div>
                                                    <div className={styles.metaRow}><span className={styles.metaLabel}>Hạt:</span> <span className={styles.metaValue}>{item.beadSize}</span></div>
                                                    <div className={styles.metaRow}><span className={styles.metaLabel}>Size tay:</span> <span className={styles.metaValue}>{item.wristSize}</span></div>
                                                </div>
                                            </div>
                                            <div className={styles.itemActions}>
                                                <span className={styles.itemPrice}>{formatVND(item.price)}</span>
                                                <div className={styles.itemControls}>
                                                    <div className={styles.quantitySelector}>
                                                        <button className={styles.qtyBtn} onClick={() => handleDecrease(item.id)} disabled={item.quantity <= 1}><Minus size={14} /></button>
                                                        <span className={styles.qtyValue}>{item.quantity}</span>
                                                        <button className={styles.qtyBtn} onClick={() => handleIncrease(item.id)}><Plus size={14} /></button>
                                                    </div>
                                                    <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}><Trash2 size={18} /></button>
                                                </div>
                                            </div>
                                        </motion.div>
                                        {index < cartItems.length - 1 && <div className={styles.itemDivider} />}
                                    </React.Fragment>
                                ))
                            )}
                        </section>

                        {/* Gift Box Selection moved to side or integrated */}
                        <section className={styles.giftSection}>
                            <h3 className={styles.sectionTitle}>QUÀ TẶNG & ĐÓNG GÓI</h3>
                            <label className={styles.giftCheckboxRow}>
                                <input type="checkbox" className={styles.giftCheckbox} checked={isGiftBox} onChange={(e) => setIsGiftBox(e.target.checked)} />
                                <span className={styles.giftCheckboxLabel}>Gói quà cao cấp (+{formatVND(GIFT_FEE)})</span>
                            </label>
                            <div className={styles.giftCards}>
                                {GIFT_ITEMS.map((gift) => (
                                    <div key={gift.id} className={styles.giftCard}>
                                        <div className={styles.giftImageWrapper}><img src={gift.image} alt={gift.name} className={styles.giftImage} /></div>
                                        <p className={gift.name}>{gift.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* ── RIGHT COLUMN: SUMMARY ─────────────────────────────────── */}
                    <div className={styles.rightCol}>
                        <div className={styles.stickySummary}>
                            <section className={styles.summaryCard}>
                                <h3 className={styles.summaryTitle}>TỔNG ĐƠN HÀNG</h3>
                                <div className={styles.summaryRow}><span>Tạm tính</span><span>{formatVND(subtotal)}</span></div>
                                <div className={styles.summaryRow}><span>Phí vận chuyển</span><span>{formatVND(SHIPPING_FEE)}</span></div>
                                <div className={styles.summaryRow}><span>Giảm giá</span><span className={styles.discount}>-{formatVND(DISCOUNT_AMOUNT)}</span></div>
                                {isGiftBox && <div className={styles.summaryRow}><span>Phí gói quà</span><span>{formatVND(GIFT_FEE)}</span></div>}
                                <div className={styles.summaryDivider} />
                                <div className={styles.totalRow}>
                                    <span className={styles.totalLabel}>TỔNG CỘNG</span>
                                    <span className={styles.totalValue}>{formatVND(total)}</span>
                                </div>
                            </section>

                            <section className={styles.voucherSection}>
                                <p className={styles.voucherTitle}>MÃ KHUYẾN MÃI</p>
                                <div className={styles.voucherRow}>
                                    <input type="text" className={styles.voucherInput} placeholder="Nhập mã giảm giá" />
                                    <button className={styles.voucherBtn}>ÁP DỤNG</button>
                                </div>
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
                                <motion.button className={styles.btnCheckout} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => navigate('/checkout')}>
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
        </div>
    );
};

export default CartPage;
