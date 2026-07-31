from django.contrib import admin
from .models import About, Valor


class ValorInline(admin.TabularInline):
    model = Valor
    extra = 1
    fields = ('nombre', 'descripcion', 'orden')


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    inlines = [ValorInline]
    fieldsets = (
        ('Información general', {
            'fields': ('descripcion',)
        }),
        ('Misión y Visión', {
            'fields': ('mision', 'vision')
        }),
    )

    def has_add_permission(self, request):
        if About.objects.exists():
            return False
        return True
