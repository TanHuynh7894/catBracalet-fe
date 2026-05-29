import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import logoImg from '../../assets/Image - Cat/Logo Cat/logoCat-PNG.png';

const LandingNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'TRANG CHỦ', href: '#' },
        { name: 'BỘ SƯU TẬP', href: '#collection' },
        { name: 'CÁT LÀ GÌ?', href: '#about' },
        { name: 'NĂNG LƯỢNG', href: '#how-it-works' },
        { name: 'CÂU CHUYỆN', href: '#story' },
        { name: 'ĐÁ PHONG THỦY', href: '#' },
        { name: 'ĐÁ TỰ NHIÊN', href: '#' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo Left */}
                <a href="#" className="flex items-center gap-3 shrink-0">
                    <img src={logoImg} alt="Cát" className="h-10 md:h-12 w-auto object-contain" />
                    
                </a>

                {/* Nav Center */}
                <nav className="hidden xl:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-bold tracking-widest text-wine/60 hover:text-wine transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Button Right */}
                <div className="flex items-center gap-4">
                    <a
                        href="#consultation"
                        className="hidden lg:flex items-center gap-3 bg-wine text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-burgundy transition-all"
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
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-bold tracking-widest text-wine border-b border-wine/5 pb-4"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default LandingNavbar;
