import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Collections.module.css';

// === Local Assets ===
import prod1 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14AAN-2CH7-R20.jpg';
import prod2 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EDN-2CH7-R20.jpg';
import prod3 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EEN-2CH7-R20.jpg';
import prod4 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14FGN-2CH7-R20.jpg';
import prod5 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KCN-2CH7-R20.jpg';
import prod6 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KDN-2CH7-R20.jpg';

const Collections = () => {
    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        window.scrollTo(0, 0);
    }, []);

    const products = [
        { id: 1, name: "Vòng tay Hạnh phúc", price: "850.000đ", img: prod1 },
        { id: 2, name: "Vòng tay Trí tuệ", price: "920.000đ", img: prod2 },
        { id: 3, name: "Vòng tay Tĩnh lặng", price: "880.000đ", img: prod3 },
        { id: 4, name: "Vòng tay Ý niệm", price: "950.000đ", img: prod4 },
        { id: 5, name: "Vòng tay Bình an", price: "860.000đ", img: prod5 },
        { id: 6, name: "Vòng tay Yêu thương", price: "900.000đ", img: prod6 },
    ];

    return (
        <main className={styles.main}>
            {/* Header */}
            <header className={styles.heroHeader}>
                <span className={`${styles.label} reveal`}>Tất cả sản phẩm</span>
                <h1 className={`${styles.title} reveal`}>Bộ sưu tập Đá quý</h1>
                <p className={`${styles.subtitle} reveal`}>
                    Tuyển chọn những viên đá mang năng lượng chữa lành và bình an từ thiên nhiên.
                </p>
            </header>

            {/* Filter Section */}
            <section className={`${styles.filterBox} reveal`}>
                <div className={styles.filterGrid}>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterTitle}>Loại đá</label>
                        <select className="w-full bg-transparent border-b border-[#680006]/20 py-2 font-body text-sm outline-none">
                            <option>Tất cả các loại</option>
                            <option>Thạch anh hồng</option>
                            <option>Thạch anh tím</option>
                            <option>Đá mã não</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterTitle}>Màu sắc</label>
                        <div className="flex gap-4">
                            {['#ffdad6', '#ffe088', '#e5e2dc', '#d2e8b0'].map((color, i) => (
                                <button key={i} className="w-8 h-8 rounded-full border border-[#680006]/10" style={{ backgroundColor: color }} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterTitle}>Sắp xếp</label>
                        <select className="w-full bg-transparent border-b border-[#680006]/20 py-2 font-body text-sm outline-none">
                            <option>Mới nhất</option>
                            <option>Giá: Thấp đến Cao</option>
                            <option>Giá: Cao đến Thấp</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <div className={styles.productGrid}>
                {products.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className={`${styles.card} group reveal block`}>
                        <article>
                            <div className={styles.imageWrapper}>
                                <img alt={product.name} className={styles.image} src={product.img} />
                                <div className="absolute inset-0 bg-[#680006]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className={styles.cardDetails}>
                                <h3 className="font-headline text-2xl mb-2 text-[#680006] group-hover:translate-x-2 transition-transform duration-500">{product.name}</h3>
                                <p className="font-body text-lg text-[#680006] font-bold">{product.price}</p>
                                <div className="mt-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-[10px] uppercase tracking-widest font-bold border-b border-[#680006]">Xem chi tiết</span>
                                    <button
                                        className="bg-[#680006] text-white px-4 py-2 text-[10px] uppercase font-bold hover:bg-[#4d0004]"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent Link navigation
                                            // Add to cart logic
                                        }}
                                    >
                                        Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* Decoration Quote */}
            <section className={`${styles.quoteSection} reveal mt-32`}>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="font-headline text-3xl md:text-5xl text-[#680006] leading-tight italic">
                        "Cát - Nơi mỗi viên đá tìm thấy nhịp đập của trái tim bạn."
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Collections;
