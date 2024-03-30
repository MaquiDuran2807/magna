from rest_framework import serializers
from .models import Product, Category, Promociones

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'


class PromocionesSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Promociones
        fields = '__all__'