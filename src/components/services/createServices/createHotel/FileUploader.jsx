import { useState, useEffect } from 'react';

const FileUploader = ({
                        existingImages = [], // URL của ảnh cũ
                        newImages = [],      // File ảnh mới
                        updateImages,        // Hàm cập nhật ảnh
                      }) => {
  const [localExistingImages, setLocalExistingImages] = useState([]); // Ảnh cũ trong state
  const [newPreviews, setNewPreviews] = useState([]);                // Preview ảnh mới

  // Cập nhật state khi prop thay đổi
  useEffect(() => {
    if (JSON.stringify(localExistingImages) !== JSON.stringify(existingImages)) {
      setLocalExistingImages(existingImages); // Đồng bộ ảnh cũ
    }

    const updatedPreviews = newImages.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    if (
        JSON.stringify(newPreviews.map((p) => p.file)) !== JSON.stringify(newImages)
    ) {
      setNewPreviews(updatedPreviews); // Đồng bộ preview ảnh mới
    }
  }, [existingImages, newImages]);

  // Xóa ảnh cũ
  const handleRemoveExistingImage = (imgUrl) => {
    const updatedExistingImages = localExistingImages.filter((url) => url !== imgUrl);
    setLocalExistingImages(updatedExistingImages);
    updateImages(updatedExistingImages, newPreviews.map((p) => p.file));
  };

  // Xóa ảnh mới
  const handleRemoveNewImage = (index) => {
    const updatedPreviews = newPreviews.filter((_, i) => i !== index);
    setNewPreviews(updatedPreviews);
    updateImages(localExistingImages, updatedPreviews.map((p) => p.file));
  };

  // Xử lý khi chọn file
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Lấy danh sách file từ input
    const filePreviews = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...newPreviews, ...filePreviews];
    setNewPreviews(updatedPreviews);

    updateImages(localExistingImages, updatedPreviews.map((p) => p.file));
  };

  return (
      <div className="file-uploader">
        {/* Input upload file */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tải lên hình ảnh
        </label>
        <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
        />

        {/* Hiển thị ảnh cũ */}
        {localExistingImages.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {localExistingImages.map((imgUrl, index) => (
                  <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden shadow-md border hover:shadow-lg transition-transform duration-300"
                  >
                    <img
                        src={`http://localhost:3000/${imgUrl}`}
                        alt={`Existing Image ${index}`}
                        className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(imgUrl)}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      ✖
                    </button>
                  </div>
              ))}
            </div>
        )}

        {/* Hiển thị preview ảnh mới */}
        {newPreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {newPreviews.map((preview, index) => (
                  <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden shadow-md border hover:shadow-lg transition-transform duration-300"
                  >
                    <img
                        src={preview.previewUrl}
                        alt={`New Image ${index}`}
                        className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveNewImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      ✖
                    </button>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default FileUploader;
