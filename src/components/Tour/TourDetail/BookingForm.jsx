import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

const BookingForm = ({ tour_id, schedules }) => {
  const [user_id, setUserId] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null); // Ngày được chọn
  const [availableDates, setAvailableDates] = useState([]); // Danh sách ngày có sẵn
  const [currentPrice, setCurrentPrice] = useState({ adult: 0, child: 0 }); // Giá hiện tại
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setUserId(user.id);
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }

    // Lấy danh sách ngày khởi hành từ props schedules
    if (schedules) {
      const dates = schedules.map((schedule) =>
        moment(schedule.departureDate).toDate() // Chuyển đổi ngày từ DB thành đối tượng Date
      );
      setAvailableDates(dates);
    }
  }, [schedules]);

  // Khi người dùng chọn ngày, cập nhật giá
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Tìm lịch trình tương ứng trong schedules
    const selectedSchedule = schedules.find((schedule) =>
      moment(schedule.departureDate).isSame(date, 'day')
    );

    if (selectedSchedule) {
      setCurrentPrice({
        adult: selectedSchedule.priceAdult || 0, // Giá người lớn từ API
        child: selectedSchedule.priceChild || 0, // Giá trẻ em từ API
      });
    } else {
      setCurrentPrice({ adult: 0, child: 0 }); // Không tìm thấy lịch trình
    }
  };

  const calculateTotalPrice = () => {
    const adultPrice = currentPrice.adult || 0;
    const childPrice = currentPrice.child || 0;
    return adults * adultPrice + children * childPrice;
  };

  const handleAdultsChange = (operation) => {
    if (operation === 'increment') {
      setAdults(adults + 1);
    } else if (operation === 'decrement' && adults > 1) {
      setAdults(adults - 1);
    }
  };

  const handleChildrenChange = (operation) => {
    if (operation === 'increment') {
      setChildren(children + 1);
    } else if (operation === 'decrement' && children > 0) {
      setChildren(children - 1);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate) {
      alert('Vui lòng chọn ngày khởi hành.');
      return;
    }
    if (!isLoggedIn) {
        alert('Vui lòng đăng nhập trước khi đặt tour.');
        return; // Dừng lại nếu người dùng chưa đăng nhập
      }


    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

    const bookingData = {
      tour_id: tour_id,
      user_id: user_id,
      adults: adults,
      children: children,
      total_price: calculateTotalPrice(),
      service_date: formattedDate,
    };

    try {
      const response = await axios.post('http://localhost:3000/payment', bookingData);
      console.log('Phản hồi từ server:', response.data);

      if (response.data.return_code === 1) {
        window.location.href = response.data.order_url; // Chuyển hướng đến trang thanh toán
      } else {
        alert('Thanh toán thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu thanh toán:', error.message);
    }
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <div className="p-8 bg-white shadow-lg rounded-md flex flex-row">
      {/* Phần lịch */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Chọn ngày tham quan</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          includeDates={availableDates} // Chỉ hiển thị và cho phép chọn ngày trong DB
          highlightDates={availableDates} // Làm nổi bật các ngày có trong DB
          minDate={tomorrow} // Chỉ cho phép chọn ngày từ sau hôm nay trở đi
          inline
          dayClassName={(date) =>
            availableDates.some((availableDate) =>
              moment(availableDate).isSame(date, 'day')
            )
              ? 'react-datepicker__day--highlighted' // Thêm class tùy chỉnh cho ngày sáng
              : 'react-datepicker__day--disabled' // Thêm class cho ngày không chọn được
          }
        />
      </div>

      {/* Phần chi tiết đặt tour */}
      <div className="w-full bg-white rounded-lg shadow-md px-8 py-8">
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Chọn số lượng</h3>
          {/* Người lớn */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Người lớn</p>
              <p className="text-sm text-gray-500">141 cm trở lên</p>
            </div>
            <div className="flex items-center">
              <button
                className="p-1 bg-gray-200 rounded-full"
                onClick={() => handleAdultsChange('decrement')}
              >
                <Icon icon="fa-solid:minus" />
              </button>
              <span className="mx-2">{adults}</span>
              <button
                className="p-1 bg-gray-200 rounded-full"
                onClick={() => handleAdultsChange('increment')}
              >
                <Icon icon="fa-solid:plus" />
              </button>
            </div>
          </div>

          {/* Trẻ em */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="font-medium">Trẻ em</p>
              <p className="text-sm text-gray-500">100 - 140 cm</p>
            </div>
            <div className="flex items-center">
              <button
                className="p-1 bg-gray-200 rounded-full"
                onClick={() => handleChildrenChange('decrement')}
              >
                <Icon icon="fa-solid:minus" />
              </button>
              <span className="mx-2">{children}</span>
              <button
                className="p-1 bg-gray-200 rounded-full"
                onClick={() => handleChildrenChange('increment')}
              >
                <Icon icon="fa-solid:plus" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-gray-100 p-4">
          <p className="text-sm text-gray-600">
            Ngày dịch vụ: {selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : 'Chưa chọn'}
          </p>
          <p className="text-sm text-gray-600">
            Giá người lớn: {currentPrice.adult ? currentPrice.adult.toLocaleString() : 'Chưa cập nhật'}{' '}
            VND
          </p>
          <p className="text-sm text-gray-600">
            Giá trẻ em: {currentPrice.child ? currentPrice.child.toLocaleString() : 'Chưa cập nhật'}{' '}
            VND
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-orange-600">{calculateTotalPrice().toLocaleString()} VND</p>
          <button
            onClick={handleBooking}
            className="w-full mt-4 p-2 bg-orange-500 text-white rounded-md"
          >
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
