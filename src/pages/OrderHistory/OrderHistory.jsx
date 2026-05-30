import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Calendar, CreditCard, CheckCircle2, Clock } from 'lucide-react';
import AccountLayout from '../../layout/AccountLayout';
import styles from './OrderHistory.module.css';

const OrderHistory = () => {
    return (
        <AccountLayout>
            <section className="space-y-10 animate-fade-in">
                <div className="flex flex-col gap-2 border-b border-outline-variant pb-6">
                    <h1 className="font-headline text-headline-lg text-primary">Lịch sử đơn hàng</h1>
                    <p className="text-on-surface-variant font-body text-body-md">Theo dõi hành trình của những món trang sức ý nghĩa bạn đã chọn.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-2 rounded-full bg-secondary text-white font-body text-label-sm shadow-sm transition-all hover:opacity-90 font-semibold tracking-widest">TẤT CẢ</button>
                    <button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body text-label-sm hover:bg-surface-container transition-all font-semibold tracking-widest">ĐANG XỬ LÝ</button>
                    <button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body text-label-sm hover:bg-surface-container transition-all font-semibold tracking-widest">ĐANG GIAO</button>
                    <button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body text-label-sm hover:bg-surface-container transition-all font-semibold tracking-widest">HOÀN THÀNH</button>
                </div>

                <div className="space-y-6">
                    {/* Order Card 1: In Delivery */}
                    <div className="bg-white rounded-xl shadow-sm border-l-4 border-[#D4AF37] overflow-hidden transition-all hover:shadow-md">
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div className="space-y-1">
                                    <span className="font-body text-[10px] text-primary uppercase tracking-[0.2em] font-bold">Mã đơn hàng</span>
                                    <h3 className="font-headline text-2xl text-on-surface">#CAT-2024-001</h3>
                                </div>
                                <div className="flex flex-col items-start md:items-end gap-2">
                                    <span className="px-4 py-1 rounded-full bg-[#fcf5e5] text-[#856404] font-body text-[11px] uppercase tracking-widest flex items-center gap-2 border border-[#fbeed5] font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                                        Đang giao
                                    </span>
                                    <p className="text-xs text-on-surface-variant font-body">Dự kiến: 15/10/2023</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-outline-variant/30">
                                <div className="space-y-1">
                                    <p className="font-body text-[10px] text-on-surface-variant uppercase font-bold">Ngày đặt</p>
                                    <div className="flex items-center gap-2 text-on-surface">
                                        <Calendar size={18} />
                                        <span className="font-body text-body-md">12/10/2023</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-body text-[10px] text-on-surface-variant uppercase font-bold">Tổng thanh toán</p>
                                    <div className="flex items-center gap-2 text-on-surface">
                                        <CreditCard size={18} />
                                        <span className="font-body text-body-md font-bold text-lg">1,450,000₫</span>
                                    </div>
                                </div>
                                <div className="flex items-center md:justify-end">
                                    <NavLink
                                        to="/order-detail/CAT-2024-001"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-[#8c1515] transition-all group font-body text-xs uppercase tracking-widest font-bold"
                                    >
                                        <span>Chi tiết đơn</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Card 2: Completed */}
                    <div className="bg-white rounded-xl shadow-sm border-l-4 border-emerald-500 overflow-hidden transition-all hover:shadow-md">
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div className="space-y-1">
                                    <span className="font-body text-[10px] text-primary uppercase tracking-[0.2em] font-bold">Mã đơn hàng</span>
                                    <h3 className="font-headline text-2xl text-on-surface">#CAT-2023-089</h3>
                                </div>
                                <div>
                                    <span className="px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 font-body text-[11px] uppercase tracking-widest flex items-center gap-2 border border-emerald-100 font-bold">
                                        <CheckCircle2 size={14} />
                                        Hoàn thành
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-outline-variant/30">
                                <div className="space-y-1">
                                    <p className="font-body text-[10px] text-on-surface-variant uppercase font-bold">Ngày đặt</p>
                                    <div className="flex items-center gap-2 text-on-surface">
                                        <Calendar size={18} />
                                        <span className="font-body text-body-md">24/08/2023</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-body text-[10px] text-on-surface-variant uppercase font-bold">Tổng thanh toán</p>
                                    <div className="flex items-center gap-2 text-on-surface">
                                        <CreditCard size={18} />
                                        <span className="font-body text-body-md font-bold text-lg">2,100,000₫</span>
                                    </div>
                                </div>
                                <div className="flex items-center md:justify-end">
                                    <button className="flex items-center gap-2 px-5 py-2.5 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-body text-xs uppercase tracking-widest font-bold">
                                        <span>Xem lại đơn</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Card 3: Completed (Another one) */}
                    <div className="bg-white rounded-xl shadow-sm border-l-4 border-slate-400 overflow-hidden transition-all hover:shadow-md">
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div className="space-y-1">
                                    <span className="font-body text-[10px] text-primary uppercase tracking-[0.2em] font-bold">Mã đơn hàng</span>
                                    <h3 className="font-headline text-2xl text-on-surface">#CAT-2023-045</h3>
                                </div>
                                <div>
                                    <span className="px-4 py-1 rounded-full bg-slate-50 text-slate-600 font-body text-[11px] uppercase tracking-widest flex items-center gap-2 border border-slate-200 font-bold">
                                        <Clock size={14} />
                                        Hoàn thành
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-outline-variant/30">
                                <div className="space-y-1">
                                    <p className="font-body text-[10px] text-on-surface-variant uppercase font-bold">Ngày đặt</p>
                                    <div className="flex items-center gap-2 text-on-surface">
                                        <Calendar size={18} />
                                        <span className="font-body text-body-md">05/05/2023</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-body text-[10px] text-on-surface-variant uppercase font-bold">Tổng thanh toán</p>
                                    <div className="flex items-center gap-2 text-on-surface">
                                        <CreditCard size={18} />
                                        <span className="font-body text-body-md font-bold text-lg">850,000₫</span>
                                    </div>
                                </div>
                                <div className="flex items-center md:justify-end">
                                    <button className="flex items-center gap-2 px-5 py-2.5 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-body text-xs uppercase tracking-widest font-bold">
                                        <span>Xem lại đơn</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AccountLayout>
    );
};

export default OrderHistory;
