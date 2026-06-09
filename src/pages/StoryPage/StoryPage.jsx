import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Diamond, Users, Zap, Leaf, Scale, Heart, TrendingUp } from 'lucide-react';
import heroBg from '../../assets/Ảnh UI/ảnh chi tiết/about.png';
import heroBg1 from '../../assets/Ảnh UI/ảnh chi tiết/about..png';
import heroBg3 from '../../assets/Ảnh UI/ảnh chi tiết/about...png';
import heroBg2 from '../../assets/Ảnh UI/ảnh chi tiết/kichhoat.png';
import heroBg4 from '../../assets/Ảnh UI/ảnh chi tiết/nangluongtichcuc.jpg';
import heroBg5 from '../../assets/Ảnh UI/ảnh chi tiết/donghanh.png';
import styles from './StoryPage.module.css';

/* ───── animation preset ───── */
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.8 },
};

const fadeUpDelay = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.8, delay },
});

/* ───── section data ───── */
const beliefCards = [
    {
        id: 1,
        icon: <Diamond size={28} strokeWidth={1.5} />,
        title: 'ĐÁ TỰ NHIÊN',
        desc: 'Đợi từ thiên nhiên, lành cho năng lượng.',
        img: heroBg2,
    },
    {
        id: 2,
        icon: <Users size={28} strokeWidth={1.5} />,
        title: 'THIẾT KẾ CÁ NHÂN HÓA',
        desc: 'Mỗi người đều có câu chuyện riêng.',
        img: heroBg3,
    },
    {
        id: 3,
        icon: <Zap size={28} strokeWidth={1.5} />,
        title: 'NĂNG LƯỢNG TÍCH CỰC',
        desc: 'Vòng tay giúp kết nối và nuôi dưỡng năng lượng tốt lành mỗi ngày.',
        img: heroBg4,
    },
];

const valueCards = [
    { id: 1, icon: <Leaf size={26} strokeWidth={1.5} />, title: 'Bình an', desc: 'Sự an yên bắt đầu từ bên trong.' },
    { id: 2, icon: <Scale size={26} strokeWidth={1.5} />, title: 'Cân bằng', desc: 'Hài hòa giữa thân – tâm – trí.' },
    { id: 3, icon: <Heart size={26} strokeWidth={1.5} />, title: 'Biết ơn', desc: 'Biết ơn cuộc sống, biết ơn chính mình.' },
    { id: 4, icon: <TrendingUp size={26} strokeWidth={1.5} />, title: 'Trưởng thành', desc: 'Mỗi ngày là một phiên bản tốt hơn.' },
];

const checkItems = [
    'Tôn trọng tự nhiên, chọn lọc bằng văn đá',
    'Thiết kế với sự tỉ mỉ và chân thực',
    'Đồng hành để bạn cảm nhận giá trị thật sự',
    'Mang đến cảm giác an yên tử những điều nhỏ bé.',
];

