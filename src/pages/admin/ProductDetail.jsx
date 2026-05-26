import React from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Plus,
    X,
    MoreHorizontal,
    HelpCircle,
    Info,
    Trash2,
    Search
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const AdminProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className={styles.dashboard}>
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between mb-4 -mt-2">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/admin/products')} className="p-1.5 hover:bg-gray-100 rounded-md border border-gray-200 bg-white">
                        <ChevronLeft size={18} className="text-gray-500" />
                    </button>
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-bold text-gray-800">Cát - Hộp PE viền đen size 9 x 9</h1>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 font-medium shadow-sm">
                        Thao tác khác <ChevronDown size={14} />
                    </button>
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <button className="p-2 bg-white hover:bg-gray-50 border-r border-gray-200 text-gray-400"><ChevronLeft size={14} /></button>
                        <button className="p-2 bg-white hover:bg-gray-50 text-gray-400"><ChevronRight size={14} /></button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 pb-20">
                {/* Left side */}
                <div className="col-span-8 space-y-6">
                    {/* General Info */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wide">Thông tin sản phẩm</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase mb-2 block">
                                    Tên sản phẩm <span className="text-red-500 ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0088ff] flex items-center justify-center text-[7px] text-white">✨</div>
                                    <input
                                        type="text"
                                        defaultValue="Cát - Hộp PE viền đen size 9 x 9"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#0088ff] text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase mb-2 block">Mô tả</label>
                                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-inner">
                                    <div className="bg-gray-50/50 border-b border-gray-100 p-2.5 flex items-center gap-5">
                                        <div className="flex items-center gap-1.5 border-r border-gray-200 pr-3">
                                            <span className="text-xs font-bold text-gray-700">Tiêu đề 2</span>
                                            <ChevronDown size={12} className="text-gray-400" />
                                        </div>
                                        <div className="flex items-center gap-1.5 border-r border-gray-200 pr-3">
                                            <span className="text-xs text-gray-700">14</span>
                                            <ChevronDown size={12} className="text-gray-400" />
                                        </div>
                                        <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
                                            <span className="text-sm font-black">B</span>
                                            <span className="text-sm italic">I</span>
                                            <span className="text-sm underline">U</span>
                                            <div className="w-4 h-4 bg-gray-800 rounded-sm" />
                                        </div>
                                        <MoreHorizontal size={14} className="text-gray-400 ml-auto" />
                                    </div>
                                    <div className="p-6 min-h-[350px] text-sm overflow-y-auto font-body leading-relaxed">
                                        <h3 className="font-bold text-lg mb-4 text-gray-800">🖼️ KHUNG NHỰA PE 9X9CM - KỆ TRƯNG BÀY & BẢO QUẢN TRANG SỨC "THẦN KỲ"</h3>
                                        <p className="mb-4">Bạn lo lắng trang sức handmade bị xỉn màu do không khí? Hay muốn trưng bày sản phẩm thật chuyên nghiệp? <strong>Hộp nhựa PE 9x9</strong> với lớp màng phim siêu bền chính là giải pháp "cứu cánh" cho mọi tín đồ yêu phụ kiện!</p>
                                        <h4 className="font-bold mb-3 flex items-center gap-2">✨ ĐẶC ĐIỂM NỔI BẬT</h4>
                                        <ul className="list-disc pl-5 space-y-2 mb-6">
                                            <li><strong>Công nghệ màng Film PE:</strong> Lớp màng trong suốt, siêu dai và co dãn cực tốt. Khi đặt trang sức vào giữa, màng film sẽ ôm sát sản phẩm, tạo hiệu ứng như sản phẩm đang "lơ lửng" trong không trung.</li>
                                            <li><strong>Chống oxy hóa 100%:</strong> Ngăn chặn hoàn toàn sự tiếp xúc của không khí, giúp vòng tay, nhẫn, charm bạc... luôn sáng bóng, không bị đen hay xỉn màu.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white border-t border-gray-100 p-2 text-right">
                                        <span className="text-[10px] text-gray-400 tracking-tight">HTML: 2740/100000 ⓘ</span>
                                    </div>
                                </div>
                                <button className="mt-3 text-[#0088ff] text-xs font-medium hover:underline">Thêm mô tả ngắn</button>
                            </div>
                        </div>
                    </div>

                    {/* Attributes section */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-gray-500 uppercase">Tên thuộc tính</label>
                                <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">Kích thước</div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-gray-500 uppercase">Giá trị</label>
                                <div className="p-2 border border-gray-200 rounded-lg bg-white flex flex-wrap gap-2 items-center min-h-[42px]">
                                    {['1 hộp', '3 hộp', '5 hộp'].map(val => (
                                        <div key={val} className="px-2 py-1 bg-blue-50 text-[#0088ff] rounded-md text-xs font-bold flex items-center gap-1.5">
                                            {val} <X size={10} className="hover:text-red-500 cursor-pointer" />
                                        </div>
                                    ))}
                                    <input type="text" placeholder="Nhập ký tự và ấn enter" className="outline-none text-xs flex-1 min-w-[120px]" />
                                    <button className="p-2 text-gray-300 hover:text-red-500">
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="mt-6 text-[#0088ff] text-sm font-bold flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border-2 border-[#0088ff] flex items-center justify-center text-lg">+</span> Thêm thuộc tính khác
                        </button>
                    </div>

                    {/* Versions/Variants */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Phiên bản</h2>
                            <div className="flex bg-[#0088ff] text-white rounded-lg px-3 py-1.5 text-xs font-bold gap-2 cursor-pointer hover:bg-[#0077e6] transition-all">
                                <Plus size={14} /> Thêm phiên bản <ChevronDown size={14} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase mb-2 block">Kho hàng</label>
                                <div className="relative">
                                    <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                                        <option>Cửa hàng chính</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-xs text-gray-400">Bộ lọc:</span>
                                <div className="flex items-center gap-1.5 text-[#0088ff] text-xs font-bold cursor-pointer hover:underline">
                                    Kích thước <ChevronDown size={14} />
                                </div>
                            </div>

                            <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                                <div className="bg-gray-50/50 p-3 flex items-center border-b border-gray-100">
                                    <input type="checkbox" className="rounded mr-3" />
                                    <span className="text-[11px] font-bold text-gray-600 uppercase">3 phiên bản</span>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {[
                                        { name: '1 hộp', sku: 'HP1', price: '12,000đ', stock: 18, img: 'https://img.freepik.com/free-photo/view-luxurious-velvet-box-jewelry_23-2149020963.jpg' },
                                        { name: '3 hộp', sku: 'HP3', price: '29,000đ', stock: 20, img: 'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg' },
                                        { name: '5 hộp', sku: 'HP5', price: '46,000đ', stock: 10, img: 'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg' }
                                    ].map((v, i) => (
                                        <div key={i} className="p-4 flex items-center hover:bg-gray-50/50 group transition-all">
                                            <input type="checkbox" className="rounded mr-4" />
                                            <div className="w-10 h-10 rounded border border-gray-100 bg-gray-50 overflow-hidden mr-4">
                                                <img src={v.img} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-bold text-[#0088ff] hover:underline cursor-pointer tracking-tight">{v.name}</div>
                                                <div className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest">{v.sku}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[11px] text-gray-400 mb-1">Giá bán: <span className="text-gray-800 font-bold">{v.price}</span></div>
                                                <div className="text-[10px] text-gray-400">Có thể bán <span className="text-gray-600 font-bold">{v.stock}</span> tại 1 kho</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-gray-50/20 p-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                                    <span className="text-gray-400 font-medium">Tổng tồn kho</span>
                                    <span className="text-gray-700 font-bold">Có thể bán: 48</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="col-span-4 space-y-6">
                    {/* Media */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Ảnh sản phẩm</h2>
                            <button className="text-[11px] text-[#0088ff] hover:underline font-bold">Thêm ảnh từ URL</button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-300 hover:border-[#0088ff] hover:text-[#0088ff] transition-all cursor-pointer">
                                <Plus size={24} />
                            </div>
                            {[
                                'https://img.freepik.com/free-photo/view-luxurious-velvet-box-jewelry_23-2149020963.jpg',
                                'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg',
                                'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg',
                                'https://img.freepik.com/free-photo/red-jewelry-box-isolated-white-background_1232-1596.jpg'
                            ].map((img, i) => (
                                <div key={i} className="aspect-square border border-gray-100 rounded-lg overflow-hidden relative group">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    {i === 0 && <div className="absolute inset-x-0 bottom-0 bg-[#000000aa] text-white text-[9px] font-bold text-center py-1">Ảnh đại diện</div>}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Trash2 size={16} className="text-white cursor-pointer hover:scale-110" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sales Channels */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Kênh bán hàng</h2>
                            <button className="text-[11px] text-[#0088ff] hover:underline font-bold">Chọn tất cả</button>
                        </div>
                        <div className="space-y-4">
                            {['Facebook', 'Tiktok Shop', 'Shopee', 'Tiki'].map(channel => (
                                <div key={channel} className="space-y-1">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="rounded w-4 h-4 text-[#0088ff]" defaultChecked={channel === 'Tiktok Shop' || channel === 'Shopee'} />
                                        <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{channel}</span>
                                        {channel === 'Shopee' && <Info size={12} className="text-gray-300" />}
                                    </label>
                                    {(channel === 'Tiktok Shop' || channel === 'Shopee') && (
                                        <div className="ml-7 text-[10px] text-gray-400">Áp dụng bảng giá <span className="text-[#0088ff] font-bold">{channel}</span></div>
                                    )}
                                </div>
                            ))}
                            <button className="text-[11px] text-[#0088ff] font-bold flex items-center gap-1 pt-2 hover:underline">
                                Xem thêm <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Bảng giá theo chi nhánh</h2>
                            <MoreHorizontal size={16} className="text-gray-400 hover:text-gray-900 cursor-pointer" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-xs text-[#0088ff] font-bold hover:underline cursor-pointer uppercase tracking-tight">Bảng giá tiktok</span>
                        </div>
                    </div>

                    {/* Taxonomy */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">DÀNH MỤC <HelpCircle size={10} /></h2>
                        </div>
                        <div className="relative">
                            <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg outline-none text-sm appearance-none">
                                <option>Chọn danh mục</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase block mb-2">Nhãn hiệu</label>
                                <div className="relative">
                                    <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg outline-none text-sm appearance-none">
                                        <option>Chọn nhãn hiệu</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase block mb-2">Loại sản phẩm</label>
                                <div className="relative">
                                    <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg outline-none text-sm appearance-none">
                                        <option>Chọn loại sản phẩm</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase block mb-2">Nhóm ngành nghề tính thuế GTGT, TNCN</label>
                                <div className="relative">
                                    <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg outline-none text-sm appearance-none">
                                        <option>Chọn nhóm ngành nghề</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase">Tag</label>
                                    <button className="text-[10px] text-[#0088ff] font-bold hover:underline">Danh sách tag</button>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-2 bg-white flex items-center gap-2">
                                    <input type="text" placeholder="Tìm kiếm hoặc thêm mới" className="outline-none text-xs w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3 px-8 shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.06)] z-50">
                <button className="px-6 py-2 border border-red-500 text-red-500 text-sm font-black rounded-lg hover:bg-red-50 transition-colors uppercase tracking-widest">Xóa</button>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button className="px-8 py-2 bg-gray-50 text-gray-300 text-sm font-black cursor-not-allowed uppercase tracking-widest border-r border-gray-200">Lưu</button>
                    <button className="p-2 bg-gray-50 text-gray-300 font-bold cursor-not-allowed">
                        <ChevronDown size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProductDetail;
