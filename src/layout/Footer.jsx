import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';
import logoImg from '../assets/Image - Cat/Logo Cat/logoCat-PNG.png';
import ShopMap from '../components/ShopMap';

const TiktokIcon = ({ size = 18 }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topGrid}>
                    {/* Column 1: Brand */}
                    <div className={styles.brandCol}>
                        <img src={logoImg} alt="Cát Bracelet" className={styles.footerLogo} />
                        <p className={styles.brandDesc}>
                            Cát Bracelet – Mang nghệ thuật đá tự nhiên vào đời sống phong thủy hiện đại.
                            Năng lượng tinh khiết cho tâm hồn an lạc.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://www.instagram.com/catbracelet8386/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Instagram size={18} /></a>
                            <a href="https://www.facebook.com/share/1CbYZScwwY/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><Facebook size={18} /></a>
                            <a href="https://www.tiktok.com/@cat.bracelets24?_r=1&_t=ZS-97d95n9gPmi" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><TiktokIcon size={18} /></a>
                        </div>
                    </div>

                    {/* Column 2: About */}
                    <div>
                        <h4 className={styles.navTitle}>Thương Hiệu</h4>
                        <ul className={styles.navList}>
                            <li><a href="#" className={styles.navLink}>Câu chuyện của Cát</a></li>
                            <li><a href="#" className={styles.navLink}>Tầm nhìn & Sứ mệnh</a></li>
                            <li><a href="#" className={styles.navLink}>Cát là gì?</a></li>
                            <li><a href="#" className={styles.navLink}>Đá tự nhiên tuyển chọn</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Policy */}
                    <div>
                        <h4 className={styles.navTitle}>Hỗ Trợ</h4>
                        <ul className={styles.navList}>
                            <li><a href="#" className={styles.navLink}>Chính sách bảo hành</a></li>
                            <li><a href="#" className={styles.navLink}>Giao hàng & Đổi trả</a></li>
                            <li><a href="#" className={styles.navLink}>Tư vấn chọn vòng</a></li>
                            <li><a href="#" className={styles.navLink}>Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className={styles.navTitle}>Liên Hệ</h4>
                        <ul className={styles.navList}>
                            <li className={styles.navLink} style={{ textTransform: 'none', display: 'flex', gap: '10px' }}>
                                <MapPin size={16} color="#d8b27d" />
                                <span>Số 31 đường 30, Phường Cát Lái, Hồ Chí Minh</span>
                            </li>
                            <li className={styles.navLink} style={{ textTransform: 'none', display: 'flex', gap: '10px' }}>
                                <Phone size={16} color="#d8b27d" />
                                <span>0986744084</span>
                            </li>
                            <li className={styles.navLink} style={{ textTransform: 'none', display: 'flex', gap: '10px' }}>
                                <Mail size={16} color="#d8b27d" />
                                <span>catbracelets204@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Map Section */}
                <ShopMap />

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p>© 2026 Cát Bracelet. Crafted for Luxury Spiritual Experience.</p>
                    <div className={styles.legalLinks}>
                        <a href="#" className={styles.legalLink}>Privacy Policy</a>
                        <a href="#" className={styles.legalLink}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
