import React from 'react';
import { Calendar, ChevronDown, Plus, Info } from 'lucide-react';
import styles from './ShippingOverview.module.css';

const ShippingOverview = () => {
    const shippingStats = [
        { label: 'Chờ lấy hàng', count: 0, cod: '0đ', color: 'bg-gray-400' },
        { label: 'Đã lấy hàng', count: 2, cod: '1,585,495đ', color: 'bg-[#ab121c]' },
        { label: 'Đang giao hàng', count: 0, cod: '0đ', color: 'bg-gray-400' },
        { label: 'Chờ giao lại', count: 0, cod: '0đ', color: 'bg-gray-400' },
        { label: 'Đang hoàn hàng', count: 0, cod: '0đ', color: 'bg-gray-400' },
        { label: 'Đã hoàn hàng', count: 0, cod: '0đ', color: 'bg-gray-400' },
        { label: 'Đã giao hàng', count: 3, cod: '1,844,832đ', color: 'bg-gray-400' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Tổng quan vận chuyển</h1>
                <button className={styles.primaryBtn + " flex items-center gap-2"}>
                    <Plus size={16} /> Kết nối vận chuyển
                </button>
            </div>

            {}
            <div className="flex gap-2 mb-6">
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-gray-50">
                    <Calendar size={14} /> 7 ngày qua (20/05 - 26/05/2026) <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-gray-50">
                    Tất cả chi nhánh <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-gray-50">
                    Khu vực <ChevronDown size={14} />
                </button>
            </div>

            {}
            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-6">
                {shippingStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 flex flex-col gap-1 relative group cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <span className="text-[11px] text-gray-500 font-medium uppercase">{stat.label}</span>
                        <span className="text-xl font-bold text-gray-800">{stat.count}</span>
                        <div className="flex items-center gap-1 mt-1">
                            <div className="w-3.5 h-3.5 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-[8px] text-gray-400">₫</span>
                            </div>
                            <span className="text-[10px] text-gray-400">COD: <span className="font-bold text-gray-600">{stat.cod}</span></span>
                        </div>
                    </div>
                ))}
            </div>

            {}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-8">
                        <h3 className="text-sm font-medium text-gray-700">Thời gian lấy hàng thành công trung bình</h3>
                        <Info size={14} className="text-gray-300" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Sapo Express</span>
                            <span className="text-xs font-bold text-gray-800">1.22 giờ</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 w-[60%]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-8">
                        <h3 className="text-sm font-medium text-gray-700">Thời gian giao hàng thành công trung bình</h3>
                        <Info size={14} className="text-gray-300" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Sapo Express</span>
                            <span className="text-xs font-bold text-gray-800">1.73 ngày</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 w-[75%]" />
                        </div>
                    </div>
                </div>
            </div>

            {}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-8">
                        <h3 className="text-sm font-medium text-gray-700">Tỉ lệ giao hàng thành công</h3>
                        <Info size={14} className="text-gray-300" />
                    </div>
                    <div className="mt-12">
                        <div className="flex items-end gap-4 h-32">
                            <span className="text-[10px] text-gray-400 w-20">Sapo Express</span>
                            <div className="flex-1 bg-[#1e88e5] h-12 rounded-sm relative group">
                                <span className="absolute -top-6 right-0 text-[11px] font-bold">60%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                    <div className="w-full flex items-center gap-2 mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Tỉ trọng vận đơn</h3>
                        <Info size={14} className="text-gray-300" />
                    </div>
                    <div className="relative w-40 h-40">
                        {}
                        <div className="absolute inset-0 rounded-full border-[12px] border-[#5ce6a1]" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-bold text-gray-800">5 đơn</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingOverview;
