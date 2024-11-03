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
export default router;
