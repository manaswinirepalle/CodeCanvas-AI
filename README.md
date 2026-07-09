# 🎨 CodeCanvas AI

**From Prompt to Production.**

CodeCanvas AI is an enterprise-grade AI-powered software development platform. Describe your idea in natural language and our multi-agent AI system designs, builds, tests, and deploys production-ready applications.

---

## ✨ Features

### 🤖 AI-Powered Development
- **Prompt to Website** – Describe and generate complete websites
- **12 Specialized AI Agents** – Planner, UI Designer, Frontend, Backend, Database, API, Testing, Security, Performance, SEO, Deployment, Documentation
- **Natural Language Interface** – Build software by describing what you want
- **AI Autocomplete** – Intelligent code completion across the editor
- **Smart Refactoring** – AI-powered code optimization and bug fixing

### 🎨 Visual Website Builder
- Drag-and-drop interface with real-time editing
- Responsive design controls
- Theme customization with color picker
- Typography and spacing controls
- History with undo/redo
- Live preview and export

### 💻 Code Editor
- Full-featured IDE with syntax highlighting
- File explorer with project tree
- Integrated terminal
- Git version control
- Live preview pane
- Multiple language support

### 🚀 One-Click Deployment
- Global CDN with edge caching
- Custom domain support with SSL
- Automatic HTTPS
- Environment variable management
- Deployment history with rollback
- Production monitoring

### 👥 Team Collaboration
- Real-time collaborative editing
- Comments and mentions
- Shared workspaces
- Role-based access control
- Activity logging
- Version history

### 📊 Analytics & Monitoring
- Traffic analytics
- User behavior tracking
- Performance monitoring
- SEO analysis
- Core Web Vitals
- Error tracking
- API usage metrics

---

## 🏗️ Architecture

```
codecanvas-ai/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   ├── api/          # NestJS backend API
│   └── worker/       # Background job processor
├── packages/
│   ├── database/     # Prisma schema and client
│   ├── shared/       # Shared types, utils, validators
│   ├── ui/           # Shared UI component library
│   └── config/       # Shared configurations
├── docker/           # Docker configurations
├── .github/          # CI/CD pipelines
└── docs/             # Documentation
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | NestJS, TypeScript, Passport.js, JWT |
| **Database** | PostgreSQL 16, Prisma ORM, Redis 7 |
| **AI** | OpenAI GPT-4, Anthropic Claude 3 |
| **DevOps** | Docker, GitHub Actions, AWS, Cloudflare |
| **Monitoring** | Sentry, Lighthouse, Core Web Vitals |
| **Billing** | Stripe |
| **Auth** | JWT, OAuth 2.0 (Google, GitHub), OTP |

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose
- PostgreSQL 16
- Redis 7

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/codecanvas-ai.git
cd codecanvas-ai

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start infrastructure (PostgreSQL & Redis)
docker compose -f docker/docker-compose.dev.yml up -d postgres redis

# Generate Prisma client and push schema
pnpm run db:generate
pnpm run db:push

# Seed the database (optional)
pnpm run db:seed

# Start development servers
pnpm run dev
```

The application will be available at:
- **Web**: http://localhost:3000
- **API**: http://localhost:4000
- **API Docs**: http://localhost:4000/api/docs

### Using Docker (Full Stack)

```bash
# Start all services
docker compose -f docker/docker-compose.dev.yml up

# Or run in background
docker compose -f docker/docker-compose.dev.yml up -d
```

---

## 📦 Project Structure

### Apps

#### `apps/web` – Frontend Application
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Components**: Radix UI primitives + custom components
- **State**: Zustand for global state
- **Forms**: React Hook Form + Zod validation
- **Animation**: Framer Motion
- **Theming**: next-themes (dark/light mode)

#### `apps/api` – Backend API
- **Framework**: NestJS with modular architecture
- **Auth**: JWT + Passport (Google, GitHub strategies)
- **Database**: Prisma ORM with PostgreSQL
- **Caching**: Redis via ioredis
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate limiting
- **Queues**: Bull with Redis

#### `apps/worker` – Background Jobs
- Job processing with Bull queues
- Email sending, deployment builds, AI processing
- Analytics aggregation

### Packages

#### `packages/database` – Database Layer
- Prisma schema with full data model
- Type-safe database client
- Migration management
- Seed scripts

