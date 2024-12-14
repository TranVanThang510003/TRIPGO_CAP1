import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinishedTours = ({ finishedTours, reviewedBookings = [] }) => {
    const navigate = useNavigate();

    if (finishedTours.length === 0) {
        return (
            <div className="text-center text-gray-500 font-medium text-lg">
                <p>Không có chuyến đi đã kết thúc.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {finishedTours.map((order) => {
                // Kiểm tra trạng thái đánh giá bằng cách tìm `bookingId` trong `reviewedBookings`
                const isReviewed = reviewedBookings.some(
                    (review) => review.BOOKING_ID === order.bookingId
                );

                return (
                    <div
                        key={order.bookingId}
                        className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md"
                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="text-2xl font-bold bg-green-500 text-white w-12 h-12 rounded-full flex justify-center items-center shadow-md">
                                    T
                                </div>
                            </div>
                            <div className="ml-6 flex justify-between w-full">
                                <div>
                                    <p className="text-lg font-semibold text-green-800 mb-2">
                                        {order.tourName} đã kết thúc
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-medium">Số lượng người:</span>{' '}
                                        {order.adultCount} người lớn, {order.childCount} trẻ em
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-medium">Ngày kết thúc:</span>{' '}
                                        {new Date(order.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-green-700 mt-2 italic">
                                        Cảm ơn bạn đã tham gia chuyến đi. Hy vọng bạn đã có một trải nghiệm tuyệt vời!
                                    </p>
                                </div>
                                <div className="flex items-center mt-4 md:mt-0">
                                    <button
                                        className={`${
                                            isReviewed
                                                ? 'bg-green-300 hover:bg-green-400'
                                                : 'bg-green-500 hover:bg-green-700'
                                        } text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-md`}
                                        onClick={() => navigate(`/review/${order.bookingId}`)}
                                    >
                                        {isReviewed ? 'Đánh giá lại' : 'Đánh giá'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FinishedTours;
