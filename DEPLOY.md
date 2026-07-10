# Deploy — Magna Web

## 1. Build frontend

```powershell
cd magna-page/page
npm run build
```

Solo `page` — `store` no se tocó.

## 2. Build + push Docker

```powershell
cd magna
docker build -t mquiroga2807/magna-web:latest .
Get-Content 'C:\Users\Janus\Documents\magna\docker hub token.txt' | Select-Object -Skip 1 | docker login -u mquiroga2807 --password-stdin
docker push mquiroga2807/magna-web:latest
```

## 3. Actualizar servidor

```bash
ssh -i ~/.ssh/magna.pem ubuntu@13.223.147.116
sudo docker compose -f /opt/magna/docker-compose.yml pull web
sudo docker compose -f /opt/magna/docker-compose.yml up -d --no-deps web
sudo docker compose -f /opt/magna/docker-compose.yml exec -T web python manage.py migrate --no-input
```

- `--no-deps` evita reiniciar nginx y db
- nginx + db siguen funcionando sin interrupción
- Solo el contenedor web se reemplaza

## Verificar

```bash
sudo docker ps
curl -I https://magnaingenieriaytopografia.com
```
