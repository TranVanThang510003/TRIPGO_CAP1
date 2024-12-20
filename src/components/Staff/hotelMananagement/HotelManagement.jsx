import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/Header";
import SideBar from "../../UserProfile/SideBar";
import axios from "axios";

const TOUR_PER_PAGE = 12;

const HotelManagement = () => {
    const navigate = useNavigate();

    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [filters, setFilters] = useState({ hotelName: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalHotels, setTotalHotels] = useState(0);
    const [selectedSection, setSelectedSection] = useState("hotels");

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("http://localhost:3000/hotels");
                setHotels(response.data.data || []);
                setFilteredHotels(response.data.data || []);
                setTotalHotels(response.data.data?.length || 0);
            } catch (error) {
                console.error("Lỗi khi tải danh sách khách sạn:", error);
            }
        };

        fetchHotels();
    }, []);

    const applyFilters = () => {
        let filtered = hotels;

        if (filters.hotelName) {
            filtered = filtered.filter((hotel) =>
                hotel.HOTEL_NAME.toLowerCase().includes(filters.hotelName.toLowerCase())
            );
        }

        setFilteredHotels(filtered);
        setCurrentPage(1);
    };

    useEffect(() => {
        applyFilters();
    }, [filters, hotels]);

    const totalPages = Math.ceil(filteredHotels.length / TOUR_PER_PAGE);
    const paginatedHotels = filteredHotels.slice(
        (currentPage - 1) * TOUR_PER_PAGE,
        currentPage * TOUR_PER_PAGE
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Xử lý xem chi tiết
    const handleViewClick = (hotelId) => {
        navigate(`/hotels/${hotelId}`);
    };

    // Xử lý xóa khách sạn
    const handleDeleteClick = async (hotelId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa khách sạn này?")) return;

        try {
            await axios.delete(`http://localhost:3000/hotels/${hotelId}`);
            setHotels(hotels.filter((hotel) => hotel.HOTEL_ID !== hotelId));
            alert("Xóa khách sạn thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa khách sạn:", error);
            alert("Xóa khách sạn thất bại!");
        }
    };

    return (
        <div className="bg-[#f8f8f8] w-full min-h-screen overflow-auto relative">
            <Header />
            <div className="flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-6 mt-4">
                <div className="mr-2 fixed">
                    <SideBar selectedSection={selectedSection} onSectionChange={setSelectedSection} />
                </div>

                <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0 ml-[300px]">
                    <h1 className="text-2xl font-semibold mb-4">Danh Sách Khách Sạn</h1>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                            <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                <th className="p-4 text-left font-semibold uppercase">ID</th>
                                <th className="p-4 text-left font-semibold uppercase">Tên Khách Sạn</th>
                                <th className="p-4 text-left font-semibold uppercase">Địa Chỉ</th>
                                <th className="p-4 text-left font-semibold uppercase">Hành Động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedHotels.map((hotel, index) => (
                                <tr
                                    key={hotel.HOTEL_ID}
                                    className={`hover:bg-blue-50 ${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } transition-all duration-200`}
                                >
                                    <td className="p-4 border-b border-gray-200">{hotel.HOTEL_ID}</td>
                                    <td className="p-4 border-b border-gray-200 font-medium text-gray-700">
                                        {hotel.HOTEL_NAME}
                                    </td>
                                    <td className="p-4 border-b border-gray-200 text-gray-600">
                                        {hotel.ADDRESS}, {hotel.WARD}, {hotel.DISTRICT}, {hotel.PROVINCE}
                                    </td>
                                    <td className="p-4 border-b border-gray-200 flex gap-2">
                                        {/* Nút Xem */}
                                        <button
                                            onClick={() => handleViewClick(hotel.HOTEL_ID)}
                                            className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-all duration-200"
                                        >
                                            Xem
                                        </button>
                                        {/* Nút Sửa */}
                                        <button
                                            onClick={() => handleDeleteClick(hotel.HOTEL_ID)}
                                            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-red-600 transition-all duration-200"
                                        >
                                            Sửa
                                        </button>

                                        {/* Nút Xóa */}
                                        <button
                                            onClick={() => handleDeleteClick(hotel.HOTEL_ID)}
                                            className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-all duration-200"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Trước
                        </button>
                        <span className="px-4 py-2">
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Tiếp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelManagement;
