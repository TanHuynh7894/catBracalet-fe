import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingBag } from 'lucide-react';
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
        { name: 'Trang chủ', href: '/', type: 'route' },
        { name: 'Bộ sưu tập', href: '/collection', type: 'route' },
        { name: 'Thiết kế riêng', href: '#custom-mix', type: 'anchor' },
        { name: 'Câu chuyện', href: '#story', type: 'anchor' },
    ];

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

    const isActive = (href, type) => {
        if (type === 'route') return location.pathname === href;
        if (type === 'anchor' && isHomePage) return location.hash === href;
        return false;
    };

    return (
        <header
            className={`sticky top-0 left-0 w-full z-[999] transition-all duration-500 bg-[#FAF5EF] ${isScrolled ? 'py-3 shadow-md' : 'py-5'
                }`}
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* ── LEFT: LOGO ─────────────────────────────────────────── */}
                <Link to="/" className="flex items-center shrink-0">
                    <img src={logoImg} alt="Cát" className="h-10 md:h-12 w-auto object-contain" />
                </Link>

                {/* ── CENTER: NAV MENU ───────────────────────────────────── */}
                <nav className="hidden xl:flex items-center gap-12">
                    {navLinks.map((link) => {
                        const active = isActive(link.href, link.type);
                        return link.type === 'route' ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`relative text-[13px] font-semibold tracking-wide transition-all duration-300 py-1
                                    ${active ? 'text-[#7A1E1E]' : 'text-[#4B3A32]/70 hover:text-[#7A1E1E]'}`}
                            >
                                {link.name}
                                {active && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#7A1E1E]"
                                    />
                                )}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleAnchorClick(e, link.href)}
                                className={`relative text-[13px] font-semibold tracking-wide transition-all duration-300 py-1
                                    ${active ? 'text-[#7A1E1E]' : 'text-[#4B3A32]/70 hover:text-[#7A1E1E]'} cursor-pointer`}
                            >
                                {link.name}
                                {active && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#7A1E1E]"
                                    />
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* ── RIGHT: ACTIONS ─────────────────────────────────────── */}
                <div className="flex items-center gap-6 md:gap-8">
                    {/* User Profile Icon */}
                    <button className="text-[#4B3A32]/80 hover:text-[#7A1E1E] transition-colors">
                        <User size={22} strokeWidth={1.5} />
                    </button>

                    {/* Cart Icon */}
                    <button className="relative text-[#4B3A32]/80 hover:text-[#7A1E1E] transition-colors">
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-1 bg-[#7A1E1E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </button>

                    {/* Consultation Button */}
                    <a
                        href="#consultation"
                        onClick={(e) => handleAnchorClick(e, '#consultation')}
                        className="hidden lg:block bg-[#7A1E1E] text-[#FAF5EF] px-7 py-3 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-[#5A1414] transition-all transform hover:scale-105"
                    >
                        Tư vấn miễn phí
                    </a>

                    {/* Mobile Toggle */}
                    <button
                        className="xl:hidden text-[#4B3A32]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 w-full bg-[#FAF5EF] shadow-xl overflow-hidden border-t border-[#4B3A32]/5 xl:hidden"
                    >
                        <div className="py-8 px-6 flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        if (link.type === 'route') {
                                            setIsMobileMenuOpen(false);
                                            navigate(link.href);
                                        } else {
                                            handleAnchorClick(e, link.href);
                                        }
                                    }}
                                    className="text-sm font-semibold text-[#4B3A32] hover:text-[#7A1E1E] transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button className="flex items-center gap-2 text-sm font-semibold text-[#4B3A32] mt-2">
                                <User size={18} /> Tài khoản
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

