import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, ChevronUp, X, SlidersHorizontal,
    ShoppingBag, Heart, Plus, Minus, Gem, Sparkles, User, Gift, RefreshCw,
} from 'lucide-react';
import styles from './CustomBraceletPage.module.css';

// ─── Hero Image ───────────────────────────────────────────────────────────────
import heroImg from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/all0.jpg';

// ─── Wire Images (circular bracelet photos, matching design wire cards) ───────
import wireRed from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W1-4EEN-4KFN-2CH4-2CH7-R20.jpg';
import wireBlack from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W2-4KCN-4KFN-2CH4-2CH7-R20.jpg';
import wireBrown from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W4-4KDN-4KFN-2CH4-2CH7-R20.jpg';
import wireClear from '../../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W6-4AAN-4KFN-2CH4-2CH7-R20.jpg';

// ─── Stone images — Đá thô (raw bracelets) ────────────────────────────────────
import daThoa from '../../assets/Image - Cat/hình ảnh Sp/DA THO/D2-1FGT-R2.jpg';
import daThob from '../../assets/Image - Cat/hình ảnh Sp/DA THO/D2-1KDT-R20.jpg';
import daThoc from '../../assets/Image - Cat/hình ảnh Sp/DA THO/D2-1LPT-R2.jpg';
import daThod from '../../assets/Image - Cat/hình ảnh Sp/DA THO/D3-1KFT-R2.jpg';
import daThoe from '../../assets/Image - Cat/hình ảnh Sp/DA THO/D3-1KDT-R20.jpg';
import daThof from '../../assets/Image - Cat/hình ảnh Sp/DA THO/D3-1KIT-R2.jpg';

// ─── Stone images — Đá nhuộm (dyed beads) ────────────────────────────────────
import nhuyen1 from '../../assets/Image - Cat/hình ảnh Sp/13 nhuyễn - 9 bi3-251006/D2-13AAN-9CH3-R20.jpg';
import nhuyen2 from '../../assets/Image - Cat/hình ảnh Sp/13 nhuyễn - 9 bi3-251006/D2-13EDN-9CH3-R20.jpg';
import nhuyen3 from '../../assets/Image - Cat/hình ảnh Sp/13 nhuyễn - 9 bi3-251006/D2-13KDN-9CH3-R20.jpg';
import nhuyen4 from '../../assets/Image - Cat/hình ảnh Sp/13 nhuyễn - 9 bi3-251006/D2-13EEN-9CH3-R20.jpg';
import nhuyen5 from '../../assets/Image - Cat/hình ảnh Sp/13 nhuyễn - 9 bi3-251006/D2-13KGN-9CH3-R20.jpg';
import nhuyen6 from '../../assets/Image - Cat/hình ảnh Sp/13 nhuyễn - 9 bi3-251006/D2-13KIN-9CH3-R20.jpg';

// ─── Stone images — Bi tròn (round beads) ────────────────────────────────────
import biTron1 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1AA10-16AAN-2CH7-R2.jpg';
import biTron2 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1KC10-16KCN-2CH7-R2.jpg';
import biTron3 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1KD10-16KDN-2CH7-R2.jpg';
import biTron4 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1KG10-16KGN-2CH7-R2.jpg';
import biTron5 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1ED10-16EDN-2CH7-R2.jpg';
import biTron6 from '../../assets/Image - Cat/hình ảnh Sp/1 tròn 10 - 16 nhuyễn - 2 đĩa/D2-1EE10-16EEN-2CH7-R2.jpg';

// ─── Charm Images (keychain / charm photos) ───────────────────────────────────
import charm1 from '../../assets/Image - Cat/hình ảnh Sp/MocKhoa Evil eye/D2-W1-2EEN-2KFN-2CH30.jpg';
import charm2 from '../../assets/Image - Cat/hình ảnh Sp/MocKhoa Evil eye/D2-W2-2KCN-2KFN-2CH30.jpg';
import charm3 from '../../assets/Image - Cat/hình ảnh Sp/MocKhoa Evil eye/D2-W3-2KCN-2KFN-2CH30.jpg';
import charm4 from '../../assets/Image - Cat/hình ảnh Sp/MocKhoa Evil eye/D2-W4-2KDN-2KFN-2CH30.jpg';
import charm5 from '../../assets/Image - Cat/hình ảnh Sp/MocKhoa Evil eye/D2-W5-2LPN-2KFN-2CH30.jpg';
import charm6 from '../../assets/Image - Cat/hình ảnh Sp/MocKhoa Evil eye/D2-W6-2AAN-2KFN-2CH30.jpg';

