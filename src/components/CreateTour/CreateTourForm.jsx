import { useState } from "react";
import axios from "axios";

const CreateTourForm = () => {
  const [PUCLIC_TOUR_NAME, setPUCLIC_TOUR_NAME] = useState("");
  const [address, setAddress] = useState("");
  const [DESCRIPIONS_HIGHLIGHT, setDESCRIPIONS_HIGHLIGHT] = useState("");
  const [DESCRIPTIONS, setDESCRIPTIONS] = useState("");
  const [IMAGE, setIMAGE] = useState(null);
  const [START_DAY, setSTART_DAY] = useState(""); // Ngày bắt đầu
  const [END_DAY, setEND_DAY] = useState(""); // Ngày kết thúc
  const [ADULT_COUNT, setADULT_COUNT] = useState(""); // Số lượng
  const [INSTRUCTION_LANGUAGE, setINSTRUCTION_LANGUAGE] = useState("vi"); // Ngôn ngữ (tiếng Việt mặc định)
  const [adultPrice, setAdultPrice] = useState(""); // Giá người lớn
  const [childPrice, setChildPrice] = useState(""); // Giá trẻ em

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("PUCLIC_TOUR_NAME", PUCLIC_TOUR_NAME);
    formData.append("address", address);
    formData.append("DESCRIPIONS_HIGHLIGHT", DESCRIPIONS_HIGHLIGHT);
    formData.append("DESCRIPTIONS", DESCRIPTIONS);
    formData.append("IMAGE", IMAGE);
    formData.append("START_DAY", START_DAY); // Thêm ngày bắt đầu
    formData.append("END_DAY", END_DAY); // Thêm ngày kết thúc
    formData.append("ADULT_COUNT", ADULT_COUNT); // Số lượng
    formData.append("INSTRUCTION_LANGUAGE", INSTRUCTION_LANGUAGE); // Thêm ngôn ngữ
    formData.append("adultPrice", adultPrice); // Giá người lớn
    formData.append("childPrice", childPrice); // Giá trẻ em

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tours",
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
      console.error("Error uploading tour:", error);
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
        <div className="col-span-1">
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

        <div className="col-span-1">
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

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Địa chỉ"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chi tiết gói dịch vụ
          </label>
          <textarea
            value={DESCRIPTIONS}
            onChange={(e) => setDESCRIPTIONS(e.target.value)}
            placeholder="Chi tiết gói dịch vụ"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {/* Giá người lớn */}
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

        {/* Giá trẻ em */}
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

        {/* Số lượng*/}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số lượng
          </label>
          <input
            type="number"
            value={ADULT_COUNT}
            onChange={(e) => setADULT_COUNT(e.target.value)}
            placeholder="Số lượng"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Ngày bắt đầu */}
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

        {/* Ngày kết thúc */}
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

        {/* Ngôn ngữ */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngôn ngữ
          </label>
          <select
            value={INSTRUCTION_LANGUAGE}
            onChange={(e) => setINSTRUCTION_LANGUAGE(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="col-span-1">
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
