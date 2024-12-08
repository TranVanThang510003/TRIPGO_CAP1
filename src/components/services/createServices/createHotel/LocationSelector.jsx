/* eslint-disable react/prop-types */
import ErrorMessage from './ErrorMessage.jsx';
const LocationSelector = ({
  provinces,
  districts,
  wards,
  selectedProvince,
  selectedDistrict,
  selectedWard,
  handleProvinceChange,
  handleDistrictChange,
  handleWardChange,
    address,
    setAddress,
  errors,
}) => (
  <div className="grid grid-cols-3 gap-4">
    {/* Province Selector */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Chọn tỉnh / thành phố:
      </label>
      <select
        onChange={handleProvinceChange}
        value={selectedProvince}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Chọn tỉnh / thành phố</option>

        {(provinces || []).map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>
      <ErrorMessage message={errors.selectedProvince} />
    </div>

    {/* District Selector */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Chọn quận / huyện:
      </label>
      <select
        onChange={handleDistrictChange}
        value={selectedDistrict}
        disabled={!selectedProvince}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Chọn quận / huyện</option>
        {districts.length > 0 ? (
          districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))
        ) : (
          <option disabled>Không có dữ liệu quận/huyện</option>
        )}
      </select>

      <ErrorMessage message={errors.selectedDistrict} />
    </div>

    {/* Ward Selector */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Chọn xã / phường:
      </label>
      <select
          onChange={handleWardChange}
          value={selectedWard}
          disabled={!selectedDistrict}
          className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Chọn xã / phường</option>
        {(wards || []).map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
        ))}
      </select>
      <ErrorMessage message={errors.selectedWard}/>
      <input/>
    </div>
      <div className='w-[400px]'>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Địa chỉ cụ thể
      </label>
      <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="số nhà tên đường"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none transition duration-150"
      />
        <ErrorMessage message={errors.address} />
      </div>
  </div>
);

export default LocationSelector;
