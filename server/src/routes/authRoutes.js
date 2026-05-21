const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const { signupValidator, loginValidator } = require('../validators/authValidator');
const { protect } = require('../middlewares/authMiddleware');
const { asyncHandler } = require('../utils/helpers');

// Public routes
router.post('/signup', signupValidator, asyncHandler(signup));
router.post('/login', loginValidator, asyncHandler(login));

// Protected routes
router.get('/me', protect, asyncHandler(getMe));

module.exports = router;
