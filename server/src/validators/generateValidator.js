const { body } = require('express-validator');

const generateTestValidator = [
  body('projectId')
    .notEmpty()
    .withMessage('Project ID is required')
    .isMongoId()
    .withMessage('Invalid Project ID'),
  body('goal')
    .trim()
    .notEmpty()
    .withMessage('Goal is required'),
  body('sourceCode')
    .trim()
    .notEmpty()
    .withMessage('Source code is required'),
  body('testTypes')
    .optional()
    .isArray()
    .withMessage('Test types must be an array'),
  body('additionalInstructions')
    .optional()
    .trim(),
];

const regenerateTestValidator = [
  body('generationId')
    .notEmpty()
    .withMessage('Generation ID is required')
    .isMongoId()
    .withMessage('Invalid Generation ID'),
  body('additionalInstructions')
    .optional()
    .trim(),
];

const feedbackValidator = [
  body('feedback')
    .optional()
    .isIn(['approved', 'rejected', 'none'])
    .withMessage('Invalid feedback value'),
  body('qualityScore')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Score must be between 1 and 5'),
];

module.exports = { generateTestValidator, regenerateTestValidator, feedbackValidator };
