const Generation = require('../models/Generation');
const { generateEmbedding } = require('./embeddingService');
const logger = require('../utils/logger');

/**
 * Compute cosine similarity between two vectors
 */
const cosineSimilarity = (a, b) => {
  if (a.length !== b.length) return 0;
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
};

/**
 * Find the top-K most similar past generations for a given query.
 * Only returns approved or unrated generations (not rejected ones).
 * @param {string} projectId - Project to search within
 * @param {string} queryText - Text to find similar generations for
 * @param {number} topK - Number of results to return
 * @returns {Array<{generation, similarity}>}
 */
const findSimilarGenerations = async (projectId, queryText, topK = 3) => {
  const startTime = Date.now();

  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(queryText);

    // Fetch all generations for this project that have embeddings
    const generations = await Generation.find({
      projectId,
      embedding: { $exists: true, $ne: [] },
      feedback: { $ne: 'rejected' }, // Exclude rejected generations
    }).select('goal testTypes generatedContent embedding feedback qualityScore');

    if (generations.length === 0) {
      logger.info('No embedded generations found for similarity search');
      return [];
    }

    // Compute similarities
    const scored = generations.map((gen) => ({
      generation: gen,
      similarity: cosineSimilarity(queryEmbedding, gen.embedding),
    }));

    // Sort by similarity descending, take top K
    scored.sort((a, b) => b.similarity - a.similarity);
    const results = scored.slice(0, topK).filter((r) => r.similarity > 0.3); // Minimum threshold

    const elapsed = Date.now() - startTime;
    logger.info(`Similarity search: ${results.length} results in ${elapsed}ms`);

    return results;
  } catch (error) {
    logger.error(`Similarity search failed: ${error.message}`);
    return [];
  }
};

module.exports = { findSimilarGenerations, cosineSimilarity };
