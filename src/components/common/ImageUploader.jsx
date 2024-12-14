import React from 'react';

const ImageUploader = ({ images, setImages }) => {
    const MAX_IMAGES = 10;

    // Hàm xử lý thay đổi ảnh được chọn
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Chuyển đổi tệp thành mảng

        // Kiểm tra xem có quá 10 ảnh không
        if (files.length + images.length > MAX_IMAGES) {
            alert(`Bạn chỉ được chọn tối đa ${MAX_IMAGES} ảnh.`);
            return;
        }

        // Cập nhật danh sách ảnh đã chọn
        setImages([...images, ...files]);
    };

    // Hàm xử lý xoá ảnh đã chọn
    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    return (
        <div className="mt-4">
            <label className="block text-lg font-semibold mb-4 text-gray-700">Chọn ảnh để tải lên:</label>

            {/* Phần chứa ảnh đã chọn và vùng chọn ảnh */}
            <div className="flex items-start gap-4">
                {/* Hiển thị ảnh đã chọn */}
                <div className="flex flex-wrap gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative group w-32 h-32 border border-gray-300 rounded-lg overflow-hidden"
                        >
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 text-3xl  text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                {/* Vùng chọn ảnh */}
                <div className="relative w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-100">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <p className="text-sm text-gray-500 mt-2">Thêm ảnh</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
