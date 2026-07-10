"""
Regenera las variantes tablet/celular de TODAS las imagenes
de Servicio, SubServicio y Slide usando el target-height actual
(1600px para SubServicio, escalas originales para los otros).

Uso:
    python manage.py generate_image_variants
    python manage.py generate_image_variants --dry-run   (solo mostrar que haria)
    python manage.py generate_image_variants --model SubServicio
"""

from django.core.management.base import BaseCommand
from django.conf import settings
from PIL import Image as PilImage
from io import BytesIO
from django.core.files.base import ContentFile
import os

from servicios.models import Servicio, SubServicio, Slide
from servicios.utils import generate_image_variants, make_variant_filename


def _regenerar_variantes(obj, imagen_field, tablet_ratio, celular_ratio, normalize_height=None):
    """
    Regenera las variantes tablet y celular para un objeto dado.
    No toca la imagen original (imagen_field), solo regenera
    imagen_tablet e imagen_celular.
    """
    if not imagen_field or not imagen_field.name:
        return False

    path = os.path.join(settings.MEDIA_ROOT, imagen_field.name)
    if not os.path.exists(path):
        return False

    tablet_content, celular_content = generate_image_variants(
        imagen_field,
        tablet_ratio=tablet_ratio,
        celular_ratio=celular_ratio,
        normalize_height=normalize_height,
    )

    base = imagen_field.name.rsplit('.', 1)[0]
    obj.imagen_tablet.save(
        f'{base}_tablet.webp', tablet_content, save=False
    )
    obj.imagen_celular.save(
        f'{base}_celular.webp', celular_content, save=False
    )
    obj.save(update_fields=['imagen_tablet', 'imagen_celular'])
    return True


class Command(BaseCommand):
    help = "Regenera variantes tablet/celular para Servicio, SubServicio y Slide"

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='Solo mostrar que se hara')
        parser.add_argument('--model', choices=['Servicio', 'SubServicio', 'Slide'], help='Solo un modelo')

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        model_filter = options.get('model')

        total_processed = 0
        total_errors = 0
        total_skipped = 0

        # Configuracion por modelo
        configs = []

        if not model_filter or model_filter == 'Servicio':
            configs.append({
                'modelo': 'Servicio',
                'queryset': Servicio.objects.all(),
                'imagen_attr': 'imagen',
                'tablet_ratio': 0.75,
                'celular_ratio': 0.5,
                'normalize_height': None,  # Servicio no normaliza
            })

        if not model_filter or model_filter == 'SubServicio':
            configs.append({
                'modelo': 'SubServicio',
                'queryset': SubServicio.objects.all(),
                'imagen_attr': 'imagen',
                'tablet_ratio': 0.70,
                'celular_ratio': 0.50,
                'normalize_height': None,  # Ya esta normalizada por save()
            })

        if not model_filter or model_filter == 'Slide':
            configs.append({
                'modelo': 'Slide',
                'queryset': Slide.objects.all(),
                'imagen_attr': 'imagen',
                'tablet_ratio': 0.75,
                'celular_ratio': 0.5,
                'normalize_height': None,
            })

        for cfg in configs:
            qs = cfg['queryset']
            count = qs.count()
            self.stdout.write(f"\n=== {cfg['modelo']}: {count} registros ===")

            processed = 0
            errors = 0
            skipped = 0

            for obj in qs:
                imagen = getattr(obj, cfg['imagen_attr'])
                nombre = str(obj)

                if not imagen or not imagen.name:
                    self.stdout.write(f"  [-] {nombre}: sin imagen original, omitido")
                    skipped += 1
                    continue

                path = os.path.join(settings.MEDIA_ROOT, imagen.name)
                if not os.path.exists(path):
                    self.stdout.write(f"  [-] {nombre}: archivo no existe en disco: {imagen.name}")
                    skipped += 1
                    continue

                if dry_run:
                    self.stdout.write(f"  [~] {nombre}: se regenerarian variantes desde {imagen.name}")
                    processed += 1
                    continue

                try:
                    ok = _regenerar_variantes(
                        obj, imagen,
                        cfg['tablet_ratio'],
                        cfg['celular_ratio'],
                        cfg['normalize_height'],
                    )
                    if ok:
                        self.stdout.write(f"  [+] {nombre}: variantes regeneradas OK")
                        processed += 1
                    else:
                        self.stdout.write(f"  [-] {nombre}: no se pudo regenerar")
                        skipped += 1
                except Exception as e:
                    self.stdout.write(f"  [ERR] {nombre}: {e}")
                    errors += 1

            self.stdout.write(f"  -> {cfg['modelo']}: procesados {processed}, errores {errors}, omitidos {skipped}")
            total_processed += processed
            total_errors += errors
            total_skipped += skipped

        self.stdout.write(f"\n{'='*50}")
        self.stdout.write(f"Total procesados: {total_processed}")
        self.stdout.write(f"Total errores:    {total_errors}")
        self.stdout.write(f"Total omitidos:   {total_skipped}")
        self.stdout.write(f"{'='*50}")
