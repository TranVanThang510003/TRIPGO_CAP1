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
            navigate("/admin/accounts");

    }else if (label === "Thông báo") {
        navigate("/admin/notification");
    }
    };

    return (
        <div className="w-1/6 bg-blue-800 text-white flex flex-col p-4">
            <h2 className="text-2xl font-bold mb-6 mt-3 mx-auto">Trang chủ Admin</h2>
            <nav>
                <ul>
                    <li
                        className={`mb-4 p-2 rounded  cursor-pointer ${selectedSection === "DashBoard" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                        onClick={() => handleNavigate("DashBoard")}
                    >
                        DashBoard
                    </li>
                    <li
                        className={`mb-4 p-2 rounded  cursor-pointer ${selectedSection === "Quản lý giao dịch" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                        onClick={() => handleNavigate("Quản lý giao dịch")}
                    >
                        Quản lý giao dịch
                    </li>
                    <li
                        className={`mb-4 p-2 cursor-pointer rounded ${selectedSection === "Quản lý tài khoản" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                        onClick={() => handleNavigate("Quản lý tài khoản")}
                    >
                        Quản lý tài khoản
                    </li>
                    <li
                        className={`mb-4 p-2 cursor-pointer rounded ${selectedSection === "Thông báo" ? "bg-blue-700" : "hover:bg-blue-700"}`}
                        onClick={() => handleNavigate("Thông báo")}
                    >
                        Thông báo
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
