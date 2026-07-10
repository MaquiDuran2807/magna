"""
Management command para analizar las imgenes de SubServicio
y detectar problemas de tamao/calidad.

Uso:
    python manage.py analyze_images
    python manage.py analyze_images --fix   (propone regenerar variantes)
"""

from django.core.management.base import BaseCommand
from django.conf import settings
from PIL import Image
import os

from servicios.models import SubServicio


# El carrusel renderiza slides con slidesPerView=1.
# El contenedor .slide-service tiene height: 70vw.
# La imagen usa object-fit: cover, object-position: center.
#
# En desktop tipico (1920px viewport, sidebar 300px):
#   main ~ 1620px (1920 - 300 - gap - padding)
#   slide-height ~ 70vw ~ 1344px
#   La imagen necesita >= 1620x1344 px para verse ntida
#
# La imagen normalizada tiene target-height = 900px.
# tablet = 70% de la normalizada, celular = 50%.
#
# Si el original es pequeo, se escala a 900px de altura
# perdiendo calidad. Este script detecta esos casos.

DESKTOP_VIEWPORT = 1920
SIDEBAR_WIDTH = 300
GAP = 24
PADDING = 24 * 2  # wrapper padding
MAIN_WIDTH = DESKTOP_VIEWPORT - SIDEBAR_WIDTH - GAP - PADDING  # ~1548
SLIDE_HEIGHT = int(MAIN_WIDTH * 0.70)  # 70vw ~ 1084

MIN_WIDTH = MAIN_WIDTH
MIN_HEIGHT = SLIDE_HEIGHT


def fmt_bytes(size):
    for unit in ('B', 'KB', 'MB'):
        if size < 1024:
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} GB"


