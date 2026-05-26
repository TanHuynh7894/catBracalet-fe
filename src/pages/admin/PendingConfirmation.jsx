import React from 'react';
import { Search, Filter, Download, Plus, ChevronDown, Monitor } from 'lucide-react';
import styles from './Dashboard.module.css';

const PendingConfirmation = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div className="flex items-center gap-2">
                    <h1 className={styles.title}>Chờ xác nhận:</h1>
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
                        <button className={styles.primaryBtn + " !rounded-none"}>
                            <Plus size={16} className="inline mr-2" /> Tạo đơn hàng
                        </button>
                    </div>
                </div>
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
                            <input type="text" placeholder="Tìm kiếm theo mã đơn hàng, SĐT khách hàng" className="bg-transparent outline-none text-sm w-full font-body" />
                        </div>
                        <button className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50">
                            Tìm theo Tất cả <ChevronDown size={14} />
                        </button>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-400 text-sm font-medium rounded opacity-50 cursor-not-allowed">Lưu bộ lọc</button>
                </div>

                {/* Filter Buttons Row */}
                <div className="p-3 bg-gray-50/30 flex flex-wrap gap-2 border-b border-gray-100">
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2 text-gray-600">Xem tất cả</button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2 text-gray-600">Kênh bán hàng <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2 text-gray-600">Trạng thái thanh toán <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2 text-gray-600">Dịch vụ vận chuyển <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2 text-gray-600">Ngày đặt hàng <ChevronDown size={12} /></button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium flex items-center gap-2 text-gray-600">Nhân viên phụ trách <ChevronDown size={12} /></button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-white">
                    {['Tất cả', 'Chưa thanh toán', 'Đã thanh toán'].map((tab, idx) => (
                        <button key={idx} className={`px-6 py-3 text-xs font-bold ${idx === 0 ? 'border-b-2 border-[#1e293b] text-[#1e293b]' : 'text-gray-400 hover:text-gray-600'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/30">
                            <tr className="text-[11px] uppercase tracking-wider text-gray-500">
                                <th className="pl-6 w-10 text-center"><input type="checkbox" className="rounded" /></th>
                                <th>Mã đơn hàng</th>
                                <th>Ngày đặt hàng</th>
                                <th>Khách hàng</th>
                                <th>Nguồn đơn</th>
                                <th>Thành tiền</th>
                                <th>Trạng thái thanh toán</th>
                                <th>Trạng thái xử lý</th>
                                <th>Dịch vụ vận chuyển</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: '#2989', date: '26/05/2026 15:47', customer: 'Quốc Minh', source: 'Admin', total: '450,000đ', payment: 'Đã thanh toán', processing: 'Chờ xử lý', shipping: '' },
                                { id: '#2950', date: '21/05/2026 16:09', customer: 'Ngọc Trang', source: 'Admin', total: '427,000đ', payment: 'Chưa thanh toán', processing: 'Chờ xử lý', shipping: '' },
                                { id: '#2937', date: '19/05/2026 12:39', customer: 'Diễm Quỳnh', source: 'Admin', total: '1,191,000đ', payment: 'Đã thanh toán', processing: 'Chờ xử lý', shipping: '' },
                            ].map((row, idx) => (
                                <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="pl-6 text-center">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-300 transform rotate-90 scale-x-75 opacity-0 group-hover:opacity-100 inline-block">{'>>'}</span>
                                            <input type="checkbox" className="rounded" />
                                        </div>
                                    </td>
                                    <td className="font-medium text-[#0088ff] hover:underline cursor-pointer">{row.id}</td>
                                    <td className="text-gray-600 font-body text-xs">{row.date}</td>
                                    <td className="text-[#0088ff] hover:underline cursor-pointer">{row.customer}</td>
                                    <td><span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-500 font-medium">{row.source}</span></td>
                                    <td className="font-bold">{row.total}</td>
                                    <td>
                                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${row.payment === 'Đã thanh toán' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-orange-50 text-orange-600 border-orange-100'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${row.payment === 'Đã thanh toán' ? 'bg-gray-400' : 'bg-orange-400'}`} />
                                            {row.payment}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border bg-orange-50 text-orange-600 border-orange-100">
                                            <div className="w-1.5 h-1.5 rounded-full mr-2 bg-orange-400" />
                                            {row.processing}
                                        </div>
                                    </td>
                                    <td className="text-gray-500">{row.shipping}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 text-xs">
                    <div className="text-gray-500">Từ 1 đến 11 trên tổng 11</div>
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

export default PendingConfirmation;
