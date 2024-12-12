import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs'; // Import dayjs để xác định tháng hiện tại

const MonthlyRevenueChart = ({ chartData }) => {
    const [currentQuarter, setCurrentQuarter] = useState(0); // Quý hiện tại
    const [currentYear, setCurrentYear] = useState(""); // Năm hiện tại
    const [availableYears, setAvailableYears] = useState([]); // Danh sách các năm

    // Xác định quý hiện tại
    useEffect(() => {
        const currentMonth = dayjs().month() + 1; // month() trả về giá trị 0-11, cần +1 để thành 1-12
        const currentQuarterIndex = Math.floor((currentMonth - 1) / 3); // Tính toán quý từ tháng
        setCurrentQuarter(currentQuarterIndex);
    }, []);

    // Xử lý dữ liệu ban đầu khi component mount
    useEffect(() => {
        const years = [...new Set(chartData.labels.map((label) => label.split("-")[0]))]; // Lấy các năm từ dữ liệu
        setAvailableYears(years);
        setCurrentYear(years[0]); // Đặt năm hiện tại là năm đầu tiên trong danh sách
    }, [chartData]);

    const quarters = [
        { label: "Quý 1", months: ["01", "02", "03"] },
        { label: "Quý 2", months: ["04", "05", "06"] },
        { label: "Quý 3", months: ["07", "08", "09"] },
        { label: "Quý 4", months: ["10", "11", "12"] },
    ];

    const filteredData = quarters[currentQuarter].months.map((month) => {
        const monthDataIndex = chartData.labels.findIndex(
            (label) => label.startsWith(currentYear) && label.endsWith(`-${month}`)
        );
        if (monthDataIndex !== -1) {
            return {
                label: chartData.labels[monthDataIndex],
                value: chartData.datasets[0].data[monthDataIndex],
            };
        }
        return null;
    }).filter(Boolean); // Loại bỏ các giá trị null

    const quarterChartData = {
        labels: filteredData.map((data) => data.label),
        datasets: [
            {
                label: chartData.datasets[0].label,
                data: filteredData.map((data) => data.value),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 0.6)',
                borderWidth: 2,
            },
        ],
    };

    // Điều hướng giữa các quý
    const handlePreviousQuarter = () => {
        if (currentQuarter > 0) {
            setCurrentQuarter((prev) => prev - 1);
        }
    };

    const handleNextQuarter = () => {
        if (currentQuarter < quarters.length - 1) {
            setCurrentQuarter((prev) => prev + 1);
        }
    };

    // Thay đổi năm
    const handleYearChange = (e) => {
        setCurrentYear(e.target.value);
        setCurrentQuarter(0); // Đặt về Quý 1 khi đổi năm
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 animate-fade-in">Doanh thu theo tháng</h2>

            {/* Chọn năm */}
            <div className="flex justify-start items-center mb-4">
                <label className="mr-2 text-gray-600">Chọn năm:</label>
                <select
                    value={currentYear}
                    onChange={handleYearChange}
                    className="border rounded-lg px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {availableYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Điều hướng giữa các quý */}
            <div className="flex px-8 justify-between items-center mb-4">
                <button
                    onClick={handlePreviousQuarter}
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                        currentQuarter === 0 ? "cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                    disabled={currentQuarter === 0}
                >
                    <Icon icon="mdi:navigate-before" width="26" height="26" />
                </button>
                <span className="text-lg font-bold text-gray-800">
                    {quarters[currentQuarter].label} ({currentYear})
                </span>
                <button
                    onClick={handleNextQuarter}
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                        currentQuarter === quarters.length - 1 ? "cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                    disabled={currentQuarter === quarters.length - 1}
                >
                    <Icon icon="mdi:navigate-next" width="26" height="26" />
                </button>
            </div>

            {/* Biểu đồ doanh thu */}
            <Line
                data={quarterChartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                    },
                }}
            />
        </div>
    );
};

export default MonthlyRevenueChart;
