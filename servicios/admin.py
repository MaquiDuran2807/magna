from django.contrib import admin

# Register your models here.

from .models import Servicio, SubServicio, Brochure, Characteristic, Slide

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

@admin.register(Slide)
class SlideAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'orden', 'activo', 'created_at')
    list_editable = ('orden', 'activo')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('activo',)
    ordering = ('orden',)

@admin.register(Brochure)
class BrochureAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'archivo')
    search_fields = ('nombre', 'archivo')
    list_filter = ('nombre', 'archivo')
    ordering = ('nombre', 'archivo')
