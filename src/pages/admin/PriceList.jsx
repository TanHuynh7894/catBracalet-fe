import React from 'react';
import { Search, Filter, Download, Upload, Plus, ChevronDown } from 'lucide-react';
import styles from './PriceList.module.css';

const PriceList = () => {
    const prices = [
        { id: 'CTL696389', name: 'Bảng giá tiktok', type: 'Theo chi nhánh', status: 'Đang áp dụng', adjust: '+49%' },
        { id: 'CTL629097', name: 'Lazada', type: 'Theo kênh bán hàng', status: 'Đang áp dụng', adjust: '---' },
        { id: 'CTL627315', name: 'Tiki', type: 'Theo kênh bán hàng', status: 'Đang áp dụng', adjust: '---' },
        { id: 'CTL533169', name: 'Tiktok Shop', type: 'Theo kênh bán hàng', status: 'Đang áp dụng', adjust: '+49%' },
        { id: 'CTL530417', name: 'Facebook', type: 'Theo kênh bán hàng', status: 'Đang áp dụng', adjust: '---' },
        { id: 'CTL320554', name: 'Shopee', type: 'Theo kênh bán hàng', status: 'Đang áp dụng', adjust: '+29%' },
        { id: 'CTL320549', name: 'Chat OmniAI', type: 'Theo kênh bán hàng', status: 'Đang áp dụng', adjust: '+0%' },
        { id: 'CTL319828', name: 'POS', type: 'Theo kênh bán hàng', status: 'Đang áp dụng', adjust: '---' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Bảng giá</h1>
                <div className={styles.filterGroup}>
                    <button className={styles.primaryBtn + " flex items-center gap-2"}>
                        <Plus size={16} /> Thêm bảng giá
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-4 bg-white overflow-x-auto whitespace-nowrap">
                    {['Tất cả', 'Theo chi nhánh', 'Theo nhóm khách hàng', 'Theo kênh bán hàng'].map((tab, idx) => (
                        <button key={idx} className={`px-6 py-4 text-xs font-bold tracking-tight uppercase ${idx === 0 ? 'border-b-2 border-[#0088ff] text-[#0088ff]' : 'text-gray-400 hover:text-gray-600'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div className="p-3 bg-white border-b border-gray-100 flex items-center gap-3">
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded px-4 py-2 gap-3 transition-all focus-within:border-[#0088ff]">
                        <Search size={16} className="text-gray-400" />
                        <input type="text" placeholder="Tìm kiếm theo tên, mã bảng giá" className="bg-transparent outline-none text-sm w-full font-body" />
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Loại bảng giá <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Trạng thái <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-gray-50 text-gray-300 text-sm font-medium rounded border border-gray-100">Lưu bộ lọc</button>
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/30">
                            <tr className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <th className="pl-6 w-10 text-center"><input type="checkbox" className="rounded" /></th>
                                <th>Mã bảng giá</th>
                                <th>Tên bảng giá</th>
                                <th>Loại bảng giá</th>
                                <th>Trạng thái</th>
                                <th className="text-right pr-6">Điều chỉnh giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="pl-6 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td className="text-[#0088ff] font-medium hover:underline cursor-pointer text-xs">{row.id}</td>
                                    <td className="font-bold text-gray-700 text-xs tracking-tight">{row.name}</td>
                                    <td className="text-gray-500 text-xs font-medium">{row.type}</td>
                                    <td>
                                        <span className="px-2.5 py-1 bg-green-50 text-green-600 border border-green-100 rounded-full text-[10px] font-bold">
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="text-right pr-6 font-medium text-gray-400 text-xs">{row.adjust}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 text-xs">
                    <div className="text-gray-500 italic">Từ 1 đến 8 trên tổng 8</div>
                    <div className="flex items-center gap-2">
                        <span>Hiển thị</span>
                        <select className="border border-gray-200 rounded px-2 py-1 outline-none">
                            <option>20</option>
                        </select>
                        <span>Kết quả</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center">
                <button className="text-xs font-medium text-[#0088ff] hover:underline">Tìm hiểu thêm về bảng giá</button>
            </div>
        </div>
    );
};

export default PriceList;
