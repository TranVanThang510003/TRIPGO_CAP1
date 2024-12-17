import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import {Icon} from "@iconify/react"; // Import plugin

dayjs.extend(weekOfYear); // Kích hoạt plugin

const RevenueChart = ({ chartData, selectedTour, onChangeTour, tours }) => {
    const [currentWeek, setCurrentWeek] = useState(0); // Theo dõi tuần hiện tại

    if (!selectedTour) {
        return (
            <div className="text-center text-gray-500 animate-pulse">
                Đang tải biểu đồ doanh thu...
            </div>
        );
    }

    // Lấy danh sách ngày khởi hành và nhóm theo tuần
    const departuresByWeek = selectedTour.departures.reduce((weeks, departure) => {
        const weekNumber = dayjs(departure.date).week(); // Lấy số tuần trong năm
        if (!weeks[weekNumber]) {
            weeks[weekNumber] = [];
        }
        weeks[weekNumber].push(departure);
        return weeks;
    }, {});

    // Danh sách các tuần có dữ liệu
    const weekNumbers = Object.keys(departuresByWeek).map(Number).sort((a, b) => a - b);

    // Lấy dữ liệu của tuần hiện tại
    const currentWeekData = departuresByWeek[weekNumbers[currentWeek]] || [];

    // Chuẩn bị dữ liệu biểu đồ cho tuần hiện tại
    const weeklyChartData = {
        labels: currentWeekData.map((departure) => departure.date),
        datasets: [
            {
                label: `Doanh thu (VNĐ) - Tuần ${weekNumbers[currentWeek] || ''}`,
                data: currentWeekData.map((departure) => departure.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    // Điều hướng tuần
    const handlePreviousWeek = () => {
        if (currentWeek > 0) {
            setCurrentWeek((prev) => prev - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentWeek < weekNumbers.length - 1) {
            setCurrentWeek((prev) => prev + 1);
        }
    };

    return (
        <div className="bg-white col-span-1 md:col-span-2 w-full     transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 animate-fade-in">
                Doanh thu theo ngày khởi hành - {selectedTour.tourName}
            </h2>
            <label className="block text-gray-600 text-sm font-medium mb-2">
                Chọn tour:
            </label>
            <select
                className="border border-gray-300 rounded-md p-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-[100px] overflow-y-auto"
                onChange={onChangeTour}
                value={selectedTour?.tourName || ''}
            >
                {tours.map((tour) => (
                    <option key={tour.tourName} value={tour.tourName}>
                        {tour.tourName}
                    </option>
                ))}
            </select>


            {/* Điều hướng tuần */}
            <div className="flex justify-between mx-20 items-center mt-6 space-x-10">
                <button
                    onClick={handlePreviousWeek}
                    className={`transition-all duration-300 px-4 py-2 rounded-md font-medium  ${
                        currentWeek === 0
                            ? 'cursor-not-allowed'
                            : 'bg-gray-200  hover:shadow-lg'
                    }`}
                    disabled={currentWeek === 0}
                >
                    <Icon icon="mdi:navigate-before" width="26" height="26"/>
                </button>
                <span className="text-lg font-bold text-gray-700">
                    Tuần {weekNumbers[currentWeek] || ''}
                </span>
                <button
                    onClick={handleNextWeek}
                    className={`transition-all duration-300 px-4 py-2 rounded-md font-medium  ${
                        currentWeek >= weekNumbers.length - 1
                            ? 'cursor-not-allowed'
                            : '  bg-gray-200 hover:shadow-lg'
                    }`}
                    disabled={currentWeek >= weekNumbers.length - 1}
                >
                    <Icon icon="mdi:navigate-next" width="26" height="26"/>
                </button>
            </div>

            {/* Biểu đồ doanh thu theo tuần */}
            <div className="mt-6 animate-fade-in">
                <Bar data={weeklyChartData} options={{responsive: true}}/>
            </div>
        </div>
    );
};

export default RevenueChart;
