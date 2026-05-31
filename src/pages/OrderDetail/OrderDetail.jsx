import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Package, X } from 'lucide-react';
import styles from './OrderDetail.module.css';

const OrderDetail = () => {
    const { id } = useParams();

    return (
        <section className="animate-fade-in">
            {/* Breadcrumb / Back Button */}
            <NavLink to="/order-history" className="inline-flex items-center text-primary mb-6 hover:opacity-70 transition-opacity group">
                <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" size={20} />
                <span className="font-body text-label-sm uppercase tracking-widest font-bold">Trở về lịch sử</span>
            </NavLink>

            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div>
                    <h1 className="font-headline text-headline-lg text-on-surface">Đơn hàng #{id || 'CAT-2024-001'}</h1>
                    <p className="font-body text-body-md text-on-surface-variant">Ngày đặt: 12/10/2023</p>
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-bold tracking-wide border border-secondary/20 shadow-sm uppercase">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    Đang giao
                </div>
            </div>

            {/* Shipping Progress Timeline */}
            <section className="mb-16 bg-surface-container-low/30 border border-outline-variant/20 p-8 rounded-2xl">
                <div className="relative flex justify-between max-w-3xl mx-auto pt-4">
                    <div className="absolute top-6 left-0 w-full h-0.5 bg-outline-variant/30 -z-0"></div>
                    <div className="absolute top-6 left-0 h-0.5 bg-primary -z-0 transition-all duration-1000 w-full"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary mb-3 shadow-sm shadow-primary/40"></div>
                        <span className="font-body text-[10px] uppercase tracking-wider text-on-surface-variant">Đã đặt hàng</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary mb-3 shadow-sm shadow-primary/40"></div>
                        <span className="font-body text-[10px] uppercase tracking-wider text-on-surface-variant">Đã xác nhận</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary mb-3 shadow-sm shadow-primary/40"></div>
                        <span className="font-body text-[10px] uppercase tracking-wider text-on-surface-variant">Đang đóng gói</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full bg-primary mb-3 shadow-sm shadow-primary/40 ${styles.stepActive}`}></div>
                        <span className="font-body text-[10px] uppercase tracking-wider text-primary font-bold">Đang giao</span>
                    </div>
                </div>
            </section>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-16">
                <div className="p-gutter bg-white border border-outline-variant/20 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4 space-x-2">
                        <MapPin className="text-primary" size={20} />
                        <h3 className="font-headline text-primary text-xl">Địa chỉ nhận hàng</h3>
                    </div>
                    <div className="space-y-1">
                        <p className="font-body text-lg font-bold text-on-surface">Nguyễn Văn A</p>
                        <p className="font-body text-body-md text-on-surface-variant">090 123 4567</p>
                        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">123 Đường Lê Lợi, Phường Bến Nghé,<br />Quận 1, TP. Hồ Chí Minh</p>
                    </div>
                </div>

                <div className="p-gutter bg-white border border-outline-variant/20 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4 space-x-2">
                        <CreditCard className="text-primary" size={20} />
                        <h3 className="font-headline text-primary text-xl">Phương thức thanh toán</h3>
                    </div>
                    <div className="flex items-center mt-4 p-3 bg-surface-container-low rounded-lg">
                        <div className="w-10 h-7 bg-on-surface text-white rounded flex items-center justify-center font-bold text-[8px] tracking-tighter mr-4">VISA</div>
                        <div className="flex-1">
                            <p className="font-body text-body-md text-on-surface font-semibold">Thẻ tín dụng</p>
                            <p className="text-xs text-on-surface-variant font-body">Visa kết thúc bằng **** 1234</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items Section */}
            <div className="mb-8">
                <h3 className="font-headline text-on-surface mb-6 flex items-center text-xl">
                    <Package className="mr-3 text-primary" size={20} />
                    Chi tiết sản phẩm
                </h3>
                <div className="bg-white border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
                    {/* Item 1 */}
                    <div className="p-6 border-b border-outline-variant/10 flex items-center hover:bg-surface-container-low/30 transition-colors">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-variant border border-outline-variant/10">
                            <img
                                alt="Vòng tay Thạch Anh Khói"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtM2ZvnOXZ7F8mIFs3dPNc7ZMMnZ4Bi1FAVVLTc4hsYnnEUXLltO13oAhQEMjVQs_t0cRCuK2IjQbM53r5QKhfvRVyBBGz52byhscVZieMYYdubfAxo-VZKl4KQ_EBXSXwfsDsxZ0V_N3aeF29L8jx5gs7vl3D1opCgy9xI8dopByeZRy2pbdYaZn_vx-CdHkN6swynSZpGyatcadEMMC_6AJ9xNIYyySKfSiNX4BF21PDjeWv20eKOEVuIkpGZFEFATblr2LBwoZ2"
                            />
                        </div>
                        <div className="ml-6 flex-1">
                            <h4 className="font-body text-lg font-bold text-on-surface">Vòng tay Thạch Anh Khói</h4>
                            <p className="font-body text-on-surface-variant mt-1 italic uppercase tracking-wider text-[10px]">Năng lượng tĩnh lặng & Bảo vệ</p>
                            <div className="mt-2 md:hidden">
                                <span className="font-body text-body-md text-on-surface-variant">SL: 1</span>
                                <span className="mx-2">•</span>
                                <span className="font-body text-body-md font-bold text-primary">1,450,000đ</span>
                            </div>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="font-body text-body-md text-on-surface-variant font-medium">Số lượng: 1</p>
                            <p className="font-body text-lg font-bold text-primary">1,450,000đ</p>
                        </div>
                    </div>
                    {/* Item 2 */}
                    <div className="p-6 flex items-center opacity-60 bg-surface-container-low/20">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-variant border border-outline-variant/10">
                            <img
                                alt="Vòng tay Ngọc Bích"
                                className="w-full h-full object-cover grayscale"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIgMeiZtOmQIxy6d5zhP6kMrX8w9sczECHSLPMvV6lc3FvbkW-UnakaIIf4fbz5dDEAtJO-fp_6eFGiMHR78SpuIzgaQFARuPtAnS_VGzC9t2sGilaAF-CcKDoip9-AgRmNTDflSYSsj_q1ElRSSMHCeeDNjKqE2jy7i9Bx_q-b8fStVDSROix-cXXJS_cj_6MYN6yyI4qxJVgANh2wERHS3UugEFa-IjMvjNYfYJmWzWn6yKMOfTl8r4h8EcbJVuGpa39pJ62pyZb"
                            />
                        </div>
                        <div className="ml-6 flex-1">
                            <h4 className="font-body text-lg font-bold text-on-surface">Vòng tay Ngọc Bích</h4>
                            <p className="font-body text-error mt-1 italic uppercase tracking-wider text-[10px]">May mắn & Thịnh vượng (Hết hàng)</p>
                        </div>
                        <div className="hidden md:block text-right text-on-surface-variant">
                            <p className="font-body text-body-md font-medium">Số lượng: 0</p>
                            <p className="font-body text-lg font-bold">0đ</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="flex justify-end pt-8">
                <div className="w-full md:w-80 space-y-4">
                    <div className="flex justify-between items-center text-on-surface-variant">
                        <span className="font-body text-body-md">Tạm tính</span>
                        <span className="font-body text-body-md tabular-nums">1,450,000đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-body text-body-md text-on-surface-variant">Phí vận chuyển</span>
                        <span className="font-body text-secondary font-bold uppercase tracking-wider text-xs">Miễn phí</span>
                    </div>
                    <div className="pt-4 border-t-2 border-primary/10 flex justify-between items-baseline">
                        <span className="font-headline text-on-surface text-xl">Tổng cộng</span>
                        <div className="text-right">
                            <p className="font-headline text-primary text-2xl">1,450,000đ</p>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 font-body">Đã bao gồm VAT</p>
                        </div>
                    </div>
                    <button className="w-full mt-6 py-3 px-6 border border-primary text-primary font-body text-label-sm font-bold rounded-lg hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 group uppercase tracking-widest">
                        <X size={18} className="group-hover:rotate-90 transition-transform" />
                        Hủy đơn hàng
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OrderDetail;
