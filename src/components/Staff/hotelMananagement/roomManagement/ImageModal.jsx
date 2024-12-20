import React, { useState } from "react";

const ImageModal = ({ images, onClose, onUpdate }) => {
    const [editableImages, setEditableImages] = useState([...images]);
    const [newImage, setNewImage] = useState(null);

    // Thêm ảnh mới
    const handleAddImage = () => {
        if (newImage) {
            setEditableImages([...editableImages, newImage]);
            setNewImage(null);
        }
    };

    // Xóa ảnh
    const handleDeleteImage = (index) => {
        const updatedImages = editableImages.filter((_, i) => i !== index);
        setEditableImages(updatedImages);
    };

    const handleSave = () => {
        onUpdate(editableImages);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-[600px] w-full">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Danh sách ảnh</h2>

                {/* Danh sách ảnh */}
                <div className="flex flex-wrap gap-4 mb-4">
                    {editableImages.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={`http://localhost:3000/${image}`}
                                alt={`Ảnh ${index + 1}`}
                                className="w-28 h-28 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => handleDeleteImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-red-600"
                            >
                                &times;
                            </button>
                        </div>
                    ))}

                    {/* Chọn ảnh mới */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-28 h-28">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            onChange={(e) => setNewImage(URL.createObjectURL(e.target.files[0]))}
                        />
                        <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-blue-500"
                        >
                            <span className="text-2xl">+</span>
                            <span className="text-sm">Thêm ảnh</span>
                        </label>
                    </div>
                </div>

                {/* Nút lưu và hủy */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
