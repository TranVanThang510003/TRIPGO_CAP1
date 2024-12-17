import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import SideBar from "../UserProfile/SideBar"; // Import SideBar
import TourCard from "../Tour/TourCard";
import Pagination from "../common/Pagination";
import { fetchToursByCreator } from "../../components/services/api"; // Import hàm mới

const TOUR_PER_PAGE = 12; // Số lượng tour hiển thị trên mỗi trang

const TourManagement = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Quản lý tour"); // Mục được chọn trong SideBar
  const [tours, setTours] = useState([]); // Danh sách tour đã nhận từ API
  const [filteredTours, setFilteredTours] = useState([]); // Danh sách tour đã lọc
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTours, setTotalTours] = useState(0); // Tổng số tour để tính toán phân trang
  const [creatorId, setCreatorId] = useState(null); // Tạo state cho creatorId
  const [filters, setFilters] = useState({
    tourName: "", // Lọc theo tên tour
    startDate: "", // Lọc theo ngày khởi hành
    status: "", // Lọc theo trạng thái
  });
// Hàm loại bỏ dấu trong chuỗi
  const removeVietnameseTones = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  // useEffect để lấy creatorId từ localStorage
  useEffect(() => {
    const creatorId = JSON.parse(localStorage.getItem("user"))?.id;
    if (creatorId) {
      setCreatorId(parseInt(creatorId)); // Chuyển thành số và lưu vào state
    } else {
      console.error("Không tìm thấy creatorId trong localStorage");
    }
  }, []);

  // Lấy dữ liệu tour từ API
  useEffect(() => {
    const loadToursByCreator = async () => {
      if (!creatorId) return;

      try {
        // Gọi API để lấy danh sách các tour của người tạo cụ thể
        const data = await fetchToursByCreator(creatorId, currentPage, TOUR_PER_PAGE);
        console.log("API response for tours by creator:", data);
        setTours(data.tours || []);
        setTotalTours(data.totalCount || 0);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tours theo người tạo:", error);
      }
    };

    loadToursByCreator();
  }, [currentPage, creatorId]); // Chạy lại khi currentPage hoặc creatorId thay đổi

  // Lọc danh sách tour dựa trên các bộ lọc
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...tours]; // Sử dụng bản sao của danh sách tours


      // Lọc theo tên tour (bỏ qua dấu)
      if (filters.tourName) {
        filtered = filtered.filter(tour =>
            removeVietnameseTones(tour.name.toLowerCase())
                .includes(removeVietnameseTones(filters.tourName.toLowerCase()))
        );
      }

      // Lọc theo trạng thái tour
      if (filters.status) {
        filtered = filtered.filter(tour =>
            tour.status.toLowerCase() === filters.status.toLowerCase()
        );
      }



      setFilteredTours(filtered); // Cập nhật danh sách tour đã lọc
    };

    applyFilters(); // Áp dụng bộ lọc mỗi khi danh sách tour hoặc bộ lọc thay đổi
  }, [tours, filters]); // Chạy lại mỗi khi danh sách tour hoặc filters thay đổi

  // Tính toán số trang cho phân trang
  const totalPages = Math.ceil(filteredTours.length / TOUR_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };



  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  // Cắt danh sách tour theo trang hiện tại
  const paginatedTours = filteredTours.slice(
      (currentPage - 1) * TOUR_PER_PAGE,
      currentPage * TOUR_PER_PAGE
  );

  return (
      <div  className='bg-[#f8f8f8] w-full min-h-screen overflow-auto relative'>
        <Header/>
        <div className=' flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-6 mt-4 '>
          <div className='mr-2 fixed'>
          <SideBar selectedSection={selectedSection} onSectionChange={setSelectedSection}/>
          </div>


        {/* Main content */}
        <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0 ml-[300px]">
          <h1 className="text-[30px] text-[#181E4B] font-bold mb-2">Quản lý tour</h1>

          {/* Bộ lọc */}
          <div className="flex gap-4 mb-6">
              <input
                  type="text"
                  name="tourName"
                  value={filters.tourName}
                  onChange={handleFilterChange}
                  placeholder="Tìm tour theo tên"
                  className="p-2 border rounded"
              />


              <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="p-2 border rounded"
              >
                <option value="">Chọn trạng thái</option>
                <option value="Đang hoạt động">Đang hoạt động</option>
                <option value="Sắp bắt đầu">Sắp bắt đầu</option>
                <option value="Đã kết thúc">Đã kết thúc</option>
              </select>

            </div>

            {/* Hiển thị danh sách tour */}
            <div className="flex flex-wrap gap-8 w-full ml-6">
              {paginatedTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center w-full mt-4">
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default TourManagement;
