import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const SpecialOffer = () => {
    const [favorites, setFavorites] = useState([]); // Lưu trạng thái yêu thích
    const [tours, setTours] = useState([]); // Lưu dữ liệu tour
    const navigate = useNavigate();
    // Gọi API để lấy dữ liệu tours
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get("http://localhost:3000/public-tours/top-tours");
                setTours(response.data.tours);
                setFavorites(new Array(response.data.tours.length).fill(false)); // Tạo mảng trạng thái yêu thích
            } catch (error) {
                console.error("Error fetching tours:", error.message);
            }
        };

        fetchTours();
    }, []);

    // Hàm toggle trạng thái yêu thích
    const toggleFavorite = (index) => {
        const newFavorites = [...favorites];
        newFavorites[index] = !newFavorites[index];
        setFavorites(newFavorites);
    };

    // Hàm định dạng giá trị tiền tệ
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="flex flex-col items-center py-12 bg-gray-100 mt-16">
            {/* Tiêu đề */}
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Tour Du Lịch Phổ Biến</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.length > 0 ? (
                    tours.map((tour, index) => (
                        <div
                            key={tour.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
                        >
                            {/* Hình ảnh */}
                            <div className="relative">
                                <img
                                    src={`http://localhost:3000${tour.imageUrl}`}
                                    alt={tour.name}
                                    className="w-full h-48 object-cover"
                                />
                                {/* Nút yêu thích */}
                                <button
                                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                                    onClick={() => toggleFavorite(index)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill={favorites[index] ? "#ff6b6b" : "white"}
                                        viewBox="0 0 24 24"
                                        stroke="#ff6b6b"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Nội dung */}
                            <div className="flex flex-col justify-between flex-grow">
                                <div className="p-4">
                                    {/* Loại tour và thời lượng */}
                                    <div className="flex justify-between items-center mb-3">
                    <span className="bg-pink-200 text-pink-600 px-3 py-1 rounded-full text-xs">
                      {tour.tourType}
                    </span>
                                        <span className="text-gray-500 text-sm">{tour.duration || "N/A"} ngày</span>
                                    </div>
                                    {/* Tên tour */}
                                    <h2 className="text-lg font-semibold text-gray-800">{tour.name}</h2>
                                    {/* Địa điểm */}
                                    <p className="text-gray-600 text-sm mt-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 inline text-pink-400 mr-1"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2C8.134 2 5 5.134 5 9c0 4.25 4.209 10.521 6.067 12.977.614.811 1.865.811 2.478 0C14.791 19.521 19 13.25 19 9c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {tour.province}
                                    </p>
                                    {/* Đánh giá và lượt đặt */}
                                    <p className="text-gray-600 text-sm mt-2">
                                        <span className="text-yellow-500">★ {tour.averageRating || "0.0"}</span>{" "}
                                        ({tour.reviewCount || 0} đánh giá) - {tour.nubBooking || 0} lượt đặt
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center p-4 border-t">
                                    <p className="text-lg font-bold text-gray-900">
                                        {formatCurrency(tour.priceAdult)}
                                    </p>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => navigate(`/tours/${tour.id}`)}
                                    >
                                        Đặt ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Không có tour nào để hiển thị.</p>
                )}
            </div>
        </div>
    );
};

export default SpecialOffer;
