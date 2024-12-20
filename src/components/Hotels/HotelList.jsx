import { useState, useEffect } from "react";
import HotelCard from './HotelCard';
import Pagination from '../common/Pagination';
import axios from "axios";

const HOTELS_PER_PAGE = 7;

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadHotels = async () => {
            try {
                const response = await axios.get("http://localhost:3000/hotels"); // Gọi API
                setHotels(response.data.data || []);
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
        <div className=''>
            <div className="grid grid-cols-1 gap-4  pt-4 w-full">
                {currentHotels.map((hotel, index) => (
                    <HotelCard key={`${hotel.HOTEL_ID}-${index}`} hotel={hotel} />
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
