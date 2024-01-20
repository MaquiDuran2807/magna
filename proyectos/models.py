from django.db import models
from servicios.models import Servicio,SubServicio
from equipos.models import Equipo

# Create your models here.
class Client (models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='clients', null=True, blank=True)
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'Client'
        verbose_name_plural = 'Clients'
        ordering = ['name']

estado=(('En Proceso','En Proceso'),('Finalizado','Finalizado'),('Cancelado','Cancelado'))

class TypeProject(models.Model):
    name = models.CharField(max_length=150)
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = 'TypeProject'
        verbose_name_plural = 'TypeProjects'
        ordering = ['name'] 

class Pais (models.Model):
    nombre = models.CharField(max_length=150)
    def __str__(self):
        return self.nombre
    class Meta:
        verbose_name = 'Pais'
        verbose_name_plural = 'Paises'
        ordering = ['nombre']

class Departamento (models.Model):
    nombre = models.CharField(max_length=150)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre
    class Meta:
        verbose_name = 'Departamento'
        verbose_name_plural = 'Departamentos'
        ordering = ['nombre']

class Ciudad (models.Model):
    nombre = models.CharField(max_length=150)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre
    class Meta:
        verbose_name = 'Ciudad'
        verbose_name_plural = 'Ciudades'
        ordering = ['nombre']

class Proyecto(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    tipo = models.ForeignKey(TypeProject, on_delete=models.CASCADE)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.CharField(max_length=50, choices=estado)
    presupuesto = models.IntegerField()
    cliente = models.ForeignKey(Client, on_delete=models.CASCADE)
    lider = models.ForeignKey(Equipo, on_delete=models.CASCADE, related_name='proyectos_lider')
    equipo = models.ManyToManyField(Equipo, related_name='proyectos_equipo')
    servicios = models.ManyToManyField(Servicio)
    subservicios = models.ManyToManyField(SubServicio)
    ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE)
    def __str__(self):
        return self.nombre
    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['estado']


class ProyectoImagen(models.Model):
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='proyectos')
    def __str__(self):
        return self.proyecto.nombre
    class Meta:
        verbose_name = 'ProyectoImagen'
        verbose_name_plural = 'ProyectoImagenes'
        ordering = ['proyecto']
