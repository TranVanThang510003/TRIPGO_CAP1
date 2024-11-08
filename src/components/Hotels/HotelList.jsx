import { useState, useEffect } from "react";
import HotelCard from './HotelCard'; 
import Pagination from '../common/Pagination';
import { fetchHotels } from "../services/api"; // Import fetchHotels từ api.js

const HOTELS_PER_PAGE = 7;

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadHotels = async () => {
            try {
                const data = await fetchHotels(); // Lấy dữ liệu khách sạn từ API
                setHotels(data.hotels || []); // Đặt hotels là mảng từ phản hồi API nếu tồn tại
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khách sạn:", error);
            }
        };

        loadHotels();
    }, []);

    const totalPages = Math.ceil(hotels.length / HOTELS_PER_PAGE);
    const currentHotels = hotels.slice(
        (currentPage - 1) * HOTELS_PER_PAGE,
        currentPage * HOTELS_PER_PAGE
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 w-full">
                {currentHotels.map((hotel, index) => (
                    <HotelCard key={`${hotel.id}-${index}`} hotel={hotel} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default HotelList;
