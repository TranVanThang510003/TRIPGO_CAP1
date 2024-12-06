
import {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
const TableRow = ({ index, order }) => {
    const navigate=useNavigate()
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}


    return (
        <tr className="border-b">
            <td className="py-3 px-4">{index}</td>
            <td className="py-3 px-4">{order.bookingId}</td>
            <td className="py-3 px-4">{order.tourName}</td>
            <td className="py-3 px-4">{formatDate(order.departureDate)}</td>
            <td className="py-3 px-4">{order.adultCount}</td>
            <td className="py-3 px-4">{order.childCount}</td>
            <td className="py-3 px-4">{order.totalPrice}</td>
            <td className="py-3 px-4 text-blue-500 hover:text-blue-600  hover:underline hover:cursor-pointer" onClick={() => navigate(`/tours/${order.tourId}`)} >
                xem chi tiết
            </td>
        </tr>
    );
};

export default TableRow;
