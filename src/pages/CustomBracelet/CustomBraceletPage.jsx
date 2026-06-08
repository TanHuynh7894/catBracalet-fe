import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChevronDown, ChevronUp, X, SlidersHorizontal,
    ShoppingBag, Heart, Plus, Minus, Gem, Sparkles, User, Gift, RefreshCw,
} from 'lucide-react';
import styles from './CustomBraceletPage.module.css';
import { getProducts, getAllProductVariants } from '../../services/productService';
import { getProductCategories } from '../../services/categoryService';
import { addToCart } from '../../services/cartService';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

// ─── Fallback Image ────────────────────────────────────────────────────────────
import fallbackProductImg from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/all0.jpg';
import heroImg from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/all0.jpg';

// ─── Framer Motion variants ───────────────────────────────────────────────────
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.8 },
};

// ─── Component ────────────────────────────────────────────────────────────────
const CustomBraceletPage = () => {
    const navigate = useNavigate();
    const { refreshCart } = useCart();
    const { showToast } = useToast();

    // API Data State
    const [wires, setWires] = useState([]);
    const [stones, setStones] = useState([]);
    const [charms, setCharms] = useState([]);
    const [loading, setLoading] = useState(true);

    // Selected items
    const [selectedWire, setSelectedWire] = useState(null); // ID của dây
    const [selectedStones, setSelectedStones] = useState([]); // Array IDs của đá
    const [selectedCharms, setSelectedCharms] = useState([]); // Array IDs của charm


    useEffect(() => {
        const loadComponents = async () => {
            try {
                setLoading(true);
                const [productData, catData, variantData] = await Promise.all([
                    getProducts(),
                    getProductCategories(),
                    getAllProductVariants()
                ]);

                const allProds = Array.isArray(productData) ? productData : (productData?.products || []);
                const allCats = Array.isArray(catData) ? catData : (catData?.categories || []);
                const allVariants = Array.isArray(variantData) ? variantData : [];

                // Ánh xạ productId -> variantId đầu tiên (vì nguyên liệu thường chỉ có 1 variant)
                const enhancedProds = allProds.map(p => {
                    const firstVariant = allVariants.find(v =>
                        (v.productVariantMappings || v.product_variant_mappings)?.some(m => m.productId === p.id || m.product_id === p.id)
                    );
                    return { ...p, variantId: firstVariant?.id };
                });

                // Phân loại dựa trên danh mục (Category)
                const wireCat = allCats.find(c => c.categoryName.toLowerCase().includes('dây'));
                const charmCat = allCats.find(c => c.categoryName.toLowerCase().includes('charm'));
                const stoneCat = allCats.find(c => c.categoryName.toLowerCase().includes('đá'));

                setWires(enhancedProds.filter(p => (p.categoryId === wireCat?.id) && p.status === 'ACTIVE'));
                setCharms(enhancedProds.filter(p => (p.categoryId === charmCat?.id) && p.status === 'ACTIVE'));
                setStones(enhancedProds.filter(p => (p.categoryId === stoneCat?.id) && p.status === 'ACTIVE'));

            } catch (error) {
                console.error("Error loading custom bracelet components:", error);
                showToast("Không thể tải nguyên liệu", "error");
            } finally {
                setLoading(false);
            }
        };
        loadComponents();
    }, []);

    const toggleStone = (id) =>
        setSelectedStones(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

    const toggleCharm = (id) =>
        setSelectedCharms(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

    const handleBuyIngredients = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            showToast('Vui lòng đăng nhập để mua nguyên liệu', 'error');
            navigate('/login');
            return;
        }

        const selectedItems = [];
        // Lấy thông tin product đầy đủ (bao gồm variantId) để add to cart
        if (selectedWire) selectedItems.push(wires.find(w => w.id === selectedWire));
        selectedStones.forEach(sid => {
            const s = stones.find(stone => stone.id === sid);
            if (s) selectedItems.push(s);
        });
        selectedCharms.forEach(cid => {
            const c = charms.find(charm => charm.id === cid);
            if (c) selectedItems.push(c);
        });

        if (selectedItems.length === 0) {
            showToast('Chưa chọn nguyên liệu nào', 'warning');
            return;
        }

        try {
            showToast('Đang thêm vào giỏ hàng...', 'info');

            for (const item of selectedItems) {
                if (item.variantId) {
                    await addToCart(item.variantId, 1);
                } else {
                    console.warn(`Sản phẩm ${item.productName} không có variant nào`);
                }
            }

            await refreshCart();
            showToast('Đã thêm thành công nguyên liệu vào giỏ hàng!', 'success');
            navigate('/cart');
        } catch (error) {
            showToast(error.toString(), 'error');
        }
    };


    const formatPrice = (price) =>
        (Number(price) || 0).toLocaleString('vi-VN') + 'đ';

    const getFullImageUrl = (url) => {
        if (!url) return fallbackProductImg;
        if (url.startsWith('http')) return url;
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };



    const features = [
        { icon: <Sparkles size={26} strokeWidth={1.4} />, title: 'Tự do phối chất liệu', subtitle: 'Thoải mái kết hợp theo phong cách riêng' },
        { icon: <Gem size={26} strokeWidth={1.4} />, title: 'Charm & đá chọn lẻ', subtitle: 'Đa dạng mẫu mã, chọn từng món yêu thích' },
        { icon: <User size={26} strokeWidth={1.4} />, title: 'Mua theo gu cá nhân', subtitle: 'Tự tạo vòng mang dấu ấn riêng của bạn' },
        { icon: <Gift size={26} strokeWidth={1.4} />, title: 'Đóng gói chuẩn Cát', subtitle: 'Gói quà tinh tế & sang trọng' },
    ];

    // Sort options
    const sortOptions = ['Mới nhất', 'Phổ biến nhất', 'Giá tăng dần', 'Giá giảm dần'];
    const [sortBy, setSortBy] = useState('Mới nhất');
    const [sortOpen, setSortOpen] = useState(false);

    const uspItems = [
        { icon: <RefreshCw size={32} />, title: 'Đổi trả dễ dàng', desc: 'Trong vòng 7 ngày nếu không hài lòng' },
        { icon: <Sparkles size={32} />, title: 'Bảo hành trọn đời', desc: 'Thanh tẩy và xỏ dây miễn phí' },
        { icon: <Gift size={32} />, title: 'Gói quà tinh tế', desc: 'Tặng kèm hộp và túi giấy sang trọng' },
        { icon: <Gem size={32} />, title: 'Cam kết chất lượng', desc: 'Đá tự nhiên 100% được tuyển chọn' },
    ];

    if (loading) {
        return <div className={styles.loading}>Đang tải nguyên liệu...</div>;
    }

    return (
        <div className={styles.page}>
            {/* ═══════════════════════════════════════════════════════
                1. HERO
            ══════════════════════════════════════════════════════════ */}
            <motion.section {...fadeUp} className={styles.hero}>
                <div className={styles.heroWrap}>
                    <div className={styles.heroLeft}>
                        <h1 className={styles.heroTitle}>
                            Tự chọn nguyên liệu.<br />
                            Tự tạo vòng Cát<br />
                            <span className={styles.heroTitleDark}>theo phong cách của bạn</span>
                        </h1>
                        <p className={styles.heroBody}>
                            Chọn charm, loại đá, dây và phụ kiện yêu thích<br />
                            để tự làm vòng tay riêng – theo gu bạn, theo năng lượng bạn.
                        </p>
                    </div>
                    <div className={styles.heroRight}>
                        <img src={heroImg} alt="Hero" className={styles.heroImg} />
                    </div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════
                2. FEATURES BAR
            ════════════════════════════════════════════════════ */}
            <motion.section {...fadeUp} className={styles.features}>
                <div className={styles.container}>
                    <div className={styles.featureBar}>
                        {features.map((f, i) => (
                            <div key={i} className={styles.featureItem}>
                                <div className={styles.featureIcon}>{f.icon}</div>
                                <div className={styles.featureTexts}>
                                    <p className={styles.featureTitle}>{f.title}</p>
                                    <p className={styles.featureSub}>{f.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════
                3. BUILDER (steps only, sidebar hidden as requested)
            ════════════════════════════════════════════════════ */}
            <section className={styles.builder}>
                <div className={styles.builderWrap}>

                    {/* BUILDER CONTENT - GRID OF STEPS */}
                    <div className={styles.builderContent} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>

                        {/* Top bar */}
                        <div className={styles.contentTop}>
                            <div>
                                <h2 className={styles.contentTitle}>Thiết kế vòng tay của riêng bạn</h2>
                                <p className={styles.contentSub}>Chọn thành phần bạn muốn mua để tự sáng tạo.</p>
                            </div>
                        </div>

                        {/* ─── STEP 1: CHỌN DÂY ────────────── */}
                        <motion.div {...fadeUp} className={styles.step}>
                            <div className={styles.stepHead}>
                                <span className={styles.stepNum}>1</span>
                                <div>
                                    <h3 className={styles.stepTitle}>Chọn dây</h3>
                                    <p className={styles.stepSub}>Mỗi vòng cần 1 bộ dây cơ bản</p>
                                </div>
                            </div>
                            <div className={styles.wireGrid}>
                                {wires.map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`${styles.wireCard} ${selectedWire === opt.id ? styles.wireCardActive : ''}`}
                                        onClick={() => setSelectedWire(opt.id === selectedWire ? null : opt.id)}
                                    >
                                        <div className={styles.wireImgWrap}>
                                            <img src={getFullImageUrl(opt.image)} alt={opt.productName} className={styles.wireImg} />
                                        </div>
                                        <span className={styles.wireLabel}>{opt.productName}</span>
                                        <span className={styles.priceTag}>{formatPrice(opt.basePrice)}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── STEP 2: CHỌN LOẠI ĐÁ ────────── */}
                        <motion.div {...fadeUp} className={styles.step}>
                            <div className={styles.stepHead}>
                                <span className={styles.stepNum}>2</span>
                                <div>
                                    <h3 className={styles.stepTitle}>Chọn loại đá</h3>
                                    <p className={styles.stepSub}>Chọn các viên đá mang năng lượng bạn cần</p>
                                </div>
                            </div>

                            <div className={styles.stoneGrid}>
                                {stones.map(stone => (
                                    <button
                                        key={stone.id}
                                        className={`${styles.stoneCard} ${selectedStones.includes(stone.id) ? styles.stoneCardActive : ''}`}
                                        onClick={() => toggleStone(stone.id)}
                                    >
                                        <div className={styles.stoneImgWrap}>
                                            <img src={getFullImageUrl(stone.image)} alt={stone.productName} className={styles.stoneImg} />
                                        </div>
                                        <span className={styles.stoneLabel}>{stone.productName}</span>
                                        <span className={styles.priceTag}>{formatPrice(stone.basePrice)}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── STEP 3: CHỌN CHARM ──────────── */}
                        <motion.div {...fadeUp} className={styles.step}>
                            <div className={styles.stepHead}>
                                <span className={styles.stepNum}>3</span>
                                <div>
                                    <h3 className={styles.stepTitle}>Chọn charm</h3>
                                    <p className={styles.stepSub}>Điểm nhấn cho chiếc vòng của bạn</p>
                                </div>
                            </div>
                            <div className={styles.charmGrid}>
                                {charms.map(c => (
                                    <button
                                        key={c.id}
                                        className={`${styles.charmCard} ${selectedCharms.includes(c.id) ? styles.charmCardActive : ''}`}
                                        onClick={() => toggleCharm(c.id)}
                                    >
                                        <div className={styles.charmImgWrap}>
                                            <img src={getFullImageUrl(c.image)} alt={c.productName} className={styles.charmImg} />
                                        </div>
                                        <span className={styles.charmLabel}>{c.productName}</span>
                                        <span className={styles.priceTag}>{formatPrice(c.basePrice)}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── ACTION BUTTONS ──────────────── */}
                        <motion.div {...fadeUp} className={styles.actions}>
                            <div className={styles.totalInfo}>
                                <span>Đã chọn: {(selectedWire ? 1 : 0) + selectedStones.length + selectedCharms.length} nguyên liệu</span>
                            </div>
                            <button className={styles.btnFill} onClick={handleBuyIngredients}>
                                <ShoppingBag size={18} strokeWidth={1.5} />
                                MUA NGUYÊN LIỆU & ĐI ĐẾN GIỎ HÀNG
                            </button>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                4. USP SECTION
            ════════════════════════════════════════════════════ */}
            <motion.section {...fadeUp} className={styles.usp}>
                <div className={styles.container}>
                    <div className={styles.uspGrid}>
                        {uspItems.map((item, i) => (
                            <div key={i} className={styles.uspItem}>
                                <div className={styles.uspIcon}>{item.icon}</div>
                                <div className={styles.uspTexts}>
                                    <p className={styles.uspTitle}>{item.title}</p>
                                    <p className={styles.uspDesc}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default CustomBraceletPage;

