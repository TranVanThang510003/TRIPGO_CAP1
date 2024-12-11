import React, { useState } from 'react';
import Star from '../components/common/Star';

const Review = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const handleStarClick = (index) => {
        setRating(index + 1);  // Cập nhật rating khi click vào sao
    };

    return (
        <div className="p-6 flex justify-center items-center">
            <div className="w-full max-w-4xl px-6" style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                <h2 className="text-2xl font-bold text-customBlue mb-4">Đánh giá sản phẩm</h2>

                {/* Phần thông tin gói dịch vụ */}
                <div className="border p-4 rounded-lg shadow-sm">
                    <div className="flex space-x-4">
                        <img
                            src="/img/ky-uc-hoi-an.jpg" 
                            alt="Hội An"
                            className="w-28 h-28 rounded-md object-cover"
                        />
                        <div className="flex flex-col justify-between">
                            <h3 className="text-lg font-semibold text-customBlue">
                                Combo Vé Đảo Ký Ức Hội An & Chương Trình Ký Ức Hội An
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">Ngày: 20/12/2024</p>
                            <p className="text-gray-700 text-sm mt-1 font-medium">
                                Vé QR vào cửa trực tiếp vé xem chương trình Ký Ức Hội An & tùy chọn bữa tối
                            </p>
                            <a href="#" className="text-blue-600 text-sm mt-2 block underline">
                                Xem chi tiết gói dịch vụ
                            </a>
                        </div>
                    </div>
                </div>

                {/* Phần chọn sao để đánh giá */}
                <div className="h-10 justify-start items-center gap-5 inline-flex mt-4">
                    <div className="text-[#1A1A1A] text-xl font-['Baloo 2']">
                        Chất lượng dịch vụ
                    </div>
                    <div className="justify-center items-center gap-1 flex">
                        {[...Array(5)].map((_, index) => (
                            <div key={index}>
                                <Star
                                    filled={index < rating || index < hover}
                                    onClick={() => handleStarClick(index)}
                                    onMouseEnter={() => setHover(index + 1)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phần nhập phản hồi */}
                <div className="mt-4">
                    <label htmlFor="feedback" className="block text-lg font-['Baloo 2'] mb-1">
                        Nhận xét của bạn:
                    </label>
                    <textarea
                        id="feedback"
                        className="w-full p-3 border rounded-lg shadow-sm"
                        rows="4"
                        placeholder="Vui lòng chia sẻ cảm nhận của bạn về dịch vụ"
                    />
                </div>

                {/* Nút gửi đánh giá và nút Trở lại */}
                <div className="mt-4 flex justify-end gap-4">
                    <button
                        className="px-6 py-2 bg-white text-[#03387E] rounded-lg hover:bg-[#F6F3F3]"
                    >
                        TRỞ LẠI
                    </button>
                    <button
                        className="px-6 py-2 bg-[#03387E] text-white rounded-lg shadow-md hover:bg-[#033E8C]"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
