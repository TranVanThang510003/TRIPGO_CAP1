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
  const [DESCRIPIONS_HIGHLIGHT, setDESCRIPIONS_HIGHLIGHT] = useState("");
  const [PUCLIC_TOUR_TYPE, setPUCLIC_TOUR_TYPE] = useState("");
  const [DESCRIPTIONS, setDESCRIPTIONS] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [IMAGE, setIMAGE] = useState(null);
  const [LANGUAGE, setLANGUAGE] = useState("vi");
  const [dailySchedules, setDailySchedules] = useState([]); // Lịch trình chi tiết trong ngày
const [multiDaySchedules, setMultiDaySchedules] = useState([]); // Lịch trình cho nhiều ngày
const [scheduleDetails, setScheduleDetails] = useState([]); // Lưu tiêu đề và thời gian trong ngày




  // Lịch khởi hành
  const [tourType, setTourType] = useState("day");
  const [departureDate, setDepartureDate] = useState("");
  const [endDate, setEndDate] = useState(""); // Ngày kết thúc cho tour nhiều ngày
  const [numDays, setNumDays] = useState(1); // Số ngày cho tour nhiều ngày
  const [priceAdult, setPriceAdult] = useState("");
  const [priceChild, setPriceChild] = useState("");
  const [availableAdultCount, setAvailableAdultCount] = useState("");
  const [schedules, setSchedules] = useState([]); // Danh sách lịch khởi hành

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
        let response = await axios.get(`https://provinces.open-api.vn/api/d/search/?p=${provinceId}&q=Quận`);
        let districts = response.data;

        // Nếu không có quận, thử tìm huyện
        if (districts.length === 0) {
            response = await axios.get(`https://provinces.open-api.vn/api/d/search/?p=${provinceId}&q=Huyện`);
            districts = response.data;
        }

        setDistricts(districts);
        setWards([]); // Reset danh sách xã khi tỉnh hoặc quận/huyện thay đổi
    } catch (error) {
        console.error("Error fetching districts:", error.response?.data || error.message);
    }
};


  // Hàm fetch xã/phường dựa vào mã quận
  const fetchWards = async (districtId) => {
    try {
        // Thử lấy danh sách phường
        let response = await axios.get(`https://provinces.open-api.vn/api/w/search/?d=${districtId}&q=Phường`);
        let wards = response.data;

        // Nếu không có phường, thử tìm xã
        if (wards.length === 0) {
            response = await axios.get(`https://provinces.open-api.vn/api/w/search/?d=${districtId}&q=Xã`);
            wards = response.data;
        }

        setWards(wards); // Cập nhật danh sách phường/xã
    } catch (error) {
        console.error("Error fetching wards:", error.response?.data || error.message);
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
  const resetTourDetails = (type) => {
    if (type === "day") {
      // Xóa dữ liệu của tour nhiều ngày
      setMultiDaySchedules([]);
      setNumDays(1);
    } else if (type === "multi") {
      // Xóa dữ liệu của tour trong ngày
      setScheduleDetails([]);
    }
  };
  const handleTourTypeChange = (e) => {
    const newType = e.target.value;
    setTourType(newType);
  
    // Reset dữ liệu dựa vào loại tour
    if (newType === "day") {
      setNumDays(1); // Đặt lại số ngày là 1 cho tour trong ngày
      setMultiDaySchedules([]); // Xóa lịch trình nhiều ngày
    } else if (newType === "multi") {
      setNumDays(2); // Đặt mặc định số ngày là 2 cho tour nhiều ngày
      setScheduleDetails([]); // Xóa lịch trình chi tiết trong ngày
    }
  };
  
  const handleNumDaysChange = (e) => {
    const inputValue = e.target.value; // Lấy giá trị người dùng nhập
    const parsedValue = parseInt(inputValue, 10);
  
    // Cho phép xóa hoàn toàn để nhập giá trị mới
    if (inputValue === "") {
      setNumDays("");
      return;
    }
  
    // Đảm bảo giá trị nhập là số hợp lệ và lớn hơn hoặc bằng 1
    if (parsedValue >= 1) {
      if (parsedValue < numDays) {
        // Nếu số ngày mới ít hơn, cắt bớt các ngày dư trong mảng multiDaySchedules
        setMultiDaySchedules((prev) => prev.slice(0, parsedValue));
      } else {
        // Nếu số ngày mới nhiều hơn, thêm các ngày trống vào mảng multiDaySchedules
        setMultiDaySchedules((prev) => {
          const updated = [...prev];
          for (let i = prev.length; i < parsedValue; i++) {
            updated.push({ title: "", description: "" });
          }
          return updated;
        });
      }
  
      // Cập nhật giá trị numDays
      setNumDays(parsedValue);
    }
  };
  
  
  
  

  // Hàm thêm lịch khởi hành vào danh sách
  const addSchedule = () => {
    if (!departureDate || !priceAdult || !priceChild || !availableAdultCount) {
      alert("Vui lòng điền đầy đủ thông tin lịch khởi hành.");
      return;
    }
   

    const schedule = {
      departureDate,
      numDays: tourType === "multi" ? numDays : 1,
      priceAdult,
      priceChild,
      availableAdultCount,
    };

    setSchedules((prevSchedules) => [...prevSchedules, schedule]);
    setDepartureDate("");
    setEndDate("");
    setPriceAdult("");
    setPriceChild("");
    setAvailableAdultCount("");
  };


  // Hàm xóa lịch khởi hành
  const removeSchedule = (index) => {
    setSchedules((prevSchedules) => prevSchedules.filter((_, i) => i !== index));
  };
  const addScheduleDetail = () => {
    setScheduleDetails((prev) => [...prev, { time: "", title: "", description: "" }]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Append các trường thông tin cơ bản
    formData.append("PUCLIC_TOUR_NAME", PUCLIC_TOUR_NAME);
    formData.append("PUCLIC_TOUR_TYPE", PUCLIC_TOUR_TYPE);
    formData.append("DESCRIPIONS_HIGHLIGHT", DESCRIPIONS_HIGHLIGHT);
    formData.append("DESCRIPTIONS", DESCRIPTIONS);
    formData.append("province", selectedProvince);
    formData.append("district", selectedDistrict);
    formData.append("ward", selectedWard);
  
    // Append thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      formData.append("CREATED_BY", parseInt(user.id, 10)); // Chuyển thành số nguyên
    }
  
    // Append ngôn ngữ và mô tả dịch vụ
    formData.append("LANGUAGE", LANGUAGE);
    formData.append("serviceDescription", serviceDescription);
  
    // Append danh sách lịch khởi hành (schedules)
    formData.append("schedules", JSON.stringify(schedules));
  
    // Append lịch trình chi tiết trong ngày (scheduleDetails)
    if (scheduleDetails.length > 0) {
      formData.append("scheduleDetails", JSON.stringify(scheduleDetails));
    }
    formData.append("numDays", numDays);
    // Append lịch trình cho nhiều ngày (multiDaySchedules)
    if (multiDaySchedules.length > 0) {
      formData.append("multiDaySchedules", JSON.stringify(multiDaySchedules));
    }
  
    // Append ảnh nếu có
    if (IMAGE) {
      formData.append("IMAGE", IMAGE);
    }
  
    try {
      const response = await axios.post("http://localhost:3000/createtour", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Tạo tour thành công!");
    } catch (error) {
      console.error("Lỗi khi tạo tour:", error.response?.data || error.message);
      alert("Tạo tour thất bại.");
    }
  };
  
  

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tạo Tour Cố Định</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow-md">
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên tour</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Loại tour</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Chọn tỉnh / thành phố:</label>
          <select onChange={handleProvinceChange} value={selectedProvince} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">Chọn tỉnh / thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Chọn quận / huyện:</label>
          <select onChange={handleDistrictChange} value={selectedDistrict} disabled={!selectedProvince} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">Chọn quận / huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Chọn xã / phường:</label>
          <select onChange={handleWardChange} value={selectedWard} disabled={!selectedDistrict} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">Chọn xã / phường</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>


        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Điểm nổi bật</label>
          <textarea
            value={DESCRIPIONS_HIGHLIGHT}
            onChange={(e) => setDESCRIPIONS_HIGHLIGHT(e.target.value)}
            placeholder="Điểm nổi bật"
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
          <textarea
            value={DESCRIPTIONS}
            onChange={(e) => setDESCRIPTIONS(e.target.value)}
            placeholder="Mô tả chi tiết thông tin tour"
            className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
        </div>
        <select
  value={tourType}
  onChange={handleTourTypeChange}
  className="w-full p-2 border border-gray-300 rounded-md"
>
  <option value="day">Tour trong ngày</option>
  <option value="multi">Tour nhiều ngày</option>
</select>

{tourType === "multi" && (
  <>
    {/* Số ngày */}
    <input
      type="number"
      value={numDays}
      onChange={handleNumDaysChange}
      min="2"
      className="w-24 p-2 border border-gray-300 rounded-md"
      placeholder="Số ngày"
    />
  </>
)}
        {tourType === "day" && (
          <div className="col-span-2">
    <h4 className="text-lg font-bold mb-3">Chi tiết lịch trình trong ngày</h4>
    {scheduleDetails.map((detail, index) => (
      <div key={index} className="mb-4 border p-4 rounded-md">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian</label>
            <input
              type="time"
              value={detail.time}
              onChange={(e) =>
                setScheduleDetails((prev) => {
                  const updated = [...prev];
                  updated[index].time = e.target.value;
                  return updated;
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <input
              type="text"
              value={detail.title}
              onChange={(e) =>
                setScheduleDetails((prev) => {
                  const updated = [...prev];
                  updated[index].title = e.target.value;
                  return updated;
                })
              }
              placeholder="Ví dụ: Giờ khởi hành"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              value={detail.description}
              onChange={(e) =>
                setScheduleDetails((prev) => {
                  const updated = [...prev];
                  updated[index].description = e.target.value;
                  return updated;
                })
              }
              placeholder="Nhập mô tả chi tiết"
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
        </div>
        <div className="mt-2 text-right">
          <button
            type="button"
            onClick={() =>
              setScheduleDetails((prev) => prev.filter((_, i) => i !== index))
            }
            className="text-red-500 hover:underline"
          >
            Xóa
          </button>
        </div>
      </div>
    ))}
    <button
      type="button"
      onClick={addScheduleDetail}
      className="bg-blue-500 text-white py-2 px-4 rounded-md"
    >
      Thêm Mục
    </button>
  </div>
)}

{tourType === "multi" && (
  <div className="col-span-2">
    <h4 className="text-lg font-bold mb-3">Chi tiết lịch trình cho nhiều ngày</h4>
    {[...Array(numDays).keys()].map((dayIndex) => (
      <div key={dayIndex} className="mb-6 border p-4 rounded-md">
        <h5 className="text-md font-semibold mb-2">Ngày {dayIndex + 1}</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <input
              type="text"
              value={multiDaySchedules[dayIndex]?.title || ""}
              onChange={(e) =>
                setMultiDaySchedules((prev) => {
                  const updated = [...prev];
                  if (!updated[dayIndex]) updated[dayIndex] = {};
                  updated[dayIndex].title = e.target.value;
                  return updated;
                })
              }
              placeholder="Nhập tiêu đề cho ngày này"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 w-full">Mô tả</label>
            <textarea
              value={multiDaySchedules[dayIndex]?.description || ""}
              onChange={(e) =>
                setMultiDaySchedules((prev) => {
                  const updated = [...prev];
                  if (!updated[dayIndex]) updated[dayIndex] = {};
                  updated[dayIndex].description = e.target.value;
                  return updated;
                })
              }
              placeholder="Nhập mô tả chi tiết cho ngày này"
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
        </div>
      </div>
    ))}
    <div className="flex justify-between items-center">
      <button
        type="button"
        onClick={() => setNumDays((prev) => prev + 1)}
        className="bg-green-500 text-white py-2 px-4 rounded-md"
      >
        Thêm ngày
      </button>
      {numDays > 1 && (
        <button
          type="button"
          onClick={() => {
            setNumDays((prev) => prev - 1);
            setMultiDaySchedules((prev) => prev.slice(0, prev.length - 1));
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Xóa ngày cuối
        </button>
      )}
    </div>
  </div>
)}






      

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ hướng dẫn</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Tải lên hình ảnh</label>
          <input
            type="file"
            onChange={(e) => setIMAGE(e.target.files[0])}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Lịch khởi hành */}
        <div className="col-span-2">
  <h3 className="text-lg font-bold mb-3">Lịch khởi hành</h3>
  <div className="flex items-center gap-4 mb-4">
    <div className="flex flex-row gap-4">
      {/* Ngày khởi hành */}
      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        min={
          schedules.length > 0
            ? new Date(new Date(schedules[schedules.length - 1].departureDate).getTime() + 86400000)
                .toISOString()
                .split("T")[0]
            : new Date().toISOString().split("T")[0]
        }
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Ngày khởi hành"
      />

      {/* Chỉ hiển thị cho tour nhiều ngày */}
    </div>

    {/* Giá người lớn */}
    <input
      type="number"
      value={priceAdult}
      onChange={(e) => setPriceAdult(e.target.value)}
      placeholder="Giá người lớn"
      min="1"
      max="9999999999"
      className="w-full p-2 border border-gray-300 rounded-md"
    />
    {/* Giá trẻ em */}
    <input
      type="number"
      value={priceChild}
      onChange={(e) => setPriceChild(e.target.value)}
      placeholder="Giá trẻ em"
      min="1"
      max="9999999999"
      className="w-full p-2 border border-gray-300 rounded-md"
    />
    {/* Số người lớn */}
    <input
      type="number"
      value={availableAdultCount}
      onChange={(e) => setAvailableAdultCount(e.target.value)}
      placeholder="Số người lớn"
      min="1"
      className="w-full p-2 border border-gray-300 rounded-md"
    />

    {/* Nút thêm lịch */}
    <button
      type="button"
      onClick={addSchedule}
      className="bg-blue-500 text-white py-2 px-4 rounded-md"
    >
      Thêm
    </button>
  </div>
</div>


          <div className="col-span-2">
          <h4 className="font-bold mb-3">Danh sách lịch khởi hành</h4>
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr>
              <th className="border p-2">Ngày khởi hành</th>
                <th className="border p-2">Số ngày</th>
                <th className="border p-2">Giá người lớn</th>
                <th className="border p-2">Giá trẻ em</th>
                <th className="border p-2">Số người lớn</th>
                <th className="border p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td className="border p-2">{schedule.departureDate}</td>
                  <td className="border p-2">{schedule.numDays}</td>
                  <td className="border p-2">{schedule.priceAdult}</td>
                  <td className="border p-2">{schedule.priceChild}</td>
                  <td className="border p-2">{schedule.availableAdultCount}</td>
                  <td className="border p-2">
                    <button
                      type="button"
                      onClick={() => removeSchedule(index)}
                      className="text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="col-span-2">
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            Tạo Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTourForm;
