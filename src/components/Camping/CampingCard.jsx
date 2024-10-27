/* eslint-disable react/prop-types */
import IconHeart from "../icon/IconHeart";
import { Icon } from "@iconify/react/dist/iconify.js";
const CampingCard = ({ camping }) => {
  return (
    <div className="w-[260px] h-[360px] mt-4 rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Hình ảnh Camping */}
      <div className="relative">
        <img
          className="w-full h-[160px] object-cover "
          src={camping.imageUrl}
          alt={camping.name}
        />
        <button className="absolute top-2 right-2 p-2 ">
          <IconHeart />
        </button>
      </div>

      {/* Nội dung */}
      <div className="p-6 ">
        <h2 className="text-2xl font-bold text-blue-900">{camping.name}</h2>
        <div className="text-sm flex mt-3">
          <Icon
            icon="mdi:map-marker" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-pink-400"
          />
          <p className="text-gray-700 ml-1">{camping.location}</p>
        </div>
        <div className="text-sm flex mt-1">
          <Icon
            icon="mdi:star" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-yellow-500"
          />
          <p className="text-yellow-400 ml-1">{camping.rating}</p>
          <span className="text-gray-500">({camping.reviews})</span>
        </div>
        <div className="text-sm flex mt-1">
          <Icon icon="ic:sharp-phone" width="18" height="18" />
          <p className="text-green-500 ml-1">{camping.phone_nb}</p>
        </div>
        <button className="h-[43px] w-[110px] bg-blue-900 text-white rounded-3xl hover:bg-blue-700 ml-[110px] mt-2">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default CampingCard;
