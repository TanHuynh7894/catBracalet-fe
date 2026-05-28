import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import styles from './SuccessfulPayment.module.css';

const SuccessfulPayment = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        <CheckCircle2 size={80} className={styles.successIcon} />
                    </div>
                    <h1 className={styles.title}>Thanh Toán Thành Công!</h1>
                    <p className={styles.subtitle}>
                        Cảm ơn bạn đã tin tưởng và chọn sản phẩm từ Cat Bracelet.
                        Đơn hàng của bạn đã được nhận và đang trong quá trình chuẩn bị.
                    </p>
                </div>

                <div className={styles.orderSummary}>
                    <div className={styles.orderItem}>
                        <span className={styles.label}>Mã đơn hàng:</span>
                        <span className={styles.value}>#CB-827401</span>
                    </div>
                    <div className={styles.orderItem}>
                        <span className={styles.label}>Trạng thái:</span>
                        <span className={styles.statusBadge}>Đang xử lý</span>
                    </div>
                    <div className={styles.orderItem}>
                        <span className={styles.label}>Tổng cộng:</span>
                        <span className={styles.price}>850.000₫</span>
                    </div>
                </div>

                <div className={styles.infoBox}>
                    <Package size={20} className={styles.infoIcon} />
                    <p>Một email xác nhận đã được gửi đến địa chỉ email của bạn kèm theo thông tin chi tiết đơn hàng.</p>
                </div>

                <div className={styles.actions}>
                    <Link to="/collections" className={styles.primaryBtn}>
                        <ShoppingBag size={20} />
                        <span>Tiếp tục mua sắm</span>
                    </Link>
                    <Link to="/" className={styles.secondaryBtn}>
                        <span>Quay về trang chủ</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className={styles.footer}>
                    <p>Bạn cần hỗ trợ? <Link to="/about">Liên hệ chúng tôi</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SuccessfulPayment;
