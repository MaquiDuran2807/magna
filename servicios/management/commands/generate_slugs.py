from django.core.management.base import BaseCommand
from django.utils.text import slugify
from servicios.models import Servicio, SubServicio
from proyectos.models import Proyecto


class Command(BaseCommand):
    help = 'Genera slugs para Servicio, SubServicio y Proyecto existentes que no tengan slug'

    def handle(self, *args, **options):
        count = 0
        for s in Servicio.objects.filter(slug=''):
            s.slug = slugify(s.nombre)
            s.save(update_fields=['slug'])
            count += 1
            self.stdout.write(f'  Servicio: {s.nombre} -> {s.slug}')
        for s in SubServicio.objects.filter(slug=''):
            s.slug = slugify(s.nombre)
            s.save(update_fields=['slug'])
            count += 1
            self.stdout.write(f'  SubServicio: {s.nombre} -> {s.slug}')
        for p in Proyecto.objects.filter(slug=''):
            p.slug = slugify(p.nombre)
            p.save(update_fields=['slug'])
            count += 1
            self.stdout.write(f'  Proyecto: {p.nombre} -> {p.slug}')
        self.stdout.write(self.style.SUCCESS(f'Total generados: {count}'))
