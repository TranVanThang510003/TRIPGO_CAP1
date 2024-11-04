// routes/hotelRoutes.js
import express from 'express';
import { getAllHotels, getHotelDetails } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/', getAllHotels);
router.get('/:hotelId', getHotelDetails);

export default router;
