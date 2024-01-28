from django.contrib import admin
from .models import Category, Product

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'price', 'countInStock']
    list_filter = ["name","countInStock"]
    list_editable = ['price', 'countInStock']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['countInStock']
