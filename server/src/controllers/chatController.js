const chatService = require('../services/chatService');
const { createResponse } = require('../utils/helpers');

/**
 * POST /api/chat
 */
const sendMessage = async (req, res) => {
  const { projectId, message } = req.body;

  if (!projectId || !message?.trim()) {
    return res.status(400).json({ success: false, message: 'Project ID and message are required' });
  }

  const chat = await chatService.sendMessage(projectId, req.user.id, message);
  res.status(201).json(createResponse(true, 'Message sent', chat));
};

/**
 * GET /api/chat/:projectId
 */
const getChatHistory = async (req, res) => {
  const { projectId } = req.params;
  const chats = await chatService.getChatHistory(projectId, req.user.id);
  res.status(200).json(createResponse(true, 'Chat history retrieved', chats));
};

module.exports = { sendMessage, getChatHistory };
