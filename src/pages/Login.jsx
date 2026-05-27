import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; // Reusing common auth styles

const Login = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

    return (
        <div className={styles.authContainer}>
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

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="email">Email</label>
                                <input
                                    className={styles.input}
                                    id="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    required
                                    type="email"
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
                                <a className="font-body text-xs text-primary hover:underline underline-offset-4 transition-all" href="#">Quên mật khẩu?</a>
                            </div>

                            <button className={styles.submitBtn} type="submit">
                                Đăng nhập
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
