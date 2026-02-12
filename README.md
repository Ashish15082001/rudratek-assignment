# Rudratek Projects Dashboard

A modern, responsive project management dashboard built with Next.js, featuring a split-view interface with project listing and detailed project information.

## Setup Instructions

### Prerequisites

- **Node.js**: Version 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Navigate to the project directory:**

   ```bash
   cd rudratek-assignent
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm start
```

### Code Quality

Run ESLint to check for code issues:

```bash
npm run lint
```

## Project Structure

```
app/
├── globals.css              # Global styles
├── (root)/                  # Root route group
│   ├── layout.tsx
│   └── page.tsx            # Home/landing page
└── (non-root)/             # Non-root route group
    └── projects/
        ├── layout.tsx      # Projects layout with parallel routes
        ├── @projectTable/  # Parallel route: project listing
        └── @projectDetail/ # Parallel route: project details
            └── [id]/       # Dynamic route for individual projects

data/
└── dummy.ts                # Mock project data

public/                      # Static assets
```

## Features

- **Split-View Dashboard**: Projects table on the left, project details on the right
- **Search Functionality**: Filter projects by name or client
- **Status Filtering**: Filter projects by status (Active, Completed, On Hold)
- **Pagination**: Browse through projects with 10 items per page
- **Responsive Design**: Built with Tailwind CSS for modern styling
- **Type Safety**: Full TypeScript support throughout the application

## Assumptions Made

1. **Dummy Data**: The application uses static mock data (`data/dummy.ts`) for demonstration. In production, this would be replaced with API calls to a backend service.

2. **Client-Side Filtering**: All filtering, searching, and pagination are performed on the client side using the in-memory data set. This is suitable for small to medium datasets but would require optimization for larger datasets.

3. **Parallel Routes Architecture**: The projects page uses React 19 parallel routes (`@projectTable` and `@projectDetail`) to manage the split-view layout. This assumes Next.js 16+ and React 19+.

4. **Single-User Experience**: No authentication, authorization, or user-specific data handling is implemented. The app assumes a single-user context.

5. **Browser Environment**: The split-view layout assumes a desktop viewport. Mobile responsiveness is not optimized for this specific layout.

6. **Tailwind CSS v4**: The project uses the latest Tailwind CSS configuration with the new `@tailwindcss/postcss` package.

## Trade-offs

### 1. **Client-Side vs Server-Side Processing**

- **Trade-off**: All data filtering, searching, and pagination happen on the client side using React state.
- **Benefit**: Faster interactions and no server requests needed for filtering.
- **Cost**: Limited scalability; loading all projects into memory would be inefficient with large datasets (1000+).
- **Alternative**: Implement server-side filtering and API pagination for production.

### 2. **Dummy Data Storage**

- **Trade-off**: Using static TypeScript files for project data instead of a database.
- **Benefit**: No external dependencies or setup required; immediately functional for development.
- **Cost**: Changes are lost on restart; no persistence or concurrent user support.
- **Alternative**: Integrate with a backend API (Express, Node, Python, etc.) and database (PostgreSQL, MongoDB, etc.).

### 3. **Split-View Layout**

- **Trade-off**: Fixed 50-50 split layout using Flexbox with no resizing capability.
- **Benefit**: Simple implementation and consistent UX across sessions.
- **Cost**: Fixed width may not work well on smaller screens; table content can overflow on narrow viewports.
- **Alternative**: Implement responsive breakpoints or add a resizable divider for flexible layout.

### 4. **Pagination Approach**

- **Trade-off**: Manual pagination with buttons instead of infinite scroll.
- **Benefit**: Better for large datasets and predictable UX; users always know they're on a specific page.
- **Cost**: More clicks required to browse through many pages.
- **Alternative**: Implement infinite scroll or virtual scrolling for seamless browsing.

### 5. **Styling Approach**

- **Trade-off**: Utility-first Tailwind CSS for all styling; no component library.
- **Benefit**: Lightweight, fast, and highly customizable without extra dependencies.
- **Cost**: Potential style duplication across components as the project grows.
- **Alternative**: Use a component library (shadcn/ui, Radix UI, Material-UI) for pre-built components.

### 6. **Project Detail Routing**

- **Trade-off**: Dynamic routing for project details (e.g., `/projects/1`) with parallel route rendering.
- **Benefit**: URL reflects current selection; shareable links; browser back/forward work naturally.
- **Cost**: Requires error handling for invalid project IDs (implemented via `not-found.tsx`).
- **Alternative**: Modal or drawer overlay without URL changes for lighter navigation.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Parallel Routes in Next.js](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

## AI Usage & Documentation

For details on how AI tools were used to generate this documentation, what sections were created, and notes on design decisions, see [AI_USAGE.md](AI_USAGE.md).
