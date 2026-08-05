import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X, Trash2, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [confirmData, setConfirmData] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 5000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showConfirm = useCallback((message, onConfirm) => {
        setConfirmData({ message, onConfirm });
    }, []);

    const handleConfirm = () => {
        if (confirmData?.onConfirm) confirmData.onConfirm();
        setConfirmData(null);
    };

    const handleCancel = () => {
        setConfirmData(null);
    };

    return (
        <ToastContext.Provider value={{ showToast, showConfirm }}>
            {children}

            {}
            <div className="fixed top-6 right-6 z-[1000] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            className="pointer-events-auto"
                        >
                            <div className={`
                                min-w-[320px] max-w-[400px] p-4 rounded-2xl shadow-2xl backdrop-blur-md border 
                                flex items-center gap-4 transition-all duration-300
                                ${toast.type === 'success'
                                    ? 'bg-white/90 border-green-100'
                                    : toast.type === 'info'
                                        ? 'bg-white/90 border-blue-100'
                                        : 'bg-white/90 border-red-100'}
                            `}>
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                    ${toast.type === 'success' ? 'bg-green-50 text-green-600' : toast.type === 'info' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}
                                `}>
                                    {toast.type === 'success' ? <CheckCircle2 size={24} /> : toast.type === 'info' ? <Info size={24} /> : <XCircle size={24} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[13px] font-semibold text-[#4B3A32]">
                                        {toast.type === 'success' ? 'Thành công' : toast.type === 'info' ? 'Thông tin' : 'Thông báo'}
                                    </p>
                                    <p className="text-[12px] text-[#8C7B72] mt-0.5 leading-relaxed">
                                        {toast.message}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="p-1.5 hover:bg-black/5 rounded-full text-gray-400 transition-colors"
                                >
                                    <X size={16} />
                                </button>

                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                    className={`absolute bottom-0 left-0 h-1 rounded-full ${toast.type === 'success' ? 'bg-green-500/30' : toast.type === 'info' ? 'bg-blue-500/30' : 'bg-red-500/30'}`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {}
            <AnimatePresence>
                {confirmData && (
                    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={handleCancel}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-[400px] bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
                                    <Trash2 size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-[#4B3A32] mb-3">Xác nhận thao tác</h3>
                                <p className="text-[14px] text-[#8C7B72] leading-relaxed mb-8">
                                    {confirmData.message}
                                </p>
                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-[#4B3A32] font-semibold text-sm hover:bg-gray-50 transition-colors"
                                    >
                                        Hủy bỏ
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className="flex-1 px-6 py-3 rounded-xl bg-[#ab121c] text-white font-semibold text-sm hover:bg-[#850e15] transition-colors shadow-lg shadow-red-900/10"
                                    >
                                        Đồng ý
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ToastContext.Provider>
    );
};
