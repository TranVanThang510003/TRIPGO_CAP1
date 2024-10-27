/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import starIcon from "@iconify/icons-mdi/star"; // Biểu tượng sao
import IconHeart from "../icon/IconHeart";

const FunActivitiesCard = ({ activity }) => {
  return (
    <div className="w-[260px] h-[360px] mt-4 rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Hình ảnh nhà hàng */}
      <div className="relative">
        <img
          className="w-full h-[150px] object-cover"
          src={activity.imageUrl}
          alt={activity.name}
        />
        <button className="absolute top-2 right-2 p-2 ">
          <IconHeart />
        </button>
      </div>

      {/* Nội dung */}
      <div className="p-3 mt-2">
        <h2 className="text-2xl font-bold text-blue-900 mt-1">
          {activity.name}
        </h2>
        <div className="flex">
          <p className="bg-slate-200 w-[62px] h-[22px] text-sm text-slate-600 rounded-md flex justify-center items-center ">
            {activity.best_seller}
          </p>
          <p className="bg-slate-200 w-[113px] h-[22px] text-sm text-slate-600 rounded-md flex justify-center items-center ml-3">
            {activity.confirm}
          </p>
        </div>
        <div className="text-sm flex mt-2">
          <Icon
            icon={starIcon}
            width="18"
            height="18"
            className="text-yellow-500"
          />
          <p className="text-yellow-400 ml-1">{activity.rating}</p>
          <p className="text-gray-700 ml-2">({activity.reviews})</p>
          <p className="text-gray-500 ml-2">{activity.nub_booking} lượt đặt</p>
        </div>
        <div className="text-xl flex justify-between items-center mt-4">
          <h1 className="text-gray-700 font-bold">{activity.price}/Người</h1>
          <button className="h-[37px] w-[80px] bg-blue-900 text-white rounded-2xl hover:bg-blue-700 text-sm">
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunActivitiesCard;
