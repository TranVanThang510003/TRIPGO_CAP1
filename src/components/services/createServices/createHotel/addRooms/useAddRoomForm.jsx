import { useState, useEffect } from 'react';
import axios from 'axios';

const useAddRoomForm = () => {
    const [facilities, setFacilities] = useState([]); // Danh sách tiện ích
    const [roomSize, setRoomSize] = useState('');
    const [images, setImages] = useState([]); // Hình ảnh khách sạn
    const [errors, setErrors] = useState({}); // Lưu trữ lỗi khi nhập liệu

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [IMAGE, setIMAGE] = useState(null);


    const [roomName, setRoomName] = useState('');
    const [bedTypes, setBedTypes] = useState([]);
    const [bedTypePrices, setBedTypePrices] = useState([]);
    const [bedTypeQuantities, setBedTypeQuantities] = useState([]); // Dùng để lưu số lượng theo từng loại giường
    const [price, setPrice] = useState('');
    const [newBedType, setNewBedType] = useState('');
    const [newBedTypePrice, setNewBedTypePrice] = useState('');
    const [newBedTypeQuantity, setNewBedTypeQuantity] = useState(''); // Số lượng phòng cho loại giường mới
    const [roomTypes, setRoomTypes] = useState([]);
    const     [newRoomSize , setNewRoomSize]=useState('');

    // Hàm thêm tiện ích vào danh sách
    const addFacility = (facility) => {
        setFacilities((prevFacilities) => [...prevFacilities, facility]);
    };

    // Hàm cập nhật danh sách hình ảnh
    const updateImages = (newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
    };


    return {
        facilities,
        setFacilities,
        roomSize,
        setRoomSize,
        images,
        updateImages,
        errors,setErrors,

        //roomtype
        roomName, setRoomName,
        bedTypes, setBedTypes,
        bedTypePrices, setBedTypePrices,
        bedTypeQuantities, setBedTypeQuantities,
        price, setPrice,
        newBedType, setNewBedType,
        newBedTypePrice, setNewBedTypePrice,
        newBedTypeQuantity, setNewBedTypeQuantity,
        roomTypes, setRoomTypes,
        newRoomSize , setNewRoomSize,

        //image
        existingImages, setExistingImages,
        newImages, setNewImages,
        IMAGE, setIMAGE,
    };
};

export default useAddRoomForm;
