from django.db import models

class About(models.Model):
    descripcion = models.TextField(max_length=1000, verbose_name="Descripción de Quiénes Somos")
    mision = models.TextField(max_length=1000, verbose_name="Misión")
    vision = models.TextField(max_length=1000, verbose_name="Visión")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Quiénes Somos"

    class Meta:
        verbose_name = "Quiénes Somos"
        verbose_name_plural = "Quiénes Somos"


class Valor(models.Model):
    about = models.ForeignKey(About, on_delete=models.CASCADE, related_name='valores')
    nombre = models.CharField(max_length=100, verbose_name="Nombre del valor")
    descripcion = models.TextField(max_length=500, verbose_name="Descripción")
    orden = models.PositiveIntegerField(default=0, verbose_name="Orden")

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Valor institucional"
        verbose_name_plural = "Valores institucionales"
        ordering = ['orden']
