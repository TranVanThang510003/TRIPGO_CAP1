import Sidebar from "../Sidebar";
import NotificationList from "./NotificationList";
import {useEffect, useState} from "react";
const Notification = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar className="w-1/6" />
            {/* Main Content Area */}
            <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold text-blue-600">Thông báo</h1>
                </div>
                {/* Danh sách thông báo */}
                <NotificationList />
            </div>
        </div>
    );
};

export default Notification;
