const mongoose = require('mongoose');

const generationSchema = new mongoose.Schema(
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
    goal: {
      type: String,
      required: true,
    },
    sourceCode: {
      type: String,
      required: true,
    },
    testTypes: [{
      type: String,
    }],
    additionalInstructions: {
      type: String,
      default: '',
    },
    generatedContent: {
      type: String,
      required: true,
    },
    qualityScore: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    feedback: {
      type: String,
      enum: ['approved', 'rejected', 'none'],
      default: 'none',
    },
    modelUsed: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

generationSchema.index({ projectId: 1, createdAt: -1 });

const Generation = mongoose.model('Generation', generationSchema);

module.exports = Generation;
