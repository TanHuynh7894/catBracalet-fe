import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingBag, LogOut, Settings, ListOrdered } from 'lucide-react';
import { logout } from '../services/authService';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/Image - Cat/Logo Cat/logoCat-PNG.png';

const Header = () => {
    const { cartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const checkUser = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null);
            }
        };

        checkUser();
        // Check user on storage change (for cross-tab or within tab updates)
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, [location]);

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
        { name: 'Thiết kế riêng', href: '/custom', type: 'route' },
        { name: 'Câu chuyện', href: '/story', type: 'route' },
    ];

    // Thêm link Admin nếu user có quyền Admin
    const isAdmin = user && (
        // 1. Kiểm tra role dạng chuỗi đơn
        (typeof user.role === 'string' && user.role.toLowerCase() === 'admin') ||
        // 2. Kiểm tra roles dạng mảng (chuỗi hoặc object)
        (Array.isArray(user.roles) && user.roles.some(r => {
            const roleStr = typeof r === 'string' ? r : (r.roleName || r.name || r.description || '');
            return roleStr.toLowerCase().includes('admin');
        })) ||
        // 3. Kiểm tra role đơn lẻ dạng object
        (user.role?.roleName?.toLowerCase() === 'admin') ||
        (user.role?.description?.toLowerCase().includes('admin')) ||
        // 4. Cờ isAdmin trực tiếp nếu có
        user.isAdmin === true
    );






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

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setIsUserMenuOpen(false);
        navigate('/login');
    };

    const isActive = (href, type) => {
        if (type === 'route') return location.pathname === href;
        if (type === 'anchor' && isHomePage) return location.hash === href;
        return false;
    };

    return (
        <header
            className={`sticky top-0 left-0 w-full z-[999] transition-all duration-500 bg-[#FAF5EF]/95 backdrop-blur-md ${isScrolled ? 'py-2.5 shadow-lg border-b border-[#E8DED2]/40' : 'py-5'}`}
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-16 flex items-center justify-between">
                {/* ── LEFT: LOGO ─────────────────────────────────────────── */}
                <Link to="/" className="flex items-center shrink-0">
                    <img
                        src={logoImg}
                        alt="Cát"
                        className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
                    />
                </Link>

                {/* ── CENTER: NAV MENU ───────────────────────────────────── */}
                <nav className="hidden xl:flex items-center gap-16">
                    {navLinks.map((link) => {
                        const active = isActive(link.href, link.type);
                        return link.type === 'route' ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`relative text-[16px] font-bold tracking-wider transition-all duration-300 py-1
                                ${active ? 'text-[#7A1E1E]' : 'text-[#4B3A32]/80 hover:text-[#7A1E1E]'}`}
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
                                className={`relative text-[16px] font-bold tracking-wider transition-all duration-300 py-1
                                ${active ? 'text-[#7A1E1E]' : 'text-[#4B3A32]/80 hover:text-[#7A1E1E]'} cursor-pointer`}
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
                    {/* User Profile Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsUserMenuOpen(true)}
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                        <button
                            onClick={() => user ? navigate('/profile') : navigate('/login')}
                            className="text-[#4B3A32]/80 hover:text-[#7A1E1E] transition-colors py-2 flex items-center gap-1"
                        >
                            {user?.avatar ? (
                                <img src={user.avatar} alt="avatar" className="w-6 h-6 rounded-full object-cover border border-[#7A1E1E]/20" />
                            ) : (
                                <User size={22} strokeWidth={1.5} />
                            )}
                            {user && <span className="hidden lg:block text-[11px] font-semibold tracking-wide uppercase">{user.fullName.split(' ').pop()}</span>}
                        </button>

                        <AnimatePresence>
                            {isUserMenuOpen && user && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 top-full mt-1 w-40 bg-white shadow-2xl rounded-xl border border-[#4B3A32]/5 overflow-hidden"
                                >
                                    <div className="p-1">
                                        {isAdmin && (
                                            <button
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    navigate('/admin');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-[12px] text-[#7A1E1E] hover:bg-[#7A1E1E]/5 transition-all font-medium border-b border-[#4B3A32]/5"
                                            >
                                                <ListOrdered size={16} /> Quản trị
                                            </button>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-[12px] text-red-600 hover:bg-red-50 transition-all font-medium"
                                        >
                                            <LogOut size={16} /> Đăng xuất
                                        </button>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cart Icon — Navigates to Cart Page */}
                    <button
                        className="relative text-[#4B3A32]/80 hover:text-[#7A1E1E] transition-colors"
                        onClick={() => navigate('/cart')}
                        aria-label="Đi đến giỏ hàng"
                    >
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#7A1E1E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Consultation Button */}
                    <a
                        href="#consultation"
                        onClick={(e) => handleAnchorClick(e, '#consultation')}
                        className="hidden lg:block bg-[#7A1E1E] text-[#FAF5EF] px-8 py-3.5 rounded-full text-[14px] font-semibold tracking-normal hover:bg-[#5A1414] transition-all transform hover:scale-105 hover:shadow-md"
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
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    navigate('/profile');
                                }}
                                className="flex items-center gap-2 text-sm font-semibold text-[#4B3A32] mt-2"
                            >
                                <User size={18} /> {user ? 'Hồ sơ của tôi' : 'Đăng nhập'}
                            </button>
                            {user && (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm font-semibold text-red-600 mt-2"
                                >
                                    <LogOut size={18} /> Đăng xuất
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    navigate('/cart');
                                }}
                                className="flex items-center gap-2 text-sm font-semibold text-[#4B3A32] mt-2"
                            >
                                <ShoppingBag size={18} /> Giỏ hàng
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

