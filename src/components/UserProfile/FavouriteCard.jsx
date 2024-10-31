import React from 'react';
import { Icon } from "@iconify/react";
import starIcon from "@iconify/icons-mdi/star"; // Star icon
import heartIcon from "@iconify/icons-mdi/heart"; // Use heart icon from Iconify
import IconHeart from "../icon/IconHeart"; // Assuming you have your custom heart icon

const FavouriteCard = ({ activity }) => {
    return (
        <div className="w-[268px] min-h-[360px] bg-white rounded-lg shadow-md overflow-hidden ml-0 mr-4 relative">
            {/* Image Section */}
            <img
                className="w-full h-[151px] rounded-tl-[10px] rounded-tr-[10px]"
                src={activity.imageUrl}
                alt={activity.name}
            />

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between min-h-0">
                <div className="relative">
                    <div className="text-[#818080] text-[13px] font-medium font-['Baloo_2']">{activity.location}</div>
                    <h3 className="mt-1 text-xl font-semibold text-[#181e4b] font-['Baloo_2']">{activity.name}</h3>
                    <div className="flex gap-2 mt-2">
                        <span className="px-1 bg-[#d9d9d9]/50 rounded-[5px] text-[#818080] text-sm font-normal font-['Baloo_2']">Bán chạy</span>
                        <span className="px-1 bg-[#d9d9d9]/50 rounded-[5px] text-[#818080] text-sm font-normal font-['Baloo_2']">Xác nhận tức thì</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <Icon
                            icon={starIcon}
                            width="18"
                            height="18"
                            className="text-yellow-500"
                        />
                        <span className="text-[#f09b0a] text-base font-normal font-['Poppins']">{activity.rating}</span>
                        <span className="text-[#818080] text-[16px] font-normal font-['Baloo_2'] ml-1">
                            ({activity.reviewCount} đánh giá) {activity.bookingCount} lượt đặt
                        </span>
                    </div>
                    {/* Price Section */}
                    <div className="flex items-center mt-3">
                        <div className="text-[#181e4b] text-[22px] font-bold font-['Baloo_2']">{activity.price}</div>
                        <span className="text-[#818080] text-lg font-normal font-['Baloo_2'] ml-2">/Người</span>
                    </div>
                </div>
            </div>

            {/* Favorite Icon */}
            <div className="absolute top-2 right-2">
                <IconHeart className="fill-[#3E86F5]" />
                {/* You can also use the imported heart icon like this: */}
                {/* <Icon icon={heartIcon} className="text-red-500" /> */}
            </div>
        </div>
    );
};

export default FavouriteCard;
