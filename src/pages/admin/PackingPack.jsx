import React from 'react';
import { Search, Filter, Download, Plus, ChevronDown, Printer } from 'lucide-react';
import styles from './Dashboard.module.css';

const PackingPack = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div className="flex items-center gap-2">
                    <h1 className={styles.title}>In & đóng gói:</h1>
                    <button className="flex items-center gap-1 text-gray-800 font-medium hover:bg-gray-100 px-2 py-1 rounded transition-colors text-lg">
                        Tất cả chi nhánh <ChevronDown size={18} />
                    </button>
                </div>
                <div className={styles.filterGroup}>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        <Download size={16} /> Xuất file
                    </button>
                    <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 border-r border-gray-200 flex items-center gap-2">
                            Thao tác khác <ChevronDown size={14} />
                        </button>
                        <button className={styles.primaryBtn + " !rounded-none flex items-center gap-2"}>
                            <Printer size={16} /> Quét đóng gói
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Filters Row */}
                <div className="p-3 bg-white border-b border-gray-100 flex items-center gap-3">
                    <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-400">
                        <Filter size={18} />
                    </button>
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded divide-x divide-gray-200">
                        <div className="flex items-center gap-3 px-4 py-2 w-full">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Tìm kiếm theo mã đơn hàng, vận đơn, kiện hàng" className="bg-transparent outline-none text-sm w-full font-body" />
                        </div>
                        <button className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50">
                            Tìm theo Tất cả <ChevronDown size={14} />
                        </button>
                    </div>
                    <button className="px-6 py-2 bg-gray-50 text-gray-300 text-sm font-medium rounded border border-gray-100">Lưu bộ lọc</button>
                    <button className="px-6 py-2 bg-white text-gray-600 border border-gray-200 text-sm font-medium rounded flex items-center gap-2 hover:bg-gray-50">Sắp xếp <ChevronDown size={14} /></button>
                </div>

                <div className="p-3 bg-gray-50/30 flex flex-wrap gap-2 border-b border-gray-100">
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 uppercase">Xem tất cả</button>
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Kênh bán hàng <ChevronDown size={12} /></button>
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Trạng thái in <ChevronDown size={12} /></button>
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Trạng thái đóng gói <ChevronDown size={12} /></button>
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Loại kiện hàng <ChevronDown size={12} /></button>
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold tracking-tight text-gray-500 flex items-center gap-2 uppercase">Dịch vụ vận chuyển <ChevronDown size={12} /></button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-white">
                    {['Tất cả', 'Chưa đẩy vận chuyển', 'Chưa in', 'Đã in', 'Chưa đóng gói', 'Đã đóng gói'].map((tab, idx) => (
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
                                <th>Mã vận đơn</th>
                                <th>Kênh bán hàng</th>
                                <th>Trạng thái đóng gói</th>
                                <th>Trạng thái giao hàng</th>
                                <th>Đối tác giao hàng</th>
                                <th>Phiếu giao hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { orderId: '#2654', packageId: 'FUN001427', waybill: '', source: '', packing: 'Chờ đóng gói', shippingStatus: '', partner: '', label: 'Chưa có' },
                                { orderId: '260514DMPFVFX3', packageId: 'FUN001382', waybill: 'SPXVND81393893335', source: 'Shopee', packing: 'Chờ đóng gói', shippingStatus: 'Chờ lấy hàng', partner: 'SPX Express', label: 'Chưa có' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="pl-6 text-center"><ChevronRight className="m-auto opacity-30" size={14} /></td>
                                    <td><input type="checkbox" className="rounded" /></td>
                                    <td className="font-medium text-[#0088ff] hover:underline cursor-pointer">{row.orderId}</td>
                                    <td>{row.packageId}</td>
                                    <td>{row.waybill}</td>
                                    <td className="text-xs">{row.source}</td>
                                    <td>
                                        <span className="px-2.5 py-1 bg-yellow-50 text-yellow-600 border border-yellow-100 rounded-full text-[10px] font-bold">
                                            {row.packing}
                                        </span>
                                    </td>
                                    <td>
                                        {row.shippingStatus && (
                                            <span className="px-2.5 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-[10px] font-bold">
                                                {row.shippingStatus}
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-xs font-medium">{row.partner}</td>
                                    <td><span className="text-yellow-600 font-bold text-[10px]">{row.label}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 text-xs">
                    <div className="text-gray-500 italic">Từ 1 đến 2 trên tổng 2</div>
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

            <div className="mt-4 text-center">
                <button className="text-xs font-medium text-[#0088ff] hover:underline">Tìm hiểu về xử lý đơn hàng</button>
            </div>
        </div>
    );
};

// Internal Import for Settings Icon
const Settings = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);

const ChevronRight = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
);

export default PackingPack;
