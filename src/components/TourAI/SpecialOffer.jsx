import { useState } from "react";

const SpecialOffer = () => {
  // Tạo state là một mảng để lưu trạng thái của từng card
  const [favorites, setFavorites] = useState([false, false, false]); // Mảng với 3 giá trị tương ứng 3 cards

  // Hàm để toggle trạng thái của một card cụ thể
  const toggleFavorite = (index) => {
    // Sao chép mảng favorites hiện tại
    const newFavorites = [...favorites];
    // Đổi trạng thái của card tương ứng
    newFavorites[index] = !newFavorites[index];
    // Cập nhật lại state
    setFavorites(newFavorites);
  };

  return (
    <div className="flex flex-col items-center py-8 bg-gray-50 mt-[100px]">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Ưu đãi đặc biệt</h1>

      {/* Tabs lựa chọn */}
      <div className="flex space-x-4 mb-8 border border-blue-200 rounded-md">
        <button className="px-4 py-2 hover:bg-blue-700 text-gray-700 rounded-md">
          Cá Nhân
        </button>
        <button className="px-4 py-2 hover:bg-blue-700 text-gray-700 rounded-md">
          Cặp đôi
        </button>
        <button className="px-4 py-2 hover:bg-blue-700 text-gray-700 rounded-md">
          Nhóm
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-12">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs relative"
          >
            <div className="relative">
              <img
                src="https://bcp.cdnchinhphu.vn/Uploaded_VGP/phamvanthua/20190725/0052583f41011fc2c2f516e5b4b693ec%20(1).jpg"
                alt="Tour Bà Nà Hills"
                className="w-full h-56 object-cover"
              />
              {/* Nút trái tim */}
              <button
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
                onClick={() => toggleFavorite(index)} 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={favorites[index] ? "#ff6b6b" : "white"} 
                  viewBox="0 0 24 24"
                  stroke="#ff6b6b" 
                >
                  <path
                    fillRule="evenodd"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="flex justify-between items-center p-4">
              <span className="bg-pink-200 text-pink-600 px-2 py-1 rounded text-sm">
                Relax
              </span>
              <span className="text-gray-500 text-sm">1 day</span>
            </div>

            <div className="px-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Tour Bà Nà Hills
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                <span className="inline-block mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline"
                    viewBox="0 0 24 24"
                    fill="#ff6b6b"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C8.134 2 5 5.134 5 9c0 4.25 4.209 10.521 6.067 12.977.614.811 1.865.811 2.478 0C14.791 19.521 19 13.25 19 9c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Khởi hành từ Đà Nẵng, Hội An
              </p>
              <p className="text-gray-500 text-sm mb-4">
                <span className="text-yellow-500">★ 4.5</span> (5K đánh giá) -
                10K+ lượt đặt
              </p>
            </div>

            <div className="flex justify-between items-center px-4 pb-4">
              <p className="text-lg font-bold text-gray-800">
                1.864.000đ/Người
              </p>
              <button className="bg-blue-100 text-blue-500 px-4 py-2 rounded-3xl border border-blue-500">
                Đặt ngay
              </button>
            </div>

            <div className="px-4 pb-4">
              <span className="bg-red-100 text-red-500 text-sm font-semibold px-2 py-1 rounded-lg">
                Giảm 10%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
