const generateService = require('../services/generateService');
const { createResponse } = require('../utils/helpers');
const { validationResult } = require('express-validator');

/**
 * POST /api/generate
 */
const generateTest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { projectId, goal, sourceCode, testTypes, additionalInstructions } = req.body;

  const generation = await generateService.generateTest({
    projectId,
    userId: req.user.id,
    goal,
    sourceCode,
    testTypes: testTypes || [],
    additionalInstructions: additionalInstructions || '',
  });

  res.status(201).json(createResponse(true, 'Test cases generated successfully', generation));
};

/**
 * POST /api/generate/regenerate
 */
const regenerateTest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { generationId, additionalInstructions } = req.body;

  const generation = await generateService.regenerateTest(
    generationId,
    req.user.id,
    additionalInstructions
  );

  res.status(201).json(createResponse(true, 'Test cases regenerated successfully', generation));
};

/**
 * PATCH /api/generate/:id/feedback
 */
const updateFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id } = req.params;
  const { feedback, qualityScore } = req.body;

  const generation = await generateService.updateFeedback(id, req.user.id, { feedback, qualityScore });

  res.status(200).json(createResponse(true, 'Feedback saved', generation));
};

/**
 * PATCH /api/generate/:id/content
 */
const updateContent = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ success: false, message: 'Content is required' });
  }

  const generation = await generateService.updateContent(id, req.user.id, content);
  
  res.status(200).json(createResponse(true, 'Content updated', generation));
};

/**
 * GET /api/generate/project/:projectId
 */
const getProjectGenerations = async (req, res) => {
  const { projectId } = req.params;
  const generations = await generateService.listGenerations(projectId, req.user.id);
  res.status(200).json(createResponse(true, 'Generations retrieved', generations));
};

module.exports = {
  generateTest,
  regenerateTest,
  updateFeedback,
  updateContent,
  getProjectGenerations,
};
