const { findSimilarGenerations } = require('../embeddings/similaritySearch');
const logger = require('../utils/logger');

/**
 * Retrieve relevant historical context for a generation prompt.
 * Uses embedding similarity search to find past successful generations
 * that are similar to the current goal/code.
 *
 * @param {string} projectId - The project to search within
 * @param {string} query - The current generation goal
 * @returns {string} - Formatted historical context string for the prompt
 */
const getRelevantContext = async (projectId, query) => {
  try {
    const results = await findSimilarGenerations(projectId, query, 3);

    if (results.length === 0) return '';

    let context = '';
    for (let i = 0; i < results.length; i++) {
      const { generation, similarity } = results[i];
      const status = generation.feedback === 'approved' ? ' [APPROVED]' : '';
      context += `--- Example ${i + 1} (similarity: ${similarity.toFixed(2)})${status} ---\n`;
      context += `Goal: ${generation.goal}\n`;
      context += `Types: ${(generation.testTypes || []).join(', ')}\n`;
      // Include a truncated version of the generated content
      context += `Output:\n${generation.generatedContent?.substring(0, 1500) || ''}\n\n`;
    }

    logger.info(`Context retriever: found ${results.length} relevant past generations`);
    return context;
  } catch (error) {
    logger.error(`Context retrieval failed: ${error.message}`);
    return '';
  }
};

module.exports = { getRelevantContext };
