import { useState } from "react";

const FileUploader = ({ IMAGE, setIMAGE, existingImages = [] }) => {
  const [preview, setPreview] = useState(null); // Để hiển thị ảnh xem trước

  // Hàm xử lý khi chọn ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIMAGE(file);
      // Tạo đường dẫn xem trước cho ảnh đã chọn
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Tải lên hình ảnh</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
      />

      {/* Hiển thị ảnh hiện có từ server */}
      {existingImages && existingImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
          {existingImages.map((imgUrl, index) => (
            <div key={index} className="relative">
              <img
                src={`http://localhost:3000/${imgUrl}`} // Đường dẫn ảnh từ server
                alt={`Existing Image ${index + 1}`}
                className="w-full h-auto rounded-md border"
              />
            </div>
          ))}
        </div>
      )}

      {/* Hiển thị ảnh xem trước nếu người dùng chọn ảnh mới */}
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-64 object-contain border rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
