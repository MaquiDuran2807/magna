from django.db import models

# Create your models here.

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='servicios', null=True, blank=True)
    def __str__(self):
        return self.nombre
    
class SubServicio(models.Model):
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='servicios', null=True, blank=True)
    def __str__(self):
        return self.nombre
