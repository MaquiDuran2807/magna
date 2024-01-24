from django.contrib import admin
from .models import User

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_editor', 'is_staff',"is_active")
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('is_editor', 'is_staff','is_active')
    readonly_fields = ('last_login', 'date_joined')
    fieldsets = (
        ('Personal Information', {
            'fields': ('email', 'first_name', 'last_name')
        }),
        ('Permissions', {
            'fields': ('is_editor', 'is_staff',"is_active")
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        })
    )
    
    