
import { useNavigate } from "react-router-dom";

const TableRow = ({ index, order, onCancelOrder }) => {
    const navigate = useNavigate();

    // Hàm định dạng ngày
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // Hàm kiểm tra có cho phép hủy hay không
    const canCancel = () => {
        const currentDate = new Date();
        const departureDate = new Date(order.departureDate);
        const timeDifference = departureDate - currentDate;
        const hoursDifference = timeDifference / (1000 * 60 * 60); // Chuyển sang giờ
        return hoursDifference >= 24 ; // Nếu thời gian lớn hơn hoặc bằng 24 giờ
    };

    // Hàm xử lý logic khi nhấn nút "Hủy"
    const handleCancelClick = () => {
        if (canCancel()) {
            // Hiển thị xác nhận hủy đơn
            const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đơn này?");
            if (confirmCancel) {
                onCancelOrder(order.bookingId); // Gọi hàm hủy từ component cha
            }
        } else {
            // Hiển thị thông báo không thể hủy
            alert("Đơn hàng này không thể hủy vì đã vượt quá thời gian cho phép hủy.");
        }
    };

    return (
        <tr className="hover:bg-gray-100 transition-all ease-in-out duration-200">
            <td className="py-3 px-4 text-gray-700">{index}</td>
            <td className="py-3 px-4 text-gray-700">{order.tourName}</td>
            <td className="py-3 px-4 text-gray-700">{formatDate(order.departureDate)}</td>
            <td className="py-3 px-4 text-gray-700">{order.adultCount}</td>
            <td className="py-3 px-4 text-center text-gray-700">{order.childCount}</td>
            <td className="py-3 px-4 text-center text-gray-700">{order.totalPrice}</td>
            <td className="py-3 px-4 text-center">
                <div className="flex justify-center gap-2">
                    {/* Nút "Xem chi tiết" */}
                    <button
                        onClick={() => navigate(`/tours/${order.tourId}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Xem chi tiết
                    </button>

                    {/* Nút "Hủy" */}
                    <button
                        onClick={handleCancelClick}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    >
                        Hủy
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TableRow;
