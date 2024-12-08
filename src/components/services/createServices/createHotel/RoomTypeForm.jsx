import { useState } from 'react';
import ErrorMessage from './ErrorMessage.jsx';

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
                          errors,
                      }) => {
    const facilitiesList = [
        "Thang máy", "Máy lạnh", "Bể bơi", "Gym", "TV", "Tủ lạnh", "Máy sấy tóc", "Minibar", "két bảo hiểm"
    ];

    const [editedRoomId, setEditedRoomId] = useState(null);

    const resetForm = () => {
        setRoomName('');
        setBedTypes([]);
        setBedTypePrices([]);
        setBedTypeQuantities([]);
        setRoomSize('');
        setFacilities([]);
        setNewBedType('');
        setNewBedTypePrice('');
        setNewBedTypeQuantity('');
    };

    const validateForm = () => {
        if (!roomName || !bedTypes.length || !bedTypeQuantities.length || !roomSize || !facilities.length) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return false;
        }
        return true;
    };

    const addRoomType = () => {
        if (!validateForm()) return;

        setRoomTypes(prevRoomTypes => [
            ...prevRoomTypes,
            { id: prevRoomTypes.length + 1, name: roomName, bedTypes, bedTypePrices, bedTypeQuantities, roomSize, facilities }
        ]);

        resetForm();
    };

    const addBedTypeToRoom = () => {
        if (!newBedType || !newBedTypePrice || !newBedTypeQuantity) {
            alert('Vui lòng nhập loại giường, giá và số lượng phòng!');
            return;
        }

        const bedTypeIndex = bedTypes.indexOf(newBedType);
        const updateState = (index) => {
            const updatedBedTypePrices = [...bedTypePrices];
            const updatedBedTypeQuantities = [...bedTypeQuantities];
            updatedBedTypePrices[index] = newBedTypePrice;
            updatedBedTypeQuantities[index] = newBedTypeQuantity;
            setBedTypePrices(updatedBedTypePrices);
            setBedTypeQuantities(updatedBedTypeQuantities);
        };

        if (bedTypeIndex !== -1) {
            updateState(bedTypeIndex);
        } else {
            setBedTypes(prev => [...prev, newBedType]);
            setBedTypePrices(prev => [...prev, newBedTypePrice]);
            setBedTypeQuantities(prev => [...prev, newBedTypeQuantity]);
        }
    };

    const removeRoomType = (id) => {
        setRoomTypes(prevRoomTypes => prevRoomTypes.filter(room => room.id !== id));
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
            setRoomSize(room.roomSize);
            setFacilities(room.facilities);
            setEditedRoomId(room.id);
        }
    };

    const saveEditedRoom = () => {
        if (!validateForm()) return;

        setRoomTypes(prevRoomTypes =>
            prevRoomTypes.map(room =>
                room.id === editedRoomId ?
                    { ...room, name: roomName, bedTypes, bedTypePrices, bedTypeQuantities, roomSize, facilities } : room
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
                    value={roomSize}
                    onChange={setRoomSize}
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

            <FacilitiesList facilitiesList={facilitiesList} facilities={facilities} onChange={handleFacilityChange} />

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
                    roomSize={roomSize}
                    bedTypeQuantities={bedTypeQuantities}
                />
            )}

            <div className="w-full sm:w-1/4 flex justify-start items-end bottom-0 mb-4">
                <button
                    type="button"
                    onClick={editedRoomId ? saveEditedRoom : addRoomType}
                    className="w-full sm:w-auto text-xl bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                    {editedRoomId ? 'Lưu' : 'Thêm'}
                </button>
            </div>

            <RoomTable roomTypes={roomTypes} onRemoveBedType={removeBedType} onEditRoomType={editRoomType} />
        </div>
    );
};

const InputField = ({ label, value, onChange, type = "text", errorMessage }) => (
    <div className="w-full sm:w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
);

const SelectField = ({ label, value, onChange, options }) => (
    <div className="w-full sm:w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        >
            {options.map(option => <option key={option} value={option}>{option || "Chọn loại giường"}</option>)}
        </select>
    </div>
);

const FacilitiesList = ({ facilitiesList, facilities, onChange }) => (
    <div className="w-full sm:w-1/2 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Chọn tiện nghi</label>
        <div className="flex flex-wrap gap-2">
            {facilitiesList.map(facility => (
                <div key={facility} className="flex items-center">
                    <input
                        type="checkbox"
                        value={facility}
                        checked={facilities.includes(facility)}
                        onChange={onChange}
                        className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">{facility}</label>
                </div>
            ))}
        </div>
    </div>
);

const RoomDetails = ({ roomName, bedTypes, bedTypePrices, roomSize, bedTypeQuantities }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-4 mb-4">
        <h4 className="text-lg font-semibold text-blue-600 mb-2">Tên phòng: <span className="font-normal text-gray-700">{roomName}</span></h4>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Loại giường đã chọn:</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            {bedTypes.map((bedType, index) => (
                <li key={index} className="flex justify-between items-center">
                    <span>{bedType}</span>
                    <span className="text-green-600">{bedTypePrices[index]} VND</span>
                    <span className="text-gray-500">kích thước: {roomSize} m²</span>
                    <span className="text-gray-500">Số lượng: {bedTypeQuantities[index]}</span>
                </li>
            ))}
        </ul>
    </div>
);

const RoomTable = ({ roomTypes, onRemoveBedType, onEditRoomType }) => (
    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
        <tr>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">Tên phòng</th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">Loại giường</th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">Kích thước phòng</th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">Tiện nghi</th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">Giá</th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">Số lượng</th>
            <th className="border p-3 text-center text-sm font-semibold text-gray-600">Thao tác</th>
        </tr>
        </thead>
        <tbody>
        {roomTypes.length > 0 ? roomTypes.map(room => (
            room.bedTypes.length > 0 ? room.bedTypes.map((bedType, index) => (
                <tr key={`${room.id}-${index}`} className="hover:bg-gray-100 transition duration-150">
                    <td className="border p-3 text-gray-700 text-sm">{room.name}</td>
                    <td className="border p-3 text-gray-700 text-sm">{bedType || 'Chưa có loại giường'}</td>
                    <td className="border p-3 text-gray-700 text-sm">{room.roomSize || 'Chưa có kích thước'} m²</td>
                    <td className="border p-3 text-gray-700 text-sm">{room.facilities.length > 0 ? room.facilities.join(', ') : 'Chưa có tiện nghi'}</td>
                    <td className="border p-3 text-gray-700 text-sm">{room.bedTypePrices[index] || 'Chưa có giá'}</td>
                    <td className="border p-3 text-gray-700 text-sm">{room.bedTypeQuantities[index] || 'Chưa có số lượng'}</td>
                    <td className="border p-3 text-center">
                        <button type="button" onClick={() => onRemoveBedType(room.id, bedType)} className="text-red-500 hover:underline mx-2">Xóa</button>
                        <button type="button" onClick={() => onEditRoomType(room.id)} className="text-blue-500 hover:underline">Sửa</button>
                    </td>
                </tr>
            )) : (
                <tr key={room.id} className="hover:bg-gray-100 transition duration-150">
                    <td colSpan="7" className="text-center text-gray-700">Chưa có phòng được thêm</td>
                </tr>
            )
        )) : (
            <tr>
                <td colSpan="7" className="text-center text-gray-700">Chưa có loại phòng nào!</td>
            </tr>
        )}
        </tbody>
    </table>
);

export default RoomTypeForm;
