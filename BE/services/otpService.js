import otpGenerator from 'otp-generator';
const otps = new Map();

export function generateOTP() {
  return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
}

export function saveOTP(email, otp) {
  otps.set(email, otp);
  setTimeout(() => otps.delete(email), 5 * 60 * 1000); // OTP expires in 5 minutes
}

export function verifyOTP(email, otp) {
  return otps.get(email) === otp;
}
