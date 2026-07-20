from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.files.storage import default_storage
from PIL import Image as PilImage
from io import BytesIO
import os

from equipos.models import Equipo, Tenologias

TARGET_W = 280
TARGET_H = 380
QUALITY = 90


def procesar(ruta_fisica, nombre_db):
    if not os.path.exists(ruta_fisica):
        return None

    with open(ruta_fisica, 'rb') as f:
        datos = BytesIO(f.read())
    pil = PilImage.open(datos)
    ancho, alto = pil.size

    if ancho > TARGET_W or alto > TARGET_H:
        proporcion = min(TARGET_W / ancho, TARGET_H / alto)
        nuevo_w = int(ancho * proporcion)
        nuevo_h = int(alto * proporcion)
        pil = pil.resize((nuevo_w, nuevo_h), PilImage.LANCZOS)

    if pil.mode in ('RGBA', 'P'):
        fondo = PilImage.new('RGB', pil.size, (255, 255, 255))
        if pil.mode == 'P':
            pil = pil.convert('RGBA')
        fondo.paste(pil, mask=pil.split()[3])
        pil = fondo

    buffer = BytesIO()
    pil.save(buffer, format='WEBP', quality=QUALITY)
    pil.close()
    datos.close()

    base = os.path.basename(nombre_db).rsplit('.', 1)[0]
    upload_to = os.path.dirname(nombre_db).replace('\\', '/')
    nombre_webp = f'{upload_to}/{base}.webp'

    from django.core.files.base import ContentFile
    return ContentFile(buffer.getvalue()), nombre_webp


class Command(BaseCommand):
    help = 'Convierte imagenes de Equipo y Tenologias a WebP (max 270x370px, calidad 90)'

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='Solo mostrar que se hara')

    def handle(self, *args, **options):
        dry_run = options['dry_run']

        modelos = [
            ('Equipo', Equipo.objects.all()),
            ('Tenologias', Tenologias.objects.all()),
        ]

        for nombre_modelo, qs in modelos:
            self.stdout.write(f'\n--- {nombre_modelo} ---')
            for obj in qs:
                if not obj.imagen or not obj.imagen.name:
                    self.stdout.write(f'  [-] {obj}: sin imagen')
                    continue

                nombre_db = obj.imagen.name
                ruta_fisica = os.path.join(settings.MEDIA_ROOT, nombre_db)
                if not os.path.exists(ruta_fisica):
                    self.stdout.write(f'  [ERR] {obj}: archivo no encontrado: {nombre_db}')
                    continue

                resultado = procesar(ruta_fisica, nombre_db)
                if not resultado:
                    self.stdout.write(f'  [ERR] {obj}: no se pudo procesar')
                    continue

                content_file, nombre_webp = resultado

                if dry_run:
                    self.stdout.write(f'  [~] {obj}: {nombre_db} -> {nombre_webp}')
                    continue

                if nombre_db != nombre_webp:
                    obj.imagen.delete(save=False)

                default_storage.delete(nombre_webp)
                nombre_guardado = default_storage.save(nombre_webp, content_file)
                obj.imagen.name = nombre_guardado

                pil = PilImage.open(content_file)
                obj.imagen_width, obj.imagen_height = pil.size
                pil.close()
                obj.save(update_fields=['imagen', 'imagen_width', 'imagen_height'])
                self.stdout.write(f'  [+] {obj}: {nombre_webp} ({obj.imagen_width}x{obj.imagen_height})')
