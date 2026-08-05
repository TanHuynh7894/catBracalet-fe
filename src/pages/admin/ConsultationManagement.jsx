import React, { useState, useEffect } from 'react';
import {
    Search,
    Trash2,
    Calendar,
    Clock,
    User,
    Phone,
    FileText,
    AlertCircle,
    X,
    Filter,
    RefreshCcw,
    ChevronRight,
    Eye
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { getAllConsultations, deleteConsultation } from '../../services/consultationService';
import styles from './ConsultationManagement.module.css';

const ConsultationManagement = () => {
    const { showToast } = useToast();
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchConsultations();
    }, []);

    const fetchConsultations = async () => {
        setLoading(true);
        try {
            const data = await getAllConsultations();
            setConsultations(data || []);
        } catch (error) {
            showToast('Không thể tải danh sách đăng ký tư vấn', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedConsultation) return;
        setIsProcessing(true);
        try {
            await deleteConsultation(selectedConsultation.id);
            showToast('Xóa đăng ký tư vấn thành công', 'success');
            setShowDeleteModal(false);
            setSelectedConsultation(null);
            fetchConsultations();
        } catch (error) {
            showToast('Xóa thất bại: ' + (error.message || 'Lỗi hệ thống'), 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredConsultations = consultations.filter(c =>
        c.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phoneNumber?.includes(searchQuery)
    );

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Quản lý đăng ký tư vấn</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý các lượt yêu cầu tư vấn phong thủy từ khách hàng</p>
                </div>
                <div className={styles.filterGroup}>
                    <button className={styles.secondaryBtn} onClick={fetchConsultations}>
                        <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} /> Làm mới
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm theo tên hoặc số điện thoại..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-400 tracking-wider">Khách hàng</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-400 tracking-wider">Liên hệ</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-400 tracking-wider">Sinh nhật</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-400 tracking-wider">Mục tiêu</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-400 tracking-wider">Ngày gửi</th>
                                <th className="px-6 py-4 text-[11px] font-bold uppercase text-gray-400 tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="6" className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredConsultations.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <FileText size={32} strokeWidth={1} />
                                            <span>Không tìm thấy đăng ký nào</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredConsultations.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-800 flex items-center justify-center font-bold">
                                                {c.fullName?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{c.fullName}</div>
                                                <div className="text-[11px] text-gray-400">{c.gender === 'MALE' ? 'Nam' : 'Nữ'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                {c.phoneNumber}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(c.dateOfBirth).toLocaleDateString('vi-VN')}
                                            </div>
                                            {c.timeOfBirth && (
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <Clock size={12} />
                                                    {c.timeOfBirth.substring(0, 5)}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="max-w-[200px] truncate-2-lines text-sm text-gray-600 italic">
                                            "{c.objective || 'Không có mục tiêu cụ thể'}"
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-gray-400 font-medium">
                                            {new Date(c.createdAt).toLocaleString('vi-VN')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className={styles.actionBtn}
                                                onClick={() => setSelectedConsultation(c)}
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtn} hover:text-red-600`}
                                                onClick={() => {
                                                    setSelectedConsultation(c);
                                                    setShowDeleteModal(true);
                                                }}
                                                title="Xóa"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {}
            {selectedConsultation && !showDeleteModal && (
                <div className={styles.modalOverlay} onClick={() => setSelectedConsultation(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800">Chi tiết đăng ký tư vấn</h2>
                            <button onClick={() => setSelectedConsultation(null)} className="p-2 hover:bg-white rounded-full transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-6 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="w-20 h-20 rounded-2xl bg-red-800 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-100">
                                    {selectedConsultation.fullName?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{selectedConsultation.fullName}</h3>
                                    <p className="text-gray-500 font-medium">{selectedConsultation.gender === 'MALE' ? 'Nam' : 'Nữ'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Số điện thoại</label>
                                    <div className="flex items-center gap-3 text-gray-700 font-medium bg-white p-3 rounded-xl border border-gray-100 italic">
                                        <Phone size={16} className="text-red-800" />
                                        {selectedConsultation.phoneNumber}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Ngày & Giờ sinh</label>
                                    <div className="flex items-center gap-3 text-gray-700 font-medium bg-white p-3 rounded-xl border border-gray-100">
                                        <Calendar size={16} className="text-red-800" />
                                        {new Date(selectedConsultation.dateOfBirth).toLocaleDateString('vi-VN')} {selectedConsultation.timeOfBirth && `(${selectedConsultation.timeOfBirth.substring(0, 5)})`}
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Mục tiêu của khách hàng</label>
                                    <div className="flex items-start gap-3 text-gray-700 font-medium bg-white p-4 rounded-xl border border-gray-200 italic leading-relaxed min-h-[100px]">
                                        <FileText size={18} className="text-red-800 flex-shrink-0 mt-1" />
                                        {selectedConsultation.objective}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end">
                            <button
                                className={styles.secondaryBtn}
                                onClick={() => setSelectedConsultation(null)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {}
            {showDeleteModal && (
                <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
                    <div className={`${styles.modalContent} !w-[400px]`} onClick={e => e.stopPropagation()}>
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Xác nhận xóa</h2>
                            <p className="text-gray-500 mb-8">
                                Bạn có chắc chắn muốn xóa lượt đăng ký của <span className="font-bold text-gray-700">{selectedConsultation.fullName}</span>? Hành động này không thể hoàn tác.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    className="flex-1 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={isProcessing}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                    onClick={handleDelete}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <RefreshCcw size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                    Xóa ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .truncate-2-lines {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    white-space: normal;
                }
            `}</style>
        </div>
    );
};

export default ConsultationManagement;
