import React from 'react';
import { motion } from 'framer-motion';
import step1 from '../../assets/Image - Cat/ảnh Thô/IMG_4945.jpg'; // Incense-like
import step2 from '../../assets/Image - Cat/hình ảnh Sp/DA THO/D2-1KDT-R10.jpg'; // Crystals
import step3 from '../../assets/Image - Cat/ảnh Thô/IMG_5018.jpg'; // Zen-like
import step4 from '../../assets/Image - Cat/hình ảnh Sp/SP-TIKTOK-mix-250917.jpg'; // Bracelet on hand

const steps = [
    {
        num: "01",
        title: "THANH TẨY",
        desc: "Làm sạch năng lượng xấu, loại bỏ tạp khí.",
        img: step1
    },
    {
        num: "02",
        title: "KÍCH HOẠT",
        desc: "Hợp dàng năng lượng tích cực phù hợp với bạn.",
        img: step2
    },
    {
        num: "03",
        title: "CÂN BẰNG",
        desc: "Hỗ trợ điều tiết cảm giác, tinh thần & cơ thể.",
        img: step3
    },
    {
        num: "04",
        title: "ĐỒNG HÀNH",
        desc: "Thu hút may mắn, bảo vệ và nâng cao năng lượng.",
        img: step4
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-32 bg-[#fdfbf7]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-serif text-wine italic mb-4">
                        Vòng Cát hoạt động như thế nào?
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 relative">
                    {/* Background line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-wine/10 -z-0" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center flex-1 relative z-10"
                        >
                            <div className="mb-8 relative group">
                                <div className="w-[120px] h-[120px] rounded-full bg-white luxury-shadow overflow-hidden border-4 border-white transition-transform duration-500 group-hover:scale-110">
                                    <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                                </div>
                                <span className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-wine text-white text-[11px] font-bold flex items-center justify-center border-4 border-[#fdfbf7] shadow-lg">
                                    {step.num}
                                </span>
                            </div>
                            <h3 className="text-[13px] font-bold tracking-[0.2em] text-wine mb-4 uppercase">{step.title}</h3>
                            <p className="text-wine/60 text-[11px] leading-relaxed uppercase tracking-wider font-body max-w-[200px]">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
