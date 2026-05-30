import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logoImg from '../assets/Image - Cat/Logo Cat/logoCat-PNG.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'TRANG CHỦ', href: '/', type: 'route' },
        { name: 'BỘ SƯU TẬP', href: '#collection', type: 'anchor' },
        { name: 'CÁT LÀ GÌ?', href: '#about', type: 'anchor' },
        { name: 'NĂNG LƯỢNG', href: '#how-it-works', type: 'anchor' },
        { name: 'CÂU CHUYỆN', href: '#story', type: 'anchor' },
        { name: 'ĐÁ PHONG THỦY', href: '#', type: 'anchor' },
        { name: 'ĐÁ TỰ NHIÊN', href: '#', type: 'anchor' },
    ];

    // Handle anchor links: if on home page, scroll to section; if on other page, navigate home first
    const handleAnchorClick = (e, href) => {
        if (href === '#') return;
        e.preventDefault();
        if (isHomePage) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${isScrolled ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo — React Router Link về trang chủ */}
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <img src={logoImg} alt="Cát" className="h-10 md:h-12 w-auto object-contain" />
                </Link>

                {/* Nav Center */}
                <nav className="hidden xl:flex items-center gap-8">
                    {navLinks.map((link) =>
                        link.type === 'route' ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-[11px] font-bold tracking-widest text-wine/60 hover:text-wine transition-colors"
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleAnchorClick(e, link.href)}
                                className="text-[11px] font-bold tracking-widest text-wine/60 hover:text-wine transition-colors cursor-pointer"
                            >
                                {link.name}
                            </a>
                        )
                    )}
                </nav>

                {/* Button Right */}
                <div className="flex items-center gap-4">
                    <a
                        href="#consultation"
                        onClick={(e) => handleAnchorClick(e, '#consultation')}
                        className="hidden lg:flex items-center gap-3 bg-wine text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                    >
                        Tư vấn chọn vòng
                        <ChevronDown size={14} />
                    </a>

                    <button
                        className="xl:hidden text-wine"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-wine/5 py-10 px-6 flex flex-col gap-6 xl:hidden"
                    >
                        {navLinks.map((link) =>
                            link.type === 'route' ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sm font-bold tracking-widest text-wine border-b border-wine/5 pb-4"
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => { handleAnchorClick(e, link.href); }}
                                    className="text-sm font-bold tracking-widest text-wine border-b border-wine/5 pb-4"
                                >
                                    {link.name}
                                </a>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