// ─── Accessory Images ─────────────────────────────────────────────────────────
import acc1 from '../../assets/Image - Cat/ảnh Thô/IMG_4995.jpg';
import acc2 from '../../assets/Image - Cat/ảnh Thô/IMG_4996.jpg';
import acc3 from '../../assets/Image - Cat/ảnh Thô/IMG_4999.jpg';
import acc4 from '../../assets/Image - Cat/hình ảnh Sp/TUIHANG.jpg';

// ─── Framer Motion variants ───────────────────────────────────────────────────
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.8 },
};

// ─── Static Data ──────────────────────────────────────────────────────────────
const features = [
    {
        icon: <Sparkles size={26} strokeWidth={1.4} />,
        title: 'Tự do phối chất liệu',
        subtitle: 'Thoải mái kết hợp theo phong cách riêng',
    },
    {
        icon: <Gem size={26} strokeWidth={1.4} />,
        title: 'Charm & đá chọn lẻ',
        subtitle: 'Đa dạng mẫu mã, chọn từng món yêu thích',
    },
    {
        icon: <User size={26} strokeWidth={1.4} />,
        title: 'Mua theo gu cá nhân',
        subtitle: 'Tự tạo vòng mang dấu ấn riêng của bạn',
    },
    {
        icon: <Gift size={26} strokeWidth={1.4} />,
        title: 'Đóng gói nguyên liệu cao cấp',
        subtitle: 'Vòng gói cẩn thận, để bảo quản và làm quà',
    },
];

const wireOptions = [
    { id: 'red', label: 'Dây đỏ', image: wireRed },
    { id: 'black', label: 'Dây đen', image: wireBlack },
    { id: 'brown', label: 'Dây nâu', image: wireBrown },
    { id: 'clear', label: 'Dây trong suốt', image: wireClear },
];

const stoneTabs = ['Đá thô', 'Đá nhuộm', 'Bi tròn'];

const stonesMap = {
    'Đá thô': [
        { id: 'dt1', label: 'Thạch anh hồng', image: daThoa },
        { id: 'dt2', label: 'Hắc thạch', image: daThob },
        { id: 'dt3', label: 'Mắt hổ', image: daThoc },
        { id: 'dt4', label: 'Mã não', image: daThod },
        { id: 'dt5', label: 'Thạch anh trắng', image: daThoe },
        { id: 'dt6', label: 'Ngọc bích', image: daThof },
    ],
    'Đá nhuộm': [
        { id: 'dn1', label: 'Thạch anh hồng', image: nhuyen1 },
        { id: 'dn2', label: 'Hắc thạch', image: nhuyen2 },
        { id: 'dn3', label: 'Mắt hổ', image: nhuyen3 },
        { id: 'dn4', label: 'Mã não', image: nhuyen4 },
        { id: 'dn5', label: 'Thạch anh trắng', image: nhuyen5 },
        { id: 'dn6', label: 'Ngọc bích', image: nhuyen6 },
    ],
    'Bi tròn': [
        { id: 'bt1', label: 'Thạch anh', image: biTron1 },
        { id: 'bt2', label: 'Mã não', image: biTron2 },
        { id: 'bt3', label: 'Mắt hổ', image: biTron3 },
        { id: 'bt4', label: 'Mẫu đơn', image: biTron4 },
        { id: 'bt5', label: 'Thạch anh trắng', image: biTron5 },
        { id: 'bt6', label: 'Ngọc bích', image: biTron6 },
    ],
};

const charms = [
    { id: 'c1', label: 'Hồ điệp', image: charm1 },
    { id: 'c2', label: 'Hoa sen', image: charm2 },
    { id: 'c3', label: 'Trái tim', image: charm3 },
    { id: 'c4', label: 'Mặt trăng', image: charm4 },
    { id: 'c5', label: 'Đồng tiền', image: charm5 },
    { id: 'c6', label: 'Mắt thần', image: charm6 },
];

const accessories = [
    { id: 'a1', label: 'Hạt chặn', image: acc1 },
    { id: 'a2', label: 'Khoen nối', image: acc2 },
    { id: 'a3', label: 'Chặn hạt', image: acc3 },
    { id: 'a4', label: 'Gói combo phụ kiện', image: acc4 },
];