#### `packages/shared` – Shared Code
- TypeScript types and interfaces
- Zod validation schemas
- Utility functions
- Constants and enums

#### `packages/ui` – UI Component Library
- Reusable React components
- Design system primitives
- Storybook documentation

---

## 🔐 Authentication Flow

```
1. User visits app → redirected to login
2. Options: Email/Password, Google, GitHub
3. On success → JWT access token (15min) + Refresh token (7d)
4. Access token stored in memory, refresh in localStorage
5. API calls include Bearer token in Authorization header
6. Token refresh via /api/v1/auth/refresh
7. On logout → refresh token invalidated
```

---

## 🤖 AI Multi-Agent System

### Agent Collaboration Pipeline

```
User Prompt
    ↓
[Planner Agent] – Analyzes requirements, creates architecture plan
    ↓
[UI Designer Agent] – Generates visual design and layout
    ↓
[Frontend Agent] – Creates React/Next.js components
    ↓
[Backend Agent] – Builds API endpoints and services
    ↓
[Database Agent] – Designs schema and queries
    ↓
[API Agent] – Defines API contracts and documentation
    ↓
[Testing Agent] – Generates test suites
    ↓
[Security Agent] – Audits for vulnerabilities
    ↓
[Performance Agent] – Optimizes for speed
    ↓
[SEO Agent] – Optimizes for search engines
    ↓
[Deployment Agent] – Configures deployment
    ↓
[Documentation Agent] – Creates documentation
    ↓
Production-Ready Application
```

### Agent System Prompts

Each agent has a specialized system prompt that defines its expertise:
- **Planner**: Software architecture and system design
- **UI Designer**: Visual design with Tailwind CSS, glassmorphism, animations
- **Frontend**: React/Next.js with TypeScript, modern patterns
- **Backend**: NestJS with validation, security, error handling
- **Database**: PostgreSQL schema design with Prisma
- **API**: RESTful design with proper typing
- **Testing**: Unit, integration, e2e test generation
- **Security**: Vulnerability detection and remediation
- **Performance**: Optimization strategies
- **SEO**: Metadata, structured data, sitemaps
- **Deployment**: Docker, CI/CD configuration
- **Documentation**: Technical writing and API docs

---

## 🔄 API Overview

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login with credentials |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Invalidate session |
| GET | `/api/v1/auth/me` | Get current user |
| GET | `/api/v1/auth/google` | Google OAuth login |
| GET | `/api/v1/auth/github` | GitHub OAuth login |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/projects` | List user projects |
| POST | `/api/v1/projects` | Create project |
| GET | `/api/v1/projects/:id` | Get project details |
| PATCH | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |
| POST | `/api/v1/projects/:id/duplicate` | Duplicate project |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/ai/generate` | Generate with AI agent |
| POST | `/api/v1/ai/chat/:sessionId` | Chat in AI session |
| GET | `/api/v1/ai/sessions/:projectId` | List AI sessions |
| GET | `/api/v1/ai/session/:sessionId` | Get session details |
| GET | `/api/v1/ai/usage` | Get AI usage stats |

### Deployments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/deployments` | Create deployment |
| GET | `/api/v1/deployments/project/:projectId` | List deployments |
| GET | `/api/v1/deployments/:id` | Get deployment details |
| POST | `/api/v1/deployments/:id/rollback` | Rollback deployment |
| GET | `/api/v1/deployments/stats` | Deployment statistics |

