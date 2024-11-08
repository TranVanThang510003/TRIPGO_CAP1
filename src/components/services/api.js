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

// Hàm gọi API để lấy danh sách các khách sạn
export const fetchHotels = async () => {
  const response = await api.get('/hotels');
  return response.data; // Trả về dữ liệu từ API
};
// Hàm gọi API để lấy chi tiết một khách sạn cụ thể
export const fetchHotelDetails = async (hotelId) => {
  const response = await api.get(`/hotels/${hotelId}`);
  return response.data; // Trả về dữ liệu từ API
};


// Hàm gọi API để lấy danh sách các khách sạn
export const fetchActivities = async () => {
  const response = await api.get('/activities');
  return response.data; // Trả về dữ liệu từ API
};

// danh sách các tỉnh thành
export const fetchProvinces = async () => {
  const response = await axios.get('https://provinces.open-api.vn/api/p/');
  return response.data; // Trả về dữ liệu từ API
};