// server.js
import express from 'express';
import dotenv from 'dotenv';
import homeRoutes from './routes/homeRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/home', homeRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
