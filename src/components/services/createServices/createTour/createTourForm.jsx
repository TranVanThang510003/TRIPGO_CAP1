import ExcelUploader from './ExcelUploader';
import {useState} from "react";
import axios from 'axios';
import React from 'react';
import useCreateTourForm from './useCreateTourForm';
import FormHeader from './FormHeader.jsx';
import LocationSelector from './LocationSelector.jsx';
import TourDetails from './TourDetails.jsx';
import ScheduleList from './ScheduleList.jsx';
import FileUploader from './FileUploader.jsx';
import TourTypeSelector from './TourTypeSelector.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import ReturnButton from '../../../common/ReturnButton.jsx';

const CreateTourForm = () => {
  const {
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
    tourType,
    setTourType,
    numDays,
    setNumDays,
    multiDaySchedules,
    setMultiDaySchedules,
    newImages,
    setNewImages,
    existingImages,


  } = useCreateTourForm();


  const [toursFromExcel, setToursFromExcel] = useState([]);

  const handleExcelFileChange = (tours) => {
    setToursFromExcel(tours);
    // Log dữ liệu từ file Excel
    console.log('Dữ liệu từ file Excel:');
    tours.forEach((tour) => {
      console.log('PUCLIC_TOUR_NAME:', tour.PUCLIC_TOUR_NAME);
      console.log('PUCLIC_TOUR_TYPE:', tour.PUCLIC_TOUR_TYPE);
      console.log('DESCRIPIONS_HIGHLIGHT:', tour.DESCRIPIONS_HIGHLIGHT);
      console.log('DESCRIPTIONS:', tour.DESCRIPTIONS);
      console.log('province:', tour.province);
      console.log('district:', tour.district);
      console.log('ward:', tour.ward);
      console.log('LANGUAGE:', tour.LANGUAGE);
      console.log('serviceDescription:', tour.serviceDescription);
      console.log('schedules:', tour.schedules);
      console.log('numDays:', tour.numDays);
      console.log('scheduleDetails:', tour.scheduleDetails);
      console.log('multiDaySchedules:', tour.multiDaySchedules);
      console.log('---')
    });
  };



  const handleCreateTourFromExcel = () => {
    toursFromExcel.forEach((tour) => {

      // Đảm bảo rằng scheduleDetails và schedules là mảng hợp lệ
      const scheduleDetails = Array.isArray(tour.scheduleDetails)
          ? tour.scheduleDetails
          : []; // Hoặc xử lý theo cách khác nếu không phải mảng
      const schedules = Array.isArray(tour.schedules) ? tour.schedules : [];

      setPUCLIC_TOUR_NAME(tour.PUCLIC_TOUR_NAME);
      console.log('Cập nhật PUCLIC_TOUR_NAME:', tour.PUCLIC_TOUR_NAME);
      setPUCLIC_TOUR_TYPE(tour.PUCLIC_TOUR_TYPE);
      setDESCRIPIONS_HIGHLIGHT(tour.DESCRIPIONS_HIGHLIGHT);
      setDESCRIPTIONS(tour.DESCRIPTIONS);
      setSelectedProvince(tour.province);
      setSelectedDistrict(tour.district);
      setSelectedWard(tour.ward);
      setLANGUAGE(tour.LANGUAGE);
      setServiceDescription(tour.serviceDescription);
      setSchedules(schedules); // Cập nhật schedules
      setScheduleDetails(scheduleDetails); // Cập nhật scheduleDetails
      setNumDays(tour.numDays);

      setMultiDaySchedules(tour.multiDaySchedules);

      // Lưu các trường khác vào state
      // ...

      // Sau khi lưu các trường, bạn có thể gọi hàm validateForm() để kiểm tra và lưu tour
      if (validateForm()) {
        // Lưu tour
        // ...
      }
    });
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
        'http://localhost:3000/public-tours/createTour',
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

      <div className="relative p-8 max-w-4xl mx-auto">
        <div className="fixed ml-[-300px]">

          <ReturnButton/>
        </div>
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
            {/*<div>*/}
            {/*  <h3 className="text-lg font-semibold mb-4">Tạo tour từ file Excel</h3>*/}
            {/*  <ExcelUploader onDataParsed={handleExcelFileChange}/>*/}
            {/*  <button onClick={handleCreateTourFromExcel}>*/}
            {/*    Tạo tour từ file Excel*/}
            {/*  </button>*/}
            {/*</div>*/}

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
            <LanguageSelector LANGUAGE={LANGUAGE} setLANGUAGE={setLANGUAGE}/>
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
                quantity={quantity}
                setQuantity={setQuantity}
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
  )
      ;
};

export default CreateTourForm;
