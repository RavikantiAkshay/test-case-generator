const Generation = require('../models/Generation');
const projectService = require('./projectService');
const { chatCompletion } = require('../ai/groqClient');
const { buildTestGenerationPrompt } = require('../ai/promptBuilder');
const { getRelevantContext } = require('../ai/contextRetriever');
const { generateEmbedding, buildEmbeddingText } = require('../embeddings/embeddingService');
const logger = require('../utils/logger');

/**
 * Generate test cases based on input parameters
 */
const generateTest = async ({ projectId, userId, goal, sourceCode, testTypes, additionalInstructions }) => {
  // Get project context
  const project = await projectService.getProjectById(projectId, userId);
  
  const projectContext = {
    technologies: project.detectedTechnologies,
    structure: project.repositorySummary?.folderStructure,
  };

  // Get historical context (Phase 5)
  const historicalContext = await getRelevantContext(projectId, goal);

  // Build prompt
  const messages = buildTestGenerationPrompt({
    goal,
    sourceCode,
    projectContext,
    historicalContext,
    testTypes,
    additionalInstructions,
  });

  // Call Groq API
  const aiResponse = await chatCompletion(messages);

  // Clean output (remove markdown code blocks if AI included them despite instructions)
  let cleanedContent = aiResponse.content.trim();
  if (cleanedContent.startsWith('```')) {
    cleanedContent = cleanedContent.replace(/^```[a-z]*\n/, '');
    cleanedContent = cleanedContent.replace(/\n```$/, '');
  }

  // Save generation to DB
  const generation = await Generation.create({
    projectId,
    userId,
    goal,
    sourceCode,
    testTypes,
    additionalInstructions,
    generatedContent: cleanedContent,
    modelUsed: aiResponse.model,
  });

  // Update project stats
  await projectService.updateProject(projectId, userId, {
    $inc: { generationCount: 1 },
    lastGeneratedAt: new Date(),
  });

  // Generate embedding asynchronously (non-blocking)
  generateEmbedding(buildEmbeddingText(generation))
    .then((embedding) => {
      Generation.findByIdAndUpdate(generation._id, { embedding }).exec();
      logger.info(`Embedding stored for generation ${generation._id}`);
    })
    .catch((err) => logger.warn(`Embedding generation skipped: ${err.message}`));

  return generation;
};

/**
 * Regenerate a specific test with optional modified instructions
 */
const regenerateTest = async (generationId, userId, newInstructions = '') => {
  const original = await Generation.findOne({ _id: generationId, userId });
  if (!original) throw new Error('Generation not found');

  const combinedInstructions = newInstructions 
    ? `${original.additionalInstructions}\n\nUser asked for changes:\n${newInstructions}`
    : original.additionalInstructions;

  return generateTest({
    projectId: original.projectId,
    userId: original.userId,
    goal: original.goal,
    sourceCode: original.sourceCode,
    testTypes: original.testTypes,
    additionalInstructions: combinedInstructions,
  });
};

/**
 * Provide feedback (approve/reject/score) for a generation
 */
const updateFeedback = async (generationId, userId, { feedback, qualityScore }) => {
  const generation = await Generation.findOneAndUpdate(
    { _id: generationId, userId },
    { $set: { feedback, qualityScore } },
    { new: true }
  );
  if (!generation) throw new Error('Generation not found');
  return generation;
};

/**
 * Update generated content directly (inline editing)
 */
const updateContent = async (generationId, userId, content) => {
  const generation = await Generation.findOneAndUpdate(
    { _id: generationId, userId },
    { $set: { generatedContent: content } },
    { new: true }
  );
  if (!generation) throw new Error('Generation not found');
  return generation;
};

/**
 * List generations for a project
 */
const listGenerations = async (projectId, userId) => {
  return Generation.find({ projectId, userId }).sort({ createdAt: -1 });
};

module.exports = {
  generateTest,
  regenerateTest,
  updateFeedback,
  updateContent,
  listGenerations,
};
