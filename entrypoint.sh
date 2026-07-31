#!/bin/sh
set -e

python manage.py migrate --noinput

exec gunicorn magna_web.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120
