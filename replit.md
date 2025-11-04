# PromptStudio - AI Video Prompt Generator

## Overview

PromptStudio is a web application for generating professional AI video prompts. It enables users to create multi-scene video projects with customizable parameters optimized for AI video generation platforms like Google Veo 3, OpenAI Sora 2, Runway Gen-3, and others. The application offers two modes: Manual Mode for direct parameter control and AI Mode for intelligent prompt enhancement using GPT-4.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, configured for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (instead of React Router)
- **Path aliases** configured via `tsconfig.json` and `vite.config.ts` for clean imports (`@/`, `@shared/`, `@assets/`)

**UI Component System**
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for styling with custom design tokens
- Component configuration in `components.json` specifying the "new-york" style variant
- **Design system** inspired by Linear and Material Design (documented in `design_guidelines.md`)
- Custom color system using CSS variables for theme consistency
- Typography: Inter for UI elements, IBM Plex Mono for generated prompts

**State Management**
- **TanStack Query (React Query)** for server state management and caching
- Local component state with React hooks for UI state
- Custom query client configuration with credential-based requests and infinite stale time

**Layout Structure**
- Collapsible sidebar navigation (16rem width) using shadcn/ui Sidebar component
- Main content area with responsive grid layouts
- 60/40 split for parameters panel and output preview on desktop
- Mobile-responsive with single column stack and collapsible sidebar

### Backend Architecture

**Server Framework**
- **Express.js** as the HTTP server
- **TypeScript** with ES modules
- Custom Vite middleware integration for development with HMR
- Request/response logging middleware with JSON response capture

**API Design**
- RESTful endpoint: `POST /api/generate-prompt`
- Accepts `description`, `parameters`, and `mode` (manual/ai) in request body
- Returns generated or enhanced prompts as JSON

**AI Integration**
- **OpenAI GPT-4** integration for AI-enhanced prompt generation
- System prompt engineered for video prompt optimization
- Temperature set to 0.8 for creative variety
- Max tokens: 500 for concise but comprehensive prompts
- Manual mode builds prompts from parameter combinations without AI

**Session Management**
- In-memory storage implementation (`MemStorage` class)
- User authentication schema defined but not actively used in current routes
- Designed for future session-based authentication with `connect-pg-simple`

### Data Storage Solutions

**Database Configuration**
- **PostgreSQL** via Neon serverless driver (`@neondatabase/serverless`)
- **Drizzle ORM** for type-safe database operations
- Schema defined in `shared/schema.ts` with Zod validation
- Migration configuration in `drizzle.config.ts` pointing to PostgreSQL

**Schema Design**
- `users` table with UUID primary keys, username, and password fields
- TypeScript interfaces for `Scene`, `SceneParameters`, `Project`, and `Favorite`
- `SceneParameters` includes 20+ optional fields (tone, lighting, camera movement, aspect ratio, etc.)
- Shared types between frontend and backend via `shared/` directory

**Current State**
- Application currently uses in-memory storage for development
- Database schema prepared for production deployment
- Drizzle migrations ready in `migrations/` directory

### External Dependencies

**AI Services**
- **OpenAI API** (GPT-4) for prompt enhancement in AI mode
- API key configuration via `OPENAI_API_KEY` environment variable

**Database Services**
- **Neon PostgreSQL** serverless database
- Connection string via `DATABASE_URL` environment variable

**UI Component Libraries**
- **Radix UI** primitives (20+ components: Dialog, Dropdown, Select, Tabs, Toast, etc.)
- **Lucide React** for consistent icon system
- **class-variance-authority** for component variant management
- **cmdk** for command palette functionality

**Form & Validation**
- **React Hook Form** with `@hookform/resolvers`
- **Zod** for runtime schema validation
- **drizzle-zod** for automatic schema generation from database models

**Development Tools**
- **Replit-specific plugins** for development experience (@replit/vite-plugin-runtime-error-modal, cartographer, dev-banner)
- **PostCSS** with Tailwind and Autoprefixer

**Build & Deployment**
- Production build uses `esbuild` for server bundling
- Server runs on Node.js with ES modules
- Static assets served from `dist/public/`