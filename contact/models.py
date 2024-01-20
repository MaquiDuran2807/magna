from django.db import models

# Create your models here.

class Contacto(models.Model):
    nombre = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    email = models.EmailField()
    mensaje = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    fecha_respuesta = models.DateTimeField(null=True, blank=True)
    contestado = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Contacto'
        verbose_name_plural = 'Contactos'
        ordering = ['contestado', '-timestamp']
