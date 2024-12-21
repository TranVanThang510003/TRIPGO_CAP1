const FinishedRequests = ({ notifications = [] }) => {
    if (!notifications.length) {
        return (
            <div className="text-center text-gray-500">
                Không có thông báo nào.
            </div>
        );
    }
    console.log("thong báo là:",notifications);

    return (
        <div className="space-y-6">
            {notifications.map((notification) => (
                <div
                    key={notification.requestId}
                    className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md"
                >
                    <div className="flex items-start">
                        {/* Notification Icon */}
                        <div className="flex-shrink-0">
                            <div className="text-2xl font-bold bg-yellow-500 text-white w-12 h-12 rounded-full flex justify-center items-center shadow-md">
                                A
                            </div>
                        </div>
                        {/* Notification Content */}
                        <div className="ml-6 flex flex-col justify-between w-full">
                            <div>
                                {/* Notification Message */}
                                <p className="text-lg font-semibold text-yellow-800 mb-2">
                                    {notification.message || "Phản hồi yêu cầu trở thành staff"}
                                </p>

                                {/* Updated Date */}
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium">Ngày cập nhật:</span>{" "}
                                    {notification.updatedAt
                                        ? new Date(notification.updatedAt).toLocaleDateString()
                                        : "Chưa cập nhật"}
                                </p>
                                {/* Additional Note */}
                                <p className="text-sm text-yellow-700 mt-2 italic">
                                    Cảm ơn bạn đã chờ đợi. Yêu cầu của bạn đã được chấp nhận.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FinishedRequests;
