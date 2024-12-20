import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpcomingTours = ({ upcomingTours }) => {
    const navigate = useNavigate();




    return (
        <div className="space-y-6">
            {upcomingTours.map(order => (
                <div
                    key={order.bookingId}
                    className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md"
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <div className="text-2xl font-bold bg-yellow-500 text-white w-12 h-12 rounded-full flex justify-center items-center shadow-md">
                                T
                            </div>
                        </div>
                        <div className="ml-6 flex justify-between w-full">
                            <div>
                                <p className="text-lg font-semibold text-yellow-800 mb-2">
                                    {order.tourName} sắp đến ngày khởi hành
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    Số lượng người: {order.adultCount} người lớn, {order.childCount} trẻ em
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Ngày khởi hành:</span>{' '}
                                    {new Date(order.departureDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-md"
                                    onClick={() => navigate(`/tours/${order.tourId}`)}
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UpcomingTours;
