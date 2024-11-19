import { useState, useEffect } from "react";
import axios from "axios";

const CreateTourForm = () => {
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
  const [districts, setDistricts] = useState([]); // Danh sách quận/huyện
  const [wards, setWards] = useState([]); // Danh sách xã/phường
  const [selectedProvince, setSelectedProvince] = useState(""); // Mã tỉnh được chọn
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Mã quận được chọn
  const [selectedWard, setSelectedWard] = useState(""); // Mã xã/phường được chọn

  // Các trường nhập liệu của tour
  const [PUCLIC_TOUR_NAME, setPUCLIC_TOUR_NAME] = useState("");
  const [address, setAddress] = useState("");
  const [DESCRIPIONS_HIGHLIGHT, setDESCRIPIONS_HIGHLIGHT] = useState("");
  const [PUCLIC_TOUR_TYPE, setPUCLIC_TOUR_TYPE] = useState("");
  const [DESCRIPTIONS, setDESCRIPTIONS] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [IMAGE, setIMAGE] = useState(null);
  const [START_DAY, setSTART_DAY] = useState("");
  const [END_DAY, setEND_DAY] = useState("");
  const [ADULT_COUNT, setADULT_COUNT] = useState("");
  const [LANGUAGE, setLANGUAGE] = useState("vi");
  const [adultPrice, setAdultPrice] = useState("");
  const [childPrice, setChildPrice] = useState("");

  // Danh sách loại tour
  const tourTypes = [
    { id: 1, name: "Tour mạo hiểm" },
    { id: 2, name: "Tour văn hóa" },
    { id: 3, name: "Tour nghỉ dưỡng" },
    { id: 4, name: "Tour sinh thái" },
    { id: 5, name: "Tour đi thuyền" },
    { id: 6, name: "Tour ẩm thực" },
    { id: 7, name: "Khám phá đảo" },
  ];

  // Hàm fetch danh sách tỉnh
  const fetchProvinces = async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/p/");
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Hàm fetch quận/huyện dựa vào mã tỉnh
  const fetchDistricts = async (provinceId) => {
    try {
      // Thử lấy danh sách quận
      let response = await axios.get(
        `https://provinces.open-api.vn/api/d/search/?p=${provinceId}&q=Quận`
      );
      let districts = response.data;

      // Nếu không có quận, thử tìm huyện
      if (districts.length === 0) {
        response = await axios.get(
          `https://provinces.open-api.vn/api/d/search/?p=${provinceId}&q=Huyện`
        );
        districts = response.data;
      }

      setDistricts(districts);
      setWards([]); // Reset danh sách xã khi tỉnh hoặc quận/huyện thay đổi
    } catch (error) {
      console.error(
        "Error fetching districts:",
        error.response?.data || error.message
      );
    }
  };

  // Hàm fetch xã/phường dựa vào mã quận
  const fetchWards = async (districtId) => {
    try {
      // Thử lấy danh sách phường
      let response = await axios.get(
        `https://provinces.open-api.vn/api/w/search/?d=${districtId}&q=Phường`
      );
      let wards = response.data;

      // Nếu không có phường, thử tìm xã
      if (wards.length === 0) {
        response = await axios.get(
          `https://provinces.open-api.vn/api/w/search/?d=${districtId}&q=Xã`
        );
        wards = response.data;
      }

      setWards(wards); // Cập nhật danh sách phường/xã
    } catch (error) {
      console.error(
        "Error fetching wards:",
        error.response?.data || error.message
      );
    }
  };

  // Lấy danh sách tỉnh khi component được mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Khi người dùng chọn tỉnh
  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    fetchDistricts(provinceId); // Lấy danh sách quận/huyện của tỉnh đã chọn
    setSelectedDistrict(""); // Reset quận và xã khi thay đổi tỉnh
    setWards([]);
    setSelectedWard("");
  };

  // Khi người dùng chọn quận
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    fetchWards(districtId); // Lấy danh sách xã/phường của quận đã chọn
    setSelectedWard("");
  };

  // Khi người dùng chọn xã/phường
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  // Hàm submit dữ liệu form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Thêm tất cả các trường thông tin vào formData
    formData.append("PUCLIC_TOUR_NAME", PUCLIC_TOUR_NAME);
    formData.append("PUCLIC_TOUR_TYPE", PUCLIC_TOUR_TYPE);
    formData.append("address", address);
    formData.append("DESCRIPIONS_HIGHLIGHT", DESCRIPIONS_HIGHLIGHT);
    formData.append("DESCRIPTIONS", DESCRIPTIONS);
    formData.append("ADULT_COUNT", ADULT_COUNT);
    formData.append("LANGUAGE", LANGUAGE);
    formData.append("adultPrice", adultPrice);
    formData.append("childPrice", childPrice);
    formData.append("serviceDescription", serviceDescription);
    formData.append(
      "startDate",
      new Date(START_DAY).toISOString().split("T")[0]
    ); // Chuyển thành "YYYY-MM-DD"
    formData.append("endDate", new Date(END_DAY).toISOString().split("T")[0]); // Chuyển thành "YYYY-MM-DD"

    // Thêm file ảnh nếu có
    if (IMAGE) {
      formData.append("IMAGE", IMAGE);
    }

    // Lấy tên tỉnh, quận, xã/phường từ danh sách đã tải
    // Thêm thông tin địa lý (mã tỉnh, quận, xã) vào formData
    formData.append("province", selectedProvince); // Mã tỉnh
    formData.append("district", selectedDistrict); // Mã quận
    formData.append("ward", selectedWard); // Mã xã/phường

    // Thêm thông tin người tạo tour từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      formData.append("CREATED_BY", user.id); // ID của người dùng hiện tại
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/createtour",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Tour đã được tạo thành công!");
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      alert("Có lỗi xảy ra khi tạo tour");
    }
  };

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

export default CreateTourForm;
