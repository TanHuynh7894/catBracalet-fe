import React from 'react';
import { ChevronDown, AlertTriangle, X, TrendingUp, ChevronRight, Maximize2, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './Dashboard.module.css';

const revenueData = [
    { date: '27/04', current: 200000, previous: 100000 },
    { date: '29/04', current: 350000, previous: 120000 },
    { date: '01/05', current: 180000, previous: 90000 },
    { date: '03/05', current: 420000, previous: 150000 },
    { date: '05/05', current: 300000, previous: 110000 },
    { date: '07/05', current: 250000, previous: 80000 },
    { date: '09/05', current: 380000, previous: 130000 },
    { date: '11/05', current: 500000, previous: 100000 },
    { date: '13/05', current: 15000000, previous: 120000 },
    { date: '15/05', current: 800000, previous: 140000 },
    { date: '17/05', current: 600000, previous: 90000 },
    { date: '19/05', current: 450000, previous: 110000 },
    { date: '21/05', current: 350000, previous: 100000 },
    { date: '23/05', current: 700000, previous: 130000 },
    { date: '25/05', current: 550000, previous: 95000 },
];

const avgOrderData = [
    { date: '27/04', current: 50000, previous: 80000 },
    { date: '29/04', current: 120000, previous: 90000 },
    { date: '01/05', current: 80000, previous: 70000 },
    { date: '03/05', current: 150000, previous: 100000 },
    { date: '05/05', current: 60000, previous: 85000 },
    { date: '07/05', current: 90000, previous: 75000 },
    { date: '09/05', current: 200000, previous: 110000 },
    { date: '11/05', current: 100000, previous: 95000 },
    { date: '13/05', current: 2500000, previous: 80000 },
    { date: '15/05', current: 180000, previous: 120000 },
    { date: '17/05', current: 130000, previous: 70000 },
    { date: '19/05', current: 95000, previous: 90000 },
    { date: '21/05', current: 110000, previous: 85000 },
    { date: '23/05', current: 160000, previous: 100000 },
    { date: '25/05', current: 140000, previous: 95000 },
];

const orderCountData = [
    { date: '27/04', current: 5, previous: 3 },
    { date: '29/04', current: 8, previous: 4 },
    { date: '01/05', current: 12, previous: 5 },
    { date: '03/05', current: 6, previous: 7 },
    { date: '05/05', current: 15, previous: 3 },
    { date: '07/05', current: 10, previous: 6 },
    { date: '09/05', current: 18, previous: 4 },
    { date: '11/05', current: 22, previous: 8 },
    { date: '13/05', current: 60, previous: 5 },
    { date: '15/05', current: 14, previous: 9 },
    { date: '17/05', current: 20, previous: 6 },
    { date: '19/05', current: 11, previous: 7 },
    { date: '21/05', current: 16, previous: 4 },
    { date: '23/05', current: 25, previous: 8 },
    { date: '25/05', current: 19, previous: 5 },
];

const formatVND = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}tr`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value;
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 11 }}>
                <div style={{ fontWeight: 700, marginBottom: 6, color: '#374151' }}>{label}</div>
                {payload.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <div style={{ width: 8, height: 3, borderRadius: 2, background: p.color }} />
                        <span style={{ color: '#6b7280' }}>{p.name}:</span>
                        <span style={{ fontWeight: 700, color: '#1f2937' }}>{typeof p.value === 'number' && p.value > 999 ? p.value.toLocaleString('vi-VN') + 'đ' : p.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const ReportsOverview = () => {
    return (
        <div className={styles.dashboard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h1 className={styles.title}>Tổng quan báo cáo</h1>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Maximize2 size={16} /> Xem toàn màn hình
                </button>
            </div>

            {/* Alert Banner */}
            <div style={{ background: '#fff9e6', border: '1px solid #ffecb3', padding: 16, borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24, position: 'relative' }}>
                <AlertTriangle size={18} style={{ color: '#ff9800', marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Lưu ý</div>
                    <div style={{ fontSize: 12, color: '#4b5563' }}>Do kênh Website của bạn không còn khả dụng nên các dữ liệu bảng phân tích có liên quan đến kênh Website sẽ không được hiển thị đầy đủ</div>
                </div>
                <button style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} style={{ color: '#9ca3af' }} /></button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: 24, gap: 32, paddingLeft: 4 }}>
                {['Tổng quan', 'Phân tích doanh thu', 'Phân tích khách hàng', 'Phân tích kinh doanh Sàn'].map((tab, idx) => (
                    <button key={idx} style={{
                        paddingBottom: 16, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                        background: 'none', border: 'none', cursor: 'pointer',
                        borderBottom: idx === 0 ? '2px solid #0088ff' : '2px solid transparent',
                        color: idx === 0 ? '#0088ff' : '#9ca3af'
                    }}>{tab}</button>
                ))}
                <button style={{ paddingBottom: 16, background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={18} style={{ color: '#d1d5db' }} /></button>
            </div>

            {/* Date Filter Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
                    30 ngày qua (27/04 - 26/05/2026) <ChevronDown size={14} style={{ color: '#9ca3af' }} />
                </div>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>So với:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
                    28/03 - 26/04/2026 <ChevronDown size={14} style={{ color: '#9ca3af' }} />
                </div>
                <button style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#4b5563', cursor: 'pointer' }}>
                    ✎ Chỉnh sửa
                </button>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 24 }}>
                {[
                    { label: 'Doanh thu thuần', value: '53,999,623đ', change: '227.52%' },
                    { label: 'Lợi nhuận gộp', value: '23,376,523đ', change: '343.24%' },
                    { label: 'Đơn hàng', value: '337', change: '72.82%' },
                    { label: 'Giá trị tồn kho', value: '231,951,009đ', change: null },
                ].map((kpi, idx) => (
                    <div key={idx} style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #f3f4f6', position: 'relative', cursor: 'pointer' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 8 }}>{kpi.label}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                            <span style={{ fontSize: 22, fontWeight: 800, color: '#1f2937' }}>{kpi.value}</span>
                            {kpi.change && (
                                <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <TrendingUp size={10} /> {kpi.change}
                                </span>
                            )}
                        </div>
                        <ChevronRight size={18} style={{ position: 'absolute', top: 24, right: 20, color: '#e5e7eb' }} />
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 24 }}>
                {/* Revenue Chart */}
                <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #f3f4f6', position: 'relative' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Doanh thu theo thời gian</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2937' }}>54,302,816đ</span>
                        <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TrendingUp size={10} /> 220.37%
                        </span>
                    </div>
                    <ChevronRight size={18} style={{ position: 'absolute', top: 24, right: 20, color: '#e5e7eb' }} />
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={formatVND} tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={40} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="current" name="27/04 - 26/05/2026" stroke="#0088ff" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#0088ff' }} />
                            <Line type="monotone" dataKey="previous" name="So với: 28/03 - 26/04/2026" stroke="#93c5fd" strokeWidth={1} strokeDasharray="4 4" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, color: '#9ca3af' }}>
                            <div style={{ width: 16, height: 2, background: '#0088ff', borderRadius: 2 }} /> 27/04 - 26/05/2026
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, color: '#9ca3af' }}>
                            <div style={{ width: 16, height: 2, background: '#93c5fd', borderRadius: 2, borderTop: '1px dashed #93c5fd' }} /> So với: 28/03 - 26/04/2026
                        </div>
                    </div>
                </div>

                {/* Average Order Value Chart */}
                <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #f3f4f6', position: 'relative' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Giá trị đơn hàng trung bình</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2937' }}>161,136đ</span>
                        <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TrendingUp size={10} /> 85.38%
                        </span>
                    </div>
                    <ChevronRight size={18} style={{ position: 'absolute', top: 24, right: 20, color: '#e5e7eb' }} />
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={avgOrderData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={formatVND} tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={40} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="current" name="27/04 - 26/05/2026" stroke="#0088ff" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#0088ff' }} />
                            <Line type="monotone" dataKey="previous" name="So với: 28/03 - 26/04/2026" stroke="#93c5fd" strokeWidth={1} strokeDasharray="4 4" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, color: '#9ca3af' }}>
                            <div style={{ width: 16, height: 2, background: '#0088ff', borderRadius: 2 }} /> 27/04 - 26/05/2026
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, color: '#9ca3af' }}>
                            <div style={{ width: 16, height: 2, background: '#93c5fd', borderRadius: 2 }} /> So với: 28/03 - 26/04/2026
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, paddingBottom: 40 }}>
                {/* Top Products */}
                <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #f3f4f6', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Top sản phẩm bán chạy</div>
                        <ChevronRight size={18} style={{ color: '#e5e7eb' }} />
                    </div>
                    <div>
                        {[
                            { name: 'Nguyên liệu handmade', revenue: '5,818,000đ', count: '6 sản phẩm' },
                            { name: 'Vòng tay phong thủy', revenue: '4,250,000đ', count: '12 sản phẩm' },
                            { name: 'Hộp PE viền đen', revenue: '3,100,000đ', count: '8 sản phẩm' },
                            { name: 'Dây sáp 1mm', revenue: '2,680,000đ', count: '15 sản phẩm' },
                        ].map((product, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: idx < 3 ? '1px solid #f9fafb' : 'none' }}>
                                <span style={{ fontSize: 12, color: '#374151' }}>{product.name}</span>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1f2937' }}>{product.revenue}</div>
                                    <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>{product.count}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Count Chart */}
                <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #f3f4f6', position: 'relative' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Số lượng đơn hàng theo thời gian</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2937' }}>337</span>
                        <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TrendingUp size={10} /> 72.82%
                        </span>
                    </div>
                    <ChevronRight size={18} style={{ position: 'absolute', top: 24, right: 20, color: '#e5e7eb' }} />
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={orderCountData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={30} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="current" name="Đơn hàng" stroke="#0088ff" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#0088ff' }} />
                            <Line type="monotone" dataKey="previous" name="Kỳ trước" stroke="#93c5fd" strokeWidth={1} strokeDasharray="4 4" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ReportsOverview;
