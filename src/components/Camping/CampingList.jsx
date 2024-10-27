import { useState } from "react";
import CampingCard from "./CampingCard";
import Pagination from "../common/Pagination";
const campingData = [
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "0123456789",
  },
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "01211111111",
  },
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "01235555555",
  },
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "0123456789",
  },
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "01211111111",
  },
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "01235555555",
  },
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "0123456789",
  },
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "01211111111",
  },
  {
    name: "Cabanon Palace",
    imageUrl:
      "https://kconceptvn.com/wp-content/uploads/2020/04/hotel-photography-chup-anh-khach-san-khach-san-bamboo-sapa-hotel-18-1024x683.jpg",
    location: "Phước Mỹ",
    rating: 4.5,
    reviews: "5K",
    phone_nb: "01235555555",
  },
];
const CAMPING_PER_PAGE = 6;
const CampingList = () => {
  // Trạng thái quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán số trang
  const totalPages = Math.ceil(campingData.length / CAMPING_PER_PAGE);

  // Lấy danh sách khách sạn cho trang hiện tại
  const currentCamping = campingData.slice(
    (currentPage - 1) * CAMPING_PER_PAGE,
    currentPage * CAMPING_PER_PAGE
  );

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="flex flex-wrap justify-between">
      {currentCamping.map((camping, index) => (
        <CampingCard key={index} camping={camping} />
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

export default CampingList;
