/* eslint-disable react/prop-types */
import ErrorMessage from './ErrorMessage.jsx';

const HotelDetails = ({
                        hotelName,
                        setHotelName,
                        hotelTypes,
                        hotelType,
                        setHotelType,
                        descriptions,
                        setDescriptions,
                        errors,
                      }) => (
    <div className="grid grid-cols-2 gap-6">
      {/* Hotel Name */}
      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên khách sạn
        </label>
        <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            placeholder="Tên khách sạn"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none transition duration-150"
        />
        <ErrorMessage message={errors.hotelName} />
      </div>

      {/* Hotel Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Loại khách sạn
        </label>
        <select
            value={hotelType}
            onChange={(e) => setHotelType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none transition duration-150"
        >
          <option value="">Chọn loại khách sạn</option>
          {hotelTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
          ))}
        </select>
        <ErrorMessage message={errors.hotelType} />
      </div>


      {/* Hotel Descriptions */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả khách sạn
        </label>
        <textarea
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
            placeholder="Mô tả chi tiết về khách sạn"
            rows="5"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none transition duration-150"
        ></textarea>
        <ErrorMessage message={errors.descriptions} />
      </div>
    </div>
);

export default HotelDetails;
