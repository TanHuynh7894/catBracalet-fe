import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Heart, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight,
    Eye, SlidersHorizontal, X, Gem, Leaf, Sparkles, ShieldCheck,
} from 'lucide-react';
import styles from './CollectionPage.module.css';

// ─── Import Logo ────────────────────────────────────────────────────────────
import heroBannerImg from '../../assets/Ảnh UI/ảnh chi tiết/home ne..png';

// ─── Import Product Images ────────────────────────────────────────────────────
// Evil Eye collection
import evilEye1 from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W1-4EEN-4KFN-2CH4-2CH7-R20.jpg';
import evilEye2 from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W2-4KCN-4KFN-2CH4-2CH7-R20.jpg';
import evilEye3 from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W4-4KDN-4KFN-2CH4-2CH7-R20.jpg';
import evilEye4 from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W5-4LPN-4KFN-2CH4-2CH7-R20.jpg';
import evilEye5 from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W6-4AAN-4KFN-2CH4-2CH7-R20.jpg';
import evilEye6 from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W7-4AAN-4KFN-2CH4-2CH7-R20.jpg';

// Round 10 - 16 collection
import round1 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1AA10-16AAN-2CH7-R2.jpg';
import round2 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1KC10-16KCN-2CH7-R2.jpg';
import round3 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1KD10-16KDN-2CH7-R2.jpg';
import round4 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1KG10-16KGN-2CH7-R2.jpg';

// 13 nhuyễn
import nhuyen1 from '../../assets/Image - Cat/hình ảnh Sp/13 nhuyễn - 9 bi3-251006/D2-13AAN-9CH3-R20.jpg';
import nhuyen2 from '../../assets/Image - Cat/hình ảnh Sp/13 nhuyễn - 9 bi3-251006/D2-13KCN-9CH3-R20.jpg';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const products = [
    {
        id: 1,
        name: 'Cát Bình An',
        image: round1,
        price: 890000,
        stoneType: 'Thạch anh trắng',
        benefits: ['Bảo vệ năng lượng', 'Xua đuổi tà khí', 'Mang lại bình yên'],
        collection: 'Bình an',
        color: 'white',
        element: 'Kim',
    },
    {
        id: 2,
        name: 'Cát Tình Yêu',
        image: evilEye1,
        price: 890000,
        stoneType: 'Thạch anh hồng',
        benefits: ['Thu hút tình duyên', 'Tăng duyên phận', 'Phù hộ tình cảm'],
        collection: 'Tình yêu',
        color: 'red',
        element: 'Hỏa',
    },
    {
        id: 3,
        name: 'Cát Tài Lộc',
        image: round2,
        price: 890000,
        stoneType: 'Mắt hổ',
        benefits: ['Thu hút tài lộc', 'Tăng vận may', 'Phù hộ kinh doanh'],
        collection: 'Tài lộc',
        color: 'yellow',
        element: 'Thổ',
    },
    {
        id: 4,
        name: 'Cát Evil Eye',
        image: evilEye2,
        price: 890000,
        stoneType: 'Thạch anh xanh',
        benefits: ['Ngăn chặn tà khí', 'Bảo hộ toàn thân', 'Giữ bình yên cho gia chủ'],
        collection: 'Evil Eye',
        color: 'blue',
        element: 'Thủy',
    },
    {
        id: 5,
        name: 'Cát Đá Tự Nhiên',
        image: nhuyen1,
        price: 890000,
        stoneType: 'Đá tự nhiên',
        benefits: ['Cân bằng năng lượng', 'Giảm stress', 'Tập trung tư duy'],
        collection: 'Đá tự nhiên',
        color: 'green',
        element: 'Mộc',
    },
    {
        id: 6,
        name: 'Cát May Mắn',
        image: evilEye3,
        price: 890000,
        stoneType: 'Mã não xanh',
        benefits: ['Tăng vận may', 'Nhân duyên tốt lành', 'Hóa giải tiểu nhân'],
        collection: 'Tài lộc',
        color: 'green',
        element: 'Mộc',
    },
    {
        id: 7,
        name: 'Cát Hắc Thạch',
        image: evilEye4,
        price: 890000,
        stoneType: 'Hắc thạch',
        benefits: ['Trấn áp âm khí', 'Bảo vệ toàn thân', 'Đề kháng tâm linh'],
        collection: 'Bình an',
        color: 'black',
        element: 'Thủy',
    },
    {
        id: 8,
        name: 'Cát Mắt Hổ',
        image: round3,
        price: 890000,
        stoneType: 'Mắt hổ vàng',
        benefits: ['Tự tin mạnh mẽ', 'Thu hút tiền bạc', 'Phù hộ kinh doanh'],
        collection: 'Tài lộc',
        color: 'yellow',
        element: 'Thổ',
    },
    {
        id: 9,
        name: 'Cát Thạch Anh Trắng',
        image: nhuyen2,
        price: 890000,
        stoneType: 'Thạch anh trắng',
        benefits: ['Thanh lọc không gian', 'Cân bằng cảm xúc', 'Chữa lành tâm hồn'],
        collection: 'Đá tự nhiên',
        color: 'white',
        element: 'Kim',
    },
    {
        id: 10,
        name: 'Cát Thạch Thạch',
        image: evilEye5,
        price: 890000,
        stoneType: 'Thạch anh tím',
        benefits: ['Tăng trực giác', 'Sáng suốt quyết định', 'Giảm lo âu'],
        collection: 'Bình an',
        color: 'blue',
        element: 'Thủy',
    },
    {
        id: 11,
        name: 'Cát Năng Lượng',
        image: round4,
        price: 890000,
        stoneType: 'Thạch anh tím',
        benefits: ['Tăng năng lượng sống', 'Khai sáng tinh thần', 'Phù hộ học hành'],
        collection: 'Evil Eye',
        color: 'blue',
        element: 'Mộc',
    },
    {
        id: 12,
        name: 'Cát Đá Thô',
        image: evilEye6,
        price: 890000,
        stoneType: 'Đá thô tự nhiên',
        benefits: ['Năng lượng nguyên bản', 'Kết nối đất trời', 'Bảo vệ linh hồn'],
        collection: 'Đá tự nhiên',
        color: 'brown',
        element: 'Thổ',
    },
];

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

