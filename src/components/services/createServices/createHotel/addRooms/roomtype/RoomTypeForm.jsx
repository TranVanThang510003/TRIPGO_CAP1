import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage.jsx';
import InputField from "./InputField";
import SelectField from "./SelectField";
import FacilitiesList from "./FacilitiesList";
import RoomDetails from "./RoomDetails";
import RoomTable from "./RoomTable";
import FileUploader from "../../FileUploader";
const RoomTypeForm = ({
                          roomName, setRoomName,
                          bedTypes, setBedTypes,
                          bedTypePrices, setBedTypePrices,
                          bedTypeQuantities, setBedTypeQuantities,
                          newBedType, setNewBedType,
                          newBedTypePrice, setNewBedTypePrice,
                          newBedTypeQuantity, setNewBedTypeQuantity,
                          roomTypes, setRoomTypes,
                          facilities, setFacilities,
                          roomSize, setRoomSize,
                          newRoomSize , setNewRoomSize,
                          errors
                      }) => {
    const facilitiesList = [
        "Thang máy", "Máy lạnh", "Bể bơi", "Gym", "TV", "Tủ lạnh", "Máy sấy tóc", "Minibar", "két bảo hiểm"
    ];

    const [editedRoomId, setEditedRoomId] = useState(null);
    const [bedTypeRoomSizes, setBedTypeRoomSizes] = useState([]); // State lưu kích thước phòng

    const [roomImages, setRoomImages] = useState([]); // Lưu ảnh cho từng phòng



    const resetForm = () => {
        setRoomName('');
        setBedTypes([]);
        setBedTypePrices([]);
        setBedTypeQuantities([]);
        setBedTypeRoomSizes([]);
        setFacilities([]);
        setNewBedType('');
        setNewBedTypePrice('');
        setNewBedTypeQuantity('');
        setNewRoomSize('');
        setRoomImages([]);
    };

    const validateForm = () => {
        console.log("Room Name:", roomName);
        console.log("Bed Types:", bedTypes);
        console.log("Bed Type Prices:", bedTypePrices);
        console.log("Bed Type Quantities:", bedTypeQuantities);
        console.log("Room Sizes:", bedTypeRoomSizes);
        console.log("Facilities:", facilities);

        if (!roomName.trim()) {
            alert('Tên phòng không được để trống!');
            return false;
        }

        if (!bedTypes.length) {
            alert('Vui lòng thêm ít nhất một loại giường!');
            return false;
        }

        if (bedTypePrices.some(price => !price || price <= 0)) {
            alert('Vui lòng nhập giá hợp lệ cho tất cả các loại giường!');
            return false;
        }

        if (bedTypeQuantities.some(quantity => !quantity || quantity <= 0)) {
            alert('Vui lòng nhập số lượng hợp lệ cho tất cả các loại giường!');
            return false;
        }

        if (bedTypeRoomSizes.some(size => !size || size <= 0)) {
            alert('Vui lòng nhập kích thước hợp lệ cho tất cả các loại giường!');
            return false;
        }

        if (!facilities.length) {
            alert('Vui lòng chọn ít nhất một tiện ích cho phòng!');
            return false;
        }

        if (!roomImages.length) {
            alert('Vui lòng tải lên ít nhất một ảnh phòng!');
            return false;
        }

        return true;
    };



    const addRoomType = () => {
        if (!validateForm()) return;

        setRoomTypes(prevRoomTypes => [
            ...prevRoomTypes,
            {
                id: prevRoomTypes.length + 1,
                name: roomName,
                bedTypes,
                bedTypePrices,
                bedTypeQuantities,
                bedTypeRoomSizes,
                facilities, // Tiện ích chung cho phòng
                images: roomImages,
            }
        ]);




        resetForm();

    };

    const addBedTypeToRoom = () => {
        if (!newBedType || !newBedTypePrice || !newBedTypeQuantity || !newRoomSize ) {
            alert('Vui lòng nhập đầy đủ thông tin loại giường, giá, số lượng, kích thước !');
            return;
        }

        const bedTypeIndex = bedTypes.indexOf(newBedType);

        if (bedTypeIndex !== -1) {
            // Cập nhật giường đã tồn tại
            const updatedPrices = [...bedTypePrices];
            const updatedQuantities = [...bedTypeQuantities];
            const updatedSizes = [...bedTypeRoomSizes];

            updatedPrices[bedTypeIndex] = newBedTypePrice;
            updatedQuantities[bedTypeIndex] = newBedTypeQuantity;
            updatedSizes[bedTypeIndex] = newRoomSize;

            setBedTypePrices(updatedPrices);
            setBedTypeQuantities(updatedQuantities);
            setBedTypeRoomSizes(updatedSizes);

        } else {
            // Thêm mới loại giường
            setBedTypes(prev => [...prev, newBedType]);
            setBedTypePrices(prev => [...prev, newBedTypePrice]);
            setBedTypeQuantities(prev => [...prev, newBedTypeQuantity]);
            setBedTypeRoomSizes(prev => [...prev, newRoomSize]);

        }

        // Reset các input
        setNewBedType('');
        setNewBedTypePrice('');
        setNewRoomSize('');


    };




    const removeBedType = (roomId, bedType) => {
        setRoomTypes(prevRoomTypes => {
            return prevRoomTypes.map(room => {
                if (room.id === roomId) {
                    const bedTypeIndex = room.bedTypes.indexOf(bedType);
                    return {
                        ...room,
                        bedTypes: room.bedTypes.filter((_, index) => index !== bedTypeIndex),
                        bedTypePrices: room.bedTypePrices.filter((_, index) => index !== bedTypeIndex),
                        bedTypeQuantities: room.bedTypeQuantities.filter((_, index) => index !== bedTypeIndex)
                    };
                }
                return room;
            });
        });
    };

    const editRoomType = (id) => {
        const room = roomTypes.find(room => room.id === id);
        if (room) {
            setRoomName(room.name);
            setBedTypes(room.bedTypes);
            setBedTypePrices(room.bedTypePrices);
            setBedTypeQuantities(room.bedTypeQuantities);
            setBedTypeRoomSizes(room.bedTypeRoomSizes);// Đảm bảo kích thước giường được nạp đúng
            setFacilities(room.facilities);
            setRoomImages(room.images || []); // Nạp lại ảnh phòng
            setEditedRoomId(room.id);
        }
    };


    const saveEditedRoom = () => {
        if (!validateForm()) return;

        setRoomTypes(prevRoomTypes =>
            prevRoomTypes.map(room =>
                room.id === editedRoomId ?
                    { ...room, name: roomName, bedTypes, bedTypePrices, bedTypeQuantities, bedTypeRoomSizes, facilities ,  images: roomImages,} : room
            )
        );

        resetForm();
        setEditedRoomId(null);
    };

    const handleFacilityChange = (e) => {
        const { value, checked } = e.target;
        setFacilities(prevFacilities =>
            checked ? [...prevFacilities, value] : prevFacilities.filter(facility => facility !== value)
        );
    };


    return (
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Quản lý loại phòng</h3>
            <ErrorMessage message={errors.roomTypes}/>

            <div className="flex flex-row gap-2 mb-6">
                <InputField
                    label="Tên phòng"
                    value={roomName}
                    onChange={setRoomName}
                    errorMessage={errors.roomName}
                />
                <SelectField
                    label="Loại giường"
                    value={newBedType}
                    onChange={setNewBedType}
                    options={["", "single", "double", "queen"]}
                />
                <InputField
                    label="Kích thước phòng (m²)"
                    type="number"
                    value={newRoomSize}
                    onChange={setNewRoomSize}
                />
                <InputField
                    label="Giá phòng"
                    type="number"
                    value={newBedTypePrice}
                    onChange={setNewBedTypePrice}
                />
                <InputField
                    label="Số lượng phòng"
                    type="number"
                    value={newBedTypeQuantity}
                    onChange={setNewBedTypeQuantity}
                    errorMessage={errors.quantity}
                />
            </div>



            <div className="w-full sm:w-auto flex justify-start items-end bottom-0 mb-3">
                <button
                    type="button"
                    onClick={addBedTypeToRoom}
                    className="text-xl bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                    Thêm loại giường
                </button>
            </div>

            {bedTypes.length > 0 && (
                <RoomDetails
                    roomName={roomName}
                    bedTypes={bedTypes}
                    bedTypePrices={bedTypePrices}
                    bedTypeQuantities={bedTypeQuantities}
                    bedTypeRoomSizes={bedTypeRoomSizes}
                    facilities={facilities}
                />
            )}
            <FacilitiesList facilitiesList={facilitiesList} facilities={facilities} onChange={handleFacilityChange} />
            {/* Thêm FileUploader */}
                    <div className="mt-4">
                        <label className="block text-gray-700 mb-2">Tải ảnh phòng:</label>
                        <FileUploader

                            newImages={roomImages}
                            updateImages={(updatedExisting, updatedNew) => {
                                setRoomImages(updatedNew); // Cập nhật ảnh phòng
                            }}
                        />

                   </div>

            <div className="w-full sm:w-1/4 flex justify-start items-end bottom-0 mb-4 mt-4">
                <button
                    type="button"
                    onClick={editedRoomId ? saveEditedRoom : addRoomType}
                    className="w-full sm:w-auto text-xl bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                    {editedRoomId ? 'Lưu' : 'Thêm phòng'}
                </button>
            </div>

            <RoomTable roomTypes={roomTypes} onRemoveBedType={removeBedType} onEditRoomType={editRoomType} />
        </div>
    );
};



export default RoomTypeForm;
