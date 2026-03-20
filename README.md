# SpendWise

AI-powered personal finance tracker. Log expenses, get automatic categorisation, and receive AI-generated financial insights — all scoped securely per user.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | FastAPI · Python 3.12               |
| Database  | PostgreSQL 16                       |
| ORM       | SQLAlchemy 2 (async) · Alembic      |
| Frontend  | Next.js 14 · Tailwind CSS           |
| AI        | Anthropic Claude / OpenAI           |
| Auth      | JWT (python-jose · passlib bcrypt)  |
| Container | Docker · Docker Compose             |

---

## Project Structure

```
spendwise/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI routers and dependency injection
│   │   ├── config/       # Settings loaded from environment variables
│   │   ├── domain/       # SQLAlchemy ORM models
│   │   ├── infrastructure/  # Repositories (DB access)
│   │   ├── schemas/      # Pydantic request / response schemas
│   │   ├── services/     # Business logic (expense, analytics, AI, insights)
│   │   └── utils/        # Logger, exceptions
│   ├── alembic/          # Database migrations
│   └── tests/
├── frontend/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # UI and dashboard components
│   ├── hooks/            # Data-fetching and form hooks
│   ├── services/         # API client wrappers
│   └── types/            # Shared TypeScript types
├── docker/
│   ├── docker-compose.yml
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
├── .env.example          # All required environment variables with documentation
├── Makefile              # Developer shortcuts
└── README.md
```

---

## Quickstart

### 1 — Prerequisites

- Python 3.12+
- Node.js 20+
- PostgreSQL 16 (or Docker)

### 2 — Configure environment

```bash
cp .env.example .env
```

Open `.env` and set at minimum:

| Variable       | Required | Notes                                           |
|----------------|----------|-------------------------------------------------|
| `SECRET_KEY`   | ✅        | Run `python -c "import secrets; print(secrets.token_hex(32))"` |
| `DATABASE_URL` | ✅        | Adjust host/port/credentials for your Postgres  |
| `LLM_API_KEY`  | Optional | Leave blank to disable AI (expenses still work) |
| `ALLOWED_ORIGINS` | ✅     | Set to your frontend URL in production          |

### 3 — Run with Docker (recommended)

```bash
make up          # builds images and starts all services
make migrate     # applies database migrations (first time only)
```

Services available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API docs (dev only): http://localhost:8000/docs

Stop everything:
```bash
make down
```

### 4 — Run locally (without Docker)

**Backend**

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head        # apply DB migrations
make dev-backend            # starts uvicorn with hot-reload
```

**Frontend**

```bash
cd frontend
npm install
# Create frontend/.env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

---

## API Endpoints

All data endpoints require a `Bearer` token obtained from `/api/v1/auth/login`.

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/v1/auth/register`   | Create account, returns JWT        |
| POST   | `/api/v1/auth/login`      | Login, returns JWT                 |
| GET    | `/api/v1/users/me`        | Authenticated user profile         |
| GET    | `/api/v1/expenses`        | List expenses (paginated, filtered)|
| POST   | `/api/v1/expenses`        | Create expense (AI categorises)    |
| GET    | `/api/v1/expenses/{id}`   | Get single expense                 |
| PATCH  | `/api/v1/expenses/{id}`   | Update expense                     |
| DELETE | `/api/v1/expenses/{id}`   | Delete expense                     |
| GET    | `/api/v1/analytics`       | Monthly totals, category breakdown |
| GET    | `/api/v1/insights`        | AI-generated financial insights    |
| GET    | `/health`                 | Health check                       |

---

## Running Tests

```bash
make test
# or directly:
cd backend && python -m pytest tests/unit -v
```

---

## Production Checklist

Before deploying:

- [ ] `SECRET_KEY` is a unique random string (32+ hex chars)
- [ ] `DEBUG=false` and `APP_ENV=production`
- [ ] `DATABASE_URL` points to a managed PostgreSQL instance
- [ ] `ALLOWED_ORIGINS` contains only your exact frontend URL
- [ ] `LLM_API_KEY` is set (if AI features are needed)
- [ ] `POSTGRES_PASSWORD` is strong and unique
- [ ] Migrations applied: `make migrate`
- [ ] Docs disabled automatically when `APP_ENV=production`

---

## License

MIT
