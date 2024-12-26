/* eslint-disable react/no-unescaped-entities */
import "./Style.css"
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate();
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
        <div className="rounded-lg shadow-lg flex items-center  mt-14 p-2">

          <button
              className="text-white text-2xl font-semibold px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out animated-gradient"
              onClick={() => navigate('/tourai')}

          >
            Start with AI
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
