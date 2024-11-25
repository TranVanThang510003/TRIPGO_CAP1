import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import SideBar from "../UserProfile/SideBar"; // Import SideBar
import TourCard from "../Tour/TourCard";
import Pagination from "../common/Pagination";
import { fetchToursByCreator } from "../../components/services/api"; // Import hàm mới

const TOUR_PER_PAGE = 9; // Số lượng tour hiển thị trên mỗi trang

const TourManagement = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Quản lý tour"); // Mục được chọn trong SideBar
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTours, setTotalTours] = useState(0); // Tổng số tour để tính toán phân trang
  const [creatorId, setCreatorId] = useState(null); // Tạo state cho creatorId

  // useEffect để lấy creatorId từ localStorage
  useEffect(() => {
    // Lấy creatorId từ localStorage khi component được mount
    const creatorId = JSON.parse(localStorage.getItem("user")).id;// Kiểm tra "id" trong localStorage
    if (creatorId) {
      setCreatorId(parseInt(creatorId)); // Chuyển thành số và lưu vào state
    } else {
      console.error("Không tìm thấy creatorId trong localStorage");
    }
  }, []);

  useEffect(() => {
    const loadToursByCreator = async () => {
      if (!creatorId) return; // Nếu không có creatorId thì không làm gì

      try {
        // Gọi API để lấy danh sách các tour của người tạo cụ thể
        const data = await fetchToursByCreator(creatorId, currentPage, TOUR_PER_PAGE);
        console.log("API response for tours by creator:", data);
        setTours(data.tours || []);
        setTotalTours(data.totalCount || 0); // Cập nhật tổng số tour
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tours theo người tạo:", error);
      }
    };

    loadToursByCreator();
  }, [currentPage, creatorId]);

  if (!Array.isArray(tours) || tours.length === 0) {
    return <p>Không có tour nào do người dùng này tạo</p>;
  }

  const totalPages = Math.ceil(totalTours / TOUR_PER_PAGE); // Tính số trang

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    }
  };

  return (
    <div className='bg-[#f8f8f8] w-full min-h-screen overflow-auto'>
      <Header />

      <div className="w-full flex flex-col md:flex-row gap-4 h-auto bg-[#f8f8f8] mx-auto pt-16 md:pt-28 px-[10%]">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <SideBar 
            selectedSection={selectedSection} 
            onSectionChange={setSelectedSection} 
          />
        </div>

        {/* Main content */}
        <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0">
          <h1 className="text-[30px] text-[#181E4B] font-bold mb-2">Quản lý tour</h1>
          <div className="flex flex-wrap justify-between w-full">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

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
