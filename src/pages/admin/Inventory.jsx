import React from 'react';
import { Search, Download, Upload, Filter, ChevronDown, ListFilter, Plus } from 'lucide-react';
import styles from './Inventory.module.css';

const StockInventory = () => {
    const stockData = [
        { name: 'Cát - Hộp PE viền đen size 9 x 9', variant: '5 hộp', sku: 'HP5', batch: 'Không', total: 10, available: 10, unavailable: 0, trading: 0, incoming: 0, packing: 0, price: '46,000đ', cost: '20,000đ', img: 'https://img.freepik.com/free-photo/view-luxurious-velvet-box-jewelry_23-2149020963.jpg' },
        { name: 'Cát - Hộp PE viền đen size 9 x 9', variant: '3 hộp', sku: 'HP3', batch: 'Không', total: 20, available: 20, unavailable: 0, trading: 0, incoming: 0, packing: 0, price: '29,000đ', cost: '12,000đ', img: 'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg' },
        { name: 'Cát - Hộp PE viền đen size 9 x 9', variant: '1 hộp', sku: 'HP1', batch: 'Không', total: 18, available: 18, unavailable: 0, trading: 0, incoming: 0, packing: 0, price: '12,000đ', cost: '4,000đ', img: 'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg' },
        { name: 'Cát - Hộp gấm đựng trang sức', variant: '2 hộp', sku: 'HG2', batch: 'Không', total: 20, available: 20, unavailable: 0, trading: 0, incoming: 0, packing: 0, price: '38,000đ', cost: '20,000đ', img: 'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg' },
        { name: 'Cát - Hộp gấm đựng trang sức', variant: '1 hộp', sku: 'HG1', batch: 'Không', total: 19, available: 19, unavailable: 0, trading: 0, incoming: 0, packing: 0, price: '21,000đ', cost: '10,000đ', img: 'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>Quản lý kho: <span className={styles.titleSubtitle}>Cửa hàng chính</span></h1>
                <div className={styles.filterGroup}>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">
                        <ListFilter size={14} /> Danh sách lô - HSD
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">
                        <Download size={14} /> Xuất file
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">
                        <Upload size={14} /> Nhập file
                    </button>
                </div>
            </div>

            <div className={styles.inventoryTableContainer}>
                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #f3f4f6', padding: '0 16px' }}>
                    {['Tất cả', 'Còn hàng', 'Hết hàng'].map((tab, idx) => (
                        <button key={idx} style={{
                            padding: '16px 24px',
                            fontSize: 12,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            borderBottom: idx === 0 ? '2px solid #0088ff' : '2px solid transparent',
                            color: idx === 0 ? '#0088ff' : '#9ca3af'
                        }}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search & Filters */}
                <div className={styles.toolbar}>
                    <div className={styles.searchWrapper}>
                        <Search size={16} className={styles.searchIcon} />
                        <input type="text" placeholder="Tìm kiếm theo mã SKU, tên sản phẩm, barcode" className={styles.searchInput} />
                    </div>
                    <button className={styles.filterBtn}>Ngày tạo <ChevronDown size={14} /></button>
                    <button className={styles.filterBtn}>Tồn kho <ChevronDown size={14} /></button>
                    <button className={styles.filterBtn}><Filter size={14} /> Bộ lọc khác</button>
                </div>

                {/* Table - overflow-x: scroll to always show horizontal scrollbar */}
                <div style={{ overflowX: 'scroll', width: '100%' }}>
                    <table style={{ width: '100%', minWidth: 2000, borderCollapse: 'collapse', textAlign: 'left', fontSize: 11, whiteSpace: 'nowrap' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                                <th style={{ padding: '14px 14px 14px 20px', width: 40, textAlign: 'center' }}><input type="checkbox" /></th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Sản phẩm</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>SKU</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Barcode</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Đơn vị tính</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Quản lý lô - HSD</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Tồn kho ⇅</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Có thể bán ⇅</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Không thể bán ⇅</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Đang giao dịch ⇅</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Đang về kho ⇅</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'center' }}>Đang đóng gói ⇅</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>Vị trí lưu kho</th>
                                <th style={{ padding: 14, color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'right' }}>Giá bán ⇅</th>
                                <th style={{ padding: '14px 20px 14px 14px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, textAlign: 'right' }}>Giá vốn ⇅</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #f9fafb' }}>
                                    <td style={{ padding: '14px 14px 14px 20px', textAlign: 'center' }}><input type="checkbox" /></td>
                                    <td style={{ padding: 14 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 6, border: '1px solid #f3f4f6', overflow: 'hidden', flexShrink: 0 }}>
                                                <img src={row.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div>
                                                <div style={{ color: '#0088ff', fontWeight: 700, cursor: 'pointer' }}>{row.name}</div>
                                                <div style={{ color: '#9ca3af', fontSize: 10, marginTop: 2 }}>{row.variant}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: 14, fontFamily: 'monospace', fontWeight: 600, color: '#4b5563' }}>{row.sku}</td>
                                    <td style={{ padding: 14, textAlign: 'center', color: '#d1d5db' }}>—</td>
                                    <td style={{ padding: 14, color: '#d1d5db' }}>—</td>
                                    <td style={{ padding: 14, color: '#6b7280', fontWeight: 500 }}>{row.batch}</td>
                                    <td style={{ padding: 14, fontWeight: 700, color: '#374151' }}>{row.total}</td>
                                    <td style={{ padding: 14, fontWeight: 700, color: '#374151', textAlign: 'center' }}>{row.available}</td>
                                    <td style={{ padding: 14, color: '#9ca3af', textAlign: 'center' }}>{row.unavailable}</td>
                                    <td style={{ padding: 14, color: '#9ca3af', textAlign: 'center' }}>{row.trading}</td>
                                    <td style={{ padding: 14, color: '#9ca3af', textAlign: 'center' }}>{row.incoming}</td>
                                    <td style={{ padding: 14, color: '#9ca3af', textAlign: 'center' }}>{row.packing}</td>
                                    <td style={{ padding: 14, color: '#d1d5db' }}>—</td>
                                    <td style={{ padding: 14, textAlign: 'right', fontWeight: 700, color: '#1f2937' }}>{row.price}</td>
                                    <td style={{ padding: '14px 20px 14px 14px', textAlign: 'right', fontWeight: 700, color: '#0088ff' }}>{row.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StockInventory;
