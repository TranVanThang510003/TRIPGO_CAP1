// routes/restaurantRoutes.js
import express from 'express';
import { getAllRestaurants, getRestaurantDetails } from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:restaurantId', getRestaurantDetails);

export default router;
