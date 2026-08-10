# Interview Buddy — Agent Notes

This project uses [TanStack Start](https://tanstack.com/start) with file-based routing.
All routes live in `src/routes/`. The router tree is auto-generated to `src/routeTree.gen.ts` — do not edit that file manually.

## Key Conventions

- **Path aliases**: `@/` maps to `src/` (configured via `vite-tsconfig-paths`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`. Design tokens and custom utilities are in `src/styles.css`.
- **UI components**: shadcn/ui components in `src/components/ui/`. Add new ones via the shadcn CLI.
- **API client**: `src/lib/api.ts` — falls back to mock data when the backend is unreachable.
- **Error reporting**: `src/lib/error-reporting.ts` — plug in Sentry or Datadog here.
- **SSR entry**: `src/server.ts` — wraps TanStack Start's server entry with SSR error normalisation.
