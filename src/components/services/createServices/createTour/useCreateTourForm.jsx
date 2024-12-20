// useCreateHotelForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCreateTourForm = () => {
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
  const [quantity, setQuantity] = useState('');
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

  // Hàm thêm lịch khởi hành vào danh sách
  const addSchedule = () => {
    if (!departureDate || !priceAdult || !priceChild || !quantity) {
      alert('Vui lòng điền đầy đủ thông tin lịch khởi hành.');
      return;
    }

    const schedule = {
      departureDate,
      numDays: tourType === 'multi' ? numDays : 1,
      priceAdult,
      priceChild,
        quantity,
    };

    setSchedules((prevSchedules) => [...prevSchedules, schedule]);
    setDepartureDate('');
    setEndDate('');
    setPriceAdult('');
    setPriceChild('');
    setQuantity('');
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

    return {
        provinces,
        districts,
        wards,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        setSelectedProvince,
        setSelectedDistrict,
        setSelectedWard,
        PUCLIC_TOUR_NAME,
        setPUCLIC_TOUR_NAME,
        DESCRIPIONS_HIGHLIGHT,
        setDESCRIPIONS_HIGHLIGHT,
        PUCLIC_TOUR_TYPE,
        setPUCLIC_TOUR_TYPE,
        DESCRIPTIONS,
        setDESCRIPTIONS,
        serviceDescription,
        setServiceDescription,
        IMAGE,
        setIMAGE,
        LANGUAGE,
        setLANGUAGE,
        scheduleDetails,
        setScheduleDetails,
        errors,
        tourTypes,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
        schedules, // Lấy `schedules` từ custom hook
        setSchedules,
        addSchedule,
        removeSchedule,
        addScheduleDetail,
        updateImages,
        validateForm,
        departureDate,
        setDepartureDate,
        endDate,
        setEndDate,
        priceAdult,
        setPriceAdult,
        priceChild,
        setPriceChild,
        quantity,
        setQuantity,
        tourType, setTourType,
        numDays, setNumDays,
        multiDaySchedules,
        setMultiDaySchedules,
        newImages,
        setNewImages,
        existingImages,


    };
};

export default useCreateTourForm;
