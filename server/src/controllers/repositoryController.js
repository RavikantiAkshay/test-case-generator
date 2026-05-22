const repositoryService = require('../services/repositoryService');
const projectService = require('../services/projectService');
const { createResponse } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * POST /api/repositories/upload
 * Upload a ZIP file for a project
 */
const uploadZip = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No ZIP file provided',
    });
  }

  const { projectId } = req.body;
  if (!projectId) {
    return res.status(400).json({
      success: false,
      message: 'Project ID is required',
    });
  }

  // Verify project ownership
  const project = await projectService.getProjectById(projectId, req.user.id);

  // Update status
  await projectService.updateProject(projectId, req.user.id, { status: 'uploading' });

  // Extract ZIP
  const repoPath = await repositoryService.extractZip(req.file.path, projectId);

  // Update project with repo path
  const updated = await projectService.updateProject(projectId, req.user.id, {
    repositoryPath: repoPath,
    sourceType: 'zip',
    status: 'ready',
  });

  logger.success(`ZIP uploaded for project: ${project.projectName}`);
  res.status(200).json(createResponse(true, 'Repository uploaded', updated));
};

/**
 * POST /api/repositories/github
 * Import a GitHub repository for a project
 */
const importGithub = async (req, res) => {
  const { projectId, repositoryUrl } = req.body;

  if (!projectId || !repositoryUrl) {
    return res.status(400).json({
      success: false,
      message: 'Project ID and repository URL are required',
    });
  }

  // Verify project ownership
  const project = await projectService.getProjectById(projectId, req.user.id);

  // Update status
  await projectService.updateProject(projectId, req.user.id, { status: 'uploading' });

  // Clone repo
  const repoPath = await repositoryService.cloneGithubRepo(repositoryUrl, projectId);

  // Update project
  const updated = await projectService.updateProject(projectId, req.user.id, {
    repositoryPath: repoPath,
    repositoryUrl,
    sourceType: 'github',
    status: 'ready',
  });

  logger.success(`GitHub repo imported for project: ${project.projectName}`);
  res.status(200).json(createResponse(true, 'Repository imported', updated));
};

module.exports = { uploadZip, importGithub };
