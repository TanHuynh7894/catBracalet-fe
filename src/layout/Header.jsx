import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

// === Local Assets ===
import logoImg from '../assets/Image - Cat/Logo Cat/logoCat-PNG.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const isTransparentPage = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/story';

    return (
        <header
            className={`${styles.header} ${isScrolled || !isTransparentPage ? styles.headerGlass : styles.headerTransparent}`}
        >
            <div className={styles.container}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
                    <img src={logoImg} alt="Cat Bracelet" className="h-10 w-auto group-hover:scale-105 transition-transform" />
                    <span className={`${styles.logo} ${isScrolled || !isTransparentPage ? 'text-[#680006]' : 'text-white'}`}>
                        Cát Bracelet
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    {[
                        { name: 'Trang chủ', path: '/' },
                        { name: 'Bộ sưu tập', path: '/collections' },
                        { name: 'Câu chuyện', path: '/story' },
                        { name: 'Về chúng tôi', path: '/about' },
                    ].map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`${styles.navLink} ${location.pathname === link.path
                                ? (isScrolled || !isTransparentPage ? 'border-[#680006] text-[#680006]' : 'border-white text-white')
                                : (isScrolled || !isTransparentPage ? 'border-transparent text-[#59413e] hover:text-[#680006]' : 'border-transparent text-white/80 hover:text-white')
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className={styles.iconGroup}>
                    <button className={`${styles.iconButton} ${isScrolled || !isTransparentPage ? 'text-[#59413e]' : 'text-white'}`}>
                        <Search size={20} />
                    </button>
                    <Link to="/login" className={`${styles.iconButton} ${isScrolled || !isTransparentPage ? 'text-[#59413e]' : 'text-white'}`}>
                        <User size={20} />
                    </Link>
                    <button className={`${styles.iconButton} relative ${isScrolled || !isTransparentPage ? 'text-[#59413e]' : 'text-white'}`}>
                        <ShoppingBag size={20} />
                        <span className="absolute -top-1 -right-1 bg-[#680006] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </button>
                    <button
                        className="md:hidden text-[#59413e]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} className={isScrolled || !isTransparentPage ? 'text-[#59413e]' : 'text-white'} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-outline-variant/10 py-8 px-margin-mobile flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                    <Link to="/" className="text-sm uppercase tracking-widest font-bold">Trang chủ</Link>
                    <Link to="/collections" className="text-sm uppercase tracking-widest font-bold">Bộ sưu tập</Link>
                    <Link to="/story" className="text-sm uppercase tracking-widest font-bold">Câu chuyện</Link>
                    <Link to="/about" className="text-sm uppercase tracking-widest font-bold">Về chúng tôi</Link>
                </div>
            )}
        </header>
    );
};

export default Header;
