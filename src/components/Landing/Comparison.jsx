import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Comparison = () => {
    return (
        <section className="py-32 bg-ivory">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif text-wine">Vì sao nên chọn <span className="italic">Cát Bracelet?</span></h2>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 border border-wine/5 rounded-[3rem] overflow-hidden luxury-shadow bg-white">
                    {/* VS Mobile Indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-ivory rounded-full border border-wine/10 flex items-center justify-center text-xs font-serif italic z-20 text-wine shadow-sm">
                        VS
                    </div>

                    {/* Cát Bracelet - LEFT */}
                    <div className="bg-wine p-10 md:p-16 text-white relative">
                        <h3 className="text-2xl font-serif tracking-widest text-center mb-12 uppercase">CÁT BRACELET</h3>
                        <div className="space-y-6">
                            {[
                                "Đá tự nhiên 100% – nguồn gốc rõ ràng",
                                "Tư vấn cá nhân hóa theo mệnh & mục tiêu",
                                "Năng lượng được thanh tẩy & nạp mới",
                                "Thiết kế tinh xảo – Đeo đẹp mỗi ngày",
                                "Chế độ bảo hành & chăm sóc trọn đời"
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={14} className="text-white" />
                                    </div>
                                    <p className="text-xs md:text-sm font-body tracking-wider">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* VÒNG PHỔ THÔNG - RIGHT */}
                    <div className="bg-ivory/50 p-10 md:p-16 text-wine/40 relative">
                        <h3 className="text-2xl font-serif tracking-widest text-center mb-12 uppercase">VÒNG PHỔ THÔNG</h3>
                        <div className="space-y-6">
                            {[
                                "Đá kém chất lượng, không rõ nguồn gốc",
                                "Thiếu tư vấn – Không phù hợp năng lượng",
                                "Không được thanh tẩy năng lượng",
                                "Thiết kế đại trà – Dễ trùng lặp",
                                "Không có bảo hành – Hỗ trợ sau mua"
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-6 h-6 rounded-full border border-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <X size={14} className="text-red-300" />
                                    </div>
                                    <p className="text-xs md:text-sm font-body tracking-wider">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
