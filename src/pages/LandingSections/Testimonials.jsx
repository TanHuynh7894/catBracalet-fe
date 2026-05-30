import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Ngân Linh",
        role: "Hà Nội",
        text: "Mình đeo vòng Cát An Nhiên và cảm thấy bình tĩnh, ngủ ngon hơn rất nhiều. Thiết kế đẹp, tinh tế và năng lượng rất tốt.",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
        name: "Thư Trang",
        role: "TP. Hồ Chí Minh",
        text: "Tư vấn rất nhiệt tình, chọn đúng vòng hợp mệnh nên công việc thuận lợi hơn hẳn. Cảm ơn Cát Bracelet nhiều!",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    },
    {
        name: "Minh Khoa",
        role: "Đà Nẵng",
        text: "Vòng đẹp, đá tự nhiên thật sự khác biệt. Mình cảm thấy tự tin và tích cực hơn mỗi ngày.",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
];

const Testimonials = () => {
    return (
        <section className="py-32 bg-ivory">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif text-wine">Khách hàng nói về <span className="italic uppercase">Cát</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-2xl luxury-shadow border border-wine/5 relative group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-champagne/10" />
                                <div>
                                    <h4 className="text-sm font-bold text-wine">{item.name}</h4>
                                    <p className="text-[10px] uppercase tracking-widest text-wine/40">{item.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill="#d4af37" color="#d4af37" />
                                ))}
                            </div>

                            <p className="text-xs md:text-sm italic font-serif leading-relaxed text-wine/80">
                                "{item.text}"
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Dots indicator */}
                <div className="mt-16 flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-2 h-2 rounded-full border border-wine/20 ${i === 1 ? 'bg-wine' : ''}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
