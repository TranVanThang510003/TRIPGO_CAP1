// src/components/common/ImageGallery.js
const ImageGallery = ({ images }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      {/* Large image */}
      <div className="w-full md:w-2/3">
        <img
          src={images[0]} // Chắc chắn rằng đây là đường dẫn đúng đến ảnh
          alt="Khách sạn chính"
          className="w-full h-[470px] object-cover rounded-md"
        />
      </div>
      {/* Small images */}
      <div className="flex flex-col w-1/3">
        {images.slice(1).map((image, index) => (
          <div key={index} className="relative mb-2 h-[151px]">
            <img
              src={image}
              alt={`Khách sạn nhỏ ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Định nghĩa propTypes để kiểm tra loại dữ liệu
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageGallery;
