import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import useCreateHotelForm from './useCreateHotelForm.jsx';
import FormHeader from './FormHeader.jsx';
import LocationSelector from './LocationSelector.jsx';
import HotelDetails from './HotelDetails.jsx';
import FileUploader from './FileUploader.jsx';
import ReturnButton from '../../../common/ReturnButton.jsx';
import RoomTypeForm from './RoomTypeForm.jsx';
import  ServiceAndPolicyForm from './ServiceAndPolicy.jsx';
const CreateHotelForm = () => {
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
        hotelName,
        setHotelName,
        hotelType,
        setHotelType,
        description,
        setDescription,
        serviceDescription,
        setServiceDescription,
        IMAGE,
        setIMAGE,
        LANGUAGE,
        setLANGUAGE,
        errors,
        hotelTypes,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
        validateForm,
        newImages,
        setNewImages,
        existingImages,
        updateImages,
    } = useCreateHotelForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            const firstErrorField = document.querySelector('.border-red-500');
            if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const formData = new FormData();

        // Append các trường thông tin cơ bản
        formData.append('hotelName', hotelName);
        formData.append('hotelType', hotelType);
        formData.append('description', description);
        formData.append('serviceDescription', serviceDescription);
        formData.append('province', selectedProvince);
        formData.append('district', selectedDistrict);
        formData.append('ward', selectedWard);

        // Append thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            formData.append('createdBy', parseInt(user.id, 10)); // Chuyển thành số nguyên
        }

        // Append ngôn ngữ
        formData.append('language', LANGUAGE);

        // Đưa các file ảnh mới vào FormData
        newImages.forEach((file) => {
            formData.append('newImages', file);
        });

        // Đưa danh sách ảnh cũ vào FormData
        formData.append('existingImages', JSON.stringify(existingImages));

        try {
            const response = await axios.post(
                'http://localhost:3000/hotels/createHotel',
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
        <div className="relative p-8 max-w-4xl mx-auto">
            <div className="fixed ml-[-300px]">
                <ReturnButton />
            </div>
            <FormHeader
                title="Tạo khách sạn mới"
                description="Điền các thông tin dưới đây để tạo khách sạn mới."
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 bg-white p-8 rounded-lg shadow-lg">
                {/* Hotel Details */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Thông tin chi tiết</h3>
                    <HotelDetails
                        hotelTypes={hotelTypes}
                        hotelName={hotelName}
                        setHotelName={setHotelName}
                        hotelType={hotelType}
                        setHotelType={setHotelType}
                        description={description}
                        setDescription={setDescription}
                        serviceDescription={serviceDescription}
                        setServiceDescription={setServiceDescription}
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
                <div>
                    <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
                   <ServiceAndPolicyForm/>
                </div>





                <div>
                    <h3 className="text-lg font-semibold mb-4">Thông tin phòng</h3>
                    <RoomTypeForm

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
                        Tạo khách sạn
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateHotelForm;
