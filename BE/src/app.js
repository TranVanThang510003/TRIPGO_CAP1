// Import dependencies with ES module syntax
import 'dotenv/config'; // This automatically loads environment variables from .env
import express from 'express';
import authRoutes from './routes/authRoutes.js'; // Ensure the file has a .js extension

const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

// Set up routes
app.use('/api/auth', authRoutes); // Routes will start with /api/auth

// Check server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Export the app as default
export default app;

