import React from 'react';
import { Search, Download, Upload, Plus, ChevronDown, Filter } from 'lucide-react';
import styles from './ReceivingOrders.module.css';

const ReceivingOrders = () => {
    const orders = [
        { id: 'REI00001', date: '21/05/2026 14:41', branch: 'Cửa hàng chính', status: 'Đang giao dịch', receivingStatus: 'Đã nhập', supplier: 'Tuyệt Ngọc', creator: 'Trần Minh ( Digital )', quantity: 258, total: '44,683,800đ' }
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Danh sách đơn nhập hàng</h1>
                <div className={styles.filterGroup}>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-600 shadow-sm">
                        <Download size={16} /> Xuất file
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-600 shadow-sm">
                        <Upload size={16} /> Nhập file
                    </button>
                    <button className={styles.primaryBtn + " flex items-center gap-2"}>
                        <Plus size={16} /> Tạo đơn nhập hàng
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100 px-4 bg-white">
                    {['Tất cả', 'Đang giao dịch', 'Hoàn thành'].map((tab, idx) => (
                        <button key={idx} className={`px-6 py-4 text-xs font-bold uppercase tracking-tight ${idx === 0 ? 'border-b-2 border-[#0088ff] text-[#0088ff]' : 'text-gray-400'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-3 bg-white border-b border-gray-100 flex items-center gap-3">
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded px-4 py-2 gap-3 focus-within:border-[#0088ff] transition-all">
                        <Search size={16} className="text-gray-400" />
                        <input type="text" placeholder="Tìm kiếm theo mã đơn nhập, tên, SĐT, mã NCC" className="bg-transparent outline-none text-sm w-full font-body" />
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Trạng thái nhập <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Ngày tạo <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Sản phẩm <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600"><Filter size={14} /> Bộ lọc khác</button>
                    <button className="px-4 py-2 bg-gray-50 text-gray-300 text-sm font-medium rounded border border-gray-100">Lưu bộ lọc</button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/30 font-headline uppercase text-[10px] tracking-wide text-gray-400">
                            <tr>
                                <th className="pl-6 w-10 text-center"><input type="checkbox" className="rounded" /></th>
                                <th>Mã đơn nhập</th>
                                <th>Ngày tạo</th>
                                <th>Chi nhánh nhập</th>
                                <th>Trạng thái</th>
                                <th>Trạng thái nhập</th>
                                <th>Nhà cung cấp</th>
                                <th>Nhân viên tạo</th>
                                <th>Số lượng nhập</th>
                                <th className="pr-6 text-right">Giá trị đơn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="pl-6 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td className="text-[#0088ff] font-bold text-xs hover:underline cursor-pointer tracking-tight">{row.id}</td>
                                    <td className="text-xs text-gray-600">{row.date}</td>
                                    <td className="text-xs text-gray-600">{row.branch}</td>
                                    <td>
                                        <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-100 rounded-full text-[10px] font-bold italic">
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-400 border border-gray-200 rounded-full text-[10px] font-bold">
                                            {row.receivingStatus}
                                        </span>
                                    </td>
                                    <td className="text-[#0088ff] font-medium text-xs hover:underline cursor-pointer">{row.supplier}</td>
                                    <td className="text-xs text-gray-600">{row.creator}</td>
                                    <td className="text-center font-bold text-gray-700">{row.quantity}</td>
                                    <td className="pr-6 text-right font-bold text-gray-800">{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 text-xs">
                    <div className="text-gray-500 italic">Từ 1 đến 1 trên tổng 1</div>
                    <div className="flex items-center gap-2">
                        <span>Hiển thị</span>
                        <select className="border border-gray-200 rounded px-2 py-1 outline-none">
                            <option>20</option>
                        </select>
                        <span>Kết quả</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceivingOrders;
