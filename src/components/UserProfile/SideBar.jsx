import React from 'react';
import { FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';

const SideBar = ({ selectedSection, onSectionChange }) => {
  return (
    <div className="w-[280px] rounded-lg bg-white shadow-md overflow-hidden font-sans">
      <div className="p-9 text-center bg-gradient-to-b from-[#2668A1] to-[#141B64] text-white">
        <div className="w-[60px] h-[60px] mx-auto rounded-full overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt="User Avatar"
            className="w-full h-full"
          />
        </div>
        <h3 className="mt-4 text-[23px] font-semibold text-[#ffffff]">Người dùng TripGo</h3>
        <a href="#" className="text-sm text-white no-underline">Cập nhật thông tin cá nhân &gt;</a>
      </div>
      <div className="px-10 py-5">
        <MenuItem 
          icon={<FaHeart />} 
          label="Yêu thích" 
          isSelected={selectedSection === "Yêu thích"}
          onClick={() => onSectionChange("Yêu thích")}
        />
        <MenuItem 
          icon={<FaCog />} 
          label="Cài đặt" 
          isSelected={selectedSection === "Cài đặt"}
          onClick={() => onSectionChange("Cài đặt")}
        />
        <MenuItem 
          icon={<FaSignOutAlt />} 
          label="Đăng xuất" 
          onClick={() => onSectionChange("Đăng xuất")}
        />
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, isSelected, onClick }) => (
  <div 
    onClick={onClick} 
    className={`flex items-center py-2.5 text-lg cursor-pointer transition-colors ${
      isSelected ? "text-[#3E86F5]" : "text-gray-800 hover:text-gray-600"
    }`}
  >
    <span className="mr-2.5">{icon}</span>
    <span>{label}</span>
  </div>
);

export default SideBar;
