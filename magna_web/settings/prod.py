from .base import *

DEBUG = False

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[
    "magnaingenieriaytopografia.com",
    "www.magnaingenieriaytopografia.com",
])

CORS_ORIGIN_WHITELIST = env.list('CORS_ORIGIN_WHITELIST', default=[
    "https://magnaingenieriaytopografia.com",
    "https://www.magnaingenieriaytopografia.com",
])

CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS', default=[
    "https://magnaingenieriaytopografia.com",
    "https://www.magnaingenieriaytopografia.com",
])

SECURE_HSTS_SECONDS = env.int('SECURE_HSTS_SECONDS', default=31536000)
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool('SECURE_HSTS_INCLUDE_SUBDOMAINS', default=True)
SECURE_HSTS_PRELOAD = env.bool('SECURE_HSTS_PRELOAD', default=True)
SECURE_SSL_REDIRECT = env.bool('SECURE_SSL_REDIRECT', default=True)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
