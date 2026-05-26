import React from 'react';
import { Search, Filter, Download, Plus, ChevronDown, Settings, ChevronRight } from 'lucide-react';
import styles from './Dashboard.module.css';

const ShippingWaybills = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Danh sách vận đơn</h1>
                <div className={styles.filterGroup}>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        <Download size={16} /> Xuất file
                    </button>
                    <button className={styles.primaryBtn + " flex items-center gap-2"}>
                        <Plus size={16} /> Tạo đơn hàng
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-white">
                    {['Tất cả', 'Đang giao hàng', 'Chờ giao lại', 'Đang hoàn hàng'].map((tab, idx) => (
                        <button key={idx} className={`px-6 py-4 text-xs font-bold uppercase tracking-tight ${idx === 0 ? 'border-b-2 border-[#1e293b] text-[#1e293b]' : 'text-gray-400 hover:text-gray-600'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Filter Row */}
                <div className="p-3 bg-white border-b border-gray-100 flex items-center gap-3">
                    <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-400">
                        <Settings size={18} />
                    </button>
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded divide-x divide-gray-200">
                        <div className="flex items-center gap-3 px-4 py-2 w-full">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Tìm kiếm theo mã đơn hàng, mã vận đơn, mã giao hàng, người nhận" className="bg-transparent outline-none text-sm w-full font-body" />
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Trạng thái <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Chi nhánh <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Trạng thái đối soát <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600"><Filter size={14} /> Bộ lọc khác</button>
                    <button className="px-4 py-2 bg-gray-50 text-gray-300 text-sm font-medium rounded border border-gray-100">Lưu bộ lọc</button>
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/50 uppercase">
                            <tr className="text-[10px] text-gray-400 font-bold tracking-wider">
                                <th className="pl-6 w-10 text-center"><Settings className="m-auto" size={12} /></th>
                                <th className="w-10"><input type="checkbox" className="rounded" /></th>
                                <th>Mã giao hàng</th>
                                <th>Mã vận đơn</th>
                                <th>Mã đơn hàng</th>
                                <th>Trạng thái</th>
                                <th>Tiền thu hộ COD</th>
                                <th>Phí trả ĐTGH</th>
                                <th>Đối tác giao hàng</th>
                                <th>Người nhận</th>
                                <th>Chi nhánh</th>
                                <th>Loại đóng gói & giao hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { deliveryId: '2403', waybill: 'SPXVN066659934435', orderId: '#2988', status: 'Đã lấy hàng', cod: '1,350,500đ', fee: '19,500đ', partner: 'Sapo Express', receiver: 'Khiết Lam', branch: 'Cửa hàng chính', type: 'Đối tác vận chuyển tích hợp' },
                                { deliveryId: '2402', waybill: '861896961650', orderId: '584196019392382321', status: 'Hủy giao hàng', cod: '53,408đ', fee: '', partner: 'J&T Express', receiver: 'O***', branch: 'Cửa hàng chính', type: 'Sàn TMĐT' },
                                { deliveryId: '2401', waybill: 'SPXVN065723700805', orderId: '#2986', status: 'Hủy giao hàng', cod: '1,350,500đ', fee: '19,500đ', partner: 'Sapo Express', receiver: 'Khiết Lam', branch: 'Cửa hàng chính', type: 'Đối tác vận chuyển tích hợp' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="pl-6 text-center"><ChevronRight className="m-auto opacity-30 cursor-pointer" size={14} /></td>
                                    <td><input type="checkbox" className="rounded" /></td>
                                    <td className="text-[#0088ff] hover:underline cursor-pointer font-medium">{row.deliveryId}</td>
                                    <td className="text-[#0088ff] hover:underline cursor-pointer">{row.waybill}</td>
                                    <td className="text-[#0088ff] hover:underline cursor-pointer">{row.orderId}</td>
                                    <td>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${row.status === 'Đã lấy hàng' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-red-50 text-red-600 border-red-100'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="font-bold">{row.cod}</td>
                                    <td>{row.fee}</td>
                                    <td className="text-xs font-medium">{row.partner}</td>
                                    <td className="text-xs">{row.receiver}</td>
                                    <td className="text-xs">{row.branch}</td>
                                    <td className="text-xs font-medium">{row.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination placeholder */}
                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 text-xs">
                    <div className="text-gray-500">Từ 1 đến 15 trên tổng 47</div>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-white bg-[#0088ff]">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600">2</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600">3</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingWaybills;
