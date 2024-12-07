import { useState } from 'react';
import ErrorMessage from './ErrorMessage.jsx';
import useCreateHotelForm from './useCreateHotelForm';

const RoomTypeForm = () => {
    const { errors } = useCreateHotelForm();

    const [roomName, setRoomName] = useState('');
    const [bedTypes, setBedTypes] = useState([]);
    const [bedTypePrices, setBedTypePrices] = useState([]);
    const [bedTypeQuantities, setBedTypeQuantities] = useState([]); // Dùng để lưu số lượng theo từng loại giường
    const [price, setPrice] = useState('');
    const [newBedType, setNewBedType] = useState('');
    const [newBedTypePrice, setNewBedTypePrice] = useState('');
    const [newBedTypeQuantity, setNewBedTypeQuantity] = useState(''); // Số lượng phòng cho loại giường mới
    const [roomTypes, setRoomTypes] = useState([]);
    const [editedRoomId, setEditedRoomId] = useState(null);
    const addRoomType = () => {
        if (!roomName || !bedTypes.length || !bedTypeQuantities.length) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        setRoomTypes(prevRoomTypes => [
            ...prevRoomTypes,
            { id: prevRoomTypes.length + 1, name: roomName, bedTypes, bedTypePrices, bedTypeQuantities, price }
        ]);

        resetForm();
    };

    const addBedTypeToRoom = () => {
        if (!newBedType || !newBedTypePrice || !newBedTypeQuantity) {
            alert('Vui lòng nhập loại giường, giá và số lượng phòng!');
            return;
        }

        // Kiểm tra xem loại giường đã tồn tại chưa
        const bedTypeIndex = bedTypes.findIndex(bed => bed === newBedType);

        if (bedTypeIndex !== -1) {
            // Nếu loại giường đã tồn tại, cập nhật giá và số lượng phòng
            const updatedBedTypePrices = [...bedTypePrices];
            const updatedBedTypeQuantities = [...bedTypeQuantities];

            updatedBedTypePrices[bedTypeIndex] = newBedTypePrice;
            updatedBedTypeQuantities[bedTypeIndex] = newBedTypeQuantity;

            setBedTypePrices(updatedBedTypePrices);
            setBedTypeQuantities(updatedBedTypeQuantities);
        } else {
            // Nếu loại giường chưa tồn tại, thêm mới
            setBedTypes(prevBedTypes => [...prevBedTypes, newBedType]);
            setBedTypePrices(prevPrices => [...prevPrices, newBedTypePrice]);
            setBedTypeQuantities(prevQuantities => [...prevQuantities, newBedTypeQuantity]);
        }

        setNewBedType('');
        setNewBedTypePrice('');
        setNewBedTypeQuantity('');
    };

    const removeRoomType = (id) => {
        setRoomTypes(prevRoomTypes => prevRoomTypes.filter(room => room.id !== id));
    };

    const removeBedType = (roomId, bedType) => {
        setRoomTypes((prevRoomTypes) => {
            return prevRoomTypes.map((room) => {
                if (room.id === roomId) {
                    // Filter out the bed type and its price/quantity
                    const filteredBedTypes = room.bedTypes.filter(bed => bed !== bedType);
                    const filteredBedTypePrices = room.bedTypePrices.filter((price, index) => index !== room.bedTypes.indexOf(bedType));
                    const filteredBedTypeQuantities = room.bedTypeQuantities.filter((quantity, index) => index !== room.bedTypes.indexOf(bedType));

                    return {
                        ...room,
                        bedTypes: filteredBedTypes,
                        bedTypePrices: filteredBedTypePrices,
                        bedTypeQuantities: filteredBedTypeQuantities
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
            setPrice(room.price);
            setEditedRoomId(room.id);
        }
    };
    const saveEditedRoom = () => {
        if (!roomName || !bedTypes.length || !bedTypeQuantities.length) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        setRoomTypes(prevRoomTypes =>
            prevRoomTypes.map(room =>
                room.id === editedRoomId ?
                    {
                        ...room,
                        name: roomName,
                        bedTypes,
                        bedTypePrices,
                        bedTypeQuantities,
                        price
                    } : room
            )
        );

        resetForm();
        setEditedRoomId(null);
    };


    const resetForm = () => {
        setRoomName('');
        setBedTypes([]);
        setBedTypePrices([]);
        setBedTypeQuantities([]);
        setPrice('');
    };

    return (
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Quản lý loại phòng</h3>

            <div className="flex flex-row gap-2 mb-6">
                <div className="w-full sm:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên phòng</label>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="Tên phòng"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <ErrorMessage message={errors.roomName}/>
                </div>

                <div className="w-full sm:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loại giường</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <select
                            value={newBedType}
                            onChange={(e) => setNewBedType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="">Chọn loại giường</option>
                            <option value="single">Single</option>
                            <option value="double">Double</option>
                            <option value="queen">Queen</option>
                        </select>
                    </div>
                </div>

                <div className="w-full sm:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá phòng theo loại giường</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <input
                            type="number"
                            value={newBedTypePrice}
                            onChange={(e) => setNewBedTypePrice(e.target.value)}
                            placeholder="Giá phòng"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng phòng</label>
                    <input
                        type="number"
                        value={newBedTypeQuantity}
                        onChange={(e) => setNewBedTypeQuantity(e.target.value)}
                        placeholder="Số lượng phòng"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <ErrorMessage message={errors.quantity}/>
                </div>
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
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-4 mb-4">
                    {/* Hiển thị tên phòng */}
                    <h4 className="text-lg font-semibold text-blue-600 mb-2">Tên phòng: <span
                        className="font-normal text-gray-700">{roomName}</span></h4>

                    {/* Hiển thị loại giường đã chọn và giá tương ứng */}
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Loại giường đã chọn:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                        {bedTypes.map((bedType, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{bedType}</span>
                                <span className="text-green-600">{bedTypePrices[index]} VND</span>
                                <span
                                    className="text-gray-500">Số lượng: {bedTypeQuantities[index]}</span> {/* Hiển thị số lượng phòng */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <ErrorMessage message={errors.bedType}/>

            <div className="w-full sm:w-1/4 flex justify-start items-end bottom-0 mb-4">
                <button
                    type="button"
                    onClick={editedRoomId ? saveEditedRoom : addRoomType}
                    className="w-full sm:w-auto text-xl bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                    {editedRoomId ? 'Lưu' : 'Thêm'}
                </button>
            </div>


            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border p-3 text-left text-sm font-semibold text-gray-600">Tên phòng</th>
                    <th className="border p-3 text-left text-sm font-semibold text-gray-600">Loại giường</th>
                    <th className="border p-3 text-left text-sm font-semibold text-gray-600">Giá</th>
                    <th className="border p-3 text-left text-sm font-semibold text-gray-600">Số lượng</th>
                    <th className="border p-3 text-center text-sm font-semibold text-gray-600">Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {roomTypes.length > 0 ? roomTypes.map((room) => (
                    room.bedTypes.length > 0 ? room.bedTypes.map((bedType, index) => (
                        <tr key={`${room.id}-${index}`} className="hover:bg-gray-100 transition duration-150">
                            <td className="border p-3 text-gray-700 text-sm">{room.name}</td>
                            <td className="border p-3 text-gray-700 text-sm">{bedType || 'Chưa có loại giường'}</td>
                            <td className="border p-3 text-gray-700 text-sm">
                                {room.bedTypePrices[index] || 'Chưa có giá'}
                            </td>
                            <td className="border p-3 text-gray-700 text-sm">
                                {room.bedTypeQuantities[index] || 'Chưa có số lượng'}
                            </td>
                            <td className="border p-3 text-center">
                                <button
                                    type="button"
                                    onClick={() => removeBedType(room.id, bedType)}
                                    className="text-red-500 hover:underline mx-2"
                                >
                                    Xóa
                                </button>

                                <button
                                    type="button"
                                    onClick={() => editRoomType(room.id)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr key={room.id} className="hover:bg-gray-100 transition duration-150">
                            <td colSpan="5" className="text-center text-gray-700">Chưa có phòng được thêm</td>
                        </tr>
                    )
                )) : (
                    <tr>
                        <td colSpan="5" className="text-center text-gray-700">Chưa có loại phòng nào!</td>
                    </tr>
                )}

                </tbody>
            </table>

        </div>
    );
};

export default RoomTypeForm;
