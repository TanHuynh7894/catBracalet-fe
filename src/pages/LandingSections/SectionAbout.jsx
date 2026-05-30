import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, Scale, Link2 } from 'lucide-react';
import aboutImg from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14AAN-2CH7-R20.jpg';

const About = () => {
    return (
        <section id="about" className="py-32 bg-ivory overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Content Section */}
                    <div className="lg:w-1/2">
                        <h2 className="text-5xl md:text-6xl font-serif text-wine mb-12">Cát là gì?</h2>

                        <div className="space-y-6 text-sm md:text-base text-wine/70 font-body leading-relaxed max-w-xl">
                            <p>
                                Cát Bracelet là thương hiệu trang sức phong thủy hiện đại, được chế tác từ đá tự nhiên cao cấp – mang năng lượng thuần khiết của đất mẹ.
                            </p>
                            <p>
                                Mỗi chiếc vòng là sự kết hợp giữa triết mỹ tinh tế và phong thủy ứng dụng, giúp bạn cân bằng năng lượng, kết nối nội tâm và thu hút may mắn.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-4 gap-4">
                            {[
                                { icon: <Leaf size={16} />, title: "TỰ NHIÊN" },
                                { icon: <Sparkles size={16} />, title: "TINH KHIẾT" },
                                { icon: <Scale size={16} />, title: "CÂN BẰNG" },
                                { icon: <Link2 size={16} />, title: "KẾT NỐI" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
                                        {item.icon}
                                    </div>
                                    <span className="text-[9px] font-bold tracking-[0.2em] text-wine/60 uppercase">{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <button className="mt-16 bg-cream border border-wine/10 px-8 py-4 rounded-xl text-[11px] font-bold tracking-widest text-wine flex items-center gap-4 hover:bg-white transition-all shadow-sm">
                            KHÁM PHÁ THÊM <span className="text-xl leading-none">+</span>
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="aspect-[1.5/1] bg-white p-4 rounded-3xl luxury-shadow rotate-1"
                        >
                            <img
                                src={aboutImg}
                                alt="Cát brand meaning"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
