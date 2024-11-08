import React, { useState } from 'react';
import { FaHeart, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ selectedSection, onSectionChange = () => {} }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle sidebar open/close

  const handleNavigate = (label) => {
    onSectionChange(label);
    if (label === "Yêu thích") {
      navigate("/favourite");
    } else if (label === "Cài đặt") {
      navigate("/setting");
    } else if (label === "Đăng xuất") {
      localStorage.removeItem('user'); // Clear user info if stored
      navigate("/"); // Redirect to home
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`transition-transform ${isSidebarOpen ? "w-[280px]" : "w-[70px]"} bg-white shadow-md font-sans rounded-lg`}>
      <div className="relative">
        <button 
          onClick={toggleSidebar} 
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <FaBars />
        </button>
        <div className="p-9 text-center bg-gradient-to-b from-[#2668A1] to-[#141B64] text-white">
          {isSidebarOpen && (
            <>
              <div className="w-[60px] h-[60px] mx-auto rounded-full overflow-hidden">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  alt="User Avatar"
                  className="w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-[23px] font-semibold">Người dùng TripGo</h3>
              <a href="#" className="text-sm no-underline">Cập nhật thông tin cá nhân &gt;</a>
            </>
          )}
        </div>
      </div>

      <div className={`px-10 py-5 ${!isSidebarOpen ? "text-center" : ""}`}>
        <MenuItem 
          icon={<FaHeart />} 
          label="Yêu thích" 
          isSelected={selectedSection === "Yêu thích"}
          onClick={() => handleNavigate("Yêu thích")}
          isSidebarOpen={isSidebarOpen}
        />
        <MenuItem 
          icon={<FaCog />} 
          label="Cài đặt" 
          isSelected={selectedSection === "Cài đặt"}
          onClick={() => handleNavigate("Cài đặt")}
          isSidebarOpen={isSidebarOpen}
        />
        <MenuItem 
          icon={<FaSignOutAlt />} 
          label="Đăng xuất" 
          onClick={() => handleNavigate("Đăng xuất")}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, isSelected, onClick, isSidebarOpen }) => (
  <div 
    onClick={onClick} 
    className={`flex items-center py-2.5 text-lg cursor-pointer transition-colors ${
      isSelected ? "text-[#3E86F5] font-bold" : "text-gray-800 hover:text-gray-600"
    }`}
  >
    <span className="mr-2.5">{icon}</span>
    {isSidebarOpen && <span>{label}</span>}
  </div>
);

export default SideBar;
