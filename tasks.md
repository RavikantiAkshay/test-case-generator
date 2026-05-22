# 📋 Tasks — AI-Powered Test Case Generator

> **Spec:** [spec.md](file:///e:/TestCaseGenerator/spec.md)
> **Plan:** [implementation_plan.md](file:///C:/Users/Akshay/.gemini/antigravity/brain/6db763ae-3ad9-4432-9edf-44baa14ffbec/artifacts/implementation_plan.md)

---

## Phase 1 — Foundation & Authentication

### 1A · Backend Initialization
- [x] Initialize `server/` with `npm init -y` and install dependencies (`express`, `mongoose`, `dotenv`, `cors`, `bcryptjs`, `jsonwebtoken`, `express-validator`, `multer`)
- [x] Create `server.js` — Express app, CORS, JSON parser, route mounting, error handler
- [x] Create `src/config/db.js` — Mongoose connection using `MONGODB_URI` env var
- [x] Create `src/middlewares/errorHandler.js` — centralized async error handler
- [x] Create `src/utils/logger.js` — simple console logger with timestamps

### 1B · User Model & Auth Backend
- [x] Create `src/models/User.js` — Mongoose schema: name, email (unique/indexed), password, createdAt
- [x] Create `src/validators/authValidator.js` — express-validator rules for signup & login
- [x] Create `src/services/authService.js` — register (bcrypt hash + save), login (compare + JWT sign)
- [x] Create `src/controllers/authController.js` — signup and login handlers
- [x] Create `src/routes/authRoutes.js` — POST `/signup`, POST `/login`
- [x] Create `src/middlewares/authMiddleware.js` — verify JWT, attach `req.user`

### 1C · Frontend Initialization
- [x] Scaffold `client/` with Vite React template
- [x] Install frontend dependencies (`tailwindcss`, `@tailwindcss/vite`, `react-router-dom`, `axios`, `zustand`, `react-icons`, `react-syntax-highlighter`)
- [x] Configure Tailwind with dark-mode class strategy
- [x] Create `src/index.css` — Tailwind directives, custom dark-theme CSS variables, base typography
- [x] Create `src/api/axiosClient.js` — Axios instance with base URL, JWT interceptor
- [x] Create `src/api/authApi.js` — signup() and login() functions

### 1D · Auth State & Pages
- [x] Create `src/store/authStore.js` — Zustand: user, token, isAuthenticated, login/logout actions
- [x] Create `src/layouts/AuthLayout.jsx` — centered card layout for forms
- [x] Create `src/pages/SignupPage.jsx` — registration form (name, email, password, confirm password)
- [x] Create `src/pages/LoginPage.jsx` — login form (email, password)
- [x] Create `src/components/auth/ProtectedRoute.jsx` — redirect to `/login` if not authenticated
- [x] Create `src/routes/AppRoutes.jsx` — define all application routes

### 1E · Landing Page
- [x] Create `src/pages/LandingPage.jsx` — hero section, product intro, feature showcase, auth CTA buttons
- [x] Style landing page with gradient backgrounds, micro-animations, and responsive layout

### 1F · Phase 1 Verification
- [ ] ✅ POST `/api/auth/signup` creates user and returns JWT
- [ ] ✅ POST `/api/auth/login` returns JWT for valid credentials
- [ ] ✅ Frontend signup → login → redirect to dashboard
- [ ] ✅ Protected routes redirect unauthenticated users to login
- [ ] ✅ Landing page renders correctly with hero and auth buttons

---

## Phase 2 — Dashboard & Project Management

### 2A · Project Model & CRUD Backend
- [x] Create `src/models/Project.js` — userId (ref), projectName, repositoryUrl, repositorySummary, detectedTechnologies, createdAt
- [x] Create `src/validators/projectValidator.js` — validate project creation payload
- [x] Create `src/services/projectService.js` — create, list (filter by userId), getById
- [x] Create `src/controllers/projectController.js` — CRUD handlers
- [x] Create `src/routes/projectRoutes.js` — POST `/`, GET `/`, GET `/:id` (all protected)

### 2B · Repository Upload & GitHub Import
- [x] Create `src/middlewares/uploadMiddleware.js` — Multer config for ZIP, 50 MB limit
- [x] Create `src/services/repositoryService.js` — extract ZIP to temp dir, clone GitHub repo
- [x] Create `src/controllers/repositoryController.js` — handle upload and GitHub import
- [x] Create `src/routes/repositoryRoutes.js` — POST `/upload`, POST `/github`

### 2C · Frontend Dashboard
- [x] Create `src/layouts/MainLayout.jsx` — sidebar navigation, top bar, main content area, user menu
- [x] Create `src/pages/DashboardPage.jsx` — project grid, stats bar, recent generations
- [x] Create `src/components/dashboard/ProjectCard.jsx` — project name, tech icons, updated date, actions
- [x] Create `src/components/dashboard/EmptyState.jsx` — illustrated empty state with CTA button
- [x] Create `src/components/dashboard/StatsGrid.jsx` — total projects, total generations, recent activity
- [x] Create `src/components/common/Button.jsx` — reusable button with variants (primary, secondary, ghost, danger)
- [x] Create `src/components/common/Input.jsx` — reusable input with label and error states
- [x] Create `src/components/common/Modal.jsx` — reusable modal/dialog component
- [x] Create `src/components/common/Skeleton.jsx` — skeleton loader component

### 2D · Frontend API & State
- [x] Create `src/api/projectApi.js` — createProject, listProjects, getProject
- [x] Create `src/api/repositoryApi.js` — uploadZip, importGithub
- [x] Create `src/store/projectStore.js` — Zustand: projects list, activeProject, CRUD actions

### 2E · Phase 2 Verification
- [ ] ✅ Create project via dashboard → appears in project list
- [ ] ✅ Upload ZIP → server extracts and stores files
- [ ] ✅ GitHub URL → server clones repo
- [ ] ✅ Dashboard shows project cards with stats
- [ ] ✅ Empty state renders when no projects exist

---

## Phase 3 — Repository Analysis

### 3A · Parsing Engine
- [x] Create `src/parsing/fileScanner.js` — recursively walk directory, ignore `node_modules`/`.git`, return file tree
- [x] Create `src/parsing/techDetector.js` — detect React, Express, MongoDB, TypeScript via `package.json` + extensions
- [x] Create `src/parsing/routeDetector.js` — parse Express files for `router.get/post/put/delete` patterns
- [x] Create `src/parsing/modelDetector.js` — parse Mongoose `Schema` definitions for collection names + fields

### 3B · Analysis Pipeline
- [x] Add analysis orchestration to `repositoryService.js` — scan → detect → summarize
- [x] Store analysis results on the Project document (`repositorySummary`, `detectedTechnologies`)
- [x] Generate folder-structure summary as a tree string

### 3C · Frontend Analysis View
- [x] Create `src/pages/RepoAnalysisPage.jsx` — tabbed view (Technologies, Routes, Models, Structure)
- [x] Create `src/components/repo/TechBadge.jsx` — colored badge per technology
- [x] Create `src/components/repo/FolderTree.jsx` — collapsible file tree component
- [x] Create `src/components/repo/RouteList.jsx` — table of detected API routes
- [x] Wire analysis view into project workspace with navigation tabs

### 3D · Phase 3 Verification
- [ ] ✅ Upload React+Express repo → both frameworks detected
- [ ] ✅ API routes extracted and listed correctly
- [ ] ✅ Mongoose models detected with field names
- [ ] ✅ Folder tree renders in the UI
- [ ] ✅ Analysis data persists on the Project document

---

## Phase 4 — AI Test Generation

### 4A · Groq AI Integration
- [ ] Install `groq-sdk` in server
- [ ] Create `src/ai/groqClient.js` — initialize Groq SDK, expose `chatCompletion()` method
- [ ] Create `src/ai/promptBuilder.js` — build structured prompts from goal + code + repo context + instructions
- [ ] Create `src/ai/contextRetriever.js` — stub returning empty context (Phase 5 fills this)

### 4B · Generation Backend
- [ ] Create `src/models/Generation.js` — projectId, generationType, generatedContent, qualityScore, feedback, createdAt
- [ ] Create `src/validators/generateValidator.js` — validate generation request payload
- [ ] Create `src/services/generateService.js` — orchestrate: prompt → Groq → parse → save
- [ ] Create `src/controllers/generateController.js` — generate and regenerate handlers
- [ ] Create `src/routes/generateRoutes.js` — POST `/tests`, POST `/regenerate`

### 4C · Frontend Generation UI
- [ ] Create `src/components/project/GenerationForm.jsx` — goal input, code textarea, instruction options, type checkboxes
- [ ] Create `src/components/project/TestCard.jsx` — syntax-highlighted output, edit/regenerate/feedback buttons
- [ ] Create `src/api/generateApi.js` — generate and regenerate API calls
- [ ] Create `src/pages/ProjectPage.jsx` — full workspace: repo overview, generation form, results, chat, exports
- [ ] Add loading states and skeleton loaders during AI processing

### 4D · Feedback System
- [ ] Add feedback controls to TestCard — approve 👍, reject 👎, star rating 1–5
- [ ] Create backend endpoint to update Generation feedback field
- [ ] Store feedback for future prompt optimization

### 4E · Phase 4 Verification
- [ ] ✅ Submit generation form → Groq returns test cases → rendered with syntax highlighting
- [ ] ✅ Regenerate produces new output for the same input
- [ ] ✅ Generated content is editable inline
- [ ] ✅ Feedback saves to database
- [ ] ✅ Loading skeleton appears during AI processing

---

## Phase 5 — Embedding & Memory System

### 5A · Embedding Generation
- [ ] Create `src/embeddings/embeddingService.js` — generate text embeddings via Groq or dedicated model
- [ ] Create `src/models/Embedding.js` — Mongoose schema: projectId, embedding (array), content, metadata
- [ ] Hook into `generateService.js` — auto-create embeddings after each generation

### 5B · Similarity Search
- [ ] Create `src/embeddings/similaritySearch.js` — cosine similarity over stored embeddings
- [ ] Implement top-K retrieval of similar past generations for a given prompt
- [ ] Add performance logging for retrieval latency

### 5C · Context Enhancement
- [ ] Update `src/ai/contextRetriever.js` — wire in similarity search for real context
- [ ] Update `promptBuilder.js` — inject historical examples into generation prompt
- [ ] Add "Similar Past Generations" section to the project workspace UI

### 5D · Phase 5 Verification
- [ ] ✅ After generation, embedding stored in MongoDB
- [ ] ✅ New generation retrieves similar past generations
- [ ] ✅ AI output quality improves with historical context
- [ ] ✅ Embedding retrieval completes in under 2 seconds

---

## Phase 6 — Chat Assistant & Exports

### 6A · AI Chat Assistant
- [ ] Create `src/models/Chat.js` — projectId, userMessage, assistantMessage, createdAt
- [ ] Create `src/services/chatService.js` — build chat prompt with repo context + generations + embeddings
- [ ] Create `src/controllers/chatController.js` and `src/routes/chatRoutes.js` — POST `/api/chat`
- [ ] Create `src/api/chatApi.js` on frontend
- [ ] Create `src/components/project/ChatPanel.jsx` — message list, input box, streaming-style display
- [ ] Integrate chat panel into ProjectPage as a slide-over or tab

### 6B · Export System
- [ ] Install `pdfkit` in server
- [ ] Create `src/services/exportService.js` — generate Markdown, PDF, JSON from project generations
- [ ] Create `src/controllers/exportController.js` and `src/routes/exportRoutes.js` — GET endpoints per format
- [ ] Create `src/api/exportApi.js` on frontend
- [ ] Create `src/components/project/ExportBar.jsx` — Markdown, PDF, JSON, Copy-to-clipboard buttons
- [ ] Integrate export bar into project workspace

### 6C · Final Polish
- [ ] Review all pages for responsive design (mobile, tablet, desktop breakpoints)
- [ ] Verify dark-mode toggle works globally with no visual artifacts
- [ ] Add smooth page transitions and micro-animations (hover effects, loading transitions)
- [ ] Add error toast notifications for failed API calls
- [ ] Add SEO meta tags to all pages (title, description, OG tags)
- [ ] Security audit: sanitize inputs, validate payloads, check JWT expiry handling

### 6D · Phase 6 Verification
- [ ] ✅ Chat assistant answers "explain this test" with project context
- [ ] ✅ Chat uses repo context and past generations
- [ ] ✅ Markdown export downloads valid `.md` file
- [ ] ✅ PDF export downloads valid `.pdf` file
- [ ] ✅ JSON export downloads valid `.json` file
- [ ] ✅ Copy-to-clipboard works for generated test content

---

## 🏁 End-to-End Acceptance Checklist

- [ ] Sign up a new user
- [ ] Log in with that user
- [ ] Create a new project
- [ ] Upload a ZIP repository
- [ ] View detected technologies and folder structure
- [ ] Generate test cases with a specific testing goal
- [ ] Edit a generated test case inline
- [ ] Regenerate a test case
- [ ] Rate a generation (approve/reject/star)
- [ ] Ask the chat assistant "explain this test"
- [ ] Export results as Markdown
- [ ] Export results as PDF
- [ ] Export results as JSON
- [ ] Log out → confirm protected routes redirect to login
- [ ] Verify dark mode on all pages
- [ ] Verify responsive layout on mobile viewport
