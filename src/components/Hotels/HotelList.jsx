import HotelCard from "./HotelCard"; // Đảm bảo đường dẫn đúng đến file HotelCard.jsx
import Pagination from "../common/Pagination";
import { useEffect, useState } from "react";
// Danh sách dữ liệu khách sạn
// const hotelData = [
//     {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     },
//     // Thêm các khách sạn khác vào đây
//     {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     }, {
//         name: 'Khách sạn Alibaba Đà Nẵng',
//         imageUrl: 'public/img/khachsan.jpg', // Thay thế bằng URL ảnh thực tế
//         stars: 4,
//         amenities: ['Mát-xa', 'Dịch vụ Spa'],
//         location: 'Phước Mỹ, Sơn Trà, Đà Nẵng',
//         rating: 4.5,
//         reviews: '5K',
//         price: '564,000',
//     },
// ];

const HOTELS_PER_PAGE = 7;

const HotelList = () => {
  // Trạng thái quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  //Goi API
  const [dataHotel, setDataHotel] = useState();
  useEffect(() => {
    try {
      const fetchTour = async () => {
        const response = await fetch("http://localhost:8000/hotels");
        const result = await response.json();
        console.log({ result });
        setDataHotel(result);
      };
      fetchTour();
    } catch (error) {
      console.error(error.message);
    }
  }, []);
  // Tính toán số trang
  const totalPages = Math.ceil(dataHotel?.length / HOTELS_PER_PAGE);

  // Lấy danh sách khách sạn cho trang hiện tại
  const currentHotels = (dataHotel || []).slice(
    (currentPage - 1) * HOTELS_PER_PAGE,
    currentPage * HOTELS_PER_PAGE
  );

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {/* Danh sách khách sạn */}
      <div className="grid grid-cols-1 gap-4 w-full">
        {currentHotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>

      {/* Phân trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HotelList;
