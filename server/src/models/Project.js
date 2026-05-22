const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [1, 'Project name cannot be empty'],
      maxlength: [100, 'Project name must be at most 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must be at most 500 characters'],
      default: '',
    },
    repositoryUrl: {
      type: String,
      trim: true,
      default: '',
    },
    repositoryPath: {
      type: String,
      default: '',
    },
    repositorySummary: {
      folderStructure: { type: String, default: '' },
      totalFiles: { type: Number, default: 0 },
      totalDirectories: { type: Number, default: 0 },
      languages: [{ type: String }],
    },
    detectedTechnologies: [
      {
        name: { type: String },
        category: { type: String }, // framework, language, database, tool
        confidence: { type: Number, default: 1 },
      },
    ],
    sourceType: {
      type: String,
      enum: ['zip', 'github', 'none'],
      default: 'none',
    },
    status: {
      type: String,
      enum: ['created', 'uploading', 'analyzing', 'ready', 'error'],
      default: 'created',
    },
    generationCount: {
      type: Number,
      default: 0,
    },
    lastGeneratedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for user's projects sorted by recent
projectSchema.index({ userId: 1, updatedAt: -1 });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
