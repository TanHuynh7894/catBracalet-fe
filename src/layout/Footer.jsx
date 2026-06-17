import React from 'react';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';
import logoImg from '../assets/Image - Cat/Logo Cat/logoCat-PNG.png';
import ShopMap from '../components/ShopMap';

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
                            <a href="#" className={styles.socialIcon}><Instagram size={18} /></a>
                            <a href="#" className={styles.socialIcon}><Facebook size={18} /></a>
                            <a href="#" className={styles.socialIcon}><Youtube size={18} /></a>
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
                                <span>123 Nam Kỳ Khởi Nghĩa, Q.1, HCM</span>
                            </li>
                            <li className={styles.navLink} style={{ textTransform: 'none', display: 'flex', gap: '10px' }}>
                                <Phone size={16} color="#d8b27d" />
                                <span>0868 123 456</span>
                            </li>
                            <li className={styles.navLink} style={{ textTransform: 'none', display: 'flex', gap: '10px' }}>
                                <Mail size={16} color="#d8b27d" />
                                <span>hello@catbracelet.vn</span>
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
