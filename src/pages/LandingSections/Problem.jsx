import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Target } from 'lucide-react';
import problemImg from '../../assets/Image - Cat/hình ảnh Sp/Hop-SP/HopGam-20.jpg';

const Problem = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left: Lifestyle Image */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 aspect-[4/3] rounded-3xl overflow-hidden luxury-shadow border-[12px] border-[#fdfbf7]">
                            <img
                                src={problemImg}
                                alt="Lifestyle"
                                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-champagne/10 rounded-full blur-2xl -z-10" />
                    </div>

                    {/* Right: Insights */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-serif text-wine leading-[1.3] mb-12 border-l-4 border-wine/20 pl-8">
                            Bạn có đang gặp <span className="italic">những điều này?</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                            {[
                                { icon: <Brain />, title: "Căng thẳng", desc: "Mất ngủ, thiếu tập trung." },
                                { icon: <Heart />, title: "Rối loạn cảm xúc", desc: "Khó cân bằng cuộc sống." },
                                { icon: <Shield />, title: "Cảm thấy thiếu may mắn", desc: "Hay tự ti, ái ngại." },
                                { icon: <Target />, title: "Muốn cải thiện vận khí", desc: "Thu hút điều tích cực." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-4 group">
                                    <div className="w-12 h-12 rounded-full border border-wine/10 flex items-center justify-center text-wine group-hover:bg-wine group-hover:text-white transition-all duration-500">
                                        {React.cloneElement(item.icon, { size: 20, strokeWidth: 1.5 })}
                                    </div>
                                    <h3 className="text-sm font-bold tracking-widest text-wine uppercase">{item.title}</h3>
                                    <p className="text-[11px] text-wine/50 leading-relaxed font-body uppercase tracking-wider">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 bg-[#fdfbf7] rounded-2xl border border-wine/5">
                            <p className="text-[13px] text-wine/70 leading-relaxed font-serif italic text-center">
                                Cát Bracelet được tạo ra để đồng hành cùng bạn,<br />
                                giúp cân bằng năng lượng và thu hút những điều tích cực.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