### Team & Workspace
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/workspaces` | List workspaces |
| POST | `/api/v1/workspaces` | Create workspace |
| GET | `/api/v1/workspaces/:id` | Get workspace |
| GET | `/api/v1/team/:workspaceId` | List team members |
| POST | `/api/v1/team/:workspaceId/invite` | Invite member |
| PATCH | `/api/v1/team/:workspaceId/members/:id` | Update role |
| DELETE | `/api/v1/team/:workspaceId/members/:id` | Remove member |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/files/:projectId` | List project files |
| POST | `/api/v1/files/:projectId` | Create file |
| GET | `/api/v1/files/detail/:fileId` | Get file content |
| PATCH | `/api/v1/files/:fileId` | Update file |
| DELETE | `/api/v1/files/:fileId` | Delete file |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/dashboard` | Dashboard stats |
| GET | `/api/v1/analytics/project/:projectId` | Project analytics |

---

## 🔒 Security

### Implemented Measures
- JWT-based authentication with short-lived access tokens
- Refresh token rotation on each use
- Passwords hashed with bcrypt (12 rounds)
- HTTPS enforced in production
- Helmet security headers
- CORS configured for trusted origins
- Rate limiting on all endpoints
- Input validation and sanitization
- SQL injection prevention via Prisma ORM
- XSS protection via Content Security Policy
- CSRF protection
- Role-based access control (RBAC)
- Session management with expiry
- Audit logging for sensitive actions
- Secure cookie configuration
- Environment variable validation

### Best Practices
- Regular dependency updates
- Security audit pipeline in CI
- No secrets in code
- Encrypted database connections
- Data encryption at rest
- Regular backup procedures

---

## 🚢 Deployment

### Production Architecture

```
                          ┌─────────────┐
                          │  Cloudflare  │
                          │   (CDN/DNS)  │
                          └──────┬──────┘
                                 │
                          ┌──────┴──────┐
                          │    NGINX     │
                          │  (Reverse   │
                          │   Proxy)    │
                          └──────┬──────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
              ┌─────┴─────┐ ┌───┴────┐ ┌───┴────┐
              │ Web (×2)  │ │API(×2) │ │ Worker │
              │ Next.js   │ │NestJS  │ │  Bull  │
              └─────┬─────┘ └───┬────┘ └───┬────┘
                    │            │            │
                    └────────────┼────────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
              ┌─────┴─────┐ ┌───┴────┐ ┌───┴────┐
              │PostgreSQL │ │  Redis │ │  S3    │
              │   16      │ │   7    │ │(Assets)│
              └───────────┘ └────────┘ └────────┘
```

### Environment Variables

See `.env.example` for all required variables.

Key variables:
- `DATABASE_URL` – PostgreSQL connection string
- `REDIS_URL` – Redis connection string
- `JWT_SECRET` – JWT signing secret
- `OPENAI_API_KEY` – OpenAI API key
- `STRIPE_SECRET_KEY` – Stripe secret key
- `AWS_ACCESS_KEY_ID` – AWS credentials
- `CLOUDFLARE_API_TOKEN` – Cloudflare API token

### Production Deployment

```bash
# Build and push Docker images
docker compose -f docker/docker-compose.prod.yml build
docker compose -f docker/docker-compose.prod.yml up -d

# Or use CI/CD (GitHub Actions)
git push origin main
```

---

## 📊 Performance

### Optimizations
- **Lazy Loading** – Components and routes loaded on demand
- **Code Splitting** – Automatic chunk splitting via Next.js
- **Image Optimization** – Next.js Image component with WebP/AVIF
- **Caching** – Redis caching for API responses
- **CDN** – Cloudflare global CDN for static assets
- **SSR/SSG** – Hybrid rendering strategy
- **Edge Rendering** – Edge functions for dynamic content
- **Bundle Analysis** – Regular bundle size monitoring
- **Tree Shaking** – Dead code elimination
- **Font Optimization** – Self-hosted, subset fonts

### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🧪 Testing Strategy

### Unit Tests
- Vitest for frontend components
- Jest for backend services
- Testing Library for React components
- Mock services and database

### Integration Tests
- API endpoint testing with Supertest
- Database integration tests
- Auth flow testing
- Rate limiting verification

### E2E Tests
- Playwright for critical user flows
- Authentication flow
- Project creation and editing
- Deployment pipeline
- Team collaboration features

```bash
# Run all tests
pnpm run test

# Run tests for specific package
pnpm --filter @codecanvas/api run test
pnpm --filter @codecanvas/web run test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Maintenance

---

## 📄 License

This project is licensed under the MIT License.

---

## 🌟 Roadmap

### Phase 1 – Foundation ✓
- [x] Project architecture
- [x] Authentication system
- [x] Database schema
- [x] Core API
- [x] Design system

### Phase 2 – AI Features
- [ ] Prompt-to-website pipeline
- [ ] Multi-agent orchestration
- [ ] Code generation with AI
- [ ] AI autocomplete
- [ ] Visual website builder

### Phase 3 – Collaboration
- [ ] Real-time editing
- [ ] Team workspaces
- [ ] Comments and reviews
- [ ] Version history

### Phase 4 – Enterprise
- [ ] Custom domains
- [ ] Advanced analytics
- [ ] SSO integration
- [ ] Audit logging
- [ ] Compliance (SOC 2)

---

Built with ❤️ by the CodeCanvas AI Team
