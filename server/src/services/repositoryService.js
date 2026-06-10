const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const AdmZip = require('adm-zip');
const logger = require('../utils/logger');

const REPOS_DIR = path.join(__dirname, '../../repos');

// Ensure repos directory exists
if (!fs.existsSync(REPOS_DIR)) {
  fs.mkdirSync(REPOS_DIR, { recursive: true });
}

/**
 * Extract a ZIP file to a project-specific directory
 */
const extractZip = async (zipFilePath, projectId) => {
  const destDir = path.join(REPOS_DIR, projectId.toString());

  // Clean up if directory already exists
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });

  try {
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(destDir, true);

    // If the ZIP contains a single root folder, flatten it
    const entries = fs.readdirSync(destDir);
    if (entries.length === 1) {
      const singleEntry = path.join(destDir, entries[0]);
      if (fs.statSync(singleEntry).isDirectory()) {
        const innerFiles = fs.readdirSync(singleEntry);
        for (const file of innerFiles) {
          fs.renameSync(path.join(singleEntry, file), path.join(destDir, file));
        }
        fs.rmdirSync(singleEntry);
      }
    }

    logger.success(`ZIP extracted to: ${destDir}`);

    // Clean up the uploaded ZIP
    fs.unlinkSync(zipFilePath);

    return destDir;
  } catch (error) {
    // Clean up on error
    if (fs.existsSync(destDir)) {
      fs.rmSync(destDir, { recursive: true, force: true });
    }
    throw new Error(`Failed to extract ZIP: ${error.message}`);
  }
};

/**
 * Clone a GitHub repository to a project-specific directory
 */
const cloneGithubRepo = async (repoUrl, projectId) => {
  const destDir = path.join(REPOS_DIR, projectId.toString());

  // Clean up if directory already exists
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }

  try {
    let cleanUrl = repoUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(cleanUrl);
    } catch (e) {
      throw new Error('Invalid URL format');
    }

    if (parsedUrl.hostname !== 'github.com' && !parsedUrl.hostname.endsWith('.github.com')) {
      throw new Error('Only GitHub repositories are supported');
    }

    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) {
      throw new Error('Invalid GitHub repository URL. Must include owner and repository name.');
    }

    const owner = pathParts[0];
    const repo = pathParts[1].replace(/\.git$/, '');

    // Check for token in env variables
    const token = process.env.GITHUB_TOKEN || process.env.GIT_TOKEN;
    let cloneUrl = `https://github.com/${owner}/${repo}.git`;
    if (token) {
      // Use token authentication for clone
      cloneUrl = `https://x-access-token:${token}@github.com/${owner}/${repo}.git`;
    }

    execSync(`git clone --depth 1 "${cloneUrl}" "${destDir}"`, {
      timeout: 60000, // 60s timeout
      stdio: 'pipe',
    });

    // Remove .git directory to save space
    const gitDir = path.join(destDir, '.git');
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }

    logger.success(`GitHub repo cloned to: ${destDir}`);
    return destDir;
  } catch (error) {
    if (fs.existsSync(destDir)) {
      fs.rmSync(destDir, { recursive: true, force: true });
    }
    throw new Error(`Failed to clone repository: ${error.message}`);
  }
};

module.exports = { extractZip, cloneGithubRepo };
