import React from 'react';
import { Phone, Edit2, Trash2, MapPin } from 'lucide-react';
import AccountLayout from '../../layout/AccountLayout';
import styles from './ShippingAddresses.module.css';

const ShippingAddresses = () => {
    return (
        <AccountLayout>
            <section className="space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6">
                    <div>
                        <h1 className="font-headline text-headline-lg text-on-surface">Địa chỉ giao hàng</h1>
                        <p className="text-on-surface-variant font-body text-body-md mt-2">Quản lý các điểm đến cho những món đồ trang sức thủ công của bạn.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
                    {/* Primary Address Card */}
                    <div className="relative group p-8 border border-primary-container/20 rounded-xl shadow-soft transition-all duration-300 hover:border-primary bg-primary-container">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <span className="bg-white text-primary px-3 py-1 rounded-full font-body text-[10px] uppercase tracking-tighter font-bold">Mặc định</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <h3 className="font-headline text-white text-2xl mb-2">Lê Minh Tâm</h3>
                                <p className="text-white/80 font-body text-body-md flex items-center gap-2 mb-4">
                                    <Phone size={18} />
                                    0908 123 456
                                </p>
                                <div className="space-y-1">
                                    <p className="text-white font-body text-body-md">123 Đường Lê Lợi, Phường Bến Thành</p>
                                    <p className="text-white font-body text-body-md">Quận 1, Thành phố Hồ Chí Minh</p>
                                    <p className="text-white font-body text-body-md">700000, Việt Nam</p>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-6">
                                <button className="text-white font-body text-label-sm flex items-center gap-1 hover:underline underline-offset-4 tracking-widest font-bold">
                                    <Edit2 size={18} />
                                    CHỈNH SỬA
                                </button>
                                <button className="text-white/70 font-body text-label-sm flex items-center gap-1 hover:text-white transition-colors tracking-widest font-bold">
                                    <Trash2 size={18} />
                                    XÓA
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Address Card */}
                    <div className="relative group p-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-soft transition-all duration-300 hover:border-primary-container">
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <h3 className="font-headline text-on-surface text-2xl mb-2">Trần Thị Lan Anh</h3>
                                <p className="text-on-surface-variant font-body text-body-md flex items-center gap-2 mb-4">
                                    <Phone size={18} />
                                    0912 345 678
                                </p>
                                <div className="space-y-1">
                                    <p className="text-on-surface font-body text-body-md">456 Ngõ 12, Phố Huế</p>
                                    <p className="text-on-surface font-body text-body-md">Quận Hai Bà Trưng, Hà Nội</p>
                                    <p className="text-on-surface font-body text-body-md">100000, Việt Nam</p>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-6">
                                <button className="text-primary font-body text-label-sm flex items-center gap-1 hover:underline underline-offset-4 tracking-widest font-bold">
                                    <Edit2 size={18} />
                                    CHỈNH SỬA
                                </button>
                                <button className="text-on-surface-variant font-body text-label-sm flex items-center gap-1 hover:text-error tracking-widest font-bold">
                                    <Trash2 size={18} />
                                    XÓA
                                </button>
                                <button className="ml-auto text-secondary font-body font-bold text-[10px] tracking-widest hover:underline uppercase">
                                    Đặt làm mặc định
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add New Card */}
                    <button className="group p-8 border-2 border-dashed border-outline-variant/50 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-surface-container-low transition-all duration-300 min-h-[300px]">
                        <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                            <MapPin size={32} />
                        </div>
                        <span className="font-headline text-headline-md text-on-surface-variant group-hover:text-primary">Thêm địa chỉ giao hàng</span>
                    </button>
                </div>
            </section>
        </AccountLayout>
    );
};

export default ShippingAddresses;
