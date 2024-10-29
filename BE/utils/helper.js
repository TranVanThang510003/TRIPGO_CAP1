// utils/helper.js
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  // eslint-disable-next-line no-undef
  module.exports = { validateEmail };
  