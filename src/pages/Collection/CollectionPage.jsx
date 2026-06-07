import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    Heart, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight,
    Eye, SlidersHorizontal, X, Gem, Leaf, Sparkles, ShieldCheck,
} from 'lucide-react';
import styles from './CollectionPage.module.css';
import { getProducts, filterProducts, filterProductVariants, searchProductsByName } from '../../services/productService';
import { getProductCategories } from '../../services/categoryService';
import { getProductMaterials } from '../../services/materialService';
import { addToCart } from '../../services/cartService';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

// ─── Import Logo ────────────────────────────────────────────────────────────
import heroBannerImg from '../../assets/Ảnh UI/ảnh chi tiết/home ne..png';
import fallbackProductImg from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/all0.jpg';

// ─── Color Picker Data ───────────────────────────────────────────────────────
const colorOptions = [
    { label: 'Đỏ', value: 'red', hex: '#C0392B' },
    { label: 'Đen', value: 'black', hex: '#1A1A1A' },
    { label: 'Xanh', value: 'blue', hex: '#2980B9' },
    { label: 'Trắng', value: 'white', hex: '#F0F0F0' },
    { label: 'Vàng', value: 'yellow', hex: '#F1C40F' },
    { label: 'Nâu', value: 'brown', hex: '#795548' },
];

// ─── Features Data ─────────────────────────────────────────────────────────
const features = [
    { icon: <Gem size={28} strokeWidth={1.5} />, title: 'Đá tự nhiên 100%', subtitle: 'Nguồn gốc kiểm định rõ ràng' },
    { icon: <Sparkles size={28} strokeWidth={1.5} />, title: 'Năng lượng thuần khiết', subtitle: 'Khai quang & thanh lọc' },
    { icon: <Leaf size={28} strokeWidth={1.5} />, title: 'Thiết kế tinh xảo', subtitle: 'Thủ công tinh tế & bền đẹp' },
    { icon: <ShieldCheck size={28} strokeWidth={1.5} />, title: 'Bảo hành năng lượng trọn đời', subtitle: 'Cam kết chất lượng trọn đời' },
];

// ─── Stats ─────────────────────────────────────────────────────────────────
const stats = [
    { value: '100%', label: 'Đá tự nhiên' },
    { value: '5.000+', label: 'Khách hàng tin tưởng' },
    { value: '3 năm+', label: 'Kinh nghiệm' },
    { value: '1 đổi 1', label: 'Bảo hành' },
];

// ─── Animation variant ───────────────────────────────────────────────
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.8 },
};

