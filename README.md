# Pathwise (GlobeTrotter)

Pathwise is a personalized travel planning platform designed to streamline trip discovery, itinerary building, budget management, and community travel sharing in a cohesive modern web experience.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/)
- **Linting**: [ESLint](https://eslint.org/)
- **Package Manager**: `npm`

## Project Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment configuration**:
   ```bash
   cp .env.example .env.local
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Build for production**:
   ```bash
   npm run build
   ```

## Directory Structure

```text
├── public/                # Static assets (images, icons)
│   ├── images/            # Organized imagery (destinations, activities, placeholders)
│   └── icons/             # Static icons
├── src/
│   ├── app/               # Next.js App Router pages, layouts, and API routes
│   │   ├── (auth)/        # Authentication route group (login, signup, forgot-password)
│   │   ├── (app)/         # Core application route group (dashboard, trips, explore, community, profile)
│   │   ├── share/         # Public shared itinerary routes
│   │   └── api/           # Route handlers (e.g., /api/health)
│   ├── components/        # Reusable presentation components
│   │   ├── ui/            # Generic UI primitives (buttons, inputs, dialogs)
│   │   ├── layout/        # App-level navigation, headers, footers
│   │   └── [domain]/      # Domain-specific UI components
│   ├── features/          # Feature-specific business logic, hooks, and services
│   ├── hooks/             # Truly generic, application-wide React hooks
│   ├── lib/               # Shared libraries, utilities, and validation helpers
│   ├── types/             # Domain TypeScript interfaces and types
│   └── constants/         # Centralized route definitions and navigation constants
```
