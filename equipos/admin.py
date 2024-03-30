from django.contrib import admin
from .models import Equipo, Tenologias



# Register your models here.


@admin.register(Equipo)
class EquipoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'posicion', 'imagen')
    search_fields = ('nombre', 'descripcion', 'posicion')
    list_filter = ('posicion',)
    ordering = ('nombre', 'posicion')
    # 
    fieldsets = (
        ('Información del equipo', {
            'fields': ('nombre', 'descripcion', 'posicion')
        }),
        ('Imagen del equipo', {
            'fields': ('imagen',)
        }),
    )

@admin.register(Tenologias)

class TenologiasAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'imagen')
    search_fields = ('nombre', 'descripcion')
    ordering = ('nombre',)
    # 
    fieldsets = (
        ('Información del equipo', {
            'fields': ('nombre', 'descripcion')
        }),
        ('Imagen del equipo', {
            'fields': ('imagen',)
        }),
    )