import TableRow from "./TableRow";
import React, { useState, useEffect } from "react";
import { fetchOrderInfomation } from "../../services/api.js";
import SideBar from "../../UserProfile/SideBar.jsx";
import  Header from "../../../layout/Header.jsx";
import axios from "axios";
const  OrderInformation= () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrderInfomation();

                // Lọc danh sách đơn hàng có status = "success"
                const filteredOrders = data.orders?.filter(order => order.status === "success") || [];
                setOrders(filteredOrders);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng của người dùng", error);
            }
        };

        loadOrders();
    }, []);
    const cancelOrder = async (bookingId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/orders/cancel/${bookingId}`);
            return response.data;
        } catch (error) {
            console.error('Error cancelling order:', error.response?.data || error.message);
            throw error;
        }
    };

    // Hàm xử lý hủy đơn hàng
    const handleCancelOrder = async (bookingId) => {
        try {


            await cancelOrder(bookingId); // Gọi API hủy đơn
            setOrders((prevOrders) => prevOrders.filter((order) => order.bookingId !== bookingId)); // Xóa đơn trong state
            alert("Hủy đơn hàng thành công!");
        } catch (error) {
            alert("Lỗi khi hủy đơn hàng. Vui lòng thử lại.");
        }
    };




    return (
        <div  className='bg-[#f8f8f8] w-full min-h-screen overflow-auto relative'>
            <Header/>
        <div className=' flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-6 mt-4 '>
            <div className='mr-2 fixed'>
            <SideBar/>
            </div>
            <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0 ml-[300px]">
                <h1 className="text-[30px] text-[#181E4B] font-bold mb-4">
                    Thông tin đơn hàng
                </h1>
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <table className="min-w-full table-auto rounded-lg">
                        <thead className="bg-[#8FAEF6] text-white">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold">STT</th>
                            <th className="py-3 px-4 text-left font-semibold">Tên Tour</th>
                            <th className="py-3 px-4 text-left font-semibold">Ngày khởi hành</th>
                            <th className="py-3 px-4 text-left font-semibold">Người lớn</th>
                            <th className="py-3 px-4 text-center font-semibold">Trẻ em</th>
                            <th className="py-3 px-4 text-center font-semibold">Thành Tiền</th>
                            <th className="py-3 px-4 text-center font-semibold"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <TableRow
                                key={order.bookingId}
                                index={index + 1}
                                order={order}
                                onCancelOrder={handleCancelOrder}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>

    );
};

export default OrderInformation;
