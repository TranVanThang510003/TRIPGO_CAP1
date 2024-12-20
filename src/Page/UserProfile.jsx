import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../layout/Header';
import SideBar from '../components/UserProfile/SideBar';
import StaffRequestForm from "../components/UserProfile/StaffRequestForm.jsx"
const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userRole = JSON.parse(localStorage.getItem('user'))?.role;


  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // Đóng/mở modal
  };
  // Lấy thông tin người dùng
  const fetchUserData = async () => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id; // Lấy ID người dùng từ localStorage
    if (!userId) {
      navigate('/login'); // Nếu không tìm thấy ID, điều hướng đến trang đăng nhập
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setUpdateMessage(''); // Reset message khi bắt đầu chỉnh sửa
  };

  const handleUpdate = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'))?.id; // Lấy ID người dùng từ localStorage

      // Kiểm tra xem các trường có giá trị hay không
      if (
        !user.USERNAME ||
        !user.EMAIL ||
        !user.PHONE ||
        !user.ADDRESS ||
        !user.BIRTHDAY
      ) {
        console.error('Một hoặc nhiều trường không có giá trị.');
        setUpdateMessage('Vui lòng điền đầy đủ thông tin.');
        return;
      }

      // Gửi yêu cầu cập nhật
      await axios.put(`http://localhost:3000/users/${userId}`, {
        USERNAME: user.USERNAME,
        EMAIL: user.EMAIL,
        PHONE: user.PHONE,
        ADDRESS: user.ADDRESS,
        BIRTHDAY: user.BIRTHDAY, // Sử dụng giá trị đã nhập
      });

      setIsEditing(false);
      setUpdateMessage('Cập nhật thông tin thành công!'); // Thông báo cập nhật thành công
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
      setUpdateMessage('Cập nhật thông tin thất bại.'); // Thông báo thất bại
    }
  };

  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')}/${date.getFullYear()}`; // Định dạng lại thành DD/MM/YYYY
  };

  if (!user) return <div>Loading...</div>; // Thay thế với loading spinner nếu cần

  return (
    <div className="bg-[#f8f8f8] w-full min-h-screen overflow-auto">
      <Header />
      <div className=" flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-6 mt-4">
        {/* Sidebar */}
        <div className="mr-2">
          <SideBar />
        </div>
        {/* Main content */}
        <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0">
          <h1 className="text-[30px] text-[#181E4B] font-bold mb-4">
            Thông tin cá nhân
          </h1>
          {/* Personal Information */}
          <div className="space-y-6 text-[14px] text-[#8A8A8A]">
            <InfoRow
              label="Tên"
              value={user.USERNAME}
              isEditing={isEditing}
              setValue={(value) => setUser({ ...user, USERNAME: value })}
            />
            <InfoRow
              label="Ngày sinh"
              value={
                isEditing
                  ? user.BIRTHDAY
                    ? user.BIRTHDAY.split('T')[0]
                    : ''
                  : formatDateForDisplay(user.BIRTHDAY)
              } // Kiểm tra điều kiện cho BIRTHDAY
              isEditing={isEditing}
              setValue={(value) => setUser({ ...user, BIRTHDAY: value })} // Cập nhật giá trị từ input
              inputType="date" // Đặt loại input là date
            />
            <InfoRow
              label="Số điện thoại"
              value={user.PHONE}
              isEditing={isEditing}
              setValue={(value) => setUser({ ...user, PHONE: value })}
            />
            <InfoRow
              label="Email"
              value={user.EMAIL}
              isEditing={isEditing}
              setValue={(value) => setUser({ ...user, EMAIL: value })}
            />
            <InfoRow
              label="Địa chỉ"
              value={user.ADDRESS}
              isEditing={isEditing}
              setValue={(value) => setUser({ ...user, ADDRESS: value })}
            />
          </div>
          {/* Update button */}
          <div className="mt-12 ">
            {userRole !== 'staff' && (
                <a
                    className="px-6 py-2 float-left text-blue-500 font-medium rounded pointer cursor-pointer hover:underline"
                    onClick={handleModalToggle}
                >
                  Đăng ký trở thành staff
                </a>
            )}
            {isEditing ? (
                <button
                    className="px-6 py-2 float-right bg-[#03387E] text-white font-medium rounded hover:bg-[#03255B] focus:ring-2 focus:ring-[#03387E] focus:outline-none"
                    onClick={handleUpdate}
                >
                  Cập nhật
                </button>
            ) : (
                <button
                    className="px-6  py-2 float-right bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onClick={handleEdit}
                >
                  Chỉnh sửa
                </button>
            )}


            {/* Modal thêm phòng */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">


                  <StaffRequestForm
                           onClose={handleModalToggle}/>

                </div>
            )}
          </div>
          {updateMessage && (
              <div className="text-red-500 mt-4">{updateMessage}</div>
          )}{' '}
          {/* Hiển thị thông báo cập nhật */}
        </div>
      </div>
    </div>
  );
};

// Component to display each row of information
const InfoRow = ({label, value, isEditing, setValue, inputType}) => (
    <div className="flex justify-between items-center border-b pb-2">
    <div>
      <span className="block font-medium">{label}</span>
      {isEditing ? (
        <input
          type={inputType || 'text'} // Sử dụng loại input truyền vào (date hoặc text)
          value={value} // Giá trị từ state
          onChange={(e) => setValue(e.target.value)} // Cập nhật state
          className="text-[16px] text-[#181E4B] font-normal border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <span className="text-[16px] text-[#181E4B] font-normal">{value}</span>
      )}
    </div>
  </div>
);

export default UserProfile;
