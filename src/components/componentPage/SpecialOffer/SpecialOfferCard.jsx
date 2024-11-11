import { Icon } from "@iconify/react/dist/iconify.js";
import IconHeart from "../../icon/IconHeart";

const SpecialOfferCard = ({ special }) => {
  return (
    <div className="w-[370px] h-[490px]  rounded-3xl border border-blue-300">
      <div className="relative">
        <img
          className="w-[324px] h-[272px] rounded-3xl mt-6 ml-6 relative"
          src={special.imageUrl}
        />
        <button className="absolute top-2 right-8 p-2 ">
          <IconHeart className="w-10 h-10" />
        </button>
      </div>

      {/* Thông tin */}
      <div className="ml-9 mt-4">
        <div className="flex gap-3">
          <div className="w-[69px] h-[21px] bg-pink-200 rounded-3xl flex justify-center text-pink-500">
            Flex
          </div>
          <p className="text-slate-600">3 ngày</p>
        </div>
        <h1 className="text-3xl font-bold">{special.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <Icon
            icon="mdi:map-marker" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-pink-400"
          />
          <p>Quảng Ninh</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:star" // Sử dụng tên icon trực tiếp
            width="18"
            height="18"
            className="text-yellow-500"
          />
          <p className="text-yellow-400 ml-1">4.5</p>
          <span className="text-gray-500">(5K đánh giá)</span>
          <span className="text-gray-500">10K+ lượt đặt</span>
        </div>
        <div className="flex mt-3 items-center gap-8">
          <p className="text-2xl font-bold">800.000đ/Người</p>
          <button className="w-[90px] h-[40px] bg-blue-200 rounded-2xl ">
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferCard;
