const Project = require('../models/Project');

/**
 * Create a new project for a user
 */
const createProject = async ({ userId, projectName, description, repositoryUrl }) => {
  const project = await Project.create({
    userId,
    projectName,
    description: description || '',
    repositoryUrl: repositoryUrl || '',
  });
  return project;
};

/**
 * List all projects for a user, sorted by most recent
 */
const listProjects = async (userId) => {
  const projects = await Project.find({ userId })
    .sort({ updatedAt: -1 })
    .lean();
  return projects;
};

/**
 * Get a single project by ID (must belong to user)
 */
const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId }).lean();
  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }
  return project;
};

/**
 * Update a project
 */
const updateProject = async (projectId, userId, updates) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId },
    { $set: updates },
    { new: true, runValidators: true }
  ).lean();
  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }
  return project;
};

/**
 * Delete a project
 */
const deleteProject = async (projectId, userId) => {
  const project = await Project.findOneAndDelete({ _id: projectId, userId });
  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }
  return project;
};

module.exports = {
  createProject,
  listProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
