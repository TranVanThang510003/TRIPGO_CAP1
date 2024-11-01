/* eslint-disable react/no-unescaped-entities */
const Navbar = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[500px] "
      style={{
        backgroundImage: "url('public/pexels-francesco-ungaro-2835436 1.png')",
      }}
    >
      {/* Lớp phủ đen mờ */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div>

      {/* Nội dung */}
      <div className="relative z-10 flex flex-col items-center text-center text-white pt-24 ">
        <h1 className="text-5xl font-bold mt-12">
          TRẢI NGHIỆM DU LỊCH THEO CÁCH CỦA BẠN
        </h1>
        <p className="text-lg italic mt-2">
          "Tour du lịch cá nhân hoá bằng AI - Lên kế hoạch hoàn hảo cho riêng
          bạn"
        </p>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-lg flex items-center w-full max-w-4xl mt-8 p-2">
          <input
            type="text"
            placeholder="Tạo tour trải nghiệm bằng AI"
            className="w-full px-4 py-2 rounded-l-full text-gray-700 focus:outline-none text-xl ml-3"
          />
          <button className="bg-blue-800 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 whitespace-nowrap">
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
