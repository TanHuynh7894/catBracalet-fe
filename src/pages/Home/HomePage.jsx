import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Gem, Palette, Gift, Sparkles, ArrowRight, Heart,
    Leaf, Wind, Scale, Link as LinkIcon, Zap,
    ShieldCheck, Clock, Star, MoveRight, ChevronRight,
    Brain, Flower2, Flower
} from 'lucide-react';
import { createConsultation } from '../../services/consultationService';
import { useToast } from '../../context/ToastContext';
import styles from './HomePage.module.css';

// ─── LOCAL ASSETS ────────────────────────────────────────────────────────────
import heroImg from '../../assets/Ảnh UI/ảnh chi tiết/home ne...jpg';
import problemImg from '../../assets/Ảnh UI/ảnh chi tiết/Home ne.png';
import aboutBgImg from '../../assets/Ảnh UI/ảnh chi tiết/home ne..png';
import step1Img from '../../assets/Ảnh UI/ảnh chi tiết/Thanhtay.png';
import step2Img from '../../assets/Ảnh UI/ảnh chi tiết/kichhoat.png';
import step3Img from '../../assets/Ảnh UI/ảnh chi tiết/canbang.png';
import step4Img from '../../assets/Ảnh UI/ảnh chi tiết/donghanh.png';
import sloganImg from '../../assets/Ảnh UI/ảnh chi tiết/slogan.png';
import ctaBgImg from '../../assets/Ảnh UI/ảnh chi tiết/sansang.png';
import consultImg from '../../assets/Ảnh UI/ảnh chi tiết/hop.png';

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const FEATURES = [
    { icon: <Gem size={28} strokeWidth={1.5} />, title: 'Đá tự nhiên chọn lọc', desc: '100% đá tự nhiên cao cấp, nguồn gốc rõ ràng' },
    { icon: <Palette size={28} strokeWidth={1.5} />, title: 'Thiết kế cá nhân hóa', desc: 'Tư vấn phối hợp mệnh & mục tiêu của bạn' },
    { icon: <Gift size={28} strokeWidth={1.5} />, title: 'Tặng túi / hộp thanh tẩy', desc: 'Làm sạch & nạp năng lượng trước khi đến tay bạn' },
    { icon: <Sparkles size={28} strokeWidth={1.5} />, title: 'Năng lượng tích cực & phong thủy', desc: 'Hỗ trợ cân bằng - thu hút điều tốt - may mắn' },
];

const PROBLEMS = [
    { icon: <Brain size={30} strokeWidth={1.2} />, text: 'Căng thẳng mệt mỏi, thiếu động lực' },
    { icon: <Heart size={30} strokeWidth={1.2} />, text: 'Rối loạn cảm xúc, khó cân bằng cuộc sống' },
    { icon: <Flower2 size={30} strokeWidth={1.2} />, text: 'Cảm thấy thiếu may mắn, hay trắc trở' },
    { icon: <Flower size={30} strokeWidth={1.2} />, text: 'Muốn cải thiện vận khí và thu hút điều tốt đẹp hơn' },
];

const VALUES = [
    { icon: <Leaf size={18} strokeWidth={1.5} />, label: 'Tự nhiên' },
    { icon: <Sparkles size={18} strokeWidth={1.5} />, label: 'Tinh khiết' },
    { icon: <Scale size={18} strokeWidth={1.5} />, label: 'Cân bằng' },
    { icon: <LinkIcon size={18} strokeWidth={1.5} />, label: 'Kết nối' },
];

const STEPS = [
    { id: '01', title: 'THANH TẨY', desc: 'Làm sạch năng lượng xấu, loại bỏ tạp khí.', img: step1Img },
    { id: '02', title: 'KÍCH HOẠT', desc: 'Nạp năng lượng tích cực phù hợp với bạn.', img: step2Img },
    { id: '03', title: 'CÂN BẰNG', desc: 'Hỗ trợ cân bằng cảm xúc, tinh thần & cơ thể.', img: step3Img },
    { id: '04', title: 'ĐỒNG HÀNH', desc: 'Thu hút may mắn, bảo vệ và nâng cao năng lượng.', img: step4Img },
];

const PRODUCTS = [
    { id: 1, name: 'Cát An Nhiên', desc: 'Cân bằng cảm xúc', price: '850.000đ', img: null },
    { id: 2, name: 'Cát Bình An', desc: 'Bảo vệ & an yên', price: '850.000đ', img: null },
    { id: 3, name: 'Cát Tĩnh Lặng', desc: 'Giảm căng thẳng', price: '850.000đ', img: null },
    { id: 4, name: 'Cát Thịnh Vượng', desc: 'Thu hút tài lộc', price: '890.000đ', img: null },
    { id: 5, name: 'Cát May Mắn', desc: 'Cơ hội & thành công', price: '890.000đ', img: null },
];

