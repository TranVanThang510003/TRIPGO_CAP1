/* eslint-disable react/prop-types */
const baseURL = 'http://localhost:3000/'; // Đường dẫn cơ sở

const ImageGallery = ({ images }) => {
  // Kiểm tra điều kiện để tránh lỗi nếu `images` là rỗng hoặc không hợp lệ
  if (!images || images.length === 0) return null;

  // Nhân bản hình ảnh nếu có ít hơn 4 hình
  while (images.length < 4) {
    images.push(images[1]); // Nhân bản hình thứ 2 nếu không đủ
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      {/* Hình lớn */}
      <div className="w-full md:w-3/4">
        <img
          src={`${baseURL}${images[0]}`} // Sử dụng URL đầy đủ cho hình lớn
          alt="Main view of the tour"
          className="w-full h-[470px] object-cover rounded-md"
        />
      </div>
      {/* Hình nhỏ */}
      <div className="flex flex-col w-1/4">
        {images.slice(1, 4).map((image, index) => ( // Chỉ lấy 3 hình nhỏ
          <div key={index} className="relative mb-2 h-[151px]">
            <img
              src={`${baseURL}${image}`} // Sử dụng URL đầy đủ cho các hình nhỏ
              alt={`Thumbnail view ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
