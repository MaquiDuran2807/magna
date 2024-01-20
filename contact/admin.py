
from django.contrib import admin
from django.utils import timezone
from .models import Contacto

# Register your models here.

@admin.register(Contacto)
class ContactoAdmin(admin.ModelAdmin):
    list_display = ('contestado','nombre', 'telefono', 'email', 'mensaje', 'timestamp', 'fecha_respuesta')
    search_fields = ('nombre', 'telefono', 'email', 'mensaje')
    list_filter = ('nombre', 'telefono', 'email', 'mensaje', 'timestamp', 'fecha_respuesta', 'contestado')
    fieldsets = (
        ('Contacto', {
            'fields': ('nombre', 'telefono', 'email', 'mensaje', 'timestamp', 'fecha_respuesta', 'contestado')
        }),
    )
    readonly_fields = ('nombre', 'telefono', 'email', 'mensaje', 'timestamp',"fecha_respuesta" )
    ordering = ('-timestamp','contestado')

    def save_form(self, request, form, change):
        obj = super().save_form(request, form, change)
        if 'contestado' in form.changed_data and form.cleaned_data['contestado'] == True:
            obj.fecha_respuesta = timezone.now()
            obj.save()
        return obj
