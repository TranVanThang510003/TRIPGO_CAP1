import React from 'react';
import { Icon } from "@iconify/react";
import starIcon from "@iconify/icons-mdi/star"; // Star icon
import IconHeart from "../icon/IconHeart"; // Assuming you have your custom heart icon
import {useNavigate} from "react-router-dom";
const FavouriteCard = ({ tour }) => {
    const navigate = useNavigate();
    return (
        <div className="w-[268px] min-h-[360px] bg-white rounded-lg shadow-md overflow-hidden   mb-2 relative " onClick={() => navigate(`/tours/${tour.id}`)}
        >
            {/* Image Section */}
            <img
                className="w-full h-[151px] rounded-tl-[10px] rounded-tr-[10px]"
                src={`http://localhost:3000${tour.imageUrl}`} // Sử dụng đường dẫn từ API
                alt={tour.name}
            />

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between min-h-0">
                <div className="relative">
                    <div className="text-[#818080] text-[13px] font-medium font-['Baloo_2']">{tour.location}</div>
                    <h3 className="mt-1 text-xl font-semibold text-[#181e4b] font-['Baloo_2']">{tour.name}</h3>
                    <div className="flex gap-2 mt-2">
                        <span className="px-1 bg-[#d9d9d9]/50 rounded-[5px] text-[#818080] text-sm font-normal font-['Baloo_2']">{tour.tourType}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <Icon
                            icon={starIcon}
                            width="18"
                            height="18"
                            className="text-yellow-500"
                        />
                        <span className="text-[#f09b0a] text-base font-normal font-['Poppins']">{tour.averageRating}</span>
                        <span className="text-[#818080] text-[16px] font-normal font-['Baloo_2'] ml-1">
                            ({tour.reviewCount} đánh giá) {tour.nubBooking} lượt đặt
                        </span>
                    </div>
                    {/* Price Section */}
                    <div className="flex items-center mt-3">
                        <div className="text-[#181e4b] text-[22px] font-bold font-['Baloo_2']">{tour.priceAdult}</div>
                        <span className="text-[#818080] text-lg font-normal font-['Baloo_2'] ml-2">/Người</span>
                    </div>
                </div>
            </div>

            {/* Favorite Icon */}
            <div className="absolute top-2 right-2">
                <IconHeart
                    tourId={tour.id} // Chắc chắn truyền ID tour vào
                    liked={tour.isLiked} // Trạng thái yêu thích ban đầu từ API (nếu có)
                    onChange={(updatedLikedStatus) => {
                        console.log('Trạng thái yêu thích đã thay đổi:', updatedLikedStatus);
                    }}
                    className="some-classname" // Class CSS tùy chỉnh nếu cần
                />


            </div>
        </div>
    );
};

export default FavouriteCard;
