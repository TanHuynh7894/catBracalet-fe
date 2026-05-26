import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import styles from './Story.module.css';

// === Local Assets ===
import heroStory from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KIN-2CH7-R20.jpg';
import philImg from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KFN-2CH7-R20.jpg';
import packaging from '../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KDN-2CH7-R20.jpg';
import rawStone1 from '../assets/Image - Cat/hình ảnh Sp/DA THO/D2-1FGT-R2.jpg';
import rawStone2 from '../assets/Image - Cat/hình ảnh Sp/DA THO/D2-1KDT-R10.jpg';

const Story = () => {
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
            <header className={styles.hero}>
                <div className="absolute inset-0">
                    <img
                        alt="Cát Bracelet Hero"
                        className={styles.heroImage}
                        src={heroStory}
                    />
                </div>
                <div className={styles.heroContent}>
                    <h1 className={`${styles.heroTitle} reveal`}>Chế tác Ý niệm</h1>
                    <p className={`${styles.heroSubtitle} reveal`}>
                        Trang sức thủ công ra đời từ tiếng thì thầm tĩnh lặng của đá tự nhiên và nhịp điệu đều đặn của sự chế tác đầy ý niệm.
                    </p>
                </div>
            </header>

            <main className={styles.main}>
                {/* Philosophy Section */}
                <section className={styles.philosophySection}>
                    <div className="md:col-span-7 flex flex-col justify-center pr-8 reveal">
                        <span className={styles.tag}>Triết lý</span>
                        <h2 className={styles.sectionTitle}>Sự sang trọng tĩnh lặng trong từng sợi chỉ</h2>
                        <p className="font-body text-base text-[#59413e] mb-8 leading-relaxed">
                            Tại Cát Bracelet, chúng tôi tin rằng trang sức nên mang ý nghĩa hơn cả một món phụ kiện. Mỗi món đồ là một điểm tựa xúc giác — một biểu hiện vật lý của sự bình yên và chánh niệm. Chúng tôi tuyển chọn các khoáng vật tự nhiên vì năng lượng độc bản của chúng, trân trọng từng viên đá với sự tôn kính xứng đáng.
                        </p>
                        <div className={styles.bulletList}>
                            <div className={styles.bulletItem}>
                                <div className={styles.bulletIcon} />
                                <span>Tinh thể tự nhiên được tuyển chọn thủ công</span>
                            </div>
                            <div className={styles.bulletItem}>
                                <div className={styles.bulletIcon} />
                                <span>Nguyên liệu có nguồn gốc đạo đức</span>
                            </div>
                            <div className={styles.bulletItem}>
                                <div className={styles.bulletIcon} />
                                <span>Kỹ thuật thắt nút thủ công tinh xảo</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-5 relative group overflow-hidden rounded-sm reveal">
                        <div className="aspect-[4/5] bg-surface-container-low">
                            <img
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src={philImg}
                                alt="Artisan detail"
                            />
                        </div>
                    </div>
                </section>

                {/* Packaging Section */}
                <section className={styles.packagingSection}>
                    <div className="text-center mb-16 reveal">
                        <span className={styles.tag}>Trải nghiệm Mở hộp</span>
                        <h2 className={styles.sectionTitle}>Món quà cho chính mình</h2>
                    </div>
                    <div className={styles.packagingGrid}>
                        <div className="relative reveal">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                            <img
                                alt="Packaging"
                                className="w-full rounded-sm shadow-xl relative z-10"
                                src={packaging}
                            />
                        </div>
                        <div className="space-y-8 reveal">
                            <div className={styles.packagingBox}>
                                <h3 className="font-headline text-2xl text-[#680006] mb-4 italic">Bên Trong Một Đơn Hàng</h3>
                                <p className="font-body text-base text-[#59413e] leading-relaxed">
                                    Mỗi chiếc vòng Cát Bracelet được đặt trong một hệ sinh thái được thiết kế chu đáo nhằm lưu giữ năng lượng và vẻ đẹp. Từ chiếc hộp bền vững đặc trưng đến những viên đá được tuyển chọn đi kèm để bảo quản.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex gap-4">
                                    <CheckCircle2 className={styles.checkIcon} />
                                    <div>
                                        <p className="font-body font-semibold">Sản phẩm bạn đã chọn</p>
                                        <p className="text-xs text-[#59413e]">Tâm điểm trong hành trình của bạn.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle2 className={styles.checkIcon} />
                                    <div>
                                        <p className="font-body font-semibold">Giấy hướng dẫn thanh tẩy</p>
                                        <p className="text-xs text-[#59413e]">Hướng dẫn thiết lập lại năng lượng cho đá.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle2 className={styles.checkIcon} />
                                    <div>
                                        <p className="font-body font-semibold">Túi đá quà tặng</p>
                                        <p className="text-xs text-[#59413e]">Đá thô tự nhiên giúp khuếch đại ý niệm.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ritual Section */}
                <section className={styles.ritualSection}>
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Sparkles size={120} className="text-[#680006]" />
                    </div>
                    <div className="max-w-3xl mx-auto text-center reveal">
                        <span className={styles.tag}>Nghi thức thiêng liêng</span>
                        <h2 className="font-headline text-4xl text-[#680006] mb-10 italic">Cách thanh tẩy và bảo toàn năng lượng</h2>
                        <div className={styles.ritualGrid}>
                            <div className={styles.ritualCard}>
                                <h4 className="font-body text-xs font-bold text-[#680006] uppercase mb-4 tracking-widest border-b border-[#680006]/20 pb-2">Thanh Tẩy Vòng</h4>
                                <ul className="space-y-4 font-body text-sm text-[#59413e] italic">
                                    <li>Đặt vòng vào khay hoặc đĩa đá thạch anh.</li>
                                    <li>Phơi ánh sáng nắng sớm 6-7h30.</li>
                                    <li>Thanh tẩy bằng healing sound tần số 528Hz.</li>
                                </ul>
                            </div>
                            <div className={styles.ritualCard}>
                                <h4 className="font-body text-xs font-bold text-[#680006] uppercase mb-4 tracking-widest border-b border-[#680006]/20 pb-2">Khi Đeo Vòng</h4>
                                <ul className="space-y-4 font-body text-sm text-[#59413e] italic">
                                    <li>Không tiếp xúc với các loại hóa chất tẩy rửa.</li>
                                    <li>Hạn chế tiếp xúc với nhiệt độ quá cao.</li>
                                    <li>Tháo vòng khi ngủ để cơ thể nghỉ ngơi tự nhiên.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-16">
                            <button className="bg-[#680006] text-white px-10 py-4 font-body text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg">
                                Khám phá bộ sưu tập
                            </button>
                        </div>
                    </div>
                </section>

                {/* Moodboard */}
                <section className={`${styles.moodboard} reveal`}>
                    <div className={`${styles.moodItemBig} group`}>
                        <img
                            className={`${styles.moodImage} group-hover:scale-105`}
                            src={heroStory}
                            alt="Zen mood"
                        />
                    </div>
                    <div className={`${styles.moodItemSmall} group`}>
                        <img
                            className={`${styles.moodImage} group-hover:scale-105`}
                            src={rawStone1}
                            alt="Crystals"
                        />
                    </div>
                    <div className={`${styles.moodItemSmall} group`}>
                        <img
                            className={`${styles.moodImage} group-hover:scale-105`}
                            src={rawStone2}
                            alt="Incense"
                        />
                    </div>
                    <div className={`${styles.moodItemWide} group`}>
                        <img
                            className={`${styles.moodImage} group-hover:scale-105`}
                            src={philImg}
                            alt="Workshop"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Story;
