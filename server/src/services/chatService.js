const Chat = require('../models/Chat');
const Generation = require('../models/Generation');
const projectService = require('./projectService');
const { chatCompletion } = require('../ai/groqClient');
const { getRelevantContext } = require('../ai/contextRetriever');

/**
 * Send a message to the AI chat assistant with full project context
 */
const sendMessage = async (projectId, userId, userMessage) => {
  const project = await projectService.getProjectById(projectId, userId);

  // Get recent chat history for continuity (last 6 messages)
  const recentChats = await Chat.find({ projectId, userId })
    .sort({ createdAt: -1 })
    .limit(6);
  recentChats.reverse();

  // Get recent generations for context
  const recentGenerations = await Generation.find({ projectId, userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .select('goal testTypes generatedContent');

  // Get relevant context from embeddings
  const embeddingContext = await getRelevantContext(projectId, userMessage);

  // Build system prompt with full project context
  let systemPrompt = `You are an expert test engineering assistant for the project "${project.projectName}".`;
  systemPrompt += `\nYour role is to help the user understand, improve, and extend their test cases.`;
  systemPrompt += `\nAnswer concisely and precisely. Use code snippets when helpful.\n`;

  if (project.detectedTechnologies?.length > 0) {
    systemPrompt += `\nProject technologies: ${project.detectedTechnologies.map((t) => t.name).join(', ')}`;
  }
  if (project.repositorySummary?.folderStructure) {
    systemPrompt += `\nProject structure:\n${project.repositorySummary.folderStructure.substring(0, 800)}`;
  }

  if (recentGenerations.length > 0) {
    systemPrompt += `\n\nRecent test generations:`;
    for (const gen of recentGenerations) {
      systemPrompt += `\n---\nGoal: ${gen.goal}\nTypes: ${(gen.testTypes || []).join(', ')}\nCode:\n${gen.generatedContent?.substring(0, 1000) || ''}`;
    }
  }

  if (embeddingContext) {
    systemPrompt += `\n\nRelevant past context:\n${embeddingContext.substring(0, 1500)}`;
  }

  // Build messages array
  const messages = [{ role: 'system', content: systemPrompt }];

  // Add chat history
  for (const chat of recentChats) {
    messages.push({ role: 'user', content: chat.userMessage });
    messages.push({ role: 'assistant', content: chat.assistantMessage });
  }

  messages.push({ role: 'user', content: userMessage });

  // Call Groq
  const aiResponse = await chatCompletion(messages, { maxTokens: 2000 });

  // Save to DB
  const chat = await Chat.create({
    projectId,
    userId,
    userMessage,
    assistantMessage: aiResponse.content,
  });

  return chat;
};

/**
 * Get chat history for a project
 */
const getChatHistory = async (projectId, userId) => {
  return Chat.find({ projectId, userId }).sort({ createdAt: 1 });
};

module.exports = { sendMessage, getChatHistory };
