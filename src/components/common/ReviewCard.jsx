import React from "react";

const ReviewCard = ({ review }) => {
    return (
        <div className="border bg-white border-gray-200 rounded-lg p-4 shadow-sm mb-4">
            {/* Header: Avatar, Tên người dùng, Ngày */}
            <div className="flex items-center mb-4">
                <img
                    src={review.avatar || "/img/default-avatar.jpg"} // Avatar người dùng
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                    <h4 className="text-lg font-semibold">{review.username}</h4>
                    <p className="text-sm text-gray-500">{review.date}</p>
                </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`inline-block w-5 h-5 ${
                            index < review.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                    >
                        ★
                    </span>
                ))}
                <p className="ml-2 text-sm text-gray-700">{review.title}</p>
            </div>

            {/* Nội dung đánh giá */}
            <p className="text-gray-700 mb-3">{review.content}</p>

            {/* Xem thêm */}
            {review.isLong && (
                <a
                    href="#"
                    className="text-blue-600 text-sm underline hover:text-blue-800"
                >
                    Xem thêm
                </a>
            )}

            {/* Hình ảnh */}
            <div className="mt-4 grid grid-cols-5 gap-2">
                {review.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Review Image ${index + 1}`}
                        className="w-full h-20 object-cover rounded-md"
                    />
                ))}
            </div>
        </div>
    );
};

export default ReviewCard;