const TESTIMONIALS = [
    {
        name: 'Ngọc Linh', role: 'Khách hàng', rating: 5,
        review: 'Mình đeo vòng Cát An Nhiên và cảm thấy bình tĩnh, năng lượng nhẹ nhàng hơn. Thiết kế đẹp, tinh tế và đóng gói rất kỹ.',
        avatar: 'https://i.pravatar.cc/150?u=a'
    },
    {
        name: 'Thu Trang', role: 'Khách hàng', rating: 5,
        review: 'Mình đeo vòng Cát An Nhiên và cảm thấy bình tĩnh, năng lượng nhẹ nhàng hơn. Thiết kế đẹp, tinh tế và đóng gói rất kỹ. Tư vấn rất nhiệt tình!',
        avatar: 'https://i.pravatar.cc/150?u=b'
    },
    {
        name: 'Minh Khoa', role: 'Khách hàng', rating: 5,
        review: 'Vòng đẹp, đá tự nhiên thật sự khác biệt. Mình cảm thấy tự tin và tích cực hơn mỗi ngày khi đeo vòng của Cát Bracelet.',
        avatar: 'https://i.pravatar.cc/150?u=c'
    },
];

// ─── ANIMATION PRESET ────────────────────────────────────────────────────────
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const fadeUpDelay = (d = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: d, ease: 'easeOut' },
});

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const HomePage = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [wishlist, setWishlist] = useState([]);
    const [form, setForm] = useState({
        fullName: '',
        dateOfBirth: '',
        timeOfBirth: '',
        gender: 'MALE',
        phoneNumber: '',
        objective: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleWishlist = (id) =>
        setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createConsultation(form);
            showToast('Gửi thông tin tư vấn thành công!', 'success');
            setForm({
                fullName: '',
                dateOfBirth: '',
                timeOfBirth: '',
                gender: 'MALE',
                phoneNumber: '',
                objective: ''
            });
        } catch (error) {
            showToast(error.message || 'Gửi thông tin thất bại', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>

            {/* ══ HERO ══════════════════════════════════════════════════════ */}
            <section className={styles.heroSection}>
                {/* Background Image */}
                <img src={heroImg} alt="Cát Bracelet" className={styles.heroBgImg} />

                {/* Overlay Content */}
                <div className={styles.heroOverlay}>
                    <motion.div
                        className={styles.heroContent}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.85 }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className={styles.heroTitle}
                        >
                            Năng lượng tinh khiết<br />
                            Phong cách tinh tế
                        </motion.h1>
                        <p className={styles.heroDesc}>
                            Không chỉ là một chiếc vòng.<br />
                            <em>Đó là năng lượng bạn chọn<br />mang theo mỗi ngày.</em>
                        </p>
                        <div className={styles.heroActions}>
                            <motion.button
                                className={styles.btnPrimary}
                                onClick={() => navigate('/collection')}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                KHÁM PHÁ BỘ SƯU TẬP <ArrowRight size={14} />
                            </motion.button>
                            <motion.button
                                className={styles.btnOutlineHero}
                                onClick={() => navigate('/custom')}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                TÌM VÒNG HỢP MỆNH <ArrowRight size={14} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ FEATURES ══════════════════════════════════════════════════ */}
            <section className={styles.featuresSection}>
                <div className={styles.container}>
                    <div className={styles.featuresGrid}>
                        {FEATURES.map((f, i) => (
                            <motion.div key={i} className={styles.featureCard} {...fadeUpDelay(i * 0.1)}>
                                <div className={styles.featureIconWrap}>{f.icon}</div>
                                <h3 className={styles.featureTitle}>{f.title}</h3>
                                <p className={styles.featureDesc}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ PROBLEM SOLVING ═══════════════════════════════════════════ */}
            <section className={styles.problemSection}>
                <div className={styles.container}>
                    <motion.div className={styles.problemCardOverlay} {...fadeUp}>
                        {/* Background Image */}
                        <img src={problemImg} alt="Background" className={styles.problemBgImg} />

                        {/* Content Overlay */}
                        <div className={styles.problemOverlayContent}>
                            <div className={styles.problemTextContainer}>
                                <h2 className={styles.problemTitle}>
                                    Bạn có đang gặp <em>những điều này?</em>
                                </h2>

                                <div className={styles.problemItemsRow}>
                                    {PROBLEMS.map((p, i) => (
                                        <div key={i} className={styles.problemItemCol}>
                                            <div className={styles.problemIconCircle}>{p.icon}</div>
                                            <p className={styles.problemItemText}>{p.text}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.problemFooterText}>
                                    <p>
                                        Cát Bracelet được tạo ra để đồng hành cùng bạn,<br />
                                        giúp cân bằng năng lượng và thu hút những điều tích cực.
                                    </p>
                                    <div className={styles.decorativeStar}>✦</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ ABOUT CÁT ══════════════════════════════════════════════ */}
            <section className={styles.aboutSection}>
                <div className={styles.container}>
                    <motion.div className={styles.aboutBannerOverlay} {...fadeUp}>
                        {/* Background Image */}
                        <img src={aboutBgImg} alt="Cát Background" className={styles.aboutBgImg} />

                        {/* Content Overlay */}
                        <div className={styles.aboutOverlayContent}>
                            <div className={styles.aboutTextContainer}>
                                <h2 className={styles.aboutTitle}>Cát là gì?</h2>
                                <p className={styles.aboutDesc}>
                                    Cát Bracelet là thương hiệu trang sức phong thủy hiện đại,
                                    kết hợp tinh thần thẩm mỹ tối giản với ý nghĩa tinh thần tích cực.
                                </p>

                                <div className={styles.aboutValuesRow}>
                                    {VALUES.map((v, i) => (
                                        <div key={i} className={styles.aboutValueItem}>
                                            <div className={styles.aboutValueIcon}>{v.icon}</div>
                                            <span className={styles.aboutValueLabel}>{v.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ HOW IT WORKS ══════════════════════════════════════════════ */}
            <section className={styles.stepsSection}>
                <div className={styles.container}>
                    <motion.h2 className={styles.stepsTitle} {...fadeUp}>
                        Vòng Cát hoạt động như thế nào?
                    </motion.h2>
                    <div className={styles.stepsRow}>
                        {STEPS.map((step, i) => (
                            <React.Fragment key={step.id}>
                                <motion.div className={styles.stepCard} {...fadeUpDelay(i * 0.12)}>
                                    <div className={styles.stepCircleWrap}>
                                        <div className={styles.stepCircle}>
                                            <img src={step.img} alt={step.title} className={styles.stepImg} />
                                        </div>
                                        <div className={styles.stepBadge}>{step.id}</div>
                                    </div>
                                    <h4 className={styles.stepTitle}>{step.title}</h4>
                                    <p className={styles.stepDesc}>{step.desc}</p>
                                </motion.div>
                                {i < STEPS.length - 1 && (
                                    <div className={styles.stepArrow}>
                                        <MoveRight size={20} strokeWidth={1.5} />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ ENERGY BANNER ══════════════════════════════════════════════ */}
            <section className={styles.bannerSection}>
                <div className={styles.container}>
                    <motion.div className={styles.bannerOverlayContent} {...fadeUp}>
                        {/* Background Image */}
                        <img src={sloganImg} alt="Red Velvet Energy" className={styles.bannerBgImg} />

                        {/* Content Overlay */}
                        <div className={styles.bannerOverlayContent}>
                            <div className={styles.bannerTextContainer}>
                                <h2 className={styles.bannerTagline}>be you, be energy <span className={styles.taglineStar}>✧</span></h2>
                                <p className={styles.bannerSubText}>
                                    SỐNG ĐÚNG VỚI BẢN THÂN – LAN TỎA NĂNG LƯỢNG TÍCH CỰC
                                </p>
                                <div className={styles.bannerDecorativeLine}>
                                    <span className={styles.miniStar}>✦</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ FEATURED COLLECTIONS ══════════════════════════════════════ */}
            <section className={styles.collectionsSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Bộ sưu tập nổi bật</h2>
                        <motion.button
                            className={styles.btnTextLink}
                            onClick={() => navigate('/collection')}
                            whileHover={{ x: 4 }}
                        >
                            XEM TẤT CẢ BỘ SƯU TẬP <ArrowRight size={14} />
                        </motion.button>
                    </div>
                    <div className={styles.productsGrid}>
                        {PRODUCTS.map((p, i) => (
                            <motion.div
                                key={p.id}
                                className={styles.productCard}
                                {...fadeUpDelay(i * 0.08)}
                                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(75,58,50,0.12)' }}
                            >
                                <div className={styles.productImgWrap}>
                                    <div className={styles.productImgPlaceholder}>
                                        <Gem size={36} strokeWidth={1} className={styles.productPlaceholderIcon} />
                                    </div>
                                    <button
                                        className={`${styles.wishlistBtn} ${wishlist.includes(p.id) ? styles.wishlistActive : ''}`}
                                        onClick={() => toggleWishlist(p.id)}
                                    >
                                        <Heart size={15} fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} />
                                    </button>
                                </div>
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productName}>{p.name}</h3>
                                    <p className={styles.productDescText}>{p.desc}</p>
                                    <span className={styles.productPrice}>{p.price}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ TESTIMONIALS ══════════════════════════════════════════════ */}
            <section className={styles.testimonialsSection}>
                <div className={styles.container}>
                    <motion.h2 className={styles.sectionTitle} {...fadeUp}>
                        Khách hàng nói về Cát
                    </motion.h2>
                    <div className={styles.testimonialsGrid}>
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div key={i} className={styles.testiCard} {...fadeUpDelay(i * 0.1)}>
                                <div className={styles.testiTop}>
                                    <img src={t.avatar} alt={t.name} className={styles.testiAvatar} />
                                    <div>
                                        <p className={styles.testiName}>{t.name}</p>
                                        <div className={styles.starsRow}>
                                            {[...Array(5)].map((_, s) => (
                                                <Star key={s} size={12} fill="#D8B27D" stroke="none" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.testiText}>"{t.review}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CTA BANNER ════════════════════════════════════════════════ */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <motion.div className={styles.ctaBannerOverlay} {...fadeUp}>
                        {/* Background Image */}
                        <img src={ctaBgImg} alt="Sẵn sàng" className={styles.ctaBgImg} />

                        {/* Content Overlay */}
                        <div className={styles.ctaOverlayContent}>
                            <h2 className={styles.ctaTextTitle}>
                                Sẵn sàng thu hút năng lượng tích cực?
                            </h2>
                            <button className={styles.ctaStartBtn} onClick={() => navigate('/collection')}>
                                BẮT ĐẦU NGAY <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ CONSULTATION FORM ═════════════════════════════════════════ */}
            <section className={styles.consultSection} id="consultation">
                <div className={styles.container}>
                    <motion.div className={styles.consultCard} {...fadeUp}>
                        {/* Left image */}
                        <div className={styles.consultImgWrap}>
                            <img src={consultImg} alt="Tư vấn" className={styles.consultImg} />
                        </div>

                        {/* Right form */}
                        <div className={styles.consultFormWrap}>
                            <h2 className={styles.consultTitle}>Tư vấn miễn phí – Chọn vòng hợp mệnh</h2>
                            <p className={styles.consultSubtitle}>Điền thông tin để được chuyên gia tại Cát Bracelet tư vấn chi tiết.</p>

                            <form className={styles.consultForm} onSubmit={handleSubmit}>
                                <div className={styles.formRow}>
                                    <div className={styles.formField}>
                                        <label className={styles.formLabel}>Họ và tên</label>
                                        <input name="fullName" value={form.fullName} onChange={handleChange} type="text" placeholder="Nhập họ và tên" className={styles.formInput} required />
                                    </div>
                                    <div className={styles.formField}>
                                        <label className={styles.formLabel}>Ngày sinh</label>
                                        <input name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} type="date" className={styles.formInput} required />
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formField}>
                                        <label className={styles.formLabel}>Giờ sinh (nếu biết)</label>
                                        <input name="timeOfBirth" value={form.timeOfBirth} onChange={handleChange} type="time" className={styles.formInput} />
                                    </div>
                                    <div className={styles.formField}>
                                        <label className={styles.formLabel}>Giới tính</label>
                                        <select name="gender" value={form.gender} onChange={handleChange} className={styles.formSelect}>
                                            <option value="MALE">Nam</option>
                                            <option value="FEMALE">Nữ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formField}>
                                        <label className={styles.formLabel}>Số điện thoại</label>
                                        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} type="tel" placeholder="Nhập số điện thoại" className={styles.formInput} required />
                                    </div>
                                    <div className={styles.formField}>
                                        <label className={styles.formLabel}>Mục tiêu của bạn</label>
                                        <input name="objective" value={form.objective} onChange={handleChange} type="text" placeholder="Ví dụ: Tài lộc, bình an..." className={styles.formInput} required />
                                    </div>
                                </div>
                                <motion.button
                                    type="submit"
                                    className={styles.btnSubmit}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'ĐANG GỬI...' : 'GỬI THÔNG TIN'}
                                </motion.button>
                            </form>

                            <div className={styles.formFooter}>
                                <div className={styles.footerBadge}>
                                    <ShieldCheck size={14} /> <span>Bảo mật thông tin</span>
                                </div>
                                <div className={styles.footerBadge}>
                                    <Heart size={14} /> <span>Tư vấn tận tâm</span>
                                </div>
                                <div className={styles.footerBadge}>
                                    <Clock size={14} /> <span>Hoàn toàn miễn phí</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
