
import otpGenerator from 'otp-generator';
const otps = new Map();

function generateOTP() {
  return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
}

function saveOTP(email, otp) {
  otps.set(email, otp);
  setTimeout(() => otps.delete(email), 5 * 60 * 1000); // OTP expires in 5 minutes
}

function verifyOTP(email, otp) {
  return otps.get(email) === otp;
}

// eslint-disable-next-line no-undef
module.exports = { generateOTP, saveOTP, verifyOTP };
