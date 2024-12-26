import { useState, useEffect } from 'react';
import {
  faChevronDown,
  faUserCircle,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import Search from './Search.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from '../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Toggle login form
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Toggle register form
  const [isSupportOpen, setIsSupportOpen] = useState(false); // Toggle support dropdown
  const [loggedInUser, setLoggedInUser] = useState(null); // State để lưu thông tin người dùng
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng
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

  // Xử lý khi người dùng đăng nhập thành công
  const handleLoginSuccess = (data) => {
    localStorage.setItem('user', JSON.stringify(data)); // Lưu thông tin người dùng vào localStorage
    setLoggedInUser(data); // Cập nhật state
    setIsLoginOpen(false); // Đóng form đăng nhập
  };

  // Điều hướng trang cá nhân
  const handleShowProfile = () => {
    navigate('/profile');
  };

  // Điều hướng thông báo
  const handleShowNotification = () => {
    navigate('/notification');
  };

  // Điều hướng trang chủ
  const handleLogoClick = () => {
    navigate('/');
  };

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.support-dropdown')) {
        setIsSupportOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="px-[10%] fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center h-[80px] bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="cursor-pointer"
          onClick={handleLogoClick}
        />
        <Search />
      </div>

      <nav className="flex items-center space-x-4">
        {/* Dropdown Hỗ trợ */}
        <div className="relative support-dropdown">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 font-medium flex items-center"
            onClick={(e) => {
              e.preventDefault();
              setIsSupportOpen(!isSupportOpen);
            }}
          >
            Hỗ trợ
            <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </a>
          {isSupportOpen && (
            <div className="absolute mt-2 bg-white shadow-md rounded-lg p-6 w-64 z-50">
              <p className="text-gray-800 font-medium">Liên hệ hỗ trợ:</p>
              <p className="text-gray-600">Số điện thoại: 0866715638</p>
              <p className="text-gray-600">Email: Lemanhan@gmail.com.com</p>
            </div>
          )}
        </div>

        {/* Hiển thị avatar hoặc nút đăng nhập/đăng ký */}
        {loggedInUser ? (
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faBell}
                className="text-gray-400 cursor-pointer"
                onClick={handleShowNotification}
                style={{ fontSize: '30px' }}
              />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </div>

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
            {/* Nút đăng nhập */}
            <button
              className="px-4 py-2 font-medium rounded-lg text-white hover:bg-blue-700 bg-customBlue"
              onClick={() => setIsLoginOpen(true)}
            >
              Đăng Nhập
            </button>

            {/* Nút đăng ký */}
            <button
              className="px-6 py-2 rounded-lg font-medium text-customBlue border-2 border-customBlue hover:bg-blue-700 bg-white"
              onClick={() => setIsRegisterOpen(true)}
            >
              Đăng Ký
            </button>
          </>
        )}
      </nav>

      {/* Form đăng nhập */}
      {isLoginOpen && (
        <AuthForm
          type="login"
          onSubmit={handleLoginSuccess}
          onClose={() => setIsLoginOpen(false)}
        />
      )}

      {/* Form đăng ký */}
      {isRegisterOpen && (
        <AuthForm
          type="register"
          onSubmit={(data) => console.log('Register Data:', data)}
          onClose={() => setIsRegisterOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
