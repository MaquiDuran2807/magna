from django.shortcuts import render
# from django.views.generic import TemplateView
from django.http import HttpResponse
# importar rest_framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Servicio, SubServicio
from .serializer import ServicioSerializer, subServicesSerializer, GetIdServiciosSerializer
from rest_framework import permissions

# # Create your views here.

class ServicioViewSet(viewsets.ViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def list(self, request):
        serializer = ServicioSerializer(self.queryset, many=True)
        subServices = list(SubServicio.objects.filter().values())
        return Response({
            'servicios': serializer.data,
            'subServicios': subServices
        })
    
    def retrieve(self, request, pk=None):
        servicio = Servicio.objects.get(id=pk)
        serializer = ServicioSerializer(servicio)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = ServicioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class ServicioApiView(APIView):
    # traer un solo servicio por id 
    def get(self, request, pk=None):
        if pk is not None:
            servicio = Servicio.objects.get(id=pk)
            subservicios= SubServicio.objects.filter(servicio=servicio)
            # id de los servicios y el nombre
            serializer = ServicioSerializer(servicio)
            subserviciosSerializer = subServicesSerializer(subservicios, many=True)
            return Response(
                {
                    'servicio': serializer.data,
                    'subServicios': subserviciosSerializer.data,
                }
            )
        else:
            servicios = Servicio.objects.all()
            serializer = ServicioSerializer(servicios, many=True)
            return Response(serializer.data)
    
    def post(self, request):
        serializer = ServicioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ServicioId(APIView):
    def get(self, request):
        servicios = Servicio.objects.filter().values('id', 'nombre')
        serializer = GetIdServiciosSerializer(servicios, many=True)
        return Response(serializer.data)






