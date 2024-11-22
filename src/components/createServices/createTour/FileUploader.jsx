import { useState } from 'react';

const FileUploader = ({
  IMAGE,
  setIMAGE,
  setNewImages,
  existingImages = [],
}) => {
  const [newPreviews, setNewPreviews] = useState([]); // Danh sách ảnh mới
  const [localExistingImages, setLocalExistingImages] = useState([
    ...existingImages,
  ]); // Danh sách ảnh cũ

  // Xử lý khi chọn ảnh mới
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setNewPreviews((prev) => [...prev, ...filePreviews]); // Cập nhật ảnh mới
    setIMAGE((prev) => [...prev, ...localExistingImages, ...files]); // Gộp cả ảnh cũ và file mới
  };

  // Xóa ảnh cũ
  const handleRemoveExistingImage = (index) => {
    const updatedExistingImages = localExistingImages.filter(
      (_, i) => i !== index
    );
    setLocalExistingImages(updatedExistingImages); // Cập nhật danh sách hiển thị ảnh cũ

    const updatedIMAGE = [
      ...updatedExistingImages,
      ...newPreviews.map((p) => p.file),
    ];
    setIMAGE(updatedIMAGE); // Cập nhật mảng `IMAGE` chung

    // Đánh dấu ảnh này là bị xóa, ví dụ: thay vì xóa hẳn ảnh cũ, bạn đánh dấu nó
    const imageToDelete = localExistingImages[index];
    setNewImages((prev) => prev.filter((img) => img !== imageToDelete));
  };

  // Xóa ảnh mới
  const handleRemoveNewImage = (index) => {
    const updatedPreviews = newPreviews.filter((_, i) => i !== index);
    const updatedFiles = updatedPreviews.map((p) => p.file);

    const updatedIMAGE = [...localExistingImages, ...updatedFiles]; // Kết hợp ảnh cũ và file mới
    setNewPreviews(updatedPreviews); // Cập nhật danh sách xem trước
    setIMAGE(updatedIMAGE); // Cập nhật mảng `IMAGE` chung

    // Đánh dấu ảnh này là bị xóa, thay vì xóa trực tiếp khỏi mảng
    const imageToDelete = newPreviews[index].file;
    setNewImages(newImages.filter((img) => img !== imageToDelete));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <div className="grid grid-cols-3 gap-4 mt-4">
          {localExistingImages.map((imgUrl, index) => (
            <div key={index} className="relative">
              <img
                src={`http://localhost:3000/${imgUrl}`} // Đường dẫn ảnh cũ từ server
                alt={`Existing Image ${index}`}
                className="w-full h-auto rounded-md border"
              />
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hiển thị ảnh mới */}
      {newPreviews.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {newPreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview.previewUrl}
                alt={`New Image ${index}`}
                className="w-full h-auto rounded-md border"
              />
              <button
                type="button"
                onClick={() => handleRemoveNewImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
