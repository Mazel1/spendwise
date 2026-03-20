# ─────────────────────────────────────────────────────────────────────────────
# SpendWise — Developer Makefile
# Usage: make <target>
# ─────────────────────────────────────────────────────────────────────────────

.PHONY: help setup dev-backend dev-frontend migrate up down logs test

help:
	@echo ""
	@echo "  SpendWise — available commands"
	@echo ""
	@echo "  Setup"
	@echo "    make setup          Copy .env.example → .env (edit before use)"
	@echo ""
	@echo "  Local development"
	@echo "    make dev-backend    Run FastAPI with hot-reload"
	@echo "    make dev-frontend   Run Next.js dev server"
	@echo "    make migrate        Run pending Alembic migrations"
	@echo ""
	@echo "  Docker (production-like)"
	@echo "    make up             Build and start all services"
	@echo "    make down           Stop all services"
	@echo "    make logs           Tail logs from all services"
	@echo ""
	@echo "  Tests"
	@echo "    make test           Run backend unit tests"
	@echo ""

setup:
	@if [ ! -f .env ]; then cp .env.example .env && echo "✓ .env created — fill in your values"; \
	else echo "⚠ .env already exists — skipping"; fi

dev-backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend:
	cd frontend && npm run dev

migrate:
	cd backend && alembic upgrade head

up:
	docker compose -f docker/docker-compose.yml up --build -d

down:
	docker compose -f docker/docker-compose.yml down

logs:
	docker compose -f docker/docker-compose.yml logs -f

test:
	cd backend && python -m pytest tests/unit -v
