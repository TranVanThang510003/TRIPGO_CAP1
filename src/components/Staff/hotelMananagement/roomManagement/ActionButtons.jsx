import React from "react";
import { Icon } from "@iconify/react";

const ActionButtons = ({ roomName, bedTypeId, images, onViewImages, onEdit, onDelete }) => {
    return (
        <div className="flex gap-2">
            {/* Nút Xem Ảnh */}
            <button
                onClick={() => onViewImages(roomName, images)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-200"
            >
                <Icon icon="line-md:image-filled" width="24" height="24" />
            </button>

            {/* Nút Sửa */}
            <button
                onClick={() => onEdit(roomName, bedTypeId)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200"
            >
                <Icon icon="line-md:edit-filled" width="24" height="24" />
            </button>

            {/* Nút Xóa */}
            <button
                onClick={() => onDelete(roomName, bedType)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
            >
                <Icon icon="ic:baseline-delete" width="24" height="24" />
            </button>
        </div>
    );
};

export default ActionButtons;
