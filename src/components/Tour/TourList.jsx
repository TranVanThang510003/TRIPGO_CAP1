// src/components/Tour/TourList.jsx
import { useState, useEffect } from "react";
import TourCard from "./TourCard";
import Pagination from "../common/Pagination";
import { fetchTours } from "../services/api"; // Import fetchTours từ api.js

const TOUR_PER_PAGE = 9; // Số lượng tour hiển thị trên mỗi trang

const TourList = ({ priceOrder, ratingOrder }) => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTours, setTotalTours] = useState(0); // Tổng số tour để tính toán phân trang

  useEffect(() => {
    const loadTours = async () => {
      try {
        // Gọi API để lấy danh sách các tour
        const data = await fetchTours(currentPage, TOUR_PER_PAGE, priceOrder, ratingOrder);
        console.log("API response:", data);
        setTours(data.tours || []);
        setTotalTours(data.totalCount || 0); // Cập nhật tổng số tour
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tours:", error);
      }
    };

    loadTours();
  }, [currentPage, priceOrder, ratingOrder]);

  if (!Array.isArray(tours) || tours.length === 0) {
    return <p>Không có dữ liệu tours</p>;
  }

  const totalPages = Math.ceil(totalTours / TOUR_PER_PAGE); // Tính số trang

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    }
  };

  return (
    <div className="flex flex-wrap justify-between w-full">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}

      <div className="flex justify-center w-full mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TourList;
