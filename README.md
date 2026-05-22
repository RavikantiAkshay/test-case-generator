# TestGenAI

AI-powered test case generator. Upload a repository, let AI analyze the architecture, and generate comprehensive test suites — unit, integration, API, and edge cases.

## Tech Stack

| Layer    | Technology                            |
|----------|---------------------------------------|
| Frontend | React, Vite, Tailwind CSS, Zustand    |
| Backend  | Node.js, Express, MongoDB, Mongoose   |
| Auth     | JWT, bcrypt                           |
| AI       | Groq (planned)                        |

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios client & API wrappers
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Page layouts (Auth, Main)
│   │   ├── pages/          # Route-level pages
│   │   ├── routes/         # React Router config
│   │   ├── store/          # Zustand state stores
│   │   └── index.css       # Design system
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Auth, error handling
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Logger, helpers
│   │   └── validators/     # Input validation
│   └── server.js
│
├── spec.md                 # Full project specification
└── tasks.md                # Phase-by-phase task tracker
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

```bash
# Clone
git clone https://github.com/RavikantiAkshay/test-case-generator.git
cd test-case-generator

# Backend
cd server
cp .env.example .env        # Fill in MONGODB_URI, JWT_SECRET
npm install
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to port 5000.

### Environment Variables

**server/.env**

| Variable       | Description             |
|----------------|-------------------------|
| `PORT`         | Server port (5000)      |
| `MONGODB_URI`  | MongoDB connection URI  |
| `JWT_SECRET`   | JWT signing key         |
| `CLIENT_URL`   | Frontend URL            |
| `GROQ_API_KEY` | Groq API key (Phase 4)  |

## API Endpoints

### Auth

| Method | Endpoint          | Auth | Description           |
|--------|-------------------|------|-----------------------|
| POST   | `/api/auth/signup` | No   | Create account        |
| POST   | `/api/auth/login`  | No   | Login, returns JWT    |
| GET    | `/api/auth/me`     | Yes  | Get current user      |

### Projects

| Method | Endpoint             | Auth | Description           |
|--------|----------------------|------|-----------------------|
| POST   | `/api/projects`      | Yes  | Create project        |
| GET    | `/api/projects`      | Yes  | List user's projects  |
| GET    | `/api/projects/:id`  | Yes  | Get project detail    |
| PATCH  | `/api/projects/:id`  | Yes  | Update project        |
| DELETE | `/api/projects/:id`  | Yes  | Delete project        |

### Repositories

| Method | Endpoint                   | Auth | Description             |
|--------|----------------------------|------|-------------------------|
| POST   | `/api/repositories/upload` | Yes  | Upload ZIP repository   |
| POST   | `/api/repositories/github` | Yes  | Import GitHub repository|
| POST   | `/api/repositories/analyze/:projectId` | Yes | Re-run repository analysis |

### AI Generation

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST   | `/api/generate` | Yes | Generate test cases |
| POST   | `/api/generate/regenerate` | Yes | Regenerate test cases |
| PATCH  | `/api/generate/:id/feedback` | Yes | Update generation feedback |
| PATCH  | `/api/generate/:id/content` | Yes | Inline edit generated content |
| GET    | `/api/generate/project/:projectId` | Yes | List project generations |

## Features

- **Secure Authentication**: JWT-based signup and login flows with hashed passwords.
- **Project Workspace**: Centralized dashboard to manage multiple codebases with full CRUD capabilities.
- **Repository Integration**: Import projects seamlessly via GitHub URL or direct ZIP upload (with auto-extraction).
- **Deep Architecture Analysis**: Automatically scans imported code to detect frameworks, databases, API routes, and database schemas.
- **Context-Aware AI Generation**: Leverages the Groq API to generate tailored test cases (unit, integration, e2e) based on your repository's specific stack and structure.
- **Interactive Test Workspace**: View syntax-highlighted test code, edit outputs inline, and request targeted AI regenerations.
- **Feedback Loop**: Provide approvals or rejections to generations to build context for future prompts.
- **Premium Monochrome UI**: A meticulously crafted, distraction-free grayscale interface with automatic system dark-mode detection.

## License

MIT