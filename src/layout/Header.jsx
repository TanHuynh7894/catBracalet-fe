import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            id="main-header"
            className={`fixed top-0 w-full z-50 transition-all duration-500 py-4 border-b ${isScrolled
                ? 'glass-effect bg-white/95 py-2 shadow-sm border-outline-variant/10'
                : 'bg-transparent border-transparent'
                }`}
        >
            <div className="flex justify-between items-center max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop h-14">
                <div className={`font-headline text-2xl md:text-2xl font-medium tracking-tight uppercase transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                    <span style={{ letterSpacing: '1px', textTransform: 'none' }}>Cát Bracelet</span>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <a className={`font-body text-[11px] uppercase pb-1 tracking-[0.15em] transition-colors duration-300 border-b ${isScrolled ? 'text-primary border-primary' : 'text-white border-white'
                        }`} href="#">Trang chủ</a>
                    <a className={`font-body text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ${isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/70 hover:text-white'
                        }`} href="#">Bộ sưu tập</a>
                    <a className={`font-body text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ${isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/70 hover:text-white'
                        }`} href="#">Câu chuyện</a>
                    <a className={`font-body text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ${isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/70 hover:text-white'
                        }`} href="#">Về chúng tôi</a>
                </nav>

                <div className="flex items-center space-x-5">
                    <button className={`transition-all duration-300 hover:opacity-70 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                        <Search size={20} strokeWidth={1.5} />
                    </button>
                    <button className={`transition-all duration-300 hover:opacity-70 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                        <User size={20} strokeWidth={1.5} />
                    </button>
                    <button className={`transition-all duration-300 hover:opacity-70 ${isScrolled ? 'text-primary' : 'text-white'} relative`}>
                        <ShoppingBag size={20} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
