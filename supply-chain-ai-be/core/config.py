import secrets
from typing import List, Optional, Union

from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseConfig


class Settings(BaseConfig):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str = 'HS256'
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SYSTEM_ACCESS_TOKEN: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpZCI6MSwiZXhwIjoxNzA4MjczNTA3fQ.trWB0o2MITIboiBTjoGn_dCJJQEaCr-bhpeaUu2TNR8"
    PORT: int = 1883
    HOST: str = 'localhost'
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./supply_chain_ai.db"

    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
    oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/login")
    # @validator("BACKEND_CORS_ORIGINS", pre=True)
    # def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
    #     if isinstance(v, str) and not v.startswith("["):
    #         return [i.strip() for i in v.split(",")]
    #     elif isinstance(v, (list, str)):
    #         return v
    #     raise ValueError(v)

    PROJECT_NAME: str

    class Config:
        case_sensitive = True


settings = Settings()