from django.db import models

# Create your models here.

class Equipo(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=250)
    posicion = models.CharField(max_length=50)
    imagen = models.ImageField(upload_to='equipos', null=True, blank=True)
    def __str__(self):
        return self.nombre
