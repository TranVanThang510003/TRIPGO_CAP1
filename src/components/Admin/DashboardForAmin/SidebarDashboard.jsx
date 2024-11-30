import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [selectedSection, setSelectedSection] = useState(null);
    const navigate = useNavigate();

    const handleNavigate = (label) => {
        setSelectedSection(label); // Cập nhật mục được chọn

        if (label === "DashBoard") {
            navigate("/admin/dashboard");
        } else if (label === "Quản lý giao dịch") {
            navigate("/admin/transaction");
        } else if (label === "Quản lý tài khoản") {
            navigate("/admin");
        }
    };

    return (
        <div className="w-64 bg-blue-800 text-white flex flex-col p-4">
            <h2 className="text-xl font-bold mb-6">Trang chủ Admin</h2>
            <nav>
                <ul>
                    <li
                        className={`mb-4 p-2 rounded ${selectedSection === "DashBoard" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                        onClick={() => handleNavigate("DashBoard")}
                    >
                        DashBoard
                    </li>
                    <li
                        className={`mb-4 p-2 rounded ${selectedSection === "Quản lý giao dịch" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                        onClick={() => handleNavigate("Quản lý giao dịch")}
                    >
                        Quản lý giao dịch
                    </li>
                    <li
                        className={`mb-4 p-2 rounded ${selectedSection === "Quản lý tài khoản" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                        onClick={() => handleNavigate("Quản lý tài khoản")}
                    >
                        Quản lý tài khoản
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
