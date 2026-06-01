import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Calendar, Phone, Mail, Globe, MapPin, Building2,
    Home, FileText, Gift, Tag, ChevronRight, Lock,
    ShieldCheck, Gem, Headphones, Package
} from 'lucide-react';
import styles from './CheckoutPage.module.css';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CART_ITEMS = [
    {
        id: 1,
        name: 'VÒNG THẠCH ANH VÀNG 3A',
        stone: 'Thạch anh vàng 3A',
        charm: 'Hoa sen vàng 24K',
        beadSize: '8mm',
        wristSize: '15cm',
        price: 1450000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=200&h=200&fit=crop&q=80',
    },
    {
        id: 2,
        name: 'VÒNG OBSIDIAN ĐEN 5A',
        stone: 'Obsidian đen 5A',
        charm: 'Tỳ hưu vàng 24K',
        beadSize: '10mm',
        wristSize: '16cm',
        price: 1250000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1615209853186-e4bd66602508?w=200&h=200&fit=crop&q=80',
    },
];

const PAYMENT_METHODS = [
    { id: 'vnpay', label: 'VNPay', logo: '💳', color: '#E7392C' },
    { id: 'momo', label: 'MoMo', logo: '📱', color: '#A50064' },
    { id: 'bank', label: 'Chuyển khoản ngân hàng', logo: '🏦', color: '#2563EB' },
    { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', logo: '🚚', color: '#16A34A' },
];

const PROVINCES = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'];
const DISTRICTS = ['Quận 1', 'Quận 2', 'Quận 3', 'Bình Thạnh', 'Gò Vấp'];
const WARDS = ['Phường Bến Nghé', 'Phường Bến Thành', 'Phường Cầu Kho', 'Phường Nguyễn Thái Bình'];

const SHIPPING_FEE = 30000;
const GIFT_FEE = 49000;
const DISCOUNT = 100000;

const formatVND = (n) => new Intl.NumberFormat('vi-VN').format(n) + 'đ';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.6 },
};