// ─── Main Component ────────────────────────────────────────────────────────
const CollectionPage = () => {
    const navigate = useNavigate();
    const { refreshCart } = useCart();
    const { showToast } = useToast();

    // Map tên màu sang mã HEX để hiển thị swatch
    const colorMap = {
        'Đỏ': '#C0392B',
        'Đen': '#2C3E50',
        'Trắng': '#FFFFFF',
        'Xanh': '#2980B9',
        'Vàng': '#F1C40F',
        'Nâu': '#8D6E63',
        'Tím': '#8E44AD',
        'Hồng': '#FF80AB',
        'Xanh lá': '#27AE60',
        'Trong suốt': 'transparent'
    };
    // API State
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter state
    const [selectedCollection, setSelectedCollection] = useState(''); // Category ID (client)
    const [selectedStones, setSelectedStones] = useState([]); // Material IDs -> stoneType
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedColor, setSelectedColor] = useState('');        // color
    const [selectedStoneColor, setSelectedStoneColor] = useState(''); // stoneColor
    const [selectedSize, setSelectedSize] = useState('');          // size
    const [sortBy, setSortBy] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);

    const ITEMS_PER_PAGE = 9;

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [productData, catData, matData] = await Promise.all([
                    getProducts(),
                    getProductCategories(),
                    getProductMaterials()
                ]);
                setProducts(Array.isArray(productData) ? productData : (productData?.products || []));
                setCategories(Array.isArray(catData) ? catData : (catData?.categories || []));
                setMaterials(Array.isArray(matData) ? matData : (matData?.materials || []));
            } catch (error) {
                console.error("Error loading collection data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Toggle stone checkbox
    const handleStoneToggle = (materialId) => {
        setSelectedStones(prev =>
            prev.includes(materialId) ? prev.filter(s => s !== materialId) : [...prev, materialId]
        );
        setCurrentPage(1);
    };

    // Toggle BST (click lần 2 để bỏ chọn)
    const handleCollectionToggle = (id) => {
        setSelectedCollection(prev => prev === id ? '' : id);
        setCurrentPage(1);
    };

    // Toggle giá (click lần 2 để bỏ chọn)
    const handlePriceToggle = (value) => {
        setSelectedPrice(prev => prev === value ? '' : value);
        setCurrentPage(1);
    };

    // Clear all filters
    const handleClearFilters = () => {
        setSelectedCollection('');
        setSelectedStones([]);
        setSelectedPrice('');
        setSelectedColor('');
        setSelectedStoneColor('');
        setSelectedSize('');
        setCurrentPage(1);
    };

    // Toggle wishlist
    const handleWishlistToggle = (id) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
        );
    };

    const getFullImageUrl = (url) => {
        if (!url) return fallbackProductImg;
        if (url.startsWith('http')) return url;
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        const fetchFiltered = async () => {
            const hasFilters = searchKeyword || selectedCollection || selectedPrice ||
                selectedStones.length > 0 || selectedColor || selectedStoneColor || selectedSize || sortBy !== 'newest';

            if (!hasFilters) {
                console.log("[Filter] No active filters, showing all products");
                setFilteredResults(products);
                return;
            }

            setFilterLoading(true);
            try {
                let initialData = [];

                if (searchKeyword) {
                    console.log("[Filter] Searching by keyword:", searchKeyword);
                    const searchData = await searchProductsByName(searchKeyword);
                    initialData = Array.isArray(searchData) ? searchData : (searchData?.products || []);
                } else {
                    // Map màu sang tiếng Anh cho API (dựa trên Swagger mẫu)
                    const vntoenColor = {
                        'Đỏ': 'Red', 'Đen': 'Black', 'Trắng': 'White', 'Xanh': 'Blue',
                        'Vàng': 'Yellow', 'Nâu': 'Brown', 'Tím': 'Purple', 'Hồng': 'Pink', 'Xanh lá': 'Green'
                    };

                    const params = {};
                    if (selectedStones.length > 0) {
                        const mat = materials.find(m => m.id === selectedStones[0]);
                        if (mat) params.stoneType = mat.materialName;
                    }
                    if (selectedColor) params.color = vntoenColor[selectedColor] || selectedColor;
                    if (selectedStoneColor) params.stoneColor = vntoenColor[selectedStoneColor] || selectedStoneColor;
                    if (selectedSize) params.size = selectedSize;

                    if (selectedPrice === 'under80') {
                        params.maxPrice = 80000;
                    } else if (selectedPrice === '80to120') {
                        params.minPrice = 80000;
                        params.maxPrice = 120000;
                    } else if (selectedPrice === '120to200') {
                        params.minPrice = 120000;
                        params.maxPrice = 200000;
                    }

                    console.log("[Filter] >>> REQUEST PARAMS:", params);
                    const filteredRaw = await filterProducts(params);
                    console.log("[Filter] <<< API RESPONSE:", filteredRaw);

                    initialData = Array.isArray(filteredRaw) ? filteredRaw : (filteredRaw?.products || filteredRaw?.data || []);
                }

                let results = initialData;

                // Lọc theo danh mục (BST) - API ko hỗ trợ nên lọc client
                if (selectedCollection) {
                    results = results.filter(p => p.categoryId === selectedCollection);
                }

                // Nếu là search, lọc tiếp các tiêu chuẩn khác ở client
                if (searchKeyword) {
                    if (selectedStones.length > 0) {
                        results = results.filter(p =>
                            p.product_materials?.some(m => selectedStones.includes(m.material_id || m.materialId))
                        );
                    }
                    if (selectedPrice) {
                        results = results.filter(p => {
                            const price = Number(p.basePrice);
                            if (selectedPrice === 'under80') return price < 80000;
                            if (selectedPrice === '80to120') return price >= 80000 && price <= 120000;
                            if (selectedPrice === '120to200') return price >= 120000 && price <= 200000;
                            return true;
                        });
                    }
                }

                // Sắp xếp
                if (sortBy === 'priceAsc') results = [...results].sort((a, b) => Number(a.basePrice) - Number(b.basePrice));
                else if (sortBy === 'priceDesc') results = [...results].sort((a, b) => Number(b.basePrice) - Number(a.basePrice));

                console.log("[Filter] Result count:", results.length);
                setFilteredResults(Array.from(new Map(results.map(p => [p.id, p])).values()));
            } catch (error) {
                console.error("[Filter] CRITICAL ERROR:", error);
                setFilteredResults(products);
            } finally {
                setFilterLoading(false);
            }
        };

        const timer = setTimeout(fetchFiltered, 400);
        return () => clearTimeout(timer);
    }, [searchKeyword, selectedCollection, selectedPrice, sortBy, products, selectedStones, selectedColor, selectedStoneColor, selectedSize]);

    const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredResults.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const formatPrice = (price) =>
        (Number(price) || 0).toLocaleString('vi-VN') + 'đ';

    const sortLabels = {
        newest: 'Mới nhất',
        bestseller: 'Bán chạy',
        priceAsc: 'Giá tăng dần',
        priceDesc: 'Giá giảm dần',
    };

    const getCategoryName = (id) => categories.find(c => c.id === id)?.categoryName || 'Sản phẩm Cát';
    const getMaterialName = (id) => materials.find(m => m.id === id)?.materialName || 'Đá tự nhiên';

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            showToast('Vui lòng đăng nhập để thêm vào giỏ hàng', 'error');
            navigate('/login');
            return;
        }

        // Nếu sản phẩm có variantId (từ filter API)
        if (product.variantId) {
            try {
                await addToCart(product.variantId, 1);
                await refreshCart();
                showToast('Đã thêm sản phẩm vào giỏ hàng!');
            } catch (err) {
                showToast(err || 'Có lỗi xảy ra', 'error');
            }
            return;
        }

        // Nếu không có variantId, điều hướng tới trang chi tiết để chọn
        navigate(`/product-detail?id=${product.id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>

            {/* ── HERO BANNER ─────────────────────────────────────────────── */}
            <motion.section {...fadeUp} className={styles.hero}>
                <div className={styles.heroImageContainer}>
                    <img src={heroBannerImg} alt="Bộ sưu tập vòng Cát" className={styles.heroBgImage} />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <div className={styles.heroInner}>
                        <div className={styles.heroText}>
                            <h1 className={styles.heroTitle}>Bộ sưu tập <span className={styles.heroTitleAccent}>Cát</span></h1>
                            <p className={styles.heroDesc}>
                                Chọn chiếc vòng phù hợp với năng lượng và phong cách của bạn.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={styles.featuresSection}
            >
                <div className={styles.featuresInner}>
                    <div className={styles.featureBar}>
                        {features.map((feat, i) => (
                            <div key={i} className={styles.featureItem}>
                                <div className={styles.featureIcon}>{feat.icon}</div>
                                <div className={styles.featureInfo}>
                                    <p className={styles.featureTitle}>{feat.title}</p>
                                    <p className={styles.featureSubtitle}>{feat.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── COLLECTION AREA ─────────────────────────────────────────── */}
            <section className={styles.collectionArea}>
                <div className={styles.collectionInner}>

                    {/* Mobile Filter Toggle */}
                    <button
                        className={styles.mobileFilterBtn}
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    >
                        <SlidersHorizontal size={16} />
                        Bộ lọc
                    </button>

                    {/* ── SIDEBAR ──────────────────────────────────── */}
                    <aside
                        className={`${styles.sidebar} ${isMobileFilterOpen ? styles.sidebarOpen : ''}`}
                        data-lenis-prevent
                    >
                        <div className={styles.sidebarHeader}>
                            <span className={styles.sidebarHeaderTitle}>
                                <SlidersHorizontal size={14} />
                                BỘ LỌC
                            </span>
                            <button
                                className={styles.sidebarCloseBtn}
                                onClick={() => setIsMobileFilterOpen(false)}
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <p className={styles.sidebarSubtitle}>Chọn bộ lọc sản phẩm để tìm kiếm phiên bản ưng ý nhất</p>

                        {/* Collection Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Bộ sưu tập</h3>
                            <div className={styles.categoryList}>
                                {categories.map(col => (
                                    <button
                                        key={col.id}
                                        className={`${styles.categoryOption} ${selectedCollection === col.id ? styles.active : ''}`}
                                        onClick={() => handleCollectionToggle(col.id)}
                                    >
                                        <span className={styles.radioDot}></span>
                                        {col.categoryName}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stone Type Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Chất liệu đá</h3>
                            <div className={styles.materialGrid}>
                                {materials.map(stone => (
                                    <button
                                        key={stone.id}
                                        className={`${styles.materialBtn} ${selectedStones.includes(stone.id) ? styles.active : ''}`}
                                        onClick={() => handleStoneToggle(stone.id)}
                                    >
                                        {stone.materialName}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Màu sắc dây</h3>
                            <div className={styles.swatchGrid}>
                                {['Đỏ', 'Đen', 'Trắng', 'Xanh', 'Vàng', 'Nâu', 'Tím', 'Hồng'].map(c => (
                                    <button
                                        key={c}
                                        className={`${styles.swatchBtn} ${selectedColor === c ? styles.active : ''}`}
                                        onClick={() => setSelectedColor(prev => prev === c ? '' : c)}
                                        title={c}
                                    >
                                        <div
                                            className={styles.swatchColor}
                                            style={{ backgroundColor: colorMap[c] || '#ddd' }}
                                        ></div>
                                        <span className={styles.swatchLabel}>{c}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stone Color Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Màu sắc đá</h3>
                            <div className={styles.swatchGrid}>
                                {['Đỏ', 'Xanh', 'Trắng', 'Tím', 'Vàng', 'Xanh lá', 'Đen', 'Hồng'].map(c => (
                                    <button
                                        key={c}
                                        className={`${styles.swatchBtn} ${selectedStoneColor === c ? styles.active : ''}`}
                                        onClick={() => setSelectedStoneColor(prev => prev === c ? '' : c)}
                                        title={c}
                                    >
                                        <div
                                            className={styles.swatchColor}
                                            style={{ backgroundColor: colorMap[c] || '#ddd' }}
                                        ></div>
                                        <span className={styles.swatchLabel}>{c}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Kích thước</h3>
                            <div className={styles.sizeGrid}>
                                {['13cm', '14cm', '15cm', '16cm', '17cm', '18cm', 'S', 'M', 'L'].map(s => (
                                    <button
                                        key={s}
                                        className={`${styles.sizeBtn} ${selectedSize === s ? styles.active : ''}`}
                                        onClick={() => setSelectedSize(prev => prev === s ? '' : s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Khoảng giá</h3>
                            <div className={styles.priceList}>
                                {[
                                    { label: 'Dưới 80,000đ', value: 'under80' },
                                    { label: '80,000đ - 120,000đ', value: '80to120' },
                                    { label: '120,000đ - 200,000đ', value: '120to200' },
                                ].map(price => (
                                    <button
                                        key={price.value}
                                        className={`${styles.priceOption} ${selectedPrice === price.value ? styles.active : ''}`}
                                        onClick={() => handlePriceToggle(price.value)}
                                    >
                                        <div className={styles.checkIcon}>
                                            {selectedPrice === price.value && <div className={styles.checkDot}></div>}
                                        </div>
                                        {price.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className={styles.clearFilterBtn} onClick={handleClearFilters}>
                            <span>Xóa tất cả bộ lọc</span>
                            <X size={14} />
                        </button>
                    </aside>

                    {/* ── PRODUCT AREA ─────────────────────────────── */}
                    <div className={styles.productArea}>

                        {/* Search Bar */}
                        <div className={styles.searchBarWrapper}>
                            <div className={styles.searchInner}>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                {searchKeyword && (
                                    <button
                                        className={styles.searchClear}
                                        onClick={() => setSearchKeyword('')}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Product Header */}
                        <div className={styles.productHeader}>
                            <div className={styles.productHeaderLeft}>
                                <h2 className={styles.productHeaderTitle}>Bộ sưu tập Cát</h2>
                                <p className={styles.productHeaderCount}>{filteredResults.length} sản phẩm</p>
                            </div>
                            <div className={styles.sortWrapper}>
                                <button
                                    className={styles.sortBtn}
                                    onClick={() => setSortOpen(!sortOpen)}
                                >
                                    <span>{sortLabels[sortBy]}</span>
                                    <ChevronDown size={16} className={`${styles.sortChevron} ${sortOpen ? styles.sortChevronOpen : ''}`} />
                                </button>
                                {sortOpen && (
                                    <div className={styles.sortDropdown}>
                                        {Object.entries(sortLabels).map(([key, label]) => (
                                            <button
                                                key={key}
                                                className={`${styles.sortOption} ${sortBy === key ? styles.sortOptionActive : ''}`}
                                                onClick={() => { setSortBy(key); setSortOpen(false); setCurrentPage(1); }}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filterLoading ? (
                            <div className="flex justify-center items-center py-24">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" style={{ borderColor: '#7A1E1E' }}></div>
                            </div>
                        ) : paginatedProducts.length > 0 ? (
                            <div className={styles.productGrid}>
                                {paginatedProducts.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        className={styles.productCard}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                                    >
                                        <div className={styles.cardImageWrapper}>
                                            <Link to={`/product-detail?id=${product.id}`}>
                                                <img
                                                    src={getFullImageUrl(product.thumbnail)}
                                                    alt={product.productName}
                                                    className={styles.cardImage}
                                                    loading="lazy"
                                                />
                                            </Link>
                                            <button
                                                className={`${styles.wishlistBtn} ${wishlist.includes(product.id) ? styles.wishlistBtnActive : ''}`}
                                                onClick={() => handleWishlistToggle(product.id)}
                                                aria-label="Yêu thích"
                                            >
                                                <Heart size={16} fill={wishlist.includes(product.id) ? '#7A1E1E' : 'none'} />
                                            </button>
                                        </div>

                                        <div className={styles.cardBody}>
                                            <Link to={`/product-detail?id=${product.id}`} className={styles.cardLink}>
                                                <h3 className={styles.cardName}>{product.productName}</h3>
                                            </Link>
                                            <p className={styles.cardStone}>{getMaterialName(product.materialId)}</p>
                                            <div className={styles.cardInfo}>
                                                <p className={styles.cardDesc}>
                                                    {product.description?.substring(0, 60)}...
                                                </p>
                                            </div>
                                            <p className={styles.cardPrice}>{formatPrice(product.displayPrice || product.basePrice)}</p>
                                            <div className={styles.cardActions}>
                                                <Link to={`/product-detail?id=${product.id}`} className={styles.btnDetail}>
                                                    <Eye size={14} />
                                                    Xem chi tiết
                                                </Link>
                                                <button
                                                    className={styles.btnCart}
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    <ShoppingCart size={14} />
                                                    Thêm vào giỏ
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noResults}>
                                <div className={styles.noResultsIcon}>
                                    <Sparkles size={48} strokeWidth={1} />
                                </div>
                                <h3>Không tìm thấy sản phẩm nào</h3>
                                <p>Hãy thử thay đổi từ khóa hoặc bộ lọc để tìm sản phẩm mong muốn.</p>
                                <button className={styles.clearFilterBtn} onClick={handleClearFilters}>
                                    Xóa tất cả bộ lọc
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    className={styles.pageBtn}
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    aria-label="Trang trước"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    className={styles.pageBtn}
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    aria-label="Trang sau"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CollectionPage;
