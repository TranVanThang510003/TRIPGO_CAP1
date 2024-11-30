import { useState } from 'react';
import Map from '../MAP/Map.jsx';
const FilterSidebar = () => {
    const [priceRange, setPriceRange] = useState([0, 24000000]); // Trạng thái để quản lý khoảng giá
    const [showMap, setShowMap] = useState(false); 
    const handleShowMap = () => {
        setShowMap(true); // Hiển thị bản đồ khi click
      };
    const popularFilters = [
        "Miễn phí hủy phòng", 
        "Mức giá tốt", 
        "Bao gồm bữa sáng", 
        "Hủy miễn phí phòng", 
        "Điểm đánh giá 4.5+", 
        "Phù hợp cho trẻ em"
    ];
    const hotelStars = ['2', '3', '4', '5'];
    const ratings = ['3.0+', '3.5+', '4.0+', '4.5+']; 
    const amenities = [
        'Dịch vụ giặt ủi', 'Thẩm mỹ', 'Bể bơi', 'Dịch vụ phòng', 
        'Phòng tập gym', 'Gần biển', 'Tiện nghi cho trẻ', 'Nhà hàng', 
        'Dịch vụ làm đẹp', 'Điều hòa', 'Mát-xa', 'Dịch vụ spa'
    ];
    const accommodationTypes = [
        'Khách sạn', 'Khách sạn căn hộ', 'Biệt thự nhà vườn (Villa)', 
        'Nhà nghỉ', 'Homestay', 'Resort'
    ];
    const areas = [
        'Quận Hải Châu', 'Thanh Khê', 'Quận Liên Chiểu', 
        'Quận Cẩm Lệ', 'Quận Sơn Trà', 'Ngũ Hành Sơn', 'Quận Hoà Vang', 
        'Địa điểm khác'
    ];
    const brands = [
        'OYO Rooms', 'Hương Thanh Hotel', 'Hilton Hotel & Resorts', 
        'Sheraton', 'Furama', 'Novotel', 'Pullman Hotel & Resorts'
    ];

    // Hàm xử lý khi người dùng thay đổi giá trị thanh trượt
    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setPriceRange([0, value]); // Cập nhật giá trị khoảng giá mới
    };

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
            <p className="text-center text-sm font-medium mt-2">Hoạt động trên bản đồ</p>
          </div>

          {/* Các bộ lọc (ẩn khi bản đồ mở) */}
          <div className="w-80 bg-white flex flex-col items-center rounded-3xl border border-[#ACACAC]">
            <div className="font-medium text-3xl text-center border-b-4 w-80 h-20 rounded-t-3xl flex items-center justify-center">
              Lựa chọn
            </div>
            {/* Bộ lọc và các phần khác */}
            {/* ... */}
          </div>
        </div>
      )}

      {/* Bản đồ toàn màn hình */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-white">
         
          <Map />
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
                            className="w-full mt-2" 
                            min="0" 
                            max="24000000" 
                            step="100000"
                            value={priceRange[1]} 
                            onChange={handlePriceChange} // Gọi hàm khi giá trị thay đổi
                        />
                        <div className="flex justify-between">
                            <div className='w-[100px] h-[25px] border border-spacing-[0.5] border-black rounded-xl flex justify-center items-center'>{priceRange[0].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                            <span>đến</span>
                            <div className='w-[100px] h-[25px] border border-spacing-[0.5] border-black rounded-xl flex justify-center items-center'>{priceRange[1].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                    </div>

                    {/* Bộ lọc phổ biến */}
                    <div className="mb-6">
                        <h4 className="font-medium text-2xl text-center">Bộ lọc phổ biến</h4>
                        <div className="mt-4">
                            {popularFilters.map((filter, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <input type="checkbox" id={filter} className="mr-2 w-6 h-6" />
                                    <label htmlFor={filter} className="text-base">{filter}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hạng khách sạn */}
                    <div className="mb-6">
                        <h4 className="font-medium text-2xl text-center">Hạng khách sạn</h4>
                        <div className="flex space-x-2 mt-2">
                            {hotelStars.map((star) => (
                                <button key={star} className="w-14 h-10 bg-white border rounded-xl flex items-center justify-center text-yellow-400 text-lg">
                                    {`${star}★`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Điểm đánh giá */}
                    <div className="mb-6">
                        <h4 className="font-medium text-2xl text-center">Điểm đánh giá</h4>
                        <div className="flex space-x-2 mt-2">
                            {ratings.map((score, idx) => (
                                <button key={idx} className="px-3 py-1  bg-white border rounded-xl text-base">
                                    {score}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tiện nghi */}
                    <div className="mb-6">
                        <h4 className="font-medium text-2xl text-center">Tiện nghi</h4>
                        <div className="mt-2">
                            {amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <input type="checkbox" id={amenity} className="mr-2 w-6 h-6" />
                                    <label htmlFor={amenity} className="text-base">{amenity}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Loại hình lưu trú */}
                    <div className="mb-6">
                        <h4 className="font-medium text-2xl text-center">Loại hình lưu trú</h4>
                        <div className="mt-2">
                            {accommodationTypes.map((type, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <input type="checkbox" id={type} className="mr-2 w-6 h-6" />
                                    <label htmlFor={type} className="text-base">{type}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Khu vực */}
                    <div className="mb-6">
                        <h4 className="font-medium text-2xl text-center">Khu vực</h4>
                        <div className="mt-2">
                            {areas.map((area, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <input type="checkbox" id={area} className="mr-2 w-6 h-6" />
                                    <label htmlFor={area} className="text-base">{area}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chuỗi/Thương hiệu */}
                    <div className="mb-6">
                        <h4 className="font-medium text-2xl text-center">Chuỗi/Thương hiệu</h4>
                        <div className="mt-2">
                            {brands.map((brand, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <input type="checkbox" id={brand} className="mr-2 w-6 h-6" />
                                    <label htmlFor={brand} className="text-base">{brand}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FilterSidebar;
