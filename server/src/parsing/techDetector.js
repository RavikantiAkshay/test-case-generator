const fs = require('fs');
const path = require('path');
const { collectFilePaths } = require('./fileScanner');

/**
 * Detect technologies from package.json dependencies and file extensions
 */
const detectTechnologies = (repoPath, fileTree) => {
  const technologies = [];
  const files = collectFilePaths(fileTree);

  // --- package.json analysis ---
  const pkgPath = path.join(repoPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      };

      const depMap = {
        // Frameworks
        'react': { name: 'React', category: 'framework' },
        'next': { name: 'Next.js', category: 'framework' },
        'vue': { name: 'Vue', category: 'framework' },
        'nuxt': { name: 'Nuxt', category: 'framework' },
        'svelte': { name: 'Svelte', category: 'framework' },
        '@angular/core': { name: 'Angular', category: 'framework' },
        'express': { name: 'Express', category: 'framework' },
        'fastify': { name: 'Fastify', category: 'framework' },
        'koa': { name: 'Koa', category: 'framework' },
        'hono': { name: 'Hono', category: 'framework' },
        'nestjs': { name: 'NestJS', category: 'framework' },
        '@nestjs/core': { name: 'NestJS', category: 'framework' },
        'django': { name: 'Django', category: 'framework' },
        'flask': { name: 'Flask', category: 'framework' },

        // Databases
        'mongoose': { name: 'MongoDB (Mongoose)', category: 'database' },
        'mongodb': { name: 'MongoDB', category: 'database' },
        'pg': { name: 'PostgreSQL', category: 'database' },
        'mysql2': { name: 'MySQL', category: 'database' },
        'sequelize': { name: 'Sequelize ORM', category: 'database' },
        'prisma': { name: 'Prisma', category: 'database' },
        '@prisma/client': { name: 'Prisma', category: 'database' },
        'typeorm': { name: 'TypeORM', category: 'database' },
        'redis': { name: 'Redis', category: 'database' },
        'ioredis': { name: 'Redis', category: 'database' },

        // Testing
        'jest': { name: 'Jest', category: 'testing' },
        'mocha': { name: 'Mocha', category: 'testing' },
        'vitest': { name: 'Vitest', category: 'testing' },
        'cypress': { name: 'Cypress', category: 'testing' },
        'playwright': { name: 'Playwright', category: 'testing' },
        '@testing-library/react': { name: 'Testing Library', category: 'testing' },
        'supertest': { name: 'Supertest', category: 'testing' },
        'chai': { name: 'Chai', category: 'testing' },

        // Tools
        'tailwindcss': { name: 'Tailwind CSS', category: 'tool' },
        'typescript': { name: 'TypeScript', category: 'language' },
        'webpack': { name: 'Webpack', category: 'tool' },
        'vite': { name: 'Vite', category: 'tool' },
        'eslint': { name: 'ESLint', category: 'tool' },
        'prettier': { name: 'Prettier', category: 'tool' },
        'docker-compose': { name: 'Docker', category: 'tool' },
        'jsonwebtoken': { name: 'JWT Auth', category: 'tool' },
        'passport': { name: 'Passport.js', category: 'tool' },
        'socket.io': { name: 'Socket.IO', category: 'tool' },
        'graphql': { name: 'GraphQL', category: 'tool' },
        'axios': { name: 'Axios', category: 'tool' },
      };

      const seen = new Set();
      for (const dep of Object.keys(allDeps)) {
        const match = depMap[dep];
        if (match && !seen.has(match.name)) {
          seen.add(match.name);
          technologies.push({ ...match, confidence: 1 });
        }
      }
    } catch {
      // Invalid package.json — skip
    }
  }

  // --- File-based detection ---
  const hasFile = (name) => files.some((f) => f === name || f.endsWith(`/${name}`));

  if (hasFile('Dockerfile') || hasFile('docker-compose.yml')) {
    technologies.push({ name: 'Docker', category: 'tool', confidence: 1 });
  }
  if (hasFile('tsconfig.json')) {
    if (!technologies.some((t) => t.name === 'TypeScript')) {
      technologies.push({ name: 'TypeScript', category: 'language', confidence: 1 });
    }
  }
  if (hasFile('requirements.txt') || hasFile('setup.py') || hasFile('pyproject.toml')) {
    technologies.push({ name: 'Python', category: 'language', confidence: 0.9 });
  }
  if (hasFile('.env') || hasFile('.env.example')) {
    technologies.push({ name: 'Dotenv', category: 'tool', confidence: 0.8 });
  }

  // Deduplicate by name
  const unique = [];
  const nameSet = new Set();
  for (const tech of technologies) {
    if (!nameSet.has(tech.name)) {
      nameSet.add(tech.name);
      unique.push(tech);
    }
  }

  return unique;
};

module.exports = { detectTechnologies };
