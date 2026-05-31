import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import styles from './Wishlist.module.css';

const Wishlist = () => {
    const products = [
        {
            id: 1,
            name: 'Vòng Tay Thạch Anh Khói',
            price: '1.250.000đ',
            category: 'Tự Nhiên • Thủ Công',
            desc: 'Sự kết hợp tinh tế giữa đá thạch anh khói tự nhiên và charm bạc thủ công, mang lại năng lượng bình an.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD96Lh9AANOWPtzDnYXbcwEo00X4KYq_CCyjMc_9jCkj1hdnVqRtrb3NuFV7h8Ti9QG964l3A-4auHXX-1IXy1xsVxW3JufibXo4RZwLJ_zWFhFF4Qa1i1lst4iFSBAHWf2DxpqKeqS3v13A2gNSOqxut0KDCM7-7vMxJXxn8v9BUJYqVnrVB1lF8DkaPh6ijYyrWkQPJCqwGaIerHG2ochT1Y378bs1Ya1AgjLhuia6FrzYhOCsyjghjJZ8tpUNlEgz8_kvBxyiJza'
        },
        {
            id: 2,
            name: 'Vòng Tay Ngọc Bích',
            price: '2.450.000đ',
            category: 'Sang Trọng • Tinh Xảo',
            desc: 'Chế tác từ những viên ngọc bích tuyển chọn, tượng trưng cho sự thịnh vượng và may mắn vĩnh cửu.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3upOVWAEirSFq36OgL-sCXPK4Qf4Yt_mJ2g1EjUUJrdT683iVjOwr3VbPhX5JV4lzSlRm8DPsc1UfZW_clBOEIbHf0OpkbEEToLoqcIvfv5QGrcqYClhX_X5nyE0_2wrp3RSH07oOKaLkiPuUfEOhSma24gVYWFuA5HHBhN54_wqAEsUAFa_MEjpRzJU4PxAJDZ_V0cAkyhxnmtQwgLkTOzM4ZS0DKykNtCeyepvFQNCypCbvP18frRuRgcl4DZ66zX8Yzxn12H56'
        },
        {
            id: 3,
            name: 'Vòng Tay Thạch Anh Hồng',
            price: '950.000đ',
            category: 'Nhẹ Nhàng • Nữ Tính',
            desc: 'Mang sắc hồng dịu dàng của đá tình yêu, một món quà ý nghĩa để trân trọng bản thân mỗi ngày.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7vW5n24amC0yBzsU9bEeciJ6IaVzw5PLKbSzhdMYbzVMPOMrkG0WJUA3K1xl0YnxOEjJTYI9ZOhDJX0FPnz9SiilrsnvHBBhC9sa0iaxSwpLww2Cfk2hGueohkA3MbSKegrDyusJo8Lp6-pCCpT1KcdMQUOOl_lEq7vbXzhWO1Ycye5KEfl7-6iX7urxvoWX8icV1F1ixzdYua8b8Qq_ZoRKDGn_wuAYONtBcU-uLZU4D1PSrab2gBtgXx20SVbqGvhaCspaMe1Ex'
        },
        {
            id: 4,
            name: 'Vòng Tay Đá Núi Lửa',
            price: '1.100.000đ',
            category: 'Mạnh Mẽ • Huyền Bí',
            desc: 'Vẻ đẹp nguyên sơ của đá núi lửa đen tuyền kết hợp cùng những nút thắt macrame thủ công bền bỉ.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrNbYXyuSI15X3FJuvIRmZTvXeGHv6C21O7kd48Nfyo-t-FrIYdclgAJ989vwuaymB-vPWbqyh_Fjkqb2NJVwZMFgdAISfp-uFjHD1AItIMXFqab40Fxrsc62vESgyNdKROvJHhmUhQ2y_nryRTEN8nPWjV4zVa1QvitnzGuw6grJQ05ASrIBbyu0fT72BW2SqB89tQrTxriKBainQZXxfpAWebMtEi3ESHx8yFDbRIsKIFjoys-cPMBXi8PDtLyoLtC8JHK8Jwtr2'
        }
    ];

    return (
        <section className="space-y-16 animate-fade-in">
            <div className="flex justify-between items-baseline mb-12">
                <h1 className="font-headline text-headline-lg text-primary">Sản phẩm yêu thích</h1>
                <span className="font-body text-on-surface-variant">{products.length} sản phẩm</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {products.map((product) => (
                    <div key={product.id} className="group relative flex flex-col bg-surface-container-low rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="aspect-square overflow-hidden relative">
                            <img
                                alt={product.name}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                src={product.image}
                            />
                            <button className="absolute top-4 right-4 bg-surface/90 backdrop-blur p-2 rounded-full text-primary shadow-sm hover:bg-primary hover:text-white transition-colors">
                                <Heart size={20} fill="currentColor" />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-2">
                                <span className="text-label-sm uppercase tracking-widest text-secondary font-bold">{product.category}</span>
                            </div>
                            <h3 className="font-headline text-2xl mb-2">{product.name}</h3>
                            <p className="font-body text-on-surface-variant mb-6 line-clamp-2 text-sm">{product.desc}</p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="font-headline text-xl text-primary font-bold">{product.price}</span>
                                <button className="bg-primary text-white px-6 py-2 rounded-full font-body text-xs flex items-center gap-2 hover:bg-[#8c1515] transition-colors uppercase tracking-widest font-bold">
                                    <ShoppingBag size={18} />
                                    THÊM VÀO GIỎ
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Wishlist;
