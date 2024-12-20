const RoomDetails = ({
                         roomName,
                         bedTypes,
                         bedTypePrices,
                         bedTypeQuantities,
                         bedTypeRoomSizes,
                         facilities // Thêm prop facilities
                     }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-4 mb-4">
        <h4 className="text-lg font-semibold text-blue-600 mb-2">
            Tên phòng: <span className="font-normal text-gray-700">{roomName}</span>
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            {bedTypes.map((bedType, index) => (
                <li key={index} className="flex justify-between items-center">
                    <span>{bedType}</span>
                    <span className="text-green-600">{bedTypePrices[index]} VND</span>
                    <span className="text-gray-500">Kích thước: {bedTypeRoomSizes[index]} m²</span>
                    <span className="text-gray-500">Số lượng: {bedTypeQuantities[index]}</span>
                </li>
            ))}
        </ul>

        {/* Hiển thị tiện ích của phòng */}
        {facilities && facilities.length > 0 && (
            <div className="mt-4">
                <h4 className="text-md font-semibold text-blue-600 mb-2">Tiện ích phòng:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);
export default RoomDetails;