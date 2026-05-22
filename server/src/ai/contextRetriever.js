/**
 * Stub context retriever (to be implemented in Phase 5 with vector embeddings)
 * Currently returns empty string.
 */
const getRelevantContext = async (projectId, query) => {
  // In Phase 5:
  // 1. Generate embedding for query
  // 2. Perform vector search in MongoDB against project's past generations
  // 3. Return top K most similar past successful generations
  
  return "";
};

module.exports = { getRelevantContext };