const uspItems = [
    {
        icon: <Heart size={20} strokeWidth={1.5} />,
        title: 'Đá tự nhiên tuyển chọn',
        desc: '100% đá tự nhiên, năng lượng thuần khiết, được kiểm định rõ nguồn gốc.',
    },
    {
        icon: <Sparkles size={20} strokeWidth={1.5} />,
        title: 'Charm lẻ đa phối',
        desc: 'Đa dạng biểu tượng ý nghĩa, dễ dàng phối theo sở thích.',
    },
    {
        icon: <User size={20} strokeWidth={1.5} />,
        title: 'Tự custom theo gu riêng',
        desc: 'Thoải mái sáng tạo, tạo nên vòng tay độc đáo bản.',
    },
    {
        icon: <Gift size={20} strokeWidth={1.5} />,
        title: 'Đóng gối đẹp, để bảo quản',
        desc: 'Đóng gói cẩn thận, sang trọng, bảo quản nguyên liệu tốt hơn.',
    },
];

// Sidebar accordion sections – mirrors the design exactly
const sidebarSections = [
    {
        id: 'set',
        title: 'Set nguyên liệu vòng tay',
        type: 'checkbox',
        defaultOpen: true,
        items: ['Set Tình yêu', 'Set Bình an', 'Set Thịnh vượng', 'Set Bảo hộ', 'Set Thanh lọc'],
    },
    {
        id: 'stones',
        title: 'Các loại đá',
        type: 'group',
        defaultOpen: true,
        groups: [
            { label: 'Đá thô', items: ['Thạch anh', 'Mã não', 'Hắc thạch', 'Ngọc bích', 'Khác'] },
            { label: 'Đá nhuộm', items: ['Thạch anh hồng', 'Aventurine', 'Fluorite', 'Labradorite', 'Khác'] },
            { label: 'Bi tròn', items: ['Thạch anh', 'Mã não', 'Ngọc bích', 'Khác'] },
        ],
    },
    {
        id: 'charm',
        title: 'Các loại charm',
        type: 'checkbox',
        defaultOpen: true,
        items: ['Charm biểu tượng', 'Charm phong thủy', 'Charm chữ', 'Charm ngọc', 'Khác'],
    },
    {
        id: 'setCharm',
        title: 'Set charm',
        type: 'checkbox',
        defaultOpen: false,
        items: [],
    },
    {
        id: 'wire',
        title: 'Dây',
        type: 'checkbox',
        defaultOpen: true,
        items: ['Dây đỏ', 'Dây đen', 'Dây nâu', 'Dây trong suốt'],
    },
    {
        id: 'price',
        title: 'Giá tiền',
        type: 'price',
        defaultOpen: true,
        items: ['Dưới 100.000đ', '100.000 - 300.000đ', '300.000 - 600.000đ', 'Trên 600.000đ'],
    },
    {
        id: 'element',
        title: 'Mệnh phù hợp',
        type: 'checkbox',
        defaultOpen: true,
        items: ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'],
    },
];

