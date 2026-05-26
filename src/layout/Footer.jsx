import React from 'react';
import { Share2, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-20 bg-surface-container-lowest border-t border-outline-variant/30 font-body">
            <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start gap-gutter">
                <div className="max-w-xs">
                    <div className="font-headline text-2xl text-primary mb-6 uppercase">Cát Bracelet</div>
                    <p className="font-body text-sm text-on-surface-variant mb-6">
                        Trang sức thủ công cho lối sống tỉnh thức và ý niệm cao đẹp.
                    </p>
                    <div className="flex gap-4">
                        <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                            <Share2 size={20} strokeWidth={1.5} />
                        </a>
                        <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                            <Instagram size={20} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-body font-medium text-primary uppercase tracking-widest text-sm">Khám phá</h4>
                        <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">Bộ sưu tập</a>
                        <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">Câu chuyện</a>
                        <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">Nghệ nhân</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-body font-medium text-primary uppercase tracking-widest text-sm">Hỗ trợ</h4>
                        <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">Vận chuyển</a>
                        <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">Chính sách bảo mật</a>
                        <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">Điều khoản dịch vụ</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-body font-medium text-primary uppercase tracking-widest text-sm">Liên hệ</h4>
                        <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300">Câu hỏi thường gặp</a>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mt-16 pt-8 border-t border-outline-variant/30">
                <p className="text-sm text-on-surface-variant text-center md:text-left italic">
                    © 2024 Cát Bracelet. Chế tác thủ công với tâm tình.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
