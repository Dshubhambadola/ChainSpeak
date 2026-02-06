from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ALCHEMY_API_KEY: str
    SEPOLIA_RPC_URL: str
    GROQ_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
