from rest_framework import serializers
from .models import Brochure, Servicio, SubServicio, Characteristic, Slide


class AbsoluteImageField(serializers.ImageField):
    def to_representation(self, value):
        if not value:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(value.url)
        return value.url


class subServicesSerializer(serializers.ModelSerializer):
    imagen = AbsoluteImageField()
    imagen_tablet = AbsoluteImageField()
    imagen_celular = AbsoluteImageField()

    class Meta:
        model = SubServicio
        fields = ['id', 'nombre', 'descripcion', 'meta_description', 'slug', 'imagen', 'imagen_tablet', 'imagen_celular', 'servicio']


class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic
        fields = '__all__'


class SubServicioDetailSerializer(serializers.ModelSerializer):
    servicio_padre = serializers.SerializerMethodField()
    imagen = AbsoluteImageField()
    imagen_tablet = AbsoluteImageField()
    imagen_celular = AbsoluteImageField()

    class Meta:
        model = SubServicio
        fields = [
            'id', 'nombre', 'descripcion', 'meta_description',
            'slug', 'imagen', 'imagen_tablet', 'imagen_celular',
            'servicio', 'servicio_padre',
        ]

    def get_servicio_padre(self, obj):
        return {
            'nombre': obj.servicio.nombre,
            'slug': obj.servicio.slug,
            'id': obj.servicio.id,
        }


class ServicioSerializer(serializers.ModelSerializer):
    subservicios = subServicesSerializer(many=True, read_only=True, source='subservicio_set')
    caracteristicas = CharacteristicSerializer(many=True, read_only=True, source='characteristic_set')
    imagen = AbsoluteImageField()
    imagen_tablet = AbsoluteImageField()
    imagen_celular = AbsoluteImageField()
    icon = AbsoluteImageField()

    class Meta:
        model = Servicio
        fields = ['id', 'nombre', 'descripcion', 'imagen', 'icon', 'imagen_tablet', 'imagen_celular', 'slug', 'subservicios', 'caracteristicas']


class GetIdServiciosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'nombre']


class ServicesAndSubservicesSerializer(serializers.ModelSerializer):
    subservicios = subServicesSerializer(many=True, read_only=True)
    imagen = AbsoluteImageField()
    imagen_tablet = AbsoluteImageField()
    imagen_celular = AbsoluteImageField()
    icon = AbsoluteImageField()

    class Meta:
        model = Servicio
        fields = ['id', 'nombre', 'descripcion', 'imagen', 'icon', 'imagen_tablet', 'imagen_celular', 'slug']


class SlideSerializer(serializers.ModelSerializer):
    tipo = serializers.SerializerMethodField()
    imagen = AbsoluteImageField()
    imagen_tablet = AbsoluteImageField()
    imagen_celular = AbsoluteImageField()

    class Meta:
        model = Slide
        fields = ['id', 'tipo', 'nombre', 'descripcion', 'imagen', 'imagen_tablet', 'imagen_celular', 'orden']

    def get_tipo(self, obj):
        return 'slide'


class ServicioSlideSerializer(serializers.ModelSerializer):
    tipo = serializers.SerializerMethodField()
    orden = serializers.SerializerMethodField()
    imagen = AbsoluteImageField()
    imagen_tablet = AbsoluteImageField()
    imagen_celular = AbsoluteImageField()

    class Meta:
        model = Servicio
        fields = ['id', 'tipo', 'nombre', 'descripcion', 'imagen', 'imagen_tablet', 'imagen_celular', 'orden']

    def get_tipo(self, obj):
        return 'servicio'

    def get_orden(self, obj):
        return obj.id


class BrochureSerializer(serializers.ModelSerializer):
    archivo = serializers.SerializerMethodField()

    class Meta:
        model = Brochure
        fields = ['id', 'nombre', 'archivo']

    def get_archivo(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.archivo.url)
        return obj.archivo.url
