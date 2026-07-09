from django.core.management.base import BaseCommand
from django.conf import settings
from PIL import Image as PilImage
from io import BytesIO
from django.core.files.base import ContentFile
import os
from datetime import datetime


class Command(BaseCommand):
    help = 'Genera variantes imagen_tablet e imagen_celular faltantes en Servicio y SubServicio'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Solo muestra que se procesaria sin escribir archivos'
        )
        parser.add_argument(
            '--model',
            type=str,
            choices=['servicio', 'subservicio', 'all'],
            default='all',
            help='Modelo a procesar'
        )

    def handle(self, *args, **options):
        self.dry_run = options['dry_run']
        model_filter = options['model']
        self.start_time = datetime.now()

        results = {
            'servicio': {'processed': 0, 'errors': 0, 'skipped': 0},
            'subservicio': {'processed': 0, 'errors': 0, 'skipped': 0},
        }

        if model_filter in ('servicio', 'all'):
            self.process_servicios(results)

        if model_filter in ('subservicio', 'all'):
            self.process_subservicios(results)

        elapsed = (datetime.now() - self.start_time).total_seconds()
        self.print_summary(results, elapsed)

    def process_servicios(self, results):
        from ...models import Servicio

        qs = Servicio.objects.filter(
            imagen__isnull=False
        ).exclude(
            imagen=''
        )
        self.stdout.write(f'\nProcesando {qs.count()} Servicios con imagen...')

        for s in qs:
            needs_tablet = not s.imagen_tablet or not s.imagen_tablet.name
            needs_celular = not s.imagen_celular or not s.imagen_celular.name

            if not needs_tablet and not needs_celular:
                results['servicio']['skipped'] += 1
                continue

            try:
                source_path = s.imagen.path
                if not os.path.exists(source_path):
                    self.stderr.write(f'  [ERROR] {s.nombre}: imagen no encontrada en {source_path}')
                    results['servicio']['errors'] += 1
                    continue

                img = PilImage.open(source_path)
                ancho_original, alto_original = img.size

                if needs_tablet:
                    ratio = 0.75
                    new_size = (int(ancho_original * ratio), int(alto_original * ratio))
                    img_tablet = img.resize(new_size, PilImage.LANCZOS)
                    name = f'tablet_{os.path.basename(s.imagen.name)}'
                    name_webp = name.rsplit('.', 1)[0] + '.webp'
                    buffer = BytesIO()
                    img_tablet.convert('RGB').save(buffer, format='WEBP', quality=90)
                    if not self.dry_run:
                        s.imagen_tablet.save(name_webp, ContentFile(buffer.getvalue()), save=False)
                    self.stdout.write(f'  [OK] {s.nombre}: tablet generado ({new_size[0]}x{new_size[1]})')

                if needs_celular:
                    ratio = 0.5
                    new_size = (int(ancho_original * ratio), int(alto_original * ratio))
                    img_celular = img.resize(new_size, PilImage.LANCZOS)
                    name = f'celular_{os.path.basename(s.imagen.name)}'
                    name_webp = name.rsplit('.', 1)[0] + '.webp'
                    buffer = BytesIO()
                    img_celular.convert('RGB').save(buffer, format='WEBP', quality=90)
                    if not self.dry_run:
                        s.imagen_celular.save(name_webp, ContentFile(buffer.getvalue()), save=False)
                    self.stdout.write(f'  [OK] {s.nombre}: celular generado ({new_size[0]}x{new_size[1]})')

                if not self.dry_run:
                    s.save(update_fields=['imagen_tablet', 'imagen_celular'])

                results['servicio']['processed'] += 1

            except Exception as e:
                self.stderr.write(f'  [ERROR] {s.nombre}: {str(e)}')
                results['servicio']['errors'] += 1

    def process_subservicios(self, results):
        from ...models import SubServicio

        qs = SubServicio.objects.filter(
            imagen__isnull=False
        ).exclude(
            imagen=''
        )
        self.stdout.write(f'\nProcesando {qs.count()} SubServicios con imagen...')

        for s in qs:
            needs_tablet = not s.imagen_tablet or not s.imagen_tablet.name
            needs_celular = not s.imagen_celular or not s.imagen_celular.name

            if not needs_tablet and not needs_celular:
                results['subservicio']['skipped'] += 1
                continue

            try:
                source_path = s.imagen.path
                if not os.path.exists(source_path):
                    self.stderr.write(f'  [ERROR] {s.nombre}: imagen no encontrada en {source_path}')
                    results['subservicio']['errors'] += 1
                    continue

                pil_img = PilImage.open(source_path)
                ancho_original, altura_original = pil_img.size

                altura_pantalla = 900
                proporcion = altura_pantalla / altura_original
                ancho_pantalla = int(ancho_original * proporcion)
                size_pantalla = (ancho_pantalla, altura_pantalla)
                img_pantalla = pil_img.resize(size_pantalla, PilImage.LANCZOS)

                base_name = os.path.basename(s.imagen.name).rsplit('.', 1)[0]

                if needs_tablet:
                    ratio = 0.70
                    new_size = (int(ancho_pantalla * ratio), int(altura_pantalla * ratio))
                    img_tablet = img_pantalla.resize(new_size, PilImage.LANCZOS)
                    buffer = BytesIO()
                    img_tablet.save(buffer, format='WebP', quality=90)
                    if not self.dry_run:
                        s.imagen_tablet.save(
                            f'{base_name}_tablet.webp',
                            ContentFile(buffer.getvalue()),
                            save=False
                        )
                    self.stdout.write(f'  [OK] {s.nombre}: tablet generado ({new_size[0]}x{new_size[1]})')

                if needs_celular:
                    ratio = 0.50
                    new_size = (int(ancho_pantalla * ratio), int(altura_pantalla * ratio))
                    img_celular = img_pantalla.resize(new_size, PilImage.LANCZOS)
                    buffer = BytesIO()
                    img_celular.save(buffer, format='WebP', quality=90)
                    if not self.dry_run:
                        s.imagen_celular.save(
                            f'{base_name}_celular.webp',
                            ContentFile(buffer.getvalue()),
                            save=False
                        )
                    self.stdout.write(f'  [OK] {s.nombre}: celular generado ({new_size[0]}x{new_size[1]})')

                if not self.dry_run:
                    s.save(update_fields=['imagen_tablet', 'imagen_celular'])

                results['subservicio']['processed'] += 1

            except Exception as e:
                self.stderr.write(f'  [ERROR] {s.nombre}: {str(e)}')
                results['subservicio']['errors'] += 1

    def print_summary(self, results, elapsed):
        self.stdout.write('\n' + '=' * 60)
        self.stdout.write('RESUMEN')
        self.stdout.write('=' * 60)
        total_processed = 0
        total_errors = 0
        total_skipped = 0
        for model_name, data in results.items():
            self.stdout.write(f'\n{model_name.capitalize()}:')
            self.stdout.write(f'  Procesados: {data["processed"]}')
            self.stdout.write(f'  Errores:    {data["errors"]}')
            self.stdout.write(f'  Omitidos:   {data["skipped"]}')
            total_processed += data['processed']
            total_errors += data['errors']
            total_skipped += data['skipped']
        self.stdout.write(f'\nTotal procesados: {total_processed}')
        self.stdout.write(f'Total errores:    {total_errors}')
        self.stdout.write(f'Total omitidos:   {total_skipped}')
        self.stdout.write(f'Tiempo:           {elapsed:.2f}s')
        if self.dry_run:
            self.stdout.write(self.style.WARNING('\nMODO DRY-RUN: no se escribieron archivos'))
