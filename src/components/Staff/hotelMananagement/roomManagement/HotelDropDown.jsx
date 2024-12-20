import React from "react";

const HotelDropdown = ({ hotels, selectedHotel, onChange }) => {
    return (
        <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2 w-[900px]">
                Chọn khách sạn:
            </label>
            <select
                value={selectedHotel?.HOTEL_ID || ""}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {hotels.map((hotel) => (
                    <option key={hotel.HOTEL_ID} value={hotel.HOTEL_ID}>
                        {hotel.HOTEL_NAME}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default HotelDropdown;
