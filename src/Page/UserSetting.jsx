// Settings.js
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import SideBar from '../components/UserProfile/SideBar';
import ConfirmationModal from '../components/UserProfile/ConfirmationModal'; // Import modal

const Settings = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState("Cài đặt");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State kiểm soát modal

    // Kiểm tra tính hợp lệ của mật khẩu và xác nhận mật khẩu
    useEffect(() => {
        const isFormValid =
            password.length >= 8 &&
            password.length <= 20 &&
            /\d/.test(password) &&
            /[A-Za-z]/.test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password === confirmPassword;
        setIsSaveEnabled(isFormValid);
    }, [password, confirmPassword]);

    // Hàm xử lý khi lưu mật khẩu
    const handleSave = () => {
        if (isSaveEnabled) {
            console.log("Password updated:", password);
            setPassword('');
            setConfirmPassword('');
        }
    };

    // Hàm xử lý khi xác nhận xóa
    const handleDelete = () => {
        console.log("Account deletion confirmed.");
        setIsModalOpen(false);
        // Thêm logic xóa tài khoản ở đây nếu cần
    };

    return (
        <div className='bg-[#f8f8f8] w-full min-h-screen overflow-auto'>
            <Header />

            <div className="w-full flex flex-col md:flex-row gap-4 h-auto bg-[#f8f8f8] mx-auto pt-16 md:pt-28 px-[10%]">
                <div className="w-full md:w-1/4">
                    <SideBar
                        selectedSection={selectedSection}
                        onSectionChange={setSelectedSection}
                    />
                </div>
                {/* Main content */}
                <div className="flex-grow bg-white p-4 rounded-xl shadow-md mt-6 md:mt-0 relative">
                    <h1 className="text-[30px] text-[#181E4B] font-bold mb-4">Cài đặt</h1>

                    <div className="w-[824px] h-auto bg-white rounded-[20px] mx-auto relative">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Đổi mật khẩu</h2>
                            <p className="text-gray-600 mb-2">Hãy tạo một mật khẩu mạnh để tài khoản của bạn được an toàn</p>
                            <label className="block text-gray-700 font-medium mb-2">Đặt mật khẩu (Mật khẩu phải từ 8-20 kí tự với ít nhất 1 số, 1 chữ cái, và 1 kí tự đặc biệt)</label>
                            <div className="mb-4 relative w-[40%]">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    className="w-full border border-gray-300 rounded p-2 pr-10"
                                />
                                <Icon
                                    icon={isPasswordVisible ? "ph:eye-thin" : "ph:eye-slash-thin"}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                />
                            </div>
                            <div className="mb-4 relative w-[40%]">
                                <input
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Xác nhận mật khẩu"
                                    className="w-full border border-gray-300 rounded p-2 pr-10"
                                />
                                <Icon
                                    icon={isConfirmPasswordVisible ? "ph:eye-thin" : "ph:eye-slash-thin"}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                />
                            </div>
                            <button
                                className={`py-2 px-6 rounded font-semibold ${isSaveEnabled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-white cursor-not-allowed'}`}
                                onClick={handleSave}
                                disabled={!isSaveEnabled}
                            >
                                Lưu
                            </button>
                        </div>

                        {/* Phần xóa tài khoản */}
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold mb-2 text-red-500">Xóa tài khoản</h2>
                            <p className="text-gray-600 mb-4">Xóa tài khoản và dữ liệu cá nhân của bạn</p>
                            <button
                                className="bg-red-600 text-white font-semibold py-2 px-6 rounded hover:bg-red-700 focus:outline-none"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Xóa tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal xác nhận */}
            {isModalOpen && (
                <ConfirmationModal
                    onConfirm={handleDelete}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Settings;
