import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Star from '../../common/Star.jsx';
import { fetchOrderInfomation } from "../../services/api.js";
import axios from 'axios';

const Review = () => {
    const [rating, setRating] = useState(0); // State lưu đánh giá sao
    const [hover, setHover] = useState(null); // State hover sao
    const [orderDetails, setOrderDetails] = useState(null); // State lưu thông tin chi tiết gói dịch vụ
    const [isLoading, setIsLoading] = useState(true); // State xử lý trạng thái đang tải
    const [feedback, setFeedback] = useState(''); // State lưu nội dung nhận xét
    const { bookingId } = useParams(); // Lấy bookingId từ URL
    const navigate = useNavigate(); // Điều hướng trở lại

    // Gọi API để lấy thông tin gói dịch vụ
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchOrderInfomation(); // Gọi API để lấy danh sách đơn hàng
                console.log("Response from API:", response); // Kiểm tra dữ liệu API trả về
                console.log("bookingId from URL:", bookingId, typeof bookingId); // Kiểm tra bookingId từ URL

                const orders = response.orders; // Lấy danh sách orders từ API
                const selectedOrder = orders.find(order => order.bookingId === Number(bookingId)); // Tìm đơn hàng theo bookingId
                console.log("Selected Order:", selectedOrder); // Kiểm tra order được tìm thấy

                setOrderDetails(selectedOrder || null); // Cập nhật orderDetails
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setIsLoading(false); // Kết thúc trạng thái loading
            }
        };

        fetchData();
    }, [bookingId]);

    // Xử lý gửi đánh giá
    const handleSubmit = async () => {
        if (!rating || !feedback.trim()) {
            alert("Vui lòng cung cấp đầy đủ đánh giá và nhận xét.");
            return;
        }
        const userId = JSON.parse(localStorage.getItem("user") || "{}").id || null;

        const reviewData = {
            tourId: orderDetails.tourId, // Lấy tourId từ orderDetails
            userId: userId, // Thay bằng userId thực tế (ví dụ: lấy từ localStorage hoặc context)
            rating: rating,
            comments: feedback,
            reviewDate: new Date().toISOString(), // Ngày đánh giá
        };

        try {
            console.log("Submitting review data:", reviewData);

            // Gửi dữ liệu tới API
            const response = await axios.post('http://localhost:3000/users/review', reviewData);
            console.log("Review submitted successfully:", response.data);

            // Điều hướng hoặc thông báo thành công
            alert("Đánh giá đã được gửi thành công!");
            navigate(-1); // Quay lại trang trước
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
        }
    };

    // Nếu đang tải
    if (isLoading) {
        return (
            <div className="p-6 flex justify-center items-center">
                <p className="text-blue-500 text-lg">Đang tải thông tin gói dịch vụ...</p>
            </div>
        );
    }

    // Nếu không tìm thấy thông tin đơn hàng
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
                <h2 className="text-2xl font-bold text-customBlue mb-4">Đánh giá sản phẩm</h2>

                {/* Phần thông tin gói dịch vụ */}
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

                {/* Phần chọn sao để đánh giá */}
                <div className="h-10 justify-start items-center gap-5 inline-flex mt-4">
                    <div className="text-[#1A1A1A] text-xl font-['Baloo 2']">
                        Chất lượng dịch vụ
                    </div>
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

                {/* Phần nhập phản hồi */}
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

                {/* Nút gửi đánh giá và nút Trở lại */}
                <div className="mt-4 flex justify-end gap-4">
                    <button
                        onClick={() => navigate(-1)} // Quay lại trang trước
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        TRỞ LẠI
                    </button>
                    <button
                        onClick={handleSubmit} // Gọi hàm gửi đánh giá
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
