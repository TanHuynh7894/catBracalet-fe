import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import prod1 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14AAN-2CH7-R20.jpg';
import prod2 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EDN-2CH7-R20.jpg';
import prod3 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14EEN-2CH7-R20.jpg';
import prod4 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14FGN-2CH7-R20.jpg';
import prod5 from '../../assets/Image - Cat/hình ảnh Sp/14 nhuyễn - 2 đĩa/D2-14KCN-2CH7-R20.jpg';

const products = [
    { id: 1, name: "Cát An Nhiên", price: "890.000đ", img: prod1, category: "HOT", desc: "Tĩnh lặng tâm hồn" },
    { id: 2, name: "Cát Bình An", price: "890.000đ", img: prod2, category: "", desc: "Bảo vệ & an yên" },
    { id: 3, name: "Cát Tĩnh Lặng", price: "890.000đ", img: prod3, category: "MỚI", desc: "Giảm căng thẳng" },
    { id: 4, name: "Cát Thịnh Vượng", price: "890.000đ", img: prod4, category: "HOT", desc: "Thu hút tài lộc" },
    { id: 5, name: "Cát May Mắn", price: "890.000đ", img: prod5, category: "", desc: "Suôn sẻ & niềm vui" },
];

const Collection = () => {
    return (
        <section id="collection" className="py-20 bg-ivory">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-wine">Bộ sưu tập nổi bật</h2>
                    <Link to="/collection" className="hidden md:flex items-center gap-2 border border-wine/10 px-6 py-2 rounded-lg text-[10px] font-bold tracking-widest text-wine/60 hover:text-wine transition-all">
                        XEM TẤT CẢ BỘ SƯU TẬP <span className="text-xs">{" >"}</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map((item, idx) => (
                        <Link
                            to="/product-detail"
                            key={item.id}
                            className="group cursor-pointer block"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-2xl luxury-shadow bg-cream">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {item.category && (
                                        <div className="absolute top-3 left-3 bg-wine text-white text-[9px] font-bold px-3 py-1 rounded-sm uppercase tracking-tighter">
                                            {item.category}
                                        </div>
                                    )}
                                    <button
                                        className="absolute bottom-4 right-4 text-wine/40 hover:text-wine transition-colors z-10"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Handle wishlist logic here
                                        }}
                                    >
                                        <Heart size={18} />
                                    </button>
                                </div>

                                <div className="text-left px-1">
                                    <h3 className="text-[13px] font-serif text-wine mb-1 uppercase tracking-wider">{item.name}</h3>
                                    <p className="text-[10px] text-wine/40 mb-3 uppercase tracking-widest">{item.desc}</p>
                                    <span className="text-[12px] font-bold text-wine">{item.price}</span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collection;
