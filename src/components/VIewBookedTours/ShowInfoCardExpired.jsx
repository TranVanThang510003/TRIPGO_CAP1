/* eslint-disable react/prop-types */
const ShowInfoCardExpired = ({ tour, onClose }) => {
    return (
      <div>
        <h1 className="font-bold text-3xl">Thông tin tour đã hết hạn</h1>
        <div className="p-5 border rounded-lg bg-white shadow-md">
        
        <h2 className="text-2xl font-bold text-blue-900">{tour.name}</h2>
        <img
          src={tour.imageUrl}
          alt={tour.name}
          className="w-full h-[300px] object-cover rounded-lg mt-4"
        />
        <p className="text-gray-700 mt-4">{tour.location}</p>
        <p className="text-gray-500 mt-2">
         {tour.priceAdult}/Người
        </p>
        <p className="text-gray-600 mt-2">{tour.averageRating} ★ ({tour.reviewCount} đánh giá)</p>
        <div className="flex mt-2">
        <p>Ngày khới hành</p>
        <p className="ml-5">21/11/2024</p>
        </div>
        <p className="mt-2">Đã hết hạn</p>
        <button
          onClick={onClose} // Gọi hàm quay lại danh sách
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Quay lại
        </button>
      </div>
      </div>
    );
  };
  
  export default ShowInfoCardExpired;
  