// app.js
// eslint-disable-next-line no-undef
require('dotenv').config(); // Để load các biến môi trường từ file .env nếu có
// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const authRoutes = require('./routes/authRoutes');
const app = express();

// Middleware để xử lý JSON từ body của request
app.use(express.json());

// Kết nối route auth với ứng dụng
app.use('/api/auth', authRoutes); // Các route sẽ bắt đầu bằng /api/auth

// Kiểm tra xem server có đang hoạt động không
app.get('/', (req, res) => {
  res.send('Server is running');
});

// eslint-disable-next-line no-undef
module.exports = app;
