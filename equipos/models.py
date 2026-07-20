from io import BytesIO
from django.db import models
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from PIL import Image as PilImage

TARGET_W = 280
TARGET_H = 380


def _webp(img):
    if not img or not img.name or img.name.lower().endswith('.webp'):
        return None
    pil = PilImage.open(img)
    w, h = pil.size
    if w > TARGET_W or h > TARGET_H:
        r = min(TARGET_W / w, TARGET_H / h)
        pil = pil.resize((int(w * r), int(h * r)), PilImage.LANCZOS)
    if pil.mode in ('RGBA', 'P'):
        bg = PilImage.new('RGB', pil.size, (255, 255, 255))
        if pil.mode == 'P':
            pil = pil.convert('RGBA')
        bg.paste(pil, mask=pil.split()[3])
        pil = bg
    buf = BytesIO()
    pil.save(buf, format='WEBP', quality=90)
    base = img.name.rsplit('.', 1)[0]
    nombre = f'{base}.webp'
    upload_to = img.field.upload_to if hasattr(img, 'field') else ''
    # If the name already has the upload_to prefix, strip it for save()
    if upload_to and nombre.startswith(f'{upload_to}/'):
        nombre = nombre[len(upload_to) + 1:]
    return ContentFile(buf.getvalue()), nombre


class Equipo(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=250)
    posicion = models.CharField(max_length=50)
    imagen_height = models.PositiveIntegerField(null=True, blank=True, default=270)
    imagen_width = models.PositiveIntegerField(null=True, blank=True, default=370)
    imagen = models.ImageField(upload_to='equipos', null=True, blank=True,height_field='imagen_height', width_field='imagen_width', verbose_name="Imagen 270 x 370px del equipo de trabajo")

    def save(self, *args, **kwargs):
        r = _webp(self.imagen)
        if r:
            if self.pk:
                old = type(self).objects.filter(pk=self.pk).only('imagen').first()
                if old and old.imagen and old.imagen.name and old.imagen.name != self.imagen.name:
                    old.imagen.delete(save=False)
            default_storage.delete(f'equipos/{r[1]}')
            self.imagen.save(r[1], r[0], save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name_plural = 'Equipo de trabajo'
        verbose_name = 'Trabajador'


class Tenologias(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=250)
    imagen_height = models.PositiveIntegerField(null=True, blank=True, default=270)
    imagen_width = models.PositiveIntegerField(null=True, blank=True, default=370)
    imagen = models.ImageField(upload_to='tecnologias', null=True, blank=True,height_field='imagen_height', width_field='imagen_width', verbose_name="Imagen 270 x 370px del equipo tecnológico")

    def save(self, *args, **kwargs):
        r = _webp(self.imagen)
        if r:
            if self.pk:
                old = type(self).objects.filter(pk=self.pk).only('imagen').first()
                if old and old.imagen and old.imagen.name and old.imagen.name != self.imagen.name:
                    old.imagen.delete(save=False)
            default_storage.delete(f'tecnologias/{r[1]}')
            self.imagen.save(r[1], r[0], save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name_plural = 'Equipos tecnológicos'
        verbose_name = 'Equipo tecnológico'