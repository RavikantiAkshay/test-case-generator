const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = new Set([
  'node_modules', '.git', '.svn', '.hg', 'dist', 'build', '.next',
  '__pycache__', '.venv', 'venv', 'coverage', '.nyc_output', '.cache',
  '.parcel-cache', '.turbo', '.vercel', '.netlify',
]);

const IGNORE_FILES = new Set([
  '.DS_Store', 'Thumbs.db', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
]);

/**
 * Recursively scan a directory and return a structured file tree
 * Returns: { name, type: 'file'|'dir', children?, extension?, size? }
 */
const scanDirectory = (dirPath, relativePath = '') => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = [];

  // Sort: directories first, then files, both alphabetically
  const sorted = entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const entry of sorted) {
    if (IGNORE_DIRS.has(entry.name) && entry.isDirectory()) continue;
    if (IGNORE_FILES.has(entry.name)) continue;
    if (entry.name.startsWith('.') && entry.isDirectory()) continue;

    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.join(relativePath, entry.name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      const children = scanDirectory(fullPath, relPath);
      result.push({
        name: entry.name,
        path: relPath,
        type: 'dir',
        children,
      });
    } else {
      const stats = fs.statSync(fullPath);
      result.push({
        name: entry.name,
        path: relPath,
        type: 'file',
        extension: path.extname(entry.name).toLowerCase(),
        size: stats.size,
      });
    }
  }

  return result;
};

/**
 * Generate a text-based tree representation
 */
const generateTreeString = (tree, prefix = '', isLast = true) => {
  let result = '';

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    const last = i === tree.length - 1;
    const connector = last ? '└── ' : '├── ';
    const childPrefix = last ? '    ' : '│   ';

    result += `${prefix}${connector}${node.name}\n`;

    if (node.type === 'dir' && node.children?.length > 0) {
      result += generateTreeString(node.children, prefix + childPrefix);
    }
  }

  return result;
};

/**
 * Count files and directories in the tree
 */
const countEntries = (tree) => {
  let files = 0;
  let dirs = 0;

  for (const node of tree) {
    if (node.type === 'dir') {
      dirs++;
      if (node.children) {
        const sub = countEntries(node.children);
        files += sub.files;
        dirs += sub.dirs;
      }
    } else {
      files++;
    }
  }

  return { files, dirs };
};

/**
 * Collect all file paths (flat list)
 */
const collectFilePaths = (tree, result = []) => {
  for (const node of tree) {
    if (node.type === 'file') {
      result.push(node.path);
    } else if (node.children) {
      collectFilePaths(node.children, result);
    }
  }
  return result;
};

/**
 * Detect languages by file extension
 */
const detectLanguages = (tree) => {
  const extMap = {
    '.js': 'JavaScript', '.jsx': 'JavaScript', '.mjs': 'JavaScript',
    '.ts': 'TypeScript', '.tsx': 'TypeScript',
    '.py': 'Python',
    '.java': 'Java',
    '.rb': 'Ruby',
    '.go': 'Go',
    '.rs': 'Rust',
    '.php': 'PHP',
    '.cs': 'C#',
    '.cpp': 'C++', '.cc': 'C++', '.cxx': 'C++',
    '.c': 'C', '.h': 'C',
    '.swift': 'Swift',
    '.kt': 'Kotlin',
    '.dart': 'Dart',
    '.vue': 'Vue',
    '.svelte': 'Svelte',
  };

  const files = collectFilePaths(tree);
  const langSet = new Set();

  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    if (extMap[ext]) langSet.add(extMap[ext]);
  }

  return Array.from(langSet).sort();
};

module.exports = { scanDirectory, generateTreeString, countEntries, collectFilePaths, detectLanguages };
