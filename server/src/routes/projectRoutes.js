const express = require('express');
const router = express.Router();
const {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { createProjectValidator, updateProjectValidator } = require('../validators/projectValidator');
const { protect } = require('../middlewares/authMiddleware');
const { asyncHandler } = require('../utils/helpers');

// All project routes are protected
router.use(protect);

router.post('/', createProjectValidator, asyncHandler(createProject));
router.get('/', asyncHandler(listProjects));
router.get('/:id', asyncHandler(getProject));
router.patch('/:id', updateProjectValidator, asyncHandler(updateProject));
router.delete('/:id', asyncHandler(deleteProject));

module.exports = router;
