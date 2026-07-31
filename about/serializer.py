from rest_framework import serializers
from .models import About, Valor


class ValorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valor
        fields = ['id', 'nombre', 'descripcion', 'orden']


class AboutSerializer(serializers.ModelSerializer):
    valores = ValorSerializer(many=True, read_only=True)

    class Meta:
        model = About
        fields = ['id', 'descripcion', 'mision', 'vision', 'valores', 'updated_at']
