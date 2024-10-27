import { useState } from "react";

const FilterSideBarCamping = () => {
  const [priceRange, setPriceRange] = useState([0, 24000000]); // Trạng thái để quản lý khoảng giá

  const terrain = [
    "Thảo nguyên",
    "Ven sông",
    "Trên núi",
    "Gần thác",
    "Ven biển",
  ];
  const ratings = ["3.0+", "3.5+", "4.0+", "4.5+"];
  const location = [
    "Cắm trại tự do",
    "Cắm trại xe",
    "Glamping",
    "Cắm trại nhóm",
  ];

  // Hàm xử lý khi người dùng thay đổi giá trị thanh trượt
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange([0, value]); // Cập nhật giá trị khoảng giá mới
  };

  return (
    <div className="w-80 flex flex-col">
      {/* Hoạt động trên bản đồ */}
      <div className="mb-4 w-80 bg-white h-56 rounded-3xl border border-[#ACACAC]">
        <div className="h-44 bg-gray-100 rounded-t-3xl flex justify-center items-center">
          <img
            src="https://www.techtimes.vn/wp-content/uploads/2023/05/google-maps-icon-on-map.jpg"
            alt="Map"
            className="h-full w-full object-cover rounded-t-3xl text-justify    "
          />
        </div>
        <p className="text-center text-sm font-medium mt-2">
          Hoạt động trên bản đồ
        </p>
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
              className="w-full mt-2"
              min="0"
              max="24000000"
              step="100000"
              value={priceRange[1]}
              onChange={handlePriceChange} // Gọi hàm khi giá trị thay đổi
            />
            <div className="flex justify-between">
              <div className="w-[100px] h-[25px] border border-spacing-[0.5] border-black rounded-xl flex justify-center items-center">
                {priceRange[0].toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <span>đến</span>
              <div className="w-[100px] h-[25px] border border-spacing-[0.5] border-black rounded-xl flex justify-center items-center">
                {priceRange[1].toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>
          </div>

          {/* Bộ lọc Loại địa điểm */}
          <div className="mb-6">
            <h4 className="font-medium text-2xl text-center">Loại địa điểm</h4>
            <div className="mt-4">
              {terrain.map((filter, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input type="checkbox" id={filter} className="mr-2 w-6 h-6" />
                  <label htmlFor={filter} className="text-base">
                    {filter}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* bộ lọc loại hình */}
          <div className="mb-6">
            <h4 className="font-medium text-2xl text-center">Loại hình</h4>
            <div className="mt-2">
              {location.map((amenity, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={amenity}
                    className="mr-2 w-6 h-6"
                  />
                  <label htmlFor={amenity} className="text-base">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Điểm đánh giá */}
          <div className="mb-6">
            <h4 className="font-medium text-2xl text-center">Điểm đánh giá</h4>
            <div className="flex space-x-2 mt-2">
              {ratings.map((score, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1  bg-white border rounded-xl text-base"
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterSideBarCamping;
