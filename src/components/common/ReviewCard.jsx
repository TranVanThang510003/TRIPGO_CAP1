import React, { useState } from "react";

const ReviewCard = ({ review }) => {
    const MAX_TEXT_LENGTH = 400; // Giới hạn ký tự nội dung
    const MAX_IMAGES = 5; // Giới hạn số ảnh hiển thị

    const [isTextExpanded, setIsTextExpanded] = useState(false); // Trạng thái mở rộng nội dung
    const [showAllImages, setShowAllImages] = useState(false); // Trạng thái hiển thị tất cả ảnh

    // Hàm lấy ký tự đầu tiên của tên người dùng
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : "?";
    };

    return (
        <div className="border bg-white border-gray-200 rounded-xl p-6 shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
            {/* Header: Avatar, Tên người dùng, Ngày */}
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold mr-4 shadow-md">
                    {getInitials(review.userName)}
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">{review.userName}</h4>
                    <p className="text-sm text-gray-500">
                        {new Date(review.reviewDate).toLocaleDateString()} {/* Hiển thị ngày đánh giá */}
                    </p>
                </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-3">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`inline-block text-3xl ${
                            index < review.rating ? "text-yellow-400 " : "text-gray-300"
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>

            {/* Nội dung đánh giá */}
            <p className="text-gray-700 mb-4 leading-relaxed">
                {isTextExpanded || review.comment.length <= MAX_TEXT_LENGTH
                    ? review.comment
                    : `${review.comment.substring(0, MAX_TEXT_LENGTH)}...`}
                {/* Nút "Xem thêm" nếu nội dung dài */}
                {review.comment.length > MAX_TEXT_LENGTH && (
                    <button
                        className="text-blue-600 text-sm underline ml-2 hover:text-blue-800"
                        onClick={() => setIsTextExpanded(!isTextExpanded)}
                    >
                        {isTextExpanded ? "Ẩn bớt" : "Xem thêm"}
                    </button>
                )}
            </p>

            {/* Hình ảnh */}
            {review.images?.length > 0 && (
                <div className="mt-4 grid grid-cols-5 gap-3">
                    {(showAllImages ? review.images : review.images.slice(0, MAX_IMAGES)).map(
                        (image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:3000/${image}`} // Thêm URL đầy đủ cho ảnh
                                alt={`Review Image ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            />
                        )
                    )}
                </div>
            )}
            {/* Nút "Xem thêm ảnh" nếu ảnh vượt quá giới hạn */}
            {review.images?.length > MAX_IMAGES && (
                <button
                    className="text-blue-600 text-sm underline mt-2 hover:text-blue-800"
                    onClick={() => setShowAllImages(!showAllImages)}
                >
                    {showAllImages ? "Ẩn bớt ảnh" : `Xem thêm ảnh (${review.images.length - MAX_IMAGES})`}
                </button>
            )}
        </div>
    );
};

export default ReviewCard;
