/* eslint-disable react/prop-types */
const HotelDropdown = ({ hotels, selectedHotel, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold text-gray-700 mb-2 w-[900px]">
        Chọn khách sạn:
      </label>
      <select
        value={selectedHotel?.id || ""} // Đồng bộ giá trị với `id`
        onChange={(e) => onChange(parseInt(e.target.value))} // Truyền `id` được chọn
        className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {hotels.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.name} {/* Hiển thị tên khách sạn */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HotelDropdown;
