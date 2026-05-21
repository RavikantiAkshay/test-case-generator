# AI-Powered Test Case Generator — Project Specification

## Project Overview

Build a full-stack AI-powered platform that generates intelligent test cases using user prompts, repository context, uploaded code, API definitions, historical generations, and AI memory embeddings. The platform must help developers automatically generate unit tests, integration tests, API tests, edge-case tests, validation tests, and negative test cases. The system must continuously improve generation quality through feedback loops, embedding memory, and prompt refinement.

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Zustand.
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT authentication.
**AI Integration:** Groq API using an OpenAI-compatible SDK.
**Vector Embeddings:** Stored in MongoDB.

## Core Features

### Authentication
- Signup, login, logout
- JWT authentication with protected routes
- Persistent sessions

### Project Management
- Create projects
- Upload repositories as ZIP files
- Connect GitHub repositories
- View saved generations
- Manage project workspaces

### Repository Analysis
- Scan repository files
- Detect frontend framework
- Detect backend framework
- Detect API routes
- Detect database models
- Detect services
- Generate folder structure summaries
- Supported ecosystems: React, Node.js, Express.js, MongoDB, JavaScript, TypeScript

### AI Test Generation
- Users provide a testing goal, a code snippet or repository, and optional testing instructions
- Generate: unit tests, integration tests, API tests, edge-case tests, validation tests, mock data, expected outputs
- All generated outputs must be editable, support regeneration, and support export

### Memory Embedding System
- Store generated test cases
- Generate embeddings for each generation
- Retrieve similar historical generations
- Improve future AI outputs through context retrieval

### Feedback Loop
- Approve, reject, rate, and regenerate generations
- All feedback stored for future prompt optimization

### AI Chat Assistant
- Respond to: "explain this test", "generate additional edge cases", "improve assertions", "identify missing tests", "explain coverage gaps"
- Uses repository context, previous generations, and embedding retrieval

### Export System
- Markdown export
- PDF export
- JSON export
- Copy-to-clipboard

## Frontend Pages

| Page | Key Components |
|------|----------------|
| Landing Page | Hero section, product introduction, feature showcase, auth buttons |
| Signup Page | Registration form with validation |
| Login Page | Login form with validation |
| Dashboard | All user projects, recent generations, project statistics, empty states |
| Project Workspace | Repository overview, generated tests, generation form, AI chat panel, export controls, generation history |
| Repository Analysis View | Detected technologies, detected routes, folder structure, architecture summary |

## Backend Architecture

| Layer | Responsibility |
|-------|----------------|
| Routes | API routing, middleware usage, request validation |
| Controllers | Handle requests, format responses |
| Services | AI orchestration, repository analysis, embedding workflows, test generation logic |
| AI Engine | Prompt construction, context retrieval, generation refinement, AI communication |

## Database Collections

### Users
- name, email, password, createdAt

### Projects
- userId, projectName, repositoryUrl, repositorySummary, detectedTechnologies, createdAt

### Generations
- projectId, generationType, generatedContent, qualityScore, feedback, createdAt

### Embeddings
- projectId, embedding, content, metadata

### Chats
- projectId, userMessage, assistantMessage, createdAt

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/signup | Create account |
| POST | /api/auth/login | Log in |
| POST | /api/projects | Create a project |
| GET | /api/projects | List projects |
| GET | /api/projects/:id | Get project details |
| POST | /api/repositories/upload | Upload a ZIP repository |
| POST | /api/repositories/github | Import a GitHub repository |
| POST | /api/generate/tests | Generate test cases |
| POST | /api/generate/regenerate | Regenerate test cases |
| POST | /api/chat | Project-aware AI assistant |
| GET | /api/export/markdown/:projectId | Markdown export |
| GET | /api/export/pdf/:projectId | PDF export |
| GET | /api/export/json/:projectId | JSON export |

## Folder Structure

```
client/
  src/
    api/
    components/
    pages/
    store/
    hooks/
    layouts/
    routes/
    utils/

server/
  src/
    config/
    routes/
    controllers/
    services/
    middlewares/
    models/
    ai/
    embeddings/
    parsing/
    utils/
    validators/
```

## Development Phases

1. **Phase 1** — Frontend & backend initialization, MongoDB connection, authentication system
2. **Phase 2** — Dashboard, project CRUD, repository upload
3. **Phase 3** — File scanning, technology detection, architecture summaries
4. **Phase 4** — Prompt system, AI integration, test generation, regeneration
5. **Phase 5** — Embedding generation, semantic retrieval, historical context enhancement
6. **Phase 6** — AI chat assistant, Markdown export, PDF export, JSON export

## UI/UX Requirements
- Dark mode support
- Fully responsive
- Loading states and skeleton loaders
- Syntax-highlighted code blocks
- Editable generated content
- Clean developer-focused design

## Security Requirements
- Hash passwords (bcrypt)
- Validate JWT tokens
- Sanitize uploads
- Validate repository URLs
- Secure environment variables
- Prevent prompt injection
- Validate request payloads

## Final Expected Outcome
The completed platform must intelligently understand repositories, generate high-quality test cases, improve generation quality over time, support AI-assisted QA workflows, and scale to support developer productivity workflows. The final application should feel like modern AI developer tooling.
