from django.contrib import admin

# Register your models here.

from .models import Servicio, SubServicio,Brochure,Characteristic

admin.site.register(SubServicio)

@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'imagen')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('nombre', 'descripcion')
    ordering = ('nombre', 'descripcion')

@admin.register(Characteristic)
class CharacteristicAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('nombre', 'descripcion')
    ordering = ('nombre', 'descripcion')

@admin.register(Brochure)
class BrochureAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'archivo')
    search_fields = ('nombre', 'archivo')
    list_filter = ('nombre', 'archivo')
    ordering = ('nombre', 'archivo')
