// server.js
// eslint-disable-next-line no-undef
const app = require('./app');
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