// ─── Component ────────────────────────────────────────────────────────────────
const CheckoutPage = () => {
    const [form, setForm] = useState({
        fullName: '', dob: '', phone: '', email: '',
        country: 'Việt Nam', province: '', district: '', ward: '',
        address: '', note: '',
    });
    const [isGift, setIsGift] = useState(true);
    const [giftMessage, setGiftMessage] = useState('');
    const [promoOpen, setPromoOpen] = useState(false);
    const [payment, setPayment] = useState('vnpay');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.quantity, 0);
    const giftFee = isGift ? GIFT_FEE : 0;
    const total = subtotal + SHIPPING_FEE + giftFee - DISCOUNT;

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>

                {/* ── PROMO BAR ─────────────────────────────────────────────── */}
                <motion.div {...fadeUp} className={styles.promoBar} onClick={() => setPromoOpen(!promoOpen)}>
                    <div className={styles.promoLeft}>
                        <Tag size={16} className={styles.promoIcon} />
                        <span>Bạn có mã ưu đãi? Nhấn vào đây để nhập mã giảm giá.</span>
                    </div>
                    <ChevronRight size={18} className={promoOpen ? styles.promoChevronOpen : styles.promoChevron} />
                </motion.div>

                {promoOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={styles.promoInputRow}
                    >
                        <input type="text" className={styles.promoInput} placeholder="Nhập mã giảm giá" />
                        <button className={styles.promoBtn}>ÁP DỤNG</button>
                    </motion.div>
                )}

                {/* ── MAIN LAYOUT ───────────────────────────────────────────── */}
                <div className={styles.mainGrid}>

                    {/* ══ LEFT: CUSTOMER INFO ═══════════════════════════════════ */}
                    <div className={styles.leftCol}>

                        {/* Section: Customer Info */}
                        <motion.section {...fadeUp} className={styles.section}>
                            <h2 className={styles.sectionTitle}>THÔNG TIN KHÁCH HÀNG</h2>
                            <div className={styles.sectionDivider}><span className={styles.sectionOrn}>❧</span></div>

                            <div className={styles.formGrid}>
                                {/* Row 1 */}
                                <div className={styles.formField}>
                                    <label className={styles.label}>Họ và tên <span className={styles.required}>*</span></label>
                                    <div className={styles.inputWrapper}>
                                        <User size={15} className={styles.inputIcon} />
                                        <input name="fullName" value={form.fullName} onChange={handleChange} className={styles.input} placeholder="Nhập họ và tên" />
                                    </div>
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.label}>Ngày sinh</label>
                                    <div className={styles.inputWrapper}>
                                        <Calendar size={15} className={styles.inputIcon} />
                                        <input name="dob" value={form.dob} onChange={handleChange} className={styles.input} placeholder="DD / MM / YYYY" type="text" />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className={styles.formField}>
                                    <label className={styles.label}>Số điện thoại <span className={styles.required}>*</span></label>
                                    <div className={styles.inputWrapper}>
                                        <Phone size={15} className={styles.inputIcon} />
                                        <input name="phone" value={form.phone} onChange={handleChange} className={styles.input} placeholder="Nhập số điện thoại" />
                                    </div>
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                                    <div className={styles.inputWrapper}>
                                        <Mail size={15} className={styles.inputIcon} />
                                        <input name="email" value={form.email} onChange={handleChange} className={styles.input} placeholder="Nhập email" type="email" />
                                    </div>
                                </div>

                                {/* Row 3: Country + Province + District */}
                                <div className={`${styles.formField} ${styles.spanFull}`}>
                                    <div className={styles.tripleGrid}>
                                        <div className={styles.formField}>
                                            <label className={styles.label}>Quốc gia <span className={styles.required}>*</span></label>
                                            <div className={styles.inputWrapper}>
                                                <Globe size={15} className={styles.inputIcon} />
                                                <select name="country" value={form.country} onChange={handleChange} className={styles.select}>
                                                    <option>Việt Nam</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={styles.formField}>
                                            <label className={styles.label}>Tỉnh / Thành phố <span className={styles.required}>*</span></label>
                                            <div className={styles.inputWrapper}>
                                                <MapPin size={15} className={styles.inputIcon} />
                                                <select name="province" value={form.province} onChange={handleChange} className={styles.select}>
                                                    <option value="">Chọn tỉnh / thành phố</option>
                                                    {PROVINCES.map(p => <option key={p}>{p}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={styles.formField}>
                                            <label className={styles.label}>Quận / Huyện <span className={styles.required}>*</span></label>
                                            <div className={styles.inputWrapper}>
                                                <Building2 size={15} className={styles.inputIcon} />
                                                <select name="district" value={form.district} onChange={handleChange} className={styles.select}>
                                                    <option value="">Chọn quận / huyện</option>
                                                    {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 4: Ward + Address */}
                                <div className={styles.formField}>
                                    <label className={styles.label}>Phường / Xã <span className={styles.required}>*</span></label>
                                    <div className={styles.inputWrapper}>
                                        <Home size={15} className={styles.inputIcon} />
                                        <select name="ward" value={form.ward} onChange={handleChange} className={styles.select}>
                                            <option value="">Chọn phường / xã</option>
                                            {WARDS.map(w => <option key={w}>{w}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.label}>Địa chỉ chi tiết <span className={styles.required}>*</span></label>
                                    <div className={styles.inputWrapper}>
                                        <MapPin size={15} className={styles.inputIcon} />
                                        <input name="address" value={form.address} onChange={handleChange} className={styles.input} placeholder="Số nhà, tên đường, tòa nhà, căn hộ..." />
                                    </div>
                                </div>

                                {/* Note - full width */}
                                <div className={`${styles.formField} ${styles.spanFull}`}>
                                    <label className={styles.label}>Ghi chú đơn hàng (tùy chọn)</label>
                                    <div className={styles.inputWrapper}>
                                        <FileText size={15} className={`${styles.inputIcon} ${styles.inputIconTop}`} />
                                        <textarea name="note" value={form.note} onChange={handleChange} className={styles.textarea} placeholder="Nhập ghi chú cho đơn hàng của bạn..." rows={3} />
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Section: Gift Experience */}
                        <motion.section {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className={styles.section}>
                            <div className={styles.giftSectionHeader}>
                                <Gift size={20} className={styles.giftTitleIcon} />
                                <h2 className={styles.sectionTitle}>TRẢI NGHIỆM QUÀ TẶNG</h2>
                            </div>
                            <div className={styles.sectionDivider}><span className={styles.sectionOrn}>❧</span></div>

                            <div className={styles.giftLayout}>
                                {/* Left: Checkbox + Description */}
                                <div className={styles.giftLeft}>
                                    <label className={styles.giftCheckLabel}>
                                        <input type="checkbox" checked={isGift} onChange={e => setIsGift(e.target.checked)} className={styles.giftCheck} />
                                        <span className={styles.giftCheckText}>Gói quà cao cấp <strong>(+49.000đ)</strong></span>
                                    </label>
                                    <p className={styles.giftDesc}>
                                        Bao gồm: Hộp nhung cao cấp, ruy băng champagne,<br />thiệp chúc mừng và túi giấy thương hiệu.
                                    </p>
                                </div>

                                {/* Right: Gift Visual */}
                                <div className={styles.giftImages}>
                                    <img
                                        src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=200&fit=crop&q=80"
                                        alt="Hộp quà"
                                        className={styles.giftImg}
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1606293459339-2a10f3f0fe1e?w=300&h=200&fit=crop&q=80"
                                        alt="Thiệp cảm ơn"
                                        className={styles.giftImg}
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop&q=80"
                                        alt="Túi thương hiệu"
                                        className={styles.giftImg}
                                    />
                                </div>
                            </div>

                            {/* Gift Message + Preview */}
                            <div className={styles.giftMessageRow}>
                                <div className={styles.giftMessageLeft}>
                                    <p className={styles.giftMessageLabel}>LỜI NHẮN TẶNG QUÀ</p>
                                    <div className={styles.giftTextareaWrapper}>
                                        <textarea
                                            className={styles.giftTextarea}
                                            placeholder="Nhập lời chúc dành cho người nhận..."
                                            maxLength={200}
                                            value={giftMessage}
                                            onChange={e => setGiftMessage(e.target.value)}
                                            rows={5}
                                        />
                                        <span className={styles.charCount}>{giftMessage.length}/200</span>
                                    </div>
                                </div>
                                <div className={styles.giftPreviewCard}>
                                    <p className={styles.giftPreviewLabel}>THIỆP XEM TRƯỚC</p>
                                    <div className={styles.previewCard}>
                                        <div className={styles.previewCardInner}>
                                            <p className={styles.previewBrand}>Cát</p>
                                            <p className={styles.previewBrandSub}>BRACELET</p>
                                            <div className={styles.previewDivider} />
                                            <p className={styles.previewMsg}>{giftMessage || 'Lời chúc của bạn sẽ hiển thị ở đây...'}</p>
                                            <div className={styles.previewFloral}>❋</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                    </div>

                    {/* ══ RIGHT: ORDER SUMMARY ══════════════════════════════════ */}
                    <div className={styles.rightCol}>
                        <div className={styles.stickySummary}>
                            <motion.div {...fadeUp} className={styles.summaryCard}>
                                <h3 className={styles.summaryTitle}>THÔNG TIN ĐƠN HÀNG</h3>
                                <div className={styles.summaryDivider}><span className={styles.summaryOrn}>❧</span></div>

                                {/* Products */}
                                <div className={styles.productList}>
                                    {CART_ITEMS.map((item) => (
                                        <div key={item.id} className={styles.productItem}>
                                            <div className={styles.productImgWrapper}>
                                                <img src={item.image} alt={item.name} className={styles.productImg} />
                                                <span className={styles.productQtyBadge}>{item.quantity}</span>
                                            </div>
                                            <div className={styles.productInfo}>
                                                <p className={styles.productName}>{item.name}</p>
                                                <p className={styles.productMeta}>Đá: {item.stone}</p>
                                                <p className={styles.productMeta}>Charm: {item.charm}</p>
                                                <p className={styles.productMetaRow}>
                                                    <span>Hạt đá: {item.beadSize}</span>
                                                    <span className={styles.metaSep}>|</span>
                                                    <span>Size tay: {item.wristSize}</span>
                                                </p>
                                            </div>
                                            <div className={styles.productPrice}>{formatVND(item.price)}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className={styles.totalsSection}>
                                    <div className={styles.totalRow}>
                                        <span>Tạm tính</span>
                                        <span>{formatVND(subtotal)}</span>
                                    </div>
                                    <div className={styles.totalRow}>
                                        <span>Phí vận chuyển</span>
                                        <span>{formatVND(SHIPPING_FEE)}</span>
                                    </div>
                                    {isGift && (
                                        <div className={styles.totalRow}>
                                            <span>Phí gói quà</span>
                                            <span>{formatVND(GIFT_FEE)}</span>
                                        </div>
                                    )}
                                    <div className={styles.totalRow}>
                                        <span>Giảm giá</span>
                                        <span className={styles.discountVal}>-{formatVND(DISCOUNT)}</span>
                                    </div>
                                </div>

                                <div className={styles.grandTotalRow}>
                                    <span className={styles.grandTotalLabel}>TỔNG THANH TOÁN</span>
                                    <span className={styles.grandTotalVal}>{formatVND(total)}</span>
                                </div>

                                {/* Payment Methods */}
                                <div className={styles.paymentSection}>
                                    <p className={styles.paymentTitle}>PHƯƠNG THỨC THANH TOÁN</p>
                                    <div className={styles.paymentGrid}>
                                        {PAYMENT_METHODS.map((m) => (
                                            <button
                                                key={m.id}
                                                className={`${styles.paymentCard} ${payment === m.id ? styles.paymentCardActive : ''}`}
                                                onClick={() => setPayment(m.id)}
                                            >
                                                <span className={styles.paymentLogo}>{m.logo}</span>
                                                <span className={styles.paymentLabel}>{m.label}</span>
                                                <span className={`${styles.paymentRadio} ${payment === m.id ? styles.paymentRadioActive : ''}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <motion.button
                                    className={styles.btnPlaceOrder}
                                    whileHover={{ scale: 1.015 }}
                                    whileTap={{ scale: 0.985 }}
                                >
                                    <Lock size={18} />
                                    ĐẶT HÀNG
                                </motion.button>

                                {/* Trust Badges */}
                                <div className={styles.trustGrid}>
                                    <div className={styles.trustItem}>
                                        <Gem size={18} className={styles.trustIcon} />
                                        <span>Đá tự nhiên tuyển chọn</span>
                                    </div>
                                    <div className={styles.trustItem}>
                                        <ShieldCheck size={18} className={styles.trustIcon} />
                                        <span>Bảo hành trọn đời</span>
                                    </div>
                                    <div className={styles.trustItem}>
                                        <Lock size={18} className={styles.trustIcon} />
                                        <span>Thanh toán bảo mật SSL</span>
                                    </div>
                                    <div className={styles.trustItem}>
                                        <Headphones size={18} className={styles.trustIcon} />
                                        <span>Hỗ trợ tư vấn phong thủy miễn phí</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
