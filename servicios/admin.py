from django.contrib import admin

# Register your models here.

from .models import Servicio, SubServicio

admin.site.register(SubServicio)

@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'imagen')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('nombre', 'descripcion')
    ordering = ('nombre', 'descripcion')
