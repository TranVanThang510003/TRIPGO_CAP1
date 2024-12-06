import TableRow from "./TableRow";
import React, { useState, useEffect } from "react";
import { fetchOrderInfomation } from "../../services/api.js";
import SideBar from "../../UserProfile/SideBar.jsx";
import  Header from "../../../layout/Header.jsx";
const  OrderInformation= () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrderInfomation();
                setOrders(data.orders|| []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng của người dùng", error);
            }
        };

        loadOrders();
    }, []);



    return (
        <div  className='bg-[#f8f8f8] w-full min-h-screen overflow-auto'>
            <Header/>
        <div className='w-full flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-auto pt-16 md:pt-28 px-[10%] '>
            <div className='mr-2'>
            <SideBar/>
            </div>
            <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0">
                <h1 className="text-[30px] text-[#181E4B] font-bold mb-4">
                    Thông tin đơn hàng
                </h1>
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="py-3 px-4 text-left">STT</th>
                        <th className="py-3 px-4 text-left">Booking ID</th>
                        <th className="py-3 px-4 text-left">Tên Tour</th>
                        <th className="py-3 px-4 text-left">Ngày khởi hành</th>
                        <th className="py-3 px-4 text-left">Người lớn</th>
                        <th className="py-3 px-4 text-center">Trẻ em</th>
                        <th className="py-3 px-4 text-center">Thành Tiền</th>
                        <th className="py-3 px-4 text-center"></th>

                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <TableRow
                            key={order.bookingId}
                            index={index + 1}
                            order={order}

                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>

    );
};

export default OrderInformation;
