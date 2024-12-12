import React from 'react';

const PopularDestinations = ({ destinations }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 animate-fade-in">Điểm đến phổ biến</h2>
        <ul className="divide-y divide-gray-200">
            {destinations.map((destination, index) => (
                <li
                    key={index}
                    className="flex items-center justify-between py-2 px-2 hover:bg-blue-50 rounded-md transition-all duration-200 transform hover:scale-105"
                >
                    <div className="flex items-center gap-6">
                        <span className="text-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-1 rounded-full shadow-md">
                            {index + 1}
                        </span>
                        <span className="text-lg font-medium text-gray-800">{destination.province}</span>
                    </div>
                    <span className="text-lg font-medium text-blue-500">
                        {destination.totalBookings} lượt đặt
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

export default PopularDestinations;
