from rest_framework import serializers
from .models import Brochure, Servicio, SubServicio, Characteristic
import base64
from django.core.files.base import ContentFile

class subServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubServicio
        fields = '__all__'

class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    subservicios = subServicesSerializer(many=True, read_only=True,source='subservicio_set')
    caracteristicas = CharacteristicSerializer(many=True, read_only=True,source='characteristic_set')
    class Meta:
        model = Servicio
        fields = ['id','nombre', 'descripcion', 'imagen', 'icon', 'subservicios', 'caracteristicas']

class GetIdServiciosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'nombre']

class ServicesAndSubservicesSerializer(serializers.ModelSerializer):
    subservicios = subServicesSerializer(many=True, read_only=True)

    class Meta:
        model = Servicio
        fields = '__all__'

class BrochureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brochure
        fields = ['nombre', 'archivo']
