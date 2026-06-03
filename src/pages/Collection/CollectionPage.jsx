import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Heart, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight,
    Eye, SlidersHorizontal, X, Gem, Leaf, Sparkles, ShieldCheck,
} from 'lucide-react';
import styles from './CollectionPage.module.css';
import { getProducts, filterProductVariants, searchProductsByName } from '../../services/productService';
import { getProductCategories } from '../../services/categoryService';
import { getProductMaterials } from '../../services/materialService';

// ─── Import Logo ────────────────────────────────────────────────────────────
import heroBannerImg from '../../assets/Ảnh UI/ảnh chi tiết/home ne..png';

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
    // API State
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter state
    const [selectedCollection, setSelectedCollection] = useState(''); // Category ID
    const [selectedStones, setSelectedStones] = useState([]); // Material IDs
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedElements, setSelectedElements] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
                setProducts(productData || []);
                setCategories(catData || []);
                setMaterials(matData || []);
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
    };

    // Toggle element checkbox
    const handleElementToggle = (el) => {
        setSelectedElements(prev =>
            prev.includes(el) ? prev.filter(e => e !== el) : [...prev, el]
        );
    };

    // Toggle color
    const handleColorToggle = (color) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    // Toggle wishlist
    const handleWishlistToggle = (id) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
        );
    };

    // Clear all filters
    const handleClearFilters = () => {
        setSelectedCollection('');
        setSelectedStones([]);
        setSelectedPrice('');
        setSelectedColors([]);
        setSelectedElements([]);
    };

    const getFullImageUrl = (url) => {
        if (!url) return heroBannerImg;
        if (url.startsWith('http')) return url;
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        const fetchFiltered = async () => {
            // Nếu không có bộ lọc nào được chọn và không có từ khóa tìm kiếm
            if (!searchKeyword && !selectedCollection && !selectedPrice && sortBy === 'newest') {
                console.log("No filters applied, showing all products:", products);
                setFilteredResults(products);
                return;
            }

            setLoading(true);
            try {
                let data = [];

                // Nếu có từ khóa tìm kiếm, ưu tiên dùng API search-by-name
                if (searchKeyword) {
                    console.log(`Calling searchProductsByName for: "${searchKeyword}"`);
                    data = await searchProductsByName(searchKeyword);
                    console.log("Search API results:", data);

                    // Nếu có thêm các bộ lọc khác (category, price), ta sẽ lọc tiếp trên kết quả search này
                    let results = data;
                    if (selectedCollection) {
                        results = results.filter(p => p.categoryId === selectedCollection);
                    }
                    // Filter giá (vì API search-by-name có thể không hỗ trợ filter giá trên server)
                    if (selectedPrice) {
                        results = results.filter(p => {
                            const price = Number(p.basePrice);
                            if (selectedPrice === 'under80') return price < 80000;
                            if (selectedPrice === '80to120') return price >= 80000 && price <= 120000;
                            if (selectedPrice === '120to200') return price >= 120000 && price <= 200000;
                            return true;
                        });
                    }
                    setFilteredResults(results);
                } else {
                    // Nếu không có keyword nhưng có các bộ lọc khác, dùng API filter
                    const params = {};
                    if (selectedCollection) params.categoryId = selectedCollection;
                    if (sortBy && sortBy !== 'newest') params.sortBy = sortBy;

                    if (selectedPrice === 'under80') { params.maxPrice = 80000; }
                    else if (selectedPrice === '80to120') { params.minPrice = 80000; params.maxPrice = 120000; }
                    else if (selectedPrice === '120to200') { params.minPrice = 120000; params.maxPrice = 200000; }

                    console.log("Calling filter API with params:", params);
                    const variants = await filterProductVariants(params);

                    const productsFromVariants = variants.map(v => {
                        const firstMapping = v.productVariantMappings?.[0];
                        if (!firstMapping?.product) return null;
                        return {
                            ...firstMapping.product,
                            displayPrice: Number(firstMapping.product.basePrice) + Number(v.extraPrice || 0)
                        };
                    }).filter(Boolean);

                    const uniqueProducts = Array.from(new Map(productsFromVariants.map(p => [p.id, p])).values());
                    setFilteredResults(uniqueProducts);
                }
            } catch (error) {
                console.error("Search/Filter Error:", error);
                setFilteredResults(products);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchFiltered, 500); // Thêm lại debounce để tránh spam API
        return () => clearTimeout(timer);
    }, [searchKeyword, selectedCollection, selectedPrice, sortBy, products]);

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
                        <p className={styles.sidebarSubtitle}>Chọn bộ lọc sản phẩm</p>

                        {/* Collection Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Tên BST</h3>
                            {categories.map(col => (
                                <label key={col.id} className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="collection"
                                        value={col.id}
                                        checked={selectedCollection === col.id}
                                        onChange={() => setSelectedCollection(col.id)}
                                        className={styles.radioInput}
                                    />
                                    <span className={styles.radioCustom}></span>
                                    <span className={styles.radioText}>{col.categoryName}</span>
                                </label>
                            ))}
                        </div>

                        {/* Stone Type Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Loại đá</h3>
                            {materials.map(stone => (
                                <label key={stone.id} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={selectedStones.includes(stone.id)}
                                        onChange={() => handleStoneToggle(stone.id)}
                                        className={styles.checkboxInput}
                                    />
                                    <span className={styles.checkboxCustom}></span>
                                    <span className={styles.checkboxText}>{stone.materialName}</span>
                                </label>
                            ))}
                        </div>

                        {/* Price Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Giá tiền</h3>
                            {[
                                { label: 'Dưới 80k', value: 'under80' },
                                { label: '80k - 120k', value: '80to120' },
                                { label: '120k - 200k', value: '120to200' },
                            ].map(price => (
                                <label key={price.value} className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="price"
                                        value={price.value}
                                        checked={selectedPrice === price.value}
                                        onChange={() => setSelectedPrice(price.value)}
                                        className={styles.radioInput}
                                    />
                                    <span className={styles.radioCustom}></span>
                                    <span className={styles.radioText}>{price.label}</span>
                                </label>
                            ))}
                        </div>

                        {/* Color Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Màu sắc</h3>
                            <div className={styles.colorGrid}>
                                {colorOptions.map(col => (
                                    <button
                                        key={col.value}
                                        className={`${styles.colorCircle} ${selectedColors.includes(col.value) ? styles.colorCircleActive : ''}`}
                                        style={{ backgroundColor: col.hex }}
                                        onClick={() => handleColorToggle(col.value)}
                                        title={col.label}
                                        aria-label={col.label}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Element Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Mệnh phù hợp</h3>
                            {['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'].map(el => (
                                <label key={el} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={selectedElements.includes(el)}
                                        onChange={() => handleElementToggle(el)}
                                        className={styles.checkboxInput}
                                    />
                                    <span className={styles.checkboxCustom}></span>
                                    <span className={styles.checkboxText}>{el}</span>
                                </label>
                            ))}
                        </div>

                        <button className={styles.clearFilterBtn} onClick={handleClearFilters}>
                            Xóa tất cả bộ lọc
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
                        {paginatedProducts.length > 0 ? (
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
                                                <button className={styles.btnCart}>
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

            {/* ── BRAND STORY ─────────────────────────────────────────────── */}
            <motion.section {...fadeUp} className={styles.brandStory}>
                <div className={styles.brandStoryInner}>
                    <div className={styles.brandStoryText}>
                        <p className={styles.brandStoryEyebrow}>Câu chuyện thương hiệu</p>
                        <h2 className={styles.brandStoryTitle}>Cát Bracelet — Năng lượng từ đất trời</h2>
                        <p className={styles.brandStoryDesc}>
                            Mỗi chiếc vòng Cát là một hành trình từ lòng đất đến bàn tay bạn. Chúng tôi chọn lọc những viên đá quý hiếm, được khai quang bằng phương pháp truyền thống, mang lại nguồn năng lượng thuần khiết nhất cho người đeo.
                        </p>
                    </div>
                    <div className={styles.statsGrid}>
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className={styles.statCard}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

        </div>
    );
};

export default CollectionPage;
