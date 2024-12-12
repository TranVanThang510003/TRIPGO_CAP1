import React, {useEffect, useState} from 'react';
import RevenueChart from './RevenueChart';
import DoughnutChart from './DoughnutChart';
import PopularDestinations from './PopularDestination';
import MonthlyRevenueChart from './MonthlyRevenueChart';
import Header from '../../../layout/Header.jsx';
import SideBar from '../../UserProfile/SideBar.jsx';
import ExportButton from './exportData/ExportButton.jsx';
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
import axios from "axios";

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
    const [allTours, setAllTours] = useState([]);
    const [popularDestinations, setPopularDestinations] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [creatorId, setCreatorId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Helper function to fetch data from an API
    const fetchData = async (url, setter) => {
        try {
            const response = await axios.get(url);
            setter(response.data);
        } catch (err) {
            console.error(`Error fetching data from ${url}:`, err);
            setError("Lỗi khi tải dữ liệu");
        }
    };

    // Initialize creatorId from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            setCreatorId(parseInt(user.id, 10));
        } else {
            setError("Không tìm thấy creatorId trong localStorage");
            setLoading(false);
        }
    }, []);

    // Fetch data when creatorId is set
    useEffect(() => {
        if (!creatorId) return;

        const fetchAllData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchData(`http://localhost:3000/staff/revenue/${creatorId}`, (data) =>
                        setAllTours(data.revenue || [])
                    ),
                    fetchData(`http://localhost:3000/staff/top-destinations`, (data) =>
                        setPopularDestinations(data.destinations || [])
                    ),
                    fetchData(
                        `http://localhost:3000/staff/monthly-revenue/${creatorId}`,
                        (data) => setMonthlyRevenue(data.monthlyRevenue || [])
                    ),
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [creatorId]);

    // Update selected tour when allTours change
    useEffect(() => {
        if (allTours.length > 0) {
            setSelectedTour(allTours[0]);
        }
        else{
            setSelectedTour({ departures: [] });
        }
    }, [allTours]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;





    // Dữ liệu biểu đồ doanh thu theo ngày khởi hành
    const dailyRevenueChartData = {
        labels: selectedTour?.departures?.map((departure) => departure.date) || [],
        datasets: [
            {
                label: `Doanh thu (VNĐ) - ${selectedTour?.tourName || ''}`,
                data: selectedTour?.departures?.map((departure) => departure.revenue) || [],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };


    // Biểu đồ Line (Doanh thu theo tháng)
    const lineChartData = {
        labels: monthlyRevenue.map((item) => item.month),
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data: monthlyRevenue.map((item) => item.totalRevenue),
                borderWidth: 2,
            },
        ],
    };
// Biểu đồ Doughnut (Tỷ lệ doanh thu theo tour)
    const totalRevenue = allTours.reduce((sum, tour) => sum + tour.totalRevenue, 0); // Total revenue from all tours

    const topTours = [...allTours]
        .sort((a, b) => b.totalRevenue - a.totalRevenue) // Sort tours by revenue (descending)
        .slice(0, 3); // Take the top 4 tours

    const othersRevenue = totalRevenue - topTours.reduce((sum, tour) => sum + tour.totalRevenue, 0); // Revenue for other tours

    const doughnutChartData = {
        labels: [...topTours.map((tour) => tour.tourName), "CÁC TOUR CÒN LẠI"], // Add "Others" label
        datasets: [
            {
                data: [...topTours.map((tour) => ((tour.totalRevenue / totalRevenue) * 100).toFixed(2)), ((othersRevenue / totalRevenue) * 100).toFixed(2)], // Convert revenue to percentage
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
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
            <div className=" flex  w-4/5 flex-col md:flex-row gap-6 h-auto bg-[#F8F8F8] mx-auto ">
                <div className="w-full md:w-1/4 fixed">
                    <SideBar />
                </div>

                <div className="flex-grow bg-white w-full p-8 rounded-xl shadow-lg mt-6 md:mt-0 ml-[300px]">
                    <div className='flex justify-between'>

                    <h1 className="text-3xl text-gray-800 font-bold mb-4">Thống kê doanh thu</h1>
                    <div className="">
                        <ExportButton
                            allTours={allTours}
                            popularDestinations={popularDestinations}
                            monthlyRevenue={monthlyRevenue}
                            fileName="revenue_dashboard.xlsx"
                        />
                    </div>
                    </div>

                    {/* Dropdown chọn tour */}
                    <div className="mb-8">
                        <div className='flex gap-4'>

                            {/* Biểu đồ doanh thu theo ngày khởi hành */}
                            <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 w-full border">

                                <RevenueChart
                                    chartData={dailyRevenueChartData}
                                    selectedTour={selectedTour}
                                    onChangeTour={handleTourChange}
                                    tours={allTours}
                                />

                            </div>
                            {/* Biểu đồ Doughnut */}
                            <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 border">
                                <DoughnutChart
                                    chartData={doughnutChartData}
                                    fileName="revenue_dashboard.xlsx"
                                />

                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                        {/* Danh sách điểm đến phổ biến */}
                        <PopularDestinations destinations={popularDestinations}/>
                        <MonthlyRevenueChart chartData={lineChartData}/>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueDashboard;

