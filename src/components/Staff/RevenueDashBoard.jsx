import React, { useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import Header from '../../layout/Header';
import SideBar from '../UserProfile/SideBar';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const RevenueDashboard = () => {
    // Dữ liệu giả lập với nhiều ngày khởi hành
    const allTours = [
        {
            tourName: 'Tour Đà Nẵng 3 Ngày',
            departures: [
                { date: '2024-12-01', revenue: 1500000 },
                { date: '2024-12-05', revenue: 2000000 },
                { date: '2024-12-10', revenue: 1800000 },
            ],
            totalRevenue: 5300000,
        },
        {
            tourName: 'Tour Hội An 1 Ngày',
            departures: [
                { date: '2024-12-02', revenue: 1000000 },
                { date: '2024-12-06', revenue: 1200000 },
            ],
            totalRevenue: 2200000,
        },
        {
            tourName: 'Tour Sài Gòn 5 Ngày',
            departures: [
                { date: '2024-12-03', revenue: 3000000 },
                { date: '2024-12-07', revenue: 4000000 },
                { date: '2024-12-11', revenue: 3500000 },
            ],
            totalRevenue: 10500000,
        },
    ];
    const popularDestinations = [
        { destination: 'Đà Nẵng', bookings: 120 },
        { destination: 'Hội An', bookings: 95 },
        { destination: 'Sài Gòn', bookings: 150 },
        { destination: 'Hà Nội', bookings: 110 },
        { destination: 'Phú Quốc', bookings: 80 },
    ];


    const revenueByMonth = [
        { month: 'Tháng 1', revenue: 10000000 },
        { month: 'Tháng 2', revenue: 8000000 },
        { month: 'Tháng 3', revenue: 12000000 },
        { month: 'Tháng 4', revenue: 15000000 },
    ];

    const [selectedTour, setSelectedTour] = useState(allTours[0]); // Mặc định chọn tour đầu tiên

    // Dữ liệu biểu đồ doanh thu theo ngày khởi hành
    const dailyRevenueChartData = {
        labels: selectedTour.departures.map((departure) => departure.date),
        datasets: [
            {
                label: `Doanh thu (VNĐ) - ${selectedTour.tourName}`,
                data: selectedTour.departures.map((departure) => departure.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    // Biểu đồ Horizontal Bar (Doanh thu theo tour)
    const barChartData = {
        labels: allTours.map((tour) => tour.tourName),
        datasets: [
            {
                label: 'Doanh thu tổng (VNĐ)',
                data: allTours.map((tour) => tour.totalRevenue),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };

    // Biểu đồ Line (Doanh thu theo tháng)
    const lineChartData = {
        labels: revenueByMonth.map((item) => item.month),
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data: revenueByMonth.map((item) => item.revenue),
                borderColor: 'rgba(255, 99, 132, 0.8)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    // Biểu đồ Doughnut (Tỷ lệ doanh thu theo tour)
    const doughnutChartData = {
        labels: allTours.map((tour) => tour.tourName),
        datasets: [
            {
                data: allTours.map((tour) => tour.totalRevenue),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
            },
        ],
    };

    // Hàm xử lý khi chọn tour
    const handleTourChange = (e) => {
        const tourName = e.target.value;
        const selected = allTours.find((tour) => tour.tourName === tourName);
        setSelectedTour(selected);
    };

    return (
        <div className="bg-gray-100 min-h-screen overflow-auto relative">
            <Header />
            <div className=" flex  w-4/5 flex-col md:flex-row gap-6 h-auto bg-gray-100 mx-auto pt-16 md:pt-10">
                <div className="w-full md:w-1/4 fixed">
                    <SideBar />
                </div>

                <div className="flex-grow bg-white w-full p-8 rounded-xl shadow-lg mt-6 md:mt-0 ml-[300px]">
                    <h1 className="text-3xl text-gray-800 font-bold mb-8">Thống kê doanh thu</h1>

                    {/* Dropdown chọn tour */}
                    <div className="mb-8">
                        <div className='flex mt-5 gap-4'>

                    {/* Biểu đồ doanh thu theo ngày khởi hành */}
                    <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 w-full">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                            Doanh thu theo ngày khởi hành - {selectedTour.tourName}
                        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                            Chọn tour:
                        </label>
                        <select
                            className="border rounded-lg p-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleTourChange}
                            value={selectedTour.tourName}
                        >
                            {allTours.map((tour) => (
                                <option key={tour.tourName} value={tour.tourName}>
                                    {tour.tourName}
                                </option>
                            ))}
                        </select>
                        </h2>
                        <Bar data={dailyRevenueChartData} options={{ responsive: true }} />
                    </div>
                        {/* Biểu đồ Doughnut */}
                        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
                            <h2 className="text-xl font-bold text-gray-700 mb-4 w-[400px]">Tỷ lệ doanh thu theo tour</h2>
                            <Doughnut data={doughnutChartData} options={{ responsive: true }} />
                        </div>

                    </div>
                        </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Danh sách điểm đến phổ biến */}

                        <div
                            className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl">
                            <h2 className="text-xl font-bold text-gray-700 mb-6 border-b-2 border-gray-300 ">
                                Điểm đến phổ biến
                            </h2>
                            <ul className="divide-y divide-gray-200">
                                {popularDestinations.map((destination, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between py-2 px-2 hover:bg-blue-50 rounded-md transition-all duration-200 transform hover:scale-105"
                                    >
                                        <div className="flex items-center gap-6">
                    <span
                        className="text-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-teal-400 px-4 py-1 rounded-full shadow-md">
                        {index + 1}
                    </span>
                                            <span
                                                className="text-lg font-medium text-gray-800">{destination.destination}</span>
                                        </div>
                                        <span className="text-lg font-medium text-blue-500">
                    {destination.bookings.toLocaleString()} lượt đặt
                </span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Biểu đồ Doanh thu theo tháng */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Doanh thu theo tháng</h2>
                            <Line data={lineChartData} options={{responsive: true}}/>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueDashboard
