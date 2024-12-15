
import {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
const TableRow = ({ index, order }) => {
    const navigate=useNavigate()
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}


    return (
        <tr
            className="hover:bg-gray-100 transition-all ease-in-out duration-200"
        >
            <td className="py-3 px-4 text-gray-700">{index}</td>
            <td className="py-3 px-4 text-gray-700">{order.tourName}</td>
            <td className="py-3 px-4 text-gray-700">{formatDate(order.departureDate)}</td>
            <td className="py-3 px-4 text-gray-700">{order.adultCount}</td>
            <td className="py-3 px-4 text-center text-gray-700">{order.childCount}</td>
            <td className="py-3 px-4 text-center text-gray-700">{order.totalPrice}</td>
            <td
                className="py-3 px-4 text-center text-blue-500 hover:text-blue-700 hover:underline cursor-pointer"
                onClick={() => navigate(`/tours/${order.tourId}`)}
            >
                Xem chi tiết
            </td>
        </tr>

    );
};

export default TableRow;
