const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userMessage: {
      type: String,
      required: true,
    },
    assistantMessage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ projectId: 1, createdAt: 1 });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
