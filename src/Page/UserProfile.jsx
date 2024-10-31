import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import SideBar from '../components/UserProfile/SideBar';

const UserProfile = () => {
  const navigate = useNavigate();

  // Mock data for user information
  const [user, setUser] = useState({
    id: "1",
    fullName: "Trần Văn Thắng",
    birthday: "05/10/2003",
    phone: "0931951269",
    email: "tvt@gmail.com",
    address: "Quảng Nam"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    // Logic to save updated user information can be added here
    console.log("User information updated:", user);
  };

  return (
    <div className='bg-[#f8f8f8] w-full min-h-screen overflow-auto'>
      <Header />

      <div className="w-full flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-auto pt-16 md:pt-28 px-[10%]">
        {/* Sidebar */}
        <div className="mr-2">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0">
          <h1 className="text-[30px] text-[#181E4B] font-bold mb-4">Thông tin cá nhân</h1>

          {/* Personal Information */}
          <div className="space-y-6 text-[14px] text-[#8A8A8A]">
            <InfoRow label="Tên" value={user.fullName} isEditing={isEditing} setValue={(value) => setUser({ ...user, fullName: value })} />
            <InfoRow label="Ngày sinh" value={user.birthday} isEditing={isEditing} setValue={(value) => setUser({ ...user, birthday: value })} />
            <InfoRow label="Số điện thoại" value={user.phone} isEditing={isEditing} setValue={(value) => setUser({ ...user, phone: value })} />
            <InfoRow label="Email" value={user.email} isEditing={isEditing} setValue={(value) => setUser({ ...user, email: value })} />
            <InfoRow label="Địa chỉ" value={user.address} isEditing={isEditing} setValue={(value) => setUser({ ...user, address: value })} />
          </div>

          {/* Update button */}
          <div className="mt-12">
            {isEditing ? (
              <button
                className="px-6 py-2 float-right bg-[#03387E] text-white font-medium rounded hover:bg-[#03255B] focus:ring-2 focus:ring-[#03387E] focus:outline-none"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            ) : (
              <button
                className="px-6 py-2 float-right bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onClick={handleEdit}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to display each row of information
const InfoRow = ({ label, value, isEditing, setValue }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <div>
      <span className="block font-medium">{label}</span>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-[16px] text-[#181E4B] font-normal border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <span className="text-[16px] text-[#181E4B] font-normal">{value}</span>
      )}
    </div>
  </div>
);

export default UserProfile;
