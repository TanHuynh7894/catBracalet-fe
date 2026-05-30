import React from 'react';
import { motion } from 'framer-motion';
import prod1 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14AAN-2CH7-R20.jpg';
import prod2 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EDN-2CH7-R20.jpg';
import prod3 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EEN-2CH7-R20.jpg';

const CustomMix = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="bg-[#fdfbf7] rounded-[3rem] p-10 md:p-20 shadow-xl border border-wine/5 relative flex flex-col lg:flex-row items-center gap-16">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 p-10 opacity-20 hidden lg:block">
                        <div className="w-40 h-40 border border-wine/10 rounded-full" />
                    </div>

                    {/* Left: Content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-serif text-wine uppercase tracking-[0.2em] mb-12 border-b border-wine/10 pb-8">
                            VÒNG MIX RIÊNG CHO BẠN
                        </h2>

                        <div className="space-y-12">
                            {[
                                {
                                    num: "1.",
                                    title: "XÁC ĐỊNH NHU CẦU MONG MUỐN",
                                    desc: "Bạn muốn vòng hỗ trợ thu hút điều gì? Hoặc muốn bổ khuyết yếu tố ngũ hành, luân xa... nào? Chỉ cần gửi ngày/tháng/năm sinh và giới tính, Cát sẽ giúp bạn giải mã năng lượng cá nhân."
                                },
                                {
                                    num: "2.",
                                    title: "CHỌN LOẠI ĐÁ PHÙ HỢP",
                                    desc: "Sau khi được tư vấn, bạn sẽ nhận được gợi ý những loại đá phù hợp. Hãy chọn ra các loại đá bạn yêu thích để mix theo phong cách riêng của bạn nhé!"
                                },
                                {
                                    num: "3.",
                                    title: "ĐẶT ĐƠN",
                                    desc: "Hãy đeo và cảm nhận chiếc vòng độc nhất dành riêng cho chính bản thân bạn."
                                }
                            ].map((step, idx) => (
                                <div key={idx} className="flex gap-6">
                                    <span className="text-2xl font-serif text-wine/40">{step.num}</span>
                                    <div>
                                        <h3 className="text-sm font-bold tracking-widest text-wine mb-3 uppercase">{step.title}</h3>
                                        <p className="text-xs text-wine/60 leading-relaxed font-body max-w-md italic">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Circle Composition */}
                    <div className="lg:w-1/2 relative flex justify-center">
                        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                            {/* Main Circle */}
                            <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full border-4 border-wine/20 overflow-hidden luxury-shadow">
                                <img src={prod1} alt="Mixed 1" className="w-full h-full object-cover" />
                            </div>

                            {/* Middle Circle */}
                            <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[180px] h-[180px] rounded-full border-4 border-wine/20 overflow-hidden luxury-shadow z-10">
                                <img src={prod2} alt="Mixed 2" className="w-full h-full object-cover" />
                            </div>

                            {/* Bottom Circle */}
                            <div className="absolute bottom-0 right-[25%] w-[180px] h-[180px] rounded-full border-4 border-wine/20 overflow-hidden luxury-shadow z-20">
                                <img src={prod3} alt="Mixed 3" className="w-full h-full object-cover" />
                            </div>

                            {/* Arrows (simplified with CSS border or SVG) */}
                            <div className="absolute left-[10%] top-[40%] text-wine/20 text-6xl rotate-[-30deg]">➔</div>
                            <div className="absolute left-[20%] bottom-[20%] text-wine/20 text-6xl rotate-[30deg]">➔</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomMix;
