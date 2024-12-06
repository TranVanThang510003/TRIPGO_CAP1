    import { useState, useEffect } from "react";
    import ShowCardExpired from "./ShowCardExpired";
    import Pagination from "../common/Pagination";
    import ShowInfoCardExpired from "./ShowInfoCardExpired";

    const TOUR_PER_PAGE = 8;

    const ListCardExpired = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataTour, setDataTour] = useState();
    const [selectedTour, setSelectedTour] = useState(null); // Quản lý thông tin card được chọn

    useEffect(() => {
        const fetchTour = async () => {
        try {
            const response = await fetch("http://localhost:3000/report/expire/:id");
            const result = await response.json();
            setDataTour(result);
            console.log("API Response:", result);
        } catch (error) {
            console.error(error.message);
            
        }
        
        };
        fetchTour();
    }, []);

    const totalPages = Math.ceil(dataTour?.length / TOUR_PER_PAGE);
    const currentTour = (dataTour || []).slice(
        (currentPage - 1) * TOUR_PER_PAGE,
        currentPage * TOUR_PER_PAGE
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        }
    };

    const handleCardClick = (tour) => {
        setSelectedTour(tour); // Lưu thông tin card được chọn
    };

    return (
        <div>
        {/* Nếu card được chọn, hiển thị thông tin chi tiết */}
        {selectedTour ? (
            <ShowInfoCardExpired
            tour={selectedTour}
            onClose={() => setSelectedTour(null)}
            />
        ) : (
            <div>
            <h1 className="font-bold text-3xl">Tour đã hết hạn</h1>
            <div className="grid grid-cols-4 gap-5">
                {currentTour.map((tour, index) => (
                <ShowCardExpired
                    key={index}
                    tour={tour}
                    onClick={handleCardClick}
                />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                />
            </div>
            </div>
        )}
        </div>
    );
    };

    export default ListCardExpired;
