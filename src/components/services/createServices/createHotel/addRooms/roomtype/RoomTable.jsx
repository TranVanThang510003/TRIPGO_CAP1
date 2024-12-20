const RoomTable = ({ roomTypes, onRemoveBedType, onEditRoomType }) => (
    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
        <tr>
            <th className="p-3 text-sm font-semibold text-gray-600">Tên phòng</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Loại giường</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Kích thước (m²)</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Tiện nghi</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Giá (VND)</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Số lượng</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Ảnh phòng</th>
            <th className="p-3 text-sm font-semibold text-gray-600">Thao tác</th>
        </tr>
        </thead>
        <tbody>
        {roomTypes.map((room) =>
            room.bedTypes.map((bedType, index) => (
                <tr key={`${room.id}-${index}`} className="hover:bg-gray-50 transition">
                    {/* Tên phòng chỉ hiển thị 1 lần với rowspan */}
                    {index === 0 && (
                        <td rowSpan={room.bedTypes.length} className="p-3 border text-gray-700 align-middle">
                            {room.name}
                        </td>
                    )}

                    {/* Thông tin loại giường */}
                    <td className="p-3 border text-gray-700">{bedType}</td>
                    <td className="p-3 border text-gray-700">{room.bedTypeRoomSizes[index]} m²</td>

                    {/* Tiện nghi chung của phòng */}
                    {index === 0 && (
                        <td rowSpan={room.bedTypes.length} className="p-3 border text-gray-700 align-middle">
                            {room.facilities && room.facilities.length > 0
                                ? room.facilities.join(', ')
                                : "Không có"}
                        </td>
                    )}

                    {/* Giá và số lượng */}
                    <td className="p-3 border text-gray-700">{room.bedTypePrices[index]}</td>
                    <td className="p-3 border text-gray-700">{room.bedTypeQuantities[index]}</td>

                    {/* Ảnh phòng */}
                    {index === 0 && (
                        <td rowSpan={room.bedTypes.length} className="p-3 border text-gray-700 align-middle">
                            {room.images && room.images.length > 0 ? (
                                <div className="flex space-x-2">
                                    {room.images.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={URL.createObjectURL(image)}
                                            alt={`Room ${room.name} Image ${imgIndex}`}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <span>Không có ảnh</span>
                            )}
                        </td>
                    )}

                    {/* Thao tác */}
                    <td className="p-3 border text-gray-700 text-center">
                        <button
                            onClick={() => onRemoveBedType(room.id, bedType)}
                            className="text-red-500 hover:underline"
                        >
                            Xóa
                        </button>
                        <button
                            onClick={() => onEditRoomType(room.id)}
                            className="text-blue-500 hover:underline ml-2"
                        >
                            Sửa
                        </button>
                    </td>
                </tr>
            ))
        )}
        </tbody>
    </table>
);

export default RoomTable;