export default function StoryPage() {
    return (
        <div className={styles.page}>

            {/* ── S2: HERO STORY ─────────────────────── */}
            <section className={styles.heroSection}>
                <div className={styles.heroBgContainer}>
                    <img
                        src={heroBg}
                        alt="Câu chuyện về Cát"
                        className={styles.heroFullImg}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>

                <div className={styles.container}>
                    <motion.div className={styles.heroContent} {...fadeUp}>
                        <h1 className={styles.heroTitle}>
                            Câu chuyện<br />
                            <span className={styles.heroTitleAccent}>về Cát</span>
                        </h1>
                        <p className={styles.heroDesc}>
                            Mỗi viên đá đều chứa đựng một lời thì thầm từ tự nhiên, và Cát ở đây để kể câu chuyện đó theo cách đẹp nhất, chạm đến trái tim và trở thành một phần hành trình của bạn.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── S3: CÁT RA ĐỜI ────────────────────── */}
            <section className={styles.originSection}>
                <div className={styles.container}>
                    <div className={styles.originGrid}>
                        {/* LEFT: image */}
                        <motion.div
                            className={styles.originImgWrap}
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.9 }}
                        >
                            <img
                                src={heroBg1}
                                alt="Cô gái"
                                className={styles.originImg}
                            />
                        </motion.div>
                        {/* RIGHT: content */}
                        <motion.div className={styles.originContent} {...fadeUp}>
                            <span className={styles.sectionNumber}>01</span>
                            <h2 className={styles.sectionTitle}>CÁT RA ĐỜI NHƯ THẾ NÀO?</h2>
                            <p className={styles.sectionSubtitle}>Khi nguyên đá kể chuyện cùng cảm xúc</p>
                            <p className={styles.sectionDesc}>
                                Cát bắt nguồn từ tình yêu với vẻ đẹp tự nhiên và ý nghĩa của từng viên đá.
                            </p>
                            <p className={styles.sectionDesc}>
                                Chúng tôi tin rằng mỗi viên đá là một câu chuyện riêng, và mỗi chiếc vòng tay đến tay bạn là một lời gắn kết yêu thương đến người sở hữu.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── S4: BANNER ĐỎ ─────────────────────── */}
            <section className={styles.redBannerSection}>
                <div className={styles.container}>
                    <motion.div className={styles.redBanner} {...fadeUp}>
                        {/* Decorative floral */}
                        <span className={styles.floralLeft}>✦</span>
                        <span className={styles.floralRight}>✦</span>

                        <div className={styles.redBannerLeft}>
                            <span className={styles.sectionNumberLight}>02</span>
                            <p className={styles.redBannerLabel}>Ý NGHĨA TÊN GỌI</p>
                            <h2 className={styles.redBannerTitle}>
                                Tại sao<br />
                                <em>là Cát?</em>
                            </h2>
                        </div>
                        <div className={styles.redBannerRight}>
                            <p className={styles.redBannerQuote}>
                                "Cát" gợi ra "Cát tường, An nhiên và Tinh tế".
                            </p>
                            <p className={styles.redBannerDesc}>
                                Vòng tay từ Cát là lời chúc nhỏ – Mang bình an, thu hút điều tốt lành và luôn đồng hành để bạn trở thành phiên bản tốt nhất.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── S5: ĐIỀU CÁT TIN TƯỞNG ────────────── */}
            <section className={styles.beliefSection}>
                <div className={styles.container}>
                    <motion.div className={styles.sectionHeader} {...fadeUp}>
                        <span className={styles.sectionNumber}>03</span>
                        <h2 className={styles.sectionTitleCenter}>ĐIỀU CÁT TIN TƯỞNG</h2>
                    </motion.div>
                    <div className={styles.beliefGrid}>
                        {beliefCards.map((card, i) => (
                            <motion.div
                                key={card.id}
                                className={styles.beliefCard}
                                {...fadeUpDelay(i * 0.15)}
                            >
                                <div className={styles.beliefImgWrap}>
                                    <img src={card.img} alt={card.title} className={styles.beliefImg} />
                                </div>
                                <div className={styles.beliefIconWrap}>
                                    {card.icon}
                                </div>
                                <h3 className={styles.beliefCardTitle}>{card.title}</h3>
                                <p className={styles.beliefCardDesc}>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S6: KHÔNG BÁN PHÉP MÀU ─────────────── */}
            <section className={styles.truthSection}>
                <div className={styles.container}>
                    <div className={styles.truthGrid}>
                        {/* LEFT: content */}
                        <motion.div className={styles.truthContent} {...fadeUp}>
                            <span className={styles.sectionNumber}>04</span>
                            <h2 className={styles.truthTitle}>CHÚNG TÔI KHÔNG BÁN PHÉP MÀU.</h2>
                            <p className={styles.truthSubtitle}>Chúng tôi đồng hành cùng niềm tin.</p>
                            <p className={styles.sectionDesc}>
                                Cát không hứa hẹn điều kỳ diệu.
                            </p>
                            <ul className={styles.checkList}>
                                {checkItems.map((item, i) => (
                                    <li key={i} className={styles.checkItem}>
                                        <CheckCircle2 size={18} strokeWidth={2} className={styles.checkIcon} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        {/* RIGHT: image */}
                        <motion.div
                            className={styles.truthImgWrap}
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.9 }}
                        >
                            <img
                                src={heroBg5}
                                alt="Vòng tay đá tự nhiên"
                                className={styles.truthImg}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── S7: GIÁ TRỊ CỐT LÕI ──────────────── */}
            <section className={styles.valuesSection}>
                <div className={styles.container}>
                    <motion.div className={styles.sectionHeader} {...fadeUp}>
                        <span className={styles.sectionNumber}>05</span>
                        <h2 className={styles.sectionTitleCenter}>GIÁ TRỊ CỐT LÕI</h2>
                    </motion.div>
                    <div className={styles.valuesGrid}>
                        {valueCards.map((card, i) => (
                            <motion.div
                                key={card.id}
                                className={styles.valueCard}
                                {...fadeUpDelay(i * 0.12)}
                            >
                                <div className={styles.valueIconWrap}>
                                    {card.icon}
                                </div>
                                <h3 className={styles.valueCardTitle}>{card.title}</h3>
                                <p className={styles.valueCardDesc}>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S8: CTA ĐỎ CUỐI TRANG ─────────────── */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <motion.div className={styles.ctaBanner} {...fadeUp}>
                        {/* Decorative */}
                        <span className={styles.ctaFloral}>✦</span>

                        <div className={styles.ctaLeft}>
                            <span className={styles.sectionNumberLight}>06</span>
                            <h2 className={styles.ctaTitle}>LỜI NHẮN TỪ CÁT</h2>
                            <p className={styles.ctaDesc}>
                                Cảm ơn bạn đã lựa chọn và tin yêu Cát. Mỗi chiếc vòng là một lời chúc nhỏ — một niềm tin đang dành cho bạn. Cát hy vọng sẽ tiếp tục là người đồng hành trên hành trình tìm về sự an yên và hạnh phúc.
                            </p>
                        </div>
                        <div className={styles.ctaBtns}>
                            <Link to="/collection" className={styles.ctaBtnPrimary}>
                                Khám phá bộ sưu tập
                            </Link>
                            <Link to="/collection" className={styles.ctaBtnOutline}>
                                Tìm vòng hợp mệnh →
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
