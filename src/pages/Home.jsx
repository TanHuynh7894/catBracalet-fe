import React, { useEffect } from 'react';
import { Sparkles, Fingerprint, CheckCircle, Flower2 } from 'lucide-react';

// === Local Assets ===
import heroImg from '../assets/Image - Cat/hình ảnh Sp/SP-TIKTOK-mix-250917.jpg';
import product1 from '../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W1-4EEN-4KFN-2CH4-2CH7-R20.jpg';
import product2 from '../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/D2-W5-4LPN-4KFN-2CH4-2CH7-R20.jpg';
import craftImg from '../assets/Image - Cat/ảnh Thô/IMG_4945.jpg';
import boxImg from '../assets/Image - Cat/hình ảnh Sp/Hop-SP/HopGam-10.jpg';
import allProducts from '../assets/Image - Cat/hình ảnh Sp/Vòng tay evil eye/all0.jpg';

const Home = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.fade-in-up, .reveal');

        // Step 1: mark them as animated (hidden)
        elements.forEach(el => el.classList.add('will-animate'));

        // Step 2: observe and reveal on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -30px 0px"
        });

        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="texture-grain">
            {/* ─── Hero Section ─── */}
            <section className="relative min-h-[90vh] flex items-center bg-primary-container overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />
                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-28 pb-16">
                    {/* Text */}
                    <div className="fade-in-up text-white">
                        <span className="font-body text-[11px] uppercase tracking-[0.4em] text-secondary-fixed mb-6 block">
                            Khai Mở Trí Tuệ
                        </span>
                        <h1 className="font-headline text-5xl md:text-7xl leading-tight mb-8 italic">
                            Ánh Sáng Từ<br />Đôi Tay Nghệ Nhân
                        </h1>
                        <p className="font-body text-lg text-white/80 mb-12 max-w-md leading-relaxed">
                            Mỗi chiếc vòng là một hành trình của sự tỉnh thức. Được chế tác thủ công với ý niệm cao đẹp, Cát Bracelet là vật phẩm kết nối tâm hồn.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-white text-primary-container px-10 py-4 font-body text-[11px] font-bold uppercase tracking-widest hover:bg-secondary-fixed transition-all duration-500 shadow-xl">
                                Mua Ngay
                            </button>
                            <button className="border border-white/40 text-white px-10 py-4 font-body text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                                Xem Lookbook
                            </button>
                        </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative flex justify-center items-center">
                        <div className="absolute w-[110%] h-[110%] bg-white/5 rounded-full blur-3xl" />
                        <img
                            alt="Vòng tay Cát Bracelet"
                            className="relative z-10 w-full max-w-lg h-auto object-contain reveal drop-shadow-2xl rounded-sm"
                            src={heroImg}
                        />
                    </div>
                </div>
            </section>

            {/* ─── Featured Collections ─── */}
            <section className="py-24 bg-surface">
                <div className="max-w-[1200px] mx-auto px-5 md:px-20">
                    {/* Heading */}
                    <div className="text-center mb-16 fade-in-up">
                        <h2 className="font-headline text-4xl md:text-6xl text-primary mb-4">Tinh Hoa Chế Tác</h2>
                        <p className="font-body text-lg text-on-surface-variant italic max-w-2xl mx-auto">
                            Sự cân bằng hoàn hảo giữa đá tự nhiên và tâm ý người thợ.
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Product 1 */}
                        <div className="group fade-in-up">
                            <div className="relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 mb-6">
                                <img
                                    alt="Vòng Tay Evil Eye"
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                                    src={product1}
                                />
                                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 text-[10px] uppercase tracking-widest">
                                    Mới
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-headline text-2xl text-primary mb-1">Sợi Chỉ Hạnh Phúc</h3>
                                    <p className="font-body text-sm text-on-surface-variant italic">Ngọc Bích & Thạch Anh trắng</p>
                                </div>
                                <div className="text-right">
                                    <span className="font-headline text-2xl text-primary font-medium block">850.000đ</span>
                                    <button className="mt-2 font-body text-[10px] uppercase tracking-widest text-secondary border-b border-secondary/30 hover:border-secondary transition-all">
                                        Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div className="group fade-in-up" style={{ transitionDelay: '150ms' }}>
                            <div className="relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 mb-6">
                                <img
                                    alt="Dòng Chảy Trí Tuệ"
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                                    src={product2}
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-headline text-2xl text-primary mb-1">Dòng Chảy Trí Tuệ</h3>
                                    <p className="font-body text-sm text-on-surface-variant italic">Aquamarine & Pha lê</p>
                                </div>
                                <div className="text-right">
                                    <span className="font-headline text-2xl text-primary font-medium block">920.000đ</span>
                                    <button className="mt-2 font-body text-[10px] uppercase tracking-widest text-secondary border-b border-secondary/30 hover:border-secondary transition-all">
                                        Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* All Products Banner */}
                    <div className="mt-16 fade-in-up">
                        <div className="relative overflow-hidden group cursor-pointer">
                            <img
                                alt="Toàn bộ bộ sưu tập"
                                className="w-full max-h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                                src={allProducts}
                            />
                            <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                                <a className="font-body text-sm uppercase tracking-widest text-white border-b-2 border-white/60 pb-2 hover:border-white transition-all duration-300">
                                    Khám Phá Toàn Bộ Bộ Sưu Tập
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Brand Philosophy ─── */}
            <section className="py-24 bg-surface-container-low overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-5 md:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Artisan Image */}
                        <div className="relative reveal">
                            <img
                                alt="Nghệ nhân đang chế tác"
                                className="w-full aspect-[4/5] object-cover shadow-2xl rounded-sm"
                                src={craftImg}
                            />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 -z-10" />
                        </div>

                        {/* Text + Cards */}
                        <div className="space-y-10 fade-in-up" style={{ transitionDelay: '200ms' }}>
                            <div>
                                <span className="font-body text-[11px] uppercase tracking-[0.3em] text-secondary mb-4 block">Câu Chuyện Thương Hiệu</span>
                                <h2 className="font-headline text-4xl text-primary mb-6">Chế Tác Bằng<br />Cả Trái Tim</h2>
                                <p className="font-body text-base text-on-surface-variant leading-relaxed">
                                    Tại Cát, chúng tôi không chỉ tạo ra trang sức. Chúng tôi tạo ra những vật phẩm mang theo lời chúc bình an và năng lượng tích cực cho người sở hữu thông qua từng nút thắt tay tỉ mỉ.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-white p-7 border-l-4 border-primary shadow-sm">
                                    <Sparkles className="text-primary mb-4" size={28} strokeWidth={1.5} />
                                    <h4 className="font-body font-bold uppercase tracking-widest text-primary mb-2 text-xs">Đá Thuần Khiết</h4>
                                    <p className="font-body text-sm text-on-surface-variant">Tuyển chọn từ tự nhiên, giữ trọn năng lượng nguyên bản.</p>
                                </div>
                                <div className="bg-white p-7 border-l-4 border-primary shadow-sm">
                                    <Fingerprint className="text-primary mb-4" size={28} strokeWidth={1.5} />
                                    <h4 className="font-body font-bold uppercase tracking-widest text-primary mb-2 text-xs">Độc Bản</h4>
                                    <p className="font-body text-sm text-on-surface-variant">Mỗi sản phẩm là một duyên nợ, không có cái thứ hai.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Unboxing Ritual ─── */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-5 md:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text */}
                        <div className="order-2 lg:order-1 fade-in-up">
                            <span className="font-body text-[11px] uppercase tracking-[0.3em] text-secondary mb-4 block">Trải Nghiệm Độc Quyền</span>
                            <h2 className="font-headline text-4xl text-primary mb-8">Nghi Thức Mở Hộp</h2>
                            <p className="font-body text-base text-on-surface-variant mb-8 leading-relaxed">
                                Hơn cả một món quà, đó là khởi đầu của một hành trình tỉnh thức. Mỗi đơn hàng đi kèm với bộ hướng dẫn thanh tẩy đá, túi quà tặng sang trọng và thông điệp ý nghĩa từ nghệ nhân.
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[
                                    'Túi vải cao cấp & thiệp cảm ơn',
                                    'Bộ hướng dẫn thanh tẩy năng lượng',
                                    'Hộp đựng thủ công bảo vệ môi trường',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm text-on-surface font-body">
                                        <CheckCircle className="text-primary shrink-0" size={18} strokeWidth={1.5} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-primary-container text-white px-10 py-4 font-body text-[11px] uppercase tracking-widest hover:opacity-90 transition-all">
                                Khám phá chi tiết
                            </button>
                        </div>

                        {/* Box Image */}
                        <div className="order-1 lg:order-2 fade-in-up" style={{ transitionDelay: '200ms' }}>
                            <div className="relative p-4 border border-primary/10 bg-surface-container-low shadow-xl">
                                <img
                                    alt="Trải nghiệm mở hộp Cát Bracelet"
                                    className="w-full h-auto"
                                    src={boxImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Philosophy Quote ─── */}
            <section className="py-20 bg-primary-container text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/silk.png')]" />
                <div className="max-w-3xl mx-auto px-5 text-center relative z-10 fade-in-up">
                    <Flower2 className="text-secondary-fixed mb-6 mx-auto" size={48} strokeWidth={1} />
                    <h3 className="font-headline text-3xl italic mb-6">Triết Lý Về Sợi Chỉ Đỏ</h3>
                    <p className="font-body text-lg text-white/90 leading-relaxed italic">
                        "Sợi chỉ đỏ tượng trưng cho sợi dây vô hình kết nối chúng ta với định mệnh. Nó mạnh mẽ nhưng linh hoạt, bền bỉ nhưng mềm mại — như chính tinh thần con người vượt qua những dòng chảy của cuộc đời."
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
