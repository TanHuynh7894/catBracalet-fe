import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../../assets/anhtranghome.jpg';

const Hero = () => {
    return (
        <section className="relative min-h-[80vh] md:min-h-[88vh] flex items-center bg-[#fdfbf7] overflow-hidden">
            {/* Hero Image — full bleed stretching to the right edge */}
            <div className="absolute top-0 right-0 w-[70%] h-full pointer-events-none">
                <img
                    src={heroImg}
                    alt="Cát Bracelet"
                    className="w-full h-full object-cover object-center"
                />
                {/* Gradient chỉ fade mép trái, không che ảnh sản phẩm */}
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, #fdfbf7 0%, #fdfbf7 5%, rgba(253,251,247,0.5) 20%, transparent 40%)' }}
                />
            </div>

            {/* Text content — flush to left edge, small left padding only */}
            <div className="relative z-10 w-full pl-8 md:pl-16 pr-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="max-w-xl"
                >
                    <h1
                        className="font-serif text-wine mb-8"
                        style={{
                            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
                            lineHeight: 1.18,
                            fontFamily: "'Noto Serif', serif",
                            letterSpacing: '0em',
                        }}
                    >
                        Năng lượng tinh khiết<br />
                        Phong cách tinh tế
                    </h1>

                    <div className="mb-12 space-y-2">
                        <p
                            className="text-wine/80"
                            style={{ fontFamily: "'Noto Serif', serif", fontSize: '1.1rem' }}
                        >
                            Không chỉ là một chiếc vòng.
                        </p>
                        <p
                            className="text-wine/45 italic"
                            style={{ fontFamily: "'Noto Serif', serif", fontSize: '1.1rem' }}
                        >
                            Đó là năng lượng bạn chọn mang theo mỗi ngày.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href="#collection"
                            className="bg-wine text-white px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-burgundy transition-all group"
                        >
                            KHÁM PHÁ BỘ SƯU TẬP
                            <span className="w-5 h-5 flex items-center justify-center bg-white/15 rounded-full group-hover:bg-white group-hover:text-wine transition-all text-xs">
                                +
                            </span>
                        </a>
                        <a
                            href="#consultation"
                            className="border border-wine/20 text-wine/60 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:border-wine hover:text-wine transition-all group bg-white/40 backdrop-blur-sm"
                        >
                            TÌM VÒNG HỢP MỆNH
                            <span className="w-5 h-5 flex items-center justify-center border border-wine/15 rounded-full group-hover:border-wine transition-all text-xs">
                                ✧
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
