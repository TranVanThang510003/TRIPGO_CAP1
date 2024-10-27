/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import IconHeart from "../icon/IconHeart";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="w-[260px] h-[360px] mt-4 rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Hình ảnh nhà hàng */}
      <div className="relative">
        <img
          className="w-full h-[160px] object-cover "
          src={restaurant.imageUrl}
          alt={restaurant.name}
        />
        <button className="absolute top-2 right-2 p-2 ">
          <IconHeart />
        </button>
      </div>

      {/* Nội dung */}
      <div className="p-2 ml-3 ">
        <h2 className="text-2xl font-bold text-blue-900">{restaurant.name}</h2>
        <div className="text-sm flex mt-1">
          <Icon
            icon="mdi:silverware-fork-knife" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-blue-500"
          />
          <p className="text-gray-700 ml-1">{restaurant.type}</p>
        </div>
        <div className="text-sm flex">
          <Icon
            icon="mdi:map-marker" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-pink-400"
          />
          <p className="text-gray-700 ml-1">{restaurant.location}</p>
        </div>
        <div className="text-sm flex">
          <Icon
            icon="mdi:star" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-yellow-500"
          />
          <p className="text-yellow-400 ml-1">{restaurant.rating}</p>
          <span className="text-gray-500">({restaurant.reviews})</span>
        </div>
        <div className="text-sm flex">
          <Icon
            icon="mdi:book-open-variant" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-blue-500"
          />
          <p className="text-gray-700 ml-1">Xem menu</p>
        </div>
        <div className="text-sm flex">
          <Icon
            icon="mdi:clock-time-four" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-green-500"
          />
          <p className="text-green-500 ml-1">{restaurant.status}</p>
        </div>
        <button className="h-[43px] w-[110px] bg-blue-900 text-white rounded-2xl hover:bg-blue-700 ml-[125px] ">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
