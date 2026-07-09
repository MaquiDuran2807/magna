import os
from pathlib import Path
import environ

env = environ.Env()
env_file = Path(__file__).resolve().parent.parent.parent / '.env'
if env_file.exists():
    environ.Env.read_env(env_file)

DJANGO_ENV = env('DJANGO_ENV', default='development')

if DJANGO_ENV == 'production':
    from .prod import *
else:
    from .dev import *
