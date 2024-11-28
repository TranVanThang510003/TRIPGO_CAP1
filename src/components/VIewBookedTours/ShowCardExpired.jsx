/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react/dist/iconify.js";
import locationIcon from "@iconify/icons-mdi/map-marker"; // Biểu tượng vị trí
import starIcon from "@iconify/icons-mdi/star"; // Biểu tượng sao
import IconHeart from "../icon/IconHeart";
const ShowCardExpired = ({ tour, onClick }) => {
    return (
      <div
        onClick={() => onClick(tour)} // Gọi hàm khi click vào card
        className="w-[260px] mt-4 rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer"
      >
        
        <div className="relative">
          <img
            className="w-full h-[150px] object-cover"
            src={tour.imageUrl}
            alt={tour.name}
          />
          <button className="absolute top-2 right-2 p-2">
            <IconHeart />
          </button>
        </div>
        <div className="p-3 mt-2">
          <div className="flex text-sm">
            <div className="bg-pink-200 rounded-full w-[75px] h-[22px] flex items-center justify-center">
              Relax
            </div>
          </div>
          <h2 className="text-xl font-bold text-blue-900 mt-3">{tour.name}</h2>
          <div className="text-sm flex mt-3">
            <Icon
              icon={locationIcon}
              width="18"
              height="18"
              className="text-pink-400"
            />
            <p className="text-gray-700 ml-1">{tour.location}</p>
          </div>
          <div className="text-sm flex mt-2">
            <Icon
              icon={starIcon}
              width="18"
              height="18"
              className="text-yellow-500"
            />
            <p className="text-yellow-400 ml-1">{tour.averageRating}</p>
            <p className="text-gray-700 ml-2">({tour.reviewCount} đánh giá)</p>
          </div>
          <div className="text-xl flex justify-between items-center mt-4">
            <h1 className="text-gray-700 font-bold">{tour.priceAdult}/Người</h1>
          </div>
        </div>
      </div>
    );
  };
  
  export default ShowCardExpired;
  