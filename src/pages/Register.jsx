import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { register, verifyOtp } from '../services/authService';
import styles from './Register.module.css';

const Register = () => {
    const navigate = useNavigate();


    const [step, setStep] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

   
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });

    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleRegister = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await register({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone
            });

            console.log('Register success:', data.message);
            setSuccessMessage(data.message);
            setStep(2); 
        } catch (err) {
            console.error('Register error:', err);
            setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await verifyOtp({
                email: formData.email,
                otp: otp
            });

            console.log('OTP success:', data.message);
            setStep(3); 
        } catch (err) {
            console.error('OTP error:', err);
            setError(err.message || 'Mã OTP không chính xác hoặc đã hết hạn.');
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
                        <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-primary/10">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                            <h2 className="font-headline text-3xl text-primary mb-4">Thành công!</h2>
                            <p className="font-body text-sm text-on-surface-variant mb-8 leading-relaxed">
                                Tài khoản của bạn đã được kích hoạt thành công. Hãy bắt đầu hành trình cùng Cát Bracelet ngay.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-primary text-on-primary py-4 rounded-xl font-body text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-lg"
                            >
                                Đăng nhập ngay
                            </button>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className={styles.authTable}>
                {}
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

                {}
                <div className={styles.formSide}>
                    <div className={styles.fadeIn}>
                        {step === 1 ? (
                            <>
                                <div className="mb-10 text-center md:text-left">
                                    <h1 className="font-headline text-4xl text-primary mb-2">Tạo tài khoản</h1>
                                    <p className="font-body text-sm text-on-surface-variant">Bắt đầu hành trình tìm kiếm sự cân bằng và vẻ đẹp tự nhiên cùng Cát.</p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-body animate-shake">
                                        {error}
                                    </div>
                                )}

                                <form className="space-y-6" onSubmit={handleRegister}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Họ tên</label>
                                        <input
                                            className={styles.input}
                                            name="fullName"
                                            placeholder="Nguyễn Văn A"
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className={styles.inputGroup}>
                                            <label className={styles.label}>Email</label>
                                            <input
                                                className={styles.input}
                                                name="email"
                                                placeholder="example@cat.vn"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label className={styles.label}>Số điện thoại</label>
                                            <input
                                                className={styles.input}
                                                name="phone"
                                                placeholder="0901 234 567"
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Mật khẩu</label>
                                        <input
                                            className={styles.input}
                                            name="password"
                                            placeholder="••••••••"
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            className={`${styles.submitBtn} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang xử lý...' : 'Đăng ký'}
                                            {!loading && <span className="material-symbols-outlined text-[20px] ml-2">arrow_forward</span>}
                                        </button>
                                    </div>

                                    <div className="mt-8 text-center">
                                        <p className="font-body text-sm text-on-surface-variant">
                                            Đã có tài khoản?
                                            <button
                                                type="button"
                                                onClick={() => navigate('/login')}
                                                className="text-primary font-semibold hover:underline decoration-1 underline-offset-4 ml-1"
                                            >
                                                Đăng nhập
                                            </button>
                                        </p>
                                    </div>
                                </form>
                            </>
                        ) : step === 2 ? (
                            <div className="text-center md:text-left">
                                <div className="mb-10">
                                    <h1 className="font-headline text-4xl text-primary mb-2">Xác thực OTP</h1>
                                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                                        Hệ thống đã gửi mã xác thực gồm 6 chữ số đến email: <br />
                                        <span className="font-semibold text-primary">{formData.email}</span>
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-body">
                                        {error}
                                    </div>
                                )}

                                <form className="space-y-8" onSubmit={handleVerifyOtp}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Mã xác thực (OTP)</label>
                                        <input
                                            className={styles.input + " text-center text-2xl tracking-[0.5em]"}
                                            placeholder="••••••"
                                            type="text"
                                            maxLength="6"
                                            required
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                        />
                                    </div>

                                    <button
                                        className={`${styles.submitBtn} ${loading ? 'opacity-70' : ''}`}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang xác thực...' : 'Xác thực ngay'}
                                        {!loading && <span className="material-symbols-outlined text-[20px] ml-2">task_alt</span>}
                                    </button>

                                    <div className="flex flex-col gap-4 mt-6">
                                        <p className="font-body text-xs text-on-surface-variant/70">
                                            Không nhận được mã?
                                            <button type="button" onClick={() => handleRegister()} className="text-primary ml-1 font-semibold hover:underline">Gửi lại</button>
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-1"
                                        >
                                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                                            Quay lại chỉnh sửa email
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
