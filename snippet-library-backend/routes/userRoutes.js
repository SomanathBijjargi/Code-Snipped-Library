// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');

// This route is protected; only authenticated users can access it.
// GET /api/users/profile
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
