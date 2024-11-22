import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import FormHeader from '../../components/createServices/createTour/FormHeader';
import LocationSelector from '../../components/createServices/createTour/LocationSelector';
import TourDetails from '../../components/createServices/createTour/TourDetails';
import ScheduleList from '../../components/createServices/createTour/ScheduleList';
import FileUploader from '../../components/createServices/createTour/FileUploader';
import LanguageSelector from '../../components/createServices/createTour/LanguageSelector';
import TourTypeSelector from '../../components/createServices/createTour/TourTypeSelector';
const UpdateTourForm = () => {
  const { tourId } = useParams();
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [PUCLIC_TOUR_NAME, setPUCLIC_TOUR_NAME] = useState('');
  const [DESCRIPIONS_HIGHLIGHT, setDESCRIPIONS_HIGHLIGHT] = useState('');
  const [PUCLIC_TOUR_TYPE, setPUCLIC_TOUR_TYPE] = useState('');
  const [DESCRIPTIONS, setDESCRIPTIONS] = useState('');
  const [IMAGE, setIMAGE] = useState(null);
  const [newImages, setNewImages] = useState([]); // Lưu danh sách file hình ảnh mới tải lên
  const [LANGUAGE, setLANGUAGE] = useState('vi');
  const [schedules, setSchedules] = useState([]);
  const [multiDaySchedules, setMultiDaySchedules] = useState([]); // Lịch trình cho nhiều ngày
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [errors, setErrors] = useState({});

  // Lịch khởi hành
  const [tourType, setTourType] = useState('day');
  const [departureDate, setDepartureDate] = useState('');
  const [endDate, setEndDate] = useState(''); // Ngày kết thúc cho tour nhiều ngày
  const [numDays, setNumDays] = useState(1); // Số ngày cho tour nhiều ngày
  const [priceAdult, setPriceAdult] = useState('');
  const [priceChild, setPriceChild] = useState('');
  const [availableAdultCount, setAvailableAdultCount] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Define tour types
  const tourTypes = [
    { id: 1, name: 'Tour mạo hiểm' },
    { id: 2, name: 'Tour văn hóa' },
    { id: 3, name: 'Tour nghỉ dưỡng' },
    { id: 4, name: 'Tour sinh thái' },
    { id: 5, name: 'Tour đi thuyền' },
    { id: 6, name: 'Tour ẩm thực' },
    { id: 7, name: 'Khám phá đảo' },
  ];

  // Fetch provinces
  // Helper function to fetch provinces
  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://provinces.open-api.vn/api/p/');
      if (response.data) {
        setProvinces(response.data); // Đảm bảo dữ liệu được cập nhật
      } else {
        console.error('Provinces API trả về danh sách trống.');
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };
  const fetchDistricts = async (provinceId) => {
    try {
      console.log('Fetching districts for provinceId:', provinceId);

      // Fetch "Quận"
      let response = await axios.get(
        `https://provinces.open-api.vn/api/d/search/?p=${provinceId}&q=Quận`
      );

      // Nếu không có kết quả "Quận", thử "Huyện"
      if (!response.data || response.data.length === 0) {
        console.warn('Danh sách quận trống. Thử tìm huyện.');
        response = await axios.get(
          `https://provinces.open-api.vn/api/d/search/?p=${provinceId}&q=Huyện`
        );
      }

      if (response.data && response.data.length > 0) {
        setDistricts(response.data); // Cập nhật state
        return response.data; // Trả về danh sách quận/huyện
      } else {
        console.error('Không tìm thấy quận/huyện nào.');
        setDistricts([]);
        return []; // Trả về mảng trống
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
      setDistricts([]);
      return []; // Trả về mảng trống nếu có lỗi
    }
  };

  const fetchWards = async (districtId) => {
    try {
      console.log('Fetching wards for districtId:', districtId);

      // Fetch "Phường"
      let response = await axios.get(
        `https://provinces.open-api.vn/api/w/search/?d=${districtId}&q=Phường`
      );

      // Nếu không có kết quả "Phường", thử "Xã"
      if (!response.data || response.data.length === 0) {
        console.warn('Danh sách phường trống. Thử tìm xã.');
        response = await axios.get(
          `https://provinces.open-api.vn/api/w/search/?d=${districtId}&q=Xã`
        );
      }

      // Cập nhật state nếu có dữ liệu
      if (response.data && response.data.length > 0) {
        setWards(response.data);
        return response.data; // Trả về danh sách phường/xã
      } else {
        console.error('Không tìm thấy phường/xã nào.');
        setWards([]);
        return []; // Trả về mảng trống
      }
    } catch (error) {
      console.error('Error fetching wards:', error);
      setWards([]);
      return []; // Trả về mảng trống nếu gặp lỗi
    }
  };
  const processMultiDaySchedules = (services, numDays) => {
    const schedules = [];

    // Sắp xếp lại dữ liệu theo dayNumber
    services.sort((a, b) => a.dayNumber - b.dayNumber);

    for (let i = 0; i < numDays; i++) {
      const day = services.find((service) => service.dayNumber === i + 1);
      schedules.push({
        title: day?.title || '',
        description: day?.description || '',
      });
    }

    return schedules;
  };

  const fetchTourDetails = async () => {
    try {
      // Gửi yêu cầu để lấy thông tin chi tiết của tour
      const response = await axios.get(
        `http://localhost:3000/public-tours/${tourId}`
      );

      const tour = response.data.tour;
      // Đặt giá trị cho loại tour
      if (tour.serviceType === 'trong ngày') {
        setTourType('day');
      } else if (tour.serviceType === 'nhiều ngày') {
        setTourType('multi');
      }
      const formattedSchedules = processMultiDaySchedules(
        tour.services,
        tour.services.length
      );
      setMultiDaySchedules(formattedSchedules);
      setNumDays(formattedSchedules.length);

      setMultiDaySchedules(formattedSchedules);

      if (!tour) {
        console.error('Không tìm thấy thông tin chi tiết của tour.');
        return;
      }

      console.log('Thông tin chi tiết tour:', tour);

      // Kiểm tra danh sách tỉnh đã được tải hay chưa
      if (!provinces.length) {
        console.warn('Danh sách tỉnh chưa được tải. Đợi hoàn thành tải tỉnh.');
        return;
      }

      // Cập nhật các thông tin cơ bản của tour
      setPUCLIC_TOUR_NAME(tour.name);
      setDESCRIPIONS_HIGHLIGHT(tour.highlights?.join(', ') || '');
      setPUCLIC_TOUR_TYPE(tour.tourTypeId || '');
      setDESCRIPTIONS(tour.description || '');
      setLANGUAGE(tour.language || 'vi');
      setSchedules(tour.schedules || []);
      setScheduleDetails(tour.services || []);

      // Xử lý hình ảnh
      if (tour.images) {
        setIMAGE(tour.images.map((img) => img.imageUrl));
      }

      // Tách địa điểm thành từng phần: Xã/Phường, Quận/Huyện, Tỉnh/Thành phố
      const [wardName, districtName, provinceName] =
        tour.location?.split(', ') || [];

      console.log('Phân tách địa điểm:', {
        wardName,
        districtName,
        provinceName,
      });

      // Tìm mã tỉnh từ danh sách tỉnh
      const province = provinces.find((item) => item.name === provinceName);
      if (province) {
        setSelectedProvince(province.code);
        console.log('Tỉnh được chọn:', province);

        // Lấy danh sách quận/huyện từ mã tỉnh
        const districtsData = await fetchDistricts(province.code);

        // Tìm mã quận/huyện từ danh sách quận/huyện
        const district = districtsData.find(
          (item) => item.name === districtName
        );
        if (district) {
          setSelectedDistrict(district.code);
          console.log('Quận/Huyện được chọn:', district);

          // Lấy danh sách xã/phường từ mã quận/huyện
          const wardsData = await fetchWards(district.code);

          // Tìm mã xã/phường từ danh sách xã/phường
          const ward = wardsData.find((item) => item.name === wardName);
          if (ward) {
            setSelectedWard(ward.code);
            console.log('Xã/Phường được chọn:', ward);
          } else {
            console.warn('Không tìm thấy xã/phường:', wardName);
          }
        } else {
          console.warn('Không tìm thấy quận/huyện:', districtName);
        }
      } else {
        console.warn('Không tìm thấy tỉnh:', provinceName);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin chi tiết tour:', error);
    } finally {
      setLoading(false); // Đặt trạng thái tải về false khi hoàn thành
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (provinces.length > 0) {
      fetchTourDetails();
    }
  }, [provinces]);

  // Handle changes
  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict(''); // Reset quận/huyện
    setSelectedWard(''); // Reset xã/phường
    setWards([]); // Clear danh sách xã/phường

    if (provinceCode) {
      console.log('Đang tải quận/huyện cho tỉnh:', provinceCode);
      await fetchDistricts(provinceCode); // Gọi hàm lấy danh sách quận/huyện
    }
  };

  const handleDistrictChange = async (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard('');
    await fetchWards(districtCode);
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  // Hàm xóa lịch khởi hành
  const removeSchedule = (index) => {
    setSchedules((prevSchedules) =>
      prevSchedules.filter((_, i) => i !== index)
    );
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

  const editSchedule = (index) => {
    const schedule = schedules[index];
    setEditingIndex(index); // Lưu vị trí đang chỉnh sửa
    setDepartureDate(
      moment(schedule.departureDate).format('YYYY-MM-DD') // Đảm bảo định dạng đúng
    );
    setPriceAdult(schedule.priceAdult);
    setPriceChild(schedule.priceChild);
    setAvailableAdultCount(schedule.availableAdultCount);
  };

  // Hàm lưu sau khi chỉnh sửa:
  const saveEditedSchedule = () => {
    const updatedSchedules = [...schedules];
    updatedSchedules[editingIndex] = {
      departureDate,
      priceAdult,
      priceChild,
      availableAdultCount,
    };
    setSchedules(updatedSchedules);
    setEditingIndex(null); // Reset trạng thái chỉnh sửa
    setDepartureDate('');
    setPriceAdult('');
    setPriceChild('');
    setAvailableAdultCount('');
  };
  const handleAddOrSave = () => {
    if (editingIndex !== null) {
      saveEditedSchedule(); // Lưu khi đang chỉnh sửa
    } else {
      addSchedule(); // Thêm mới khi không chỉnh sửa
    }
  };

  const addScheduleDetail = () => {
    setScheduleDetails((prev) => [
      ...prev,
      { time: '', title: '', description: '' },
    ]);
  };

  // Validate the form
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const updateImages = (updatedExistingImages, updatedNewImages) => {
    setExistingImages(updatedExistingImages); // Cập nhật ảnh cũ
    setNewImages(updatedNewImages); // Cập nhật ảnh mới
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('PUCLIC_TOUR_NAME', PUCLIC_TOUR_NAME);
    formData.append('PUCLIC_TOUR_TYPE', PUCLIC_TOUR_TYPE);
    formData.append('DESCRIPIONS_HIGHLIGHT', DESCRIPIONS_HIGHLIGHT);
    formData.append('DESCRIPTIONS', DESCRIPTIONS);
    formData.append('province', selectedProvince);
    formData.append('district', selectedDistrict);
    formData.append('ward', selectedWard);
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

    // Đưa danh sách URL ảnh cũ (sau khi đã xử lý xóa)
    existingImages.forEach((imgUrl) =>
      formData.append('existingImages', imgUrl)
    );

    // Đưa các file ảnh mới (nếu có)

    newImages.forEach((file) => formData.append('newImages', file));
    try {
      await axios.put(
        `http://localhost:3000/public-tours/${tourId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      alert('Cập nhật tour thành công!');
    } catch (error) {
      console.error(
        'Lỗi khi cập nhật tour:',
        error.response?.data || error.message
      );
      alert('Cập nhật tour thất bại.');
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <FormHeader
        title="Cập Nhật Tour"
        description="Điền các thông tin dưới đây để cập nhật tour."
      />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-y-6 bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Thông tin chi tiết */}
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

        {/* Địa điểm */}
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

        {/* Ngôn ngữ */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Ngôn ngữ</h3>
          <LanguageSelector LANGUAGE={LANGUAGE} setLANGUAGE={setLANGUAGE} />
        </div>
        {/* loại dịch vụ */}
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
            PUCLIC_TOUR_TYPE={PUCLIC_TOUR_TYPE}
            setPUCLIC_TOUR_TYPE={setPUCLIC_TOUR_TYPE}
          />
        </div>

        {/* Lịch trình */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Lịch trình</h3>
          <ScheduleList
            schedules={schedules}
            addSchedule={handleAddOrSave}
            editSchedule={editSchedule}
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

        {/* Hình ảnh */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tải lên hình ảnh</h3>
          <FileUploader
            IMAGE={IMAGE}
            setIMAGE={(files) => {
              if (files.length > 0) {
                setNewImages(files); // Lưu các file mới tải lên
              }
            }}
            existingImages={IMAGE.filter((img) => typeof img === 'string')}
            newImages={newImages} // Pass newImages to FileUploader
            setNewImages={setNewImages} // Pass setNewImages to FileUploader
          />
        </div>

        {/* Nút submit */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Cập Nhật Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTourForm;
