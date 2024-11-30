import { Icon } from '@iconify/react/dist/iconify.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import useLocation from '../hook/useLocation';

const BannerTour = ({ onSearch }) => {
  const { provinces, fetchProvinces } = useLocation();
  const [checkInDate, setCheckInDate] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState('');

  // Lấy danh sách tỉnh khi component mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleSearch = () => {
    // Gọi callback onSearch để truyền dữ liệu tìm kiếm
    onSearch(selectedProvince, checkInDate);
  };

  return (
      <div>
        <div
            className="relative bg-cover bg-center h-[400px]"
            style={{
              backgroundImage: "url('public/img/image 4.png')",
            }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>

          {/* Nội dung */}
          <div className="mt-[80px] relative z-10 flex flex-col text-white pt-10">
            <div className="ml-32">
              <h1 className="text-5xl font-bold mt-28">TOURS</h1>
              <p className="text-lg mt-5">
                "Một vé cho hành trình không hồi kết"
              </p>
            </div>

            {/* Địa điểm và Ngày đi */}
            <div className="flex justify-center mt-[65px]">
              <div className="bg-slate-200 w-4/5 h-[120px] flex justify-center items-center rounded-xl">
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

                    <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="px-2 w-full"
                    >
                      <option value="">Chọn điểm đến</option>
                      {provinces.map((province) => (
                          <option key={province.code} value={province.name}>
                            {province.name}
                          </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Chọn ngày */}
                <div className="flex flex-col mx-2">
                  <div className="text-sm text-slate-600 font-medium">
                    Chọn ngày
                  </div>
                  <div className="px-6 bg-white rounded-xl text-customBlue font-medium flex items-center w-[450px] h-[64px]">
                    <Icon
                        icon="mdi:calendar"
                        className="w-7 h-7 text-slate-500 mr-2"
                    />
                    <DatePicker
                        selected={checkInDate}
                        onChange={(date) => setCheckInDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Chọn ngày"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none text-black"
                        minDate={new Date()} // Không cho phép chọn ngày quá khứ
                    />
                  </div>
                </div>

                <button
                    onClick={handleSearch}
                    className="mt-5 w-36 h-16 rounded-xl bg-customBlue text-white font-semibold flex justify-center items-center bg-blue-900 hover:bg-blue-700 duration-300"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BannerTour;
