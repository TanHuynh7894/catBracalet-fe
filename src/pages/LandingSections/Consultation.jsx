import React from 'react';
import { motion } from 'framer-motion';
import braceletImg from '../../assets/Image - Cat/hình ảnh Sp/SP-TIKTOK-mix-250917.jpg';

const Consultation = () => {
    return (
        <section id="consultation" className="py-32 bg-ivory">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                    {/* Left: Product Image in Box */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-cream/30 p-4 rounded-[3rem] border border-wine/5 flex items-center justify-center h-full min-h-[500px]"
                    >
                        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden luxury-shadow bg-white p-3 rotate-1">
                            <img
                                src={braceletImg}
                                alt="Consultation"
                                className="w-full h-full object-cover rounded-[2rem]"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Consultation Form */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif text-wine mb-4">Tư vấn miễn phí – Chọn vòng hợp mệnh</h2>
                            <p className="text-sm text-wine/50 font-body tracking-wider">Khám thông tin tốt đẹp, chuyên gia Cát Bracelet hỗ trợ bạn chi tiết!</p>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-wine/40 ml-2">Họ & tên *</label>
                                <input type="text" placeholder="Nhập họ và tên..." className="w-full bg-white border border-wine/10 rounded-xl px-6 py-4 text-wine placeholder:text-wine/20 focus:outline-none focus:border-wine/30 transition-all text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-wine/40 ml-2">Ngày sinh *</label>
                                <input type="date" className="w-full bg-white border border-wine/10 rounded-xl px-6 py-4 text-wine focus:outline-none focus:border-wine/30 transition-all text-sm uppercase" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-wine/40 ml-2">Giờ sinh</label>
                                <div className="flex bg-white border border-wine/10 rounded-xl overflow-hidden">
                                    <input type="text" placeholder="Giờ" className="w-1/2 px-4 py-4 text-sm text-center focus:outline-none border-r border-wine/5" />
                                    <input type="text" placeholder="Phút" className="w-1/2 px-4 py-4 text-sm text-center focus:outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-wine/40 ml-2">Số điện thoại *</label>
                                <input type="tel" placeholder="Nhập số điện thoại..." className="w-full bg-white border border-wine/10 rounded-xl px-6 py-4 text-wine placeholder:text-wine/20 focus:outline-none focus:border-wine/30 transition-all text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-wine/40 ml-2">Mẫu đang quan tâm</label>
                                <select className="w-full bg-white border border-wine/10 rounded-xl px-6 py-4 text-wine appearance-none focus:outline-none focus:border-wine/30 transition-all text-sm">
                                    <option>Chọn mẫu</option>
                                    <option>Cát An Nhiên</option>
                                    <option>Cát Bình An</option>
                                    <option>Cát Tĩnh Lặng</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-wine/40 ml-2">Mục tiêu muốn đạt được</label>
                                <select className="w-full bg-white border border-wine/10 rounded-xl px-6 py-4 text-wine appearance-none focus:outline-none focus:border-wine/30 transition-all text-sm">
                                    <option>Phát triển sự nghiệp</option>
                                    <option>Cân bằng cảm xúc</option>
                                    <option>Thu hút may mắn</option>
                                    <option>Bình an trong tâm</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-wine/40 ml-2">Lời nhắn gửi dành cho Cát</label>
                                <textarea rows="3" placeholder="Bạn muốn chúng tôi lưu ý điều gì đặc biệt không?" className="w-full bg-white border border-wine/10 rounded-xl px-6 py-4 text-wine placeholder:text-wine/20 focus:outline-none focus:border-wine/30 transition-all text-sm resize-none"></textarea>
                            </div>

                            <div className="md:col-span-2 mt-4 text-right">
                                <button className="inline-flex items-center gap-4 bg-wine text-white px-12 py-5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-burgundy transition-all shadow-lg active:scale-95">
                                    GỬI THÔNG TIN <span className="text-xl">{"➔"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Consultation;
