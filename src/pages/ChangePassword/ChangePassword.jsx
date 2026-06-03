import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { changePassword as apiChangePassword } from '../../services/userService';

const ChangePassword = () => {
    const [changingPwd, setChangingPwd] = useState(false);
    const [pwdError, setPwdError] = useState(null);
    const [pwdSuccess, setPwdSuccess] = useState('');

    const [pwdData, setPwdData] = useState({
        oldPassword: '',
        newPassword: ''
    });

    const handlePwdChange = (e) => {
        const { name, value } = e.target;
        setPwdData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setChangingPwd(true);
        setPwdError(null);
        setPwdSuccess('');

        try {
            const userDataStr = localStorage.getItem('user');
            const userData = JSON.parse(userDataStr);

            const response = await apiChangePassword(userData.id, {
                oldPassword: pwdData.oldPassword,
                newPassword: pwdData.newPassword
            });

            setPwdSuccess(response.message || 'Đổi mật khẩu thành công');
            setPwdData({ oldPassword: '', newPassword: '' });
            setTimeout(() => setPwdSuccess(''), 5000);
        } catch (err) {
            console.error('Change password error:', err);
            const msg = err?.message || (typeof err === 'string' ? err : 'Đổi mật khẩu thất bại. Vui lòng kiểm tra lại.');
            setPwdError(msg);
        } finally {
            setChangingPwd(false);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto animate-fade-in">
            <section className="bg-white p-10 rounded-[32px] shadow-sm border border-outline-variant/20">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-outline-variant/20">
                    <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-on-surface">Bảo mật & Mật khẩu</h2>
                        <p className="text-outline text-xs mt-0.5">Thay đổi mật khẩu định kỳ để bảo vệ tài khoản của bạn</p>
                    </div>
                </div>

                {pwdSuccess && (
                    <div className="mb-8 bg-emerald-50 border border-emerald-100 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                        <p className="text-sm font-bold">{pwdSuccess}</p>
                    </div>
                )}

                {pwdError && (
                    <div className="mb-8 bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                        <AlertCircle size={20} className="text-red-500" />
                        <p className="text-sm font-bold">{pwdError}</p>
                    </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="group">
                            <label className="flex items-center gap-2 font-bold text-[11px] text-outline uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">
                                Mật khẩu hiện tại
                            </label>
                            <input
                                className="w-full bg-[#FAF5EF]/30 border-b-2 border-outline-variant py-3 focus:border-primary focus:outline-none transition-all font-body text-body-lg text-on-surface placeholder:text-outline/40"
                                type="password"
                                name="oldPassword"
                                value={pwdData.oldPassword}
                                onChange={handlePwdChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="hidden md:block"></div>

                        <div className="group">
                            <label className="flex items-center gap-2 font-bold text-[11px] text-outline uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">
                                Mật khẩu mới
                            </label>
                            <input
                                className="w-full bg-[#FAF5EF]/30 border-b-2 border-outline-variant py-3 focus:border-primary focus:outline-none transition-all font-body text-body-lg text-on-surface placeholder:text-outline/40"
                                type="password"
                                name="newPassword"
                                value={pwdData.newPassword}
                                onChange={handlePwdChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            className={`bg-primary text-white px-12 py-5 rounded-2xl font-bold text-xs tracking-[0.2em] transition-all duration-300 transform active:scale-95 uppercase flex items-center gap-3 ${changingPwd ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#8c1515] hover:shadow-2xl hover:shadow-primary/30'}`}
                            type="submit"
                            disabled={changingPwd}
                        >
                            {changingPwd ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Đang xử lý...
                                </>
                            ) : 'Cập nhật mật khẩu'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ChangePassword;
