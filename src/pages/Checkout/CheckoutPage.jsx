import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    User, Phone, Mail, MapPin, Building2,
    Home, Tag, ChevronRight, Lock,
    ShieldCheck, Gem, Headphones, Ticket, X as CloseIcon, Loader2, ArrowLeft
} from 'lucide-react';
import styles from './CheckoutPage.module.css';
import { getProvinces, getDistricts, getWards, calculateShippingFee } from '../../services/shipmentService';
import { getActiveVouchers, getVoucherByCode } from '../../services/voucherService';
import { getAddressesByUserId } from '../../services/addressService';
import { checkout } from '../../services/orderService';
import { useToast } from '../../context/ToastContext';
import { useCart } from '../../context/CartContext';
import fallbackProductImg from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/all0.jpg';

// ─── Constants ────────────────────────────────────────────────────────────────


const PAYMENT_METHODS = [
    { id: 'bank', label: 'Chuyển khoản ngân hàng (PayOS)', logo: '🏦', color: '#2563EB' },
];

const formatVND = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

// ─── Component ────────────────────────────────────────────────────────────────
const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();
    const { cartItems: allCartItems, refreshCart } = useCart();

    const selectedCartItemIds = useMemo(() => location.state?.selectedCartItemIds || [], [location.state]);

    const cartItems = useMemo(() => {
        if (!selectedCartItemIds.length) return allCartItems;
        return allCartItems.filter(item => selectedCartItemIds.includes(item.cartItemId));
    }, [allCartItems, selectedCartItemIds]);

    const [currentUser, setCurrentUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [form, setForm] = useState({
        fullName: '', phone: '', email: '',
        provinceId: '', province: '', districtId: '', district: '', wardId: '', ward: '',
        address: '',
    });

    const [promoOpen, setPromoOpen] = useState(false);
    const [payment, setPayment] = useState('bank');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shippingFee, setShippingFee] = useState(0);
    const [isCalculatingShip, setIsCalculatingShip] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Voucher state
    const [voucherCode, setVoucherCode] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState(null);
    const [availableVouchers, setAvailableVouchers] = useState([]);
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                showToast('Vui lòng đăng nhập để thanh toán', 'error');
                navigate('/login');
                return;
            }
            const user = JSON.parse(userStr);
            setCurrentUser(user);

            // Auto-fill form with user info
            setForm(prev => ({
                ...prev,
                fullName: user.fullName || '',
                phone: user.phone || '',
                email: user.email || ''
            }));

            try {
                const [pData, vData, addrData] = await Promise.all([
                    getProvinces(),
                    getActiveVouchers(),
                    getAddressesByUserId(user.id)
                ]);

                setProvinces(Array.isArray(pData) ? pData : (pData?.data || []));
                setAvailableVouchers(Array.isArray(vData) ? vData : []);

                const addressList = Array.isArray(addrData) ? addrData : (addrData?.data || []);
                setAddresses(addressList);

                // Find default address
                const defaultAddr = addressList.find(a => a.isDefault) || addressList[0];
                if (defaultAddr) {
                    setSelectedAddress(defaultAddr);
                    setForm(prev => ({
                        ...prev,
                        fullName: defaultAddr.receiverName || user.fullName,
                        phone: defaultAddr.phone || user.phone,
                        province: defaultAddr.province,
                        district: defaultAddr.district,
                        ward: defaultAddr.ward,
                        address: defaultAddr.detailAddress
                    }));
                }
            } catch (err) {
                console.error('Error loading checkout data:', err);
            }
        };
        loadInitialData();
    }, [navigate, showToast]);

    // Handle Shipping Fee Calculation when address changes
    useEffect(() => {
        const fetchShippingFee = async () => {
            if (selectedAddress?.id) {
                setIsCalculatingShip(true);
                try {
                    const data = await calculateShippingFee(selectedAddress.id);
                    setShippingFee(data.total_shipping_fee || 0);
                } catch (err) {
                    console.error('Lỗi tính phí ship:', err);
                    setShippingFee(0);
                } finally {
                    setIsCalculatingShip(false);
                }
            } else {
                setShippingFee(0);
            }
        };
        fetchShippingFee();
    }, [selectedAddress]);

    // Body scroll lock when modal is open
    useEffect(() => {
        if (showVoucherModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showVoucherModal]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleProvinceChange = async (e) => {
        const pId = e.target.value;
        const pName = provinces.find(p => p.id === pId)?.name || '';
        setForm(prev => ({
            ...prev,
            provinceId: pId,
            province: pName,
            districtId: '',
            district: '',
            wardId: '',
            ward: ''
        }));
        setDistricts([]);
        setWards([]);
        if (pId) {
            try {
                const data = await getDistricts(pId);
                setDistricts(Array.isArray(data) ? data : (data?.data || []));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDistrictChange = async (e) => {
        const dId = e.target.value;
        const dName = districts.find(d => d.id === dId)?.name || '';
        setForm(prev => ({
            ...prev,
            districtId: dId,
            district: dName,
            wardId: '',
            ward: ''
        }));
        setWards([]);
        if (dId) {
            try {
                const data = await getWards(dId);
                setWards(Array.isArray(data) ? data : (data?.data || []));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleWardChange = (e) => {
        const wId = e.target.value;
        const wName = wards.find(w => w.id === wId)?.name || '';
        setForm(prev => ({
            ...prev,
            wardId: wId,
            ward: wName
        }));
    };

    // ── Voucher Logic ───────────────────────────────────────────────────────
    const handleApplyVoucher = async (codeToApply = voucherCode) => {
        if (!codeToApply.trim()) return;
        setIsApplyingVoucher(true);
        try {
            const voucher = await getVoucherByCode(codeToApply.trim());
            const now = new Date();
            const start = new Date(voucher.startDate);
            const end = new Date(voucher.endDate);

            if (voucher.status !== 'ACTIVE') {
                showToast('Mã giảm giá này hiện không khả dụng', 'error');
                return;
            }
            if (now < start || now > end) {
                showToast('Mã giảm giá đã hết hạn hoặc chưa đến thời gian sử dụng', 'error');
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
            showToast('Mã giảm giá không hợp lệ', 'error');
        } finally {
            setIsApplyingVoucher(false);
        }
    };

    const handleRemoveVoucher = () => {
        setAppliedVoucher(null);
        setVoucherCode('');
        showToast('Đã bỏ áp dụng mã giảm giá');
    };

    const handleSelectVoucherFromList = (v) => {
        setVoucherCode(v.code);
        handleApplyVoucher(v.code);
    };

    // ── Image Helper ────────────────────────────────────────────────────────
    const getProductImage = (item) => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        let thumb = item?.variantDetails?.imageUrl || item?.variantDetails?.image;
        if (!thumb && item?.product?.productImages?.length > 0) {
            thumb = item.product.productImages[0].imageUrl;
        }
        if (!thumb) thumb = item?.product?.thumbnail;
        if (!thumb) return fallbackProductImg;
        if (thumb.startsWith('http')) return thumb;
        return `${baseUrl}${thumb.startsWith('/') ? '' : '/'}${thumb}`;
    };

    // ── Totals Calculation ──────────────────────────────────────────────────
    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const price = Number(item.variantDetails?.extraPrice ?? item.unitPrice ?? 0);
            return sum + (price * (item.quantity || 1));
        }, 0);
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        if (!appliedVoucher) return 0;
        const val = parseFloat(appliedVoucher.discountValue);
        if (appliedVoucher.discountType === 'PERCENT') {
            // Apply percentage discount on both Subtotal and Shipping Fee as requested
            return ((subtotal + shippingFee) * val) / 100;
        }
        return val;
    }, [subtotal, shippingFee, appliedVoucher]);

    const total = Math.max(0, (subtotal + shippingFee) - discountAmount);

    // ── Place Order Logic ───────────────────────────────────────────────────
    const handlePlaceOrder = async () => {
        if (!currentUser) return;
        if (!selectedAddress && (!form.province || !form.district || !form.ward || !form.address)) {
            showToast('Vui lòng cung cấp địa chỉ nhận hàng', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                userId: currentUser.id,
                addressId: selectedAddress?.id || null,
                voucherCode: appliedVoucher?.code || "",
                cartItemIds: selectedCartItemIds.length > 0 ? selectedCartItemIds : undefined
            };

            const response = await checkout(payload);

            if (response.payment?.checkoutUrl) {
                // Save full response for the success page to display invoice data
                sessionStorage.setItem('lastCheckout', JSON.stringify(response));
                // Redirect to PayOS payment page
                window.location.href = response.payment.checkoutUrl;
            } else {
                showToast('Có lỗi xảy ra khi tạo thanh toán', 'error');
            }
        } catch (err) {
            showToast(typeof err === 'string' ? err : 'Không thể tạo đơn hàng', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <header className={styles.checkoutHeader}>
                    <button onClick={() => navigate('/cart')} className={styles.backBtn}>
                        <ArrowLeft size={20} /> <span>QUAY LẠI GIỎ HÀNG</span>
                    </button>
                    <h1 className={styles.title}>THANH TOÁN</h1>
                </header>

                {/* ── PROMO/VOUCHER BAR (Now moved to sidebar) ────────────────── */}


                {/* ── MAIN LAYOUT ───────────────────────────────────────────── */}
                <div className={styles.mainGrid}>
                    {/* LEFT: CUSTOMER INFO & ADDRESS */}
                    <div className={styles.leftCol}>
                        {/* ── Customer Info ────────────────────────────────── */}
                        <motion.section {...fadeUp} className={styles.section}>
                            <h2 className={styles.sectionTitle}>THÔNG TIN KHÁCH HÀNG</h2>
                            <div className={styles.sectionDivider}><span className={styles.sectionOrn}>❧</span></div>

                            <div className={styles.formGrid}>
                                <div className={styles.formField}>
                                    <label className={styles.label}>Họ và tên <span className={styles.required}>*</span></label>
                                    <div className={styles.inputWrapper}>
                                        <User size={15} className={styles.inputIcon} />
                                        <input name="fullName" value={form.fullName} onChange={handleChange} className={styles.input} placeholder="Nhập họ và tên" />
                                    </div>
                                </div>

                                <div className={styles.formField}>
                                    <label className={styles.label}>Số điện thoại <span className={styles.required}>*</span></label>
                                    <div className={styles.inputWrapper}>
                                        <Phone size={15} className={styles.inputIcon} />
                                        <input name="phone" value={form.phone} onChange={handleChange} className={styles.input} placeholder="Nhập số điện thoại" />
                                    </div>
                                </div>

                                <div className={`${styles.formField} ${styles.spanFull}`}>
                                    <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                                    <div className={styles.inputWrapper}>
                                        <Mail size={15} className={styles.inputIcon} />
                                        <input name="email" value={form.email} onChange={handleChange} className={styles.input} placeholder="Nhập email" type="email" />
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* ── Delivery Address ─────────────────────────────── */}
                        <motion.section {...fadeUp} className={styles.section} style={{ marginTop: '20px' }}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>ĐỊA CHỈ NHẬN HÀNG</h2>
                                <button className={styles.editAddressBtn} onClick={() => navigate('/shipping-addresses')}>
                                    + THÊM ĐỊA CHỈ
                                </button>
                            </div>
                            <div className={styles.sectionDivider}><span className={styles.sectionOrn}>❧</span></div>

                            {addresses.length > 0 ? (
                                <div className={styles.addressList}>
                                    {addresses.map(addr => (
                                        <div
                                            key={addr.id}
                                            className={`${styles.addressCard} ${selectedAddress?.id === addr.id ? styles.addressCardActive : ''}`}
                                            onClick={() => setSelectedAddress(addr)}
                                        >
                                            <div className={styles.addressInfo}>
                                                <div className={styles.addrNameRow}>
                                                    <span className={styles.addrName}>{addr.receiverName}</span>
                                                    {addr.isDefault && <span className={styles.defaultBadge}>Mặc định</span>}
                                                </div>
                                                <p className={styles.addrPhone}>SĐT: {addr.phone}</p>
                                                <p className={styles.addrText}>{addr.detailAddress}, {addr.ward}, {addr.district}, {addr.province}</p>
                                            </div>
                                            <div className={`${styles.radio} ${selectedAddress?.id === addr.id ? styles.radioActive : ''}`} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Manual address form if no saved addresses */
                                <div className={styles.formGrid}>
                                    <div className={`${styles.formField} ${styles.spanFull}`}>
                                        <div className={styles.tripleGrid}>
                                            <div className={styles.formField}>
                                                <label className={styles.label}>Tỉnh / Thành phố</label>
                                                <div className={styles.inputWrapper}>
                                                    <MapPin size={15} className={styles.inputIcon} />
                                                    <select name="provinceId" value={form.provinceId} onChange={handleProvinceChange} className={styles.select}>
                                                        <option value="">Chọn tỉnh/thành</option>
                                                        {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles.formField}>
                                                <label className={styles.label}>Quận / Huyện</label>
                                                <div className={styles.inputWrapper}>
                                                    <Building2 size={15} className={styles.inputIcon} />
                                                    <select name="districtId" value={form.districtId} onChange={handleDistrictChange} className={styles.select} disabled={!form.provinceId}>
                                                        <option value="">Chọn quận/huyện</option>
                                                        {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={styles.formField}>
                                                <label className={styles.label}>Phường / Xã</label>
                                                <div className={styles.inputWrapper}>
                                                    <Home size={15} className={styles.inputIcon} />
                                                    <select name="wardId" value={form.wardId} onChange={handleWardChange} className={styles.select} disabled={!form.districtId}>
                                                        <option value="">Chọn phường/xã</option>
                                                        {wards.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.formField} ${styles.spanFull}`}>
                                        <label className={styles.label}>Địa chỉ chi tiết</label>
                                        <div className={styles.inputWrapper}>
                                            <MapPin size={15} className={styles.inputIcon} />
                                            <input name="address" value={form.address} onChange={handleChange} className={styles.input} placeholder="Số nhà, tên đường, tòa nhà..." />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.section>
                    </div>


                    {/* RIGHT: ORDER SUMMARY */}
                    <div className={styles.rightCol}>
                        <div className={styles.stickySummary}>
                            <motion.div {...fadeUp} className={styles.summaryCard}>
                                <h3 className={styles.summaryTitle}>THÔNG TIN ĐƠN HÀNG</h3>
                                <div className={styles.summaryDivider}><span className={styles.summaryOrn}>❧</span></div>

                                {/* Product List */}
                                <div className={styles.productList}>
                                    {cartItems.map((item) => (
                                        <div key={item.cartItemId} className={styles.productItem}>
                                            <div className={styles.productImgWrapper}>
                                                <img src={getProductImage(item)} alt={item.product?.productName} className={styles.productImg} />
                                                <span className={styles.productQtyBadge}>{item.quantity}</span>
                                            </div>
                                            <div className={styles.productInfo}>
                                                <p className={styles.productName}>{item.product?.productName}</p>
                                                <p className={styles.productMeta}>
                                                    {item.variantDetails?.color && `Màu: ${item.variantDetails.color}`}
                                                    {item.variantDetails?.size && ` | Size: ${item.variantDetails.size}`}
                                                </p>
                                            </div>
                                            <div className={styles.productPrice}>{formatVND(item.variantDetails?.extraPrice ?? item.unitPrice)}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Coupon Input Section (Integrated) */}
                                <div className={styles.sidebarCoupon}>
                                    <div className={styles.couponHeader}>
                                        <span className={styles.couponLabel}>MÃ ƯU ĐÃI</span>
                                        <button className={styles.viewListLink} onClick={() => setShowVoucherModal(true)}>Xem danh sách</button>
                                    </div>
                                    <div className={styles.couponInputBox}>
                                        <input
                                            type="text"
                                            className={styles.couponInput}
                                            placeholder="Nhập mã giảm giá"
                                            value={voucherCode}
                                            onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                                        />
                                        {appliedVoucher ? (
                                            <button className={styles.applyBtnRemove} onClick={handleRemoveVoucher}>GỠ</button>
                                        ) : (
                                            <button
                                                className={styles.applyBtn}
                                                onClick={() => handleApplyVoucher()}
                                                disabled={isApplyingVoucher || !voucherCode.trim()}
                                            >
                                                {isApplyingVoucher ? <Loader2 size={14} className="animate-spin" /> : 'ÁP DỤNG'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Totals */}
                                <div className={styles.totalsSection}>
                                    <div className={styles.totalRow}>
                                        <span>Tạm tính</span>
                                        <span>{formatVND(subtotal)}</span>
                                    </div>
                                    <div className={styles.totalRow}>
                                        <span>Phí vận chuyển</span>
                                        {isCalculatingShip ? (
                                            <span className="flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Đang tính...</span>
                                        ) : (
                                            <span>{formatVND(shippingFee)}</span>
                                        )}
                                    </div>
                                    {appliedVoucher && (
                                        <div className={styles.totalRow}>
                                            <div className={styles.discountLabelCol}>
                                                <span>Giảm giá ({appliedVoucher.code})</span>
                                                <small className={styles.discountDesc}>
                                                    {appliedVoucher.discountType === 'PERCENT' ? `Giảm ${appliedVoucher.discountValue}%` : `Giảm ${formatVND(appliedVoucher.discountValue)}`}
                                                </small>
                                            </div>
                                            <span className={styles.discountVal}>-{formatVND(discountAmount)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.grandTotalRow}>
                                    <span className={styles.grandTotalLabel}>TỔNG THANH TOÁN</span>
                                    <span className={styles.grandTotalVal}>{formatVND(total)}</span>
                                </div>

                                {/* Payment */}
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

                                <motion.button
                                    className={styles.btnPlaceOrder}
                                    whileHover={{ scale: 1.015 }}
                                    whileTap={{ scale: 0.985 }}
                                    onClick={handlePlaceOrder}
                                    disabled={isSubmitting || cartItems.length === 0}
                                >
                                    {isSubmitting ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <>
                                            <Lock size={18} /> THANH TOÁN NGAY
                                        </>
                                    )}
                                </motion.button>

                                <div className={styles.trustGrid}>
                                    <div className={styles.trustItem}><Gem size={18} /> <span>Đá tự nhiên</span></div>
                                    <div className={styles.trustItem}><ShieldCheck size={18} /> <span>Bảo hành trọn đời</span></div>
                                    <div className={styles.trustItem}><Lock size={18} /> <span>Bảo mật SSL</span></div>
                                    <div className={styles.trustItem}><Headphones size={18} /> <span>Tư vấn miễn phí</span></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Voucher Modal */}
            {showVoucherModal && (
                <div className={styles.modalOverlay} onClick={() => setShowVoucherModal(false)}>
                    <motion.div
                        className={styles.voucherModal}
                        onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}><Ticket size={20} /> Chọn mã giảm giá</h3>
                            <button onClick={() => setShowVoucherModal(false)} className={styles.closeBtn}><CloseIcon size={20} /></button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.voucherList}>
                                {availableVouchers.length === 0 ? (
                                    <p className={styles.noVouchers}>Hiện không có mã giảm giá nào.</p>
                                ) : (
                                    availableVouchers.map(v => (
                                        <div
                                            key={v.id}
                                            className={`${styles.voucherItem} ${appliedVoucher?.id === v.id ? styles.voucherItemApplied : ''}`}
                                            onClick={() => handleSelectVoucherFromList(v)}
                                        >
                                            <div className={styles.vLeft}><Ticket size={24} /></div>
                                            <div className={styles.vRight}>
                                                <div className={styles.vCode}>{v.code}</div>
                                                <div className={styles.vDesc}>Giảm {v.discountType === 'PERCENT' ? `${v.discountValue}%` : formatVND(v.discountValue)}</div>
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

export default CheckoutPage;
