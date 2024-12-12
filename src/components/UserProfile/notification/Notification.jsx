import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../../layout/Header.jsx';
import SideBar from '../../../components/UserProfile/SideBar.jsx';
import { fetchOrderInfomation } from "../../services/api.js";

const Notification = () => {
    const [tours, setTours] = useState([]);
    const [expiredTours, setExpiredTours] = useState([]);
    const [upcomingTours, setUpcomingTours] = useState([]); // State để lưu các chuyến đi sắp khởi hành
    const [finishedTours, setFinishedTours] = useState([]); // State để lưu các chuyến đi đã kết thúc
    const userId = JSON.parse(localStorage.getItem('user'))?.id; // Lấy ID người dùng từ localStorage
    const role =  JSON.parse(localStorage.getItem("user"))?.role; // Lấy role của người dùng
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get('http://localhost:3000/public-tours');
                setTours(response.data.tours);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchTours();
    }, []);

    // Kiểm tra các chuyến đi hết hạn
    useEffect(() => {
        if (tours.length === 0) return;

        const checkExpiredTours = () => {
            const now = new Date();
            const expired = tours.filter(tour => {
                const lastSchedule = tour.scheduleData[tour.scheduleData.length - 1];
                return new Date(lastSchedule.endDate) < now && tour.createBy === userId && role === 'staff';
            });
            setExpiredTours(expired);
        };

        checkExpiredTours();

        const interval = setInterval(checkExpiredTours, 60000);

        return () => clearInterval(interval);
    }, [tours, userId]);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrderInfomation();
                setOrders(data.orders || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng của người dùng", error);
            }
        };

        loadOrders();
    }, []);

    // Kiểm tra các chuyến đi sắp tới trong vòng 2 ngày
    useEffect(() => {
        if (orders.length === 0) return;

        const checkUpcomingTours = () => {
            const now = new Date();
            const upcoming = orders.filter(order => {
                const departureDate = new Date(order.departureDate);
                const diffTime = departureDate - now;
                const diffDays = diffTime / (1000 * 3600 * 24);
                console.log(`diffDays for ${order.tourName}:`, diffDays);
                return diffDays > 0 && diffDays <= 2;
            });
            console.log('Upcoming tours:', upcoming);
            setUpcomingTours(upcoming);
        };

        checkUpcomingTours();

        const interval = setInterval(checkUpcomingTours, 60000);

        return () => clearInterval(interval);
    }, [orders]);

    // Kiểm tra các chuyến đi đã kết thúc
    useEffect(() => {
        if (orders.length === 0) return;

        const checkFinishedTours = () => {
            const now = new Date();
            const finished = orders.filter(order => {
                const endDate = new Date(order.endDate);
                return endDate < now;
            });

            setFinishedTours(finished);
        };

        checkFinishedTours();
    }, [orders]);

    return (
        <div className="bg-gray-100 min-h-screen overflow-auto relative">
            <Header />
            <div className=" flex  w-4/5 flex-col md:flex-row gap-6 h-auto bg-[#F8F8F8] mx-auto ">
                <div className="w-full md:w-1/4 fixed">
                    <SideBar/>
                </div>

                <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0 ml-[300px]">
                    <h1 className="text-[30px] text-[#181E4B] font-bold mb-4">
                        Thông báo
                    </h1>
                    <div className="space-y-4">
                        {/* Thông báo về các chuyến đi đã hết hạn */}
                        {expiredTours.length > 0 && expiredTours.map(tour => (
                            <div key={tour.id} className="bg-blue-100 border-l-4 border-blue-500 p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div
                                            className=" text-3xl  font-bold bg-blue-500 text-white w-12 h-12 rounded-full flex justify-center items-center">
                                            T
                                        </div>
                                    </div>
                                    <div className="ml-4 flex justify-between w-full">
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">{tour.name} đã hết hạn</p>
                                            <p className="text-sm text-gray-500">{tour.description || "Chưa có mô tả"}</p>
                                            <p className="text-xs text-gray-500">Ngày hết
                                                hạn: {new Date(tour.scheduleData.slice(-1)[0].endDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex items-center justify-start mt-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => navigate(`/update-tour/${tour.id}`)}
                                            >
                                                Gia hạn
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {expiredTours.length === 0 && (
                            <div className="text-center text-gray-500">
                                <p>Không có thông báo hết hạn.</p>
                            </div>
                        )}

                        {/* Thông báo về các chuyến đi sắp khởi hành */}
                        {upcomingTours.length > 0 ? (
                            upcomingTours.map(order => (
                                <div key={order.bookingId} className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div
                                                className=" text-3xl  font-bold bg-yellow-500 text-white w-12 h-12 rounded-full flex justify-center items-center">
                                                T
                                            </div>
                                        </div>
                                        <div className="ml-4 flex justify-between w-full">
                                            <div>
                                                <p className="text-sm font-medium text-yellow-900">{order.tourName} sắp
                                                    đến ngày khởi hành</p>
                                                <p className="text-sm text-gray-500">Số lượng
                                                    người: {order.adultCount} người lớn, {order.childCount} trẻ em</p>
                                                <p className="text-xs text-gray-500">Ngày khởi
                                                    hành: {new Date(order.departureDate).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex items-center justify-start mt-2">
                                                <button
                                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => navigate(`/tours/${order.tourId}`)}
                                                >
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">
                                <p>Không có chuyến đi sắp đến trong vòng 7 ngày.</p>
                            </div>
                        )}

                        {/* Thông báo về các chuyến đi đã kết thúc */}
                        {finishedTours.length > 0 ? (
                            finishedTours.map(order => (
                                <div key={order.bookingId} className="bg-green-100 border-l-4 border-green-500 p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div
                                                className=" text-3xl font-bold bg-green-500 text-white w-12 h-12 rounded-full flex justify-center items-center">
                                                T
                                            </div>
                                        </div>
                                        <div className="ml-4 flex justify-between w-full">
                                            <div>
                                                <p className="text-sm font-medium text-green-900">{order.tourName} đã
                                                    kết thúc</p>
                                                <p className="text-sm text-gray-500">Số lượng
                                                    người: {order.adultCount} người lớn, {order.childCount} trẻ em</p>
                                                <p className="text-xs text-gray-500">Ngày kết
                                                    thúc: {new Date(order.endDate).toLocaleDateString()}</p>
                                                <p className="text-xs text-gray-500 text-green-700 mt-2">Cảm ơn bạn đã
                                                    tham gia chuyến đi. Hy vọng bạn đã có một trải nghiệm tuyệt vời!
                                                    Đừng quên đánh giá chuyến đi nhé!</p>
                                            </div>
                                            <div className="flex items-center justify-start mt-2">
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => navigate(`/tour-detail/${order.tourId}`)}
                                                >
                                                    Đánh giá
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">
                                <p>Không có chuyến đi đã kết thúc.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
