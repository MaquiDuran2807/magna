from rest_framework import serializers
from .models import Brochure, Servicio, SubServicio, Characteristic, Slide
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
        fields = ['id','nombre', 'descripcion', 'imagen', 'icon','imagen_tablet', 'imagen_celular', 'subservicios', 'caracteristicas']

class GetIdServiciosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'nombre']

class ServicesAndSubservicesSerializer(serializers.ModelSerializer):
    subservicios = subServicesSerializer(many=True, read_only=True)

    class Meta:
        model = Servicio
        fields = ['id', 'nombre','descripcion', 'imagen', 'icon', 'imagen_tablet', 'imagen_celular']

class SlideSerializer(serializers.ModelSerializer):
    tipo = serializers.SerializerMethodField()

    class Meta:
        model = Slide
        fields = ['id', 'tipo', 'nombre', 'descripcion', 'imagen', 'imagen_tablet', 'imagen_celular', 'orden']

    def get_tipo(self, obj):
        return 'slide'


class ServicioSlideSerializer(serializers.ModelSerializer):
    tipo = serializers.SerializerMethodField()
    orden = serializers.SerializerMethodField()

    class Meta:
        model = Servicio
        fields = ['id', 'tipo', 'nombre', 'descripcion', 'imagen', 'imagen_tablet', 'imagen_celular', 'orden']

    def get_tipo(self, obj):
        return 'servicio'

    def get_orden(self, obj):
        return obj.id  # Servicios se ordenan por ID


class BrochureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brochure
        fields = ['id','nombre', 'archivo']
