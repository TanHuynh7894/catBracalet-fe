import React from 'react';
import { motion } from 'framer-motion';
import braceletImg from '../../assets/Image - Cat/logo Cat/logoCat-avat-new-1.jpg';

const Slogan = () => {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="relative h-[300px] md:h-[400px] bg-wine rounded-3xl overflow-hidden flex items-center">
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-center justify-between px-10 md:px-20 gap-10">
                        {/* Left: Product Overlay */}
                        <div className="hidden lg:block w-1/3">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-white/20 rotate-[-5deg] luxury-shadow"
                            >
                                <img src={braceletImg} alt="Cát" className="w-full h-full object-cover" />
                            </motion.div>
                        </div>

                        {/* Center/Right: Text */}
                        <div className="flex-1 text-center md:text-right">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white italic mb-6">
                                    be you, be energy <span className="not-italic text-champagne">✧</span>
                                </h2>
                                <div className="flex items-center justify-center md:justify-end gap-6">
                                    <div className="hidden md:block w-12 h-px bg-white/20" />
                                    <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/80 uppercase font-bold">
                                        SỐNG ĐÚNG VỚI BẢN THÂN + LAN TỎA NĂNG LƯỢNG TÍCH CỰC
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slogan;
