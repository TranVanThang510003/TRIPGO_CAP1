import React from "react";
import ActionButtons from "./ActionButtons";

const RoomTable = ({ rooms, onViewImages, onEdit ,onDelete}) => {
    return (
        <div className="overflow-auto rounded-lg shadow-lg">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                    <th className="p-4 text-left text-sm font-medium text-gray-700 uppercase">
                        Tên phòng
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700 uppercase">
                        Loại giường
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700 uppercase">
                        Kích thước
                    </th>

                    <th className="p-4 text-left text-sm font-medium text-gray-700 uppercase">
                        Giá
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700 uppercase">
                        Số lượng
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700 uppercase">
                        Thao tác
                    </th>
                </tr>
                </thead>
                <tbody>
                {rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <tr key={index} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                            <td className="p-4 border-b text-gray-700">{room.roomName}</td>
                            <td className="p-4 border-b text-gray-700">{room.bedType}</td>
                            <td className="p-4 border-b text-gray-700">{room.roomSize} m²</td>

                            <td className="p-4 border-b text-gray-700">{room.price} VND</td>
                            <td className="p-4 border-b text-gray-700">{room.quantity}</td>
                            <td className="p-4 border-b text-gray-700">
                                <ActionButtons
                                    roomName={room.roomName}
                                    bedType={room.bedType}  // Truyền bedType
                                    images={room.images}
                                    onViewImages={onViewImages}
                                    onEdit={() => onEdit(room.roomName, room.bedTypeId)}

                                    onDelete={() =>
                                        onDelete(room.roomName, room.bedType, room.roomTypeId)
                                    }
                                />

                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center p-4 text-gray-500">
                            Không có phòng nào.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default RoomTable;
