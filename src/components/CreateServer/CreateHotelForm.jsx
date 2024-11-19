const CreateHotelForm = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tạo Tour Cố Định</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên tour
          </label>
          <input
            type="text"
            value={PUCLIC_TOUR_NAME}
            onChange={(e) => setPUCLIC_TOUR_NAME(e.target.value)}
            placeholder="Tên tour"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Các trường thông tin khác */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại tour
          </label>
          <select
            value={PUCLIC_TOUR_TYPE}
            onChange={(e) => setPUCLIC_TOUR_TYPE(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Chọn loại tour</option>
            {tourTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Các dropdown cho Tỉnh, Quận, Xã */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chọn tỉnh / thành phố:
          </label>
          <select
            onChange={handleProvinceChange}
            value={selectedProvince}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Chọn tỉnh / thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
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
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
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
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ chi tiết
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Địa chỉ chi tiết"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Điểm nổi bật
          </label>
          <textarea
            value={DESCRIPIONS_HIGHLIGHT}
            onChange={(e) => setDESCRIPIONS_HIGHLIGHT(e.target.value)}
            placeholder="Điểm nổi bật"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả chi tiết
          </label>
          <textarea
            value={DESCRIPTIONS}
            onChange={(e) => setDESCRIPTIONS(e.target.value)}
            placeholder="Mô tả chi tiết gói dịch vụ"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả dịch vụ
          </label>
          <textarea
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            placeholder="Mô tả dịch vụ"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giá người lớn
          </label>
          <input
            type="number"
            value={adultPrice}
            onChange={(e) => setAdultPrice(e.target.value)}
            placeholder="Giá người lớn"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giá trẻ em
          </label>
          <input
            type="number"
            value={childPrice}
            onChange={(e) => setChildPrice(e.target.value)}
            placeholder="Giá trẻ em"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số lượng người lớn
          </label>
          <input
            type="number"
            value={ADULT_COUNT}
            onChange={(e) => setADULT_COUNT(e.target.value)}
            placeholder="Số lượng người lớn"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            value={START_DAY}
            onChange={(e) => setSTART_DAY(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày kết thúc
          </label>
          <input
            type="date"
            value={END_DAY}
            onChange={(e) => setEND_DAY(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngôn ngữ hướng dẫn
          </label>
          <select
            value={LANGUAGE}
            onChange={(e) => setLANGUAGE(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tải lên hình ảnh
          </label>
          <input
            type="file"
            onChange={(e) => setIMAGE(e.target.files[0])}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Tạo Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateHotelForm;
