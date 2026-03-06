# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

UREP (Unified Registration Portal) is a Next.js 15 frontend application for the Federal Ministry of Youth Development (FMYD) in Nigeria. It provides a centralized platform for youth program registration, management, and analytics.

**Tech Stack:**
- Next.js 15 (App Router with Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Recharts for data visualization
- Nigerian States library for location data

## Common Development Commands

### Development
```bash
pnpm run dev           # Start dev server with Turbopack at http://localhost:3000
pnpm run build         # Production build with Turbopack
pnpm start             # Start production server
pnpm run lint          # Run ESLint checks
```

### Testing
⚠️ No test framework is currently configured. Check with the team before adding tests.

## Code Architecture

### Application Structure

The application follows Next.js 15 App Router conventions:

**Core Directories:**
- `src/app/` - Next.js pages and layouts (App Router)
- `src/components/` - Reusable React components
- `src/types/` - TypeScript type definitions
- `src/assets/` - Static assets
- `public/images/` - Public images served directly

### Key Application Routes

**Public Routes:**
- `/` - Homepage with program carousel and search
- `/terms` - Terms and conditions (accepts `?program=` query param)
- `/consent` - User consent page
- `/register` - Main registration form (accepts `?program=` query param)
- `/program_register` - Program-specific registration
- `/success` - Registration success confirmation
- `/program_info` - Detailed program information

**Program Pages:**
- `/programs/african_youth` - African/National Youth Day 2025
- `/programs/bakeprenuer` - Bakeprenuer Nigeria
- `/programs/national_youth` - National Youth Policy Validation Workshop
- `/programs/youth_migration` - Youth Migration Awareness Programme

**Admin Routes:**
- `/admin` - Main dashboard with statistics and charts
- `/admin/login` - Admin authentication
- `/admin/registrants` - Manage registrants
- `/admin/program` - Program management
- `/admin/analytics` - Analytics dashboard

### Program IDs

The system uses these program identifiers consistently across the codebase:
- `african_youth`
- `bakeprenuer`
- `national_youth`
- `youth_migration`

Always use these exact IDs when working with program-related features.

### Key Components

**TextField Component** (`src/components/TextField.tsx`)
Reusable form input component supporting:
- Text, email, password, and dropdown types
- Password visibility toggle (using Lucide icons)
- Validation error display
- Disabled and read-only states
- Required field indicators
- Custom styling via className prop

**FooterBar Component** (`src/components/FooterBar.tsx`)
Site footer with contact information and social links.

### Registration Flow Architecture

The registration system implements a multi-step NIN (National Identity Number) verification flow:

1. **NIN Entry** - User enters 11-digit NIN
2. **OTP Delivery Method Selection** - SMS or email
3. **OTP Generation** - System generates 6-digit OTP (demo mode displays in alert)
4. **OTP Verification** - User enters received OTP
5. **Auto-fill Demographics** - Name, DOB, gender auto-populated from NIN database
6. **Complete Registration** - Additional fields (state, LGA, education, etc.)

**Demo NIN Database** (defined in `/register/page.tsx`):
- See `DEMO_CREDENTIALS.md` for test NIN values
- Mock data includes: name, DOB, gender, phone number
- Used for development/testing without real NIN verification API

### Location Data Integration

The app uses the `nigerian-states` package for state and LGA (Local Government Area) data:
- States loaded from `nigerian-states/src/states.json`
- LGAs dynamically loaded when state is selected
- Handles two JSON formats: direct array and object with `lgas` property
- State/LGA cascading dropdowns in registration forms

### Styling and Theming

**Primary Brand Color:** `#277B12` (green)
**Secondary Color:** `#F9E79F` (light yellow/gold)

**Fonts:**
- Geist Sans (primary)
- Geist Mono (monospace)

**Tailwind Configuration:**
- Using Tailwind CSS v4 with PostCSS plugin
- Custom color scheme defined in `globals.css`
- Dark mode support with `prefers-color-scheme`

### TypeScript Configuration

**Path Aliases:**
- `@/*` maps to `./src/*`
- Use for all imports from src directory

**Example:**
```typescript
import { TextField } from '@/components';
import FooterBar from '@/components/FooterBar';
```

**Compiler Options:**
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler

### Data Visualization

Admin dashboard uses Recharts for analytics:
- Line charts for registration trends
- Pie charts for participant categories and participation types
- Bar charts for comparative data
- Responsive design with `ResponsiveContainer`

### Important Development Notes

**Image Assets:**
All images must be in `/public/images/` directory:
- `fmyd_logo.png` - FMYD logo (used as favicon)
- `urep_large.png` - UREP branding
- Program images: `chef_small.png`, `corpers.png`, `students.png`, `speaker.png`
- Decorative: `man1.png`, `man2.png`

**Turbopack:**
This project uses Next.js with Turbopack for faster builds and HMR. Both `dev` and `build` commands use `--turbopack` flag.

**Client Components:**
Most interactive pages use `'use client'` directive due to:
- State management with useState
- Router navigation with useRouter
- useEffect for side effects
- Event handlers

**Docker Support:**
Per project requirements, implement two Dockerfiles:
- `Dockerfile.dev` - Development environment
- `Dockerfile.prod` - Production environment
These should be referenced in GitHub workflow files.

## Project-Specific Patterns

### Form Validation
- Inline error messages displayed below fields
- Red border on invalid fields (`.border-red-500`)
- Required fields marked with red asterisk
- NIN must be exactly 11 digits
- Email validation via HTML5 type="email"

### Navigation
- Use Next.js `<Link>` component for internal navigation
- Query parameters passed via URL for program context
- Admin routes should check authentication status

### Component Structure
- Functional components with TypeScript interfaces
- Props interfaces defined inline above component
- Event handlers prefixed with `handle` (e.g., `handleStateChange`)
- State management using React hooks (useState, useEffect, useMemo)

### Code Organization Best Practices
- Keep server components in `src/app/` routes
- Extract reusable UI to `src/components/`
- Type definitions in `src/types/`
- Co-locate related functionality (e.g., demo NIN database with registration logic)

## ESLint Configuration

The project uses:
- `next/core-web-vitals`
- `next/typescript`
- Ignores: `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`

Run `npm run lint` before committing changes.

## Environment & Deployment

**No environment variables** are currently configured. If adding API integration:
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Never commit `.env` files
- Provide `.env.example` template

**Development Port:** 3000 (default)

## Working with Admin Features

Admin pages include:
- Dashboard with registration statistics
- Participant profile table with search and sort
- Charts showing participant demographics
- Mock data currently used (replace with real API calls)

When implementing real admin functionality:
- Add authentication/authorization
- Connect to backend API
- Implement proper session management
- Add role-based access control
