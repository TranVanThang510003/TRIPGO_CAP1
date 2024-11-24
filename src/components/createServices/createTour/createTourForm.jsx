import { useState, useEffect } from 'react';
import axios from 'axios';
import FormHeader from './FormHeader';
import LocationSelector from './LocationSelector';
import TourDetails from './TourDetails';
import ScheduleList from './ScheduleList';
import FileUploader from './FileUploader';
import TourTypeSelector from './TourTypeSelector';
import LanguageSelector from './LanguageSelector';

const CreateTourForm = () => {
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
  const [districts, setDistricts] = useState([]); // Danh sách quận/huyện
  const [wards, setWards] = useState([]); // Danh sách xã/phường
  const [selectedProvince, setSelectedProvince] = useState(''); // Mã tỉnh được chọn
  const [selectedDistrict, setSelectedDistrict] = useState(''); // Mã quận được chọn
  const [selectedWard, setSelectedWard] = useState(''); // Mã xã/phường được chọn

  // Các trường nhập liệu của tour
  const [PUCLIC_TOUR_NAME, setPUCLIC_TOUR_NAME] = useState('');
  const [DESCRIPIONS_HIGHLIGHT, setDESCRIPIONS_HIGHLIGHT] = useState('');
  const [PUCLIC_TOUR_TYPE, setPUCLIC_TOUR_TYPE] = useState('');
  const [DESCRIPTIONS, setDESCRIPTIONS] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [IMAGE, setIMAGE] = useState(null);
  const [LANGUAGE, setLANGUAGE] = useState('vi');
  const [multiDaySchedules, setMultiDaySchedules] = useState([]); // Lịch trình cho nhiều ngày
  const [scheduleDetails, setScheduleDetails] = useState([]); // Lưu tiêu đề và thời gian trong ngày
  const [errors, setErrors] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  // Lịch khởi hành
  const [tourType, setTourType] = useState('day');
  const [departureDate, setDepartureDate] = useState('');
  const [endDate, setEndDate] = useState(''); // Ngày kết thúc cho tour nhiều ngày
  const [numDays, setNumDays] = useState(1); // Số ngày cho tour nhiều ngày
  const [priceAdult, setPriceAdult] = useState('');
  const [priceChild, setPriceChild] = useState('');
  const [availableAdultCount, setAvailableAdultCount] = useState('');
  const [schedules, setSchedules] = useState([]); // Danh sách lịch khởi hành

  // Danh sách loại tour
  const tourTypes = [
    { id: 1, name: 'Tour mạo hiểm' },
    { id: 2, name: 'Tour văn hóa' },
    { id: 3, name: 'Tour nghỉ dưỡng' },
    { id: 4, name: 'Tour sinh thái' },
    { id: 5, name: 'Tour đi thuyền' },
    { id: 6, name: 'Tour ẩm thực' },
    { id: 7, name: 'Khám phá đảo' },
  ];

  // Hàm fetch danh sách tỉnh
  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://provinces.open-api.vn/api/p/');
      setProvinces(response.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
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
        'Error fetching districts:',
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
        'Error fetching wards:',
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
    setSelectedDistrict(''); // Reset quận và xã khi thay đổi tỉnh
    setWards([]);
    setSelectedWard('');
  };

  // Khi người dùng chọn quận
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    fetchWards(districtId); // Lấy danh sách xã/phường của quận đã chọn
    setSelectedWard('');
  };

  // Khi người dùng chọn xã/phường
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };
  const resetTourDetails = (type) => {
    if (type === 'day') {
      // Xóa dữ liệu của tour nhiều ngày
      setMultiDaySchedules([]);
      setNumDays(1);
    } else if (type === 'multi') {
      // Xóa dữ liệu của tour trong ngày
      setScheduleDetails([]);
    }
  };
  const handleTourTypeChange = (e) => {
    const newType = e.target.value;
    setTourType(newType);

    // Reset dữ liệu dựa vào loại tour
    if (newType === 'day') {
      setNumDays(1); // Đặt lại số ngày là 1 cho tour trong ngày
      setMultiDaySchedules([]); // Xóa lịch trình nhiều ngày
    } else if (newType === 'multi') {
      setNumDays(2); // Đặt mặc định số ngày là 2 cho tour nhiều ngày
      setScheduleDetails([]); // Xóa lịch trình chi tiết trong ngày
    }
  };

  const handleNumDaysChange = (e) => {
    const inputValue = e.target.value; // Lấy giá trị người dùng nhập
    const parsedValue = parseInt(inputValue, 10);

    // Cho phép xóa hoàn toàn để nhập giá trị mới
    if (inputValue === '') {
      setNumDays('');
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
            updated.push({ title: '', description: '' });
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
      alert('Vui lòng điền đầy đủ thông tin lịch khởi hành.');
      return;
    }

    const schedule = {
      departureDate,
      numDays: tourType === 'multi' ? numDays : 1,
      priceAdult,
      priceChild,
      availableAdultCount,
    };

    setSchedules((prevSchedules) => [...prevSchedules, schedule]);
    setDepartureDate('');
    setEndDate('');
    setPriceAdult('');
    setPriceChild('');
    setAvailableAdultCount('');
  };

  // Hàm xóa lịch khởi hành
  const removeSchedule = (index) => {
    setSchedules((prevSchedules) =>
      prevSchedules.filter((_, i) => i !== index)
    );
  };
  const addScheduleDetail = () => {
    setScheduleDetails((prev) => [
      ...prev,
      { time: '', title: '', description: '' },
    ]);
  };
  const updateImages = (updatedExistingImages, updatedNewImages) => {
    setExistingImages(updatedExistingImages); // Cập nhật ảnh cũ
    setNewImages(updatedNewImages); // Cập nhật ảnh mới

    // Cập nhật IMAGE tổng hợp
    setIMAGE([...updatedExistingImages, ...updatedNewImages]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!PUCLIC_TOUR_NAME.trim())
      newErrors.PUCLIC_TOUR_NAME = 'Tên tour không được để trống.';
    if (!selectedProvince) newErrors.selectedProvince = 'Vui lòng chọn tỉnh.';
    if (!selectedDistrict)
      newErrors.selectedDistrict = 'Vui lòng chọn quận/huyện.';
    if (!selectedWard) newErrors.selectedWard = 'Vui lòng chọn xã/phường.';
    if (!DESCRIPIONS_HIGHLIGHT.trim())
      newErrors.DESCRIPIONS_HIGHLIGHT = 'Vui lòng nhập điểm nổi bật.';
    if (!LANGUAGE) newErrors.LANGUAGE = 'Vui lòng chọn ngôn ngữ.';
    if (schedules.length === 0)
      newErrors.schedules = 'Vui lòng thêm ít nhất một lịch khởi hành.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField)
        firstErrorField.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    alert('Form hợp lệ! Gửi dữ liệu thành công.');

    const formData = new FormData();

    // Append các trường thông tin cơ bản
    formData.append('PUCLIC_TOUR_NAME', PUCLIC_TOUR_NAME);
    formData.append('PUCLIC_TOUR_TYPE', PUCLIC_TOUR_TYPE);
    formData.append('DESCRIPIONS_HIGHLIGHT', DESCRIPIONS_HIGHLIGHT);
    formData.append('DESCRIPTIONS', DESCRIPTIONS);
    formData.append('province', selectedProvince);
    formData.append('district', selectedDistrict);
    formData.append('ward', selectedWard);

    // Append thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      formData.append('CREATED_BY', parseInt(user.id, 10)); // Chuyển thành số nguyên
    }

    // Append ngôn ngữ và mô tả dịch vụ
    formData.append('LANGUAGE', LANGUAGE);
    formData.append('serviceDescription', serviceDescription);

    // Append danh sách lịch khởi hành (schedules)
    formData.append('schedules', JSON.stringify(schedules));

    // Append lịch trình chi tiết trong ngày (scheduleDetails)
    if (scheduleDetails.length > 0) {
      formData.append('scheduleDetails', JSON.stringify(scheduleDetails));
    }
    formData.append('numDays', numDays);
    // Append lịch trình cho nhiều ngày (multiDaySchedules)
    if (multiDaySchedules.length > 0) {
      formData.append('multiDaySchedules', JSON.stringify(multiDaySchedules));
    }
    // Đưa các file ảnh mới vào FormData
    newImages.forEach((file) => {
      formData.append('newImages', file); // Đổi từ 'newImages[]' thành 'newImages'
    });

    // Đưa danh sách ảnh cũ vào FormData
    formData.append('existingImages', JSON.stringify(existingImages));

    // Log dữ liệu trước khi gửi
    console.log('FormData to send:');
    for (let [key, value] of formData.entries()) {
      if (key === 'newImages[]') {
        console.log(`${key}:`, value.name); // Log tên file mới
      } else {
        console.log(`${key}:`, value); // Log các giá trị khác
      }
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/createtour',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      alert('Tạo tour thành công!');
    } catch (error) {
      console.error('Lỗi khi tạo tour:', error.response?.data || error.message);
      alert('Tạo tour thất bại.');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <FormHeader
        title="Tạo Tour Cố Định"
        description="Điền các thông tin dưới đây để tạo tour mới."
      />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-y-6 bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Tour Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Thông tin chi tiết</h3>
          <TourDetails
            tourTypes={tourTypes}
            PUCLIC_TOUR_NAME={PUCLIC_TOUR_NAME}
            setPUCLIC_TOUR_NAME={setPUCLIC_TOUR_NAME}
            PUCLIC_TOUR_TYPE={PUCLIC_TOUR_TYPE}
            setPUCLIC_TOUR_TYPE={setPUCLIC_TOUR_TYPE}
            DESCRIPIONS_HIGHLIGHT={DESCRIPIONS_HIGHLIGHT}
            setDESCRIPIONS_HIGHLIGHT={setDESCRIPIONS_HIGHLIGHT}
            DESCRIPTIONS={DESCRIPTIONS}
            setDESCRIPTIONS={setDESCRIPTIONS}
            errors={errors}
          />
        </div>

        {/* Location Selector */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Địa điểm</h3>
          <LocationSelector
            provinces={provinces}
            districts={districts}
            wards={wards}
            selectedProvince={selectedProvince}
            selectedDistrict={selectedDistrict}
            selectedWard={selectedWard}
            handleProvinceChange={handleProvinceChange}
            handleDistrictChange={handleDistrictChange}
            handleWardChange={handleWardChange}
            errors={errors}
          />
        </div>

        {/* Language Selector */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Ngôn ngữ</h3>
          <LanguageSelector LANGUAGE={LANGUAGE} setLANGUAGE={setLANGUAGE} />
        </div>

        {/* Tour Type Selector */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Loại Tour</h3>
          <TourTypeSelector
            tourType={tourType}
            setTourType={setTourType}
            numDays={numDays}
            setNumDays={setNumDays}
            scheduleDetails={scheduleDetails}
            setScheduleDetails={setScheduleDetails}
            multiDaySchedules={multiDaySchedules}
            setMultiDaySchedules={setMultiDaySchedules}
            addScheduleDetail={addScheduleDetail}
            resetSchedules={() => setSchedules([])}
          />
        </div>

        {/* Schedule List */}
        <div>
          <ScheduleList
            schedules={schedules}
            addSchedule={addSchedule}
            removeSchedule={removeSchedule}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            priceAdult={priceAdult}
            setPriceAdult={setPriceAdult}
            priceChild={priceChild}
            setPriceChild={setPriceChild}
            availableAdultCount={availableAdultCount}
            setAvailableAdultCount={setAvailableAdultCount}
            errors={errors}
          />
        </div>

        {/* File Uploader */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tải lên hình ảnh</h3>
          <FileUploader
            IMAGE={IMAGE}
            setIMAGE={(files) => {
              if (files.length > 0) {
                setNewImages(files); // Lưu các file mới tải lên
              }
            }}
            newImages={newImages} // Pass newImages to FileUploader
            setNewImages={setNewImages}
            updateImages={updateImages}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Tạo Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTourForm;
