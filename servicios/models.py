from django.db import models
from PIL import Image
import io
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile
from .utils import generate_image_variants, make_variant_filename

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='servicios', null=True, blank=True)
    imagen_tablet = models.ImageField(upload_to='imagenes/tablet/', null=True, blank=True)
    imagen_celular = models.ImageField(upload_to='imagenes/celular/', null=True, blank=True)
    icon = models.FileField(upload_to='servicios', null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.imagen and not self._state.adding:
            existing = Servicio.objects.filter(pk=self.pk).first()
            if existing and existing.imagen.name == self.imagen.name:
                super().save(*args, **kwargs)
                return

        if self.imagen:
            img_original = Image.open(self.imagen)
            tablet_content, celular_content = generate_image_variants(
                self.imagen, tablet_ratio=0.75, celular_ratio=0.5
            )
            self._convertir_a_webp_original(img_original)
            self.imagen_tablet.save(
                make_variant_filename(self.imagen.name, 'tablet'),
                tablet_content, save=False
            )
            self.imagen_celular.save(
                make_variant_filename(self.imagen.name, 'celular'),
                celular_content, save=False
            )

        super().save(*args, **kwargs)

    def _convertir_a_webp_original(self, img):
        output = io.BytesIO()
        img.convert('RGB').save(output, format='WEBP', quality=90)
        output.seek(0)
        nombre_webp = self.imagen.name.rsplit('.', 1)[0] + '.webp'
        self.imagen = InMemoryUploadedFile(
            output, 'ImageField', nombre_webp, 'image/webp',
            output.getbuffer().nbytes, None
        )

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

    def save(self, *args, **kwargs):
        if self.imagen and not self._state.adding:
            existing = SubServicio.objects.filter(pk=self.pk).first()
            if existing and existing.imagen.name == self.imagen.name:
                super().save(*args, **kwargs)
                return

        if self.imagen:
            pil_img = Image.open(self.imagen)
            ancho_original, altura_original = pil_img.size
            altura_pantalla = 1600
            proporcion = altura_pantalla / altura_original
            ancho_pantalla = int(ancho_original * proporcion)

            img_normalized = pil_img.resize((ancho_pantalla, altura_pantalla))
            img_io = io.BytesIO()
            img_normalized.save(img_io, format='WebP', quality=90)
            nombre_webp = self.imagen.name.rsplit('.', 1)[0] + '.webp'
            self.imagen.delete(save=False)
            self.imagen.save(nombre_webp, ContentFile(img_io.getvalue()), save=False)

            tablet_content, celular_content = generate_image_variants(
                self.imagen, tablet_ratio=0.70, celular_ratio=0.50,
                normalize_height=altura_pantalla
            )
            base = self.imagen.name.rsplit('.', 1)[0]
            self.imagen_tablet.save(
                f'{base}_tablet.webp', tablet_content, save=False
            )
            self.imagen_celular.save(
                f'{base}_celular.webp', celular_content, save=False
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre
    
class Slide(models.Model):
    nombre = models.CharField(max_length=100, verbose_name='Titulo')
    descripcion = models.TextField(verbose_name='Descripcion')
    imagen = models.ImageField(upload_to='slides', null=True, blank=True, verbose_name='Imagen desktop')
    imagen_tablet = models.ImageField(upload_to='imagenes/tablet/', null=True, blank=True)
    imagen_celular = models.ImageField(upload_to='imagenes/celular/', null=True, blank=True)
    orden = models.PositiveIntegerField(default=0, verbose_name='Orden')
    activo = models.BooleanField(default=True, verbose_name='Activo')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['orden']
        verbose_name = 'Slide'
        verbose_name_plural = 'Slides'

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if self.imagen and not self._state.adding:
            existing = Slide.objects.filter(pk=self.pk).first()
            if existing and existing.imagen.name == self.imagen.name:
                super().save(*args, **kwargs)
                return

        if self.imagen:
            img = Image.open(self.imagen)
            tablet_content, celular_content = generate_image_variants(
                self.imagen, tablet_ratio=0.75, celular_ratio=0.5
            )
            self._convertir_a_webp_original(img)
            self.imagen_tablet.save(
                make_variant_filename(self.imagen.name, 'tablet'),
                tablet_content, save=False
            )
            self.imagen_celular.save(
                make_variant_filename(self.imagen.name, 'celular'),
                celular_content, save=False
            )

        super().save(*args, **kwargs)

    def _convertir_a_webp_original(self, img):
        output = io.BytesIO()
        img.convert('RGB').save(output, format='WEBP', quality=90)
        output.seek(0)
        nombre_webp = self.imagen.name.rsplit('.', 1)[0] + '.webp'
        self.imagen = InMemoryUploadedFile(
            output, 'ImageField', nombre_webp, 'image/webp',
            output.getbuffer().nbytes, None
        )

class Brochure(models.Model):
    nombre = models.CharField(max_length=100)
    archivo = models.FileField(upload_to='brochures')
    def __str__(self):
        return self.nombre
