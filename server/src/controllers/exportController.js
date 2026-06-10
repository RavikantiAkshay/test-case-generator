const exportService = require('../services/exportService');

/**
 * GET /api/export/:projectId/markdown
 */
const exportMarkdown = async (req, res) => {
  const { projectId } = req.params;
  const { content, filename } = await exportService.exportAsMarkdown(projectId, req.user.id);

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(content);
};

/**
 * GET /api/export/:projectId/json
 */
const exportJSON = async (req, res) => {
  const { projectId } = req.params;
  const { content, filename } = await exportService.exportAsJSON(projectId, req.user.id);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(content);
};

/**
 * GET /api/export/:projectId/text
 */
const exportText = async (req, res) => {
  const { projectId } = req.params;
  const { content, filename } = await exportService.exportAsText(projectId, req.user.id);

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(content);
};

module.exports = { exportMarkdown, exportJSON, exportText };
