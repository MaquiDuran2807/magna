from django.db import models

# Create your models here.

class Equipo(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=250)
    posicion = models.CharField(max_length=50)
    imagen_height = models.PositiveIntegerField(null=True, blank=True,default=270)
    imagen_width = models.PositiveIntegerField(null=True, blank=True,default=370)
    imagen = models.ImageField(upload_to='equipos', null=True, blank=True,height_field='imagen_height', width_field='imagen_width', verbose_name="Imagen 270 x 370px del equipo de trabajo")
    def __str__(self):
        return self.nombre
    
    # poner un nombre en plural
    class Meta:
        verbose_name_plural = 'Equipo de trabajo'
        verbose_name = 'Trabajador' # para poner un nombre en singular

class Tenologias(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=250)
    imagen_height = models.PositiveIntegerField(null=True, blank=True,default=270)
    imagen_width = models.PositiveIntegerField(null=True, blank=True,default=370)
    imagen = models.ImageField(upload_to='tecnologias', null=True, blank=True,height_field='imagen_height', width_field='imagen_width', verbose_name="Imagen 270 x 370px del equpio tecnológico")
    def __str__(self):
        return self.nombre
    
    # poner un nombre en plural
    class Meta:
        verbose_name_plural = 'Equipos tecnológicos'
        verbose_name = ' Equipo tecnológico'