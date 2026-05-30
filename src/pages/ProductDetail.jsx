import React, { useEffect } from 'react';
import { Star, ShieldCheck, HelpCircle, ShoppingCart, Heart } from 'lucide-react';
import styles from './ProductDetail.module.css';
import { motion } from 'framer-motion';
import Reveal from '../components/animations/Reveal';

// === Local Assets ===
import mainImg from '../assets/Image - Cat/hình ảnh Sp/2 tròn 6 - 1 tròn 10 - 2 bi4/D3-2KC6-1KD10-2CH4-R20.jpg';
import detail1 from '../assets/Image - Cat/hình ảnh Sp/2 tròn 6 - 1 tròn 10 - 2 bi4/D3-2FG6-1KD10-2CH4-R20.jpg';
import detail2 from '../assets/Image - Cat/hình ảnh Sp/2 tròn 6 - 1 tròn 10 - 2 bi4/D3-2FK6-1FG10-2CH4-R20.jpg';

const ProductDetail = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, []);

    return (
        <div className="bg-surface">
            <main className={styles.container}>
                {/* Left: Image side */}
                <div className={styles.imageSide}>
                    <Reveal y={20} className={styles.imageWrapper}>
                        <motion.img
                            className={styles.image}
                            src={mainImg}
                            alt="Main Product"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5 }}
                        />
                    </Reveal>
                    <div className="grid grid-cols-2 gap-4">
                        <motion.img
                            whileHover={{ scale: 0.98 }}
                            className="w-full aspect-square object-cover transition-all hover:brightness-90 cursor-pointer"
                            src={detail1}
                            alt="Detail"
                        />
                        <motion.img
                            whileHover={{ scale: 0.98 }}
                            className="w-full aspect-square object-cover transition-all hover:brightness-90 cursor-pointer"
                            src={detail2}
                            alt="Detail"
                        />
                    </div>
                </div>

                {/* Right: Content side */}
                <Reveal x={20} className={styles.contentSide}>
                    <nav className="flex gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#59413e] mb-6">
                        <span>Bộ sưu tập</span>
                        <span className="text-[#e0bfbb]">/</span>
                        <span className="text-[#680006]">Vòng tay Ý niệm</span>
                    </nav>

                    <div className="mb-6">
                        <h1 className={styles.title}>Vòng Tay <br />Tĩnh Tại</h1>
                        <div className="flex items-center gap-1.5 text-[#735c00] mt-4">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            <span className="text-[11px] font-body text-[#59413e] ml-2 tracking-wide">(128 đánh giá)</span>
                        </div>
                    </div>

                    <div className={styles.price}>920.000đ</div>

                    <p className={styles.description}>
                        Sự kết hợp tinh túy từ Thạch anh tím và Đá Aquamarine thô, mang lại năng lượng tĩnh lặng, giúp bạn lấy lại sự cân bằng trong cuộc sống bận rộn. Mỗi nút thắt được những người nghệ nhân Cát Bracelet thực hiện với sự tập trung tuyệt đối.
                    </p>

                    <div className="space-y-8 mt-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#680006]">Kích thước vòng</label>
                            <div className="flex gap-3">
                                {['14CM', '15CM', '16CM', '17CM'].map(size => (
                                    <button key={size} className="w-20 py-3 border border-[#e0bfbb] hover:border-[#680006] hover:bg-[#680006]/5 transition-all text-[11px] font-bold tracking-widest">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 items-stretch">
                            <button className={styles.ctaPrimary}>
                                <ShoppingCart className="inline-block mr-3 w-4 h-4 mb-0.5" />
                                Thêm vào giỏ hàng
                            </button>
                            <button className="px-5 border border-[#e0bfbb] hover:bg-[#680006]/5 transition-all flex items-center justify-center">
                                <Heart className="w-5 h-5 text-[#680006]" />
                            </button>
                        </div>
                        <button className={styles.ctaSecondary}>
                            Mua ngay
                        </button>
                    </div>

                    <div className="flex gap-8 mt-12 py-6 border-y border-[#e0bfbb]/20">
                        <div className="flex items-center gap-4">
                            <ShieldCheck size={20} className="text-[#680006]" />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1b1c1c]">Đá tự nhiên 100%</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <HelpCircle size={20} className="text-[#680006]" />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1b1c1c]">Bảo hành trọn đời</span>
                        </div>
                    </div>
                </Reveal>
            </main>

            {/* Ritual Section */}
            <section className={styles.ritualSection}>
                <div className="max-w-container-max mx-auto">
                    <div className="text-center mb-16 reveal">
                        <span className="font-body text-[11px] uppercase tracking-[0.4em] text-[#735c00] mb-4 block">Nghi thức thiêng liêng</span>
                        <h2 className="font-headline text-4xl md:text-5xl text-[#680006] italic">Cách thanh tẩy và bảo toàn năng lượng</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="p-12 bg-white border border-[#e0bfbb]/10 shadow-sm reveal">
                            <h4 className="font-headline text-2xl mb-8 text-[#680006]">Thanh Tẩy Vòng</h4>
                            <ul className="space-y-4 font-body text-[#59413e] italic text-sm">
                                <li className="flex gap-4"><div className="w-1.5 h-1.5 bg-[#735c00] shrink-0 rotate-45 mt-2" /> Đặt vòng vào khay hoặc đĩa đá thạch anh.</li>
                                <li className="flex gap-4"><div className="w-1.5 h-1.5 bg-[#735c00] shrink-0 rotate-45 mt-2" /> Phơi ánh sáng nắng sớm 6-7h30.</li>
                                <li className="flex gap-4"><div className="w-1.5 h-1.5 bg-[#735c00] shrink-0 rotate-45 mt-2" /> Thanh tẩy bằng healing sound tần số 528Hz.</li>
                            </ul>
                        </div>
                        <div className="p-12 bg-white border border-[#e0bfbb]/10 shadow-sm reveal">
                            <h4 className="font-headline text-2xl mb-8 text-[#680006]">Khi Đeo Vòng</h4>
                            <ul className="space-y-4 font-body text-[#59413e] italic text-sm">
                                <li className="flex gap-4"><div className="w-1.5 h-1.5 bg-[#735c00] shrink-0 rotate-45 mt-2" /> Không tiếp xúc với các loại hóa chất tẩy rửa.</li>
                                <li className="flex gap-4"><div className="w-1.5 h-1.5 bg-[#735c00] shrink-0 rotate-45 mt-2" /> Hạn chế tiếp xúc với nhiệt độ quá cao.</li>
                                <li className="flex gap-4"><div className="w-1.5 h-1.5 bg-[#735c00] shrink-0 rotate-45 mt-2" /> Tháo vòng khi ngủ để cơ thể nghỉ ngơi tự nhiên.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
