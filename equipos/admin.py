from django.contrib import admin
from .models import Equipo



# Register your models here.


@admin.register(Equipo)
class EquipoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'posicion', 'imagen')
    search_fields = ('nombre', 'descripcion', 'posicion')
    list_filter = ('posicion',)
    ordering = ('nombre', 'posicion')
    # fields = ('nombre', 'descripcion', 'posicion', 'imagen')
    fieldsets = (
        ('Información del equipo', {
            'fields': ('nombre', 'descripcion', 'posicion')
        }),
        ('Imagen del equipo', {
            'fields': ('imagen',)
        }),
    )