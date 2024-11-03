<<<<<<< Updated upstream
// Import dependencies with ES module syntax
import 'dotenv/config'; // This automatically loads environment variables from .env
import express from 'express';
import authRoutes from './routes/authRoutes.js'; // Ensure the file has a .js extension

=======
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/authRoutes.js';
>>>>>>> Stashed changes
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

// Set up routes
app.use('/api/auth', authRoutes); // Routes will start with /api/auth

// Check server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

<<<<<<< Updated upstream
// Export the app as default
export default app;

=======
// eslint-disable-next-line no-undef
export default app;
>>>>>>> Stashed changes
