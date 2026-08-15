# 🤖 InterviewAI — AI-Powered Mock Interview Prep Platform

> **InterviewAI** (Future-Bot) is a full-stack, enterprise-grade AI interview preparation platform. Practice realistic technical and HR mock interviews with real-time AI question generation, speech-to-text voice answering, instant per-answer AI evaluations, and detailed diagnostic performance score reports.
>
> 👨‍💻 **Designed & Developed by [Sundharapriya](https://github.com/sundharapriya)**

---

## 🌟 Key Features

- 🔐 **User Authentication & Profile Management**: Secure JWT-based authentication (register, login, refresh, logout, profile customization) with encrypted passwords.
- 🎯 **Multi-Track Interview Prep**: Practice across 7 specialized tracks:
  - 🐍 Python
  - 🗄️ SQL
  - 🤖 Machine Learning
  - 🧠 Artificial Intelligence
  - 📊 Data Analytics
  - ⚙️ Data Engineering
  - 👔 HR / Behavioral Fit
- ⚡ **Dynamic AI Question Generation**: Generates contextual, role-tailored questions using OpenAI GPT-4o-mini with fallback generators.
- 🎙️ **Voice & Text Answering**: Answer questions naturally via voice recording (OpenAI Whisper transcription) or rich text input.
- 📊 **Comprehensive AI Answer Evaluation**: Multi-dimensional scoring across **Accuracy**, **Clarity**, **Technical Depth**, **Communication**, and **Completeness** with concrete strengths, weaknesses, and suggestions.
- 📈 **Session Analytics & Score Reports**: Comprehensive final report detailing average score, performance breakdowns, strong topics, and areas for improvement.
- ☁️ **Cloud Native & Dual Deployment**: SSR Frontend on **Vercel** + High-Performance Async API on **Render** + Serverless **PostgreSQL (Neon)**.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
| --- | --- |
| [TanStack Start](https://tanstack.com/start) | React 19 Full-Stack Framework with SSR & Nitro |
| [TanStack Router](https://tanstack.com/router) | Type-safe, file-based routing |
| [TanStack Query](https://tanstack.com/query) | Async state & data fetching |
| [Tailwind CSS v4](https://tailwindcss.com) | Modern design token system & sleek UI styling |
| [shadcn/ui](https://ui.shadcn.com) | Accessible component primitives (Radix UI) |
| [Lucide Icons](https://lucide.dev) & [Sonner](https://sonner.emilkowal.ski) | Clean iconography and rich toast notifications |
| [Vite 8](https://vitejs.dev) | Lightning-fast bundler and dev server |

### Backend
| Technology | Description |
| --- | --- |
| [FastAPI](https://fastapi.tiangolo.com) | Modern, fast Python 3.11 web framework |
| [SQLAlchemy 2.0](https://www.sqlalchemy.org) | Async & sync ORM with connection pooling |
| [Alembic](https://alembic.sqlalchemy.org) | Database migration tool |
| [Neon PostgreSQL](https://neon.tech) / SQLite | Serverless cloud PostgreSQL (prod) & SQLite (dev/test) |
| [OpenAI API](https://platform.openai.com) | GPT-4o-mini for questions & scoring, Whisper for speech |
| [Python-Jose](https://github.com/mpdavis/python-jose) & [Passlib](https://passlib.readthedocs.io) | JWT authentication with secure hashing |
| [Pytest](https://docs.pytest.org) | Automated test suite (12 test cases) |

---

## 📁 Repository Structure

```
interview-buddy/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI (Pytest & Frontend build)
├── backend/
│   ├── alembic/                 # Database migrations
│   ├── core/                    # Security, JWT, configuration
│   ├── database/                # SQLAlchemy models & DB connection pool
│   ├── routes/                  # API route handlers (auth, interview, speech, profile)
│   ├── schemas/                 # Pydantic validation schemas
│   ├── services/                # AI question generator, answer evaluator, STT
│   ├── tests/                   # Pytest test suite
│   ├── Dockerfile               # Container deployment for Render
│   ├── main.py                  # FastAPI application entrypoint
│   └── requirements.txt         # Python dependencies
├── src/
│   ├── assets/                  # Static media assets
│   ├── components/              # Layout, scores, UI components
│   ├── lib/                     # API client, auth context, session state
│   ├── routes/                  # TanStack Router file-based pages
│   │   ├── __root.tsx           # App Shell & Root layout
│   │   ├── index.tsx            # Landing page
│   │   ├── login.tsx            # Sign in page
│   │   ├── register.tsx         # Account registration page
│   │   ├── setup.tsx            # Interview config (track, difficulty, questions)
│   │   ├── interview.tsx        # Active interview session (timer, voice, text)
│   │   ├── evaluation.tsx       # Per-question score breakdown & feedback
│   │   └── report.tsx           # Final session report & analytics
│   ├── router.tsx               # TanStack Router initialization
│   ├── start.ts                 # TanStack Start configuration
│   └── styles.css               # Global Tailwind theme
├── nitro.config.ts              # Nitro Vercel deployment configuration
├── render.yaml                  # Render Blueprint definition
└── vite.config.ts               # Vite configuration
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: `v20+` or `v22+`
- **Python**: `3.11+`
- **npm** or **pnpm**

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
..\.venv\Scripts\activate
# Linux/macOS:
source ../.venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Run database migrations
python run_alembic.py upgrade head

# Start backend server
uvicorn main:app --reload --port 8000
```
Backend will be live at: **http://localhost:8000** (Swagger API docs at `http://localhost:8000/docs`).

---

### 3. Frontend Setup

```bash
# In the root repository directory
npm install

# Start development server
npm run dev
```
Frontend will be live at: **http://localhost:3000** (or `http://localhost:5173`).

---

### 4. Running Automated Tests

```bash
# Run backend pytest suite
cd backend
python -m pytest -q

# Run frontend build check
npm run build
```

---

## 🌐 Cloud Deployment

### 🔹 Backend on [Render](https://render.com)
1. Create a new **Web Service** on Render and connect your repository.
2. Set **Root Directory** to `backend`.
3. Set **Runtime** to `Python 3` (or `Docker`).
4. Set **Build Command**: `pip install -r requirements.txt`
5. Set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variables:
   - `DATABASE_URL`: `postgresql://...` (Neon PostgreSQL connection string)
   - `ALLOWED_ORIGINS`: `*`
   - `JWT_SECRET_KEY`: *(Generate a secure 32+ character random string)*
   - `OPENAI_API_KEY`: *(Optional: for live OpenAI GPT-4o generation & Whisper transcription)*

### 🔹 Frontend on [Vercel](https://vercel.com)
1. Import repository on [Vercel](https://vercel.com).
2. Framework preset: **TanStack Start** (or **Other**).
3. Set Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend.onrender.com`
4. Click **Deploy**.

---

## 📡 REST API Reference

### 🔑 Authentication
| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Register a new user account |
| `POST` | `/api/v1/auth/login` | Authenticate and obtain JWT access token |
| `GET` | `/api/v1/auth/me` | Retrieve authenticated user profile |
| `POST` | `/api/v1/auth/refresh` | Refresh JWT access token |
| `POST` | `/api/v1/auth/logout` | Revoke session and logout |

### 🎙️ Interview Workflow
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/health` | Service health status check |
| `POST` | `/api/v1/interview/start` | Initialize a new interview session |
| `GET` | `/api/v1/interview/question/{session_id}` | Fetch current question for session |
| `POST` | `/api/v1/interview/answer` | Submit user answer (text) |
| `POST` | `/api/v1/interview/evaluate` | Evaluate answer & return multi-metric score |
| `GET` | `/api/v1/interview/score/{session_id}` | Retrieve running score summary |
| `GET` | `/api/v1/interview/report/{session_id}` | Generate final diagnostic score report |
| `POST` | `/api/v1/speech/transcribe` | Transcribe recorded audio with Whisper |

---

## 👨‍💻 Developer & Author

**InterviewAI** was designed, architected, and engineered by **Sundharapriya**.

- **Lead Full-Stack & AI Engineer:** Sundharapriya
- **Architecture:** TanStack Start (React 19 SSR) + FastAPI (Python 3.11) + OpenAI GPT-4o & Whisper + Serverless PostgreSQL (Neon)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

