import 'dotenv/config'; 
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/restaurants', restaurantRoutes);

export default app;