// ─── Component ────────────────────────────────────────────────────────────────
const CustomBraceletPage = () => {
    const [selectedWire, setSelectedWire] = useState('red');
    const [activeStoneTab, setActiveStoneTab] = useState('Đá thô');
    const [selectedStones, setSelectedStones] = useState([]);
    const [selectedCharms, setSelectedCharms] = useState([]);
    const [accQty, setAccQty] = useState({ a1: 10, a2: 10, a3: 10, a4: 1 });
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSections, setOpenSections] = useState(
        sidebarSections.filter(s => s.defaultOpen).map(s => s.id)
    );
    const [sidebarChecks, setSidebarChecks] = useState({});
    const [selectedPrice, setSelectedPrice] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [sortBy, setSortBy] = useState('Mới nhất');
    const [sortOpen, setSortOpen] = useState(false);

    const toggleSection = (id) =>
        setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

    const toggleStone = (id) =>
        setSelectedStones(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

    const toggleCharm = (id) =>
        setSelectedCharms(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

    const updateQty = (id, delta) =>
        setAccQty(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }));

    const toggleCheck = (key) =>
        setSidebarChecks(prev => ({ ...prev, [key]: !prev[key] }));

    const clearFilters = () => {
        setSidebarChecks({});
        setSelectedPrice('');
        setPriceFrom('');
        setPriceTo('');
    };

    const sortOptions = ['Mới nhất', 'Phổ biến nhất', 'Giá tăng dần', 'Giá giảm dần'];

    return (
        <div className={styles.page}>

            {/* ═══════════════════════════════════════════════════════
                1. HERO
            ══════════════════════════════════════════════════════════ */}
            <motion.section {...fadeUp} className={styles.hero}>
                <div className={styles.heroWrap}>

                    {/* Left – text */}
                    <div className={styles.heroLeft}>
                        <h1 className={styles.heroTitle}>
                            Tự chọn nguyên liệu.<br />
                            Tự tạo vòng Cát<br />
                            <span className={styles.heroTitleDark}>theo phong cách của bạn</span>
                        </h1>
                        <p className={styles.heroBody}>
                            Chọn charm, loại đá, dây và phụ kiện yêu thích<br />
                            để tự làm vòng tay riêng – theo gu bạn, theo năng lượng bạn.
                        </p>
                        <p className={styles.heroScript}>
                            Tự tay tạo nên món Trang sức<br />
                            <em>mang dấu ấn của chính bạn.</em>
                        </p>
                    </div>

                    {/* Right – image */}
                    <div className={styles.heroRight}>
                        <img
                            src={heroImg}
                            alt="Nguyên liệu vòng Cát"
                            className={styles.heroImg}
                            loading="eager"
                        />
                    </div>

                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════
                2. FEATURES BAR
            ════════════════════════════════════════════════════ */}
            <motion.section {...fadeUp} className={styles.features}>
                <div className={styles.container}>
                    <div className={styles.featureBar}>
                        {features.map((f, i) => (
                            <div key={i} className={styles.featureItem}>
                                <div className={styles.featureIcon}>{f.icon}</div>
                                <div className={styles.featureTexts}>
                                    <p className={styles.featureTitle}>{f.title}</p>
                                    <p className={styles.featureSub}>{f.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════
                3. BUILDER (sidebar + steps)
            ════════════════════════════════════════════════════ */}
            <section className={styles.builder}>
                <div className={styles.builderWrap}>

                    {/* Mobile filter button */}
                    <button
                        className={styles.mobileFilterBtn}
                        onClick={() => setIsMobileOpen(true)}
                    >
                        <SlidersHorizontal size={15} />
                        Bộ lọc
                    </button>

                    {/* Overlay */}
                    <AnimatePresence>
                        {isMobileOpen && (
                            <motion.div
                                className={styles.overlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileOpen(false)}
                            />
                        )}
                    </AnimatePresence>

                    {/* ─── SIDEBAR ─────────────────────────────── */}
                    <aside className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarOpen : ''}`}>

                        {/* Header */}
                        <div className={styles.sidebarHead}>
                            <span className={styles.sidebarHeadLabel}>BỘ CHỌN NGUYÊN LIỆU</span>
                            <button
                                className={styles.sidebarCloseBtn}
                                onClick={() => setIsMobileOpen(false)}
                                aria-label="Đóng"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        {/* Accordion sections */}
                        {sidebarSections.map(sec => (
                            <div key={sec.id} className={styles.sbGroup}>
                                <button
                                    className={styles.sbGroupHead}
                                    onClick={() => toggleSection(sec.id)}
                                >
                                    <span>{sec.title}</span>
                                    {openSections.includes(sec.id) ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                </button>

                                <AnimatePresence initial={false}>
                                    {openSections.includes(sec.id) && (
                                        <motion.div
                                            key="body"
                                            className={styles.sbGroupBody}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                                        >
                                            {/* plain checkbox list */}
                                            {sec.type === 'checkbox' && sec.items.map(item => {
                                                const key = `${sec.id}||${item}`;
                                                return (
                                                    <label key={item} className={styles.filterRow}>
                                                        <input
                                                            type="checkbox"
                                                            className={styles.hiddenInput}
                                                            checked={!!sidebarChecks[key]}
                                                            onChange={() => toggleCheck(key)}
                                                        />
                                                        <span className={styles.cbBox} />
                                                        <span className={styles.filterText}>{item}</span>
                                                    </label>
                                                );
                                            })}

                                            {/* grouped checkbox list */}
                                            {sec.type === 'group' && sec.groups.map(grp => (
                                                <div key={grp.label} className={styles.sbSubGroup}>
                                                    <p className={styles.sbSubGroupLabel}>{grp.label}</p>
                                                    {grp.items.map(item => {
                                                        const key = `${sec.id}||${grp.label}||${item}`;
                                                        return (
                                                            <label key={key} className={styles.filterRow}>
                                                                <input
                                                                    type="checkbox"
                                                                    className={styles.hiddenInput}
                                                                    checked={!!sidebarChecks[key]}
                                                                    onChange={() => toggleCheck(key)}
                                                                />
                                                                <span className={styles.cbBox} />
                                                                <span className={styles.filterText}>{item}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            ))}

                                            {/* price radios + range */}
                                            {sec.type === 'price' && (
                                                <>
                                                    {sec.items.map(item => (
                                                        <label key={item} className={styles.filterRow}>
                                                            <input
                                                                type="radio"
                                                                name="price"
                                                                className={styles.hiddenInput}
                                                                checked={selectedPrice === item}
                                                                onChange={() => setSelectedPrice(item)}
                                                            />
                                                            <span className={styles.rbDot} />
                                                            <span className={styles.filterText}>{item}</span>
                                                        </label>
                                                    ))}
                                                    <div className={styles.priceRange}>
                                                        <span className={styles.priceLabel}>Từ</span>
                                                        <input
                                                            type="number"
                                                            placeholder="đ"
                                                            className={styles.priceInput}
                                                            value={priceFrom}
                                                            onChange={e => setPriceFrom(e.target.value)}
                                                        />
                                                        <span className={styles.priceLabel}>đến</span>
                                                        <input
                                                            type="number"
                                                            placeholder="đ"
                                                            className={styles.priceInput}
                                                            value={priceTo}
                                                            onChange={e => setPriceTo(e.target.value)}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        {/* Clear */}
                        <button className={styles.clearBtn} onClick={clearFilters}>
                            <RefreshCw size={12} />
                            XÓA BỘ LỌC
                        </button>
                    </aside>

                    {/* ─── BUILDER CONTENT ─────────────────────── */}
                    <div className={styles.builderContent}>

                        {/* Top bar */}
                        <div className={styles.contentTop}>
                            <div>
                                <h2 className={styles.contentTitle}>
                                    Chọn nguyên liệu để tự custom vòng của bạn
                                </h2>
                                <p className={styles.contentSub}>
                                    Chọn từng món theo sở thích, năng lượng và phong cách riêng.
                                </p>
                            </div>
                            <div className={styles.sortBox}>
                                <span className={styles.sortLabel}>Sắp xếp:</span>
                                <div className={styles.sortDropWrap}>
                                    <button
                                        className={styles.sortBtn}
                                        onClick={() => setSortOpen(v => !v)}
                                    >
                                        {sortBy}
                                        <ChevronDown
                                            size={13}
                                            className={sortOpen ? styles.sortChevronOpen : styles.sortChevron}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {sortOpen && (
                                            <motion.ul
                                                className={styles.sortMenu}
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {sortOptions.map(opt => (
                                                    <li key={opt}>
                                                        <button
                                                            className={`${styles.sortOpt} ${sortBy === opt ? styles.sortOptActive : ''}`}
                                                            onClick={() => { setSortBy(opt); setSortOpen(false); }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* ─── STEP 1: CHỌN DÂY ────────────── */}
                        <motion.div {...fadeUp} className={styles.step}>
                            <div className={styles.stepHead}>
                                <span className={styles.stepNum}>1</span>
                                <div>
                                    <h3 className={styles.stepTitle}>Chọn dây</h3>
                                    <p className={styles.stepSub}>Chọn loại dây phù hợp với phong cách của bạn</p>
                                </div>
                            </div>
                            <div className={styles.wireGrid}>
                                {wireOptions.map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`${styles.wireCard} ${selectedWire === opt.id ? styles.wireCardActive : ''}`}
                                        onClick={() => setSelectedWire(opt.id)}
                                    >
                                        <div className={styles.wireImgWrap}>
                                            <img src={opt.image} alt={opt.label} className={styles.wireImg} loading="lazy" />
                                        </div>
                                        <span className={styles.wireLabel}>{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── STEP 2: CHỌN LOẠI ĐÁ ────────── */}
                        <motion.div {...fadeUp} className={styles.step}>
                            <div className={styles.stepHead}>
                                <span className={styles.stepNum}>2</span>
                                <div>
                                    <h3 className={styles.stepTitle}>Chọn loại đá</h3>
                                    <p className={styles.stepSub}>Chọn dạng đá bạn yêu thích</p>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className={styles.tabs}>
                                {stoneTabs.map(tab => (
                                    <button
                                        key={tab}
                                        className={`${styles.tab} ${activeStoneTab === tab ? styles.tabActive : ''}`}
                                        onClick={() => setActiveStoneTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Stone cards */}
                            <div className={styles.stoneGrid}>
                                {stonesMap[activeStoneTab].map(stone => (
                                    <button
                                        key={stone.id}
                                        className={`${styles.stoneCard} ${selectedStones.includes(stone.id) ? styles.stoneCardActive : ''}`}
                                        onClick={() => toggleStone(stone.id)}
                                    >
                                        <div className={styles.stoneImgWrap}>
                                            <img src={stone.image} alt={stone.label} className={styles.stoneImg} loading="lazy" />
                                        </div>
                                        <span className={styles.stoneLabel}>{stone.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── STEP 3: CHỌN CHARM ──────────── */}
                        <motion.div {...fadeUp} className={styles.step}>
                            <div className={styles.stepHead}>
                                <span className={styles.stepNum}>3</span>
                                <div>
                                    <h3 className={styles.stepTitle}>Chọn charm</h3>
                                    <p className={styles.stepSub}>Chọn charm mang ý nghĩa và phong cách bạn yêu thích</p>
                                </div>
                            </div>
                            <div className={styles.charmGrid}>
                                {charms.map(c => (
                                    <button
                                        key={c.id}
                                        className={`${styles.charmCard} ${selectedCharms.includes(c.id) ? styles.charmCardActive : ''}`}
                                        onClick={() => toggleCharm(c.id)}
                                    >
                                        <div className={styles.charmImgWrap}>
                                            <img src={c.image} alt={c.label} className={styles.charmImg} loading="lazy" />
                                        </div>
                                        <span className={styles.charmLabel}>{c.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── STEP 4: PHỤ KIỆN & SỐ LƯỢNG ──── */}
                        <motion.div {...fadeUp} className={styles.step}>
                            <div className={styles.stepHead}>
                                <span className={styles.stepNum}>4</span>
                                <div>
                                    <h3 className={styles.stepTitle}>Chọn phụ kiện & số lượng</h3>
                                    <p className={styles.stepSub}>Chọn phụ kiện để kiểm và số lượng cần mua</p>
                                </div>
                            </div>
                            <div className={styles.accGrid}>
                                {accessories.map(a => (
                                    <div key={a.id} className={styles.accCard}>
                                        <div className={styles.accImgWrap}>
                                            <img src={a.image} alt={a.label} className={styles.accImg} loading="lazy" />
                                        </div>
                                        <span className={styles.accLabel}>{a.label}</span>
                                        <div className={styles.qty}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQty(a.id, -1)}
                                                aria-label="Giảm"
                                            >
                                                <Minus size={11} />
                                            </button>
                                            <span className={styles.qtyVal}>{accQty[a.id] ?? 0}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQty(a.id, 1)}
                                                aria-label="Tăng"
                                            >
                                                <Plus size={11} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── ACTION BUTTONS ──────────────── */}
                        <motion.div {...fadeUp} className={styles.actions}>
                            <button className={styles.btnOutline}>
                                <Heart size={15} strokeWidth={1.5} />
                                LƯU SET ĐÓ
                            </button>
                            <button className={styles.btnFill}>
                                <ShoppingBag size={15} strokeWidth={1.5} />
                                MUA NGUYÊN LIỆU
                            </button>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                4. USP SECTION
            ════════════════════════════════════════════════════ */}
            <motion.section {...fadeUp} className={styles.usp}>
                <div className={styles.container}>
                    <div className={styles.uspGrid}>
                        {uspItems.map((item, i) => (
                            <div key={i} className={styles.uspItem}>
                                <div className={styles.uspIcon}>{item.icon}</div>
                                <div className={styles.uspTexts}>
                                    <p className={styles.uspTitle}>{item.title}</p>
                                    <p className={styles.uspDesc}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

        </div>
    );
};

export default CustomBraceletPage;
