from django.db import models

# Create your models here.

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='servicios', null=True, blank=True)
    icon = models.FileField(upload_to='servicios', null=True, blank=True)
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
    def __str__(self):
        return self.nombre
    
class Brochure(models.Model):
    nombre = models.CharField(max_length=100)
    archivo = models.FileField(upload_to='brochures')
    def __str__(self):
        return self.nombre
