import React, { useState, useEffect } from "react";

const RoomBedForm = ({ bed, existingBeds, onSave, onCancel }) => {
    const [bedTypeId, setBedTypeId] = useState(bed?.bedTypeId || ""); // ID loại giường
    const [roomSize, setRoomSize] = useState(bed?.roomSize || "");
    const [price, setPrice] = useState(bed?.price || "");
    const [quantity, setQuantity] = useState(bed?.quantity || "");
    const [error, setError] = useState("");

    // Các lựa chọn loại giường với ID và tên
    const bedTypeOptions = [
        { label: "Single", value: 1 }, // ID = 1
        { label: "Double", value: 2 }, // ID = 2
        { label: "Queen", value: 3 },  // ID = 3
    ];
    console.log("Dữ liệu bed truyền vào:", bed);
    console.log("bedTypeId từ bed:", bed?.bedTypeId);
    console.log("bedTypeOptions:", bedTypeOptions);

    useEffect(() => {
        if (bed) {
            setBedTypeId(bed?.bedTypeId || ""); // Gán giá trị ID loại giường hiện tại
            setRoomSize(bed?.roomSize || "");
            setPrice(bed?.price || "");
            setQuantity(bed?.quantity || "");
        }
    }, [bed]);


    const handleSubmit = () => {
        setError("");

        // Chuyển đổi giá trị thành số
        const updatedBed = {
            bedTypeId: Number(bedTypeId),
            roomSize: Number(roomSize),
            price: Number(price),
            quantity: Number(quantity),
        };

        // Kiểm tra nếu không chọn loại giường mới
        if (!bedTypeId) {
            setError("Vui lòng chọn loại giường!");
            return;
        }

        console.log("Dữ liệu gửi đi:", updatedBed);

        // Kiểm tra trùng loại giường nếu loại giường mới khác loại giường cũ
        if (Number(bedTypeId) !== Number(bed.bedTypeId)) {
            const duplicate = existingBeds.some(
                (existingBed) =>
                    existingBed.bedTypeId === updatedBed.bedTypeId &&
                    existingBed.roomName === bed.roomName
            );

            if (duplicate) {
                setError("Loại giường này đã tồn tại trong phòng.");
                return;
            }
        }

        console.log("Dữ liệu gửi đi trước khi lưu:", updatedBed);
        onSave(updatedBed);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Sửa thông tin phòng</h2>

            {/* Thông báo lỗi */}
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

            <div className="mb-3 text-gray-700">
                <p>
                    <strong>Loại giường hiện tại:</strong>{" "}
                    {bedTypeOptions.find((b) => Number(b.value) === Number(bed?.bedTypeId))?.label || "Chưa có"}
                </p>
            </div>


            {/* Loại giường */}
            <label className="block mb-3">
                Loại giường mới:
                <select
                    value={bedTypeId}
                    onChange={(e) => setBedTypeId(Number(e.target.value))}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Chọn loại giường</option>
                    {bedTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>


            </label>

            {/* Kích thước phòng */}
            <label className="block mb-3">
                Kích thước phòng (m²):
                <input
                    type="number"
                    value={roomSize}
                    onChange={(e) => setRoomSize(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {/* Giá */}
            <label className="block mb-3">
                Giá:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {/* Số lượng */}
            <label className="block mb-3">
                Số lượng :
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {/* Nút lưu và hủy */}
            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={onCancel}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
                >
                    Hủy
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default RoomBedForm;
