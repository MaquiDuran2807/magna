from django.contrib import admin
from .models import Client,Proyecto,ProyectoImagen,TypeProject,Ciudad,Departamento,Pais

# Register your models here.

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name','email','phone')
    search_fields = ('name','email','phone')
    ordering = ('name',)

@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('nombre','fecha_inicio','fecha_fin','estado','presupuesto','cliente','lider')
    search_fields = ('nombre','descripcion','fecha_inicio','fecha_fin','estado','presupuesto','cliente','lider')
    ordering = ('estado',)
    filter_horizontal = ('equipo','servicios','subservicios')
    list_filter = ('estado','cliente','lider')

admin.site.register(ProyectoImagen)
admin.site.register(TypeProject)

@admin.register(Ciudad)
class CiudadAdmin(admin.ModelAdmin):
    list_display = ('nombre','departamento')
    search_fields = ('nombre','departamento')
    ordering = ('nombre',)
    list_filter = ('departamento',)
@admin.register(Departamento)
class DepartamentoAdmin(admin.ModelAdmin):
    list_display = ('nombre','pais')
    search_fields = ('nombre','pais')
    ordering = ('nombre',)
    list_filter = ('pais',)
@admin.register(Pais)
class PaisAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    search_fields = ('nombre',)
    ordering = ('nombre',)

