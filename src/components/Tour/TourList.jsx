import { useState, useEffect } from 'react';
import TourCard from './TourCard';
import Pagination from '../common/Pagination';
import { fetchTours } from '../services/api';

const TOUR_PER_PAGE = 12; // Số lượng tour hiển thị trên mỗi trang

const TourList = ({
                    priceOrder,
                    ratingOrder,
                    selectedTourTypes,
                    priceRange,
                    selectedProvince,
                    selectedDate,
                    selectedDuration,
                    selectedLanguages,
                    selectedRating,
                  }) => {
  const [tours, setTours] = useState([]); // Dữ liệu tour sau khi lọc
  const [allTours, setAllTours] = useState([]); // Dữ liệu tour gốc
  const [currentPage, setCurrentPage] = useState(1);

  // Lấy toàn bộ dữ liệu từ API
  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await fetchTours();
        console.log('API response:', data);

        setAllTours(data.tours || []); // Lưu toàn bộ danh sách tour
        setTours(data.tours || []); // Hiển thị toàn bộ tour ban đầu

      } catch (error) {
        console.error('Lỗi khi lấy danh sách tours:', error);
      }
    };

    loadTours();
  }, []);

  // Lọc danh sách tour dựa trên tất cả các tiêu chí
  useEffect(() => {
    console.log('Selected Ratings:', selectedRating);

    let filteredTours = [...allTours]; // Bắt đầu với toàn bộ danh sách tour

    // Lọc theo tỉnh/thành phố
    if (selectedProvince) {
      filteredTours = filteredTours.filter(
          (tour) => tour.province === selectedProvince
      );
    }

    // Lọc theo ngày khởi hành
    if (selectedDate) {
      filteredTours = filteredTours.filter((tour) =>
          tour.scheduleData.some(
              (schedule) =>
                  new Date(schedule.departureDate).toDateString() ===
                  new Date(selectedDate).toDateString()
          )
      );
    }

    // Lọc theo loại tour
    if (selectedTourTypes.length > 0) {
      filteredTours = filteredTours.filter((tour) =>
          selectedTourTypes.includes(tour.tourType)
      );
    }

    // Lọc theo khoảng giá
    if (priceRange) {
      filteredTours = filteredTours.filter(
          (tour) =>
              tour.priceAdult >= priceRange[0] && tour.priceAdult <= priceRange[1]
      );
    }
    const serviceTypeMap = {
      "nhiều ngày": "Tour nhiều ngày",
      "trong ngày": "Tour trong ngày"
    };

    if (selectedDuration.length > 0) {
      filteredTours = filteredTours.filter((tour) =>
          selectedDuration.includes(serviceTypeMap[tour.serviceType] || tour.serviceType)
      );
    }


    if(selectedLanguages.length > 0) {
      filteredTours = filteredTours.filter((tour) =>
      selectedLanguages.includes(tour.language)
      );
    }

    // Lọc theo đánh giá (rating)
    if (selectedRating) {
      const minRating = parseFloat(selectedRating.replace('+', '')); // Lấy giá trị số từ chuỗi (ví dụ: "3.0+" => 3.0)
      filteredTours = filteredTours.filter((tour) => tour.averageRating >= minRating);
      console.log('Filtering tours with rating >=', minRating);
    }

    // Sắp xếp theo giá
    if (priceOrder === 'low-to-high') {
      filteredTours.sort((a, b) => a.priceAdult - b.priceAdult);
    } else if (priceOrder === 'high-to-low') {
      filteredTours.sort((a, b) => b.priceAdult - a.priceAdult);
    }

    // Sắp xếp theo đánh giá
    if (ratingOrder === 'high-to-low') {
      filteredTours.sort((a, b) => b.averageRating - a.averageRating);
    } else if (ratingOrder === 'low-to-high') {
      filteredTours.sort((a, b) => a.averageRating - b.averageRating);
    }

    console.log('Selected Durations:', selectedDuration);
    console.log('Filtered Tours:', filteredTours);


    setTours(filteredTours);
  }, [
    selectedProvince,
    selectedDate,
    selectedTourTypes,
    selectedDuration,
    selectedLanguages,
    selectedRating,
    priceRange,
    priceOrder,
    ratingOrder,
    allTours,
  ]);

  if (!Array.isArray(tours) || tours.length === 0) {
    return <p>Không có dữ liệu tours</p>;
  }

  const totalPages = Math.ceil(tours.length / TOUR_PER_PAGE);

  const currentTours = tours.slice(
      (currentPage - 1) * TOUR_PER_PAGE,
      currentPage * TOUR_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    }
  };

  return (
      <div className="flex flex-wrap gap-8 w-full">
        {/* Hiển thị danh sách tour */}
        {currentTours.length > 0 ? (
            currentTours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        ) : (
            <p>Không tìm thấy tour phù hợp.</p>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
            <div className="flex justify-center w-full mt-4">
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
              />
            </div>
        )}
      </div>
  );
};

export default TourList;
