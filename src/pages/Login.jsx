import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { login } from '../services/authService';
import styles from './Register.module.css'; // Reusing common auth styles

const Login = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // API & Form State
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (window.innerWidth > 768) {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
                setMousePos({ x: moveX, y: moveY });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await login({
                email: formData.email,
                password: formData.password
            });

            // Save tokens and user info
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.user));

            console.log('Login success:', data.message);

            setShowSuccess(true);

            // Wait a bit then navigate
            setTimeout(() => {
                const roles = data.user.roles || [];
                const roleNames = roles.map(r => r.name.toUpperCase());

                const isAdmin = roleNames.includes('ADMIN');
                const isCustomer = roleNames.includes('CUSTOMER');

                if (isAdmin && !isCustomer) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }, 2000);
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Đăng nhập không thành công. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/20 backdrop-blur-md"
                    >
                        <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-primary/10">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <span className="material-symbols-outlined text-4xl">celebration</span>
                            </div>
                            <h2 className="font-headline text-3xl text-primary mb-2">Đăng nhập thành công</h2>
                            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                                Đang đưa bạn trở về với không gian của Cát...
                            </p>
                            <div className="mt-8 flex justify-center">
                                <div className="flex gap-1">
                                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.span>
                                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.span>
                                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full"></motion.span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.authTable}>
                {/* Left Side: Artisanal Imagery */}
                <section className={styles.visualSide}>
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Cát Bracelet Login"
                            className={styles.visualImg}
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjFQHMbTdM5pphHIlndOfusSHAxJsS3CUnY8Zof1x5L4QZ_gKb1exIEG4az3wwnVmnJuSbEd7PqmiMz5ICwk3iqqOUQ11_N3UICr20d-bw_AFwCTcUXHwdCyoY-X9uuN3Q0AyUg9_pGtcMsKGSb4UUvUppfET9_Z2Iuvfc6_kiRZTJuF65iS9DU74a0ktCmPzkCSUWV8ENP4sC88azgMdgdQajxUX5U3btVuMx7XqheS6-MPZI1zf1JyJQoqKkPd4QuTeSOozYvXp8"
                            style={{ transform: `scale(1.1) translate(${mousePos.x}px, ${mousePos.y}px)` }}
                        />
                    </div>
                    <div className={styles.overlay}></div>
                    <div className={styles.visualContent + " " + styles.fadeIn}>
                        <h1 className="font-headline text-5xl text-on-primary tracking-tighter mb-4">
                            Cát Bracelet
                        </h1>
                        <p className="font-body text-sm text-on-primary/80 max-w-xs italic mb-6">
                            "Nơi vẻ đẹp tự nhiên hòa quyện cùng bàn tay người nghệ nhân."
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-secondary"></span>
                            <span className="font-body text-[10px] text-secondary tracking-[0.3em] uppercase">Artisanal Wisdom</span>
                        </div>
                    </div>
                </section>

                {/* Right Side: Login Form */}
                <section className={styles.formSide}>
                    <div className={styles.fadeIn}>
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="font-headline text-4xl text-primary mb-2">Đăng nhập</h2>
                            <p className="font-body text-sm text-on-surface-variant">Chào mừng bạn trở lại với không gian tĩnh lặng của Cát.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                                <p className="text-sm text-red-600 font-body flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    {error}
                                </p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="email">Email</label>
                                <input
                                    className={styles.input}
                                    id="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="password">Mật khẩu</label>
                                <input
                                    className={styles.input}
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    type={passwordVisible ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="absolute right-0 top-3 text-on-surface-variant hover:text-primary transition-colors"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {passwordVisible ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between pb-2">
                                <div className="flex items-center">
                                    <input className="h-4 w-4 text-primary border-outline-variant rounded focus:ring-primary/20 cursor-pointer" id="remember-me" name="remember-me" type="checkbox" />
                                    <label className="ml-2 block font-body text-xs text-on-surface-variant cursor-pointer" htmlFor="remember-me">Ghi nhớ tôi</label>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate('/forgot-password')}
                                    className="font-body text-xs text-primary hover:underline underline-offset-4 transition-all"
                                >
                                    Quên mật khẩu?
                                </button>
                            </div>

                            <button
                                className={`${styles.submitBtn} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </span>
                                ) : 'Đăng nhập'}
                            </button>
                        </form>

                        <div className="relative flex items-center py-8">
                            <div className="flex-grow border-t border-outline-variant/50"></div>
                            <span className="flex-shrink mx-4 font-body text-[10px] text-on-surface-variant/50 uppercase tracking-widest">hoặc</span>
                            <div className="flex-grow border-t border-outline-variant/50"></div>
                        </div>

                        <div className="text-center space-y-6">
                            <p className="font-body text-sm text-on-surface-variant">
                                Chưa có tài khoản?
                                <button
                                    onClick={() => navigate('/register')}
                                    className="text-primary font-bold hover:underline decoration-secondary underline-offset-4 ml-1 transition-all"
                                >
                                    Đăng ký ngay
                                </button>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Login;


