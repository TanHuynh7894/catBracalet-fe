import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { requestPasswordReset, resetPassword } from '../services/authService';
import styles from './Register.module.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Request, 2: Reset, 3: Success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [formData, setFormData] = useState({
        otp: '',
        newPassword: ''
    });

    const handleRequestReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await requestPasswordReset(email);
            setStep(2);
        } catch (err) {
            setError(err.message || 'Không thể yêu cầu đặt lại mật khẩu. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await resetPassword({
                email,
                otp: formData.otp,
                newPassword: formData.newPassword
            });
            setStep(3);
        } catch (err) {
            setError(err.message || 'Đặt lại mật khẩu thất bại. Vui lòng kiểm tra mã OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <AnimatePresence mode="wait">
                {step === 3 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/10 backdrop-blur-md"
                    >
                        <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                <span className="material-symbols-outlined text-4xl">lock_open</span>
                            </div>
                            <h2 className="font-headline text-3xl text-primary mb-4">Hoàn tất!</h2>
                            <p className="font-body text-sm text-on-surface-variant mb-8">
                                Mật khẩu của bạn đã được thay đổi thành công. Vui lòng đăng nhập lại với mật khẩu mới.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-primary text-on-primary py-4 rounded-xl font-body text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                            >
                                Đăng nhập ngay
                            </button>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className={styles.authTable}>
                <div className={styles.visualSide}>
                    <img
                        className={styles.visualImg}
                        alt="Cát Bracelet Reset Password"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGTBjnbwSCOniOWA-OB9O-lWaAOwMIGfpWZfnJotIwZ4CfiWQVsO7-kmVbRPk97OlvyVfoyQ_1XloYUf3gIzyHNB4Ag77OnUrTUZQ01p0_ywzDcpVRkz8E3DaPVNdbsNxEtws-xGPZqGSUsPVJFpd7i_QTw2rmbZNeJ9aV0zLEPGIXxFLFtmtGKsBSpqbp0CZCQ9FD6KIdyS9NGKIWiOShiobgYep0PpVgqe8ekI-h5o5etqpAsAvUAj42cLJtMclrADVK5SnjIzkC"
                    />
                    <div className={styles.overlay}></div>
                    <div className={styles.visualContent}>
                        <p className="font-headline text-3xl mb-4 italic">"Tìm lại sự cân bằng."</p>
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-secondary"></span>
                            <p className="font-body text-[10px] opacity-80 uppercase tracking-widest">Security & Serenity</p>
                        </div>
                    </div>
                </div>

                <div className={styles.formSide}>
                    <div className={styles.fadeIn}>
                        {step === 1 ? (
                            <>
                                <div className="mb-10 text-center md:text-left">
                                    <h1 className="font-headline text-4xl text-primary mb-2">Quên mật khẩu?</h1>
                                    <p className="font-body text-sm text-on-surface-variant">Nhập email của bạn để nhận mã xác thực đặt lại mật khẩu.</p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm font-body border border-red-100 italic">
                                        {error}
                                    </div>
                                )}

                                <form className="space-y-6" onSubmit={handleRequestReset}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Email của bạn</label>
                                        <input
                                            className={styles.input}
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@email.com"
                                        />
                                    </div>

                                    <button
                                        className={`${styles.submitBtn} ${loading ? 'opacity-70' : ''}`}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang gửi yêu cầu...' : 'Gửi mã OTP'}
                                        {!loading && <span className="material-symbols-outlined ml-2 text-lg">mail</span>}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/login')}
                                        className="w-full text-center font-body text-xs text-on-surface-variant hover:text-primary transition-colors"
                                    >
                                        Quay lại đăng nhập
                                    </button>
                                </form>
                            </>
                        ) : step === 2 ? (
                            <div className="text-center md:text-left">
                                <div className="mb-8">
                                    <h1 className="font-headline text-4xl text-primary mb-2">Đặt lại mật khẩu</h1>
                                    <p className="font-body text-sm text-on-surface-variant">
                                        Mã OTP đã được gửi đến: <span className="font-semibold">{email}</span>
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm font-body border border-red-100">
                                        {error}
                                    </div>
                                )}

                                <form className="space-y-6" onSubmit={handleResetPassword}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Mã xác thực (OTP)</label>
                                        <input
                                            className={styles.input + " text-center text-xl tracking-widest"}
                                            placeholder="••••••"
                                            maxLength="6"
                                            required
                                            value={formData.otp}
                                            onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/[^0-9]/g, '') })}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Mật khẩu mới</label>
                                        <input
                                            className={styles.input}
                                            type="password"
                                            placeholder="••••••••"
                                            required
                                            value={formData.newPassword}
                                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        className={`${styles.submitBtn} ${loading ? 'opacity-70' : ''}`}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang cập nhật...' : 'Xác nhận thay đổi'}
                                        {!loading && <span className="material-symbols-outlined ml-2 text-lg">verified_user</span>}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-full text-center font-body text-xs text-on-surface-variant hover:text-primary transition-colors"
                                    >
                                        Quay lại bước trước
                                    </button>
                                </form>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
