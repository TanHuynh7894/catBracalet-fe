import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ChevronLeft, ChevronRight, ZoomIn, Heart, Star,
    Truck, Hand, Gift, Shield, ChevronDown, ShoppingCart,
    Leaf, Zap, RefreshCcw, Package
} from 'lucide-react';
import styles from './ProductDetail.module.css';

// ─── Image imports ───────────────────────────────────────────────────────────
import img1 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14AAN-2CH7-R20.jpg';
import img2 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EDN-2CH7-R20.jpg';
import img3 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EEN-2CH7-R20.jpg';
import img4 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KCN-2CH7-R20.jpg';
import img5 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KDN-2CH7-R20.jpg';
import img6 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KFN-2CH7-R20.jpg';

import rel1 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1AA10-16AAN-2CH7-R2.jpg';
import rel2 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1CA10-16KFN-2CH7-R2.jpg';
import rel3 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1ED10-16EDN-2CH7-R2.jpg';
import rel4 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1EE10-16EEN-2CH7-R2.jpg';

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

// ─── Data ──────────────────────────────────────────────────────────────────────
const galleryImages = [img1, img2, img3, img4, img5, img6];

const sizes = ['14cm', '15cm', '16cm', '17cm'];

const uspItems = [
    { icon: <Truck size={28} strokeWidth={1.5} />, title: 'Miễn phí giao hàng', desc: 'Đơn từ 500k' },
    { icon: <Hand size={28} strokeWidth={1.5} />, title: 'Handmade thủ công', desc: 'Chế tác tỉ mỉ' },
    { icon: <Gift size={28} strokeWidth={1.5} />, title: 'Hộp quà cao cấp', desc: 'Miễn phí kèm đơn' },
    { icon: <Shield size={28} strokeWidth={1.5} />, title: 'Bảo hành trọn đời', desc: 'Dây đeo & lắp' },
];

const relatedProducts = [
    { id: 1, img: rel1, name: 'Cát Tịnh Tâm – Vòng đá thạch anh tím', stone: 'Thạch anh tím', price: '600.000đ' },
    { id: 2, img: rel2, name: 'Cát Thịnh Vượng – Vòng đá citrine vàng', stone: 'Citrine vàng', price: '720.000đ' },
    { id: 3, img: rel3, name: 'Cát Bảo Hộ – Vòng đá obsidian đen', stone: 'Obsidian đen', price: '550.000đ' },
    { id: 4, img: rel4, name: 'Cát Mây Mắn – Vòng đá aventurine xanh', stone: 'Aventurine xanh', price: '680.000đ' },
];

