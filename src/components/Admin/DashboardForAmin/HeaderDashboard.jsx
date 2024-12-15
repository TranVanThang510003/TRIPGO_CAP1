import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const HeaderDashboard = () => {
    const [adminName, setAdminName] = useState("");

    useEffect(() => {
        // Lấy token từ localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token); // Giải mã token
                setAdminName(decoded.username);  // Lấy username từ payload của token
            } catch (error) {
                console.error("Lỗi giải mã token:", error);
            }
        }
    }, []);

    return (
        <header className="flex items-center justify-between p-4 bg-gray-200">
            <h1 className="text-3xl font-semibold text-blue-600">Dashboard</h1>

            <div className="flex items-center">
                {/* Avatar with styles */}
                <div className="relative w-12 h-12">
                    <img
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                        alt="User Avatar"
                        className="w-full h-full rounded-full border-2 border-blue-500 shadow-md object-cover bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                </div>

                {/* User Information */}
                <div className="flex flex-col ml-3">
                    <span className="text-base font-medium text-gray-800">{adminName || "Admin"}</span>
                    <span className="text-xs font-normal text-gray-500">Admin</span>
                </div>
            </div>
        </header>
    );
};

export default HeaderDashboard;
