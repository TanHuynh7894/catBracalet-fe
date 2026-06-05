import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, User, Phone, Mail, Calendar, CreditCard, CheckCircle2, AlertCircle, ShieldCheck, Lock, Camera } from 'lucide-react';
import { getProfile, updateProfile as apiUpdateProfile } from '../../services/userService';
import styles from './Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Form states
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userDataStr = localStorage.getItem('user');
                if (!userDataStr) {
                    navigate('/login');
                    return;
                }

                const userData = JSON.parse(userDataStr);
                if (userData && userData.id) {
                    const data = await getProfile(userData.id);
                    setProfile(data);
                    setFormData({
                        fullName: data.fullName || '',
                        email: data.email || '',
                        phone: data.phone || ''
                    });
                } else {
                    navigate('/login');
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Không thể tải thông tin hồ sơ.');
                if (err?.status === 401) navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError(null);
        setSuccessMessage('');

        try {
            const userDataStr = localStorage.getItem('user');
            if (!userDataStr) throw new Error('Phiên đăng nhập hết hạn.');

            const userData = JSON.parse(userDataStr);

            const data = new FormData();
            data.append('fullName', formData.fullName);
            data.append('email', formData.email);
            data.append('phone', formData.phone);

            const updatedProfile = await apiUpdateProfile(userData.id, data);

            setProfile(updatedProfile);

            // Update local storage to keep info in sync
            const currentUser = JSON.parse(userDataStr);
            localStorage.setItem('user', JSON.stringify({
                ...currentUser,
                fullName: updatedProfile.fullName,
                avatar: updatedProfile.avatar
            }));

            // Dispatch storage event to notify Header/Layout
            window.dispatchEvent(new Event('storage'));

            setSuccessMessage('Cập nhật hồ sơ thành công!');

            // Auto close message after 5s
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (err) {
            console.error('Update error:', err);
            const msg = err?.message || (typeof err === 'string' ? err : 'Có lỗi xảy ra khi cập nhật hồ sơ.');
            setError(msg);
        } finally {
            setUpdating(false);
        }
    };


    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-outline font-body text-sm animate-pulse">Đang đồng bộ dữ liệu từ hệ thống...</p>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto space-y-12 pb-20">
            {profile && (
                <>
                    <div className="space-y-12">
                        {/* Profile Info Form */}
                        <section className="bg-white p-10 rounded-[32px] shadow-sm border border-outline-variant/20 animate-fade-in">
                            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-outline-variant/20">
                                <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-xl text-on-surface">Hồ sơ cá nhân</h2>
                                    <p className="text-outline text-xs mt-0.5">Thông tin này được sử dụng cho việc đặt hàng và ưu đãi</p>
                                </div>
                            </div>

                            {successMessage && (
                                <div className="mb-8 bg-emerald-50 border border-emerald-100 text-emerald-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                                    <CheckCircle2 size={20} className="text-emerald-500" />
                                    <p className="text-sm font-bold">{successMessage}</p>
                                </div>
                            )}

                            {error && (
                                <div className="mb-8 bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                                    <AlertCircle size={20} className="text-red-500" />
                                    <p className="text-sm font-bold">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div className="group">
                                    <label className="flex items-center gap-2 font-bold text-[11px] text-outline uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">
                                        <User size={14} /> Họ và Tên quý khách
                                    </label>
                                    <input
                                        className="w-full bg-[#FAF5EF]/30 border-b-2 border-outline-variant py-3 focus:border-primary focus:outline-none transition-all font-body text-body-lg text-on-surface placeholder:text-outline/40"
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="flex items-center gap-2 font-bold text-[11px] text-outline uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">
                                        <Mail size={14} /> Địa chỉ Email
                                    </label>
                                    <input
                                        className="w-full bg-[#FAF5EF]/30 border-b-2 border-outline-variant py-3 focus:border-primary focus:outline-none transition-all font-body text-body-lg text-on-surface"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="flex items-center gap-2 font-bold text-[11px] text-outline uppercase tracking-widest mb-2 group-focus-within:text-primary transition-colors">
                                        <Phone size={14} /> Số điện thoại liên hệ
                                    </label>
                                    <input
                                        className="w-full bg-[#FAF5EF]/30 border-b-2 border-outline-variant py-3 focus:border-primary focus:outline-none transition-all font-body text-body-lg text-on-surface"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2 pt-10 flex justify-end">
                                    <button
                                        className={`bg-primary text-white px-12 py-5 rounded-2xl font-bold text-xs tracking-[0.2em] transition-all duration-300 transform active:scale-95 uppercase flex items-center gap-3 ${updating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#8c1515] hover:shadow-2xl hover:shadow-primary/30'}`}
                                        type="submit"
                                        disabled={updating}
                                    >
                                        {updating ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Đang lưu...
                                            </>
                                        ) : 'Lưu thay đổi hồ sơ'}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
