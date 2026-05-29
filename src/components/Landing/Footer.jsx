import React from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import logoImg from '../../assets/Image - Cat/Logo Cat/logoCat-PNG.png';

const Footer = () => {
    return (
        <footer className="bg-ivory pt-32 pb-12 border-t border-wine/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Meta */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-8">
                            <img src={logoImg} alt="Cát" className="h-10 w-auto" />
                            <div className="flex flex-col">
                                <span className="text-xl font-serif tracking-widest text-wine leading-none uppercase">CÁT</span>
                                <span className="text-[10px] tracking-[0.3em] text-wine/60 uppercase">Bracelet</span>
                            </div>
                        </div>
                        <p className="text-sm text-wine/50 font-serif italic mb-10 max-w-xs">
                            Năng lượng tinh khiết<br />Phong cách tinh tế
                        </p>
                        <div className="flex gap-6">
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-wine/10 flex items-center justify-center text-wine hover:bg-wine hover:text-white transition-all transform hover:-translate-y-1">
                                    <Icon size={18} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-wine mb-8 font-bold">Về chúng tôi</h4>
                        <ul className="space-y-4">
                            {['Câu chuyện thương hiệu', 'Tầm nhìn & Sứ mệnh', 'Cát là gì?', 'Năng lượng phong thủy', 'Đá tự nhiên chọn lọc'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[11px] uppercase tracking-widest text-wine/50 hover:text-wine transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policy */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-wine mb-8 font-bold">Hỗ trợ khách hàng</h4>
                        <ul className="space-y-4">
                            {['Tư vấn chọn vòng', 'Chính sách bảo hành', 'Giao hàng & Thanh toán', 'Câu hỏi thường gặp', 'Bí quyết bảo quản vòng'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[11px] uppercase tracking-widest text-wine/50 hover:text-wine transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-wine mb-8 font-bold">Liên hệ</h4>
                        <ul className="space-y-6">
                            <li>
                                <p className="text-[10px] uppercase tracking-widest text-wine/30 mb-1 font-bold">Hotline</p>
                                <p className="text-sm text-wine/70 font-semibold tracking-wider">0868 123 456</p>
                            </li>
                            <li>
                                <p className="text-[10px] uppercase tracking-widest text-wine/30 mb-1 font-bold">Email</p>
                                <p className="text-sm text-wine/70">hello@catbracelet.vn</p>
                            </li>
                            <li>
                                <p className="text-[10px] uppercase tracking-widest text-wine/30 mb-1 font-bold">Địa chỉ</p>
                                <p className="text-sm text-wine/70">123 Đường Nam Kỳ Khởi Nghĩa, Quận 1, TP. HCM</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-wine/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-wine/30">
                        © 2026 Cát Bracelet. Reserved for Luxury Spiritual Experience.
                    </p>
                    <div className="flex gap-10">
                        <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-wine/30 hover:text-wine transition-colors">Privacy Policy</a>
                        <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-wine/30 hover:text-wine transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
