import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { User, ReceiptText, MapPin, Heart, LogOut, Edit2, ShieldCheck, Lock } from 'lucide-react';
import styles from './AccountLayout.module.css';
import Reveal from '../components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '../components/animations/Stagger';
import { motion } from 'framer-motion';
import { logout as authLogout } from '../services/authService';
import { getProfile } from '../services/userService';

const AccountLayout = ({ activeTab }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData && userData.id) {
                    const data = await getProfile(userData.id);
                    setProfile(data);
                } else {
                    navigate('/login');
                }
            } catch (err) {
                console.error('Error fetching profile in layout:', err);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = async () => {
        await authLogout();
        navigate('/login');
    };

    const navItems = [
        { path: '/profile', label: 'Thông tin cá nhân', icon: User },
        { path: '/change-password', label: 'Thay đổi mật khẩu', icon: Lock },
        { path: '/order-history', label: 'Lịch sử đơn hàng', icon: ReceiptText },
        { path: '/shipping-addresses', label: 'Địa chỉ giao hàng', icon: MapPin },
        { path: '/wishlist', label: 'Sản phẩm yêu thích', icon: Heart },
    ];

    // Helper for VIP Name
    const getVipName = () => profile?.vipLevel?.levelName || 'Thành viên mới';

    // Helper for progress bar
    const getProgress = () => {
        if (!profile?.vipLevel) return '0%';
        const names = ['Đồng', 'Bạc', 'Silver', 'Gold', 'Vàng', 'Kim Cương'];
        const current = names.indexOf(profile.vipLevel.levelName);
        if (current === -1) return '10%';
        return `${((current + 1) / names.length) * 100}%`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="pt-16 pb-20 max-w-[1400px] mx-auto px-4 md:px-10 w-full">
                {/* User Header Section */}
                <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-12 items-center">
                    <header className="lg:col-span-4 flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-6 mb-0">
                        <div className="relative group">
                            <motion.div
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-surface-container transition-transform duration-500 bg-outline-variant/30 flex items-center justify-center text-primary"
                                whileHover={{ scale: 1.05 }}
                            >
                                {profile?.avatar ? (
                                    <img
                                        alt={profile.fullName}
                                        className="w-full h-full object-cover"
                                        src={profile.avatar}
                                    />
                                ) : (
                                    <User size={64} />
                                )}
                                {/* Active Status Dot */}
                                {profile?.status === 'ACTIVE' && (
                                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-background rounded-full z-20 shadow-lg" title="Đang hoạt động"></div>
                                )}
                            </motion.div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="font-headline text-headline-lg text-on-surface">{profile?.fullName || 'Đang tải...'}</h1>
                                <div className="flex gap-1.5">
                                    {profile?.roles?.map(role => (
                                        <span key={role.id} className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                                            {role.description}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary text-primary text-[10px] uppercase tracking-widest mb-4 font-semibold">
                                {getVipName()}
                            </span>
                            <p className="font-body text-body-md text-on-surface-variant italic">
                                Thành viên từ {profile ? new Date(profile.createdAt).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }) : '...'}
                            </p>
                        </div>
                    </header>

                    <section className="lg:col-span-8 relative bg-primary overflow-hidden rounded-[32px] p-6 md:p-10 text-white h-full flex flex-col justify-center shadow-lg">
                        <div className="relative z-10 w-full space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-headline text-headline-md tracking-tight">Cát Rewards</h3>
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-2 px-6 rounded-2xl flex items-center gap-3 shadow-lg">
                                    <ShieldCheck color="#D4AF37" size={20} />
                                    <p className="text-sm uppercase tracking-widest font-bold">{getVipName()}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end text-[10px] uppercase tracking-[0.2em] font-bold">
                                    <span className={getVipName() === 'Đồng' ? 'text-yellow-400' : 'text-white/60'}>Đồng</span>
                                    <span className={['Bạc', 'Silver'].includes(getVipName()) ? 'text-yellow-400' : 'text-white/60'}>Bạc</span>
                                    <span className={['Vàng', 'Gold'].includes(getVipName()) ? 'text-yellow-400' : 'text-white/60'}>Vàng</span>
                                    <span className={['Kim Cương', 'Diamond'].includes(getVipName()) ? 'text-yellow-400' : 'text-white/60'}>Kim Cương</span>
                                </div>
                                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: getProgress() }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="absolute top-0 left-0 h-full bg-white/30 rounded-full"
                                    ></motion.div>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <p className="font-body text-[13px] text-white/70">
                                        Tiến độ tích lũy: <span className="font-bold text-white">{profile?.totalSpending ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(profile.totalSpending) : '0₫'}</span>
                                    </p>
                                    <div className="text-right">
                                        <p className="font-headline text-2xl font-bold tracking-tighter text-yellow-500">
                                            {profile?.vipLevel?.discountPercent || 0}% <span className="text-[10px] text-white/50 uppercase tracking-widest font-normal">Discount</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/20">
                                <p className="text-[11px] font-bold flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-yellow-400" />
                                    ĐẶC QUYỀN {getVipName().toUpperCase()}:
                                    <span className="font-medium opacity-90">{profile?.vipLevel?.benefits || 'Giảm giá cực sốc cho mọi đơn hàng'}</span>
                                </p>
                            </div>
                        </div>
                        {/* Luxury Accents */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-[100px]"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-[60px]"></div>
                    </section>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-3">
                        <StaggerContainer className="flex flex-col space-y-1">
                            {navItems.map((item, idx) => (
                                <StaggerItem key={idx}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                    >
                                        <item.icon size={20} className={styles.navIcon} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </StaggerItem>
                            ))}
                            <StaggerItem>
                                <hr className="my-4 border-outline-variant/30" />
                                <button
                                    onClick={handleLogout}
                                    className={`${styles.navLink} text-error hover:bg-red-500/10 transition-colors w-full text-left`}
                                >
                                    <LogOut size={20} className={styles.navIcon} />
                                    <span>Đăng xuất</span>
                                </button>
                            </StaggerItem>
                        </StaggerContainer>
                    </aside>

                    <section className="lg:col-span-9">
                        <Outlet />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AccountLayout;
