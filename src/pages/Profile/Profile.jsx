import React from 'react';
import { Info } from 'lucide-react';
import AccountLayout from '../../layout/AccountLayout';
import styles from './Profile.module.css';

const Profile = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would handle form submission
        alert('Thông tin đã được cập nhật!');
    };

    return (
        <AccountLayout>
            <section className={`${styles.profileSection} bg-white p-8 md:p-12 shadow-soft rounded-lg animate-fade-in`}>
                <div className="flex justify-between items-center mb-10">
                    <h2 className="font-headline text-headline-md text-on-surface">Thông tin cá nhân</h2>
                    <Info className="text-outline" size={24} />
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="relative">
                        <label className="font-body text-label-sm text-outline absolute -top-5 left-0">Họ và Tên</label>
                        <input
                            className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none transition-colors font-body text-body-md"
                            type="text"
                            defaultValue="Nguyễn Văn A"
                        />
                    </div>
                    <div className="relative">
                        <label className="font-body text-label-sm text-outline absolute -top-5 left-0">Email</label>
                        <input
                            className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none transition-colors font-body text-body-md"
                            type="email"
                            defaultValue="vana.nguyen@email.com"
                        />
                    </div>
                    <div className="relative">
                        <label className="font-body text-label-sm text-outline absolute -top-5 left-0">Số điện thoại</label>
                        <input
                            className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none transition-colors font-body text-body-md"
                            type="tel"
                            defaultValue="090 123 4567"
                        />
                    </div>
                    <div className="relative">
                        <label className="font-body text-label-sm text-outline absolute -top-5 left-0">Ngày sinh</label>
                        <input
                            className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-primary focus:outline-none transition-colors font-body text-body-md"
                            type="date"
                            defaultValue="1995-01-01"
                        />
                    </div>

                    <div className="md:col-span-2 pt-6">
                        <button
                            className="bg-primary text-white px-10 py-4 font-body text-label-sm tracking-widest hover:bg-[#8c1515] transition-all duration-300 transform active:scale-95 shadow-md uppercase font-semibold"
                            type="submit"
                        >
                            LƯU THAY ĐỔI
                        </button>
                    </div>
                </form>
            </section>

            {/* Recent Orders Summary as seen in the HTML */}
            <section className="mt-16 space-y-8 animate-fade-in">
                <div className="flex justify-between items-end">
                    <h2 className="font-headline text-headline-md text-on-surface">Đơn hàng gần đây</h2>
                    <a className="font-body text-label-sm text-primary underline font-semibold" href="/order-history">Xem tất cả</a>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-outline font-body text-label-sm uppercase tracking-tighter">
                                <th className="pb-4 px-4 text-[10px]">Mã đơn hàng</th>
                                <th className="pb-4 px-4 text-[10px]">Ngày đặt</th>
                                <th className="pb-4 px-4 text-[10px]">Trạng thái</th>
                                <th className="pb-4 px-4 text-right text-[10px]">Tổng cộng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: '#CAT-2024-001', date: '12/03/2024', status: 'Đang giao', price: '1,250,000₫', type: 'delivery' },
                                { id: '#CAT-2023-089', date: '25/12/2023', status: 'Hoàn thành', price: '890,000₫', type: 'completed' },
                                { id: '#CAT-2023-045', date: '15/10/2023', status: 'Hoàn thành', price: '2,100,000₫', type: 'completed' }
                            ].map((order, idx) => (
                                <tr key={idx} className="bg-white shadow-sm hover:shadow-md transition-shadow group">
                                    <td className="py-6 px-4 font-body text-body-md font-semibold text-primary">{order.id}</td>
                                    <td className="py-6 px-4 text-on-surface-variant font-body text-body-md">{order.date}</td>
                                    <td className="py-6 px-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.type === 'delivery' ? 'bg-secondary-container/30 text-secondary' : 'bg-green-100 text-green-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${order.type === 'delivery' ? 'bg-secondary' : 'bg-green-700'
                                                }`}></span>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-4 text-right font-headline text-headline-md text-on-surface">{order.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </AccountLayout>
    );
};

export default Profile;
