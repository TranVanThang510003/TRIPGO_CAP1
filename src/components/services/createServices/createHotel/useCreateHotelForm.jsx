import { useState, useEffect } from 'react';
import axios from 'axios';

const useCreateHotelForm = () => {
    const [provinces, setProvinces] = useState([]); // Danh sách tỉnh
    const [districts, setDistricts] = useState([]); // Danh sách quận/huyện
    const [wards, setWards] = useState([]); // Danh sách xã/phường
    const [selectedProvince, setSelectedProvince] = useState(''); // Mã tỉnh được chọn
    const [selectedDistrict, setSelectedDistrict] = useState(''); // Mã quận được chọn
    const [selectedWard, setSelectedWard] = useState(''); // Mã xã/phường được chọn

    // Các trường nhập liệu của khách sạn
    const [hotelName, setHotelName] = useState('');
    const [hotelType, setHotelType] = useState(''); // Loại khách sạn (ví dụ: 1 sao, 2 sao)
    const [highlights, setHighlights] = useState(''); // Điểm nổi bật
    const [descriptions, setDescriptions] = useState(''); // Mô tả chi tiết
    const [facilities, setFacilities] = useState([]); // Danh sách tiện ích
    const [images, setImages] = useState([]); // Hình ảnh khách sạn
    const [errors, setErrors] = useState({}); // Lưu trữ lỗi khi nhập liệu

    // Danh sách loại phòng
    const [roomTypes, setRoomTypes] = useState([
        { id: 1, name: 'Phòng đơn' },
        { id: 2, name: 'Phòng đôi' },
        { id: 3, name: 'Phòng gia đình' },
    ]);

    // Danh sách loại khách sạn
    const hotelTypes = [
        { id: 1, name: '1 sao' },
        { id: 2, name: '2 sao' },
        { id: 3, name: '3 sao' },
        { id: 4, name: '4 sao' },
        { id: 5, name: '5 sao' },
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
    // Hàm thêm tiện ích vào danh sách
    const addFacility = (facility) => {
        setFacilities((prevFacilities) => [...prevFacilities, facility]);
    };

    // Hàm cập nhật danh sách hình ảnh
    const updateImages = (newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    // Hàm validate form trước khi gửi
    const validateForm = () => {
        const newErrors = {};
        if (!hotelName.trim()) newErrors.hotelName = 'Tên khách sạn không được để trống.';
        if (!selectedProvince) newErrors.selectedProvince = 'Vui lòng chọn tỉnh.';
        if (!selectedDistrict) newErrors.selectedDistrict = 'Vui lòng chọn quận/huyện.';
        if (!selectedWard) newErrors.selectedWard = 'Vui lòng chọn xã/phường.';
        if (!highlights.trim()) newErrors.highlights = 'Vui lòng nhập điểm nổi bật.';
        if (!descriptions.trim()) newErrors.descriptions = 'Vui lòng nhập mô tả chi tiết.';

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
        hotelName,
        setHotelName,
        hotelType,
        setHotelType,
        highlights,
        setHighlights,
        descriptions,
        setDescriptions,
        facilities,
        addFacility,
        images,
        updateImages,
        errors,
        validateForm,
        hotelTypes,
        roomTypes,
        setRoomTypes,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
    };
};

export default useCreateHotelForm;
