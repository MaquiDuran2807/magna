from rest_framework import serializers
from .models import Proyecto,ProyectoImagen,Ciudad,TypeProject,Pais,Departamento,Client

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ('id','nombre','descripcion','fecha_inicio','fecha_fin','estado','servicios','subservicios','ciudad',"tipo",)

class ProyectoImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProyectoImagen
        fields = "__all__"

class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = "__all__"

class TypeProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeProject
        fields = "__all__"

class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = "__all__"

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = "__all__"

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"



