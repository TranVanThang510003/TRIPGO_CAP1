import { useState, useEffect } from 'react';
import TourCard from './TourCard';
import Pagination from '../common/Pagination';
import { fetchTours } from '../services/api'; // Import fetchTours từ api.js

const TOUR_PER_PAGE = 9; // Số lượng tour hiển thị trên mỗi trang

const TourList = ({ priceOrder, ratingOrder, selectedTourTypes }) => {
  const [tours, setTours] = useState([]); // Dữ liệu tour sau khi lọc
  const [allTours, setAllTours] = useState([]); // Dữ liệu tour gốc
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await fetchTours(currentPage, TOUR_PER_PAGE);
        console.log('API response:', data);

        setAllTours(data.tours || []); // Lưu toàn bộ danh sách tour
        setTours(data.tours || []); // Hiển thị toàn bộ tour ban đầu
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tours:', error);
      }
    };

    loadTours();
  }, [currentPage]);

  // Lọc danh sách tour dựa trên `selectedTourTypes`
  useEffect(() => {
    if (selectedTourTypes.length > 0) {
      const filteredTours = allTours.filter((tour) =>
        selectedTourTypes.includes(tour.tourType)
      );
      setTours(filteredTours);
    } else {
      setTours(allTours); // Nếu không chọn gì, hiển thị tất cả tour
    }
  }, [selectedTourTypes, allTours]);

  if (!Array.isArray(tours) || tours.length === 0) {
    return <p>Không có dữ liệu tours</p>;
  }

  const totalPages = Math.ceil(tours.length / TOUR_PER_PAGE); // Tính số trang

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    }
  };

  return (
    <div className="flex flex-wrap justify-between w-full">
      {tours
        .slice((currentPage - 1) * TOUR_PER_PAGE, currentPage * TOUR_PER_PAGE)
        .map((tour) => (
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
