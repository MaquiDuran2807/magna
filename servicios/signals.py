import subprocess
import os
from pathlib import Path
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Servicio, SubServicio

BASE_DIR = Path(__file__).resolve().parent.parent
PRERENDER_SCRIPT = BASE_DIR / 'magna-page' / 'unified' / 'prerender.mjs'
PRERENDER_PORT = 8001

def rerender(path):
    env = os.environ.copy()
    env['PRERENDER_PORT'] = str(PRERENDER_PORT)
    try:
        subprocess.Popen(
            ['node', str(PRERENDER_SCRIPT), '--route', path],
            cwd=str(PRERENDER_SCRIPT.parent),
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    except Exception as e:
        pass

@receiver(post_save, sender=Servicio)
def servicio_guardado(sender, instance, **kwargs):
    if instance.slug:
        rerender(f'/servicios/{instance.slug}')

@receiver(post_save, sender=SubServicio)
def subservicio_guardado(sender, instance, **kwargs):
    if instance.slug and instance.servicio and instance.servicio.slug:
        rerender(f'/servicios/{instance.servicio.slug}/{instance.slug}')
