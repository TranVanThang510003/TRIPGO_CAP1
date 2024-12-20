import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/hotels/${hotel.HOTEL_ID}`);
  };

  // Lấy ảnh đầu tiên từ IMAGE_URLS
  const imageUrl = hotel.IMAGE_URLS?.split(", ")[0] || "/placeholder.jpg";

  // Dữ liệu sao, đánh giá, lượt đặt, và giá
  const stars = hotel.HOTEL_TYPE || 0; // Số sao khách sạn
  const rating = hotel.RATING || 0; // Điểm rating
  const reviewCount = hotel.REVIEW_COUNT || 0; // Tổng lượt đánh giá
  const bookings = hotel.NUM_BOOKED || 0; // Tổng lượt đặt
  const price = hotel.PRICE ? `${hotel.PRICE.toLocaleString()}đ/đêm` : "Liên hệ để biết giá";

  return (
      <div className="flex bg-white rounded-lg shadow-md p-6 space-x-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
        {/* Hình ảnh */}
        <div className="relative flex-shrink-0 w-48 h-48">
          <img
              src={`http://localhost:3000/${imageUrl}`}
              alt={hotel.HOTEL_NAME}
              className="rounded-lg w-full h-full object-cover"
          />
        </div>

        {/* Thông tin khách sạn */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{hotel.HOTEL_NAME}</h3>

          {/* Số sao */}
          <div className="flex items-center space-x-1 mt-2">
            {[...Array(stars)].map((_, i) => (
                <Icon key={i} icon="mdi:star" className="text-blue-500 text-lg" />
            ))}
          </div>

          {/* Tiện ích */}
          <div className="flex space-x-2 mt-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">Mát-xa</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">Dịch vụ Spa</span>
          </div>

          {/* Các thông tin đặc biệt */}
          <div className="flex items-center space-x-4 text-green-600 mt-2">
            <span>✔ Miễn phí hủy phòng</span>
            <span>✔ Không thanh toán ngay</span>
          </div>

          {/* Địa chỉ */}
          <div className="text-gray-600 mt-2">
            📍 {hotel.ADDRESS}, {hotel.WARD}, {hotel.DISTRICT}, {hotel.PROVINCE}
          </div>

          {/* Đánh giá và lượt đặt */}
          <div className="flex items-center space-x-4 mt-2 text-gray-700">
          <span className="flex items-center">
            <Icon icon="mdi:star" className="text-yellow-500 text-lg" />
            <span className="ml-1 font-medium">{rating}/5</span>
          </span>
            <span>({reviewCount.toLocaleString()} đánh giá)</span>
            <span>{bookings.toLocaleString()} lượt đặt</span>
          </div>
        </div>

        {/* Giá và nút */}
        <div className="flex flex-col justify-end items-end text-right">
          <div className="text-2xl font-bold text-blue-600">{price}</div>
          <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
              onClick={handleViewDetail}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    HOTEL_ID: PropTypes.number.isRequired,
    HOTEL_NAME: PropTypes.string.isRequired,
    DESCRIPTION: PropTypes.string,
    ADDRESS: PropTypes.string,
    PROVINCE: PropTypes.string,
    DISTRICT: PropTypes.string,
    WARD: PropTypes.string,
    IMAGE_URLS: PropTypes.string,
    HOTEL_TYPE: PropTypes.number, // Số sao
    RATING: PropTypes.number, // Điểm rating
    REVIEW_COUNT: PropTypes.number, // Lượt đánh giá
    NUM_BOOKED: PropTypes.number, // Lượt đặt phòng
    PRICE: PropTypes.number, // Giá phòng
  }).isRequired,
};

export default HotelCard;
