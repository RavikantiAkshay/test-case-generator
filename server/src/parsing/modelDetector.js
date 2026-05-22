const fs = require('fs');
const path = require('path');
const { collectFilePaths } = require('./fileScanner');

/**
 * Detect Mongoose model/schema definitions
 * Looks for: new mongoose.Schema({ ... }) or new Schema({ ... })
 * Extracts model name and field names
 */
const detectModels = (repoPath, fileTree) => {
  const files = collectFilePaths(fileTree);
  const models = [];

  const sourceFiles = files.filter((f) => /\.(js|ts|mjs)$/.test(f));

  for (const filePath of sourceFiles) {
    const fullPath = path.join(repoPath, filePath);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');

      // Detect mongoose.model('Name', schema)
      const modelNamePattern = /mongoose\.model\s*\(\s*['"`](\w+)['"`]/g;
      let modelMatch;
      const modelNames = [];
      while ((modelMatch = modelNamePattern.exec(content)) !== null) {
        modelNames.push(modelMatch[1]);
      }

      // Detect Schema fields — look for key: { type: ... } or key: Type patterns
      const schemaPattern = /new\s+(?:mongoose\.)?Schema\s*\(\s*\{([\s\S]*?)\}\s*(?:,|\))/;
      const schemaMatch = content.match(schemaPattern);

      if (schemaMatch) {
        const schemaBody = schemaMatch[1];
        const fields = [];

        // Match top-level fields: fieldName: { ... } or fieldName: Type
        const fieldPattern = /^\s*(\w+)\s*:\s*(?:\{|String|Number|Boolean|Date|Array|\[|mongoose)/gm;
        let fieldMatch;
        while ((fieldMatch = fieldPattern.exec(schemaBody)) !== null) {
          const fieldName = fieldMatch[1];
          // Skip common Mongoose options
          if (!['type', 'required', 'default', 'unique', 'index', 'ref', 'enum', 'min', 'max', 'trim', 'lowercase', 'select', 'match', 'minlength', 'maxlength', 'validate'].includes(fieldName)) {
            fields.push(fieldName);
          }
        }

        // Derive model name from file or from mongoose.model()
        const name = modelNames[0] || path.basename(filePath, path.extname(filePath));

        models.push({
          name,
          file: filePath,
          fields: [...new Set(fields)],
        });
      }
    } catch {
      // Skip
    }
  }

  return models;
};

module.exports = { detectModels };
