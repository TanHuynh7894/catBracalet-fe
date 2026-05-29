import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Users, History, ShieldCheck } from 'lucide-react';
import braceletImg from '../../assets/Image - Cat/hình ảnh Sp/SP-TIKTOK-mix-250917.jpg';

const BrandStory = () => {
    return (
        <section id="story" className="py-32 bg-cream/10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-wine mb-12">Câu chuyện <span className="italic">thương hiệu</span></h2>

                        <div className="space-y-8 text-sm md:text-[15px] font-body text-wine/70 leading-relaxed max-w-xl">
                            <p>
                                Cát Bracelet khởi nguồn từ niềm tin rằng mỗi người đều xứng đáng sống một cuộc đời cân bằng, hạnh phúc và tràn đầy năng lượng tích cực.
                            </p>
                            <p>
                                Chúng tôi chọn lọc những viên đá quý tự nhiên chất nhất, kết hợp tri thức phong thủy phương Đông và thiết kế hiện đại để mang đến những chiếc vòng không chỉ đẹp – mà còn thật sự đồng hành cùng bạn trên hành trình sống ý nghĩa.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Gem size={28} />, val: "100%", label: "ĐÁ TỰ NHIÊN CHỌN LỌC" },
                            { icon: <Users size={28} />, val: "5.000+", label: "KHÁCH HÀNG TIN TƯỞNG" },
                            { icon: <History size={28} />, val: "3 NĂM+", label: "ĐỒNG HÀNH CÙNG BẠN" },
                            { icon: <ShieldCheck size={28} />, val: "1 ĐỔI 1", label: "BẢO HÀNH TRỌN ĐỜI" }
                        ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="text-champagne mb-4">{stat.icon}</div>
                                <h4 className="text-2xl font-serif text-wine mb-2">{stat.val}</h4>
                                <p className="text-[9px] font-bold tracking-[0.1em] text-wine/40 uppercase leading-snug">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sẵn sàng thu hút năng lượng banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-wine rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden"
                >
                    {/* Decorative Pattern Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
                    </div>

                    <div className="relative z-10 flex items-center gap-8">
                        <div className="hidden md:block w-24 h-24 rounded-full border border-white/20 p-2">
                            <div className="w-full h-full rounded-full border border-white/40 flex items-center justify-center text-white italic font-serif">✧</div>
                        </div>
                        <div>
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Sẵn sàng thu hút năng lượng tích cực?</h3>
                            <p className="text-white/60 text-sm tracking-wider uppercase font-body">Chọn chiếc vòng phù hợp để bắt đầu hành trình mới của bạn.</p>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-10">
                        <button className="bg-ivory text-wine px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3">
                            BẮT ĐẦU NGAY <span className="text-lg">{"→"}</span>
                        </button>
                        <div className="hidden lg:block w-32 h-20 rounded-2xl overflow-hidden border border-white/20">
                            <img src={braceletImg} alt="CTA" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BrandStory;
