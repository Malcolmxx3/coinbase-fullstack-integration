const express = require('express');

const { getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route: requires a valid JWT
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
