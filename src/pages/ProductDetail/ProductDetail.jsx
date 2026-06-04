import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
    ChevronLeft, ChevronRight, ZoomIn, Heart, Star,
    Truck, Hand, Gift, Shield, ChevronDown, ShoppingCart,
    Leaf, Zap, RefreshCcw, Package
} from 'lucide-react';
import styles from './ProductDetail.module.css';
import { getProductById, getProducts, getProductVariantById, getAllProductVariants } from '../../services/productService';
import { getProductCategories } from '../../services/categoryService';
import { getProductMaterials } from '../../services/materialService';
import { addToCart } from '../../services/cartService';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

// ─── Animation preset ─────────────────────────────────────────────────────────
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.8 },
};

const fadeUpDelay = (d = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.8, delay: d },
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProductDetail() {
    const { refreshCart } = useCart();
    const { showToast } = useToast();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const productId = searchParams.get('id');

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);

    const [activeImg, setActiveImg] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('shipping');
    const [wishlisted, setWishlisted] = useState(false);
    const [wishlistRelated, setWishlistRelated] = useState({});

    const [productVariants, setProductVariants] = useState([]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);

    const [variant, setVariant] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const loadDetail = async () => {
            if (!productId) return;
            try {
                setLoading(true);
                const [data, catData, matData, allProducts, allVariants] = await Promise.all([
                    getProductById(productId),
                    getProductCategories(),
                    getProductMaterials(),
                    getProducts(),
                    getAllProductVariants()
                ]);
                setProduct(data);
                setCategories(catData || []);
                setMaterials(matData || []);

                // Tìm tất cả các variant thuộc về product này
                const variantsForProduct = allVariants?.filter(v =>
                    v.productVariantMappings?.some(m => m.productId === productId)
                ) || [];

                setProductVariants(variantsForProduct);

                // Lấy danh sách size và color duy nhất
                const sizes = [...new Set(variantsForProduct.map(v => v.size))].filter(Boolean);
                const colors = [...new Set(variantsForProduct.map(v => v.color))].filter(Boolean);

                setAvailableSizes(sizes);
                setAvailableColors(colors);

                if (variantsForProduct.length > 0) {
                    const firstV = variantsForProduct[0];
                    setVariant(firstV);
                    if (firstV.size) setSelectedSize(firstV.size);
                    if (firstV.color) setSelectedColor(firstV.color);
                } else if (data.productVariantMappings?.length > 0) {
                    try {
                        const vId = data.productVariantMappings[0].variantId;
                        const vData = await getProductVariantById(vId);
                        setVariant(vData);
                        setProductVariants([vData]);
                        if (vData.size) {
                            setAvailableSizes([vData.size]);
                            setSelectedSize(vData.size);
                        }
                        if (vData.color) {
                            setAvailableColors([vData.color]);
                            setSelectedColor(vData.color);
                        }
                    } catch (e) { }
                }

                const related = allProducts
                    .filter(p => p.id !== productId)
                    .slice(0, 4);
                setRelatedProducts(related);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDetail();
    }, [productId]);

    const getFullImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const images = (variant?.productVariantMappings?.length > 0)
        ? variant.productVariantMappings.flatMap(m =>
            m.product?.productImages?.map(img => getFullImageUrl(img.imageUrl)) || []
        )
        : (product?.productImages?.length > 0)
            ? product.productImages.map(img => getFullImageUrl(img.imageUrl))
            : [getFullImageUrl(product?.thumbnail)].filter(Boolean);

    // Bỏ qua các ảnh trùng lặp nếu có
    const uniqueImages = [...new Set(images)];

    const prevImg = () => setActiveImg((p) => (p === 0 ? uniqueImages.length - 1 : p - 1));
    const nextImg = () => setActiveImg((p) => (p === uniqueImages.length - 1 ? 0 : p + 1));

    const getCategoryName = (id) => categories.find(c => c.id === id)?.categoryName || 'Sản phẩm Cát';
    const getMaterialName = (id) => materials.find(m => m.id === id)?.materialName || 'Đá tự nhiên';

    const handleAddToCart = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            showToast('Vui lòng đăng nhập để thêm vào giỏ hàng', 'error');
            navigate('/login');
            return;
        }

        if (!variant) {
            showToast('Vui lòng chọn phiên bản sản phẩm (Size/Màu sắc)', 'error');
            return;
        }

        try {
            setAdding(true);
            await addToCart(variant.id, quantity);
            await refreshCart();
            showToast('Đã thêm sản phẩm vào giỏ hàng thành công!');
        } catch (error) {
            console.error("Add to cart error:", error);
            showToast(typeof error === 'string' ? error : 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.', 'error');
        } finally {
            setAdding(false);
        }
    };

    const handleBuyNow = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            showToast('Vui lòng đăng nhập để mua hàng', 'error');
            navigate('/login');
            return;
        }

        if (!variant) {
            showToast('Vui lòng chọn phiên bản sản phẩm (Size/Màu sắc)', 'error');
            return;
        }

        try {
            setAdding(true);
            await addToCart(variant.id, quantity);
            await refreshCart();
            navigate('/cart');
        } catch (error) {
            console.error("Buy now error:", error);
            showToast(typeof error === 'string' ? error : 'Có lỗi xảy ra. Vui lòng thử lại.', 'error');
        } finally {
            setAdding(false);
        }
    };



    const uspItems = [
        { icon: <Truck size={28} strokeWidth={1.5} />, title: 'Miễn phí giao hàng', desc: 'Đơn từ 500k' },
        { icon: <Hand size={28} strokeWidth={1.5} />, title: 'Handmade thủ công', desc: 'Chế tác tỉ mỉ' },
        { icon: <Gift size={28} strokeWidth={1.5} />, title: 'Hộp quà cao cấp', desc: 'Miễn phí kèm đơn' },
        { icon: <Shield size={28} strokeWidth={1.5} />, title: 'Bảo hành trọn đời', desc: 'Dây đeo & lắp' },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className={styles.page}>

            {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
            <motion.div className={styles.breadcrumbWrap} {...fadeUp}>
                <div className={styles.container}>
                    <nav className={styles.breadcrumb}>
                        <Link to="/" className={styles.breadcrumbLink}>Trang chủ</Link>
                        <span className={styles.breadcrumbSep}>&gt;</span>
                        <Link to="/collection" className={styles.breadcrumbLink}>Bộ sưu tập</Link>
                        <span className={styles.breadcrumbSep}>&gt;</span>
                        <Link to="/collection" className={styles.breadcrumbLink}>{getCategoryName(product.categoryId)}</Link>
                        <span className={styles.breadcrumbSep}>&gt;</span>
                        <span className={styles.breadcrumbCurrent}>{product.productName}</span>
                    </nav>
                </div>
            </motion.div>

            {/* ── PRODUCT DETAIL ─────────────────────────────────────────────── */}
            <section className={styles.productSection}>
                <div className={styles.container}>
                    <div className={styles.productGrid}>

                        {/* ─ LEFT: GALLERY ─────────────────────────────────────────── */}
                        <motion.div className={styles.gallery} {...fadeUp}>
                            <div className={styles.mainImgWrap}>
                                <img
                                    src={uniqueImages[activeImg] || product.thumbnail}
                                    alt={product.productName}
                                    className={styles.mainImg}
                                />
                                <button className={styles.zoomBtn} aria-label="Zoom">
                                    <ZoomIn size={20} />
                                </button>
                                {uniqueImages.length > 1 && (
                                    <>
                                        <button className={styles.prevBtn} onClick={prevImg} aria-label="Previous">
                                            <ChevronLeft size={22} />
                                        </button>
                                        <button className={styles.nextBtn} onClick={nextImg} aria-label="Next">
                                            <ChevronRight size={22} />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className={styles.thumbnails}>
                                {uniqueImages.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.thumbnail} ${i === activeImg ? styles.thumbnailActive : ''}`}
                                        onClick={() => setActiveImg(i)}
                                        aria-label={`Ảnh ${i + 1}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${i + 1}`} />
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─ RIGHT: PRODUCT INFO ───────────────────────────────────── */}
                        <motion.div className={styles.productInfo} {...fadeUpDelay(0.15)}>
                            {/* Name */}
                            <h1 className={styles.productName}>
                                {product.productName}
                            </h1>

                            {/* Rating */}
                            <div className={styles.ratingRow}>
                                <div className={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#D8B27D" color="#D8B27D" />
                                    ))}
                                </div>
                                <span className={styles.ratingScore}>4.9</span>
                                <span className={styles.ratingCount}>(Đánh giá mới)</span>
                            </div>

                            {/* Price */}
                            <p className={styles.price}>
                                {(Number(variant ? (variant.extraPrice ?? 0) : product.basePrice)).toLocaleString('vi-VN')}
                                <span>đ</span>
                            </p>

                            {/* Description */}
                            <p className={styles.productDesc}>
                                {product.description}
                            </p>

                            {/* Quick Info Card */}
                            <div className={styles.quickInfoCard}>
                                <div className={styles.quickInfoRow}>
                                    <span className={styles.quickInfoIcon}>💎</span>
                                    <div>
                                        <span className={styles.quickInfoLabel}>Loại đá</span>
                                        <span className={styles.quickInfoValue}>{getMaterialName(product.materialId)}</span>
                                    </div>
                                </div>
                                <div className={styles.quickInfoDivider} />
                                <div className={styles.quickInfoRow}>
                                    <span className={styles.quickInfoIcon}>✨</span>
                                    <div>
                                        <span className={styles.quickInfoLabel}>Tình trạng</span>
                                        <span className={styles.quickInfoValue}>
                                            {variant?.stockQuantity > 0 ? `Còn hàng (${variant.stockQuantity})` : 'Hết hàng'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Color Selector */}
                            <div className={styles.selectorSection}>
                                <p className={styles.selectorLabel}>Chọn màu sắc</p>
                                <div className={styles.sizeButtons}>
                                    {availableColors.length > 0 ? (
                                        availableColors.map((c) => (
                                            <button
                                                key={c}
                                                className={`${styles.sizeBtn} ${selectedColor === c ? styles.sizeBtnActive : ''}`}
                                                onClick={() => {
                                                    setSelectedColor(c);
                                                    // Tìm variant có color này (nếu có combo size + color thì tìm chính xác hơn)
                                                    const match = productVariants.find(v => v.color === c && (selectedSize ? v.size === selectedSize : true))
                                                        || productVariants.find(v => v.color === c);
                                                    if (match) setVariant(match);
                                                }}
                                            >
                                                {c}
                                            </button>
                                        ))
                                    ) : (
                                        <span className={styles.noInfoText}>Đang cập nhật...</span>
                                    )}
                                </div>
                            </div>

                            {/* Size Selector */}
                            <div className={styles.selectorSection}>
                                <p className={styles.selectorLabel}>Chọn size vòng</p>
                                <div className={styles.sizeButtons}>
                                    {availableSizes.length > 0 ? (
                                        availableSizes.map((s) => (
                                            <button
                                                key={s}
                                                className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeBtnActive : ''}`}
                                                onClick={() => {
                                                    setSelectedSize(s);
                                                    // Tìm variant có size này
                                                    const match = productVariants.find(v => v.size === s && (selectedColor ? v.color === selectedColor : true))
                                                        || productVariants.find(v => v.size === s);
                                                    if (match) setVariant(match);
                                                }}
                                            >
                                                {s}
                                            </button>
                                        ))
                                    ) : (
                                        <span className={styles.noInfoText}>Đang cập nhật...</span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className={styles.selectorSection}>
                                <p className={styles.selectorLabel}>Số lượng</p>
                                <div className={styles.quantityRow}>
                                    <div className={styles.quantityControl}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            aria-label="Giảm"
                                        >−</button>
                                        <span className={styles.qtyValue}>{quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => setQuantity((q) => q + 1)}
                                            aria-label="Tăng"
                                        >+</button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.actionButtons}>
                                <div className={styles.actionRow}>
                                    <button
                                        className={styles.btnAddCart}
                                        onClick={handleAddToCart}
                                        disabled={adding || (variant && variant.stockQuantity <= 0)}
                                    >
                                        <ShoppingCart size={18} />
                                        {adding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                                    </button>
                                    <button
                                        className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlistActive : ''}`}
                                        onClick={() => setWishlisted((w) => !w)}
                                        aria-label="Wishlist"
                                    >
                                        <Heart size={20} fill={wishlisted ? '#7A1E1E' : 'none'} />
                                    </button>
                                </div>
                                <button
                                    className={styles.btnBuyNow}
                                    onClick={handleBuyNow}
                                    disabled={adding || (variant && variant.stockQuantity <= 0)}
                                >
                                    {variant && variant.stockQuantity <= 0 ? 'Hết hàng' : 'Mua ngay'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── USP SECTION ────────────────────────────────────────────────── */}
            <motion.section className={styles.uspSection} {...fadeUp}>
                <div className={styles.container}>
                    <div className={styles.uspGrid}>
                        {uspItems.map((item, i) => (
                            <motion.div key={i} className={styles.uspItem} {...fadeUpDelay(i * 0.1)}>
                                <div className={styles.uspIcon}>{item.icon}</div>
                                <p className={styles.uspTitle}>{item.title}</p>
                                <p className={styles.uspDesc}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── TAB SECTION ────────────────────────────────────────────────── */}
            <motion.section className={styles.tabSection} {...fadeUp}>
                <div className={styles.container}>
                    <div className={styles.tabHeader}>
                        <button
                            className={`${styles.tab} ${activeTab === 'shipping' ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab('shipping')}
                        >
                            Thông tin giao hàng
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'detail' ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab('detail')}
                        >
                            Chi tiết sản phẩm
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'shipping' && (
                            <motion.div
                                key="shipping"
                                className={styles.tabContent}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.tabGrid}>
                                    <div>
                                        <h3 className={styles.tabContentTitle}>THÔNG TIN VẬN CHUYỂN VÀ HOÀN TRẢ</h3>
                                        <div className={styles.tabBlock}>
                                            <p className={styles.tabSubTitle}>Giao hàng</p>
                                            <ul className={styles.tabList}>
                                                <li>• Nội thành: <strong>Giao 1–2 ngày</strong>, Miễn phí giao hàng toàn quốc khi giảm kết hợp tý khi mua combo</li>
                                                <li>• Tỉnh khác: Giao 3–7 ngày, 30.000-50.000đ phí vận chuyển</li>
                                                <li>*** Thời gian chờ xử lý đơn hàng đi từ ngày làm việc; khách vui lòng đợi thêm thông báo từ xưởng</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={styles.tabSubTitle}>Chính sách hoàn trả</p>
                                        <ul className={styles.tabList}>
                                            <li>• Hoàn trả trong 7 ngày với sản phẩm lỗi từ nhà sản xuất. Chúng tôi không chấp nhận hoàn trả sản phẩm đã qua sử dụng, trừ trường hợp sản phẩm có lỗi sản xuất.</li>
                                            <li>• Đối với sản phẩm có lỗi, chúng tôi sẽ thay thế hoặc hoàn tiền 100% theo lựa chọn của bạn.</li>
                                            <li>• Chúng tôi không bảo hành các trường hợp đứt dây do người dùng tự sử dụng chưa cẩn thận, chi phí thay dây sẽ thu theo bảng giá khuyến mãi.</li>
                                            <li>• Vui lòng liên hệ chúng tôi trong vòng 24 giờ kể từ khi nhận hàng để kích hoạt quy trình hoàn tiền toàn bộ.</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'detail' && (
                            <motion.div
                                key="detail"
                                className={styles.tabContent}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.tabGrid}>
                                    <div>
                                        <h3 className={styles.tabContentTitle}>CHI TIẾT SẢN PHẨM</h3>
                                        <ul className={styles.tabList}>
                                            <li>• <strong>Loại đá:</strong> Thạch anh hồng (Rose Quartz) tự nhiên 100%</li>
                                            <li>• <strong>Kích thước hạt:</strong> 8mm</li>
                                            <li>• <strong>Charm:</strong> Bạc 925 xi vàng 14K</li>
                                            <li>• <strong>Dây:</strong> Đàn hồi cao cấp, chịu lực 50kg</li>
                                            <li>• <strong>Màu sắc:</strong> Hồng nhạt tự nhiên, màu sắc có thể thay đổi nhẹ theo từng viên đá</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className={styles.tabSubTitle}>Đặc điểm nổi bật</p>
                                        <ul className={styles.tabList}>
                                            <li>• Chế tác thủ công 100%, không có hai chiếc giống nhau</li>
                                            <li>• Đá được kiểm định chứng chỉ nguồn gốc tự nhiên</li>
                                            <li>• Phù hợp đeo hàng ngày, không gây dị ứng</li>
                                            <li>• Kèm hộp quà cao cấp, thẻ ý nghĩa đá và túi đựng vòng</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.section>

            {/* ── RELATED PRODUCTS ───────────────────────────────────────────── */}
            <motion.section className={styles.relatedSection} {...fadeUp}>
                <div className={styles.container}>
                    <div className={styles.relatedHeader}>
                        <h2 className={styles.relatedTitle}>SẢN PHẨM LIÊN QUAN</h2>
                        <div className={styles.relatedDivider} />
                    </div>
                    <div className={styles.relatedGrid}>
                        {relatedProducts.map((p, i) => (
                            <motion.div key={p.id} className={styles.productCard} {...fadeUpDelay(i * 0.1)}>
                                <Link to={`/product-detail?id=${p.id}`} className={styles.cardLinkFull}>
                                    <div className={styles.cardImgWrap}>
                                        <img src={getFullImageUrl(p.thumbnail)} alt={p.productName} className={styles.cardImg} />
                                    </div>
                                </Link>
                                <button
                                    className={`${styles.cardWishlist} ${wishlistRelated[p.id] ? styles.cardWishlistActive : ''}`}
                                    onClick={() => setWishlistRelated(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                                    aria-label="Wishlist"
                                >
                                    <Heart size={18} fill={wishlistRelated[p.id] ? '#7A1E1E' : 'none'} />
                                </button>
                                <div className={styles.cardBody}>
                                    <p className={styles.cardStone}>{getMaterialName(p.materialId)}</p>
                                    <Link to={`/product-detail?id=${p.id}`} className={styles.cardNameLink}>
                                        <h3 className={styles.cardName}>{p.productName}</h3>
                                    </Link>
                                    <p className={styles.cardPrice}>{Number(p.basePrice).toLocaleString('vi-VN')}đ</p>
                                    <Link to={`/product-detail?id=${p.id}`} className={styles.cardBtn}>
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── BRAND BENEFIT BANNER ───────────────────────────────────────── */}
            <motion.section className={styles.brandBanner} {...fadeUp}>
                <div className={styles.container}>
                    <h3 className={styles.brandBannerTitle}>Trao yêu thương, gửi năng lượng tích cực</h3>
                    <div className={styles.brandBenefitGrid}>
                        {[
                            { icon: <Leaf size={28} strokeWidth={1.5} />, title: 'Đá tự nhiên 100%', desc: 'Nguồn gốc rõ ràng, kiểm định' },
                            { icon: <Zap size={28} strokeWidth={1.5} />, title: 'Thiết kế độc quyền', desc: 'Mỗi chiếc là một tác phẩm' },
                            { icon: <RefreshCcw size={28} strokeWidth={1.5} />, title: 'Miễn phí đổi trả', desc: 'Trong vòng 7 ngày' },
                            { icon: <Package size={28} strokeWidth={1.5} />, title: 'Bảo hành dây đeo', desc: 'Trọn đời miễn phí' },
                        ].map((b, i) => (
                            <motion.div key={i} className={styles.brandBenefitItem} {...fadeUpDelay(i * 0.1)}>
                                <div className={styles.brandBenefitIcon}>{b.icon}</div>
                                <p className={styles.brandBenefitTitle}>{b.title}</p>
                                <p className={styles.brandBenefitDesc}>{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

        </div >
    );
}
