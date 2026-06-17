import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { shopLocationService } from '../services/shopLocationService';
import styles from './ShopMap.module.css';

const ShopMap = () => {
    const [shopInfo, setShopInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShopLocation = async () => {
            try {
                const data = await shopLocationService.getShopLocation();
                setShopInfo(data);
            } catch (err) {
                console.error('Failed to fetch shop location:', err);
                setError('Không thể tải thông tin cửa hàng');
            } finally {
                setLoading(false);
            }
        };

        fetchShopLocation();
    }, []);

    if (loading) {
        return (
            <div className={styles.mapSection}>
                <div className={styles.mapSkeleton}>
                    <div className={styles.skeletonPulse} />
                </div>
            </div>
        );
    }

    if (error || !shopInfo) {
        return null; // Ẩn section nếu không tải được
    }

    const { shopName, shopAddress, phoneNumber, workingHours, shopLatitude, shopLongitude } = shopInfo;

    // Google Maps Embed URL dùng tọa độ từ API
    const mapEmbedUrl = `https://www.google.com/maps?q=${shopLatitude},${shopLongitude}&z=16&output=embed`;

    // Link mở Google Maps trên trình duyệt/app
    const mapsDirectionUrl = `https://www.google.com/maps/dir/?api=1&destination=${shopLatitude},${shopLongitude}`;

    return (
        <div className={styles.mapSection}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>Tìm Chúng Tôi</span>
                <h3 className={styles.sectionTitle}>Cửa Hàng</h3>
            </div>

            <div className={styles.mapWrapper}>
                {/* Google Maps Embed */}
                <div className={styles.iframeContainer}>
                    <iframe
                        title={`${shopName} - Bản đồ cửa hàng`}
                        src={mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                {/* Info Card overlay */}
                <div className={styles.infoCard}>
                    <h4 className={styles.shopName}>{shopName}</h4>

                    <div className={styles.infoRow}>
                        <MapPin size={14} className={styles.infoIcon} />
                        <span>{shopAddress}</span>
                    </div>

                    {phoneNumber && phoneNumber !== 'N/A' && (
                        <div className={styles.infoRow}>
                            <Phone size={14} className={styles.infoIcon} />
                            <a href={`tel:${phoneNumber}`} className={styles.infoLink}>
                                {phoneNumber}
                            </a>
                        </div>
                    )}

                    {workingHours && workingHours !== 'N/A' && (
                        <div className={styles.infoRow}>
                            <Clock size={14} className={styles.infoIcon} />
                            <span>{workingHours}</span>
                        </div>
                    )}

                    <a
                        href={mapsDirectionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.directionsBtn}
                    >
                        <ExternalLink size={13} />
                        Chỉ đường
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ShopMap;
