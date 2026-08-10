# Interview Buddy

> AI-powered mock interview preparation. Practice with realistic, AI-conducted interviews, get instant per-answer evaluation, and receive a personalised score report.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (React + SSR) |
| Routing | [TanStack Router](https://tanstack.com/router) (file-based) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) (Radix primitives) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Language | TypeScript 5 |
| Package Manager | [Bun](https://bun.sh) / npm |

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, feature grid, stats |
| `/setup` | Interview configuration (category, difficulty, question count) |
| `/interview` | Active mock interview — question card, timer, text/voice answer |
| `/evaluation` | Per-answer score breakdown with AI feedback |
| `/report` | Final session report — average score, strong/weak topics |

---

## Getting Started

### Prerequisites
- [Node.js ≥ 20](https://nodejs.org) (or [Bun ≥ 1.1](https://bun.sh))

### Install & Run

```sh
# Clone the repository
git clone <repository-url>
cd interview-buddy

# Install dependencies
npm install        # or: bun install

# Start the development server
npm run dev        # or: bun dev
```

The app is available at **http://localhost:3000** by default.

### Other Commands

```sh
npm run build      # Production build
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
npm run format     # Run Prettier
```

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Base URL of the Python backend |

Create a `.env.local` file at the project root to override defaults:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## Backend API

The frontend consumes the following REST endpoints. Set `VITE_API_BASE_URL` to point to your backend. When the backend is unreachable, the app falls back to built-in mock data so the UI is always functional during development.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/start-interview` | Begin a new interview session |
| `GET` | `/question` | Fetch the next question |
| `POST` | `/submit-answer` | Submit a candidate answer |
| `GET` | `/evaluation` | Retrieve the per-answer evaluation |
| `GET` | `/final-report` | Retrieve the full session report |

---

## Project Structure

```
src/
├── assets/          # Static images
├── components/
│   ├── layout/      # Navbar, Footer, AppBackground
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/
│   ├── api.ts              # REST client + mock data
│   ├── error-capture.ts    # Server-side error capture for SSR
│   ├── error-page.ts       # Fallback HTML error page
│   ├── error-reporting.ts  # Client-side error reporting utility
│   ├── interview-session.ts
│   └── utils.ts
├── routes/          # File-based TanStack Router pages
│   ├── __root.tsx   # Root layout (Navbar, Footer, Providers)
│   ├── index.tsx    # Home page
│   ├── setup.tsx    # Interview setup
│   ├── interview.tsx
│   ├── evaluation.tsx
│   └── report.tsx
├── router.tsx       # Router factory
├── server.ts        # SSR entry point
├── start.ts         # TanStack Start middleware
└── styles.css       # Global Tailwind theme & design tokens
```

---

## License

MIT
