// eslint-disable-next-line no-undef
const { poolPromise, sql } = require('../config/db');
// eslint-disable-next-line no-undef
const otpService = require('../services/otpService');
// eslint-disable-next-line no-undef
const { OAuth2Client } = require('google-auth-library');
// eslint-disable-next-line no-undef
const axios = require('axios');
// eslint-disable-next-line no-undef
const nodemailer = require('nodemailer');
// eslint-disable-next-line no-undef
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// eslint-disable-next-line no-undef
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('username', sql.NVarChar, username)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .query('INSERT INTO users (username, email, password) VALUES (@username, @email, @password)');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// eslint-disable-next-line no-undef
exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    // eslint-disable-next-line no-undef
    const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const { email } = payload;
    res.json({ message: `User ${email} logged in with Google` });
  } catch  {
    res.status(400).json({ error: 'Google authentication failed' });
  }
};

// eslint-disable-next-line no-undef
exports.facebookLogin = async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
    const { email } = response.data;
    res.json({ message: `User ${email} logged in with Facebook` });
  } catch  {
    res.status(400).json({ error: 'Facebook authentication failed' });
  }
};

// eslint-disable-next-line no-undef
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = otpService.generateOTP();
  otpService.saveOTP(email, otp);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // eslint-disable-next-line no-undef
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: '"TripGo" <no-reply@tripgo.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`
  });

  res.json({ message: 'OTP sent' });
};

// eslint-disable-next-line no-undef
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (otpService.verifyOTP(email, otp)) {
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};
