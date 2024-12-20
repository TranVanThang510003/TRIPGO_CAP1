import { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem";
import DetailModal from "./DetailModal";
import axios from "axios";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:3000/admin/staff-requests");
                if (response.data.staffRequests && Array.isArray(response.data.staffRequests)) {
                    setNotifications(response.data.staffRequests);
                } else {
                    throw new Error("Dữ liệu không hợp lệ");
                }
            } catch (error) {
                setError("Không thể tải danh sách yêu cầu.");
                console.error("Error fetching notifications:", error.message);
            }
        };

        fetchNotifications();
    }, []);

    const handleApprove = async (id) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:3000/admin/update-request/${id}`, {
                status: "approved",
            });

            if (response.status === 200) {
                console.log(`Approved request ID: ${id}`);
                setNotifications((prev) => prev.filter((n) => n.requestId !== id));
                setSelectedNotification(null);
            } else {
                console.error("Failed to approve request:", response.data.message);
                alert("Lỗi: Không thể chấp nhận yêu cầu.");
            }
        } catch (error) {
            console.error("Error approving request:", error.message);
            alert("Lỗi: Không thể kết nối đến server.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:3000/admin/update-request/${id}`, {
                status: "rejected",
            });

            if (response.status === 200) {
                console.log(`Rejected request ID: ${id}`);
                setNotifications((prev) => prev.filter((n) => n.requestId !== id));
                setSelectedNotification(null);
            } else {
                console.error("Failed to reject request:", response.data.message);
                alert("Lỗi: Không thể từ chối yêu cầu.");
            }
        } catch (error) {
            console.error("Error rejecting request:", error.message);
            alert("Lỗi: Không thể kết nối đến server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {error && <div className="text-red-500">{error}</div>}
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <NotificationItem
                        key={notification.requestId}
                        username={notification.username}
                        status={notification.status}
                        reason={notification.reason}
                        date={new Date(notification.createdAt).toLocaleDateString()}
                        onClick={() => setSelectedNotification(notification)}
                    />
                ))
            ) : (
                <p>Không có yêu cầu nào</p>
            )}

            {selectedNotification && (
                <DetailModal
                    notification={selectedNotification}
                    onClose={() => setSelectedNotification(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};

export default NotificationList;