// ─── Fade-in animation variant ───────────────────────────────────────────────
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.8 },
};

// ─── Main Component ────────────────────────────────────────────────────────
const CollectionPage = () => {
    // Filter state
    const [selectedCollection, setSelectedCollection] = useState('');
    const [selectedStones, setSelectedStones] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedElements, setSelectedElements] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const ITEMS_PER_PAGE = 9;

    // Toggle stone checkbox
    const handleStoneToggle = (stone) => {
        setSelectedStones(prev =>
            prev.includes(stone) ? prev.filter(s => s !== stone) : [...prev, stone]
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

    // Filter + Sort
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCollection) {
            result = result.filter(p => p.collection === selectedCollection);
        }
        if (selectedStones.length > 0) {
            result = result.filter(p => selectedStones.some(s => p.stoneType.includes(s)));
        }
        if (selectedPrice === 'under80') {
            result = result.filter(p => p.price < 80000);
        } else if (selectedPrice === '80to120') {
            result = result.filter(p => p.price >= 80000 && p.price <= 120000);
        } else if (selectedPrice === '120to200') {
            result = result.filter(p => p.price > 120000 && p.price <= 200000);
        }
        if (selectedColors.length > 0) {
            result = result.filter(p => selectedColors.includes(p.color));
        }
        if (selectedElements.length > 0) {
            result = result.filter(p => selectedElements.includes(p.element));
        }

        if (sortBy === 'priceAsc') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'priceDesc') result.sort((a, b) => b.price - a.price);

        return result;
    }, [selectedCollection, selectedStones, selectedPrice, selectedColors, selectedElements, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const formatPrice = (price) =>
        price.toLocaleString('vi-VN') + 'đ';

    const sortLabels = {
        newest: 'Mới nhất',
        bestseller: 'Bán chạy',
        priceAsc: 'Giá tăng dần',
        priceDesc: 'Giá giảm dần',
    };

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
                            {['Evil Eye', 'Đá tự nhiên', 'Bình an', 'Tình yêu', 'Tài lộc'].map(col => (
                                <label key={col} className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="collection"
                                        value={col}
                                        checked={selectedCollection === col}
                                        onChange={() => setSelectedCollection(col)}
                                        className={styles.radioInput}
                                    />
                                    <span className={styles.radioCustom}></span>
                                    <span className={styles.radioText}>{col}</span>
                                </label>
                            ))}
                        </div>

                        {/* Stone Type Filter */}
                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterGroupTitle}>Loại đá</h3>
                            {['Thạch anh', 'Mã não', 'Hắc thạch', 'Mắt hổ', 'Thạch thạch'].map(stone => (
                                <label key={stone} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={selectedStones.includes(stone)}
                                        onChange={() => handleStoneToggle(stone)}
                                        className={styles.checkboxInput}
                                    />
                                    <span className={styles.checkboxCustom}></span>
                                    <span className={styles.checkboxText}>{stone}</span>
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

                        {/* Product Header */}
                        <div className={styles.productHeader}>
                            <div className={styles.productHeaderLeft}>
                                <h2 className={styles.productHeaderTitle}>Bộ sưu tập Cát</h2>
                                <p className={styles.productHeaderCount}>{filteredProducts.length} sản phẩm</p>
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
                                        <Link to="/product-detail">
                                            <img
                                                src={product.image}
                                                alt={product.name}
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
                                        <Link to="/product-detail" className={styles.cardLink}>
                                            <h3 className={styles.cardName}>{product.name}</h3>
                                        </Link>
                                        <p className={styles.cardStone}>{product.stoneType}</p>
                                        <ul className={styles.cardBenefits}>
                                            {product.benefits.map((b, bi) => (
                                                <li key={bi} className={styles.cardBenefit}>• {b}</li>
                                            ))}
                                        </ul>
                                        <p className={styles.cardPrice}>{formatPrice(product.price)}</p>
                                        <div className={styles.cardActions}>
                                            <Link to="/product-detail" className={styles.btnDetail}>
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
