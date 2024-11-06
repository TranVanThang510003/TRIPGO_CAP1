// Import dependencies with ES module syntax
import 'dotenv/config'; // This automatically loads environment variables from .env
import express from 'express';
import authRoutes from './routes/authRoutes.js'; // Ensure the file has a .js extension
// Import các route đã tạo
import homeRoutes from './routes/homeRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';

const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

// Set up routes
app.use('/api/auth', authRoutes); // Routes will start with /api/auth

// Check server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Sử dụng các route trong ứng dụng
app.use('/api/home', homeRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Export the app as default
export default app;

