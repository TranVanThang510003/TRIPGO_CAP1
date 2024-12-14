import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExpiredTours = ({ expiredTours }) => {
    const navigate = useNavigate();

    if (expiredTours.length === 0) {
        return (
            <div className="text-center text-gray-500 font-medium text-lg">
                <p>Không có thông báo hết hạn.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {expiredTours.map(tour => (
                <div
                    key={tour.id}
                    className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md"
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <div className="text-2xl font-bold bg-blue-500 text-white w-12 h-12 rounded-full flex justify-center items-center shadow-md">
                                T
                            </div>
                        </div>
                        <div className="ml-6 flex justify-between w-full">
                            <div>
                                <p className="text-lg font-semibold text-blue-800 mb-2">
                                    {tour.name} đã hết hạn
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    {tour.description || 'Chưa có mô tả'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Ngày hết hạn:</span>{' '}
                                    {new Date(tour.scheduleData.slice(-1)[0].endDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-md"
                                    onClick={() => navigate(`/update-tour/${tour.id}`)}
                                >
                                    Gia hạn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExpiredTours;
