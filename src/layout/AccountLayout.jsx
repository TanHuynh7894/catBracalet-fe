import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { User, ReceiptText, MapPin, Heart, LogOut, Edit2, ShieldCheck, Lock, Camera, Loader2 } from 'lucide-react';
import styles from './AccountLayout.module.css';
import Reveal from '../components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '../components/animations/Stagger';
import { motion } from 'framer-motion';
import { logout as authLogout } from '../services/authService';
import { getProfile, updateProfile } from '../services/userService';

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
        window.addEventListener('storage', fetchProfile);
        return () => window.removeEventListener('storage', fetchProfile);
    }, [navigate]);

    const handleLogout = async () => {
        await authLogout();
        navigate('/login');
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const data = new FormData();
            data.append('avatar', file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);

            const updated = await updateProfile(userData.id, data);
            setProfile(updated);


            localStorage.setItem('user', JSON.stringify({
                ...userData,
                avatar: updated.avatar
            }));

            window.dispatchEvent(new Event('storage'));
        } catch (err) {
            console.error('Failed to update avatar:', err);
            alert('Không thể tải ảnh lên. Vui lòng thử lại.');
        }
    };

    const navItems = [
        { path: '/profile', label: 'Thông tin cá nhân', icon: User },
        { path: '/change-password', label: 'Thay đổi mật khẩu', icon: Lock },
        { path: '/order-history', label: 'Lịch sử đơn hàng', icon: ReceiptText },
        { path: '/shipping-addresses', label: 'Địa chỉ giao hàng', icon: MapPin },
    ];


    const getVipName = () => profile?.vipLevel?.levelName || 'Thành viên mới';


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
                {}
                <Reveal className="mb-12">
                    <header className="flex flex-col md:flex-row items-center gap-6 mb-0">
                        <div className="relative group">
                            <motion.div
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-surface-container transition-transform duration-500 bg-outline-variant/30 flex items-center justify-center text-primary relative"
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

                                {}
                                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-[2px]">
                                    <Camera size={24} className="text-white mb-1" />
                                    <span className="text-[10px] text-white font-bold uppercase tracking-wider">Đổi ảnh</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                </label>
                            </motion.div>

                            {}
                            {profile?.status === 'ACTIVE' && (
                                <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-background rounded-full z-20 shadow-lg" title="Đang hoạt động"></div>
                            )}
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
                            {}
                            <p className="font-body text-body-md text-on-surface-variant italic">
                                Thành viên từ {profile ? new Date(profile.createdAt).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }) : '...'}
                            </p>
                        </div>
                    </header>

                    {}
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                    {}
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
