import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../layout/Header.jsx';
import SideBar from '../../../components/UserProfile/SideBar.jsx';
import ExpiredTours from './ExpiredTours';
import UpcomingTours from './UpcomingTours';
import FinishedTours from './FinishedTours';
import FinishedRequests from './FinishedRequests.jsx';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
    const userId = user?.id;
    const role = user?.role;
    const [visibleNotifications, setVisibleNotifications] = useState(10); // Số thông báo hiển thị ban đầu
    const [reviewedBookings, setReviewedBookings] = useState([]);
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

    // Fetch dữ liệu từ API
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Gọi các API đồng thời
                const [toursRes, ordersRes, staffRes] = await Promise.all([
                    axios.get('http://localhost:3000/public-tours'),
                    axios.get(`http://localhost:3000/users/orders/${userId}`),
                    axios.get(`http://localhost:3000/users/staff-request/${userId}`),
                ]);
                console.log("Tours Response:", toursRes.data);
                console.log("Orders Response:", ordersRes.data);
                console.log("Staff Requests Response:", staffRes.data);

                // Xử lý dữ liệu từ từng API

                // 1. Thông báo hết hạn (Expired Tours)
                const expiredTours = (toursRes.data.tours || [])
                    .filter((tour) => {
                        const lastSchedule = tour.scheduleData?.slice(-1)?.[0];
                        return lastSchedule && new Date(lastSchedule.endDate) < new Date() && tour.createBy === userId && role === 'staff';
                    })
                    .map((tour) => ({
                        type: 'expired',
                        data: tour,
                        date: new Date(tour.scheduleData.slice(-1)[0].endDate),
                    }));

                // 2. Thông báo sắp khởi hành (Upcoming Tours)
                const upcomingTours = (ordersRes.data.orders || [])
                    .filter((order) => {
                        const departureDate = new Date(order.departureDate);
                        return departureDate > new Date() && departureDate - new Date() <= 2 * 24 * 60 * 60 * 1000;
                    })
                    .map((order) => ({
                        type: 'upcoming',
                        data: order,
                        date: new Date(order.departureDate),
                    }));

                // 3. Thông báo đã kết thúc (Finished Tours)
                const finishedTours = (ordersRes.data.orders || [])
                    .filter((order) => new Date(order.endDate) < new Date())
                    .map((order) => ({
                        type: 'finished',
                        data: order,
                        date: new Date(order.endDate),
                    }));

                // 4. Thông báo yêu cầu staff (Staff Notifications)
                const staffNotifications = (staffRes.data || []).map((request) => ({
                    type: 'staff',
                    data: request,
                    date: new Date(request.updatedAt),
                }));

                console.log("Staff Notifications:", staffNotifications);

                // Gom tất cả thông báo vào một mảng
                const allNotifications = [
                    ...expiredTours,
                    ...upcomingTours,
                    ...finishedTours,
                    ...staffNotifications,
                ].sort((a, b) => b.date - a.date); // Sắp xếp giảm dần theo thời gian

                // Cập nhật trạng thái
                setNotifications(allNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userId, role]);

    // Hiển thị thêm 10 thông báo
    const loadMoreNotifications = () => {
        setVisibleNotifications((prev) => prev + 10);
    };
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
                        {notifications.length === 0 ? (
                            <div className="text-center text-gray-500">
                                <p>Không có thông báo nào.</p>
                            </div>
                        ) : (
                            <>
                                {notifications.slice(0, visibleNotifications).map((notification, index) => {
                                    switch (notification.type) {
                                        case 'expired':
                                            return (
                                                <ExpiredTours
                                                    key={`expired-${index}`}
                                                    expiredTours={[notification.data]}
                                                />
                                            );
                                        case 'upcoming':
                                            return (
                                                <UpcomingTours
                                                    key={`upcoming-${index}`}
                                                    upcomingTours={[notification.data]}
                                                />
                                            );
                                        case 'finished':
                                            return (
                                                <FinishedTours
                                                    key={`finished-${index}`}
                                                    finishedTours={[notification.data]}
                                                    reviewedBookings={reviewedBookings}
                                                />
                                            );
                                        case 'staff':
                                            return (
                                                <FinishedRequests
                                                    key={`staff-${notification.data.requestId}`}
                                                    notifications={[notification.data]}
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                                {visibleNotifications < notifications.length && (
                                    <div className="text-center mt-4">
                                        <button
                                            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                                            onClick={loadMoreNotifications}
                                        >
                                            Xem thêm
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
