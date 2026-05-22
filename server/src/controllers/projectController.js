const { validationResult } = require('express-validator');
const projectService = require('../services/projectService');
const { createResponse } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * POST /api/projects
 */
const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => e.msg),
    });
  }

  const { projectName, description, repositoryUrl } = req.body;
  const project = await projectService.createProject({
    userId: req.user.id,
    projectName,
    description,
    repositoryUrl,
  });

  logger.success(`Project created: ${projectName} (user: ${req.user.email})`);
  res.status(201).json(createResponse(true, 'Project created', project));
};

/**
 * GET /api/projects
 */
const listProjects = async (req, res) => {
  const projects = await projectService.listProjects(req.user.id);
  res.status(200).json(createResponse(true, 'Projects retrieved', projects));
};

/**
 * GET /api/projects/:id
 */
const getProject = async (req, res) => {
  const project = await projectService.getProjectById(req.params.id, req.user.id);
  res.status(200).json(createResponse(true, 'Project retrieved', project));
};

/**
 * PATCH /api/projects/:id
 */
const updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => e.msg),
    });
  }

  const updates = {};
  if (req.body.projectName !== undefined) updates.projectName = req.body.projectName;
  if (req.body.description !== undefined) updates.description = req.body.description;

  const project = await projectService.updateProject(req.params.id, req.user.id, updates);
  logger.info(`Project updated: ${project.projectName}`);
  res.status(200).json(createResponse(true, 'Project updated', project));
};

/**
 * DELETE /api/projects/:id
 */
const deleteProject = async (req, res) => {
  const project = await projectService.deleteProject(req.params.id, req.user.id);
  logger.info(`Project deleted: ${project.projectName}`);
  res.status(200).json(createResponse(true, 'Project deleted'));
};

module.exports = { createProject, listProjects, getProject, updateProject, deleteProject };
