import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import IconHeart from "../icon/IconHeart";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/hoteldetails/${hotel.id.toString()}`);
  };

  // Xử lý mảng tiện nghi
  const amenities = hotel.amenities ? hotel.amenities.split(', ') : [];

  // Cung cấp giá trị mặc định cho stars nếu không có
  const stars = hotel.hotelType || 0; // Số sao mặc định là 0 nếu không tồn tại

  return (
    <div className="w-full h-auto mt-5 flex bg-white rounded-lg shadow-md p-4 space-x-4 border border-gray-200 box-border">
      {/* Hình ảnh khách sạn */}
      <div className="relative flex-shrink-0 w-64 h-64">
        <img
          src={`http://localhost:3000${hotel.imageUrl}`} 
          alt={hotel.name}
          className="rounded-lg w-full h-full object-cover"
        />

        <button className="absolute top-2 right-2 p-2">
          <IconHeart />
        </button>
      </div>

      {/* Thông tin khách sạn */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-customBlue">{hotel.name}</h3>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex text-customBlue">
              {[...Array(stars)].map((_, i) => (
                <Icon key={i} icon="mdi:star" className="text-2xl  text-customBlue" />
              ))}
            </div>
          </div>

          {/* Tiện ích */}
          <div className="flex space-x-2 mt-2">
            {amenities.map((amenity, idx) => (
              <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">
                {amenity}
              </span>
            ))}
          </div>

          <div className="mt-2">
            {hotel.isFreeCancellation && <div className="text-green-500">✓ Miễn phí hủy phòng</div>}
            <div className="text-gray-500 mt-1">📍 {hotel.location}</div>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <div className="text-customBlue flex">
              <span className="text-yellow-500">⭐ {hotel.averageRating}/5</span>
            </div>
            <span className="text-gray-500">({hotel.reviewCount || 0} đánh giá)</span>
            <span className="text-gray-500">({hotel.nubBooked || 0}K + lượt đặt)</span>
          </div>
        </div>
      </div>

      {/* Giá và nút */}
      <div className="flex flex-col justify-end items-end text-right">
        <div className="text-2xl font-bold text-customBlue">{hotel.price ? `${hotel.price}đ/đêm` : "Giá không có sẵn"}</div>
        <button
          className="mt-4 px-4 py-2 bg-customBlue text-white rounded-lg hover:bg-blue-700"
          onClick={handleViewDetail}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
