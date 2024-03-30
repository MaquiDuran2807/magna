from rest_framework import serializers
from .models import Equipo, Tenologias

class TenologiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenologias
        fields = '__all__'
        read_only_fields = ('imagen_height', 'imagen_width',)


class EquipoSerializer(serializers.ModelSerializer):
    Tecnplogias = TenologiasSerializer(many=True, read_only=True)
    class Meta:
        model = Equipo
        fields = '__all__'