class Command(BaseCommand):
    help = "Analiza dimensiones y calidad de imgenes de subservicios"

    def add_arguments(self, parser):
        parser.add_argument(
            '--fix',
            action='store_true',
            help='Recomendar acciones para regenerar imgenes problemticas',
        )

    def analyze_image(self, path, label, width_needed, height_needed):
        """Retorna dict con anlisis de una imagen."""
        result = {
            'label': label,
            'exists': False,
            'original_w': 0,
            'original_h': 0,
            'file_size': 0,
            'aspect_ratio': 0,
            'w_ok': False,
            'h_ok': False,
            'pixels_ok': False,
            'issues': [],
        }

        if not path or not os.path.exists(path):
            result['issues'].append("NO_EXISTE")
            return result

        try:
            img = Image.open(path)
            w, h = img.size
            result['exists'] = True
            result['original_w'] = w
            result['original_h'] = h
            result['file_size'] = os.path.getsize(path)
            result['aspect_ratio'] = round(w / h, 2) if h else 0

            # Alcanza para cubrir el contenedor?
            result['w_ok'] = w >= width_needed
            result['h_ok'] = h >= height_needed
            result['pixels_ok'] = result['w_ok'] and result['h_ok']

            if not result['w_ok']:
                result['issues'].append(
                    f"ANCHO_INSUFICIENTE: {w}px < {width_needed}px "
                    f"(necesita {width_needed // w}x zoom)"
                )
            if not result['h_ok']:
                result['issues'].append(
                    f"ALTO_INSUFICIENTE: {h}px < {height_needed}px "
                    f"(necesita {height_needed // h}x zoom)"
                )

            # Relacin de aspecto extrema
            if result['aspect_ratio'] > 2.5:
                result['issues'].append(
                    f"PANORAMICA: ratio {result['aspect_ratio']} > 2.5, "
                    "se cortar mucho con object-fit: cover"
                )
            if result['aspect_ratio'] < 0.8:
                result['issues'].append(
                    f"RETRATO: ratio {result['aspect_ratio']} < 0.8, "
                    "se cortar mucho con object-fit: cover"
                )

            # Tamao de archivo pequeo + dimensiones pequeas = baja calidad
            if w < 800 and h < 600:
                result['issues'].append(
                    f"BAJA_RESOLUCION: {w}x{h} --- se ve pixelado al escalar "
                    f"a {width_needed}x{height_needed}"
                )

            img.close()
        except Exception as e:
            result['issues'].append(f"ERROR_LECTURA: {e}")

        return result

    def handle(self, *args, **options):
        fix_mode = options.get('fix', False)
        media_root = settings.MEDIA_ROOT

        subservicios = SubServicio.objects.select_related('servicio').all()
        total = subservicios.count()

        self.stdout.write(f"\n{'='*80}")
        self.stdout.write(f"ANLISIS DE IMGENES DE SUBSERVICIOS ({total} registros)")
        self.stdout.write(f"{'='*80}")
        self.stdout.write(f"\nContenedor carrusel esperado:")
        self.stdout.write(f"  Main width ~ {MAIN_WIDTH}px")
        self.stdout.write(f"  Slide height ~ {SLIDE_HEIGHT}px (70vw)")
        self.stdout.write(f"  Se necesita imagen >= {MIN_WIDTH}x{MIN_HEIGHT}px")
        self.stdout.write(f"{'='*80}\n")

        bad_count = 0
        good_count = 0
        all_issues = []

        for ss in subservicios:
            nombre = ss.nombre
            servicio_nombre = ss.servicio.nombre if ss.servicio else "SIN_SERVICIO"

            self.stdout.write(f"\n--- {servicio_nombre} -> {nombre} (id={ss.id}) ---")

            # Analizar las 3 versiones
            img_full_path = None
            img_tab_path = None
            img_cel_path = None

            if ss.imagen:
                img_full_path = os.path.join(media_root, ss.imagen.name)
            if ss.imagen_tablet:
                img_tab_path = os.path.join(media_root, ss.imagen_tablet.name)
            if ss.imagen_celular:
                img_cel_path = os.path.join(media_root, ss.imagen_celular.name)

            # El full se muestra en desktop (necesita MIN_WIDTH x MIN_HEIGHT)
            full = self.analyze_image(img_full_path, "FULL", MIN_WIDTH, MIN_HEIGHT)
            # Tablet se muestra en tablets ~1024px (70% del full)
            tablet = self.analyze_image(img_tab_path, "TABLET", int(MIN_WIDTH * 0.7), int(MIN_HEIGHT * 0.7))
            # Celular se muestra en mobile ~450px (50% del full)
            celular = self.analyze_image(img_cel_path, "CELULAR", int(MIN_WIDTH * 0.5), int(MIN_HEIGHT * 0.5))

            for result in [full, tablet, celular]:
                if result['exists']:
                    w = result['original_w']
                    h = result['original_h']
                    status = "[OK]" if result['pixels_ok'] else "!"
                    self.stdout.write(
                        f"  {status} {result['label']}: {w}x{h} "
                        f"(ratio {result['aspect_ratio']}) "
                        f"[{fmt_bytes(result['file_size'])}]"
                    )
                    for issue in result['issues']:
                        self.stdout.write(f"        [ERR] {issue}")
                    if not result['pixels_ok']:
                        bad_count += 1
                        all_issues.append((servicio_nombre, nombre, result['label'], result['issues']))
                    else:
                        good_count += 1
                else:
                    self.stdout.write(f"  !  {result['label']}: NO_EXISTE")
                    bad_count += 1

        # Resumen
        self.stdout.write(f"\n{'='*80}")
        self.stdout.write(f"RESUMEN")
        self.stdout.write(f"{'='*80}")
        self.stdout.write(f"  Subservicios analizados: {total}")
        self.stdout.write(f"  Versiones OK: {good_count}")
        self.stdout.write(f"  Versiones con problemas: {bad_count}")

        if all_issues:
            self.stdout.write(f"\n{'='*80}")
            self.stdout.write(f"TOP IMGENES CON MS PROBLEMAS")
            self.stdout.write(f"{'='*80}")
            for servicio, nombre, version, issues in all_issues[:10]:
                self.stdout.write(f"  !  {servicio} -> {nombre} ({version})")
                for i in issues[:3]:
                    self.stdout.write(f"       - {i}")

        # Propuesta de solucin
        if fix_mode:
            self.stdout.write(f"\n{'='*80}")
            self.stdout.write(f"PROPUESTA DE SOLUCIN")
            self.stdout.write(f"{'='*80}")
            self.stdout.write(f"""
CAUSA RAZ:
  Algunas imgenes originales tienen baja resolucin y son escaladas
  forzosamente a 900px de altura en el save() de SubServicio.
  El escalado forzado introduce borrosidad.

SOLUCIN RECOMENDADA:
  1. IDENTIFICAR las imgenes marcadas como BAJA_RESOLUCION o
     ANCHO_INSUFICIENTE en el reporte de arriba.

  2. SUBIR versiones de mayor resolucin desde el admin de Django.
     Resolucin mnima recomendada: {MIN_WIDTH}x{MIN_HEIGHT}px
     (para cubrir el carrusel en desktop).

  3. OPCIONAL: reducir el target-height en SubServicio.save()
     de 900px a 600px, as las imgenes pequeas se escalan menos
     y se ven menos borrosas. Pero las imgenes grandes se vern
     ms pequeas en el carrusel.

  4. REGENERAR variantes para las imgenes ya existentes:
     python manage.py generate_image_variants

  5. ALTERNATIVA: cambiar object-fit: cover por contain + fondo
     para que imgenes pequeas no se estiren.
     Esto se hace en sliderService.css:
       .img-subservicio {
         object-fit: contain;   en vez de cover
         background: #0f2440;
       }
""")

        self.stdout.write(f"\n{'='*80}\n")
