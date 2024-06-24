from django.db import models
from user.models import User
from ckeditor_uploader.fields import RichTextUploadingField
from PIL import Image

class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='category_images', blank=True, null=True)

    def __str__(self):
        return self.name
    

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    content = RichTextUploadingField(blank=True, null=True)
    date_posted = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    important = models.BooleanField(default=False)
    image_blog = models.ImageField(upload_to='comment_images', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)


    def __str__(self):
        return self.title
    

    # ordenar por fecha de publicacion descendente
    class Meta:
        ordering = ['-date_posted',"important"]

class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.text
