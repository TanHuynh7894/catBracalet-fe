import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, RotateCcw, Home, HeadphonesIcon } from 'lucide-react';

const FailedPayment = () => {
    const [searchParams] = useSearchParams();
    const orderCode = searchParams.get('orderCode');

    return (
        <div style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'radial-gradient(circle at top right, rgba(239,68,68,0.05) 0%, transparent 40%)',
        }}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '3rem',
                    maxWidth: '520px',
                    width: '100%',
                    boxShadow: '0 20px 50px -12px rgba(0,0,0,0.08)',
                    textAlign: 'center',
                    border: '1px solid rgba(0,0,0,0.04)',
                }}
            >
                {}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                    style={{ display: 'inline-flex', marginBottom: '1.5rem' }}
                >
                    <XCircle size={80} color="#ef4444" />
                </motion.div>

                <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                    Thanh Toán Thất Bại
                </h1>
                <p style={{ color: '#6b7280', lineHeight: 1.6, fontSize: '1rem', marginBottom: '2rem' }}>
                    Giao dịch của bạn không thể hoàn tất. Đừng lo — đơn hàng của bạn vẫn được lưu lại và bạn có thể thử thanh toán lại.
                </p>

                {}
                {orderCode && (
                    <div style={{
                        background: '#fef9f0',
                        border: '1px solid #fde68a',
                        borderRadius: '12px',
                        padding: '1rem 1.5rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <span style={{ color: '#92400e', fontWeight: 500 }}>Mã giao dịch:</span>
                        <span style={{ color: '#111827', fontWeight: 700 }}>#{orderCode}</span>
                    </div>
                )}

                {}
                <div style={{
                    background: '#fef2f2',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    marginBottom: '2rem',
                    textAlign: 'left',
                    border: '1px solid #fecaca',
                }}>
                    <p style={{ fontWeight: 600, color: '#7f1d1d', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Lý do có thể xảy ra:</p>
                    <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: '#b91c1c', fontSize: '0.875rem', lineHeight: 1.8 }}>
                        <li>Số dư tài khoản không đủ</li>
                        <li>Hết thời gian thanh toán (quá 15 phút)</li>
                        <li>Thông tin tài khoản ngân hàng không hợp lệ</li>
                        <li>Kết nối mạng bị gián đoạn</li>
                    </ul>
                </div>

                {}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link
                        to="/checkout"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            background: '#111827',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <RotateCcw size={20} />
                        <span>Thử thanh toán lại</span>
                    </Link>

                    <Link
                        to="/order-history"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            background: '#f3f4f6',
                            color: '#374151',
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                    >
                        <span>Xem lịch sử đơn hàng</span>
                    </Link>

                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            color: '#6b7280',
                            fontWeight: 500,
                            textDecoration: 'none',
                            paddingTop: '0.5rem',
                        }}
                    >
                        <Home size={18} />
                        <span>Quay về trang chủ</span>
                    </Link>
                </div>

                <div style={{
                    marginTop: '2.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #f3f4f6',
                    fontSize: '0.9rem',
                    color: '#9ca3af',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    <HeadphonesIcon size={16} />
                    <p style={{ margin: 0 }}>Cần hỗ trợ? <Link to="/" style={{ color: '#111827', fontWeight: 600, textDecoration: 'none' }}>Liên hệ chúng tôi</Link></p>
                </div>
            </motion.div>
        </div>
    );
};

export default FailedPayment;
