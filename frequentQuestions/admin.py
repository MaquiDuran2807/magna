from django.contrib import admin
from .models import Pregunta

# Register your models here.

@admin.register(Pregunta)
class PreguntaAdmin(admin.ModelAdmin):
    list_display = ('pregunta', 'respuesta')
    search_fields = ('pregunta', 'respuesta')
    list_filter = ('pregunta', 'respuesta')
    fieldsets = (
        ('Pregunta', {
            'fields': ('pregunta', 'respuesta')
        }),
    )
    ordering = ('pregunta', 'respuesta')
