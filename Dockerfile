FROM node:20-alpine AS frontend
WORKDIR /app/magna-page/unified
COPY magna-page/unified/package*.json ./
COPY magna-page/unified/tsconfig*.json ./
RUN npm ci
COPY magna-page/unified/ ./
RUN npm run build

FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY --from=frontend /app/magna-page/unified/dist ./magna-page/unified/dist

RUN python manage.py collectstatic --noinput

RUN chmod +x entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]
