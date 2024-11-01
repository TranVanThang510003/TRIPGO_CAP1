import React from 'react';
import { Icon } from '@iconify/react';

const RoomCard = ({ room }) => {
  const baseURL = 'http://localhost:3000'; // Đường dẫn cơ sở cho hình ảnh

  return (
    <div className="flex flex-col lg:flex-row rounded-lg shadow-lg mb-6 border border-gray-200 overflow-hidden">
      {/* Room Images Section */}
      <div className="w-full lg:w-1/3 p-2">
        <img
          src={room.image ? `${baseURL}${room.image}` : '/default-room.jpg'} // Sử dụng baseURL cho hình chính
          alt={`Room image for ${room.title}`}
          className="w-full h-[170px] rounded-md object-cover mb-2 transition-transform duration-300 hover:scale-105"
        />
        <div className="grid grid-cols-2 gap-2">
          {room.additionalImages.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={`${baseURL}${image}`} // Sử dụng baseURL cho các hình bổ sung
              alt={`Additional image ${index + 1} for ${room.title}`}
              className="w-full h-[85px] rounded-md object-cover transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
        <div className="flex mt-2 items-center text-gray-600">
          <Icon icon="fa-solid:ruler-combined" className="w-5 h-5 mr-2" /> {room.size} m²
        </div>
      </div>

      {/* Room Details and Pricing */}
      <div className="w-full flex bg-white justify-between">
        <div className="w-full lg:w-2/3 p-4 flex flex-col">
          <h4 className="text-2xl font-semibold mb-2 text-gray-800">{room.title}</h4>
          <p className="text-lg text-gray-600 flex items-center">
            <Icon icon="fa-solid:utensils" className="mr-2 w-4 h-4" />
            {room.mealPlans && room.mealPlans.length > 0 
              ? "Có phục vụ bữa ăn" 
              : "Không phục vụ bữa ăn"}
          </p>
          <p className="text-lg text-[#298C94] flex items-center">
            <Icon icon="fa-solid:calendar-alt" className="mr-2 w-4 h-4" />
            {room.refundPolicy}
          </p>
        </div>
        <div className="flex justify-between items-end mt-8 p-6">
          <div className="text-right">
            <p className="text-xl font-bold text-[#03387E]">{room.price.toLocaleString()}₫</p>
            <p className="text-sm text-gray-500">Giá 1 đêm đã bao gồm thuế</p>
            <button className="bg-[#03387E] text-white px-8 py-2 rounded-md hover:bg-blue-500 mt-2 transition-colors duration-200">
              Đặt
            </button>
            {/* Display availability message */}
            <p className="text-sm text-red-500 mt-2">
              {room.availability > 0 ? `Còn ${room.availability} phòng` : "Hết phòng"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
