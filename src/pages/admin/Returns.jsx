import React from 'react';
import { Search, Filter, Download, Calendar, ChevronDown, RefreshCcw } from 'lucide-react';
import styles from './Returns.module.css';

const Returns = () => {
    const summaryStats = [
        { label: 'Yêu cầu trả hàng', value: 0 },
        { label: 'Chi hoàn tiền', value: 0 },
        { label: 'Đang trả lại', value: 0 },
        { label: 'Chờ xác nhận hàng hoàn', value: 0 },
        { label: 'Trả lại thất bại', value: 0 },
        { label: 'Thất lạc', value: 0 }
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Bản tin trả hàng: Cửa hàng chính</h1>
                <div className={styles.filterGroup}>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        <Download size={16} /> Xuất file
                    </button>
                    <button className={styles.primaryBtn}>
                        <RefreshCcw size={16} className="inline mr-2" /> Quét nhận hàng hoàn
                    </button>
                </div>
            </div>

            {/* Summary Cards Row - Arranged in 1 row (7 columns) */}
            <div className="grid grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-[#ab121c] transition-colors" />
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                        <Calendar size={14} /> 7 ngày qua
                    </div>
                </div>
                {summaryStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1 items-center justify-center group cursor-pointer hover:border-[#e0bfbb] transition-all min-w-0">
                        <span className="text-[9px] text-gray-400 uppercase tracking-tighter text-center h-8 leading-tight flex items-center px-1 font-bold">{stat.label}</span>
                        <span className="text-xl font-bold text-gray-800">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Main Table Content */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100 bg-gray-50/50">
                    {['Tất cả', 'Đang hoàn trả'].map((tab, idx) => (
                        <button key={idx} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest ${idx === 0 ? 'border-b-2 border-[#ab121c] text-[#ab121c]' : 'text-gray-400 hover:text-gray-600'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-3 bg-white border-b border-gray-100 flex items-stretch">
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-l-lg divide-x divide-gray-200">
                        <div className="flex items-center gap-3 px-4 py-2 w-full">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Tìm kiếm theo mã đơn khách hàng, số điện thoại khách hàng, mã đơn trả hàng..." className="bg-transparent outline-none text-sm w-full font-body" />
                        </div>
                    </div>
                    <div className="flex border-y border-r border-gray-200 rounded-r-lg divide-x divide-gray-200">
                        <button className="px-6 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50">
                            Bộ lọc <ChevronDown size={14} />
                        </button>
                        <button className="px-6 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50">
                            Sắp xếp <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                {/* Sub-Filters */}
                <div className="p-3 bg-gray-50/30 flex gap-3">
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2">Xem tất cả <ChevronDown size={12} /></button>
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2">Ngày tạo <ChevronDown size={12} /></button>
                    <button className="px-4 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2">Chi nhánh nhận hàng <ChevronDown size={12} /></button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/30">
                            <tr>
                                <th className="pl-6 w-10 text-center"><input type="checkbox" className="rounded" /></th>
                                <th>Mã đơn trả</th>
                                <th>Ngày tạo</th>
                                <th>Khách hàng</th>
                                <th>Mã đơn hàng</th>
                                <th>Trạng thái hoàn trả</th>
                                <th>Trạng thái nhận hàng</th>
                                <th>Sản phẩm</th>
                                <th>Trạng thái đơn trả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: '4040271483601', date: '18/05/2026 14:39', customer: '---', orderId: '58401161455', refund: 'Đã hoàn trả', receiving: 'Đã nhận hàng', items: '1 sản phẩm', status: 'Đã lưu trữ' },
                                { id: '5837834140125', date: '17/05/2026 15:23', customer: '---', orderId: '58378341401', refund: 'Đã hoàn trả', receiving: 'Đã nhận hàng', items: '1 sản phẩm', status: 'Đã lưu trữ' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="pl-6 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td className="font-medium text-[#ab121c] hover:underline cursor-pointer">{row.id}</td>
                                    <td>{row.date}</td>
                                    <td>{row.customer}</td>
                                    <td className="text-[#ab121c]">{row.orderId}</td>
                                    <td>
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            {row.refund}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                            {row.receiving}
                                        </span>
                                    </td>
                                    <td>{row.items}</td>
                                    <td><span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-600">{row.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Returns;
