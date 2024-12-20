import { useState } from "react";
import axios from 'axios';
const StaffRequestForm = ({onClose}) => {
    const [cmnd, setCmnd] = useState(null); // Ảnh CMND/CCCD
    const [certificate, setCertificate] = useState(null); // Ảnh chứng chỉ
    const [reason, setReason] = useState(""); // Lý do
    const [phone, setPhone] = useState(""); // Số điện thoại
    const [email, setEmail] = useState(""); // Email
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleFileUpload = (e, setFile) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };


    const submitStaffRequest = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/users/staff-request', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error('Error submitting staff request:', error);
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu');
        }
    };

    const handleSubmit = async () => {
        setError("");
        setSuccessMessage("");

        // Kiểm tra dữ liệu đầu vào
        if (!cmnd) {
            setError("Vui lòng tải lên ảnh CMND hoặc CCCD.");
            return;
        }
        if (!certificate) {
            setError("Vui lòng tải lên giấy phép kinh doanh.");
            return;
        }
        if (!reason.trim()) {
            setError("Vui lòng nhập lý do muốn trở thành staff.");
            return;
        }
        if (!/^[0-9]{10,11}$/.test(phone)) {
            setError("Vui lòng nhập số điện thoại hợp lệ.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Vui lòng nhập email hợp lệ.");
            return;
        }

        // Tạo FormData để gửi dữ liệu dạng multipart
        const formData = new FormData();
        // Append thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            formData.append("userId", parseInt(user.id, 10)); // Chuyển thành số nguyên
        }
        formData.append('cmnd', cmnd); // File CMND
        formData.append('certificate', certificate); // File giấy phép kinh doanh
        formData.append('reason', reason); // Lý do
        formData.append('phone', phone); // Số điện thoại
        formData.append('email', email); // Email

        try {
            // Gửi dữ liệu qua API
            const result = await submitStaffRequest(formData);

            // Hiển thị thông báo thành công
            setSuccessMessage("Gửi yêu cầu thành công!");
            setTimeout(() => {
                setSuccessMessage("");
                onClose(); // Đóng form nếu cần
            }, 3000);

            console.log("API Response:", result);
        } catch (err) {
            setError(err.message || "Có lỗi xảy ra khi gửi yêu cầu.");
        }
    };



    return (

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Yêu cầu trở thành staff</h2>

            {/* Thông báo lỗi */}
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            {successMessage && (
                <div className="text-green-500 text-sm mb-3">{successMessage}</div>
            )}
            {/* Ảnh CMND/CCCD */}
            <label className="block mb-3">
                Tải lên ảnh CMND/CCCD:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setCmnd)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {/* Giấy phép kinh doanh */}
            <label className="block mb-3">
                Tải lên giấy phép kinh doanh:
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setCertificate)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {/* Lý do */}
            <label className="block mb-3">
                Lý do muốn trở thành staff:
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {/* Số điện thoại */}
            <label className="block mb-3">
                Số điện thoại:
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {/* Email */}
            <label className="block mb-3">
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {/* Nút lưu và hủy */}
            <div className="flex justify-end gap-2 mt-4">
                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
                    onClick={onClose}
                >
                    Hủy
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Gửi yêu cầu
                </button>
            </div>
        </div>
    );
};

export default StaffRequestForm;
