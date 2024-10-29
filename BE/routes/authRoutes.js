// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/google-login', authController.googleLogin);
router.post('/facebook-login', authController.facebookLogin);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

// eslint-disable-next-line no-undef
module.exports = router;
