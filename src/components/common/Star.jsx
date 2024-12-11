import React from "react";

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <div
    className="w-8 h-8 justify-center items-center flex cursor-pointer" // Tăng kích thước của sao
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? "#F09B0A" : "#D9D9D9"}  // Sao đã chọn sẽ có màu vàng
      viewBox="0 0 24 24"
      className="w-8 h-8"  // Kích thước của icon sao (8x8)
    >
      <path
        d="M12 2l3.09 6.26L22 9.24l-4.91 4.73 1.17 6.81-6.09-3.19L12 17.27l-5.17 3.02L7 14.97 2 9.24l6.91-.98L12 2z"
      />
    </svg>
  </div>
);

export default Star;
