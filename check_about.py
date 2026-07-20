import django, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'magna_web.settings.prod')
django.setup()
from about.models import About, Valor

a = About.objects.first()
if not a:
    print("No About data found. Database seems empty.")
    exit()

print(f"Descripcion: {a.descripcion}")
print(f"Mision: {a.mision}")
print(f"Vision: {a.vision}")
print()
for v in Valor.objects.filter(about=a).order_by('orden', 'pk'):
    print(f"  Valor: {v.nombre} — {v.descripcion}")
