<<<<<<< Updated upstream
// authRoutes.js

import express from 'express';

const router = express.Router();

// Define routes
router.get('/login', (req, res) => {
  res.send('Login route');
});

router.get('/register', (req, res) => {
  res.send('Register route');
});

// Export the router as the default export
=======
import express from 'express';
import { register, googleLogin, facebookLogin, sendOTP, verifyOTPHandler } from '../../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTPHandler); // Đổi tên verifyOTP thành verifyOTPHandler để không bị trùng tên

>>>>>>> Stashed changes
export default router;
