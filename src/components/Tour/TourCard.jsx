import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import locationIcon from '@iconify/icons-mdi/map-marker'; // Biểu tượng vị trí
import starIcon from '@iconify/icons-mdi/star'; // Biểu tượng sao
import IconHeart from '../icon/IconHeart';

const TourCard = ({ tour }) => {
  const navigate = useNavigate(); // Khởi tạo hook navigate

  // Chuẩn hóa đường dẫn imageUrl
  const handleBookNowClick = () => {
    navigate(`/tours/${tour.id}`); // Chuyển hướng đến trang chi tiết tour với ID tương ứng
  };

  // Hàm xác định màu sắc cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'Sắp bắt đầu':
        return 'text-orange-500'; // Màu cam
      case 'Đã bắt đầu':
        return 'text-green-500'; // Màu xanh lá
      case 'Đã hoàn thành':
        return 'text-gray-500'; // Màu xám
      default:
        return 'text-black'; // Màu mặc định
    }
  };

  return (
    <div className="w-[260px] mt-4 rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Hình ảnh tour */}
      <div className="relative">
        <img
          className="w-full h-[150px] object-cover"
          src={`http://localhost:3000${tour.imageUrl}`} // Sử dụng đường dẫn từ API
          alt={tour.name}
        />
        <button className="absolute top-2 right-2 p-2">
          <IconHeart />
        </button>
      </div>

      {/* Nội dung */}
      <div className="p-3 mt-2">
        <div className="flex text-sm">
          <div className="bg-pink-200 text-pink-600 font-medium rounded-full w-auto h-[22px] flex items-center px-2 justify-center">
            {tour.tourType}
          </div>
          <p className="ml-5 text-slate-500">{tour.duration} ngày</p>
        </div>
        <h2 className="text-xl font-bold text-blue-900 mt-3">{tour.name}</h2>
        <div className="text-sm flex mt-3">
          <Icon
            icon={locationIcon}
            width="18"
            height="18"
            className="text-pink-400"
          />
          <p className="text-gray-700 ml-1">{tour.province}</p>
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
          <p className="text-gray-500 ml-2">
            {tour.nub_booking} / {tour.AdultCount} đặt chỗ
          </p>
        </div>

        {/* Hiển thị trạng thái với màu sắc */}
        <p
          className={`text-sm font-bold ml-2 mt-2 ${getStatusColor(
            tour.status
          )}`}
        >
          {tour.status}
        </p>

        <div className="text-xl flex justify-between items-center mt-4">
          <h1 className="text-gray-700 font-bold">{tour.priceAdult} đ/Người</h1>
          <button
            className="h-[37px] w-[80px] bg-blue-900 text-white rounded-2xl hover:bg-blue-700 text-sm"
            onClick={handleBookNowClick} // Thêm sự kiện click
          >
            Xem
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
