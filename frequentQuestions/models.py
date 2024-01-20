from django.db import models

# Create your models here.

class Pregunta(models.Model):
    pregunta = models.CharField(max_length=200)
    respuesta = models.TextField()
    def __str__(self):
        return self.pregunta
    class Meta:
        verbose_name = 'Pregunta'
        verbose_name_plural = 'Preguntas'
        ordering = ['pregunta']
