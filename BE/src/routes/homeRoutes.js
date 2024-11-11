// routes/homeRoutes.js
import express from 'express';
import { getDestinationSuggestions, getSpecialOffers } from '../../controllers/homeController.js';

const router = express.Router();

router.get('/destination-suggestions', getDestinationSuggestions);
router.get('/special-offers', getSpecialOffers);

export default router;
