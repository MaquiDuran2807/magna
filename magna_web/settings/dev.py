from .base import *

DEBUG = True

ALLOWED_HOSTS = [
    "magnaingenieriaytopografia.com",
    "www.magnaingenieriaytopografia.com",
    "127.0.0.1",
    "localhost",
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:8000",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://magnaingenieriaytopografia.com",
    "https://www.magnaingenieriaytopografia.com",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8000",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://magnaingenieriaytopografia.com",
    "https://www.magnaingenieriaytopografia.com",
]
