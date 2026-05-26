import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Fingerprint, CheckCircle, Flower2 } from 'lucide-react';
import styles from './Home.module.css';

// === Local Assets ===
import heroImg from '../assets/Image - Cat/hình ảnh Sp/SP-TIKTOK-mix-250917.jpg';
import heroImg1 from '../assets/Image - Cat/hình ảnh Sp/charm Evil eye LỖI/charm evil eye LỖi (4).jpg';
import prod1 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14AAN-2CH7-R20.jpg';
import prod2 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EDN-2CH7-R20.jpg';
import prod3 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EEN-2CH7-R20.jpg';

const Home = () => {
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
    }, []);

    return (
        <div className="bg-surface overflow-hidden">
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContentGrid}>
                    <div className="reveal">
                        <span className={styles.heroSubtitle}>Chế tác thủ công từ 2018</span>
                        <h1 className={styles.heroTitle}>Trang sức <br />Mang Ý Niệm <br />& Tĩnh Tại</h1>
                        <p className={styles.heroDescription}>
                            Mỗi viên đá là một câu chuyện của đất mẹ, được thắt nút bởi tâm tình của người nghệ nhân Cát Bracelet.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/collections" className={styles.primaryBtn}>Khám phá ngay</Link>
                            <Link to="/story" className={styles.secondaryBtn}>Câu chuyện</Link>
                        </div>
                    </div>
                    <div className={styles.heroImageWrapper}>
                        <div className="absolute w-[110%] h-[110%] bg-white/5 rounded-full blur-3xl" />
                        <img alt="Vòng tay Cát" className={`${styles.heroMainImage} reveal`} src={heroImg1} />
                    </div>
                </div>
            </section>

            {/* Bento Values */}
            <section className={styles.section}>
                <div className="text-center mb-16 reveal">
                    <h2 className={styles.sectionTitle}>Chế tác bởi tâm tình</h2>
                    <p className={styles.sectionDesc}>Mỗi sản phẩm là một hành trình tìm về sự bình yên nội tại.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 group relative overflow-hidden bg-[#680006] p-12 text-white reveal">
                        <Sparkles className="w-12 h-12 mb-6 opacity-20" />
                        <h3 className="font-headline text-4xl mb-4">Đá Tự Nhiên 100%</h3>
                        <p className="font-body text-white/70 max-w-md">Tuyển chọn nghiêm ngặt những khoáng vật mang năng lượng tích cực nhất dành cho bạn.</p>
                        <img src={prod1} className="absolute -bottom-10 -right-10 w-64 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-700" alt="Deco" />
                    </div>
                    <div className="md:col-span-4 bg-surface-container-low p-12 reveal">
                        <Fingerprint className="w-10 h-10 mb-6 text-[#680006]" />
                        <h3 className="font-headline text-2xl mb-4 uppercase">Độc Bản</h3>
                        <p className="font-body text-[#59413e] text-sm">Không có hai viên đá nào giống hệt nhau, giống như tâm hồn của mỗi chúng ta.</p>
                    </div>
                    <div className="md:col-span-4 bg-[#680006]/5 border border-[#680006]/20 p-12 reveal">
                        <CheckCircle className="w-10 h-10 mb-6 text-[#680006]" />
                        <h3 className="font-headline text-2xl mb-4 uppercase">Bảo Hành</h3>
                        <p className="font-body text-[#59413e] text-sm">Thay dây và làm mới khóa bạc trọn đời cho mọi khách hàng của Cát.</p>
                    </div>
                    <div className="md:col-span-8 bg-surface-container-lowest p-12 reveal border border-outline-variant/30 flex items-center justify-between overflow-hidden">
                        <div>
                            <Flower2 className="w-12 h-12 mb-6 text-[#735c00]" />
                            <h3 className="font-headline text-4xl mb-4 text-[#680006]">Tĩnh Tại</h3>
                            <p className="font-body text-[#59413e] max-w-sm">Trang sức là một lời nhắc nhở về sự tĩnh lặng giữa cuộc sống bận rộn.</p>
                        </div>
                        <img src={prod2} className="w-48 object-contain drop-shadow-xl" alt="Zen" />
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 bg-surface-container-low/30">
                <div className="max-w-[1200px] mx-auto px-5 md:px-20">
                    <div className="flex justify-between items-end mb-16">
                        <div className="reveal">
                            <h2 className="font-headline text-4xl md:text-6xl text-[#680006]">Bộ sưu tập mới</h2>
                        </div>
                        <Link to="/collections" className="font-body text-xs uppercase tracking-widest border-b border-[#680006]/40 pb-1 hover:text-[#680006] transition-colors">Xem tất cả</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[prod1, prod2, prod3].map((img, idx) => (
                            <Link to={`/product/${idx + 1}`} key={idx} className={`${styles.bentoItem} group reveal block`}>
                                <div className="overflow-hidden bg-[#f5f3f3]">
                                    <img src={img} className={styles.bentoImage} alt="Product" />
                                </div>
                                <div className={styles.badge}>Mới nhất</div>
                                <div className="p-6">
                                    <h4 className="font-headline text-xl mb-2 text-[#1b1c1c] group-hover:text-[#680006] transition-colors">Vòng tay Ý Niệm {idx + 1}</h4>
                                    <p className="font-body text-[#680006] font-bold">850.000đ</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
