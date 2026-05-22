const { Groq } = require('groq-sdk');
const logger = require('../utils/logger');

// Initialize Groq SDK (requires GROQ_API_KEY env var)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Call Groq API to generate chat completion
 * @param {Array} messages - Array of message objects { role, content }
 * @param {Object} options - Generation options (model, temperature, etc.)
 */
const chatCompletion = async (messages, options = {}) => {
  try {
    const defaultModel = 'llama3-70b-8192'; // High quality model for code generation
    
    const response = await groq.chat.completions.create({
      messages,
      model: options.model || defaultModel,
      temperature: options.temperature ?? 0.2, // Low temp for more deterministic code
      max_tokens: options.maxTokens || 4000,
      top_p: options.topP || 1,
      stream: false,
    });

    return {
      content: response.choices[0]?.message?.content || '',
      usage: response.usage,
      model: response.model,
    };
  } catch (error) {
    logger.error(`Groq API Error: ${error.message}`);
    throw new Error(`AI Generation failed: ${error.message}`);
  }
};

module.exports = { chatCompletion };
