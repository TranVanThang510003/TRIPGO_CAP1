import { useState, useEffect } from "react";
import TourCard from "./TourCard";
import Pagination from "../common/Pagination";
import { fetchTours } from "../services/api"; // Import fetchTours từ api.js

const TOUR_PER_PAGE = 9;

// eslint-disable-next-line react/prop-types
const TourList = ({ priceOrder, ratingOrder }) => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await fetchTours(currentPage, TOUR_PER_PAGE, priceOrder, ratingOrder);
        console.log("API response:", data);
        setTours(data.tours || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tours:", error);
      }
    };

    loadTours();
  }, [currentPage, priceOrder, ratingOrder]);

  if (!Array.isArray(tours) || tours.length === 0) {
    return <p>Không có dữ liệu tours</p>;
  }

  const totalPages = Math.ceil(tours.length / TOUR_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-wrap justify-between w-full">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
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

export default TourList;
