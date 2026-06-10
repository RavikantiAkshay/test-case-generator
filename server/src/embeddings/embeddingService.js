const { Groq } = require('groq-sdk');
const logger = require('../utils/logger');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Generate a text embedding using Groq's embedding endpoint.
 * Falls back to a lightweight hash-based embedding if the API doesn't support embeddings.
 * @param {string} text - Text to embed
 * @returns {number[]} - Embedding vector
 */
const generateEmbedding = async (text) => {
  try {
    // Truncate to avoid token limits (roughly 8000 chars ≈ 2000 tokens)
    const truncated = text.substring(0, 8000);

    const response = await groq.embeddings.create({
      model: 'nomic-embed-text-v1_5',
      input: truncated,
    });

    return response.data[0].embedding;
  } catch (error) {
    logger.warn(`Embedding API unavailable, using fallback: ${error.message}`);
    return generateFallbackEmbedding(text);
  }
};

/**
 * Fallback: deterministic hash-based pseudo-embedding (64 dimensions).
 * Not semantically meaningful, but enables the pipeline to work without
 * an embedding API. Will be replaced when a proper model is available.
 */
const generateFallbackEmbedding = (text) => {
  const dim = 64;
  const embedding = new Array(dim).fill(0);
  for (let i = 0; i < text.length; i++) {
    embedding[i % dim] += text.charCodeAt(i);
  }
  // Normalize to unit vector
  const magnitude = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0)) || 1;
  return embedding.map((v) => v / magnitude);
};

/**
 * Build a composite string from a generation for embedding.
 * Combines goal, test types, and generated content for better semantic matching.
 */
const buildEmbeddingText = (generation) => {
  const parts = [
    `Goal: ${generation.goal}`,
    `Types: ${(generation.testTypes || []).join(', ')}`,
    `Code:\n${generation.generatedContent?.substring(0, 4000) || ''}`,
  ];
  return parts.join('\n');
};

module.exports = { generateEmbedding, generateFallbackEmbedding, buildEmbeddingText };
