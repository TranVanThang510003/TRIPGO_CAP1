import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import framer-motion
import Header from '../../layout/Header';
import SideBar from '../UserProfile/SideBar';
import ExportButton from './ExportButton';

const TourOrderList = () => {
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTour, setActiveTour] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState({});
    const [creatorId, setCreatorId] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const id = user?.id;
        if (id) {
            setCreatorId(parseInt(id));
        } else {
            console.error('Không tìm thấy creatorId trong localStorage');
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!creatorId) return;

            try {
                const response = await axios.get(`http://localhost:3000/staff/order/${creatorId}`);
                setOrders(response.data.orders || {});
                setLoading(false);
            } catch (err) {
                setError("Lỗi khi tải dữ liệu");
                setLoading(false);
            }
        };

        fetchOrders();
    }, [creatorId]);

    const toggleTour = (tourName) => {
        setActiveTour(activeTour === tourName ? null : tourName);

        if (!selectedDate[tourName] && orders[tourName]) {
            const nearestDate = Object.keys(orders[tourName])[0];
            setSelectedDate((prev) => ({ ...prev, [tourName]: nearestDate }));
        }
    };

    const getDisplayData = (tourName) => {
        if (!orders[tourName]) return [];
        if (selectedDate[tourName] === 'all') {
            return Object.keys(orders[tourName]).flatMap((date) => orders[tourName][date] || []);
        }
        return orders[tourName][selectedDate[tourName]] || [];
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center text-lg font-medium text-blue-500">Đang tải...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center text-lg font-medium text-red-500">{error}</div>
            </div>
        );
    }

    const filteredTours = Object.keys(orders).filter((tourName) =>
        tourName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-100 w-full min-h-screen overflow-auto">
            <Header />

            <div className="w-full flex flex-col md:flex-row gap-6 h-auto bg-gray-100 mx-auto pt-16 md:pt-28 px-[10%]">
                <div className="w-full md:w-1/4">
                    <SideBar />
                </div>

                <div className="flex-grow bg-white w-full p-8 rounded-xl shadow-lg mt-6 md:mt-0">
                    <h1 className="text-[32px] text-gray-800 font-bold mb-8">Danh sách khách hàng theo từng tour</h1>

                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tour..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {filteredTours.map((tourName) => (
                        <div key={tourName} className="mb-6 shadow-md rounded-lg bg-white p-6">
                            <div
                                className="text-lg font-bold text-indigo-600 cursor-pointer flex justify-between items-center bg-indigo-50 p-4 rounded-md hover:shadow-lg transition-shadow"
                                onClick={() => toggleTour(tourName)}
                            >
                                <span>
                                    {tourName} ({Object.keys(orders[tourName]).length} ngày khởi hành)
                                </span>
                                <span>{activeTour === tourName ? '-' : '+'}</span>
                            </div>

                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: activeTour === tourName ? "auto" : 0,
                                    opacity: activeTour === tourName ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Chọn ngày khởi hành hoặc xuất toàn bộ:
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <select
                                                value={selectedDate[tourName] || 'all'}
                                                onChange={(e) =>
                                                    setSelectedDate((prev) => ({
                                                        ...prev,
                                                        [tourName]: e.target.value,
                                                    }))
                                                }
                                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="all">Tất cả</option>
                                                {Object.keys(orders[tourName]).map((date) => (
                                                    <option key={date} value={date}>
                                                        {date}
                                                    </option>
                                                ))}
                                            </select>
                                            <ExportButton
                                                data={getDisplayData(tourName)}
                                                fileName={
                                                    selectedDate[tourName] === 'all'
                                                        ? `danh_sach_khach_hang_${tourName}_tat_ca_ngay.xlsx`
                                                        : `danh_sach_khach_hang_${tourName}_${selectedDate[tourName]}.xlsx`
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white border border-gray-300 rounded-lg mt-4">
                                            <thead className="bg-indigo-600 text-white">
                                            <tr>
                                                <th className="px-6 py-3 text-left">Booking ID</th>
                                                <th className="px-6 py-3 text-left">Ngày kết thúc</th>
                                                <th className="px-6 py-3 text-left">Giá tổng</th>
                                                <th className="px-6 py-3 text-left">Số khách lớn</th>
                                                <th className="px-6 py-3 text-left">Số khách nhỏ</th>
                                                <th className="px-6 py-3 text-left">Tên khách hàng</th>
                                                <th className="px-6 py-3 text-left">Email</th>
                                                <th className="px-6 py-3 text-left">Điện thoại</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {getDisplayData(tourName).map((order) => (
                                                <tr key={order.bookingId} className="border-b hover:bg-gray-100">
                                                    <td className="px-6 py-4">{order.bookingId}</td>
                                                    <td className="px-6 py-4">{order.endDate || 'Chưa có'}</td>
                                                    <td className="px-6 py-4">{order.totalPrice.toLocaleString()} đ</td>
                                                    <td className="px-6 py-4">{order.adultCount}</td>
                                                    <td className="px-6 py-4">{order.childCount}</td>
                                                    <td className="px-6 py-4">{order.customerFirstName}</td>
                                                    <td className="px-6 py-4">{order.customerEmail}</td>
                                                    <td className="px-6 py-4">{order.customerPhone}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourOrderList;
