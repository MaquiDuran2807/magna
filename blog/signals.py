import subprocess
import os
from pathlib import Path
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BlogPost

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

@receiver(post_save, sender=BlogPost)
def blog_guardado(sender, instance, **kwargs):
    rerender(f'/blog/{instance.id}')
