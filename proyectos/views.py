from django.shortcuts import render
# from django.views.generic import TemplateView
from django.http import HttpResponse
# importar rest_framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .models import Proyecto,ProyectoImagen,Ciudad,TypeProject,Pais,Departamento,Client
from .serializer import ProyectoSerializer,ProyectoImagenSerializer,CiudadSerializer,TypeProjectSerializer,PaisSerializer,DepartamentoSerializer,   ClientSerializer


class ProyectoList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request, format=None):
        proyectos = Proyecto.objects.all()
        serializer = ProyectoSerializer(proyectos, many=True)
        img_projects=ProyectoImagen.objects.all()
        serializer_img = ProyectoImagenSerializer(img_projects, many=True)
        ciudad=Ciudad.objects.all()
        ciudad_serializer = CiudadSerializer(ciudad, many=True)
        type_project=TypeProject.objects.all()
        type_project_serializer = TypeProjectSerializer(type_project, many=True)
        pais=Pais.objects.all()
        pais_serializer = PaisSerializer(pais, many=True)
        departamento=Departamento.objects.all()
        departamento_serializer = DepartamentoSerializer(departamento, many=True)
        client=Client.objects.all()
        client_serializer = ClientSerializer(client, many=True)
        return Response({
            'proyectos':serializer.data,
            'imagenes':serializer_img.data,
            'ciudad':ciudad_serializer.data,
            'type_project':type_project_serializer.data,
            'pais':pais_serializer.data,
            'departamento':departamento_serializer.data,
            'client':client_serializer.data,
        })
