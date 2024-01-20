from django.shortcuts import render
# from django.views.generic import TemplateView
from django.http import HttpResponse
# importar rest_framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .models import Equipo
from .serializer import EquipoSerializer

# Create your views here.

class EquipoList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request, format=None):
        equipos = Equipo.objects.all()
        serializer = EquipoSerializer(equipos, many=True)
        return Response(serializer.data)


