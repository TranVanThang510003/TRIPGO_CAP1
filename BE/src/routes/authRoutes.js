import express from 'express';
import { register, googleLogin, facebookLogin, sendOTP, verifyOTP } from '../../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;
