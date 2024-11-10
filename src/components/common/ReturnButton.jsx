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
      className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      <FaArrowLeft className="text-white" />
      <span>Quay lại</span>
    </button>
  );
};

export default ReturnButton;
