# Decode & Dominate 2.0

## Overview

A cyber-themed event dashboard web application for "Decode & Dominate" - a multi-round coding competition. The platform features a secure participant portal with admin-controlled access to three competition rounds (Quiz, Debug, Clone), complete with proctoring features and anti-cheat mechanisms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side navigation (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state management and caching
- **Styling**: Tailwind CSS v4 with custom cyber/neon theme (purple, cyan, magenta accents)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Layout**: Fixed left sidebar dashboard (25%) with dynamic main content area (75%)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Session Management**: Express-session with MemoryStore (development) or connect-pg-simple (production)
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod with drizzle-zod integration
- **Storage Pattern**: Abstract IStorage interface with MemStorage implementation (easily swappable to database-backed storage)

### Authentication & Authorization
- **Session-based authentication** with cookie storage
- **Role-based access control**: Admin and Participant roles
- **Per-round access control**: Each user has independent access status (locked/active/disqualified) for rounds 1-3
- **Admin can manage user access** through dedicated admin routes

### Security Features (Anti-Cheat)
- Custom useProctoring hook implementing:
  - Tab switch detection (visibility change API)
  - Copy/paste protection
  - Right-click context menu blocking
  - Window blur detection
- Round pages enforce access restrictions based on user's access status

### Key Design Decisions
1. **In-memory storage by default**: Uses MemStorage class for development, designed to be replaced with database storage when DATABASE_URL is configured
2. **Shared schema location**: Database schema lives in `/shared/schema.ts` for use by both client and server
3. **Path aliases**: `@/` maps to client source, `@shared/` maps to shared modules
4. **API pattern**: All API routes prefixed with `/api/`, client uses fetch with credentials included

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle Kit**: Database migrations and schema push (`npm run db:push`)

### UI/Design
- **Radix UI**: Headless component primitives for accessibility
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **Google Fonts**: Orbitron (display), Inter (sans), Space Grotesk (mono)

### Development Tools
- **Vite plugins**: Runtime error overlay, cartographer (Replit-specific), dev banner
- **Custom meta-images plugin**: Updates OpenGraph images for Replit deployments

### Session Storage
- **MemoryStore**: Development session storage
- **connect-pg-simple**: PostgreSQL session storage for production