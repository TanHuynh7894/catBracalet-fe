import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChevronDown, ChevronUp, X, SlidersHorizontal, ChevronLeft, ChevronRight,
    ShoppingBag, Heart, Plus, Minus, Gem, Sparkles, User, Gift, RefreshCw,
} from 'lucide-react';
import styles from './CustomBraceletPage.module.css';
import { getProducts, getAllProductVariants, getProductById } from '../../services/productService';
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
    const [selectedWire, setSelectedWire] = useState(null); // { productId, variantId, name, price, image }
    const [selectedStones, setSelectedStones] = useState([]); // Array of { productId, variantId, name, price, color, size, image }
    const [selectedCharms, setSelectedCharms] = useState([]); // Array of { productId, variantId, name, price, color, quantity, image }

    // Configuration Modal state
    const [configuringProduct, setConfiguringProduct] = useState(null);
    const [configType, setConfigType] = useState(null); // 'stone', 'charm', 'wire'
    const [allVariants, setAllVariants] = useState([]);
    const [currentOptions, setCurrentOptions] = useState({ color: '', size: '', quantity: 1, variantId: null });
    const [activeImg, setActiveImg] = useState(0);
    const [modalImages, setModalImages] = useState([]);


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
                const variants = Array.isArray(variantData) ? variantData : [];
                setAllVariants(variants);

                // Phân loại dựa trên danh mục (Category)
                const wireCat = allCats.find(c => c.categoryName.toLowerCase().includes('dây'));
                const charmCat = allCats.find(c => c.categoryName.toLowerCase().includes('charm'));
                const stoneCat = allCats.find(c => c.categoryName.toLowerCase().includes('đá'));

                setWires(allProds.filter(p => (p.categoryId === wireCat?.id) && p.status === 'ACTIVE'));
                setCharms(allProds.filter(p => (p.categoryId === charmCat?.id) && p.status === 'ACTIVE'));
                setStones(allProds.filter(p => (p.categoryId === stoneCat?.id) && p.status === 'ACTIVE'));

            } catch (error) {
                console.error("Error loading custom bracelet components:", error);
                showToast("Không thể tải nguyên liệu", "error");
            } finally {
                setLoading(false);
            }
        };
        loadComponents();
    }, []);

    const openConfigurator = async (product, type) => {
        try {
            // Fetch full product details to get images
            const fullProduct = await getProductById(product.id);
            let productVariants = fullProduct.product_variants || fullProduct.variants || [];

            // If variants aren't in details, find from allVariants
            if (productVariants.length === 0) {
                productVariants = allVariants.filter(v =>
                    v.status === 'ACTIVE' &&
                    (v.productVariantMappings || v.product_variant_mappings || [])?.some(m =>
                        (m.productId === product.id || m.product_id === product.id)
                    )
                );
            }

            console.log(`[CustomDesign] Product ${fullProduct.productName} has ${productVariants.length} variants`);

            // Prepare images
            const images = (fullProduct.productImages || fullProduct.product_images || [])
                .filter(img => img.status === 'ACTIVE')
                .map(img => getFullImageUrl(img.imageUrl || img.url));

            const uniqueImages = [...new Set([getFullImageUrl(fullProduct.thumbnail || fullProduct.image), ...images])].filter(Boolean);

            setModalImages(uniqueImages);
            setActiveImg(0);
            setConfiguringProduct({ ...fullProduct, variants: productVariants });
            setConfigType(type);

            const firstV = productVariants[0];
            setCurrentOptions({
                color: firstV?.color || '',
                size: firstV?.size || '',
                quantity: 1,
                variantId: firstV?.id || null
            });
        } catch (error) {
            console.error("Error opening configurator:", error);
            showToast("Không thể tải thông tin chi tiết sản phẩm", "error");
        }
    };

    const handleAddConfigured = () => {
        if (!configuringProduct || !currentOptions.variantId) return;

        const variant = configuringProduct.variants.find(v => v.id === currentOptions.variantId);
        const itemInfo = {
            productId: configuringProduct.id,
            variantId: variant.id,
            name: configuringProduct.productName,
            price: Number(variant.extraPrice || 0),
            image: configuringProduct.thumbnail || configuringProduct.image,
            color: variant.color,
            size: variant.size,
            quantity: currentOptions.quantity
        };

        if (configType === 'wire') {
            setSelectedWire(itemInfo);
        } else if (configType === 'stone') {
            setSelectedStones(prev => [...prev, itemInfo]);
        } else if (configType === 'charm') {
            setSelectedCharms(prev => [...prev, itemInfo]);
        }

        setConfiguringProduct(null);
        showToast(`Đã thêm ${configuringProduct.productName}`, 'success');
    };

    const removeStone = (index) => setSelectedStones(prev => prev.filter((_, i) => i !== index));
    const removeCharm = (index) => setSelectedCharms(prev => prev.filter((_, i) => i !== index));

    const handleBuyIngredients = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            showToast('Vui lòng đăng nhập để mua nguyên liệu', 'error');
            navigate('/login');
            return;
        }

        const selectedItems = [];
        if (selectedWire) selectedItems.push(selectedWire);
        selectedStones.forEach(s => selectedItems.push(s));
        selectedCharms.forEach(c => selectedItems.push(c));

        if (selectedItems.length === 0) {
            showToast('Chưa chọn nguyên liệu nào', 'warning');
            return;
        }

        try {
            // Cập nhật nội dung thông báo theo yêu cầu
            const loadingToast = showToast('Đang thêm vào giỏ hàng...', 'info');

            // Gửi lần lượt để tránh xung đột DB, nhưng đợi tất cả xong mới báo thành công
            for (const item of selectedItems) {
                console.log("[CustomDesign] Adding item:", item.name, "Variant:", item.variantId);
                await addToCart(item.variantId, item.quantity || 1);
            }

            // Chỉ refresh giỏ hàng một lần duy nhất sau khi xong tất cả
            await refreshCart();

            showToast('Đã thêm thành công tất cả nguyên liệu vào giỏ hàng!', 'success');
            navigate('/cart');
        } catch (error) {
            console.error("[CustomDesign] Add error:", error);
            showToast(typeof error === 'string' ? error : 'Có lỗi khi thêm một số nguyên liệu. Vui lòng kiểm tra lại giỏ hàng.', 'error');
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
                                    <div
                                        key={opt.id}
                                        className={`${styles.productCard} ${selectedWire?.productId === opt.id ? styles.productCardActive : ''}`}
                                        onClick={() => openConfigurator(opt, 'wire')}
                                    >
                                        <div className={styles.cardImageWrapper}>
                                            <img src={getFullImageUrl(opt.thumbnail || opt.image)} alt={opt.productName} className={styles.cardImage} />
                                        </div>
                                        <div className={styles.cardBody}>
                                            <h4 className={styles.cardName}>{opt.productName}</h4>
                                            <p className={styles.cardPrice}>Từ {formatPrice(opt.basePrice)}</p>
                                        </div>
                                    </div>
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
                                    <div
                                        key={stone.id}
                                        className={styles.productCard}
                                        onClick={() => openConfigurator(stone, 'stone')}
                                    >
                                        <div className={styles.cardImageWrapper}>
                                            <img src={getFullImageUrl(stone.thumbnail || stone.image)} alt={stone.productName} className={styles.cardImage} />
                                        </div>
                                        <div className={styles.cardBody}>
                                            <h4 className={styles.cardName}>{stone.productName}</h4>
                                            <p className={styles.cardPrice}>Từ {formatPrice(stone.basePrice)}</p>
                                        </div>
                                    </div>
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
                                    <div
                                        key={c.id}
                                        className={styles.productCard}
                                        onClick={() => openConfigurator(c, 'charm')}
                                    >
                                        <div className={styles.cardImageWrapper}>
                                            <img src={getFullImageUrl(c.thumbnail || c.image)} alt={c.productName} className={styles.cardImage} />
                                        </div>
                                        <div className={styles.cardBody}>
                                            <h4 className={styles.cardName}>{c.productName}</h4>
                                            <p className={styles.cardPrice}>Từ {formatPrice(c.basePrice)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── SELECTED LIST ──────────────── */}
                        <motion.div {...fadeUp} className={styles.selectedSection}>
                            <h3 className={styles.selectedTitle}>Các phần đã chọn</h3>
                            <div className={styles.selectedGrid}>
                                {selectedWire && (
                                    <div className={styles.selectedItemCard}>
                                        <img src={getFullImageUrl(selectedWire.image)} className={styles.selectedItemImg} />
                                        <div className={styles.selectedItemInfo}>
                                            <p className={styles.selectedItemName}>{selectedWire.name}</p>
                                            <p className={styles.selectedItemDetail}>Dây</p>
                                        </div>
                                        <button onClick={() => setSelectedWire(null)} className={styles.removeBtn}><X size={14} /></button>
                                    </div>
                                )}
                                {selectedStones.map((s, idx) => (
                                    <div key={`s-${idx}`} className={styles.selectedItemCard}>
                                        <img src={getFullImageUrl(s.image)} className={styles.selectedItemImg} />
                                        <div className={styles.selectedItemInfo}>
                                            <p className={styles.selectedItemName}>{s.name}</p>
                                            <p className={styles.selectedItemDetail}>{s.color} | {s.size} | x{s.quantity}</p>
                                        </div>
                                        <button onClick={() => removeStone(idx)} className={styles.removeBtn}><X size={14} /></button>
                                    </div>
                                ))}
                                {selectedCharms.map((c, idx) => (
                                    <div key={`c-${idx}`} className={styles.selectedItemCard}>
                                        <img src={getFullImageUrl(c.image)} className={styles.selectedItemImg} />
                                        <div className={styles.selectedItemInfo}>
                                            <p className={styles.selectedItemName}>{c.name}</p>
                                            <p className={styles.selectedItemDetail}>{c.color} | x{c.quantity}</p>
                                        </div>
                                        <button onClick={() => removeCharm(idx)} className={styles.removeBtn}><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── ACTION BUTTONS ──────────────── */}
                        <motion.div {...fadeUp} className={styles.actions}>
                            <div className={styles.totalInfo}>
                                <span>Tổng cộng: {formatPrice((selectedWire?.price || 0) + selectedStones.reduce((a, b) => a + b.price, 0) + selectedCharms.reduce((a, b) => a + b.price * b.quantity, 0))}</span>
                            </div>
                            <button className={styles.btnFill} onClick={handleBuyIngredients}>
                                <ShoppingBag size={18} strokeWidth={1.5} />
                                MUA NGUYÊN LIỆU & ĐI ĐẾN GIỎ HÀNG
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── CONFIGURATION MODAL ─────────── */}
            <AnimatePresence>
                {configuringProduct && (
                    <div className={styles.modalOverlay} onClick={() => setConfiguringProduct(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={styles.modalContent}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className={styles.modalClose} onClick={() => setConfiguringProduct(null)}><X /></button>

                            <div className={styles.modalBody}>
                                <div className={styles.modalLeft}>
                                    <div className={styles.mainImgWrap}>
                                        <img src={modalImages[activeImg]} className={styles.modalImg} alt="" />
                                        {modalImages.length > 1 && (
                                            <>
                                                <button className={styles.prevBtn} onClick={() => setActiveImg(p => p === 0 ? modalImages.length - 1 : p - 1)}><ChevronLeft size={20} /></button>
                                                <button className={styles.nextBtn} onClick={() => setActiveImg(p => p === modalImages.length - 1 ? 0 : p + 1)}><ChevronRight size={20} /></button>
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.modalThumbnails}>
                                        {modalImages.map((img, i) => (
                                            <button
                                                key={i}
                                                className={`${styles.modalThumb} ${i === activeImg ? styles.modalThumbActive : ''}`}
                                                onClick={() => setActiveImg(i)}
                                            >
                                                <img src={img} alt="" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.modalRight}>
                                    <h4 className={styles.modalProdName}>{configuringProduct.productName}</h4>
                                    <div className={styles.modalMeta}>
                                        {(() => {
                                            const v = configuringProduct.variants.find(varnt => varnt.id === currentOptions.variantId);
                                            const price = v ? Number(v.extraPrice || 0) : Number(configuringProduct.basePrice || 0);
                                            const stock = v?.stockQuantity ?? v?.stock_quantity ?? v?.quantity ?? null;

                                            return (
                                                <>
                                                    <p className={styles.modalPrice}>{formatPrice(price)}</p>
                                                    {stock !== null ? (
                                                        <p className={`${styles.stockBadge} ${stock > 0 ? '' : styles.outOfStock}`}>
                                                            {stock > 0 ? `Còn lại: ${stock}` : 'Hết hàng'}
                                                        </p>
                                                    ) : (
                                                        <p className={styles.stockBadge}>Còn hàng</p>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>

                                    <div className={styles.optionsWrap}>
                                        {/* Color Selection */}
                                        {configType !== 'wire' && Array.from(new Set(configuringProduct.variants.map(v => v.color).filter(Boolean))).length > 0 && (
                                            <div className={styles.optionGroup}>
                                                <p className={styles.optionLabel}>Màu sắc</p>
                                                <div className={styles.optionList}>
                                                    {Array.from(new Set(configuringProduct.variants.map(v => v.color).filter(Boolean))).map(c => {
                                                        const match = configuringProduct.variants.find(v => v.color === c);
                                                        const stock = match?.stockQuantity ?? match?.stock_quantity ?? match?.quantity ?? 999;
                                                        const isAvailable = stock > 0;
                                                        return (
                                                            <button
                                                                key={c}
                                                                className={`${styles.optBtn} ${currentOptions.color === c ? styles.optBtnActive : ''} ${!isAvailable ? styles.optBtnDisabled : ''}`}
                                                                onClick={() => {
                                                                    const v = configuringProduct.variants.find(varnt => varnt.color === c && (configType === 'charm' || varnt.size === currentOptions.size));
                                                                    setCurrentOptions({ ...currentOptions, color: c, variantId: v?.id || currentOptions.variantId });
                                                                }}
                                                            >
                                                                {c}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Size Selection */}
                                        {configType === 'stone' && Array.from(new Set(configuringProduct.variants.map(v => v.size).filter(Boolean))).length > 0 && (
                                            <div className={styles.optionGroup}>
                                                <p className={styles.optionLabel}>Kích thước</p>
                                                <div className={styles.optionList}>
                                                    {Array.from(new Set(configuringProduct.variants.filter(v => v.color === currentOptions.color).map(v => v.size).filter(Boolean))).map(s => {
                                                        const v = configuringProduct.variants.find(varnt => varnt.color === currentOptions.color && varnt.size === s);
                                                        const stock = v?.stockQuantity ?? v?.stock_quantity ?? v?.quantity ?? 999;
                                                        const isAvailable = stock > 0;
                                                        return (
                                                            <button
                                                                key={s}
                                                                className={`${styles.optBtn} ${currentOptions.size === s ? styles.optBtnActive : ''} ${!isAvailable ? styles.optBtnDisabled : ''}`}
                                                                onClick={() => {
                                                                    setCurrentOptions({ ...currentOptions, size: s, variantId: v?.id || currentOptions.variantId });
                                                                }}
                                                            >
                                                                {s}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Fallback Variant Selection for Stone/Charm with no Color/Size */}
                                        {configType !== 'wire' &&
                                            Array.from(new Set(configuringProduct.variants.map(v => v.color).filter(Boolean))).length === 0 &&
                                            Array.from(new Set(configuringProduct.variants.map(v => v.size).filter(Boolean))).length === 0 &&
                                            configuringProduct.variants.length > 1 && (
                                                <div className={styles.optionGroup}>
                                                    <p className={styles.optionLabel}>Tùy chọn</p>
                                                    <div className={styles.optionList}>
                                                        {configuringProduct.variants.map(v => {
                                                            const stock = v?.stockQuantity ?? v?.stock_quantity ?? v?.quantity ?? 999;
                                                            return (
                                                                <button
                                                                    key={v.id}
                                                                    className={`${styles.optBtn} ${currentOptions.variantId === v.id ? styles.optBtnActive : ''} ${stock <= 0 ? styles.optBtnDisabled : ''}`}
                                                                    onClick={() => setCurrentOptions({ ...currentOptions, variantId: v.id })}
                                                                >
                                                                    {v.sku || `Mẫu #${v.id.slice(-4)}`} - {formatPrice(Number(v.extraPrice || 0))}
                                                                    {stock > 0 ? (stock < 999 ? ` (Còn ${stock})` : '') : ' (Hết hàng)'}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Variant Selection for Wire */}
                                        {configType === 'wire' && configuringProduct.variants.length > 0 && (
                                            <div className={styles.optionGroup}>
                                                <p className={styles.optionLabel}>Loại dây</p>
                                                <div className={styles.optionList}>
                                                    {configuringProduct.variants.map(v => {
                                                        const stock = v?.stockQuantity ?? v?.stock_quantity ?? v?.quantity ?? 999;
                                                        return (
                                                            <button
                                                                key={v.id}
                                                                className={`${styles.optBtn} ${currentOptions.variantId === v.id ? styles.optBtnActive : ''} ${stock <= 0 ? styles.optBtnDisabled : ''}`}
                                                                onClick={() => setCurrentOptions({ ...currentOptions, variantId: v.id })}
                                                            >
                                                                {(v.color || v.size) ? `${v.color || ''} ${v.size || ''}`.trim() : (v.sku || 'Loại cơ bản')} - {formatPrice(Number(v.extraPrice || 0))}
                                                                {stock > 0 ? (stock < 999 ? ` (Còn ${stock})` : '') : ' (Hết hàng)'}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Quantity Selection for Stone & Charm */}
                                        {(configType === 'charm' || configType === 'stone') && (
                                            <div className={styles.optionGroup}>
                                                <p className={styles.optionLabel}>Số lượng</p>
                                                <div className={styles.qtyControl}>
                                                    <button onClick={() => setCurrentOptions(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}><Minus size={14} /></button>
                                                    <span>{currentOptions.quantity}</span>
                                                    <button onClick={() => {
                                                        const v = configuringProduct.variants.find(vr => vr.id === currentOptions.variantId);
                                                        const stock = v?.stockQuantity ?? v?.stock_quantity ?? v?.quantity ?? 999;
                                                        setCurrentOptions(prev => ({ ...prev, quantity: Math.min(stock, prev.quantity + 1) }));
                                                    }}><Plus size={14} /></button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className={styles.addBtn}
                                        onClick={handleAddConfigured}
                                        disabled={(() => {
                                            const v = configuringProduct?.variants?.find(vr => vr.id === currentOptions.variantId);
                                            const stock = v?.stockQuantity ?? v?.stock_quantity ?? v?.quantity ?? 999;
                                            return stock <= 0;
                                        })()}
                                    >
                                        {(() => {
                                            const v = configuringProduct?.variants?.find(vr => vr.id === currentOptions.variantId);
                                            const stock = v?.stockQuantity ?? v?.stock_quantity ?? v?.quantity ?? 999;
                                            return stock > 0 ? 'THÊM VÀO THIẾT KẾ' : 'HIỆN ĐANG HẾT HÀNG';
                                        })()}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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

