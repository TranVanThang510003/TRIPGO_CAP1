//
// import axios from 'axios';
// import useCreateHotelForm from './useCreateHotelForm.jsx';
// import LocationSelector from './LocationSelector.jsx';
// import HotelDetails from './HotelDetails.jsx';
// import FileUploader from './FileUploader.jsx';
//
// import Header from "../../../../layout/Header.jsx";
// import SideBar from "../../../UserProfile/SideBar.jsx"
// const CreateHotelForm = () => {
//     const {
//         //location
//         provinces,
//         districts,
//         wards,
//         selectedProvince,
//         selectedDistrict,
//         selectedWard,
//         address, setAddress,
//
//         //hotel detail
//         hotelName, setHotelName,
//         hotelType, setHotelType,
//         descriptions, setDescriptions,
//
//         errors,
//         validateForm,
//         hotelTypes,
//         handleProvinceChange,
//         handleDistrictChange,
//         handleWardChange,
//
//
//
//
//         //image
//         existingImages, setExistingImages,
//         newImages, setNewImages,
//
//     } = useCreateHotelForm();
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (!validateForm()) {
//             console.log('Validation failed.');
//             const firstErrorField = document.querySelector('.border-red-500');
//             if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth' });
//             return;
//         }
//
//         const formData = new FormData();
//
//         // Append thông tin người dùng từ localStorage
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (user && user.id) {
//             formData.append("CREATED_BY", parseInt(user.id, 10)); // Chuyển thành số nguyên
//         }
//
//         // Append các dữ liệu cơ bản
//         formData.append('hotelName', hotelName);
//         formData.append('hotelType', hotelType);
//         formData.append('description', descriptions);
//         formData.append('province', selectedProvince);
//         formData.append('district', selectedDistrict);
//         formData.append('ward', selectedWard);
//         formData.append('address', address);
//
//
//
//         // Gửi các file mới
//         newImages.forEach((file) => {
//             formData.append('newImages', file); // Key phải là 'newImages'
//         });
//
//         // Gửi danh sách ảnh cũ nếu có
//         existingImages.forEach((image) => {
//             formData.append('existingImages', image);
//         });
//
//         // Log dữ liệu kiểm tra
//         for (let [key, value] of formData.entries()) {
//             console.log(`${key}:`, value);
//         }
//
//         // Gửi request đến server
//         try {
//             const response = await axios.post(
//                 'http://localhost:3000/hotels/create-hotel',
//                 formData,
//                 {
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                 }
//             );
//             alert('Tạo khách sạn thành công!');
//         } catch (error) {
//             console.error('Lỗi khi tạo khách sạn:', error.response?.data || error.message);
//             alert('Tạo khách sạn thất bại.');
//         }
//     };
//
//     return (
//
//
//     <div className='bg-[#f8f8f8] w-full min-h-screen overflow-auto relative'>
//         <Header/>
//         <div className='flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-6 mt-4 '>
//             <div className='mr-2 fixed'>
//                 <SideBar/>
//             </div>
//
//             <div className="flex-grow bg-white w-full p-8  mt-6 md:mt-0 ml-[300px]">
//                 <h1 className="text-[32px] text-gray-800 font-bold mb-8">Tạo thông tin khách sạn</h1>
//
//                 <div className="relative mx-auto">
//                     <form onSubmit={handleSubmit}
//                           className="grid grid-cols-1 gap-y-6 bg-white ">
//                         {/* Hotel Details */}
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">Thông tin chi tiết</h3>
//                             <HotelDetails
//                                 hotelTypes={hotelTypes}
//                                 hotelName={hotelName}
//                                 setHotelName={setHotelName}
//                                 hotelType={hotelType}
//                                 setHotelType={setHotelType}
//                                 descriptions={descriptions}
//                                 setDescriptions={setDescriptions}
//                                 errors={errors}
//                             />
//                         </div>
//                         {/* Location Selector */}
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">Địa điểm</h3>
//                             <LocationSelector
//                                 provinces={provinces}
//                                 districts={districts}
//                                 wards={wards}
//                                 selectedProvince={selectedProvince}
//                                 selectedDistrict={selectedDistrict}
//                                 selectedWard={selectedWard}
//                                 handleProvinceChange={handleProvinceChange}
//                                 handleDistrictChange={handleDistrictChange}
//                                 handleWardChange={handleWardChange}
//                                 address={address}
//                                 setAddress={setAddress}
//                                 errors={errors}
//                             />
//                         </div>
//
//                         {/* File Uploader */}
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">Tải lên hình ảnh</h3>
//                             <FileUploader
//                                 existingImages={existingImages}   // Ảnh cũ từ server
//                                 newImages={newImages}             // Ảnh mới (files)
//                                 updateImages={(updatedExisting, updatedNew) => {
//                                     setExistingImages(updatedExisting);
//                                     setNewImages(updatedNew);
//                                 }}
//                             />
//                         </div>
//                         {/* Submit Button */}
//                         <div>
//                             <button
//                                 type="submit"
//                                 className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200"
//                             >
//                                 Tạo khách sạn
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>
//     )
//         ;
// };
//
// export default CreateHotelForm;

import  React from 'react';
import axios from 'axios';
import useCreateHotelForm from './useCreateHotelForm.jsx';
import LocationSelector from './LocationSelector.jsx';
import HotelDetails from './HotelDetails.jsx';
import FileUploader from './FileUploader.jsx';
import { useSearchParams } from "react-router-dom";
import Header from "../../../../layout/Header.jsx";
import SideBar from "../../../UserProfile/SideBar.jsx"
const HotelForm = () => {
    const [searchParams] = useSearchParams();
    const isEdit = searchParams.get("isEdit") === "true";
    const hotelId = searchParams.get("hotelId");
    const [initialData, setInitialData] = React.useState({});

    const {
        provinces,
        districts,
        wards,
        selectedProvince, setSelectedProvince,
        selectedDistrict, setSelectedDistrict,
        selectedWard, setSelectedWard,
        fetchDistricts,
        fetchWards,
        address, setAddress,
        hotelName, setHotelName,
        hotelType, setHotelType,
        descriptions, setDescriptions,
        errors,
        validateForm,
        hotelTypes,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
        existingImages, setExistingImages,
        newImages, setNewImages,
    } = useCreateHotelForm(initialData);

    const parseAddress = (fullAddress) => {
        if (!fullAddress) return { address: "", ward: "", district: "", province: "" };

        const parts = fullAddress.split(",").map((part) => part.trim()); // Tách các phần
        return {
            address: parts[0] || "",   // Số nhà, tên đường
            ward: parts[1] || "",      // Xã/phường
            district: parts[2] || "",  // Quận/huyện
            province: parts[3] || ""   // Tỉnh/thành phố
        };
    };


    React.useEffect(() => {
        const fetchHotelData = async () => {
            if (!isEdit || !hotelId) return; // Chỉ thực hiện khi ở chế độ chỉnh sửa và có `hotelId`.

            try {
                const response = await axios.get(`http://localhost:3000/hotels/${hotelId}`);
                const data = response.data.data;

                const parsedAddress = parseAddress(data.address);

                // Gán dữ liệu ban đầu
                setInitialData({
                    name: data.name || '',
                    description: data.description || '',
                    hotelType: data.hotelType || '',
                    province: parsedAddress.province,
                    district: parsedAddress.district,
                    ward: parsedAddress.ward,
                    address: parsedAddress.address,
                    images: data.images || [],
                });

                // Đồng bộ state
                setHotelName(data.name || '');
                setDescriptions(data.description || '');
                setHotelType(data.hotelType || '');
                setAddress(parsedAddress.address || '');
                setExistingImages(data.images || []);

                // Tìm mã tỉnh
                const province = provinces.find((p) => p.name === parsedAddress.province);
                if (province) {
                    setSelectedProvince(province.code);

                    const districtsData = await fetchDistricts(province.code);
                    const district = districtsData.find((d) => d.name === parsedAddress.district);
                    if (district) {
                        setSelectedDistrict(district.code);

                        const wardsData = await fetchWards(district.code);
                        const ward = wardsData.find((w) => w.name === parsedAddress.ward);
                        if (ward) {
                            setSelectedWard(ward.code);
                        }
                    }
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu khách sạn:', error);
            }
        };

        // Chỉ gọi fetchHotelData khi provinces đã được tải xong
        if (isEdit && hotelId && provinces.length > 0) {
            fetchHotelData();
        }
    }, [isEdit, hotelId, provinces.length]); // Chỉ theo dõi `provinces.length` thay vì toàn bộ `provinces`.






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
        // Append dữ liệu cơ bản
        formData.append('hotelName', hotelName);
        formData.append('hotelType', hotelType);
        formData.append('description', descriptions);
        formData.append('province', selectedProvince);
        formData.append('district', selectedDistrict);
        formData.append('ward', selectedWard);
        formData.append('address', address);

        // Gửi các file mới
        newImages.forEach((file) => {
            formData.append('newImages', file);
        });

        // Gửi danh sách ảnh cũ
        existingImages.forEach((image) => {
            formData.append('existingImages', image);
        });
        console.log('Dữ liệu trước khi gửi:');
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}:`, value.name); // Log tên file nếu value là file
            } else {
                console.log(`${key}:`, value); // Log các giá trị khác
            }
        }

        // Thực hiện request
        try {
            const url = isEdit
                ? `http://localhost:3000/hotels/update-hotel/${hotelId}`  // URL cập nhật
                : 'http://localhost:3000/hotels/create-hotel';           // URL tạo mới

            const method = isEdit ? 'put' : 'post'; // Sử dụng PUT cho cập nhật, POST cho tạo mới

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert(isEdit ? 'Cập nhật khách sạn thành công!' : 'Tạo khách sạn thành công!');
        } catch (error) {
            console.error('Lỗi khi xử lý yêu cầu:', error.response?.data || error.message);
            alert(isEdit ? 'Cập nhật khách sạn thất bại.' : 'Tạo khách sạn thất bại.');
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
                    <h1 className="text-[32px] text-gray-800 font-bold mb-8">
                        {isEdit ? 'Chỉnh sửa thông tin khách sạn' : 'Tạo thông tin khách sạn'}
                    </h1>

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
                                {isEdit ? 'Cập nhật khách sạn' : 'Tạo khách sạn'}
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

export default HotelForm;

