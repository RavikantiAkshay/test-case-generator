const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');
const { asyncHandler } = require('../utils/helpers');

router.use(protect);

router.post('/', asyncHandler(chatController.sendMessage));
router.get('/:projectId', asyncHandler(chatController.getChatHistory));

module.exports = router;
