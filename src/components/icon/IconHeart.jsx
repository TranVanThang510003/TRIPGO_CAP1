import React, { useState, useEffect } from "react";

const IconHeart = ({
                       tourId, // tourId là ID của tour để theo dõi trạng thái yêu thích
                       defaultLiked = true, // Màu mặc định nếu không có trạng thái
                       liked = false, // Trạng thái yêu thích khi được truyền từ ngoài
                       className = "", // Class name để thêm kiểu vào icon
                       onChange = () => {}, // Callback khi trạng thái yêu thích thay đổi
                   }) => {
    const [isLiked, setIsLiked] = useState(liked); // Trạng thái yêu thích
    const [loading, setLoading] = useState(false); // Trạng thái loading khi gọi API

    // Kiểm tra trạng thái yêu thích từ localStorage hoặc API khi component mount
    useEffect(() => {
        const syncFavoriteStatus = async () => {
            const userId = JSON.parse(localStorage.getItem('user'))?.id;
            if (!userId) return;

            try {
                // Kiểm tra trạng thái yêu thích từ API
                const response = await fetch(`http://localhost:3000/users/favorites/${userId}`);
                const result = await response.json();
                const favorites = result.tours || [];

                // Kiểm tra xem tour này có trong danh sách yêu thích từ API
                const isFavoriteFromAPI = favorites.some(favorite => favorite.id === tourId);
                setIsLiked(isFavoriteFromAPI);
            } catch (error) {
                console.error('Lỗi khi đồng bộ trạng thái yêu thích:', error.message);
            }
        };

        syncFavoriteStatus();
    }, [tourId]); // Đảm bảo chỉ gọi lại khi tourId thay đổi

    // Hàm xử lý khi click vào icon yêu thích
    const handleClick = async () => {
        setLoading(true); // Bắt đầu loading khi thực hiện thao tác

        try {
            // Lật ngược trạng thái yêu thích
            const updatedLikedStatus = !isLiked;
            setIsLiked(updatedLikedStatus); // Cập nhật trạng thái ngay lập tức

            // Cập nhật trạng thái vào localStorage
            localStorage.setItem(`likedTour_${tourId}`, JSON.stringify(updatedLikedStatus));

            const userId = JSON.parse(localStorage.getItem('user'))?.id;
            if (!userId) return;

            // Gửi yêu cầu đến API để cập nhật trạng thái yêu thích
            const response = await fetch('http://localhost:3000/users/favorite', {
                method: "POST", // POST cho cả thêm và xóa yêu thích
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    favorite_type: 'tour',
                    entity_id: tourId,
                }),
            });

            if (response.ok) {
                console.log("Đã thay đổi trạng thái yêu thích thành công!");
            } else {
                console.error("Lỗi khi thao tác với yêu thích");
            }

            // Gọi callback (nếu có) để thông báo trạng thái yêu thích đã thay đổi
            onChange(updatedLikedStatus);
        } catch (error) {
            console.error("Lỗi kết nối với API", error);
        } finally {
            setLoading(false); // Kết thúc quá trình loading
        }
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill={defaultLiked ? (isLiked ? "red" : "none") : "none"} // Tô màu nếu đã yêu thích
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-heart ${className}`} // Thêm className vào để tùy chỉnh
            onClick={handleClick} // Xử lý sự kiện click
            role="button" // Cung cấp thông tin về nút cho người dùng sử dụng công cụ hỗ trợ
            aria-pressed={isLiked} // Xác định trạng thái của nút (được yêu thích hay không)
            tabIndex="0" // Đảm bảo có thể điều hướng bằng bàn phím
            onKeyPress={(e) => {
                // Cho phép tương tác qua bàn phím (Enter hoặc Space)
                if (e.key === "Enter" || e.key === " ") {
                    handleClick();
                }
            }}
            disabled={loading} // Disable khi đang loading
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
};

export default IconHeart;
