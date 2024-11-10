import React, { useState, useEffect } from 'react';
import { FaHeart, FaCog, FaSignOutAlt, FaBars, FaHotel, FaChartBar, FaPlusCircle, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ selectedSection, onSectionChange = () => {} }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle sidebar open/close
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false); // Toggle service menu open/close
  const [role, setRole] = useState(null); // Lưu vai trò người dùng

  // Lấy vai trò từ localStorage khi component được mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Lấy role từ localStorage
    setRole(storedRole); // Cập nhật role vào state
  }, []);

  const handleNavigate = (label) => {
    onSectionChange(label);
    if (label === "Yêu thích") {
      navigate("/favourite");
    } else if (label === "Cài đặt") {
      navigate("/setting");
    } else if (label === "Đăng xuất") {
      localStorage.removeItem('user'); // Clear user info if stored
      localStorage.removeItem('role'); // Xóa role khi đăng xuất
      navigate("/"); // Redirect to home
    } else if (label === "Thêm Dịch Vụ") {
      navigate("/add-service");
    } else if (label === "Quản lý thông tin hóa đơn") {
      navigate("/manage-bills");
    } else if (label === "Quản lý tour") {
      navigate("/manage-tours");
    } else if (label === "Thống Kê Doanh Thu") {
      navigate("/revenue-statistics");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleServiceMenu = () => {
    setIsServiceMenuOpen(!isServiceMenuOpen);
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

        {/* Chỉ hiển thị các mục này nếu vai trò người dùng là `staff` */}
        {role === "staff" && (
          <>
            <MenuItem 
              icon={<FaPlusCircle />} 
              label="Thêm Dịch Vụ" 
              isSelected={selectedSection === "Thêm Dịch Vụ"}
              onClick={() => handleNavigate("Thêm Dịch Vụ")}
              isSidebarOpen={isSidebarOpen}
            />

            {/* Menu con cho Quản Lý Dịch Vụ */}
            <div>
              <MenuItem
                icon={<FaHotel />}
                label="Quản Lý Dịch Vụ"
                isSelected={selectedSection === "Quản Lý Dịch Vụ"}
                onClick={toggleServiceMenu}
                isSidebarOpen={isSidebarOpen}
                dropdownIcon={isServiceMenuOpen ? <FaChevronDown /> : <FaChevronRight />}
              />
              {isServiceMenuOpen && (
                <div className="pl-8">
                  <MenuItem 
                    label="Quản lý thông tin hóa đơn" 
                    onClick={() => handleNavigate("Quản lý thông tin hóa đơn")}
                    isSidebarOpen={isSidebarOpen}
                  />
                  <MenuItem 
                    label="Quản lý tour" 
                    onClick={() => handleNavigate("Quản lý tour")}
                    isSidebarOpen={isSidebarOpen}
                  />
                </div>
              )}
            </div>

            <MenuItem 
              icon={<FaChartBar />} 
              label="Thống Kê Doanh Thu" 
              isSelected={selectedSection === "Thống Kê Doanh Thu"}
              onClick={() => handleNavigate("Thống Kê Doanh Thu")}
              isSidebarOpen={isSidebarOpen}
            />
          </>
        )}

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

const MenuItem = ({ icon, label, isSelected, onClick, isSidebarOpen, dropdownIcon }) => (
  <div 
    onClick={onClick} 
    className={`flex items-center py-2.5 text-lg cursor-pointer transition-colors ${
      isSelected ? "text-[#3E86F5] font-bold" : "text-gray-800 hover:text-gray-600"
    }`}
  >
    <span className="mr-2.5">{icon}</span>
    {isSidebarOpen && <span className="flex-1">{label}</span>}
    {dropdownIcon && <span>{dropdownIcon}</span>}
  </div>
);

export default SideBar;
