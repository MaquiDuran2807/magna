from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'
        ordering = ['name']

class Product(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
    brand = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    countInStock = models.IntegerField()
    description = models.TextField()
    rating = models.DecimalField(max_digits=4, decimal_places=2)
    numReviews = models.IntegerField()
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'product'
        verbose_name_plural = 'products'
        ordering = ['name',"countInStock"]
