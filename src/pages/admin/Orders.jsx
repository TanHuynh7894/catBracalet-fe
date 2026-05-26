import React from 'react';
import { Search, Filter, Download, Plus, ChevronDown } from 'lucide-react';
import styles from './Dashboard.module.css';

const Orders = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Danh sách đơn hàng</h1>
                <div className={styles.filterGroup}>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        <Download size={16} /> Xuất file
                    </button>
                    <button className={styles.primaryBtn}>
                        <Plus size={16} className="inline mr-2" /> Tạo đơn hàng
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-gray-50/50">
                    {['Tất cả', 'Đặt hàng', 'Đang giao dịch', 'Đã hoàn thành', 'Đã hủy'].map((tab, idx) => (
                        <button key={idx} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest ${idx === 0 ? 'border-b-2 border-[#680006] text-[#680006]' : 'text-gray-400 hover:text-gray-600'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Sapo Styled Filter Bar */}
                <div className="p-3 bg-white border-b border-gray-100 flex items-stretch">
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-l-lg divide-x divide-gray-200">
                        <div className="flex items-center gap-3 px-4 py-2 w-full">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Tìm kiếm theo mã đơn hàng, vận đơn, SĐT khách hàng" className="bg-transparent outline-none text-sm w-full font-body" />
                        </div>
                        <button className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50">
                            Tìm theo Tất cả <ChevronDown size={14} />
                        </button>
                    </div>
                    <div className="flex border-y border-r border-gray-200 rounded-r-lg divide-x divide-gray-200">
                        <button className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50">
                            Kênh bán hàng <ChevronDown size={14} />
                        </button>
                        <button className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50">
                            Ngày đặt hàng <ChevronDown size={14} />
                        </button>
                        <button className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap hover:bg-gray-50 bg-gray-50/50">
                            <Filter size={14} /> Bộ lọc khác
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/30">
                            <tr>
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
                                { id: '58421551176', date: '26/05/2026 23:19', customer: 'Lê Anh Tuấn', source: 'TikTokShop', total: '50,905đ', payment: 'Chưa thanh toán', processing: 'Chờ xử lý', shipping: 'Nhanh' },
                                { id: '58421541515', date: '26/05/2026 23:12', customer: 'Nguyễn Hồng', source: 'Facebook', total: '89,057đ', payment: 'Đã thanh toán', processing: 'Đang giao', shipping: 'Nhanh' },
                                { id: '#2989', date: '26/05/2026 15:47', customer: 'Quốc Minh', source: 'Admin', total: '450,000đ', payment: 'Đang xử lý', processing: 'Chờ xử lý', shipping: 'Giao hàng tiết kiệm' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="pl-6 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td className="font-medium text-[#680006] hover:underline cursor-pointer">{row.id}</td>
                                    <td className="whitespace-nowrap">{row.date}</td>
                                    <td>{row.customer}</td>
                                    <td><span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded font-medium">{row.source}</span></td>
                                    <td className="font-bold">{row.total}</td>
                                    <td>
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${row.payment === 'Đã thanh toán' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${row.payment === 'Đã thanh toán' ? 'bg-green-500' : 'bg-orange-500'}`} />
                                            {row.payment}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${row.processing === 'Đang giao' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${row.processing === 'Đang giao' ? 'bg-blue-500' : 'bg-gray-400'}`} />
                                            {row.processing}
                                        </div>
                                    </td>
                                    <td className="text-gray-500">{row.shipping}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
