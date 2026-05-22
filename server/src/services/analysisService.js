const { scanDirectory, generateTreeString, countEntries, detectLanguages } = require('../parsing/fileScanner');
const { detectTechnologies } = require('../parsing/techDetector');
const { detectRoutes } = require('../parsing/routeDetector');
const { detectModels } = require('../parsing/modelDetector');
const logger = require('../utils/logger');

/**
 * Run full analysis on a repository directory
 * Returns: { repositorySummary, detectedTechnologies, routes, models }
 */
const analyzeRepository = (repoPath) => {
  logger.info(`Analyzing repository: ${repoPath}`);

  // 1. Scan file tree
  const fileTree = scanDirectory(repoPath);
  const { files: totalFiles, dirs: totalDirectories } = countEntries(fileTree);
  const folderStructure = generateTreeString(fileTree);
  const languages = detectLanguages(fileTree);

  // 2. Detect technologies
  const detectedTechnologies = detectTechnologies(repoPath, fileTree);

  // 3. Detect routes
  const routes = detectRoutes(repoPath, fileTree);

  // 4. Detect models
  const models = detectModels(repoPath, fileTree);

  logger.success(`Analysis complete: ${totalFiles} files, ${detectedTechnologies.length} technologies, ${routes.length} routes, ${models.length} models`);

  return {
    repositorySummary: {
      folderStructure,
      totalFiles,
      totalDirectories,
      languages,
    },
    detectedTechnologies,
    routes,
    models,
    fileTree,
  };
};

module.exports = { analyzeRepository };
