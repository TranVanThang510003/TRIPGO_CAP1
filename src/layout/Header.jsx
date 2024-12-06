import { useState, useEffect } from 'react';
import {
  faChevronDown,
  faUserCircle,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import Search from './Search.jsx';
import { Icon } from '@iconify/react/dist/iconify.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from '../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Toggle login form
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Toggle register form
  const [loggedInUser, setLoggedInUser] = useState(null); // State để lưu thông tin người dùng
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng
  const [isBellHovered, setIsBellHovered] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  // Khi component mount, kiểm tra xem người dùng đã đăng nhập chưa (lấy từ localStorage)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  // Hàm đăng xuất người dùng
  const handleLogout = () => {
    localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
    setLoggedInUser(null); // Cập nhật state
  };

  // Handle closing of modals
  const handleClose = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  // Xử lý khi người dùng đăng nhập thành công
  const handleLoginSuccess = (data) => {
    localStorage.setItem('user', JSON.stringify(data)); // Lưu thông tin người dùng vào localStorage
    setLoggedInUser(data); // Cập nhật state
    handleClose(); // Đóng form đăng nhập
  };

  // Xử lý khi click vào "Thông tin cá nhân"
  const handleShowProfile = () => {
    navigate('/profile'); // Điều hướng đến trang UserProfile
  };

  // Xử lý khi click vào thông báo
  const handleShowNotification = () => {
    navigate('/notification'); // Điều hướng đến trang Notification
  };

  // Handle logo click to navigate to the home page
  const handleLogoClick = () => {
    navigate('/'); // Điều hướng đến trang Home
  };

  return (
      <header className="px-[10%] fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center h-[80px] bg-white">
        <div className="flex items-center space-x-4">
          <img
              src="/logo.png"
              alt="Logo"
              className="cursor-pointer"
              onClick={handleLogoClick} // Add onClick event to navigate to home
          />
          <Search />
        </div>

        <nav className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2">
            {<Icon icon="twemoji:flag-vietnam" className="text-2xl" />}
            VN|VND
          </a>
          <FontAwesomeIcon icon={faChevronDown} />
          <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">
            Chuyển đi
          </a>
          <FontAwesomeIcon icon={faChevronDown} />
          <a href="#" className="text-gray-600 hover:text-gray-800 font-medium">
            Hỗ trợ
          </a>
          <FontAwesomeIcon icon={faChevronDown} />

          {/* Hiển thị avatar hoặc nút đăng nhập/đăng ký */}
          {loggedInUser ? (
              <div className="relative flex items-center space-x-2">
                <FontAwesomeIcon
                    icon={faBell}
                    className="text-gray-400 mr-6"
                    onClick={() => navigate('/notification')} // Khi chuột vào chuông
                    style={{ fontSize: '30px' }}
                />

                {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {notificationCount}
                            </span>
                )}


                <div className="cursor-pointer">
                  <FontAwesomeIcon
                      icon={faUserCircle}
                      className="text-gray-600"
                      onClick={handleShowProfile}
                      style={{ fontSize: '50px' }}
                  />
                </div>
              </div>
          ) : (
              <>
                {/* Open Login Form */}
                <button
                    className="px-4 py-2 font-medium rounded-lg text-white hover:bg-blue-700 bg-customBlue"
                    onClick={() => setIsLoginOpen(true)}
                >
                  Đăng Nhập
                </button>

                {/* Open Register Form */}
                <button
                    className="px-6 py-2 rounded-lg font-medium text-customBlue border-2 border-customBlue hover:bg-blue-700 bg-white"
                    onClick={() => setIsRegisterOpen(true)}
                >
                  Đăng Ký
                </button>
              </>
          )}
        </nav>

        {/* Show Login Form */}
        {isLoginOpen && (
            <AuthForm
                type="login"
                onSubmit={handleLoginSuccess}
                onClose={handleClose}
            />
        )}

        {/* Show Register Form */}
        {isRegisterOpen && (
            <AuthForm
                type="register"
                onSubmit={(data) => console.log('Register Data:', data)}
                onClose={handleClose}
            />
        )}
      </header>
  );
};

export default Header;
