import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Package, Truck, Check, X,
    User, MapPin, Phone, Mail, Calendar, CreditCard,
    ShoppingBag, Info, AlertTriangle, Loader2, Printer
} from 'lucide-react';
import styles from './OrderDetail.module.css';
import { orderService, confirmOrder } from '../../services/orderService';
import { shipmentService } from '../../services/shipmentService';
import { useToast } from '../../context/ToastContext';

const AdminOrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);


    const [packageInfo, setPackageInfo] = useState({
        weight: 500,
        width: 10,
        height: 10,
        length: 10,
        cod: 0
    });
    const [shippingRates, setShippingRates] = useState([]);
    const [selectedRateId, setSelectedRateId] = useState(null);
    const [isGettingRates, setIsGettingRates] = useState(false);
    const [trackingInfo, setTrackingInfo] = useState(null);

    const fetchOrderDetail = async () => {
        setIsLoading(true);
        try {
            const data = await orderService.getOrderById(id);
            setOrder(data);

           
            if (data.status === 'SHIPPING' || data.status === 'COMPLETED') {
                fetchTracking();
            }
        } catch (error) {
            showToast('Không thể tải thông tin đơn hàng', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTracking = async () => {
        try {
            const data = await shipmentService.trackShipment(id);
            setTrackingInfo(data);
        } catch (error) {
            console.error('Tracking fetch failed:', error);
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    const handleConfirmOrder = async () => {
        setIsUpdating(true);
        try {
            await confirmOrder(id);
            showToast('Đã xác nhận đơn hàng thành công', 'success');
            fetchOrderDetail();
        } catch (error) {
            showToast(error || 'Xác nhận đơn hàng thất bại', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleFetchRates = async () => {
        setIsGettingRates(true);
        try {
            const data = await shipmentService.getShippingRates(id, packageInfo);
            setShippingRates(data.carriers || []);
            showToast('Đã cập nhật danh sách giá vận chuyển', 'success');
        } catch (error) {
            showToast(error || 'Không thể lấy thông tin giá vận chuyển', 'error');
        } finally {
            setIsGettingRates(false);
        }
    };

    const handleCreateShipment = async () => {
        if (!selectedRateId) {
            showToast('Vui lòng chọn một đơn vị vận chuyển', 'warning');
            return;
        }

        setIsUpdating(true);
        try {
            const payload = {
                orderId: id,
                rateId: selectedRateId,
                payer: 1, 
                ...packageInfo,
                note: "Hàng trang sức, vui lòng giao nhẹ tay."
            };
            await shipmentService.createShipment(payload);
            showToast('Đã tạo vận đơn thành công', 'success');
            fetchOrderDetail();
        } catch (error) {
            showToast(error || 'Tạo vận đơn thất bại', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdateStatus = async (newStatus) => {
        setIsUpdating(true);
        try {
            await orderService.updateOrderStatus(id, newStatus);
            showToast(`Đã chuyển trạng thái sang: ${newStatus}`, 'success');
            fetchOrderDetail();
        } catch (error) {
            showToast('Cập nhật trạng thái thất bại', 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 size={40} className="animate-spin text-[#ab121c]" />
            <p className="text-gray-500 font-medium italic">Đang tải chi tiết đơn hàng...</p>
        </div>
    );

    if (!order) return (
        <div className="text-center p-20">
            <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Không tìm thấy đơn hàng này.</p>
            <button onClick={() => navigate('/admin/orders')} className="mt-4 text-[#ab121c] font-bold">Quay lại danh sách</button>
        </div>
    );

    const getStatusLabel = (status) => {
        switch (status) {
            case 'PENDING': return { label: 'Chờ xác nhận', color: '#a16207', bg: '#fef9c3' };
            case 'CONFIRMED': return { label: 'Đã xác nhận', color: '#1e40af', bg: '#dbeafe' };
            case 'SHIPPING': return { label: 'Đang giao hàng', color: '#7c3aed', bg: '#ede9fe' };
            case 'COMPLETED': return { label: 'Hoàn tất', color: '#166534', bg: '#dcfce7' };
            case 'CANCELLED': return { label: 'Đã hủy', color: '#991b1b', bg: '#fee2e2' };
            default: return { label: status, color: '#64748b', bg: '#f1f5f9' };
        }
    };

    const statusInfo = getStatusLabel(order.status);

    return (
        <div className={styles.container}>
            {}
            <div className={styles.header}>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/orders')} className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className={styles.title}>Đơn hàng #{id?.slice(0, 8).toUpperCase() || 'ĐANG TẢI...'}</h1>
                        <p className={styles.subtitle}>Đặt ngày {order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN') : '---'}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className={styles.secondaryBtn}>
                        <Printer size={18} /> In hóa đơn
                    </button>
                    {order.status === 'PENDING' && (
                        <button
                            className={styles.primaryBtn}
                            onClick={handleConfirmOrder}
                            disabled={isUpdating || order.paymentStatus !== 'PAID'}
                            title={order.paymentStatus !== 'PAID' ? 'Chưa thanh toán' : ''}
                        >
                            {isUpdating ? <Loader2 size={18} className="animate-spin" /> : 'Xác nhận đơn'}
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.grid}>
                {}
                <div className={styles.leftCol}>
                    {}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <ShoppingBag size={18} />
                            <h2>Sản phẩm trong đơn ({order.items?.length || 0})</h2>
                        </div>
                        <div className={styles.itemList}>
                            {order.items?.map((item, idx) => {
                                
                                const mapping = item.variant?.productVariantMappings?.[0];
                                const product = mapping?.product;
                                const variantInfo = [item.variant?.color, item.variant?.size].filter(Boolean).join(' - ');
                                const imgSrc = product?.thumbnail || 'https://placehold.co/60x60/f1f5f9/94a3b8?text=SP';
                                const unitPrice = Number(item.unitPrice ?? 0);
                                return (
                                    <div key={idx} className={styles.item}>
                                        <div className={styles.itemImg}>
                                            <img src={imgSrc} alt={product?.productName} />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h3>{product?.productName || 'Sản phẩm'}</h3>
                                            <p>{variantInfo || 'Mặc định'}</p>
                                        </div>
                                        <div className={styles.itemPrice}>
                                            <span>x{item.quantity}</span>
                                            <strong>{new Intl.NumberFormat('vi-VN').format(unitPrice)}đ</strong>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.summary}>
                            <div className={styles.summaryRow}>
                                <span>Tạm tính:</span>
                                <span>{new Intl.NumberFormat('vi-VN').format(
                                    order.items?.reduce((acc, item) => acc + Number(item.totalPrice ?? item.unitPrice ?? 0) * (item.quantity || 1), 0) || 0
                                )}đ</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Phí vận chuyển:</span>
                                <span>{order.shippingFee > 0 ? new Intl.NumberFormat('vi-VN').format(order.shippingFee) + 'đ' : 'Miễn phí'}</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Tổng cộng:</span>
                                <span>{new Intl.NumberFormat('vi-VN').format(order.totalAmount)}đ</span>
                            </div>
                        </div>
                    </div>

                    {}
                    {order.status === 'CONFIRMED' && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <Package size={18} />
                                <h2>Quản lý vận chuyển (Goship)</h2>
                            </div>
                            <div className={styles.shipmentSection}>
                                <div className={styles.inputGrid}>
                                    <div className={styles.inputField}>
                                        <label>Khối lượng (gram)</label>
                                        <input
                                            type="number"
                                            value={packageInfo.weight}
                                            onChange={(e) => setPackageInfo({ ...packageInfo, weight: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className={styles.inputField}>
                                        <label>COD (vnđ)</label>
                                        <input
                                            type="number"
                                            value={packageInfo.cod}
                                            onChange={(e) => setPackageInfo({ ...packageInfo, cod: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className={styles.inputField}>
                                        <label>Dài (cm)</label>
                                        <input
                                            type="number"
                                            value={packageInfo.length}
                                            onChange={(e) => setPackageInfo({ ...packageInfo, length: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className={styles.inputField}>
                                        <label>Rộng (cm)</label>
                                        <input
                                            type="number"
                                            value={packageInfo.width}
                                            onChange={(e) => setPackageInfo({ ...packageInfo, width: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className={styles.inputField}>
                                        <label>Cao (cm)</label>
                                        <input
                                            type="number"
                                            value={packageInfo.height}
                                            onChange={(e) => setPackageInfo({ ...packageInfo, height: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            className={styles.primaryBtn}
                                            style={{ width: '100%', justifyContent: 'center' }}
                                            onClick={handleFetchRates}
                                            disabled={isGettingRates}
                                        >
                                            {isGettingRates ? <Loader2 size={16} className="animate-spin" /> : 'Lấy báo giá'}
                                        </button>
                                    </div>
                                </div>

                                {shippingRates.length > 0 && (
                                    <div className="animate-fade-in">
                                        <h3 className="text-sm font-bold text-gray-700 mb-3">Chọn đơn vị vận chuyển</h3>
                                        <div className={styles.rateList}>
                                            {shippingRates.map((carrier, cIdx) => (
                                                <div key={cIdx} className="mb-4">
                                                    <div className="flex items-center gap-2 mb-2 px-1">
                                                        <img src={carrier.carrier_logo} alt={carrier.carrier_name} className="w-5 h-5 object-contain" />
                                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{carrier.carrier_name}</span>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {carrier.services?.map((svc) => (
                                                            <div
                                                                key={svc.rateId}
                                                                className={`${styles.rateCard} ${selectedRateId === svc.rateId ? styles.selected : ''}`}
                                                                onClick={() => setSelectedRateId(svc.rateId)}
                                                            >
                                                                <div className={styles.carrierInfo}>
                                                                    <p className={styles.carrierName}>{svc.service}</p>
                                                                    <p className={styles.carrierService}>{svc.expected}</p>
                                                                </div>
                                                                <div className={styles.ratePrice}>
                                                                    <p className={styles.fee}>{new Intl.NumberFormat('vi-VN').format(svc.total_amount)}đ</p>
                                                                    {svc.cod_fee > 0 && <p className={styles.expected}>Phí COD: {new Intl.NumberFormat('vi-VN').format(svc.cod_fee)}đ</p>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            className={styles.primaryBtn}
                                            style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
                                            onClick={handleCreateShipment}
                                            disabled={isUpdating || !selectedRateId}
                                        >
                                            {isUpdating ? <Loader2 size={18} className="animate-spin" /> : 'Tạo vận đơn & Đẩy lên Goship'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {}
                    {(order.status === 'SHIPPING' || order.status === 'DELIVERED' || trackingInfo) && (
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <Truck size={18} />
                                <h2>Thông tin vận chuyển</h2>
                            </div>
                            <div className="p-5">
                                <div className={styles.trackingCard}>
                                    <div className={styles.trackingHeader}>
                                        <span className="text-sm font-bold text-gray-700">Trạng thái Goship</span>
                                        <span className="text-sm font-bold text-[#ab121c]">{trackingInfo?.status || 'Đang cập nhật'}</span>
                                    </div>
                                    <div className={styles.trackingInfo}>
                                        <div className={styles.trackingRow}>
                                            <span>Mã vận đơn:</span>
                                            <span>{trackingInfo?.trackingCode || 'Chưa gán'}</span>
                                        </div>
                                        <div className={styles.trackingRow}>
                                            <span>Đơn vị vận chuyển:</span>
                                            <span>{trackingInfo?.carrier || 'Goship'}</span>
                                        </div>
                                        <div className={styles.trackingRow}>
                                            <span>Cập nhật lần cuối:</span>
                                            <span>{trackingInfo?.updatedAt ? new Date(trackingInfo.updatedAt).toLocaleString('vi-VN') : '---'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <Truck size={18} />
                            <h2>Lộ trình thực hiện đơn hàng</h2>
                        </div>
                        <div className={styles.timeline}>
                            <div className={`${styles.timelineItem} ${order.status !== 'CANCELLED' ? styles.active : ''}`}>
                                <div className={styles.dot}></div>
                                <div className={styles.content}>
                                    <h4>Đã đặt đơn</h4>
                                    <p>{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                                </div>
                            </div>
                            {order.status === 'CANCELLED' && (
                                <div className={`${styles.timelineItem} ${styles.cancelled}`}>
                                    <div className={styles.dot}></div>
                                    <div className={styles.content}>
                                        <h4>Đã hủy đơn</h4>
                                        <p>Lý do: Khách hàng yêu cầu hủy</p>
                                    </div>
                                </div>
                            )}
                            {order.status !== 'PENDING' && order.status !== 'CANCELLED' && (
                                <div className={`${styles.timelineItem} ${styles.active}`}>
                                    <div className={styles.dot}></div>
                                    <div className={styles.content}>
                                        <h4>Đã xác nhận</h4>
                                        <p>{order.paymentStatus === 'PAID' ? 'Đã thanh toán & Xác nhận' : 'Đã xác nhận thanh toán'}</p>
                                    </div>
                                </div>
                            )}
                            {(order.status === 'SHIPPING' || order.status === 'DELIVERED') && (
                                <div className={`${styles.timelineItem} ${styles.active}`}>
                                    <div className={styles.dot}></div>
                                    <div className={styles.content}>
                                        <h4>Đang giao hàng</h4>
                                        <p>Đã bàn giao cho đơn vị vận chuyển</p>
                                    </div>
                                </div>
                            )}
                            {order.status === 'DELIVERED' && (
                                <div className={`${styles.timelineItem} ${styles.active}`}>
                                    <div className={styles.dot}></div>
                                    <div className={styles.content}>
                                        <h4>Đã hoàn tất</h4>
                                        <p>Khách hàng đã nhận hàng</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {}
                <div className={styles.rightCol}>
                    {}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <Info size={18} />
                            <h2>Trạng thái hệ thống</h2>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <div className={styles.statusCurrent} style={{ background: statusInfo.bg, color: statusInfo.color }}>
                                Trạng thái đơn: <strong>{statusInfo.label}</strong>
                            </div>
                            <div className={styles.statusCurrent} style={{
                                background: order.paymentStatus === 'PAID' ? '#dcfce7' : '#fee2e2',
                                color: order.paymentStatus === 'PAID' ? '#166534' : '#991b1b'
                            }}>
                                Thanh toán: <strong>{order.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}</strong>
                            </div>

                            <div className={styles.actionGrid}>
                                {order.status === 'SHIPPING' && (
                                    <button onClick={() => handleUpdateStatus('DELIVERED')} className={styles.btnAction} disabled={isUpdating}>
                                        {isUpdating ? <Loader2 size={16} className="animate-spin" /> : 'Xác nhận hoàn tất đơn'}
                                    </button>
                                )}
                                {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
                                    <button onClick={() => handleUpdateStatus('CANCELLED')} className={styles.btnDanger} disabled={isUpdating}>
                                        {isUpdating ? <Loader2 size={16} className="animate-spin" /> : 'Hủy đơn hàng'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <User size={18} />
                            <h2>Thông tin khách hàng</h2>
                        </div>
                        <div className={styles.customerCard}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={styles.avatar}>
                                    {order.user?.fullName?.[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{order.user?.fullName}</h4>
                                    <p className="text-xs text-gray-500">Khách hàng mới</p>
                                </div>
                            </div>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <Mail size={14} /> <span>{order.user?.email}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <Phone size={14} /> <span>{order.user?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <MapPin size={18} />
                            <h2>Địa chỉ giao hàng</h2>
                        </div>
                        <div className="p-5">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                <strong>Người nhận:</strong> {order.address?.receiverName || order.user?.fullName}<br />
                                <strong>SĐT:</strong> {order.address?.phone || order.user?.phone}<br />
                                {order.address?.ward}, {order.address?.district}, {order.address?.province}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetail;
