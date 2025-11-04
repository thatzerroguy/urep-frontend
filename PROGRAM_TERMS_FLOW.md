# Program-Specific Terms Flow

## Overview
Each active program now has its own dedicated terms and conditions page that users must agree to before proceeding to registration.

## New Flow

### Previous Flow
1. User clicks "Register Now" on home page
2. Redirected to `/terms?program=program_id` (generic terms page)
3. User accepts and continues to `/register?program=program_id`

### New Flow
1. User clicks "Register Now" on home page
2. Redirected to `/programs/{program_id}/terms` (program-specific terms page)
3. User reads program-specific:
   - Background
   - Objectives
   - Who Should Attend
4. User checks "Do you agree to these terms and conditions?" checkbox
5. User clicks "I agree to continue" button (disabled until checkbox is checked)
6. Redirected to `/register?program=program_id`

## Program-Specific Terms Pages

### 1. African/National Youth Day 2025
- **Route:** `/programs/african_youth/terms`
- **Redirects to:** `/register?program=african_youth`

### 2. Bakeprenuer Nigeria
- **Route:** `/programs/bakeprenuer/terms`
- **Redirects to:** `/register?program=bakeprenuer`

### 3. Youth Migration Awareness Programme
- **Route:** `/programs/youth_migration/terms`
- **Redirects to:** `/register?program=youth_migration`

### 4. National Youth Policy Validation Workshop
- **Route:** `/programs/national_youth/terms`
- **Redirects to:** `/register?program=national_youth`

## Files Created

```
src/app/programs/
├── african_youth/
│   └── terms/
│       ├── page.tsx
│       └── layout.tsx
├── bakeprenuer/
│   └── terms/
│       ├── page.tsx
│       └── layout.tsx
├── national_youth/
│   └── terms/
│       ├── page.tsx
│       └── layout.tsx
└── youth_migration/
    └── terms/
        ├── page.tsx
        └── layout.tsx
```

## Features

### Interactive Checkbox
- Users must explicitly check the agreement checkbox
- "I agree to continue" button is disabled until checkbox is checked
- Alert message if user tries to continue without agreeing

### Consistent Design
- All pages follow the same layout structure
- Brand colors: `#277B12` (green) for primary actions
- Responsive design with proper mobile support
- Shadow cards for each section (Background, Objectives, Who Should Attend)

### Navigation
- "Learn More" links point to program detail pages at `/programs/{program_id}`
- Header navigation consistent across all pages
- Footer with contact information and social links

## Development Notes

### Adding a New Program Terms Page

1. Create directory structure:
   ```
   src/app/programs/{program_id}/terms/
   ```

2. Create `page.tsx` with program-specific content:
   - Update program name in title
   - Update background text
   - Update objectives list
   - Update target audience list
   - Update router.push to use correct program_id

3. Create `layout.tsx` (simple passthrough component)

4. Update homepage (`src/app/page.tsx`) to link to new terms page:
   ```tsx
   href={`/programs/${programId}/terms`}
   ```

## Testing

To test the flow:

1. Start development server: `pnpm run dev`
2. Navigate to homepage: `http://localhost:3000`
3. Click "Register Now" on any program card
4. Verify you're redirected to program-specific terms page
5. Try clicking "I agree to continue" without checking the box (should show alert)
6. Check the agreement checkbox
7. Click "I agree to continue"
8. Verify you're redirected to registration page with correct program parameter
