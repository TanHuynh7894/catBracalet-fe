import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

// === Local Assets ===
import logoImg from '../assets/Image - Cat/Logo Cat/logoCat-PNG.png';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Brand Section */}
                <div className={styles.brandInfo}>
                    <div className="flex items-center gap-3 mb-6">
                        <img src={logoImg} alt="Cat Bracelet" className="h-10 w-auto" />
                        <span className={styles.logo}>Cát Bracelet</span>
                    </div>
                    <p className={styles.description}>
                        Chế tác những món trang sức mang ý niệm bình an và tĩnh tại từ những viên đá tự nhiên thô mộc.
                    </p>
                    <div className={styles.socialGroup}>
                        <a href="#" className={styles.socialLink}><Facebook size={20} /></a>
                        <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
                        <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Links Section */}
                <div className={styles.linkGrid}>
                    <div className={styles.linkCol}>
                        <h4 className={styles.linkTitle}>Khám phá</h4>
                        <a href="/collections" className={styles.link}>Bộ sưu tập</a>
                        <a href="/story" className={styles.link}>Câu chuyện</a>
                        <a href="/about" className={styles.link}>Về chúng tôi</a>
                    </div>
                    <div className={styles.linkCol}>
                        <h4 className={styles.linkTitle}>Hỗ trợ</h4>
                        <a href="#" className={styles.link}>Chính sách bảo hành</a>
                        <a href="#" className={styles.link}>Vận chuyển & Đổi trả</a>
                        <a href="#" className={styles.link}>Thanh tẩy đá quý</a>
                    </div>
                    <div className={styles.linkCol}>
                        <h4 className={styles.linkTitle}>Liên hệ</h4>
                        <div className="flex items-start gap-3 mt-1">
                            <MapPin size={16} className="text-[#680006] mt-1 shrink-0" />
                            <span className="text-xs text-[#59413e]">456 Đường Đá Quý, Quận 1, TP. HCM</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                            <Phone size={16} className="text-[#680006] shrink-0" />
                            <span className="text-xs text-[#59413e]">0908 123 456</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                            <Mail size={16} className="text-[#680006] shrink-0" />
                            <span className="text-xs text-[#59413e]">hello@catbracelet.com</span>
                        </div>
                    </div>
                </div>
            </div>

        
        </footer>
    );
};

export default Footer;
