import React from 'react';
import { Search, Filter, Download, Calendar, ChevronDown, Monitor } from 'lucide-react';
import styles from './AllPackages.module.css';

const AllPackages = () => {
    const summaryStats = [
        { label: 'Đang vận chuyển', value: 4 },
        { label: 'Đang hoàn hàng', value: 0 },
        { label: 'Chờ xác nhận hoàn', value: 0 },
        { label: 'Đã giao hàng', value: 37 },
        { label: 'Đã hủy giao hàng', value: 4 }
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div className="flex items-center gap-2">
                    <h1 className={styles.title}>Tất cả kiện hàng:</h1>
                    <button className="flex items-center gap-1 text-gray-800 font-medium hover:bg-gray-100 px-2 py-1 rounded transition-colors text-lg">
                        Tất cả chi nhánh <ChevronDown size={18} />
                    </button>
                </div>
                <div className={styles.filterGroup}>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        <Download size={16} /> Xuất file
                    </button>
                </div>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-6 gap-3 mb-6">
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#ab121c]" />
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                        <Calendar size={14} /> 7 ngày qua
                    </div>
                </div>
                {summaryStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1 items-stretch justify-center group cursor-pointer hover:border-[#e0bfbb] transition-all">
                        <span className="text-[10px] text-gray-400 font-bold uppercase text-left leading-tight h-8 truncate">{stat.label}</span>
                        <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Search Bar Row */}
                <div className="p-3 bg-white border-b border-gray-100 flex items-center gap-3">
                    <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-400">
                        <Filter size={18} />
                    </button>
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded divide-x divide-gray-200">
                        <div className="flex items-center gap-3 px-4 py-2 w-full">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Tìm kiếm theo mã đơn hàng, vận đơn, mã kiện hàng" className="bg-transparent outline-none text-sm w-full font-body" />
                        </div>
                        <button className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50">
                            Tìm theo Tất cả <ChevronDown size={14} />
                        </button>
                    </div>
                    <button className="px-6 py-2 bg-gray-50 text-gray-300 text-sm font-medium rounded border border-gray-100">Lưu bộ lọc</button>
                    <button className="px-6 py-2 bg-white text-gray-600 border border-gray-200 text-sm font-medium rounded flex items-center gap-2 hover:bg-gray-50">Sắp xếp <ChevronDown size={14} /></button>
                </div>

                {/* Filter Row */}
                <div className="p-3 bg-gray-50/30 flex flex-wrap gap-2 border-b border-gray-100">
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 uppercase">Xem tất cả</button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Trạng thái kiện hàng <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Đơn hàng hủy <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Trạng thái in <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Trạng thái đóng gói <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Trạng thái giao hàng <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Trạng thái bàn giao <ChevronDown size={12} /></button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-white">
                    {['Tất cả'].map((tab, idx) => (
                        <button key={idx} className={`px-6 py-3 text-[10px] font-bold uppercase tracking-wider ${idx === 0 ? 'border-b-2 border-[#0088ff] text-[#0088ff]' : 'text-gray-400 hover:text-gray-600'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/30">
                            <tr className="text-[11px] uppercase tracking-wider text-gray-400">
                                <th className="pl-6 w-10 text-center"><Settings className="m-auto" size={14} /></th>
                                <th className="w-10"><input type="checkbox" className="rounded" /></th>
                                <th>Mã đơn hàng</th>
                                <th>Mã kiện hàng</th>
                                <th>Trạng thái kiện hàng</th>
                                <th>Trạng thái giao hàng</th>
                                <th>Trạng thái đóng gói</th>
                                <th>Ngày xử lý</th>
                                <th>Phiếu giao hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { orderId: '#2988', packageId: 'FUN001429', pStatus: 'Đã xử lý', sStatus: 'Đã lấy hàng', packStatus: 'Đã đóng gói', date: '26/05/2026 15:10', label: 'Đã có' },
                                { orderId: '584196019392382321', packageId: 'FUN001428', pStatus: 'Đã hủy', sStatus: 'Hủy giao hàng', packStatus: 'Chờ đóng gói', date: '26/05/2026 10:58', label: 'Đã có' },
                                { orderId: '#2654', packageId: 'FUN001427', pStatus: 'Đã xử lý', sStatus: '', packStatus: 'Chờ đóng gói', date: '26/05/2026 10:47', label: 'Chưa có' },
                                { orderId: '#2987', packageId: 'FUN001426', pStatus: 'Đã xử lý', sStatus: '', packStatus: 'Chờ đóng gói', date: '25/05/2026 23:15', label: 'Chưa có' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="pl-6 text-center"><ChevronRight className="m-auto opacity-30" size={14} /></td>
                                    <td><input type="checkbox" className="rounded" /></td>
                                    <td className="font-medium text-[#0088ff] hover:underline cursor-pointer">{row.orderId}</td>
                                    <td>{row.packageId}</td>
                                    <td>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${row.pStatus === 'Đã hủy' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 text-gray-500 border-gray-200'
                                            }`}>
                                            {row.pStatus}
                                        </span>
                                    </td>
                                    <td>
                                        {row.sStatus && (
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${row.sStatus === 'Đã lấy hàng' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                                                }`}>
                                                {row.sStatus}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <span className="px-2.5 py-1 bg-yellow-50 text-yellow-600 border border-yellow-100 rounded-full text-[10px] font-bold">
                                            {row.packStatus}
                                        </span>
                                    </td>
                                    <td className="text-xs">{row.date}</td>
                                    <td>
                                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${row.label === 'Đã có' ? 'bg-gray-100 text-gray-500' : 'text-yellow-600'
                                            }`}>
                                            {row.label}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 text-xs">
                    <div className="text-gray-500 italic">Từ 1 đến 4 trên tổng 4</div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span>Hiển thị</span>
                            <select className="border border-gray-200 rounded px-2 py-1 outline-none">
                                <option>20</option>
                            </select>
                            <span>Kết quả</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-white bg-[#0088ff]">1</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Settings = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);

const ChevronRight = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
);

export default AllPackages;
