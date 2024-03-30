from django.shortcuts import render
# from django.views.generic import TemplateView
from django.http import HttpResponse
# importar rest_framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .models import Equipo, Tenologias
from .serializer import EquipoSerializer,TenologiasSerializer

# Create your views here.

class EquipoList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request, format=None):
        equipos = Equipo.objects.all()
        tecnologias = Tenologias.objects.all()
        serializer = EquipoSerializer(equipos, many=True)
        tecnologias_serializer = TenologiasSerializer(tecnologias, many=True)
        return Response(
            {
                'equipos': serializer.data,
                'tecnologias': tecnologias_serializer.data
            }
        )


