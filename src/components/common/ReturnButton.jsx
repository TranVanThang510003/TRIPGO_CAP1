// src/components/common/ReturnButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ReturnButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 pt-4 font-semibold text-blue-500 rounded-md hover:text-blue-700 transition-colors"
    >
      <FaArrowLeft className="text-blue-500 hover:text-blue-700 " />
      <span>Quay lại</span>
    </button>
  );
};

export default ReturnButton;
