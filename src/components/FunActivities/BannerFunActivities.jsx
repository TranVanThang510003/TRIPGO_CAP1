/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Đảm bảo import CSS

const BannerFunActivities = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // Hàm để tính ngày hôm sau
  const getNextDay = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1); // Cộng thêm 1 ngày
    return nextDay;
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-[400px]"
        style={{
          backgroundImage: "url('public/img/pho-thang-1168106 1.png')",
        }}
      >
        {/* Lớp phủ đen mờ */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>

        {/* Nội dung */}
        <div className="relative z-10 flex flex-col text-white mt-[80px] pt-10 ">
          <div className="ml-32">
            <h1 className="text-5xl font-bold mt-28">Địa điểm vui chơi</h1>
            <p className="text-lg mt-5">
              "Khám phá các công viên giải trí, bảo tàng tuyệt vời nhất và nhiều
              địa điểm không thể bỏ qua khác"
            </p>
          </div>

          {/* Địa điểm và Ngày đi */}
          <div className="flex justify-center mt-[65px]">
            <div className="bg-slate-200 w-[1187px] h-[120px] flex justify-center items-center rounded-xl">
              {/* Điểm đến */}
              <div className="flex flex-col mx-2">
                <div className="text-sm text-slate-600 font-medium">
                  Điểm đến
                </div>
                <div className="px-6 bg-white rounded-xl text-customBlue font-medium flex justify-between items-center w-[500px] h-[64px]">
                  <Icon
                    icon="mdi:location"
                    className="w-7 h-7 text-slate-500"
                  />
                  <select className="px-2 w-full text-black">
                    <option>Chọn điểm đến</option>
                    <option>Đà Nẵng</option>
                    <option>Hà Nội</option>
                    <option>TP.HCM</option>
                  </select>
                </div>
              </div>

              {/* Chọn ngày */}
              <div className="flex flex-col mx-2">
                <div className="text-sm text-slate-600 font-medium">
                  Chọn ngày
                </div>
                <div className="px-6 bg-white rounded-xl text-customBlue font-medium flex items-center w-[500px] h-[64px]">
                  <Icon
                    icon="mdi:calendar"
                    className="w-7 h-7 text-slate-500 mr-2"
                  />
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => {
                      setCheckInDate(date);
                      // Nếu ngày trả phòng hiện tại thấp hơn ngày nhận phòng, reset lại ngày trả phòng
                      if (checkOutDate && date >= checkOutDate) {
                        setCheckOutDate(null);
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn ngày"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none text-black"
                    minDate={new Date()} // Không cho phép chọn ngày quá khứ
                  />
                </div>
              </div>

              <button className="mt-5 w-36 h-16 rounded-xl text-white font-semibold flex justify-center items-center bg-blue-900 hover:bg-blue-700 duration-300">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFunActivities;
