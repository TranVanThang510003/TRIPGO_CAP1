import React, { useEffect, useState } from 'react';
import FavouriteCard from './FavouriteCard';
import { useNavigate } from "react-router-dom";
import { fetchFavorites } from "../services/api.js"; // Giả sử bạn đã có hàm này
import Pagination from "../common/Pagination.jsx";

const TOUR_PER_PAGE = 12; // Số lượng tour hiển thị trên mỗi trang

const FavouriteList = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState("Quản lý tour"); // Mục được chọn trong SideBar
    const [tours, setTours] = useState([]); // Danh sách tour đã nhận từ API
    const [filteredTours, setFilteredTours] = useState([]); // Danh sách tour đã lọc
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTours, setTotalTours] = useState(0); // Tổng số tour để tính toán phân trang
    const [userId, setUserId] = useState(null);

    // useEffect để lấy userId từ localStorage
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        if (userId) {
            setUserId(parseInt(userId)); // Chuyển thành số và lưu vào state
        } else {
            console.error("Không tìm thấy userId trong localStorage");
        }
    }, []);

    // Lấy dữ liệu yêu thích từ API
    useEffect(() => {
        const loadFavorites = async () => {
            if (!userId) return;

            try {
                // Gọi API để lấy danh sách các tour yêu thích của người dùng
                const data = await fetchFavorites(userId, currentPage, TOUR_PER_PAGE);
                console.log("API response:", data);
                setTours(data.tours || []); // Gán dữ liệu tour vào state
                setTotalTours(data.totalCount || 0); // Cập nhật tổng số tour
                setFilteredTours(data.tours || []); // Cập nhật danh sách filteredTours
            } catch (error) {
                console.error("Lỗi khi lấy danh sách yêu thích:", error);
            }
        };

        loadFavorites();
    }, [currentPage, userId]); // Khi currentPage hoặc userId thay đổi, gọi lại API

    // Tính toán số trang
    const totalPages = Math.ceil(totalTours / TOUR_PER_PAGE); // Lấy tổng số trang từ tổng số tour và số tour trên mỗi trang

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber); // Chuyển đến trang được chọn
        }
    };

    // Cắt danh sách tour theo trang hiện tại
    const paginatedTours = filteredTours.slice(
        (currentPage - 1) * TOUR_PER_PAGE,
        currentPage * TOUR_PER_PAGE
    );

    return (
        <div className="flex flex-wrap gap-6 w-full">
            {/* Hiển thị danh sách tour */}
            {paginatedTours.length > 0 ? (
                paginatedTours.map((tour) => <FavouriteCard key={tour.id} tour={tour} />)
            ) : (
                <p>Không tìm thấy tour yêu thích nào.</p>
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

export default FavouriteList;
