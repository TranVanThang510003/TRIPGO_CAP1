import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Star from '../../common/Star.jsx';
import { fetchOrderInfomation } from "../../services/api.js";
import axios from 'axios';
import ImageUploader from "../../common/ImageUploader.jsx";

const Review = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState('');
    const [images, setImages] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State để hiển thị thông báo thành công
    const { bookingId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchOrderInfomation();
                const orders = response.orders;
                const selectedOrder = orders.find(order => order.bookingId === Number(bookingId));
                setOrderDetails(selectedOrder || null);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [bookingId]);

    const handleSubmit = async () => {
        if (!rating || !feedback.trim()) {
            alert("Vui lòng cung cấp đầy đủ đánh giá và nhận xét.");
            return;
        }

        const userId = JSON.parse(localStorage.getItem("user") || "{}").id || null;

        const reviewData = {
            tourId: orderDetails.tourId,
            bookingId: bookingId,
            userId: userId,
            rating: rating,
            comments: feedback,
            reviewDate: new Date().toISOString(),
        };

        const formData = new FormData();
        formData.append("reviewData", JSON.stringify(reviewData));
        images.forEach((image) => {
            formData.append("newImages", image);
        });

        try {
            const response = await axios.post(
                "http://localhost:3000/users/review",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Hiển thị thông báo thành công
            setShowSuccessMessage(true);

            // Điều hướng trở lại sau 3 giây
            setTimeout(() => {
                navigate(-1);
            }, 3000);

        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 flex justify-center items-center">
                <p className="text-blue-500 text-lg">Đang tải thông tin gói dịch vụ...</p>
            </div>
        );
    }

    if (!orderDetails) {
        return (
            <div className="p-6 flex justify-center items-center">
                <p className="text-red-500 text-lg">
                    Không tìm thấy thông tin gói dịch vụ. Vui lòng kiểm tra lại!
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg mt-4"
                >
                    Trở lại
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 flex justify-center items-center">
            <div className="w-full max-w-4xl px-6">
                {showSuccessMessage && (
                    <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg">
                        <p>Đánh giá của bạn đã được gửi thành công! Bạn sẽ được chuyển về trang trước trong 3 giây.</p>
                    </div>
                )}

                <h2 className="text-2xl font-bold text-customBlue mb-4">Đánh giá sản phẩm</h2>
                <div className="border p-4 rounded-lg shadow-sm">
                    <div className="flex space-x-4">
                        <img
                            src={`http://localhost:3000/${orderDetails.imageUrl}`}
                            alt={orderDetails.tourName || "Tour"}
                            className="w-28 h-28 rounded-md object-cover"
                        />
                        <div className="flex flex-col justify-between">
                            <h3 className="text-lg font-semibold text-customBlue">
                                {orderDetails.tourName}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                                Ngày khởi hành: {new Date(orderDetails.departureDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                Ngày kết thúc: {new Date(orderDetails.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 text-sm mt-1 font-medium">
                                Giá: {orderDetails.tourPrice.toLocaleString()} VND
                            </p>
                        </div>
                    </div>
                </div>
                <div className="h-10 justify-start items-center gap-5 inline-flex mt-4">
                    <div className="text-[#1A1A1A] text-xl font-['Baloo 2']">Chất lượng dịch vụ</div>
                    <div className="justify-center items-center gap-1 flex">
                        {[...Array(5)].map((_, index) => (
                            <div key={index}>
                                <Star
                                    filled={index < rating || index < hover}
                                    onClick={() => setRating(index + 1)}
                                    onMouseEnter={() => setHover(index + 1)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <ImageUploader images={images} setImages={setImages} />
                <div className="mt-4">
                    <label htmlFor="feedback" className="block text-lg font-['Baloo 2'] mb-1">
                        Nhận xét của bạn:
                    </label>
                    <textarea
                        id="feedback"
                        className="w-full p-3 border rounded-lg shadow-sm"
                        rows="4"
                        placeholder="Vui lòng chia sẻ cảm nhận của bạn về dịch vụ"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
                <div className="mt-4 flex justify-end gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        TRỞ LẠI
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-[#03387E] text-white rounded-lg shadow-md hover:bg-[#033E8C]"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
