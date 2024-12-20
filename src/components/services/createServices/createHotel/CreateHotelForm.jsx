import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import useCreateHotelForm from './useCreateHotelForm.jsx';
import FormHeader from './FormHeader.jsx';
import LocationSelector from './LocationSelector.jsx';
import HotelDetails from './HotelDetails.jsx';
import FileUploader from './FileUploader.jsx';

import Header from "../../../../layout/Header.jsx";
import SideBar from "../../../UserProfile/SideBar.jsx";
import {motion} from "framer-motion";
import ExportButton from "../../../Staff/ExportButton.jsx";
const CreateHotelForm = () => {
    const {
        //location
        provinces,
        districts,
        wards,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        address, setAddress,

        //hotel detail
        hotelName, setHotelName,
        hotelType, setHotelType,
        descriptions, setDescriptions,

        //service and policy , meal plan
        cancellationPolicy, setCancellationPolicy,
        mealPlan, setMealPlan,
        allServices,
        allMealPlans,

        images,
        updateImages,
        errors,setErrors,
        validateForm,
        hotelTypes,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,




        //image
        existingImages, setExistingImages,
        newImages, setNewImages,
        IMAGE, setIMAGE,
    } = useCreateHotelForm();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log('Validation failed.');
            const firstErrorField = document.querySelector('.border-red-500');
            if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const formData = new FormData();

        // Append thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            formData.append("CREATED_BY", parseInt(user.id, 10)); // Chuyển thành số nguyên
        }

        // Append các dữ liệu cơ bản
        formData.append('hotelName', hotelName);
        formData.append('hotelType', hotelType);
        formData.append('description', descriptions);
        formData.append('province', selectedProvince);
        formData.append('district', selectedDistrict);
        formData.append('ward', selectedWard);
        formData.append('address', address);
        formData.append('cancellationPolicy', cancellationPolicy);
        formData.append('mealPlan', mealPlan);


        // Gửi các file mới
        newImages.forEach((file) => {
            formData.append('newImages', file); // Key phải là 'newImages'
        });

        // Gửi danh sách ảnh cũ nếu có
        existingImages.forEach((image) => {
            formData.append('existingImages', image);
        });

        // Log dữ liệu kiểm tra
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        // Gửi request đến server
        try {
            const response = await axios.post(
                'http://localhost:3000/hotels/create-hotel',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            alert('Tạo khách sạn thành công!');
        } catch (error) {
            console.error('Lỗi khi tạo khách sạn:', error.response?.data || error.message);
            alert('Tạo khách sạn thất bại.');
        }
    };

    return (


    <div className='bg-[#f8f8f8] w-full min-h-screen overflow-auto relative'>
        <Header/>
        <div className='flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-6 mt-4 '>
            <div className='mr-2 fixed'>
                <SideBar/>
            </div>

            <div className="flex-grow bg-white w-full p-8  mt-6 md:mt-0 ml-[300px]">
                <h1 className="text-[32px] text-gray-800 font-bold mb-8">Tạo thông tin khách sạn</h1>

                <div className="relative mx-auto">
                    <form onSubmit={handleSubmit}
                          className="grid grid-cols-1 gap-y-6 bg-white ">
                        {/* Hotel Details */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Thông tin chi tiết</h3>
                            <HotelDetails
                                hotelTypes={hotelTypes}
                                hotelName={hotelName}
                                setHotelName={setHotelName}
                                hotelType={hotelType}
                                setHotelType={setHotelType}
                                descriptions={descriptions}
                                setDescriptions={setDescriptions}
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
                                address={address}
                                setAddress={setAddress}
                                errors={errors}
                            />
                        </div>

                        {/* File Uploader */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Tải lên hình ảnh</h3>
                            <FileUploader
                                existingImages={existingImages}   // Ảnh cũ từ server
                                newImages={newImages}             // Ảnh mới (files)
                                updateImages={(updatedExisting, updatedNew) => {
                                    setExistingImages(updatedExisting);
                                    setNewImages(updatedNew);
                                }}
                            />
                        </div>
                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Tạo khách sạn
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
        ;
};

export default CreateHotelForm;
