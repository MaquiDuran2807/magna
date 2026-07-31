from django.db import models
from PIL import Image
import io
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile
from django.utils.text import slugify

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='servicios', null=True, blank=True)
    imagen_tablet = models.ImageField(upload_to='imagenes/tablet/', null=True, blank=True)
    imagen_celular = models.ImageField(upload_to='imagenes/celular/', null=True, blank=True)
    icon = models.FileField(upload_to='servicios', null=True, blank=True)
    slug = models.SlugField(max_length=100, blank=True, default='')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)[:100]
        if self.imagen:
            img_original = Image.open(self.imagen)

            # Redimensionar para tablet
            porcentaje_reduccion_tablet = 0.75  # Reducir a 75% del tamaño original para tablet
            porcentaje_reduccion_celular = 0.5  # Reducir a 50% del tamaño original para celular

            # Obtener las dimensiones originales de la imagen
            ancho_original, alto_original = img_original.size

            # Calcular las nuevas dimensiones basadas en los porcentajes de reducción
            nuevo_ancho_tablet = int(ancho_original * porcentaje_reduccion_tablet)
            nuevo_alto_tablet = int(alto_original * porcentaje_reduccion_tablet)
            nuevo_ancho_celular = int(ancho_original * porcentaje_reduccion_celular)
            nuevo_alto_celular = int(alto_original * porcentaje_reduccion_celular)

            # Redimensionar la imagen para tablet y celular con los nuevos tamaños
            img_tablet = img_original.resize((nuevo_ancho_tablet, nuevo_alto_tablet))
            img_celular = img_original.resize((nuevo_ancho_celular, nuevo_alto_celular))

            # Función para comprimir y guardar imagen
            def comprimir_y_guardar(imagen, nombre_archivo):
                output = io.BytesIO()
                imagen.convert('RGB').save(output, format='WEBP', quality=90)
                output.seek(0)
                nombre_archivo_webp = nombre_archivo.rsplit('.', 1)[0] + '.webp'
                return InMemoryUploadedFile(output, 'ImageField', nombre_archivo_webp, 'image/webp', output.getbuffer().nbytes, None)

            # Comprimir y guardar la imagen original
            self.imagen = comprimir_y_guardar(img_original, self.imagen.name)
            # Comprimir y guardar la imagen para tablet
            self.imagen_tablet = comprimir_y_guardar(img_tablet, "tablet_" + self.imagen.name)
            # Comprimir y guardar la imagen para celular
            self.imagen_celular = comprimir_y_guardar(img_celular, "celular_" + self.imagen.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

class Characteristic(models.Model):
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.nombre
    
class SubServicio(models.Model):
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='servicios', null=True, blank=True)
    imagen_tablet = models.ImageField(upload_to='imagenes/tablet/', null=True, blank=True)
    imagen_celular = models.ImageField(upload_to='imagenes/celular/', null=True, blank=True)
    slug = models.SlugField(max_length=100, blank=True, default='')
    meta_description = models.CharField(max_length=160, blank=True, default='')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)[:100]
        if self.imagen:
            pil_img = Image.open(self.imagen)

            ancho_original, altura_original = pil_img.size

            altura_pantalla = 900
            proporcion = altura_pantalla / altura_original
            ancho_pantalla = int(ancho_original * proporcion)

            size_pantalla = (ancho_pantalla, altura_pantalla)

            img_pantalla = pil_img.resize(size_pantalla)
            img_io_pantalla = io.BytesIO()
            img_pantalla.save(img_io_pantalla, format='WebP', quality=90)
            img_pantalla_nombre = self.imagen.name.split('.')[0] + '.webp'
            self.imagen.delete(save=False)
            self.imagen.save(img_pantalla_nombre, content=ContentFile(img_io_pantalla.getvalue()), save=False)

            porcentaje_tablet = 0.70
            porcentaje_celular = 0.50

            size_tablet = (int(ancho_pantalla * porcentaje_tablet), int(altura_pantalla * porcentaje_tablet))
            size_celular = (int(ancho_pantalla * porcentaje_celular), int(altura_pantalla * porcentaje_celular))

            img_tablet = pil_img.resize(size_tablet)
            img_io_tablet = io.BytesIO()
            img_tablet.save(img_io_tablet, format='WebP', quality=90)
            self.imagen_tablet.save(self.imagen.name.split('.')[0] + '_tablet.webp', ContentFile(img_io_tablet.getvalue()), save=False)

            img_celular = pil_img.resize(size_celular)
            img_io_celular = io.BytesIO()
            img_celular.save(img_io_celular, format='WebP', quality=90)
            self.imagen_celular.save(self.imagen.name.split('.')[0] + '_celular.webp', ContentFile(img_io_celular.getvalue()), save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

class Slide(models.Model):
    nombre = models.CharField(max_length=100, verbose_name='Titulo')
    descripcion = models.TextField(verbose_name='Descripcion')
    imagen = models.ImageField(upload_to='slides', blank=True, null=True, verbose_name='Imagen desktop')
    imagen_tablet = models.ImageField(upload_to='imagenes/tablet/', blank=True, null=True)
    imagen_celular = models.ImageField(upload_to='imagenes/celular/', blank=True, null=True)
    orden = models.PositiveIntegerField(default=0, verbose_name='Orden')
    activo = models.BooleanField(default=True, verbose_name='Activo')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Slide'
        verbose_name_plural = 'Slides'
        ordering = ['orden']

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if self.imagen:
            img_original = Image.open(self.imagen)

            porcentaje_reduccion_tablet = 0.75
            porcentaje_reduccion_celular = 0.5

            ancho_original, alto_original = img_original.size

            nuevo_ancho_tablet = int(ancho_original * porcentaje_reduccion_tablet)
            nuevo_alto_tablet = int(alto_original * porcentaje_reduccion_tablet)
            nuevo_ancho_celular = int(ancho_original * porcentaje_reduccion_celular)
            nuevo_alto_celular = int(alto_original * porcentaje_reduccion_celular)

            img_tablet = img_original.resize((nuevo_ancho_tablet, nuevo_alto_tablet))
            img_celular = img_original.resize((nuevo_ancho_celular, nuevo_alto_celular))

            def comprimir_y_guardar(imagen, nombre_archivo):
                output = io.BytesIO()
                imagen.convert('RGB').save(output, format='WEBP', quality=90)
                output.seek(0)
                nombre_archivo_webp = nombre_archivo.rsplit('.', 1)[0] + '.webp'
                return InMemoryUploadedFile(output, 'ImageField', nombre_archivo_webp, 'image/webp', output.getbuffer().nbytes, None)

            self.imagen = comprimir_y_guardar(img_original, self.imagen.name)
            self.imagen_tablet = comprimir_y_guardar(img_tablet, 'tablet_' + self.imagen.name)
            self.imagen_celular = comprimir_y_guardar(img_celular, 'celular_' + self.imagen.name)

        super().save(*args, **kwargs)

class Brochure(models.Model):
    nombre = models.CharField(max_length=100)
    archivo = models.FileField(upload_to='brochures')
    def __str__(self):
        return self.nombre

import os
if os.environ.get('PRERENDER_AUTO', '1') == '1':
    import servicios.signals
