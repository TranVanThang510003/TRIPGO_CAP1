import React, { useState } from "react";

const ImageModal = ({ images, roomTypeId,onClose, onUpdate }) => {
    const [editableImages, setEditableImages] = useState([...images]); // Danh sách ảnh hiện tại (URL)
    const [newImages, setNewImages] = useState([]); // Danh sách ảnh mới (File)

    // Thêm ảnh mới từ input
    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        setNewImages([...newImages, ...files]);
    };

    // Xóa ảnh hiện tại (URL)
    const handleDeleteExistingImage = (index) => {
        const updatedImages = editableImages.filter((_, i) => i !== index);
        setEditableImages(updatedImages);
    };

    // Xóa ảnh mới (File)
    const handleDeleteNewImage = (index) => {
        const updatedNewImages = newImages.filter((_, i) => i !== index);
        setNewImages(updatedNewImages);
    };

    // Lưu ảnh và đóng modal
    const handleSave = () => {
        const allImages = [...editableImages, ...newImages];
        onUpdate(allImages, roomTypeId); // Truyền roomTypeId về handleUpdateImages
        onClose();
    };



    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-[600px] w-full">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Quản lý ảnh</h2>

                {/* Danh sách ảnh hiện tại */}
                <div className="flex flex-wrap gap-4 mb-4">
                    {editableImages.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={`http://localhost:3000/${image}`}
                                alt={`Ảnh ${index + 1}`}
                                className="w-28 h-28 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => handleDeleteExistingImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-red-600"
                            >
                                &times;
                            </button>
                        </div>
                    ))}

                    {/* Danh sách ảnh mới */}
                    {newImages.map((file, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Ảnh mới ${index + 1}`}
                                className="w-28 h-28 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => handleDeleteNewImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-red-600"
                            >
                                &times;
                            </button>
                        </div>
                    ))}

                    {/* Thêm ảnh mới */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-28 h-28">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            multiple
                            onChange={handleAddImage}
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
