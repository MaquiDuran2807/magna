from django.contrib import admin
from .models import BlogPost, Category, Comment
from django.db import models
from ckeditor_uploader.widgets import CKEditorUploadingWidget



# Register your models here.


@admin.register(BlogPost)

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date_posted')
    list_filter = ('author', 'date_posted')
    search_fields = ('title', 'content')
    date_hierarchy = 'date_posted'
    ordering = ('date_posted',)
    

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_date')
    list_filter = ('created_date',)
    search_fields = ('author', 'post', 'created_date')
    date_hierarchy = 'created_date'
    ordering = ('created_date',)
   
