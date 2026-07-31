import subprocess
import os
from pathlib import Path
from django.conf import settings
from django.core.management.base import BaseCommand

PRERENDER_SCRIPT = Path(settings.BASE_DIR) / 'magna-page' / 'unified' / 'prerender.mjs'
PRERENDER_PORT = 8001

class Command(BaseCommand):
    help = 'Re-prerenderiza una ruta especifica del SPA en segundo plano'

    def add_arguments(self, parser):
        parser.add_argument('route', type=str, help='Ruta a prerenderizar (ej: /blog/26)')

    def handle(self, *args, **options):
        route = options['route']
        env = os.environ.copy()
        env['PRERENDER_PORT'] = str(PRERENDER_PORT)

        cmd = ['node', str(PRERENDER_SCRIPT), '--route', route]
        cwd_path = str(PRERENDER_SCRIPT.parent.resolve())

        subprocess.Popen(cmd, cwd=cwd_path, env=env)

        self.stdout.write(self.style.SUCCESS(f'Prerenderizando {route} en segundo plano...'))
