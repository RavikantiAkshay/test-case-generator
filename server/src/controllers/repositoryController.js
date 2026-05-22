const repositoryService = require('../services/repositoryService');
const projectService = require('../services/projectService');
const { analyzeRepository } = require('../services/analysisService');
const { createResponse } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * Run analysis on a project's repository and persist results
 */
const runAnalysis = async (repoPath, projectId, userId) => {
  await projectService.updateProject(projectId, userId, { status: 'analyzing' });

  const analysis = analyzeRepository(repoPath);

  const updated = await projectService.updateProject(projectId, userId, {
    repositorySummary: analysis.repositorySummary,
    detectedTechnologies: analysis.detectedTechnologies,
    analysisResults: {
      routes: analysis.routes,
      models: analysis.models,
    },
    status: 'ready',
  });

  return { project: updated, analysis };
};

/**
 * POST /api/repositories/upload
 */
const uploadZip = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No ZIP file provided' });
  }

  const { projectId } = req.body;
  if (!projectId) {
    return res.status(400).json({ success: false, message: 'Project ID is required' });
  }

  const project = await projectService.getProjectById(projectId, req.user.id);
  await projectService.updateProject(projectId, req.user.id, { status: 'uploading' });

  const repoPath = await repositoryService.extractZip(req.file.path, projectId);

  const { project: updated, analysis } = await runAnalysis(repoPath, projectId, req.user.id);
  await projectService.updateProject(projectId, req.user.id, {
    repositoryPath: repoPath,
    sourceType: 'zip',
  });

  logger.success(`ZIP uploaded & analyzed for project: ${project.projectName}`);
  res.status(200).json(createResponse(true, 'Repository uploaded and analyzed', {
    project: updated,
    analysis: {
      routes: analysis.routes,
      models: analysis.models,
      technologies: analysis.repositorySummary?.languages || [],
    },
  }));
};

/**
 * POST /api/repositories/github
 */
const importGithub = async (req, res) => {
  const { projectId, repositoryUrl } = req.body;

  if (!projectId || !repositoryUrl) {
    return res.status(400).json({ success: false, message: 'Project ID and repository URL are required' });
  }

  const project = await projectService.getProjectById(projectId, req.user.id);
  await projectService.updateProject(projectId, req.user.id, { status: 'uploading' });

  const repoPath = await repositoryService.cloneGithubRepo(repositoryUrl, projectId);

  const { project: updated, analysis } = await runAnalysis(repoPath, projectId, req.user.id);
  await projectService.updateProject(projectId, req.user.id, {
    repositoryPath: repoPath,
    repositoryUrl,
    sourceType: 'github',
  });

  logger.success(`GitHub repo imported & analyzed for project: ${project.projectName}`);
  res.status(200).json(createResponse(true, 'Repository imported and analyzed', {
    project: updated,
    analysis: {
      routes: analysis.routes,
      models: analysis.models,
      technologies: analysis.repositorySummary?.languages || [],
    },
  }));
};

/**
 * POST /api/repositories/analyze/:projectId
 * Re-run analysis on an existing project's repository
 */
const analyzeProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await projectService.getProjectById(projectId, req.user.id);

  if (!project.repositoryPath) {
    return res.status(400).json({ success: false, message: 'No repository attached to this project' });
  }

  const { project: updated, analysis } = await runAnalysis(project.repositoryPath, projectId, req.user.id);

  logger.success(`Re-analysis complete for project: ${project.projectName}`);
  res.status(200).json(createResponse(true, 'Analysis complete', {
    project: updated,
    analysis: {
      routes: analysis.routes,
      models: analysis.models,
    },
  }));
};

module.exports = { uploadZip, importGithub, analyzeProject };
