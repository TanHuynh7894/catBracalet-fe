import React from 'react';
import { Search, Filter, Download, Upload, Plus, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const ProductList = () => {
    const navigate = useNavigate();

    const products = [
        { id: '1', name: 'Cát - Hộp PE viền đen size 9 x 9', img: 'https://img.freepik.com/free-photo/view-luxurious-velvet-box-jewelry_23-2149020963.jpg', stock: 48, variants: 3, type: '', brand: '', date: '22/04/2026' },
        { id: '2', name: 'Cát - Hộp gấm đựng trang sức', img: 'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg', stock: 39, variants: 2, type: '', brand: '', date: '22/04/2026' },
        { id: '3', name: 'Cát - Dây sáp 1mm 10m, 90m - Nguyên liệu DIY', img: 'https://img.freepik.com/free-photo/view-luxurious-velvet-box-jewelry_23-2149020963.jpg', stock: 377, variants: 8, type: '', brand: '', date: '22/04/2026' },
        { id: '4', name: 'Cát - Set 10 sao sò biển xâu chuỗi - Nguyên liệu DIY', img: 'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg', stock: 123, variants: 3, type: '', brand: '', date: '22/04/2026' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Danh sách sản phẩm</h1>
                <div className={styles.filterGroup}>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-600">
                        <Download size={16} /> Xuất file
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-600">
                        <Upload size={16} /> Nhập file
                    </button>
                    <div className="flex bg-[#0088ff] text-white rounded-lg overflow-hidden">
                        <button className="px-4 py-2 text-sm font-medium hover:bg-[#0077e6] flex items-center gap-2 border-r border-[#ffffff33]">
                            <Plus size={16} /> Thêm sản phẩm
                        </button>
                        <button className="px-2 py-2 hover:bg-[#0077e6]">
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-4 bg-white">
                    <button className="px-6 py-4 text-xs font-bold border-b-2 border-[#0088ff] text-[#0088ff]">
                        Tất cả
                    </button>
                </div>

                {/* Filters */}
                <div className="p-3 bg-white border-b border-gray-100 flex items-center gap-3">
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded px-4 py-2 gap-3 transition-all focus-within:border-[#0088ff]">
                        <Search size={16} className="text-gray-400" />
                        <input type="text" placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode" className="bg-transparent outline-none text-sm w-full font-body" />
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Kênh bán hàng <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Loại sản phẩm <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Tag <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600"><Filter size={14} /> Bộ lọc khác</button>
                    <button className="px-4 py-2 bg-gray-50 text-gray-300 text-sm font-medium rounded border border-gray-100">Lưu bộ lọc</button>
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/50">
                            <tr className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                                <th className="pl-6 w-10"><input type="checkbox" className="rounded" /></th>
                                <th>Sản phẩm</th>
                                <th>Có thể bán</th>
                                <th>Loại</th>
                                <th>Nhãn hiệu</th>
                                <th>Ngày khởi tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => navigate(`/admin/products/${row.id}`)}>
                                    <td className="pl-6" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded" /></td>
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded border border-gray-100 overflow-hidden bg-gray-50">
                                                <img src={row.img} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[#0088ff] font-medium hover:underline">{row.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-700">{row.stock}</span>
                                            <span className="text-[10px] text-gray-400 mt-0.5">({row.variants} phiên bản)</span>
                                        </div>
                                    </td>
                                    <td className="text-gray-500">{row.type}</td>
                                    <td className="text-gray-500">{row.brand}</td>
                                    <td className="text-gray-600 font-body text-xs">{row.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 text-xs">
                    <div className="text-gray-500 italic">Từ 1 đến 4 trên tổng 4</div>
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

export default ProductList;
