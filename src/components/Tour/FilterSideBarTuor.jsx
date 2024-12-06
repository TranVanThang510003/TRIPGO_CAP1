import { useState } from 'react';
import TourListAndMap from './mapTour/tourListAndMap';

const FilterSideBarTour = ({ onTourTypeChange, onPriceChange, onDurationChange,onLanguageChange }) => {
  const [priceRange, setPriceRange] = useState([0, 24000000]); // Trạng thái để quản lý khoảng giá
  const [showMap, setShowMap] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]); // State to store selected languages
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedTourTypes, setSelectedTourTypes] = useState([]);
  const handleShowMap = () => {
    setShowMap(true); // Hiển thị bản đồ khi click
  };
  // Xử lý khi giá trị thanh trượt thay đổi
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const newPriceRange = [0, value];
    setPriceRange(newPriceRange); // Cập nhật giá trị state
    onPriceChange(newPriceRange); // Gửi giá trị khoảng giá lên component cha
  };
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const updatedTourTypes = checked
      ? [...selectedTourTypes, id]
      : selectedTourTypes.filter((type) => type !== id);

    setSelectedTourTypes(updatedTourTypes);
    onTourTypeChange(updatedTourTypes);
  };

  // Xử lý khi checkbox ngôn ngữ thay đổi
  const handleLanguageChange = (event) => {
    const { id, checked } = event.target;
    const updatedLanguages = checked
        ? [...selectedLanguages, id]
        : selectedLanguages.filter((language) => language !== id);

    setSelectedLanguages(updatedLanguages);
    onLanguageChange(updatedLanguages);
    console.log('Selected Languages:', updatedLanguages);
  };

  // Xử lý khi checkbox thời gian thay đổi
  const handleDurationChange = (event) => {
    const { id, checked } = event.target;
    const updatedDuration = checked
        ? [...selectedDuration, id]
        : selectedDuration.filter((duration) => duration !== id);

    setSelectedDuration(updatedDuration);
    onDurationChange(updatedDuration);
  };

  const tour_type = [
    'Tour mạo hiểm',
    'Tour văn hóa',
    'Tour nghỉ dưỡng',
    'Tour sinh thái',
    'Tour đi thuyền',
    'Tour ẩm thực',
    'Tour khám phá đảo',
  ];
  const ratings = ['3.0+', '3.5+', '4.0+', '4.5+'];
  const duration = ['Tour trong ngày', 'Tour nhiều ngày'];

  const language = ['Tiếng Anh', 'Tiếng Việt'];

  return (
    <div className="w-80 flex flex-col">
      {/* Hoạt động trên bản đồ */}
      <div>
        {!showMap && (
          <div className="w-80 flex flex-col">
            {/* Hoạt động trên bản đồ */}
            <div
              className="mb-4 w-80 bg-white h-56 rounded-3xl border border-[#ACACAC] cursor-pointer"
              onClick={handleShowMap}
            >
              <div className="h-44 bg-gray-100 rounded-t-3xl flex justify-center items-center">
                <img
                  src="../../../public/img/MAP.jpg"
                  alt="Map"
                  className="h-full w-full object-cover rounded-t-3xl"
                />
              </div>
              <p className="text-center text-sm font-medium mt-2">
                Hoạt động trên bản đồ
              </p>
            </div>



          </div>
        )}

        {/* Bản đồ toàn màn hình */}
        {showMap && (
          <div className="fixed inset-0 z-50 bg-white">
            <TourListAndMap />
          </div>
        )}
      </div>

      {/* Lựa chọn */}
      <div className="w-80 bg-white flex flex-col items-center rounded-3xl border border-[#ACACAC]">
        <div className="font-medium text-3xl text-center border-b-4 w-80 h-20 rounded-t-3xl flex items-center justify-center">
          Lựa chọn
        </div>

        <div className="w-60 mt-8">
          {/* Khoảng giá */}
          <div className="mb-6">
            <h4 className="font-medium text-2xl text-center">Khoảng giá</h4>
            <input
              type="range"
              className="w-full mt-2 "
              style={{
                appearance: 'none',
                width: '100%',
                height: '8px',
                backgroundColor: '#d1d5db', // Màu nền thanh trượt
                borderRadius: '4px',
                outline: 'none',
              }}
              min="0"
              max="24000000"
              step="100000"
              value={priceRange[1]}
              onChange={handlePriceChange} // Gọi hàm khi giá trị thay đổi
            />
            <div className="flex justify-between">
              <div className="w-[100px] h-[25px] border border-spacing-[0.5] border-black rounded-xl flex justify-center items-center">
                {priceRange[0].toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </div>
              <span>đến</span>
              <div className="w-[100px] h-[25px] border border-spacing-[0.5] border-black rounded-xl flex justify-center items-center">
                {priceRange[1].toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </div>
            </div>
          </div>

          {/* Bộ lọc Loại hình Tour */}
          <div className="mb-6">
            <h4 className="font-medium text-2xl text-center">Loại hình tour</h4>
            <div className="mt-4">
              {tour_type.map((filter, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={filter}
                    className="mr-2 w-6 h-6"
                    onChange={handleCheckboxChange}
                  />

                  <label htmlFor={filter} className="text-base">
                    {filter}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* bộ lọc thời gian */}
          <div className="mb-6">
            <h4 className="font-medium text-2xl text-center">Thời gian</h4>
            <div className="mt-2">
              {duration.map((amenity, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id={amenity}
                        className="mr-2 w-6 h-6"
                        onChange={handleDurationChange}
                    />
                    <label htmlFor={amenity} className="text-base">
                      {amenity}
                    </label>
                  </div>
              ))}
            </div>
          </div>

          {/* Điểm đánh gia*/}
          <div className="mb-6">
            <h4 className="font-medium text-2xl text-center">Điểm đánh giá</h4>
            <div className="flex space-x-2 mt-2">
              {ratings.map((score, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1  bg-white border rounded-xl text-base  hover:bg-yellow-400"
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Ngôn ngữ hưỡng dẫn */}
          <div className="mb-6">
            <h4 className="font-medium text-2xl text-center">
              Ngôn ngữ hưỡng dẫn
            </h4>
            <div className="mt-2">
              {language.map((area, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id={area}
                        className="mr-2 w-6 h-6"
                        onChange={handleLanguageChange}
                    />
                    <label htmlFor={area} className="text-base">
                      {area}
                    </label>
                  </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default FilterSideBarTour;
