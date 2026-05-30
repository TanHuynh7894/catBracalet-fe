import React from 'react';
import { motion } from 'framer-motion';
import { Gem, UserRound, Wind, Sparkles } from 'lucide-react';

const benefits = [
    {
        icon: <Gem className="w-8 h-8" />,
        title: "ĐÁ TỰ NHIÊN CHỌN LỌC",
        desc: "100% đá tự nhiên cao cấp, nguồn gốc rõ ràng."
    },
    {
        icon: <UserRound className="w-8 h-8" />,
        title: "THIẾT KẾ CÁ NHÂN HÓA",
        desc: "Tư vấn phù hợp mệnh & mục tiêu của bạn."
    },
    {
        icon: <Wind className="w-8 h-8" />,
        title: "TẨY TỊNH & THANH TẨY",
        desc: "Làm sạch & nạp năng lượng trước khi đến tay bạn."
    },
    {
        icon: <Sparkles className="w-8 h-8" />,
        title: "NĂNG LƯỢNG TÍCH CỰC & PHONG THỦY",
        desc: "Hỗ trợ vận mệnh – thu hút – hân hoan – may mắn."
    }
];

const Benefits = () => {
    return (
        <section className="py-20 bg-ivory border-y border-wine/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                    {benefits.map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-10 flex flex-col items-center text-center group ${idx !== benefits.length - 1 ? 'lg:border-r lg:border-wine/10' : ''
                                } ${idx % 2 === 0 ? 'md:border-r lg:border-r' : ''} border-b md:border-b-0 border-wine/5`}
                        >
                            <div className="mb-6 text-champagne">
                                {item.icon}
                            </div>
                            <h3 className="text-sm font-bold tracking-widest text-wine mb-3 leading-tight uppercase font-body">{item.title}</h3>
                            <p className="text-wine/60 text-[11px] leading-relaxed max-w-[200px] font-body uppercase tracking-wider">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
