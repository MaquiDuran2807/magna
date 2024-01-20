from rest_framework import serializers
from .models import Servicio, SubServicio

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class subServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubServicio
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'nombre': instance.nombre,
            'descripcion': instance.descripcion,
            'imagen': instance.imagen.url,
            'servicio_id': instance.servicio_id
        }
    
class GetIdServiciosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id', 'nombre']