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
        //location
        provinces,
        districts,
        wards,
        selectedProvince,setSelectedProvince,
        selectedDistrict, setSelectedDistrict,
        selectedWard, setSelectedWard,
        address, setAddress,

        //hotel detail
        hotelName, setHotelName,
        hotelType, setHotelType,
        descriptions, setDescriptions,

        //service and policy , meal plan
        services, setServices,
        cancellationPolicy, setCancellationPolicy,
        mealPlan, setMealPlan,
        allServices,
        allMealPlans,


        facilities,
        setFacilities,
        roomSize,
        setRoomSize,

        images,
        updateImages,
        errors,setErrors,
        validateForm,
        hotelTypes,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,

        //roomtype
        roomName, setRoomName,
        bedTypes, setBedTypes,
        bedTypePrices, setBedTypePrices,
        bedTypeQuantities, setBedTypeQuantities,
        newBedType, setNewBedType,
        newBedTypePrice, setNewBedTypePrice,
        newBedTypeQuantity, setNewBedTypeQuantity,
        roomTypes, setRoomTypes,


        //image
        existingImages, setExistingImages,
        newImages, setNewImages,
        IMAGE, setIMAGE,
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
        formData.append('description', descriptions);
        formData.append('province', selectedProvince);
        formData.append('district', selectedDistrict);
        formData.append('ward', selectedWard);
        formData.append('address', address);
        // Append các thông tin về dịch vụ, chính sách hủy và meal plan
        formData.append('services', JSON.stringify(services)); // Dịch vụ chọn lựa
        formData.append('cancellationPolicy', cancellationPolicy); // Chính sách hủy
        formData.append('mealPlan', mealPlan); // Meal Plan
        // Kiểm tra và gửi thông tin phòng
        if (roomTypes.length > 0) {
            roomTypes.forEach((room, index) => {
                // Gộp thông tin phòng vào một đối tượng duy nhất
                const roomData = {
                    roomName: room.name,
                    bedTypes: room.bedTypes.map((bed, i) => ({
                        type: bed,
                        price: room.bedTypePrices[i],
                        quantity: room.bedTypeQuantities[i],
                        roomSize: room.roomSize[i],
                        facilities: room.facilities[i],
                    })),
                };

                // Gửi dữ liệu phòng đã gộp vào FormData
                formData.append(`room_${index}`, JSON.stringify(roomData));
            });
        } else {
            alert('Vui lòng thêm ít nhất một loại phòng!');
            return;
        }





        // Append thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            formData.append('createdBy', parseInt(user.id, 10)); // Chuyển thành số nguyên
        }



        // // Đưa các file ảnh mới vào FormData
        // newImages.forEach((file) => {
        //     formData.append('newImages', file);
        // });

        // Đưa danh sách ảnh cũ vào FormData
        // formData.append('existingImages', JSON.stringify(existingImages));

        // Log dữ liệu trước khi gửi
        console.log('FormData to send:');
        for (let [key, value] of formData.entries()) {
            if (key === 'newImages[]') {
                console.log(`${key}:`, value.name); // Log tên file mới
            } else {
                console.log(`${key}:`, value); // Log các giá trị khác
            }
        }

        // try {
        //     const response = await axios.post(
        //         'http://localhost:3000/hotels/createHotel',
        //         formData,
        //         {
        //             headers: { 'Content-Type': 'multipart/form-data' },
        //         }
        //     );
        //     alert('Tạo khách sạn thành công!');
        // } catch (error) {
        //     console.error('Lỗi khi tạo khách sạn:', error.response?.data || error.message);
        //     alert('Tạo khách sạn thất bại.');
        // }
    };

    return (
        <div className="relative p-8 max-w-7xl mx-auto">
            <div className="fixed ml-[-150px]">
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
                <div>
                    <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
                   <ServiceAndPolicyForm
                       services={services}
                    setServices={setServices}
                    cancellationPolicy={cancellationPolicy}
                    setCancellationPolicy={setCancellationPolicy}
                       mealPlan={mealPlan}
                    setMealPlan={setMealPlan}
                    allServices={allServices}
                    allMealPlans={allMealPlans}
                       errors={errors}
                   />
                </div>





                <div>
                    <h3 className="text-lg font-semibold mb-4">Thông tin phòng</h3>
                    <RoomTypeForm
                        roomName={roomName}
                    setRoomName={setRoomName}
                    bedTypes={bedTypes}
                    setBedTypes={setBedTypes}
                    bedTypePrices={bedTypePrices}
                    setBedTypePrices={setBedTypePrices}
                    bedTypeQuantities={bedTypeQuantities}
                    setBedTypeQuantities={setBedTypeQuantities}
                    newBedType={newBedType}
                    setNewBedType={setNewBedType}
                    newBedTypePrice={newBedTypePrice}
                    setNewBedTypePrice={setNewBedTypePrice}
                    newBedTypeQuantity={newBedTypeQuantity}
                    setNewBedTypeQuantity={setNewBedTypeQuantity}
                    roomTypes={roomTypes}
                    setRoomTypes={setRoomTypes}
                        facilities={facilities}
                    setFacilities={setFacilities}
                    roomSize={roomSize}
                    setRoomSize={setRoomSize}
                        errors={errors}
                        setErrors={setErrors}


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
