# Kasosyo Client App

A modern React application built with Vite, TanStack Router, and feature-based architecture.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe file-based routing
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Phosphor Icons** - Icon library
- **Class Variance Authority** - Component variants

## Project Structure

```
kasosyo-client-app/
├── src/
│   ├── routes/                    # File-based routing (TanStack Router)
│   │   ├── __root.tsx            # Root layout
│   │   ├── _public.tsx           # Public routes layout
│   │   ├── _public/
│   │   │   ├── index.tsx         # Redirect to /login
│   │   │   └── login.tsx         # Login page
│   │   ├── _dashboard.tsx        # Dashboard layout with auth guard
│   │   └── _dashboard/
│   │       ├── home.tsx          # Home page
│   │       └── settings.tsx      # Settings page
│   │
│   ├── features/                  # Feature-based modules
│   │   ├── auth/                 # Authentication feature
│   │   │   ├── components/
│   │   │   ├── store/
│   │   │   └── types/
│   │   ├── dashboard/            # Dashboard feature
│   │   ├── home/                 # Home feature
│   │   └── settings/             # Settings feature
│   │
│   ├── components/               # Shared components
│   │   ├── ui/                   # UI primitives (Button, Input, etc.)
│   │   └── providers/            # Context providers
│   │
│   ├── lib/                      # Utilities
│   │   └── utils/
│   │
│   ├── store/                    # Global stores
│   │   └── ui-store.ts
│   │
│   ├── main.tsx                  # Entry point
│   ├── App.tsx                   # Router setup
│   └── globals.css               # Global styles
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## Features

### Authentication
- Mock authentication with login flow
- Route guards for protected routes
- Login transition animation
- Persistent auth state

### Dashboard
- Responsive sidebar navigation (collapsible on desktop, overlay on mobile)
- Theme switching (light/dark mode)
- User menu with logout functionality
- Loading skeletons

### Responsive Design
- Mobile-first approach
- Touch-friendly UI (44px minimum touch targets)
- Adaptive layouts for different screen sizes
- Mobile sidebar with backdrop overlay

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Type Check

```bash
npm run typecheck
```

## Routes

| Path | Description | Auth Required |
|------|-------------|---------------|
| `/` | Redirects to `/login` or `/home` | No |
| `/login` | Login page | No |
| `/home` | Dashboard home | Yes |
| `/settings` | Settings page | Yes |

## Authentication Flow

1. User visits any protected route
2. Route guard checks authentication state
3. If not authenticated, redirects to `/login`
4. User enters credentials (mock: any username/password works)
5. Login transition animation plays
6. Redirects to `/home` on success

## Theming

The app supports light and dark themes:
- Uses CSS custom properties for colors
- Automatically detects system preference
- Persists user preference in localStorage
- Toggle available in dashboard header

## State Management

- **useAuthStore** - Authentication state (login, logout, user info)
- **useUIStore** - UI state (theme, sidebar state, preferences)

Both stores are persisted to localStorage.

## Extending the App

### Adding a New Feature

1. Create a new folder under `src/features/` (e.g., `src/features/users/`)
2. Add feature-specific components, stores, types, and hooks
3. Create corresponding route files under `src/routes/`

### Adding a New Route

1. Create a new file in the appropriate route directory
2. TanStack Router will auto-generate the route tree
3. Use `createFileRoute` to define the route

Example:
```tsx
// src/routes/_dashboard/users.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/users')({
  component: UsersPage,
});

function UsersPage() {
  return <div>Users Page</div>;
}
```

## UI Components

The app includes reusable UI components:

- **Button** - CVA variants, loading state
- **Input** - With password show/hide toggle
- **Select** - Custom styled select
- **Toast** - Notification system

All components use Tailwind CSS and support dark mode.

## Best Practices

- Feature-based folder structure
- Type-safe routing with TanStack Router
- Persistent state with Zustand
- Responsive design with Tailwind CSS
- Dark mode support out of the box
- Clean separation of concerns

## License

Private
