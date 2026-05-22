const express = require('express');
const router = express.Router();
const { uploadZip, importGithub } = require('../controllers/repositoryController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { asyncHandler } = require('../utils/helpers');

// All repository routes are protected
router.use(protect);

router.post('/upload', upload.single('file'), asyncHandler(uploadZip));
router.post('/github', asyncHandler(importGithub));

module.exports = router;
