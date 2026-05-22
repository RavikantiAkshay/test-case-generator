const fs = require('fs');
const path = require('path');
const { collectFilePaths } = require('./fileScanner');

/**
 * Detect Express-style API routes from source files
 * Looks for patterns like: router.get('/path', ...), app.post('/path', ...)
 */
const detectRoutes = (repoPath, fileTree) => {
  const files = collectFilePaths(fileTree);
  const routes = [];

  // Only scan JS/TS files
  const sourceFiles = files.filter((f) => /\.(js|ts|mjs)$/.test(f));

  // Route patterns
  const routePatterns = [
    // router.get('/path', handler)
    /(?:router|app)\.(get|post|put|patch|delete|all)\s*\(\s*['"`]([^'"`]+)['"`]/g,
    // @Get('/path'), @Post('/path') — NestJS/decorators
    /@(Get|Post|Put|Patch|Delete)\s*\(\s*['"`]([^'"`]*)['"`]\s*\)/g,
  ];

  for (const filePath of sourceFiles) {
    const fullPath = path.join(repoPath, filePath);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');

      for (const pattern of routePatterns) {
        // Reset regex state
        pattern.lastIndex = 0;
        let match;
        while ((match = pattern.exec(content)) !== null) {
          routes.push({
            method: match[1].toUpperCase(),
            path: match[2] || '/',
            file: filePath,
          });
        }
      }
    } catch {
      // Skip files that can't be read
    }
  }

  // Deduplicate
  const seen = new Set();
  return routes.filter((r) => {
    const key = `${r.method}:${r.path}:${r.file}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

module.exports = { detectRoutes };
