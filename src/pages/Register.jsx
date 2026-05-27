import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.authContainer}>
            <div className={styles.authTable}>
                {/* Visual Brand Side */}
                <div className={styles.visualSide}>
                    <img
                        className={styles.visualImg}
                        alt="Cát Bracelet Artisanal"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGTBjnbwSCOniOWA-OB9O-lWaAOwMIGfpWZfnJotIwZ4CfiWQVsO7-kmVbRPk97OlvyVfoyQ_1XloYUf3gIzyHNB4Ag77OnUrTUZQ01p0_ywzDcpVRkz8E3DaPVNdbsNxEtws-xGPZqGSUsPVJFpd7i_QTw2rmbZNeJ9aV0zLEPGIXxFLFtmtGKsBSpqbp0CZCQ9FD6KIdyS9NGKIWiOShiobgYep0PpVgqe8ekI-h5o5etqpAsAvUAj42cLJtMclrADVK5SnjIzkC"
                    />
                    <div className={styles.overlay}></div>
                    <div className={styles.visualContent + " " + styles.fadeIn}>
                        <p className="font-headline text-3xl mb-4 italic">"Mỗi viên đá là một câu chuyện."</p>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-secondary"></span>
                            <p className="font-body text-[10px] opacity-80 uppercase tracking-[0.3em]">Artisanal Radiance</p>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className={styles.formSide}>
                    <div className={styles.fadeIn}>
                        <div className="mb-10 text-center md:text-left">
                            <h1 className="font-headline text-4xl text-primary mb-2">Tạo tài khoản</h1>
                            <p className="font-body text-sm text-on-surface-variant">Bắt đầu hành trình tìm kiếm sự cân bằng và vẻ đẹp tự nhiên cùng Cát.</p>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Họ tên</label>
                                <input
                                    className={styles.input}
                                    placeholder="Nguyễn Văn A"
                                    type="text"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Email</label>
                                    <input
                                        className={styles.input}
                                        placeholder="example@cat.vn"
                                        type="email"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Số điện thoại</label>
                                    <input
                                        className={styles.input}
                                        placeholder="0901 234 567"
                                        type="tel"
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Mật khẩu</label>
                                <input
                                    className={styles.input}
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Xác nhận mật khẩu</label>
                                <input
                                    className={styles.input}
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>

                            <div className="pt-4">
                                <button className={styles.submitBtn} type="submit">
                                    Đăng ký
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>

                            <div className="mt-8 flex flex-col gap-4 text-center">
                                <p className="font-body text-sm text-on-surface-variant">
                                    Đã có tài khoản?
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="text-primary font-semibold hover:underline decoration-1 underline-offset-4 ml-1"
                                    >
                                        Đăng nhập
                                    </button>
                                </p>

                                <div className="relative flex items-center py-4">
                                    <div className="flex-grow border-t border-outline-variant/50"></div>
                                    <span className="flex-shrink mx-4 font-body text-[10px] text-on-surface-variant/50 uppercase tracking-widest">hoặc</span>
                                    <div className="flex-grow border-t border-outline-variant/50"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button className={styles.socialBtn}>
                                        <span className="material-symbols-outlined text-[20px]">google</span> Google
                                    </button>
                                    <button className={styles.socialBtn}>
                                        <span className="material-symbols-outlined text-[20px]">facebook</span> Facebook
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
