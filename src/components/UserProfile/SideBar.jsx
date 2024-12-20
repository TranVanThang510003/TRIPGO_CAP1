import React, { useState, useEffect } from 'react';
import { FaHeart, FaCog,FaShoppingCart ,FaBell, FaSignOutAlt, FaBars, FaHotel, FaChartBar, FaPlusCircle, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ selectedSection, onSectionChange = () => {} }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle sidebar open/close
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false); // Toggle service menu open/close
  const [isAddServiceMenuOpen, setIsAddServiceMenuOpen] = useState(false); // Toggle add service sub-menu
  const [role, setRole] = useState(null); // Lưu vai trò người dùng

  // Lấy vai trò từ localStorage khi component được mount
  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem("user"))?.role; // Lấy role từ localStorage
    setRole(storedRole); // Cập nhật role vào state
  }, []);

  const handleNavigate = (label) => {
    onSectionChange(label);
    if (label === "Yêu thích") {
      navigate("/favourite");
    } else if (label === "Đơn hàng") {
      navigate("/order");
    } else if (label === "Thông báo") {
      navigate("/notification");
    } else if (label === "Cài đặt") {
      navigate("/setting");
    } else if (label === "Đăng xuất") {
      localStorage.removeItem('user'); // Clear user info if stored
      localStorage.removeItem('role'); // Xóa role khi đăng xuất
      navigate("/"); // Redirect to home
      window.location.reload();
    }
     else if (label === "Thêm Tour") {
      navigate("/create-tour");
    } else if (label === "Thêm Hotel") {
      navigate("/create-hotel");
    } else if (label === "Thêm Activity") {
      navigate("/add-activity");
    } else if (label === "Thêm Restaurant") {
      navigate("/add-restaurant");
    } else if (label === "Quản lý thông tin Khách hàng") {
      navigate("/order-list");
    } else if (label === "Quản lý tour") {
      navigate("/manage-tours");
    } else if (label === "Quản lý hotel") {
      navigate("/manage-hotels");
    } else if (label === "Quản lý room") {
      navigate("/manage-rooms");
    } else if (label === "Thống Kê Doanh Thu") {
      navigate("/revenue");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleServiceMenu = () => {
    setIsServiceMenuOpen(!isServiceMenuOpen);
  };

  const toggleAddServiceMenu = () => {
    setIsAddServiceMenuOpen(!isAddServiceMenuOpen);
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
              <a href="/profile" className="text-sm no-underline">Cập nhật thông tin cá nhân &gt;</a>
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
            icon={<FaShoppingCart />}
            label="Đơn hàng"
            isSelected={selectedSection === "Đơn hàng"}
            onClick={() => handleNavigate("Đơn hàng")}
            isSidebarOpen={isSidebarOpen}
        />
        <MenuItem
            icon={<FaBell />}
            label="Thông báo"
            isSelected={selectedSection === "Thông báo"}
            onClick={() => handleNavigate("Thông báo")}
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
            {/* Thêm Dịch Vụ với menu con */}
            <div>
              <MenuItem
                icon={<FaPlusCircle />}
                label="Tạo Dịch Vụ"
                isSelected={selectedSection === "Thêm Dịch Vụ"}
                onClick={toggleAddServiceMenu}
                isSidebarOpen={isSidebarOpen}
                dropdownIcon={isAddServiceMenuOpen ? <FaChevronDown /> : <FaChevronRight />}
              />
              {isAddServiceMenuOpen && (
                <div className="pl-8">
                  <MenuItem 
                    label="Tour"
                    onClick={() => handleNavigate("Thêm Tour")}
                    isSidebarOpen={isSidebarOpen}
                  />
                  <MenuItem 
                    label="Hotel"
                    onClick={() => handleNavigate("Thêm Hotel")}
                    isSidebarOpen={isSidebarOpen}
                  />
                  <MenuItem 
                    label="Activity"
                    onClick={() => handleNavigate("Thêm Activity")}
                    isSidebarOpen={isSidebarOpen}
                  />
                  <MenuItem 
                    label="Restaurant"
                    onClick={() => handleNavigate("Thêm Restaurant")}
                    isSidebarOpen={isSidebarOpen}
                  />
                </div>
              )}
            </div>

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
                    label="Quản lý thông tin Khách hàng"
                    onClick={() => handleNavigate("Quản lý thông tin Khách hàng")}
                    isSidebarOpen={isSidebarOpen}
                  />
                  <MenuItem 
                    label="Quản lý tour" 
                    onClick={() => handleNavigate("Quản lý tour")}
                    isSidebarOpen={isSidebarOpen}
                  />
                  <MenuItem
                      label="Quản lý hotel"
                      onClick={() => handleNavigate("Quản lý hotel")}
                      isSidebarOpen={isSidebarOpen}
                  />
                  <MenuItem
                      label="Quản lý room"
                      onClick={() => handleNavigate("Quản lý room")}
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
