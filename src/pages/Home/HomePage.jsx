import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { BraceletModel } from '../../components/ThreeD/BraceletModel';
import {
    Gem, Palette, Gift, Sparkles, ArrowRight, Heart,
    Leaf, Wind, Scale, Link as LinkIcon, Zap,
    ShieldCheck, Clock, Star, MoveRight, ChevronRight,
    Brain, Flower2, Flower, Play
} from 'lucide-react';
import { createConsultation } from '../../services/consultationService';
import { useToast } from '../../context/ToastContext';
import styles from './HomePage.module.css';

// ─── LOCAL ASSETS ────────────────────────────────────────────────────────────
import videoBg from '../../assets/0614.mp4';
import modelPath from '../../assets/model3D.glb';
import problemImg from '../../assets/Ảnh UI/ảnh chi tiết/Home ne.png';
import aboutBgImg from '../../assets/Ảnh UI/ảnh chi tiết/catlagi.png';
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
                <div className={styles.container}>
                    <div className={styles.heroGrid}>

                        {/* LEFT: Text content */}
                        <motion.div
                            className={styles.heroLeft}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className={styles.heroTitle}>
                                Trang sức đá tự nhiên<br />
                                kể câu chuyện của bạn.
                            </h1>
                            <p className={styles.heroDesc}>
                                Mỗi viên đá là một mảnh ghép từ thiên nhiên,<br />
                                mang năng lượng và vẻ đẹp thuần khiết.
                            </p>
                            <p className={styles.heroDesc2}>
                                Thiết kế riêng để tôn vinh cá tính và hành trình của bạn.
                            </p>
                            <div className={styles.heroActions}>
                                <motion.button
                                    className={styles.btnPrimary}
                                    onClick={() => navigate('/collection')}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Khám phá bộ sưu tập <ArrowRight size={16} />
                                </motion.button>
                                <motion.button
                                    className={styles.btnOutlineHero}
                                    onClick={() => navigate('/custom')}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Thiết kế riêng ✧
                                </motion.button>
                            </div>
                            <div className={styles.heroBadges}>
                                <div className={styles.heroBadgeItem}>
                                    <Leaf size={16} className={styles.heroBadgeIcon} />
                                    <div>
                                        <strong>Đá tự nhiên</strong>
                                        <span>Chọn lọc kỹ lưỡng</span>
                                    </div>
                                </div>
                                <div className={styles.heroBadgeItem}>
                                    <Sparkles size={16} className={styles.heroBadgeIcon} />
                                    <div>
                                        <strong>Thiết kế riêng</strong>
                                        <span>Cá nhân hóa theo bạn</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT: Pure Video showcase */}
                        <motion.div
                            className={styles.heroRight}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                        >
                            <div className={styles.heroVideoCard}>
                                {/* Video */}
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className={styles.heroVideo}
                                >
                                    <source src={videoBg} type="video/mp4" />
                                </video>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ 3D MODEL SECTION (Redesigned) ═════════════════════════════════ */}
            <section className={styles.modelSection}>
                <div className={styles.container}>
                    <div className={styles.modelGrid}>
                        <motion.div
                            className={styles.modelContent}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className={styles.modelBadge}>Trải nghiệm thực tế ảo</span>
                            <h2 className={styles.modelTitle}>
                                Nghệ thuật chế tác <br /> dưới góc nhìn 3D
                            </h2>
                            <p className={styles.modelDesc}>
                                Không chỉ dừng lại ở những bức ảnh, chúng tôi mang đến trải nghiệm
                                chân thực nhất. Bạn có thể xoay, phóng to để chiêm ngưỡng từng
                                vân đá xà cừ và sự tinh xảo trong cách bện dây thủ công của vòng Cát.
                            </p>

                            <div className={styles.modelHighlights}>
                                <div className={styles.highlightItem}>
                                    <div className={styles.highlightIcon}><Gem size={20} /></div>
                                    <div className={styles.highlightText}>
                                        <h4>Đá tự nhiên</h4>
                                        <p>Tuyển chọn từ những khối đá tinh khiết nhất</p>
                                    </div>
                                </div>
                                <div className={styles.highlightItem}>
                                    <div className={styles.highlightIcon}><Wind size={20} /></div>
                                    <div className={styles.highlightText}>
                                        <h4>Dây bện thủ công</h4>
                                        <p>Kỹ thuật đan thủ công bền bỉ, tinh tế</p>
                                    </div>
                                </div>
                                <div className={styles.highlightItem}>
                                    <div className={styles.highlightIcon}><Zap size={20} /></div>
                                    <div className={styles.highlightText}>
                                        <h4>Năng lượng</h4>
                                        <p>Thanh tẩy và kích hoạt bởi nghệ nhân</p>
                                    </div>
                                </div>
                                <div className={styles.highlightItem}>
                                    <div className={styles.highlightIcon}><Sparkles size={20} /></div>
                                    <div className={styles.highlightText}>
                                        <h4>Độc bản</h4>
                                        <p>Mỗi viên đá mang một vân sắc duy nhất</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className={styles.modelCanvasArea}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={styles.modelCanvasWrap}>
                                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                                    <Suspense fallback={null}>
                                        <BraceletModel modelPath={modelPath} />
                                    </Suspense>
                                </Canvas>
                            </div>
                        </motion.div>
                    </div>
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
                    <div className={styles.aboutGrid}>

                        {/* LEFT: Text */}
                        <motion.div className={styles.aboutLeft} {...fadeUp}>
                            <h2 className={styles.aboutTitle}>
                                Cát là gì? <span className={styles.aboutTitleDeco}>✦</span>
                            </h2>
                            <p className={styles.aboutDesc}>
                                Cát Bracelet là thương hiệu vòng tay đá được xây dựng dành cho những người trẻ yêu thích vẻ đẹp tinh tế và mong muốn lựa chọn một món phụ kiện mang ý nghĩa riêng với bản thân. Mỗi thiết kế được kết hợp từ đá, màu sắc và chi tiết phù hợp với mệnh, năm sinh hoặc năng lượng mà người đeo hướng đến, để chiếc vòng không chỉ đẹp khi phối cùng trang phục mà còn trở thành một dấu ấn cá nhân.
                            </p>
                        </motion.div>

                        {/* RIGHT: Image + Quote card */}
                        <motion.div
                            className={styles.aboutRight}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                        >
                            <div className={styles.aboutImgCard}>
                                <img src={aboutBgImg} alt="Vòng tay Cát" className={styles.aboutImg} />
                                {/* Quote card floating inside */}
                                <div className={styles.aboutQuoteCard}>
                                    <div className={styles.quoteIconLeft}>“</div>
                                    <div className={styles.quoteContent}>
                                        <p className={styles.quoteText}>Mỗi thiết kế là một câu chuyện.</p>
                                        <span className={styles.quoteSubText}>Cát đồng hành cùng bạn trên hành trình sống an yên và trọn vẹn.</span>
                                    </div>
                                    <div className={styles.quoteOrnamentRight}>
                                        <Leaf size={24} className={styles.ornamentIcon} strokeWidth={1} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* BOTTOM / LEFT-BOTTOM: Values items row */}
                        <motion.div className={styles.aboutValuesRow} {...fadeUp}>
                            {VALUES.map((v, i) => (
                                <motion.div key={i} className={styles.aboutValueItem} {...fadeUpDelay(i * 0.08)}>
                                    <div className={styles.aboutValueIcon}>{v.icon}</div>
                                    <strong className={styles.aboutValueLabel}>{v.label}</strong>
                                    <span className={styles.aboutValueSub}>
                                        {i === 0 ? 'Đá tự nhiên chọn lọc' : i === 1 ? 'Năng lượng thuần khiết' : i === 2 ? 'Hài hòa thân tâm trí' : 'Gắn kết yêu thương và ý nghĩa'}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                    </div>
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

            {/* ══ FEATURED COLLECTIONS (Hidden as requested) ══════════════ */}
            {/* <section className={styles.collectionsSection}>
                ...
            </section> */}

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
