import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, ChevronDown } from 'lucide-react';
import { shopLocationService } from '../services/shopLocationService';
import styles from './ShopMap.module.css';

const ShopMap = () => {
    const [shops, setShops] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const data = await shopLocationService.getAllShopLocations();
                const active = Array.isArray(data) ? data.filter(s => s.isActive) : [];
                setShops(active);
            } catch (err) {
                console.error('Failed to fetch shop locations:', err);
                setError('Không thể tải thông tin cửa hàng');
            } finally {
                setLoading(false);
            }
        };
        fetchShops();
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

    if (error || shops.length === 0) {
        return null;
    }

    const shop = shops[selectedIdx] ?? shops[0];
    const { shopName, shopAddress, phoneNumber, workingHours, shopLatitude, shopLongitude } = shop;

    const mapEmbedUrl = `https://www.google.com/maps?q=${shopLatitude},${shopLongitude}&z=16&output=embed`;
    const mapsDirectionUrl = `https://www.google.com/maps/dir/?api=1&destination=${shopLatitude},${shopLongitude}`;

    return (
        <div className={styles.mapSection}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>Tìm Chúng Tôi</span>
                <h3 className={styles.sectionTitle}>Cửa Hàng</h3>
            </div>

            {/* Tab Switcher – only shown when multiple shops */}
            {shops.length > 1 && (
                <div className={styles.shopTabs}>
                    {shops.map((s, i) => (
                        <button
                            key={s.id}
                            className={`${styles.shopTab} ${i === selectedIdx ? styles.shopTabActive : ''}`}
                            onClick={() => setSelectedIdx(i)}
                        >
                            <MapPin size={13} />
                            {s.shopName}
                        </button>
                    ))}
                </div>
            )}

            <div className={styles.mapWrapper}>
                {/* Google Maps Embed */}
                <div className={styles.iframeContainer}>
                    <iframe
                        key={shop.id}
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
