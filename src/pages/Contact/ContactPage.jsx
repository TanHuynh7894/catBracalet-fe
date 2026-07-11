import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, ShieldCheck, Heart, Clock } from 'lucide-react';
import styles from './ContactPage.module.css';
import logoImg from '../../assets/Image - Cat/Logo Cat/logoCat-PNG.png';
import ShopMap from '../../components/ShopMap';
import heroBg from '../../assets/Ảnh UI/ảnh chi tiết/lienhe.png';

const TiktokIcon = ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.7 },
};

const fadeUpDelay = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.6, delay },
});

const GENDER_OPTIONS = ['Nam', 'Nữ', 'Khác'];

const ContactPage = () => {
    const [form, setForm] = useState({
        fullName: '',
        dob: '',
        birthTime: '',
        gender: 'Nam',
        phone: '',
        goal: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate submit
        await new Promise(res => setTimeout(res, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className={styles.page}>

            {/* ── HERO ─────────────────────────────────────── */}
            <section className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <motion.div {...fadeUp}>
                        <p className={styles.heroEyebrow}>Kết nối với Cát</p>
                        <h1 className={styles.heroTitle}>
                            Liên hệ &amp;{' '}
                            <span className={styles.heroAccent}>Tư vấn</span>
                        </h1>
                        <p className={styles.heroDesc}>
                            Đội ngũ chuyên gia của Cát Bracelet luôn sẵn sàng đồng hành cùng bạn trong hành trình tìm về năng lượng và vẻ đẹp tinh khiết từ đá tự nhiên.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── CONTACT INFO + CONSULTATION FORM ───────── */}
            <section className={styles.mainSection}>
                <div className={styles.container}>
                    <div className={styles.mainGrid}>

                        {/* LEFT: Contact Info */}
                        <motion.aside className={styles.infoCol} {...fadeUpDelay(0)}>
                            <div className={styles.infoCard}>
                                <img src={logoImg} alt="Cát Bracelet" className={styles.infoLogo} />
                                <p className={styles.infoBrandDesc}>
                                    Cát Bracelet – Mang nghệ thuật đá tự nhiên vào đời sống phong thủy hiện đại. Năng lượng tinh khiết cho tâm hồn an lạc.
                                </p>

                                <div className={styles.contactList}>
                                    <div className={styles.contactItem}>
                                        <span className={styles.contactIcon}><MapPin size={17} /></span>
                                        <span>Số 31 đường 30, Phường Cát Lái, Hồ Chí Minh</span>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <span className={styles.contactIcon}><Phone size={17} /></span>
                                        <a href="tel:0986744084" className={styles.contactLink}>0986 744 084</a>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <span className={styles.contactIcon}><Mail size={17} /></span>
                                        <a href="mailto:catbracelets204@gmail.com" className={styles.contactLink}>catbracelets204@gmail.com</a>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <span className={styles.contactIcon}><Clock size={17} /></span>
                                        <span>Thứ 2 – Chủ nhật: 8:00 – 21:00</span>
                                    </div>
                                </div>

                                <div className={styles.socialRow}>
                                    <a href="https://www.instagram.com/catbracelet8386/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                                        <Instagram size={18} />
                                    </a>
                                    <a href="https://www.facebook.com/share/1CbYZScwwY/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                                        <Facebook size={18} />
                                    </a>
                                    <a href="https://www.tiktok.com/@cat.bracelets24?_r=1&_t=ZS-97d95n9gPmi" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="TikTok">
                                        <TiktokIcon size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.aside>

                        {/* RIGHT: Consultation Form */}
                        <motion.div className={styles.formCol} {...fadeUpDelay(0.15)}>
                            <div className={styles.formCard}>
                                <h2 className={styles.formTitle}>Tư vấn miễn phí – Chọn vòng hợp mệnh</h2>
                                <p className={styles.formSubtitle}>Điền thông tin để được chuyên gia tại Cát Bracelet tư vấn chi tiết.</p>

                                {submitted ? (
                                    <motion.div
                                        className={styles.successBox}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className={styles.successIcon}>✦</div>
                                        <h3>Cảm ơn bạn!</h3>
                                        <p>Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                                        <button className={styles.resetBtn} onClick={() => { setSubmitted(false); setForm({ fullName: '', dob: '', birthTime: '', gender: 'Nam', phone: '', goal: '' }); }}>
                                            Gửi thêm yêu cầu
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className={styles.formBody}>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Họ và tên</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={form.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Nhập họ và tên"
                                                    className={styles.formInput}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Ngày sinh</label>
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    value={form.dob}
                                                    onChange={handleChange}
                                                    className={styles.formInput}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Giờ sinh (nếu biết)</label>
                                                <input
                                                    type="time"
                                                    name="birthTime"
                                                    value={form.birthTime}
                                                    onChange={handleChange}
                                                    className={styles.formInput}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Giới tính</label>
                                                <select
                                                    name="gender"
                                                    value={form.gender}
                                                    onChange={handleChange}
                                                    className={styles.formSelect}
                                                >
                                                    {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Số điện thoại</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    placeholder="Nhập số điện thoại"
                                                    className={styles.formInput}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>Mục tiêu của bạn</label>
                                                <input
                                                    type="text"
                                                    name="goal"
                                                    value={form.goal}
                                                    onChange={handleChange}
                                                    placeholder="Ví dụ: Tài lộc, bình an..."
                                                    className={styles.formInput}
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                                            {loading ? (
                                                <span className={styles.spinner} />
                                            ) : 'GỬI THÔNG TIN'}
                                        </button>

                                        <div className={styles.formTrustRow}>
                                            <span className={styles.trustItem}><ShieldCheck size={14} /> Bảo mật thông tin</span>
                                            <span className={styles.trustItem}><Heart size={14} /> Tư vấn tận tâm</span>
                                            <span className={styles.trustItem}><Clock size={14} /> Hoàn toàn miễn phí</span>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── MAP SECTION ────────────────────────────── */}
            <section className={styles.mapSection}>
                <div className={styles.container}>
                    <ShopMap />
                </div>
            </section>

        </div>
    );
};

export default ContactPage;
