import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import RestaurantCard from "./RestaurantCard";

// const restaurantData = [
//   {
//     name: "Cabanon Palace",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: "Kiểu Pháp",
//     location: "Phước Mỹ",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đang mở cửa",
//   },
//   {
//     name: "Cabanon ",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: " kiểu Âu",
//     location: "Phước Mỹ, Sơn Trà, Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đóng cửa",
//   },
//   {
//     name: "Cadsfsdf",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: "Kieu uc",
//     location: "Phước Mỹ, Sơn Trà, Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đang mở cửa",
//   },
//   {
//     name: "Cabanon Palace",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: "Kiểu Pháp",
//     location: "Phước Mỹ",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đang mở cửa",
//   },
//   {
//     name: "Cabanon ",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: " kiểu Âu",
//     location: "Phước Mỹ, Sơn Trà, Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đóng cửa",
//   },
//   {
//     name: "Cadsfsdf",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: "Kieu uc",
//     location: "Phước Mỹ, Sơn Trà, Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đang mở cửa",
//   },
//   {
//     name: "Cabanon Palace",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: "Kiểu Pháp",
//     location: "Phước Mỹ",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đang mở cửa",
//   },
//   {
//     name: "Cabanon ",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: " kiểu Âu",
//     location: "Phước Mỹ, Sơn Trà, Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đóng cửa",
//   },
//   {
//     name: "Cadsfsdf",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: "Kieu uc",
//     location: "Phước Mỹ, Sơn Trà, Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đang mở cửa",
//   },
//   {
//     name: "Cabanon Palace",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: "Kiểu Pháp",
//     location: "Phước Mỹ",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đang mở cửa",
//   },
//   {
//     name: "Cabanon ",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: " kiểu Âu",
//     location: "Phước Mỹ, Sơn Trà, Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đóng cửa",
//   },
//   {
//     name: "Cadsfsdf",
//     imageUrl:
//       "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
//     type: "Kieu uc",
//     location: "Phước Mỹ, Sơn Trà, Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K",
//     status: "Đang mở cửa",
//   },
// ];

const HOTELS_PER_PAGE = 9;
const RestautantList = () => {
  // Trạng thái quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  //Goi API
  const [dataRestaurant, setDataRestaurant] = useState();
  useEffect(() => {
    try {
      const fetchTour = async () => {
        const response = await fetch("http://localhost:8000/restaurant");
        const result = await response.json();
        console.log({ result });
        setDataRestaurant(result);
      };
      fetchTour();
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  // Tính toán số trang
  const totalPages = Math.ceil(dataRestaurant?.length / HOTELS_PER_PAGE);

  // Lấy danh sách khách sạn cho trang hiện tại
  const currentRestaurant = (dataRestaurant || []).slice(
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
    <div className="flex flex-wrap justify-between">
      {currentRestaurant.map((restaurant, index) => (
        <RestaurantCard key={index} restaurant={restaurant} />
      ))}

      <div className="flex ml-[350px]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RestautantList;
