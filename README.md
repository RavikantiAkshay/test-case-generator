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

## Features

- Express server with MongoDB, CORS, centralized error handling
- JWT authentication (signup, login, protected routes)
- Project CRUD (create, list, get, update, delete)
- ZIP repository upload with auto-extraction (50MB limit)
- GitHub repository import via shallow clone
- Dashboard with project grid, skeleton loading, and create modal
- Project detail page with repository upload/import UI
- Monochrome UI with dark mode (system preference detection)
- Reusable component library: Button, Input, Modal, Skeleton, ProjectCard
- Repository analysis engine: detects frameworks, databases, tools, and testing libraries
- Route detector: parses Express and NestJS routing decorators/methods
- Model detector: parses Mongoose schema definitions and extracts collection fields
- File tree scanner: generates directory structures and counts files/directories

## License

MIT