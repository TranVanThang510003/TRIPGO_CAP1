
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../layout/Header.jsx';
import SideBar from '../../../components/UserProfile/SideBar.jsx';
import ExpiredTours from './ExpiredTours';
import UpcomingTours from './UpcomingTours';
import FinishedTours from './FinishedTours';

const Notification = () => {
    const [expiredTours, setExpiredTours] = useState([]);
    const [upcomingTours, setUpcomingTours] = useState([]);
    const [finishedTours, setFinishedTours] = useState([]);
    const [tours, setTours] = useState([]);
    const [orders, setOrders] = useState([]);
    const [reviewedBookings, setReviewedBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
    const userId = user?.id;
    const role = user?.role;

    // Fetch danh sách tours (public tours)
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get('http://localhost:3000/public-tours');
                setTours(response.data.tours || []);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchTours();
    }, []);

    // Phân loại các chuyến đi đã hết hạn
    useEffect(() => {
        if (tours.length === 0) return;

        const checkExpiredTours = () => {
            const now = new Date();
            const expired = tours.filter((tour) => {
                const lastSchedule = tour.scheduleData?.slice(-1)?.[0];
                return lastSchedule && new Date(lastSchedule.endDate) < now && tour.createBy === userId && role === 'staff';
            });
            setExpiredTours(expired);
        };

        checkExpiredTours();
        const interval = setInterval(checkExpiredTours, 60000);

        return () => clearInterval(interval);
    }, [tours, userId, role]);

    // Fetch danh sách orders của người dùng
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/orders/${userId}`);
                setOrders(response.data.orders || []);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        if (userId) fetchOrders();
    }, [userId]);

    // Phân loại các chuyến đi sắp khởi hành
    useEffect(() => {
        if (orders.length === 0) return;

        const checkUpcomingTours = () => {
            const now = new Date();
            const upcoming = orders.filter((order) => {
                const departureDate = new Date(order.departureDate);
                const diffTime = departureDate - now;
                const diffDays = diffTime / (1000 * 3600 * 24);
                return diffDays > 0 && diffDays <= 2;
            });
            setUpcomingTours(upcoming);
        };

        checkUpcomingTours();
        const interval = setInterval(checkUpcomingTours, 60000);

        return () => clearInterval(interval);
    }, [orders]);

    // Phân loại các chuyến đi đã kết thúc
    useEffect(() => {
        if (orders.length === 0) return;

        const checkFinishedTours = () => {
            const now = new Date();
            const finished = orders.filter((order) => {
                const endDate = new Date(order.endDate);
                return endDate < now;
            });
            setFinishedTours(finished);
        };

        checkFinishedTours();
    }, [orders]);

    // Fetch danh sách các bookingId đã đánh giá
    useEffect(() => {
        const fetchReviewedStatus = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/reviews/status', {
                    params: { userId },
                });
                setReviewedBookings(response.data.reviewedBookings || []);
            } catch (error) {
                console.error('Error fetching review status:', error);
            }
        };

        if (userId) fetchReviewedStatus();
    }, [userId]);

    return (
        <div className="bg-gray-100 min-h-screen overflow-auto relative">
            <Header />
            <div className="flex flex-col md:flex-row gap-6 h-auto bg-[#F8F8F8] mx-6 mt-4">
                <div className="w-full md:w-1/4 fixed">
                    <SideBar />
                </div>

                <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0 ml-[300px]">
                    <h1 className="text-[30px] text-[#181E4B] font-bold mb-4">Thông báo</h1>
                    <div className="space-y-4">
                        {/* Nếu không có thông báo nào */}
                        {expiredTours.length === 0 &&
                            upcomingTours.length === 0 &&
                            finishedTours.length === 0 && (
                                <div className="text-center text-gray-500">
                                    <p>Không có thông báo nào.</p>
                                </div>
                            )}
                        {/* Thông báo về các chuyến đi đã hết hạn */}
                        <ExpiredTours expiredTours={expiredTours} />

                        {/* Thông báo về các chuyến đi sắp khởi hành */}
                        <UpcomingTours upcomingTours={upcomingTours} />

                        {/* Thông báo về các chuyến đi đã kết thúc */}
                        <FinishedTours finishedTours={finishedTours} reviewedBookings={reviewedBookings} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
