// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Thay bằng URL API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm gọi API để lấy danh sách các tour
export const fetchTours = async (page = 1, limit = 9) => {
  const response = await api.get('/public-tours', {
    params: { page, limit },
  });
  return response.data;
};

// Hàm gọi API để lấy chi tiết một tour cụ thể
export const fetchTourDetails = async (tourId) => {
  const response = await api.get(`/public-tours/${tourId}`);
  return response.data;
};
