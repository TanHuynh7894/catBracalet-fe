import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, ReceiptText, MapPin, Heart, LogOut, Edit2, ShieldCheck } from 'lucide-react';
import styles from './AccountLayout.module.css';
import Reveal from '../components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '../components/animations/Stagger';
import { motion } from 'framer-motion';

const AccountLayout = ({ children, activeTab }) => {
    const navItems = [
        { path: '/profile', label: 'Thông tin cá nhân', icon: User },
        { path: '/order-history', label: 'Lịch sử đơn hàng', icon: ReceiptText },
        { path: '/shipping-addresses', label: 'Địa chỉ giao hàng', icon: MapPin },
        { path: '/wishlist', label: 'Sản phẩm yêu thích', icon: Heart },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">


            <main className="pt-16 pb-20 max-w-[1400px] mx-auto px-4 md:px-10 w-full">
                {/* User Header Section */}
                <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-12 items-stretch">
                    <header className="lg:col-span-4 flex flex-col md:flex-row lg:flex-col xl:flex-row items-center md:items-end lg:items-start xl:items-end gap-6 mb-0">
                        <div className="relative group">
                            <motion.div
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-surface-container transition-transform duration-500"
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                    alt="Nguyễn Văn A"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYJy3vO0B2oGA7hLwb9lG7hIkXgzPK9ZlpKum8nR05JsolgZRsi2SNZoBCDZ97sytH4PWiTDkSOfysYrW9B5qpcClRRgkUHIzdhZvaK0uBrTxQ27LMkLysQjED4k7gn7oVXmLKyL-m_BGyinmBCy84X-Z2TwgtVb0ASLfXXUYoNo09TG3-KAG4smcX_gpbNHp-9bh1AerisKal_Pvab2c3_R20KdrSgEHtulJ5stSCza9XVICRooe1kFlQQ709Yz1B_1-L_LpvWrDD"
                                />
                            </motion.div>
                            <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-container transition-colors">
                                <Edit2 size={18} />
                            </button>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="font-body text-label-sm text-primary mb-2 uppercase tracking-widest font-semibold">Thành viên thân thiết</p>
                            <h1 className="font-headline text-headline-lg text-on-surface mb-2">Nguyễn Văn A</h1>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase tracking-widest mb-4 font-semibold">Thành viên Vàng</span>
                            <p className="font-body text-body-md text-on-surface-variant italic">Thành viên từ Tháng 1, 2024</p>
                        </div>
                    </header>

                    <section className="lg:col-span-8 relative bg-primary overflow-hidden rounded-lg p-6 md:p-8 text-white h-full flex flex-col justify-center">
                        <div className="relative z-10 w-full space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-headline text-headline-md">Cát Rewards</h3>
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 rounded-lg flex items-center gap-3">
                                    <ShieldCheck color="#D4AF37" size={20} />
                                    <p className="text-sm uppercase tracking-wider font-semibold">Vàng</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end text-[8px] uppercase tracking-widest opacity-80">
                                    <span>Đồng</span>
                                    <span>Bạc</span>
                                    <span className="text-[#D4AF37] font-bold">Vàng</span>
                                    <span>Kim Cương</span>
                                </div>
                                <div className="relative h-1.5 bg-white/10 rounded-full">
                                    <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-[#CD7F32] via-[#C0C0C0] to-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2.5 h-2.5 bg-[#CD7F32] rounded-full border border-primary"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-2.5 h-2.5 bg-[#C0C0C0] rounded-full border border-primary"></div>
                                    <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-white"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-body text-[13px]">Còn <span className="font-bold text-[#D4AF37]">750 điểm</span> đến Kim Cương</p>
                                    <p className="font-headline text-lg">1,250 <span className="text-[10px] opacity-60 font-body uppercase">Điểm</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
                    </section>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-3">
                        <StaggerContainer className="flex flex-col space-y-1">
                            <StaggerItem>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                >
                                    <User size={20} className={styles.navIcon} />
                                    <span>Thông tin cá nhân</span>
                                </NavLink>
                            </StaggerItem>
                            <StaggerItem>
                                <NavLink
                                    to="/order-history"
                                    className={({ isActive }) => `${styles.navLink} ${isActive || activeTab === 'order-detail' ? styles.navLinkActive : ''}`}
                                >
                                    <ReceiptText size={20} className={styles.navIcon} />
                                    <span>Lịch sử đơn hàng</span>
                                </NavLink>
                            </StaggerItem>
                            <StaggerItem>
                                <NavLink
                                    to="/shipping-addresses"
                                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                >
                                    <MapPin size={20} className={styles.navIcon} />
                                    <span>Địa chỉ giao hàng</span>
                                </NavLink>
                            </StaggerItem>
                            <StaggerItem>
                                <NavLink
                                    to="/wishlist"
                                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                >
                                    <Heart size={20} className={styles.navIcon} />
                                    <span>Sản phẩm yêu thích</span>
                                </NavLink>
                            </StaggerItem>
                            <StaggerItem>
                                <hr className="my-4 border-outline-variant/30" />
                                <button className={`${styles.navLink} text-error hover:bg-error-container/10`}>
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
