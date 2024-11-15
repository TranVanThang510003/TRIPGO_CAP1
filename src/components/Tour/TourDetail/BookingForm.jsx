import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';

const BookingForm = ({ priceAdult, priceChild, tour_id }) => {
  const [user_id, setUserId] = useState(null); 
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserId(user.id);
    }
  }, []);

  const calculateTotalPrice = () => {
    return adults * priceAdult + children * priceChild;
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
    const formattedDate = moment(startDate).format("YYYY-MM-DD"); // Định dạng ngày cho BE

    const bookingData = {
      tour_id: tour_id,
      user_id: user_id,
      adults: adults,
      children: children,
      total_price: calculateTotalPrice(),
      service_date: formattedDate, // Định dạng chuẩn cho BE
    };

    try {
      const response = await axios.post('http://localhost:3000/payment', bookingData);
      console.log("Phản hồi từ server:", response.data);

      if (response.data.return_code === 1) {
        window.location.href = response.data.order_url; // Chuyển hướng đến trang thanh toán
      } else {
        alert("Thanh toán thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu thanh toán:", error.message);
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-lg font-semibold mb-4">Chọn ngày tham quan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            inline
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Chọn số lượng</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Người lớn</p>
                <p className="text-sm text-gray-500">141 cm trở lên</p>
              </div>
              <div className="flex items-center">
                <button className="p-1 bg-gray-200 rounded-full" onClick={() => handleAdultsChange('decrement')}>
                  <Icon icon="fa-solid:minus" />
                </button>
                <span className="mx-2">{adults}</span>
                <button className="p-1 bg-gray-200 rounded-full" onClick={() => handleAdultsChange('increment')}>
                  <Icon icon="fa-solid:plus" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="font-medium">Trẻ em</p>
                <p className="text-sm text-gray-500">100 - 140 cm</p>
              </div>
              <div className="flex items-center">
                <button className="p-1 bg-gray-200 rounded-full" onClick={() => handleChildrenChange('decrement')}>
                  <Icon icon="fa-solid:minus" />
                </button>
                <span className="mx-2">{children}</span>
                <button className="p-1 bg-gray-200 rounded-full" onClick={() => handleChildrenChange('increment')}>
                  <Icon icon="fa-solid:plus" />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 bg-gray-100 p-4">
            <p className="text-sm text-gray-600">
              Ngày dịch vụ: {startDate ? startDate.toLocaleDateString() : 'Chưa chọn'}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-orange-600">{calculateTotalPrice().toLocaleString()} VND</p>
            <button onClick={handleBooking} className="w-full mt-4 p-2 bg-orange-500 text-white rounded-md">Đặt ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
