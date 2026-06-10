const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');
const { protect } = require('../middlewares/authMiddleware');
const { asyncHandler } = require('../utils/helpers');

router.use(protect);

router.get('/:projectId/markdown', asyncHandler(exportController.exportMarkdown));
router.get('/:projectId/json', asyncHandler(exportController.exportJSON));
router.get('/:projectId/text', asyncHandler(exportController.exportText));

module.exports = router;
