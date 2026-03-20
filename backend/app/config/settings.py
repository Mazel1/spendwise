import secrets
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── App ───────────────────────────────────────────────────────────────────
    APP_ENV: str = "development"              # "development" | "production"
    DEBUG: bool = False                       # Never True in production
    SECRET_KEY: str = secrets.token_hex(32)  # Override via env — never use default

    # ── Database ──────────────────────────────────────────────────────────────
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/spendwise"

    # ── CORS ──────────────────────────────────────────────────────────────────
    # In production: set to your exact frontend origin, e.g. ["https://app.spendwise.io"]
    # Never use ["*"] in production — credentials would not work anyway with allow_credentials=True
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]

    # ── LLM ───────────────────────────────────────────────────────────────────
    LLM_PROVIDER: str = "anthropic"          # "anthropic" | "openai"
    LLM_API_KEY: str = ""
    LLM_MODEL: str = "claude-sonnet-4-20250514"

    # ── JWT ───────────────────────────────────────────────────────────────────
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24 * 7   # 7 days

    @property
    def is_production(self) -> bool:
        return self.APP_ENV == "production"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
