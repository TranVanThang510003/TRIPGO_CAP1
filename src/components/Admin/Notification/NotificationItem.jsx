const NotificationItem = ({ username, reason, date, status, onClick }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case "approved":
                return "text-green-600 font-bold";
            case "pending":
                return "text-orange-600 font-bold";
            case "rejected":
                return "text-red-600 font-bold";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center">
                {/* Thông tin người dùng */}
                <div>
                    <p className="text-base font-medium text-gray-800">Người dùng: {username}</p>
                    <p className="text-sm text-gray-500">Ngày gửi: {date}</p>
                </div>

                {/* Loại thông báo */}
                <div className='ml-[200px]'>
                    <h3 className="text-gray-600">Loại thông báo:</h3>
                    <h2 className="text-lg font-bold text-blue-600">Yêu cầu cấp quyền staff</h2>
                </div>

                {/* Trạng thái */}
                <div className="flex-1 text-center">
                    <h3 className="text-gray-600 text-sm">Trạng thái:</h3>
                    <h2 className={`text-lg ${getStatusStyle(status)}`}>{
                        status === "approved" ? "Đã chấp nhận" :
                            status === "pending" ? "Đang chờ xử lý" :
                                "Đã từ chối"
                    }</h2>
                </div>

                {/* Nút Xem chi tiết */}
                <button
                    onClick={onClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
};

export default NotificationItem;
