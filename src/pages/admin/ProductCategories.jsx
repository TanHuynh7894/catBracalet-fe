import React from 'react';
import { Search, Filter, Plus, ChevronDown, Monitor } from 'lucide-react';
import styles from './Dashboard.module.css';

const ProductCategories = () => {
    const categories = [
        { id: '1', name: 'SET NGUYÊN LIỆU', count: 2, condition: '—' },
        { id: '2', name: 'Vòng Macrame', count: 4, condition: '—' },
        { id: '3', name: 'Vòng mix đá nhuyễn', count: 5, condition: '—' },
        { id: '4', name: 'Dây đan phối đá', count: 0, condition: 'Tên sản phẩm chứa từ Dây đan phối đá' },
        { id: '5', name: 'Vòng dây full đá', count: 0, condition: 'Tên sản phẩm chứa từ Vòng đá tự nhiên' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Danh mục sản phẩm</h1>
                <div className={styles.filterGroup}>
                    <button className={styles.primaryBtn + " flex items-center gap-2"}>
                        <Plus size={16} /> Thêm danh mục
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100 px-4 bg-white">
                    <button className="px-6 py-4 text-xs font-bold border-b-2 border-[#0088ff] text-[#0088ff]">
                        Tất cả
                    </button>
                </div>

                <div className="p-3 bg-white border-b border-gray-100 flex items-center gap-3">
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded px-4 py-2 gap-3 transition-all focus-within:border-[#0088ff]">
                        <Search size={16} className="text-gray-400" />
                        <input type="text" placeholder="Tìm kiếm danh mục sản phẩm" className="bg-transparent outline-none text-sm w-full font-body" />
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Loại danh mục <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm flex items-center gap-2 text-gray-600">Kênh bán hàng <ChevronDown size={14} /></button>
                    <button className="px-4 py-2 bg-gray-50 text-gray-300 text-sm font-medium rounded border border-gray-100">Lưu bộ lọc</button>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className="bg-gray-50/30">
                            <tr className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                                <th className="pl-6 w-10 text-center"><input type="checkbox" className="rounded" /></th>
                                <th>Danh mục</th>
                                <th>Số lượng</th>
                                <th>Điều kiện áp dụng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 group">
                                    <td className="pl-6 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded border border-gray-100 bg-gray-50 flex items-center justify-center">
                                                <div className="w-1/2 h-1/2 border border-gray-200 rounded-sm" />
                                            </div>
                                            <span className="text-[#0088ff] font-bold text-xs hover:underline cursor-pointer uppercase tracking-tight">{row.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="font-bold text-gray-700">{row.count}</span>
                                    </td>
                                    <td className="text-xs text-gray-500 font-body">{row.condition}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 flex justify-between items-center bg-white border-t border-gray-100 text-xs">
                    <div className="text-gray-500 italic">Từ 1 đến 5 trên tổng 5</div>
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
                <button className="text-xs font-medium text-[#0088ff] hover:underline">Tìm hiểu thêm về danh mục sản phẩm</button>
            </div>
        </div>
    );
};

export default ProductCategories;
