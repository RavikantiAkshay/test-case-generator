const express = require('express');
const router = express.Router();
const generateController = require('../controllers/generateController');
const { protect } = require('../middlewares/authMiddleware');
const { generateTestValidator, regenerateTestValidator, feedbackValidator } = require('../validators/generateValidator');
const { asyncHandler } = require('../utils/helpers');

// All generation routes are protected
router.use(protect);

router.post('/', generateTestValidator, asyncHandler(generateController.generateTest));
router.post('/regenerate', regenerateTestValidator, asyncHandler(generateController.regenerateTest));
router.patch('/:id/feedback', feedbackValidator, asyncHandler(generateController.updateFeedback));
router.patch('/:id/content', asyncHandler(generateController.updateContent));
router.get('/project/:projectId', asyncHandler(generateController.getProjectGenerations));

module.exports = router;
