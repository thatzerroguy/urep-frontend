# Urep Frontend Agent Guidelines

This document outlines the guidelines, workflows, and conventions for AI agents operating within the Urep Frontend repository.

## 1. Environment & Build/Test Commands

The project uses Next.js 15 (App Router), React 19, Tailwind CSS v4, and pnpm.

### 1.1 Standard Commands
- **Install Dependencies:** `pnpm install`
- **Development Server:** `pnpm dev` (uses Turbopack)
- **Production Build:** `pnpm build`
- **Start Production Server:** `pnpm start`
- **Lint Codebase:** `pnpm lint`

### 1.2 Testing Commands
Currently, a dedicated testing framework (Jest/Vitest) is not fully initialized. When instructed to write and run tests, prioritize writing tests for Jest + React Testing Library if initialized, or configure them first if requested.

*If tests are configured in the future:*
- **Run all tests:** `pnpm test`
- **Run a single test file:** `pnpm test -- <path-to-file.test.tsx>` (or `npx jest <path-to-file.test.tsx>`)
- **Run tests in watch mode:** `pnpm test:watch`

When fixing a bug or adding a feature, try to verify the changes with `pnpm build` and `pnpm lint` before completing the task.

## 2. Code Style & Architecture Guidelines

### 2.1 Next.js App Router Paradigms
- **Server Components (RSC):** By default, components in `src/app` are Server Components. Favor them for data fetching, static rendering, and SEO optimizations.
- **Client Components:** Use the `"use client"` directive at the very top of a file *only* when the component requires React hooks (e.g., `useState`, `useEffect`), event listeners (`onClick`), or browser APIs.
- Keep Client Components as deep in the tree as possible to minimize the JavaScript bundle sent to the client.
- **Routing:** Follow Next.js App Router conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Keep API routes in `src/app/api/`.

### 2.2 React & UI Components
- **Component Library:** The project uses `shadcn/ui` alongside Radix UI primitives.
- **Styling:** Use Tailwind CSS v4. For dynamic or conditional class names, utilize the provided `cn` utility (typically found in `src/lib/utils.ts` utilizing `clsx` and `tailwind-merge`).
- **Icons:** Use `lucide-react` for iconography.
- **Component Naming:** 
  - File names for UI components should be in `kebab-case.tsx` or `PascalCase.tsx` based on the existing pattern in `src/components/`.
  - Component functions should be in `PascalCase`.
- **Component Export:** Prefer `export function ComponentName()` (named exports) for standard components over `export default`. Use `export default` only for App Router pages and layouts (`page.tsx`, `layout.tsx`).
- Extract reusable logic into custom hooks (`src/hooks/` or `src/lib/`).

### 2.3 TypeScript & Typing
- **Strict Typing:** The project has `strict` mode enabled in `tsconfig.json`. Ensure all variables, function parameters, and return types are strongly typed.
- **Interfaces vs Types:** Prefer `interface` for object structures and component props. Use `type` for unions, intersections, and primitives.
- **Props:** Use `interface ComponentProps { ... }` rather than inline prop definitions for readability.
- Avoid `any`. Use `unknown` if the type is truly not known at compile time, and type-guard it before use.
- Place shared types and interfaces in `src/types/`.

### 2.4 Formatting & Imports
- **Path Aliases:** Use the `@/*` alias for importing files from the `src` directory (e.g., `import { Button } from "@/components/ui/button"`). Avoid deeply nested relative paths like `../../../`.
- **Import Ordering:** 
  1. React and Next.js imports (`react`, `next/*`).
  2. Third-party library imports.
  3. Internal path-aliased imports (`@/*`).
  4. Relative imports (`./`, `../`).
- Ensure no unused imports are left in the file.
- Follow ESLint and Prettier formatting rules (enforced via `pnpm lint`). Do not leave trailing spaces or excessive empty lines.

### 2.5 Naming Conventions
- **Variables & Functions:** Use `camelCase`.
- **Constants:** Use `UPPER_SNAKE_CASE` for global, non-changing constants.
- **Booleans:** Prefix boolean variables with `is`, `has`, `should`, or `can` (e.g., `isLoading`, `hasError`).
- **Event Handlers:** Prefix event handler functions with `handle` (e.g., `handleSubmit`, `handleClick`) and props with `on` (e.g., `onSubmit`, `onClick`).

### 2.6 Error Handling & Data Fetching
- **Try/Catch:** Wrap asynchronous operations in `try/catch` blocks.
- **Error Boundaries:** Utilize Next.js `error.tsx` files for route-level error boundaries to prevent the entire app from crashing on render errors.
- **Graceful Degradation:** When an API call fails, ensure the UI updates to inform the user gracefully (e.g., toast notifications, inline error messages) instead of failing silently.
- **Server Actions:** For form submissions and mutations in Server Components, use Next.js Server Actions. Ensure proper validation (e.g., using `zod`) before processing data.

## 3. Workflow Protocol for AI Agents

When interacting with this repository, strictly adhere to the following workflow:

1. **Understand:** 
   - Analyze the user's request.
   - Use `grep` and `glob` to search the codebase and understand the existing structure, styles, and data flow.
   - Review relevant types and utilities before making changes.
2. **Plan:**
   - Determine whether a Server or Client Component is required.
   - Outline the necessary changes in your thought process. Do not blindly overwrite code.
   - Identify if `shadcn/ui` components can be leveraged or need to be installed via the CLI (`pnpm dlx shadcn@latest add <component>`).
3. **Execute:**
   - Modify the code adhering strictly to the guidelines above.
   - Add comments only for complex or non-obvious logic. Focus on the *why*.
4. **Verify:**
   - Run `pnpm lint` and `pnpm build` to ensure your changes didn't break the build or violate typing constraints.
   - Ensure imports are correct and path aliases are used properly.

## 4. Specific Libraries

- **Nigerian States:** `nigerian-states` (Used for locations/forms).
- **Charts:** `recharts`. Use Client Components for charts.
- **Excel/Exports:** `xlsx` for parsing/generating spreadsheets.
- **QR Codes:** `react-qr-code`.
