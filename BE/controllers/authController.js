import { poolPromise, sql } from '../config/db.js';
import otpService from '../services/otpService.js';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import nodemailer from 'nodemailer';

// eslint-disable-next-line no-undef
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
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

export const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    // eslint-disable-next-line no-undef
    const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const { email } = payload;
    res.json({ message: `User ${email} logged in with Google` });
  } catch {
    res.status(400).json({ error: 'Google authentication failed' });
  }
};

export const facebookLogin = async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
    const { email } = response.data;
    res.json({ message: `User ${email} logged in with Facebook` });
  } catch {
    res.status(400).json({ error: 'Facebook authentication failed' });
  }
};

export const sendOTP = async (req, res) => {
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

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (otpService.verifyOTP(email, otp)) {
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};
