import React, { useEffect } from 'react';
import { ShieldCheck, Droplets, Truck, Diamond, HandMetal, Heart } from 'lucide-react';
import styles from './About.module.css';
import Reveal from '../components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '../components/animations/Stagger';
import Parallax from '../components/animations/Parallax';
import { motion } from 'framer-motion';

// === Local Assets ===
import visionImg from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KFN-2CH7-R20.jpg';
import artisan1 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KCN-2CH7-R20.jpg';
import artisan2 from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KDN-2CH7-R20.jpg';

const About = () => {
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

    return (
        <div className="bg-surface">
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="absolute inset-0">
                    <img
                        src={visionImg}
                        className={styles.heroImage}
                        alt="Artisan hands"
                    />
                    <div className={styles.heroOverlay} />
                    <div className={styles.heroGradient} />
                </div>

                <div className={styles.heroContent}>
                    <Reveal className="max-w-2xl" y={30} delay={0.2}>
                        <span className={styles.heroSubtitle}>Kể từ 2018</span>
                        <h1 className={styles.heroTitle}>Về Cát Bracelet - <br /><i className="font-light">Câu chuyện của sự tĩnh tại</i></h1>
                        <p className={styles.heroDescription}>
                            Nơi những viên đá tự nhiên thô mộc được đánh thức vẻ đẹp bởi đôi bàn tay nghệ nhân tỉ mỉ, tạo nên món trang sức mang năng lượng chữa lành.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className={styles.visionSection}>
                <div className={styles.container}>
                    <div className={styles.grid2Col}>
                        <Reveal className="reveal" x={-30}>
                            <h2 className={styles.sectionTitle}>Triết lý của chúng tôi</h2>
                            <div className="space-y-6">
                                <p className={styles.quote}>
                                    "Cát không chỉ là trang sức, Cát là lời nhắc nhở về sự tĩnh lặng giữa dòng đời hối hả."
                                </p>
                                <p className={styles.bodyText}>
                                    Tại Cát Bracelet, chúng tôi tin rằng mỗi viên đá tự nhiên đều mang trong mình một tần số rung động riêng biệt. Sứ mệnh của chúng tôi là kết nối con người với nguồn năng lượng tinh khiết của đất mẹ thông qua những thiết kế tối giản, tinh tế nhưng đầy chiều sâu.
                                </p>
                                <p className={styles.bodyText}>
                                    Chúng tôi không theo đuổi những xu hướng nhất thời, mà tập trung vào việc tạo ra những sản phẩm có giá trị bền vững, đồng hành cùng chủ nhân trong hành trình tìm về sự bình an nội tại.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal className="reveal" x={30}>
                            <div className="relative">
                                <Parallax offset={20}>
                                    <div className="aspect-[4/5] bg-surface-container-low overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={artisan1}
                                            alt="Stones and Bracelet"
                                        />
                                    </div>
                                </Parallax>
                                <motion.div
                                    className="absolute -bottom-8 -left-8 bg-[#680006] p-8 hidden md:block"
                                    whileInView={{ x: 20, opacity: 1 }}
                                    initial={{ x: 0, opacity: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="text-white font-headline text-2xl">Sự Tĩnh Tại</div>
                                    <div className="text-white/80 font-body text-sm mt-2">Bắt nguồn từ trái tim</div>
                                </motion.div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className={styles.valuesSection}>
                <div className={styles.container}>
                    <div className="text-center mb-16 reveal">
                        <h2 className="font-headline text-4xl mb-4">Giá trị cốt lõi</h2>
                        <div className="w-12 h-0.5 bg-[#680006] mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className={`${styles.valueCard} reveal`}>
                            <Diamond className={styles.valueIcon} />
                            <h3 className="font-headline text-2xl mb-4 text-[#680006]">Đá tự nhiên nguyên bản</h3>
                            <p className="font-body text-[#59413e]">
                                Chúng tôi cam kết 100% đá tự nhiên được tuyển chọn khắt khe, giữ trọn vẹn năng lượng và màu sắc nguyên thủy.
                            </p>
                        </div>
                        <div className={`${styles.valueCardPrimary} reveal`}>
                            <HandMetal className={styles.valueIconLight} />
                            <h3 className="font-headline text-2xl mb-4">Chế tác thủ công</h3>
                            <p className="font-body text-white/90">
                                Từng sợi dây, từng nút thắt đều được các nghệ nhân thực hiện bằng tất cả sự tập trung và tâm tình gửi gắm.
                            </p>
                        </div>
                        <div className={`${styles.valueCard} reveal`}>
                            <Heart className={styles.valueIcon} />
                            <h3 className="font-headline text-2xl mb-4 text-[#680006]">Sự tĩnh lặng tâm hồn</h3>
                            <p className="font-body text-[#59413e]">
                                Sản phẩm là phương tiện để bạn thực hành chánh niệm, tìm thấy sự cân bằng và năng lượng tích cực mỗi ngày.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Artisan Team */}
            <section className={styles.artisanSection}>
                <div className={styles.container}>
                    <div className="flex flex-col md:flex-row gap-20 items-center">
                        <div className="w-full md:w-1/2 reveal">
                            <div className={styles.artisanImageGrid}>
                                <img
                                    className={styles.artisanImg}
                                    src={artisan1}
                                    alt="Designer"
                                />
                                <img
                                    className={styles.artisanImgShift}
                                    src={artisan2}
                                    alt="Crafting"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 reveal">
                            <span className="font-body text-xs text-[#680006] uppercase tracking-widest mb-4 block">Người thổi hồn vào đá</span>
                            <h2 className="font-headline text-4xl mb-6 text-[#680006]">Đội ngũ nghệ nhân</h2>
                            <p className="font-body text-[#59413e] mb-8 italic">
                                "Mỗi khi thắt một nút dây, tôi đều thở một hơi thật nhẹ. Tôi muốn năng lượng bình an ấy đi vào từng sản phẩm, để khi bạn đeo nó lên tay, bạn cũng sẽ cảm thấy nhẹ lòng hơn."
                            </p>
                            <p className="font-body text-[#59413e] mb-10 leading-relaxed">
                                Đội ngũ của Cát là những người yêu đá, yêu cái đẹp mộc mạc. Chúng tôi coi xưởng chế tác là một không gian thiền định, nơi mỗi sản phẩm ra đời là kết quả của sự kiên nhẫn và lòng trân trọng thiên nhiên.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-0.5 bg-[#680006]"></div>
                                <span className="font-headline text-2xl italic text-[#680006]">Cát Founder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitments */}
            <section className={styles.commitmentsSection}>
                <div className={styles.container}>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className={`${styles.commitmentCard} reveal`}>
                            <div className={styles.commitmentIcon}>
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h4 className="font-body text-xs font-bold uppercase tracking-widest mb-3 text-[#680006]">Bảo hành trọn đời</h4>
                            <p className="text-[#59413e] text-sm">Cam kết bảo hành thay dây, làm mới khóa bạc trọn đời sản phẩm.</p>
                        </div>
                        <div className={`${styles.commitmentCard} reveal`}>
                            <div className={styles.commitmentIcon}>
                                <Droplets className="w-8 h-8" />
                            </div>
                            <h4 className="font-body text-xs font-bold uppercase tracking-widest mb-3 text-[#680006]">Thanh tẩy đá miễn phí</h4>
                            <p className="text-[#59413e] text-sm">Sử dụng sóng âm và thảo mộc để thanh tẩy năng lượng đá định kỳ cho khách hàng.</p>
                        </div>
                        <div className={`${styles.commitmentCard} reveal`}>
                            <div className={styles.commitmentIcon}>
                                <Truck className="w-8 h-8" />
                            </div>
                            <h4 className="font-body text-xs font-bold uppercase tracking-widest mb-3 text-[#680006]">Giao hàng tâm tình</h4>
                            <p className="text-[#59413e] text-sm">Sản phẩm được đóng gói thân thiện môi trường cùng một tấm thiệp viết tay ý nghĩa.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