const accordionItems = [
    {
        id: 1,
        title: 'Mô tả sản phẩm',
        content: 'Cát An Nhiên là chiếc vòng tay được chế tác từ đá thạch anh hồng nguyên chất, được chọn lọc kỹ lưỡng từng viên đá. Với màu hồng nhẹ nhàng dịu dàng, chiếc vòng mang lại cảm giác bình yên và sự kết nối với tình yêu thương. Mỗi chiếc vòng đều là sản phẩm handmade độc nhất, được hoàn thiện bởi các nghệ nhân tay nghề cao.',
    },
    {
        id: 2,
        title: 'Chất liệu & loại đá',
        content: 'Đá thạch anh hồng (Rose Quartz) tự nhiên 100% • Dây đàn hồi cao cấp chịu lực tốt • Charm bạc 925 xi vàng 14K • Không chứa chất độc hại, an toàn cho da nhạy cảm.',
    },
    {
        id: 3,
        title: 'Hướng dẫn chọn size',
        content: 'Đo chu vi cổ tay của bạn bằng thước dây. Chiều của vòng nên lớn hơn chu vi cổ tay từ 1–2cm để tạo độ thoải mái. Ví dụ: cổ tay 14cm → chọn size 15cm hoặc 16cm. Nếu bạn muốn đeo sát tay hơn, chọn đúng size đo.',
    },
    {
        id: 4,
        title: 'Cách bảo quản',
        content: 'Tránh tiếp xúc với hóa chất, nước hoa, kem dưỡng da. Tháo vòng trước khi tắm, bơi lội hoặc tập thể dục. Bảo quản trong hộp vải mềm tránh ánh nắng và độ ẩm. Lau nhẹ bằng khăn mềm sau khi đeo.',
    },
    {
        id: 5,
        title: 'Chính sách hậu mãi',
        content: 'Bảo hành dây đeo trọn đời – hỗ trợ thay dây miễn phí khi bị đứt do lỗi sản xuất. Đổi trả trong 7 ngày nếu sản phẩm lỗi từ xưởng. Hỗ trợ thay charm, sửa kích thước với chi phí ưu đãi.',
    },
    {
        id: 6,
        title: 'Đánh giá khách hàng',
        content: 'Hơn 128 đánh giá 5 sao từ khách hàng. "Vòng rất đẹp, đóng gói cẩn thận, giao hàng nhanh!" – Minh Anh. "Đá hồng màu đẹp tự nhiên, không pha màu, mình rất hài lòng." – Thu Hà. "Mua tặng bạn thân, hộp quà sang trọng lắm, bạn mình cưng lắm!" – Bảo My.',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProductDetail() {
    const [activeImg, setActiveImg] = useState(0);
    const [selectedSize, setSelectedSize] = useState('15cm');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('shipping');
    const [openAccordion, setOpenAccordion] = useState(null);
    const [wishlisted, setWishlisted] = useState(false);
    const [wishlistRelated, setWishlistRelated] = useState({});

    const prevImg = () => setActiveImg((p) => (p === 0 ? galleryImages.length - 1 : p - 1));
    const nextImg = () => setActiveImg((p) => (p === galleryImages.length - 1 ? 0 : p + 1));

    const toggleAccordion = (id) => setOpenAccordion((prev) => (prev === id ? null : id));

    const toggleWishlistRelated = (id) =>
        setWishlistRelated((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className={styles.page}>

            {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
            <motion.div className={styles.breadcrumbWrap} {...fadeUp}>
                <div className={styles.container}>
                    <nav className={styles.breadcrumb}>
                        <Link to="/" className={styles.breadcrumbLink}>Trang chủ</Link>
                        <span className={styles.breadcrumbSep}>&gt;</span>
                        <Link to="/collection" className={styles.breadcrumbLink}>Phụ kiện</Link>
                        <span className={styles.breadcrumbSep}>&gt;</span>
                        <Link to="/collection" className={styles.breadcrumbLink}>Vòng tay đá</Link>
                        <span className={styles.breadcrumbSep}>&gt;</span>
                        <span className={styles.breadcrumbCurrent}>Cát An Nhiên – Vòng đá thạch anh hồng</span>
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
                                    src={galleryImages[activeImg]}
                                    alt="Vòng đá thạch anh hồng"
                                    className={styles.mainImg}
                                />
                                <button className={styles.zoomBtn} aria-label="Zoom">
                                    <ZoomIn size={20} />
                                </button>
                                <button className={styles.prevBtn} onClick={prevImg} aria-label="Previous">
                                    <ChevronLeft size={22} />
                                </button>
                                <button className={styles.nextBtn} onClick={nextImg} aria-label="Next">
                                    <ChevronRight size={22} />
                                </button>
                            </div>

                            <div className={styles.thumbnails}>
                                {galleryImages.map((img, i) => (
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
                                Cát An Nhiên – Vòng đá thạch anh hồng
                            </h1>

                            {/* Rating */}
                            <div className={styles.ratingRow}>
                                <div className={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#D8B27D" color="#D8B27D" />
                                    ))}
                                </div>
                                <span className={styles.ratingScore}>4.9</span>
                                <span className={styles.ratingCount}>(128 đánh giá)</span>
                            </div>

                            {/* Price */}
                            <p className={styles.price}>680.000<span>đ</span></p>

                            {/* Description */}
                            <p className={styles.productDesc}>
                                Thạch anh hồng – viên đá của tình yêu và sự bình thản. Mang đến
                                năng lượng dịu dàng, giải phóng căng thẳng, lo âu và nuôi dưỡng
                                mọi quan hệ xung quanh bạn. Đây là món quà ý nghĩa nhất để yêu
                                thương chính mình.
                            </p>

                            {/* Quick Info Card */}
                            <div className={styles.quickInfoCard}>
                                <div className={styles.quickInfoRow}>
                                    <span className={styles.quickInfoIcon}>💎</span>
                                    <div>
                                        <span className={styles.quickInfoLabel}>Loại đá</span>
                                        <span className={styles.quickInfoValue}>Thạch anh hồng (Rose Quartz)</span>
                                    </div>
                                </div>
                                <div className={styles.quickInfoDivider} />
                                <div className={styles.quickInfoRow}>
                                    <span className={styles.quickInfoIcon}>🌊</span>
                                    <div>
                                        <span className={styles.quickInfoLabel}>Mệnh hợp</span>
                                        <span className={styles.quickInfoValue}>Hỏa, Thổ</span>
                                    </div>
                                </div>
                                <div className={styles.quickInfoDivider} />
                                <div className={styles.quickInfoRow}>
                                    <span className={styles.quickInfoIcon}>✨</span>
                                    <div>
                                        <span className={styles.quickInfoLabel}>Ý nghĩa năng lượng</span>
                                        <span className={styles.quickInfoValue}>Tình yêu • Bình an • Tự chữa lành</span>
                                    </div>
                                </div>
                            </div>

                            {/* Size Selector */}
                            <div className={styles.selectorSection}>
                                <p className={styles.selectorLabel}>Chọn size vòng</p>
                                <div className={styles.sizeButtons}>
                                    {sizes.map((s) => (
                                        <button
                                            key={s}
                                            className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeBtnActive : ''}`}
                                            onClick={() => setSelectedSize(s)}
                                        >
                                            {s}
                                        </button>
                                    ))}
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
                                    <button className={styles.btnAddCart}>
                                        <ShoppingCart size={18} />
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button
                                        className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlistActive : ''}`}
                                        onClick={() => setWishlisted((w) => !w)}
                                        aria-label="Wishlist"
                                    >
                                        <Heart size={20} fill={wishlisted ? '#7A1E1E' : 'none'} />
                                    </button>
                                </div>
                                <button className={styles.btnBuyNow}>Mua ngay</button>
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

            {/* ── ACCORDION SECTION ──────────────────────────────────────────── */}
            <motion.section className={styles.accordionSection} {...fadeUp}>
                <div className={styles.container}>
                    <h2 className={styles.accordionSectionTitle}>CHI TIẾT SẢN PHẨM</h2>
                    <div className={styles.accordionList}>
                        {accordionItems.map((item, i) => (
                            <motion.div
                                key={item.id}
                                className={styles.accordionItem}
                                {...fadeUpDelay(i * 0.06)}
                            >
                                <button
                                    className={styles.accordionHeader}
                                    onClick={() => toggleAccordion(item.id)}
                                >
                                    <span className={styles.accordionNum}>{i + 1}</span>
                                    <span className={styles.accordionTitle}>{item.title}</span>
                                    <motion.span
                                        className={styles.accordionChevron}
                                        animate={{ rotate: openAccordion === item.id ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={18} />
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openAccordion === item.id && (
                                        <motion.div
                                            className={styles.accordionBody}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <p className={styles.accordionContent}>{item.content}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
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
                                <Link to="/product-detail" className={styles.cardLinkFull}>
                                    <div className={styles.cardImgWrap}>
                                        <img src={p.img} alt={p.name} className={styles.cardImg} />
                                    </div>
                                </Link>
                                <button
                                    className={`${styles.cardWishlist} ${wishlistRelated[p.id] ? styles.cardWishlistActive : ''}`}
                                    onClick={() => toggleWishlistRelated(p.id)}
                                    aria-label="Wishlist"
                                >
                                    <Heart size={18} fill={wishlistRelated[p.id] ? '#7A1E1E' : 'none'} />
                                </button>
                                <div className={styles.cardBody}>
                                    <p className={styles.cardStone}>{p.stone}</p>
                                    <Link to="/product-detail" className={styles.cardNameLink}>
                                        <h3 className={styles.cardName}>{p.name}</h3>
                                    </Link>
                                    <p className={styles.cardPrice}>{p.price}</p>
                                    <Link to="/product-detail" className={styles.cardBtn}>
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

        </div>
    );
}
